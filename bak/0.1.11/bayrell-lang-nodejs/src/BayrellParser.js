/*
!
Bayrell
https://github.com/bayrell/bayrell
Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/
var m_bayrell_rtl = require('bayrell-rtl');
var BayrellSimpleParser = m_bayrell_rtl.BayrellSimpleParser;
var isset = m_bayrell_rtl.isset;
var in_array = m_bayrell_rtl.in_array;
var array_push = m_bayrell_rtl.array_push;
var strlen = m_bayrell_rtl.strlen;
var clone = m_bayrell_rtl.clone;
var count = m_bayrell_rtl.count;
var ord = m_bayrell_rtl.ord;
var strpos = m_bayrell_rtl.strpos;
var strtolower = m_bayrell_rtl.strtolower;
var file_get_contents = m_bayrell_rtl.file_get_contents;
var implode = m_bayrell_rtl.implode;
var trim = m_bayrell_rtl.trim;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParser extends BayrellSimpleParser {
	
	isTokenChar(ch){
		return strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", strtolower(ch)) !== false;
	}
	
	constructor(){
		super();
		this.code_tree = null;
		this.file_name = null;
		this.file_id = null;
		this.mathSemicolon = true;
	}
	
	reset(){
		super.reset();
		this.code_tree = {};
	}
	
	isIdentifier(name){
		return this.isToken(name);
	}
	
	matchIdentifier(){
		var token = this.getToken();
		if (!this.isIdentifier(token)) {
			this.expected("identifier");
		}
		return token;
	}
	/*
	Вызвать аргументы
	*/
	
	matchCallArgs(){
		var childs = [];
		while (!this.eof()) {
			if (this.look_token == ")") {
				break;
			}
			array_push(childs, this.matchArithmetic());
			if (this.look_token != ")") {
				this.match(",");
			}
		}
		return childs;
	}
	/*
	Вызвать аргументы
	*/
	
	matchDeclareArgs(){
		var childs = [];
		while (this.look_token != ")" && !this.eof()) {
			/*
			TODO: тип может быть классом с указанием package и namespace. 
			Нужно использовать функцию matchMultiName
			*/
			var type = this.getToken();
			if (this.look_token == ")" || this.look_token == ",") {
				this.match("type");
			}
			var name = this.getToken();
			var value = null;
			var flags = {'export': false,
				'static': false,
				'const': false,
				'public': false,
				'private': false,
			};
			if (this.look_token == "=") {
				this.match("=");
				value = this.matchArithmetic();
			}
			array_push(childs, BayrellCode.op_declare_var(name, type, value, flags));
			if (this.look_token != ")") {
				this.match(",");
			}
		}
		return childs;
	}
	/*
	Сканирует на наличие идентификатора
	*/
	
	matchMultiName(){
		var name = "";
		var names = [];
		if (!in_array(this.look_token, [".", ":"])) {
			name = this.getToken();
			array_push(names, name);
		}
		if (!in_array(name, BayrellCode.ReservedWords)) {
			while (in_array(this.look_token, [".", ":"])) {
				/*
				read "." or ":"
				*/
				name = this.getToken();
				if (this.look_token == ":" && name == ":") {
					name = name + this.getToken();
				}
				array_push(names, name);
				/*
				TODO: убрано, т.к. не может парсить перменные вида name.export, name.static И т.п.
				if (in_array(this.look_token, BayrellCode.ReservedWords)){
					break;
				}
				*/
				/*
				read name
				*/
				name = this.getToken();
				array_push(names, name);
			}
		}
		return implode("", names);
	}
	/*
	Сканирует на наличие идентификатора
	*/
	
	matchName(){
		var name = "";
		var result = null;
		if (in_array(this.look_token, BayrellCode.ReservedWords)) {
			name = this.getToken();
			throw this.createError("ERROR_IDENT_IS_RESERVER_WORD", {'name': name,
			});
		}
		if (this.look_token == "!") {
			this.match("!");
			return BayrellCode.op_not(this.matchName());
		}
		if (this.look_token == "-") {
			this.match("-");
			return BayrellCode.op_neg(this.matchName());
		}
		if (this.isNumeric(this.look_token)) {
			name = this.getToken();
			result = BayrellCode.op_fixed(name);
		}
		else if (this.isIdentifier(this.look_token)) {
			/*
			TODO: Is identifier
			*/
			name = this.matchMultiName();
			if (this.look_token == "(") {
				this.match("(");
				var childs = this.matchCallArgs();
				this.match(")");
				result = BayrellCode.op_call(name, childs);
			}
			else if (this.look_token == "[") {
				this.match("[");
				var pos = this.matchArithmetic();
				this.match("]");
				result = BayrellCode.op_load_arr(name, pos);
			}
			else {
				result = BayrellCode.op_load(name);
				/*
				if (in_array(this.look_token, [':', '.'])){
					array names = [name];
					
					var type = 0;
					while (in_array(this.look_token, [':', '.'])){
						
						if (this.look_token == ':'){
							this.match(':');
							this.match(':');
							type = 2;
						}
						else if (this.look_token == '.'){
							this.match('.');
							type = 1;
						}
						
						var n = this.matchIdentifier(); 
						array_push(name, n);
					}
					
					if (type == 2){
						result = BayrellCode.op_load_static(names);
					}
					else{
						result = BayrellCode.op_load_dynamic(names);
					}
					
				}
				else
				*/
			}
		}
		else if (this.look_token == "(") {
			this.match("(");
			result = this.matchArithmetic();
			this.match(")");
		}
		else if (this.look_token == "[") {
			this.match("[");
			var childs = [];
			while (this.look_token != "]" && !this.eof()) {
				array_push(childs, this.matchArithmetic());
				if (this.look_token == ",") {
					this.match(",");
				}
			}
			this.match("]");
			result = BayrellCode.op_array(childs);
		}
		else if (this.look_token == "\"") {
			this.look_token = this.getChar();
			var value = this.readUntilChar("\"");
			result = BayrellCode.op_string(value);
		}
		else if (this.look_token == "'") {
			this.look_token = this.getChar();
			var value = this.readUntilChar("'");
			result = BayrellCode.op_string(value);
		}
		else if (this.look_token == "{") {
			this.match("{");
			var value = this.readUntilChar("}");
			result = BayrellCode.op_json("{" + value + "}");
		}
		else {
			name = this.getToken();
			throw this.createError("ERROR_UNKNOWN_IDENT", {'name': name,
			});
		}
		return result;
	}
	/*
	Сканирует умножение
	*/
	
	matchMultiply(){
		this.match("*");
		return BayrellCode.op_mult(this.matchName());
	}
	/*
	Сканирует деление
	*/
	
	matchDivide(){
		this.match("/");
		return BayrellCode.op_div(this.matchName());
	}
	/*
	Сканирует умножение, деление, возведение в степень
	*/
	
	matchFactor(){
		var childs = [];
		array_push(childs, this.matchName());
		while (in_array(this.look_token, ["*", "/"]) && !this.eof()) {
			if (this.look_token == "*") {
				array_push(childs, this.matchMultiply());
			}
			else if (this.look_token == "/") {
				array_push(childs, this.matchDivide());
			}
		}
		if (count(childs) == 1) {
			return childs[0];
		}
		return BayrellCode.op_calc_nope(childs);
	}
	/*
	Сканирует сложение
	*/
	
	matchAdd(){
		this.match("+");
		return BayrellCode.op_add(this.matchFactor());
	}
	/*
	Сканирует вычитание
	*/
	
	matchSub(){
		this.match("-");
		return BayrellCode.op_sub(this.matchFactor());
	}
	/*
	Сканирует арифметические операции
	*/
	
	matchArithmetic(){
		var childs = [];
		array_push(childs, this.matchFactor());
		while (in_array(this.look_token, ["+", "-"]) && !this.eof()) {
			if (this.look_token == "+") {
				array_push(childs, this.matchAdd());
			}
			else if (this.look_token == "-") {
				array_push(childs, this.matchSub());
			}
		}
		if (count(childs) == 1) {
			return childs[0];
		}
		return BayrellCode.op_calc(childs);
	}
	/*
	Сканирует логическое выражение
	*/
	
	matchLogicExpression(){
		var left = this.matchArithmetic();
		var op = null;
		var right = null;
		if (in_array(this.look_token, [">", "!", "<", "=", "in", "is"])) {
			op = this.getToken();
			if (this.look_token == "=") {
				op = op + this.getToken();
			}
			/*
			TODO: какой то баг
			*/
			if ((this.look_token == "=" && op == "!=") || (this.look_token == "=" && op == "==")) {
				op = op + this.getToken();
			}
			right = this.matchArithmetic();
		}
		if (op == null) {
			return left;
		}
		else {
			return BayrellCode.op_cmp(op, left, right);
		}
	}
	/*
	Сканирует логическое и
	*/
	
	matchAnd(){
		var childs = [];
		array_push(childs, this.matchLogicExpression());
		while (this.look_token == "and" && !this.eof()) {
			this.match("and");
			array_push(childs, BayrellCode.op_and(this.matchLogicExpression()));
		}
		if (count(childs) == 1) {
			return childs[0];
		}
		return BayrellCode.op_calc(childs);
	}
	/*
	Сканирует логическое или
	*/
	
	matchOr(){
		var childs = [];
		array_push(childs, this.matchAnd());
		while (this.look_token == "or" && !this.eof()) {
			this.match("or");
			array_push(childs, BayrellCode.op_or(this.matchAnd()));
		}
		if (count(childs) == 1) {
			return childs[0];
		}
		return BayrellCode.op_calc(childs);
	}
	/*
	Сканирует выражение
	*/
	
	matchExpression(){
		var code_tree;
		var is_link = false;
		var is_new = false;
		if (this.look_token == "&") {
			this.match("&");
			is_link = true;
		}
		if (this.look_token == "new") {
			this.match("new");
			is_new = true;
		}
		code_tree = this.matchOr();
		/*
		console.log(code_tree);
		*/
		if (is_link) {
			return BayrellCode.op_link(code_tree);
		}
		if (is_new) {
			return BayrellCode.op_new(code_tree);
		}
		return code_tree;
	}
	
	matchSubOperator(first_name, flags){
		if (this.look_token == "[") {
			this.match("[");
			var pos = this.matchArithmetic();
			this.match("]");
			return this.matchSubOperator(BayrellCode.op_load_arr(first_name, pos));
		}
		else if (this.look_token == "(") {
			this.match("(");
			var childs = this.matchCallArgs();
			this.match(")");
			return BayrellCode.op_call_func(first_name, childs);
		}
		else if (this.look_token == "=") {
			this.match("=");
			var code_tree = this.matchExpression();
			return BayrellCode.op_assign(first_name, code_tree);
		}
		else {
			var childs = [];
			var mathSemicolon = true;
			while (!this.eof()) {
				var name = this.getToken();
				var code_tree = null;
				if (this.look_token == "=") {
					this.match("=");
					code_tree = this.matchExpression();
					array_push(childs, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
				}
				else if (this.look_token == "(") {
					this.match("(");
					var args = this.matchDeclareArgs();
					this.match(")");
					var code_tree = this.matchOperatorsBlock();
					array_push(childs, BayrellCode.op_declare_func(name, first_name, args, code_tree, flags));
					this.mathSemicolon = false;
				}
				else {
					array_push(childs, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
				}
				if (this.look_token == ",") {
					this.match(",");
				}
				else {
					break;
				}
			}
			if (count(childs) == 1) {
				return childs[0];
			}
			return BayrellCode.op_nope(childs);
		}
	}
	/*
	Сканирует на наличие оператора
	*/
	
	matchOperator(){
		var first_name = this.matchMultiName();
		var flags = {'export': false,
			'static': false,
			'const': false,
			'public': false,
			'private': false,
		};
		while (in_array(first_name, ["export", "static", "const", "public", "private"])) {
			if (first_name == "export") {
				flags.export = true;
			}
			else if (first_name == "static") {
				flags.static = true;
			}
			else if (first_name == "const") {
				flags.const = true;
			}
			else if (first_name == "public") {
				flags.public = true;
			}
			else if (first_name == "private") {
				flags.private = true;
			}
			first_name = this.getToken();
		}
		if (first_name == "return") {
			var value = this.matchExpression();
			return BayrellCode.op_ret(value);
		}
		else if (first_name == "class") {
			var name = this.getToken();
			var extend_name = null;
			if (this.look_token == "extends") {
				this.match("extends");
				extend_name = this.getToken();
			}
			var code_tree = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_declare_class(name, extend_name, code_tree, flags);
		}
		else if (first_name == "namespace") {
			var name = this.matchMultiName();
			return BayrellCode.op_namespace(name);
		}
		else if (first_name == "package") {
			var name = this.matchMultiName();
			/*
			return BayrellCode.op_package(name);
			*/
			return null;
		}
		else if (first_name == "use") {
			var name = this.matchMultiName();
			var arr = null;
			if (this.look_token == "import") {
				this.match("import");
				arr = [];
				while (!this.eof()) {
					var token = this.getToken();
					array_push(arr, token);
					if (this.look_token == ",") {
						this.match(",");
					}
					else {
						break;
					}
				}
			}
			return BayrellCode.op_use(name, arr);
		}
		else if (first_name == "if") {
			this.match("(");
			var expr = this.matchExpression();
			this.match(")");
			var code_true = this.matchOperatorsBlock();
			var code_false = null;
			var else_if = [];
			while (this.look_token == "else") {
				this.match("else");
				if (this.look_token == "if") {
					array_push(else_if, this.matchOperatorsBlock());
				}
				else {
					if (code_false != null) {
						this.error("dublicate else");
					}
					code_false = this.matchOperatorsBlock();
				}
			}
			this.mathSemicolon = false;
			return BayrellCode.op_if(expr, code_true, code_false, else_if);
		}
		else if (first_name == "while") {
			this.match("(");
			var expr = this.matchExpression();
			this.match(")");
			var code_loop = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_while(expr, code_loop);
		}
		else if (first_name == "throw") {
			var expr = this.matchExpression();
			return BayrellCode.op_throw(expr);
		}
		else if (first_name == "break") {
			return BayrellCode.op_break();
		}
		else if (first_name == "continue") {
			return BayrellCode.op_continue();
		}
		else if (first_name == "/") {
			this.match("*");
			var comment = "";
			while (this.look_token != "/" && !this.eof()) {
				comment = comment + this.readUntilChar("*");
			}
			this.match("/");
			this.mathSemicolon = false;
			return BayrellCode.op_comment(trim(comment));
		}
		else if (first_name == ";") {
			return null;
		}
		return this.matchSubOperator(first_name, flags);
	}
	/*
	Парсит блок операторов между {}
	*/
	
	matchOperatorsBlock(){
		var multi = false;
		if (this.look_token == "{") {
			this.match("{");
			multi = true;
		}
		var code_tree = [];
		while (this.look_token != "}" && !this.eof()) {
			array_push(code_tree, this.matchOperator());
			if (this.mathSemicolon) {
				this.match(";");
			}
			this.mathSemicolon = true;
			if (!multi) {
				break;
			}
		}
		if (multi) {
			this.match("}");
		}
		return code_tree;
	}
	/*
	Парсит содержимое
	*/
	
	parse(){
		var childs = [];
		while (!this.eof()) {
			array_push(childs, this.matchOperator());
			if (this.mathSemicolon) {
				this.match(";");
			}
			this.mathSemicolon = true;
		}
		if (count(childs) == 1) {
			return childs[0];
		}
		return BayrellCode.op_nope(childs);
	}
	/*
	Парсит строку content
	 @param {string} content - cодержимое bem файла
	*/
	
	parseContent(content){
		this.setContent(content);
		/*
		Парсим содержимое
		*/
		this.code_tree = this.parse();
		return this.code_tree;
	}
	/*
	Парсит содержимое файла. Название файла сохраняет в переменную file_name
	 @param {string} file_name - Полный путь к файлу
	 @param {string} file_alias - Числовой идентификатор файла
	*/
	
	parseFile(file_name, file_id){
		this.file_name = file_name;
		this.file_id = file_id;
		var content = file_get_contents(file_name);
		this.parseContent(content);
		return this.code_tree;
	}
}
module.exports.BayrellParser = BayrellParser;
