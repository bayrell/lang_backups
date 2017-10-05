/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellTokenParser = m_bayrell_rtl.BayrellTokenParser;
var BayrellCommonParser = m_bayrell_rtl.BayrellCommonParser;
var BayrellError = m_bayrell_rtl.BayrellError;
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
var is_string = m_bayrell_rtl.is_string;
var substr = m_bayrell_rtl.substr;
var toString = m_bayrell_rtl.toString;
var bind = m_bayrell_rtl.bind;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParserBay extends BayrellTokenParser {
	static newInstance(){
		return new BayrellParserBay();
	}
	constructor(){
		super();
		this.mathSemicolon = true;
		this.pair_tokens = ["!==", "===", "!=", "==", "<=", ">=", "::", "&&", "||", ">>", "<<", "->", "++", "--", "+=", "-=", "~=", "#ifcode", "#switch", "#case", "#endswitch", "#endif"];
		this.string_tokens = ["\"", "'"];
		this.comment_line_tokens = ["//"];
		this.comment_pair_tokens = {
			"/*!":"*/",
			"/**":"*/",
			"/*":"*/",
		};
		this.comment_pair_tokens_sort = ["/*!", "/**", "/*"];
		/*  x */
		this.is_operation = false;
	}
	_readTokenString(match_str, flag){
		if (!isset(flag)) {
			flag = true;
		}
		var arr1 = ["n", "r", "t", "\\", "\"", "'"];
		/* 
		\[0-7]{1,3}	- последовательность символов, соответствующая регулярному выражению символа в восьмеричной системе счисления, который молча переполняется, чтобы поместиться в байт (т.е. "\400" === "\000")
		\x[0-9A-Fa-f]{1,2} - последовательность символов, соответствующая регулярному выражению символа в шестнадцатеричной системе счисления
		\u{[0-9A-Fa-f]+} - последовательность символов, соответствующая регулярному выражению символа Unicode, которая отображается в строка в представлении UTF-8 (добавлено в PHP 7.0.0)
	 */
		var len = strlen(s);
		var len_match = strlen(match_str);
		var s = "";
		var look = this._lookChar();
		var look_str = this._lookString(len_match);
		while (look !== null && look_str != match_str) {
			if (look == "\\") {
				var look2 = this._readLookChar(look);
				if (in_array(look2, arr1)) {
					if (look2 == "n") {
						s = s + "\n";
					}
					else if (look2 == "r") {
						s = s + "\r";
					}
					else if (look2 == "t") {
						s = s + "\t";
					}
					else if (look2 == "\\") {
						s = s + "\\";
					}
					else if (look2 == "\"") {
						s = s + "\"";
					}
					else if (look2 == "'") {
						s = s + "'";
					}
					look = this._readLookChar(look2);
				}
				else {
					s = s + look;
					look = look2;
				}
			}
			else {
				s = s + look;
				look = this._readLookChar(look);
			}
			look_str = this._lookString(len_match);
		}
		if (len > 1) {
			s = substr(s, 0, strlen(s) - len_match + 1);
		}
		if (flag) {
			this._match(match_str);
		}
		return s;
	}
	isIdentifier(name){
		return this.isToken(name);
	}
	/* 
	 * Вызвать аргументы
	 */
	matchCallArgs(){
		var childs = [];
		while (!this.eof()) {
			if (this.isLookToken(")")) {
				break;
			}
			array_push(childs, this.matchExpression());
			if (!this.isLookToken(")")) {
				this.match(",");
			}
		}
		return childs;
	}
	/* 
	 * Читает флаги
	 */
	readFlags(){
		var flags = clone(BayrellCode.FLAGS_OBJ);
		var sz = count(BayrellCode.FLAGS);
		while (this.isLookTokenArr(BayrellCode.FLAGS)) {
			var token = this.getToken();
			flags[token] = true;
			if (token == "pointer") {
				this.match("of");
			}
		}
		return flags;
	}
	/* 
	 * Вызвать аргументы
	 */
	matchDeclareArgs(){
		var childs = [];
		while (!this.isLookToken(")") && !this.eof()) {
			/*  Читаем флаги */
			var flags = this.readFlags();
			/*  TODO: тип может быть классом с указанием package и namespace. 
			Нужно использовать функцию matchMultiName */
			var type = this.getToken();
			if (this.isLookToken("&")) {
				this.match("&");
				flags["pointer"] = true;
			}
			if (this.isLookToken(")") || this.isLookToken(",")) {
				this.match("type");
			}
			var name = this.matchIdentifier();
			var value = null;
			if (this.isLookToken("=")) {
				this.match("=");
				value = this.matchExpression();
			}
			array_push(childs, BayrellCode.op_declare_var(name, type, value, flags));
			if (!this.isLookToken(")")) {
				this.match(",");
			}
		}
		return childs;
	}
	/* 
	 * Сканирует имя, разделенное точками
	 */
	matchMultiName(){
		var name = "";
		var names = [];
		/*  TODO: проверка на то, что getToken это токен, а не строка, коммментарий или еще чего */
		if (!this.isLookToken(".")) {
			name = this.getToken();
			array_push(names, name);
		}
		while (this.isLookToken(".")) {
			name = this.getToken();
			array_push(names, name);
			/*  read name */
			name = this.getToken();
			array_push(names, name);
		}
		return implode("", names);
	}
	/* 
	 * Сканирует на наличие идентификатора
	 */
	matchName(arr1){
		if (!isset(arr1)){arr1 = [".", "::", "[", "("];}
		if (this.look_token_type == "string") {
			var value = this.getToken();
			return BayrellCode.op_string(value);
		}
		else if (this.isLookTokenNumeric()) {
			var name = this.getToken();
			return BayrellCode.op_fixed(name);
		}
		var arr0 = [".", "::", "[", "("];
		/*  Определяем символы, которые нужно анализировать пересечением массивов arr0 и arr1 */
		var arr2 = [];
		var sz = count(arr1);
		for (var i = 0; i < sz; i++) {
			if (in_array(arr1[i], arr0)) {
				array_push(arr2, arr1[i]);
			}
		}
		var name = this.matchIdentifier();
		var arr = [];
		var pos = null;
		var args = [];
		array_push(arr, BayrellCode.op_load(name));
		while (this.isLookTokenArr(arr2)) {
			if (this.isLookToken(".")) {
				this.match(".");
				name = this.matchIdentifier();
				array_push(arr, BayrellCode.op_load_dynamic(name));
			}
			else if (this.isLookToken("::")) {
				this.match("::");
				name = this.matchIdentifier();
				array_push(arr, BayrellCode.op_load_static(name));
			}
			else if (this.isLookToken("[")) {
				this.match("[");
				pos = this.matchExpression();
				this.match("]");
				array_push(arr, BayrellCode.op_load_arr(pos));
			}
			else if (this.isLookToken("(")) {
				this.match("(");
				args = this.matchCallArgs();
				this.match(")");
				array_push(arr, BayrellCode.op_call(args));
			}
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		var res = BayrellCode.op_load_names(arr);
		if (this.is_operation) {
			res = BayrellCode.check_load_names(res);
		}
		return res;
	}
	/* 
	 * Сканирует на наличие операций с именем
	 */
	matchOpName(){
		if (this.isLookToken("(")) {
			this.match("(");
			var result = this.matchTernaryOperator();
			this.match(")");
			return result;
		}
		else if (this.isLookToken("!")) {
			this.match("!");
			return BayrellCode.op_not(this.matchArithmetic());
		}
		else if (this.isLookToken("-")) {
			this.match("-");
			return BayrellCode.op_neg(this.matchArithmetic());
		}
		else if (this.isLookToken("++")) {
			this.match("++");
			return BayrellCode.op_pre_inc(this.matchName());
		}
		else if (this.isLookToken("--")) {
			this.match("--");
			return BayrellCode.op_pre_dec(this.matchName());
		}
		else if (this.isLookToken("[")) {
			this.match("[");
			var values = [];
			while (!this.isLookToken("]") && !this.eof()) {
				array_push(values, this.matchExpression());
				if (this.isLookToken(",")) {
					this.match(",");
				}
			}
			this.match("]");
			return BayrellCode.op_array(values);
		}
		else if (this.isLookToken("{")) {
			this.match("{");
			var obj = {};
			while (!this.isLookToken("}") && !this.eof()) {
				if (this.isLookComment()) {
					this.getToken();
					continue;
				}
				if (this.look_token_type == BayrellCommonParser.TOKEN_STRING) {
					var key = this.getToken();
					this.match(":");
					var value = this.matchExpression();
					obj[key] = value;
				}
				else {
					throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
						"what":"string key",
					});
				}
				if (this.isLookToken(",")) {
					this.match(",");
				}
			}
			this.match("}");
			return BayrellCode.op_object(obj);
		}
		var result = this.matchName();
		if (this.isLookToken("++")) {
			this.match("++");
			return BayrellCode.op_post_inc(result);
		}
		else if (this.isLookToken("--")) {
			this.match("--");
			return BayrellCode.op_post_dec(result);
		}
		return result;
	}
	/* 
	 * Сканирует умножение
	 */
	matchMultiply(){
		this.match("*");
		return BayrellCode.op_mult(this.matchOpName());
	}
	/* 
	 * Сканирует деление
	 */
	matchDivide(){
		this.match("/");
		return BayrellCode.op_div(this.matchOpName());
	}
	/* 
	 * Сканирует умножение, деление, возведение в степень
	 */
	matchFactor(){
		var arr = [];
		array_push(arr, this.matchOpName());
		while (this.isLookTokenArr(["*", "/"]) && !this.eof()) {
			if (this.isLookToken("*")) {
				array_push(arr, this.matchMultiply());
			}
			else if (this.isLookToken("/")) {
				array_push(arr, this.matchDivide());
			}
			else {
				throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
					"what":"\"*\" or \"/\"",
				});
			}
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_nope(arr);
	}
	/* 
	 * Сканирует сложение
	 */
	matchAdd(){
		this.match("+");
		return BayrellCode.op_add(this.matchFactor());
	}
	/* 
	 * Сканирует вычитание
	 */
	matchSub(){
		this.match("-");
		return BayrellCode.op_sub(this.matchFactor());
	}
	/* 
	 * Сканирует арифметические операции
	 */
	matchArithmetic(){
		var arr = [];
		array_push(arr, this.matchFactor());
		while (this.isLookTokenArr(["+", "-"]) && !this.eof()) {
			if (this.isLookToken("+")) {
				array_push(arr, this.matchAdd());
			}
			else if (this.isLookToken("-")) {
				array_push(arr, this.matchSub());
			}
			else {
				throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
					"what":"\"+\" or \"-\"",
				});
			}
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_calc(arr);
	}
	/* 
	 * Сканирует арифметические операции
	 */
	matchConcat(){
		var arr = [];
		array_push(arr, this.matchArithmetic());
		while (this.isLookToken("~") && !this.eof()) {
			if (this.isLookToken("~")) {
				this.match("~");
				array_push(arr, BayrellCode.op_concat(this.matchArithmetic()));
			}
			else {
				throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
					"what":"~",
				});
			}
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_calc(arr);
	}
	/* 
	 * Сканирует логическое выражение
	 */
	matchLogicExpression(){
		var left = this.matchConcat();
		var op = null;
		var right = null;
		if (this.isLookTokenArr([">", "!", "<", "=", "!=", "==", "===", "!==", "<=", ">=", "in", "is"])) {
			op = this.getToken();
			/* 
			TODO: какой то баг
			if (this.isLookToken('=')){
				op = op + this.getToken();
			}
			if (this.look_token == '=' and op == '!=' or this.look_token == '=' and op == '=='){
				op = op + this.getToken();
			}
		 */
			right = this.matchConcat();
		}
		if (op == null) {
			return left;
		}
		else {
			return BayrellCode.op_cmp(op, left, right);
		}
	}
	/* 
	 * Сканирует логическое и
	 */
	matchAnd(){
		var arr = [];
		array_push(arr, this.matchLogicExpression());
		while (this.isLookToken("and") && !this.eof()) {
			this.match("and");
			array_push(arr, BayrellCode.op_and(this.matchLogicExpression()));
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_calc(arr);
	}
	/* 
	 * Сканирует логическое или
	 */
	matchOr(){
		var arr = [];
		array_push(arr, this.matchAnd());
		while (this.isLookToken("or") && !this.eof()) {
			this.match("or");
			array_push(arr, BayrellCode.op_or(this.matchAnd()));
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_calc(arr);
	}
	/* 
	 * Тернарный оператор
	 */
	matchTernaryOperator(){
		var expr = this.matchOr();
		if (this.isLookToken("?")) {
			var expr_true = null;
			var expr_false = null;
			this.match("?");
			expr_true = this.matchExpression();
			this.match(":");
			expr_false = this.matchExpression();
			return BayrellCode.op_ternary(expr, expr_true, expr_false);
		}
		return expr;
	}
	/* 
	 * Сканирует выражение
	 */
	matchExpression(){
		var code_tree;
		var is_link = false;
		var is_new = false;
		var is_clone = false;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		if (this.isLookToken("&")) {
			this.match("&");
			is_link = true;
		}
		if (this.isLookToken("new")) {
			this.match("new");
			is_new = true;
		}
		if (this.isLookToken("clone")) {
			this.match("clone");
			is_clone = true;
		}
		if (this.isLookToken("link")) {
			this.match("link");
			is_link = true;
		}
		code_tree = this.matchTernaryOperator();
		if (is_clone) {
			code_tree = BayrellCode.op_clone(code_tree);
		}
		if (is_link) {
			code_tree = BayrellCode.op_link(code_tree);
		}
		if (is_new) {
			code_tree = BayrellCode.op_new(code_tree);
		}
		this.is_operation = old_is_operation;
		return code_tree;
	}
	/* 
	 * Сканирует ifcode директиву
	 */
	matchPreprocessorIfCode(){
		var flag_open_token = false;
		if (this.isLookToken("#ifcode")) {
			this.match("#ifcode");
			flag_open_token = true;
		}
		else if (this.isLookToken("ifcode")) {
			this.match("ifcode");
		}
		var expr = this.matchExpression();
		if (!this.isLookToken("then")) {
			throw this._createError(BayrellCommonParser.ERROR_EXPECTED, {
				"what":"then",
			});
		}
		var code_str = this._readUntilString("#", false);
		this.getToken();
		if (flag_open_token) {
			this.match("#endif");
		}
		return BayrellCode.op_ifcode(expr, code_str);
	}
	/* 
	 * Сканирует switch директиву
	 */
	matchPreprocessorSwitch(flag_open_token){
		this.match("#switch");
		var arr = [];
		while (!this.eof() && this.isLookToken("#case")) {
			this.match("#case");
			array_push(arr, this.matchPreprocessorDirective());
		}
		this.match("#endswitch");
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_nope(arr);
	}
	/* 
	 * Сканирует препроцессорные директивы
	 */
	matchPreprocessorDirective(){
		if (this.isLookToken("#switch")) {
			return this.matchPreprocessorSwitch();
		}
		else if (this.isLookToken("#ifcode")) {
			return this.matchPreprocessorIfCode();
		}
		else if (this.isLookToken("ifcode")) {
			return this.matchPreprocessorIfCode();
		}
		throw this.createError(BayrellParserBay.ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE, {
			"name":this.look_token,
		});
		return null;
	}
	/* 
	 * Сканирует на наличие оператора
	 */
	matchOperator(){
		/*  Читаем комментарий */
		if (this.look_token_type == "comment") {
			var comment = this.getToken();
			this.mathSemicolon = false;
			return BayrellCode.op_comment(comment);
		}
		if (this.isLookTokenArr(["#switch", "#ifcode"])) {
			this.mathSemicolon = false;
			return this.matchPreprocessorDirective();
		}
		var flags = this.readFlags();
		/* string first_name = this.matchName() */
		if (this.isLookToken("return")) {
			this.match("return");
			var value = null;
			if (!this.isLookToken(";")) {
				value = this.matchExpression();
			}
			return BayrellCode.op_ret(value);
		}
		else if (this.isLookToken("class")) {
			this.match("class");
			var name = this.getToken();
			var extend_name = null;
			if (this.isLookToken("extends")) {
				this.match("extends");
				extend_name = this.getToken();
			}
			var code_tree = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_declare_class(name, extend_name, code_tree, flags);
		}
		else if (this.isLookToken("namespace")) {
			this.match("namespace");
			var name = this.matchMultiName();
			return BayrellCode.op_namespace(name);
		}
		else if (this.isLookToken("package")) {
			this.match("package");
			var name = this.matchMultiName();
			/* return BayrellCode.op_package(name) */
			return null;
		}
		else if (this.isLookToken("use")) {
			this.match("use");
			var name = this.matchMultiName();
			var arr = null;
			if (this.isLookToken("import")) {
				this.match("import");
				arr = [];
				while (!this.eof()) {
					var token = this.getToken();
					array_push(arr, token);
					if (this.isLookToken(",")) {
						this.match(",");
					}
					else {
						break;
					}
				}
			}
			return BayrellCode.op_use(name, arr);
		}
		else if (this.isLookToken("if")) {
			this.match("if");
			this.match("(");
			var expr = this.matchExpression();
			this.match(")");
			var code_true = this.matchOperatorsBlock();
			var code_false = null;
			var else_if = [];
			while (this.isLookToken("else") || this.isLookComment()) {
				if (this.isLookComment()) {
					this.getToken();
					continue;
				}
				else {
					this.match("else");
					if (this.isLookToken("if")) {
						array_push(else_if, this.matchOperatorsBlock());
					}
					else {
						if (code_false != null) {
							this.error("dublicate else");
						}
						code_false = this.matchOperatorsBlock();
					}
				}
			}
			this.mathSemicolon = false;
			return BayrellCode.op_if(expr, code_true, code_false, else_if);
		}
		else if (this.isLookToken("while")) {
			this.match("while");
			this.match("(");
			var expr = this.matchExpression();
			this.match(")");
			var code_loop = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_while(expr, code_loop);
		}
		else if (this.isLookToken("for")) {
			this.match("for");
			this.match("(");
			var loop_init = null;
			var loop_name = BayrellCode.check_load_names(this.matchName([".", "::"]));
			if (this.isLookTokenIdentifier()) {
				var second_name = this.matchIdentifier();
				this.match("=");
				var code_tree = this.matchExpression();
				loop_init = BayrellCode.op_declare_var(second_name, loop_name, code_tree, {});
			}
			else if (this.isLookToken("=")) {
				this.match("=");
				var code_tree = this.matchExpression();
				loop_init = BayrellCode.op_assign(loop_name, code_tree);
			}
			else {
				throw this.createError(BayrellParserBay.ERROR_UNKNOWN_IDENT, {
					"name":this.look_token,
				});
			}
			this.match(";");
			var loop_expression = this.matchExpression();
			this.match(";");
			var loop_inc = this.matchOperator();
			this.match(")");
			var childs = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_for(loop_init, loop_expression, loop_inc, childs);
		}
		else if (this.isLookToken("foreach")) {
			this.match("foreach");
			this.match("(");
			var key_type;
			var key_name;
			var value_type;
			var value_name;
			key_type = this.getToken();
			key_name = this.getToken();
			if (this.isLookToken(",")) {
				this.match(",");
				value_type = this.getToken();
				value_name = this.getToken();
			}
			else {
				value_type = null;
				value_name = null;
			}
			this.match("in");
			var arr_name = BayrellCode.check_load_names(this.matchName());
			this.match(")");
			var childs = this.matchOperatorsBlock();
			this.mathSemicolon = false;
			return BayrellCode.op_foreach(key_type, key_name, value_type, value_name, arr_name, childs);
		}
		else if (this.isLookToken("throw")) {
			this.match("throw");
			var expr = this.matchExpression();
			return BayrellCode.op_throw(expr);
		}
		else if (this.isLookToken("break")) {
			this.match("break");
			return BayrellCode.op_break();
		}
		else if (this.isLookToken("continue")) {
			this.match("continue");
			return BayrellCode.op_continue();
		}
		else if (this.isLookToken(";")) {
			this.match(";");
			return null;
		}
		else if (this.isLookToken("++")) {
			this.match("++");
			var first_name = this.matchName([".", "::"]);
			return BayrellCode.op_inc(BayrellCode.check_load_names(first_name));
		}
		else if (this.isLookToken("--")) {
			this.match("--");
			var first_name = this.matchName([".", "::"]);
			return BayrellCode.op_dec(BayrellCode.check_load_names(first_name));
		}
		var first_name = this.matchName([".", "::", "["]);
		/*  Match SubOperator */
		if (this.isLookToken("=")) {
			this.match("=");
			var code_tree = this.matchExpression();
			return BayrellCode.op_assign(BayrellCode.check_load_names(first_name), code_tree);
		}
		else if (this.isLookToken("++")) {
			this.match("++");
			return BayrellCode.op_inc(BayrellCode.check_load_names(first_name));
		}
		else if (this.isLookToken("--")) {
			this.match("--");
			return BayrellCode.op_dec(BayrellCode.check_load_names(first_name));
		}
		else if (this.isLookToken("+=")) {
			this.match("+=");
			var code_tree = this.matchExpression();
			return BayrellCode.op_assign_inc(BayrellCode.check_load_names(first_name), code_tree);
		}
		else if (this.isLookToken("~=")) {
			this.match("~=");
			var code_tree = this.matchExpression();
			return BayrellCode.op_assign_concat(BayrellCode.check_load_names(first_name), code_tree);
		}
		else if (this.isLookToken("-=")) {
			this.match("-=");
			var code_tree = this.matchExpression();
			return BayrellCode.op_assign_dec(BayrellCode.check_load_names(first_name), code_tree);
		}
		else if (this.isLookToken(";")) {
			return first_name;
		}
		else if (this.isLookTokenArr(["("])) {
			var arr = [];
			if (first_name["op"] == BayrellCode.OP_LOAD) {
				array_push(arr, first_name);
			}
			else if (first_name["op"] == BayrellCode.OP_LOAD_NAMES) {
				arr = first_name["arr"];
			}
			else {
				throw this.createError(BayrellParserBay.ERROR_UNKNOWN_OP_CODE);
			}
			var name = "";
			var pos = null;
			var args = [];
			while (this.isLookTokenArr([".", "::", "[", "("])) {
				if (this.isLookToken(".")) {
					this.match(".");
					name = this.matchToken();
					array_push(arr, BayrellCode.op_load_dynamic(name));
				}
				else if (this.isLookToken("::")) {
					this.match("::");
					name = this.matchToken();
					array_push(arr, BayrellCode.op_load_static(name));
				}
				else if (this.isLookToken("[")) {
					this.match("[");
					pos = this.matchExpression();
					this.match("]");
					array_push(arr, BayrellCode.op_load_arr(pos));
				}
				else if (this.isLookToken("(")) {
					this.match("(");
					args = this.matchCallArgs();
					this.match(")");
					array_push(arr, BayrellCode.op_call(args));
				}
			}
			return BayrellCode.op_load_names(arr);
		}
		first_name = BayrellCode.check_load_names(first_name);
		var arr = [];
		var mathSemicolon = true;
		while (!this.eof()) {
			flags["pointer"] = false;
			if (this.isLookToken("&")) {
				this.match("&");
				flags["pointer"] = true;
			}
			var name = this.matchIdentifier();
			var code_tree = null;
			if (this.isLookToken("=")) {
				this.match("=");
				code_tree = this.matchExpression();
				array_push(arr, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
			}
			else if (this.isLookToken("(")) {
				this.match("(");
				var args = this.matchDeclareArgs();
				this.match(")");
				var code_tree = null;
				if (flags.declare == false) {
					code_tree = this.matchOperatorsBlock();
					this.mathSemicolon = false;
				}
				else {
					this.mathSemicolon = true;
				}
				array_push(arr, BayrellCode.op_declare_func(name, first_name, args, code_tree, flags));
			}
			else {
				array_push(arr, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
			}
			if (this.isLookToken(",")) {
				this.match(",");
			}
			else {
				break;
			}
		}
		if (count(arr) == 1) {
			return arr[0];
		}
		return BayrellCode.op_nope(arr);
	}
	/* 
	 * Парсит блок операторов между {}
	 */
	matchOperatorsBlock(){
		var multi = false;
		if (this.isLookToken("{")) {
			this.match("{");
			multi = true;
		}
		var code_tree = [];
		while (!this.isLookToken("}") && !this.eof()) {
			array_push(code_tree, this.matchOperator());
			if (this.mathSemicolon || this.isLookToken(";")) {
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
	 * Парсит содержимое
	 */
	parse(){
		var arr = [];
		while (!this.eof()) {
			array_push(arr, this.matchOperator());
			if (this.mathSemicolon) {
				this.match(";");
			}
			this.mathSemicolon = true;
		}
		if (count(arr) == 1) {
			this.code_tree = arr[0];
		}
		else {
			this.code_tree = BayrellCode.op_nope(arr);
		}
		return this.code_tree;
	}
}
module.exports.BayrellParserBay = BayrellParserBay;
