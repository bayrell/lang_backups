/* * Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellTokenParser = m_bayrell_rtl.BayrellTokenParser;
var BayrellCommonParser = m_bayrell_rtl.BayrellCommonParser;
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
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParserBay extends BayrellTokenParser {
  
  constructor(){
    super();
    this.mathSemicolon = true;
    this.pair_tokens = ["!==", "===", "!=", "==", "<=", ">=", "::", "&&", "||", ">>", "<<", "->", "++", "--", "+=", "-=", "*=", "/=", "#ifcode", "#switch", "#case", "#endswitch", "#endif"];
    this.string_tokens = ["\"", "'"];
    this.comment_line_tokens = ["//"];
    this.comment_pair_tokens = {
			'/*!': '*/',
			'/**': '*/',
			'/*': '*/',
		};
    this.comment_pair_tokens_sort = ["/*!", "/**", "/*"];
    /* x */
  }
  
  _readTokenString(match_str, flag){
    if (!isset(flag)) {
      flag = true;
    }
    var arr1 = ["n", "r", "t", "\\", "\"", "'"];
    /* \[0-7]{1,3}	- последовательность символов, соответствующая регулярному выражению символа в восьмеричной системе счисления, который молча переполняется, чтобы поместиться в байт (т.е. "\400" === "\000")
		\x[0-9A-Fa-f]{1,2} - последовательность символов, соответствующая регулярному выражению символа в шестнадцатеричной системе счисления
		\u{[0-9A-Fa-f]+} - последовательность символов, соответствующая регулярному выражению символа Unicode, которая отображается в строка в представлении UTF-8 (добавлено в PHP 7.0.0) */
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
  
  matchIdentifier(){
    var token = this.getToken();
    if (!this.isIdentifier(token)) {
      this.expected("identifier");
    }
    return token;
  }
  /* * Вызвать аргументы */
  
  matchCallArgs(){
    var childs = [];
    while (!this.eof()) {
      if (this.isLookToken(")")) {
        break;
      }
      array_push(childs, this.matchConcat());
      if (!this.isLookToken(")")) {
        this.match(",");
      }
    }
    return childs;
  }
  /* * Вызвать аргументы */
  
  matchDeclareArgs(){
    var childs = [];
    while (!this.isLookToken(")") && !this.eof()) {
      /* TODO: тип может быть классом с указанием package и namespace. 
			Нужно использовать функцию matchMultiName */
      var type = this.getToken();
      if (this.isLookToken(")") || this.isLookToken(",")) {
        this.match("type");
      }
      var name = this.getToken();
      var value = null;
      var flags = {
				'export': false,
				'static': false,
				'const': false,
				'public': false,
				'private': false,
			};
      if (this.isLookToken("=")) {
        this.match("=");
        value = this.matchConcat();
      }
      array_push(childs, BayrellCode.op_declare_var(name, type, value, flags));
      if (!this.isLookToken(")")) {
        this.match(",");
      }
    }
    return childs;
  }
  /* * Сканирует на наличие идентификатора */
  
  matchMultiName(){
    var name = "";
    var names = [];
    if (!this.isLookTokenArr([".", "::"])) {
      name = this.getToken();
      array_push(names, name);
    }
    if (!in_array(name, BayrellCode.ReservedWords)) {
      while (this.isLookTokenArr([".", "::"])) {
        /* read "." or ":" */
        name = this.getToken();
        array_push(names, name);
        /* TODO: убрано, т.к. не может парсить перменные вида name.export, name.static И т.п.
				if (in_array(this.look_token, BayrellCode.ReservedWords)){
					break;
				} */
        /* read name */
        name = this.getToken();
        array_push(names, name);
      }
    }
    return implode("", names);
  }
  /* * Сканирует на наличие идентификатора */
  
  matchName(){
    var name = "";
    var result = null;
    if (this.look_token_type == "string") {
      var value = this.getToken();
      return BayrellCode.op_string(value);
    }
    else if (this.isLookToken("!")) {
      this.match("!");
      return BayrellCode.op_not(this.matchName());
    }
    else if (this.isLookToken("-")) {
      this.match("-");
      return BayrellCode.op_neg(this.matchName());
    }
    else if (this.isLookToken("++")) {
      this.match("++");
      return BayrellCode.op_pre_inc(this.matchMultiName());
    }
    else if (this.isLookToken("--")) {
      this.match("--");
      return BayrellCode.op_pre_dec(this.matchMultiName());
    }
    else if (this.isLookTokenArr(BayrellCode.ReservedWords)) {
      name = this.getToken();
      throw this.createError(BayrellParserBay.ERROR_IDENT_IS_RESERVER_WORD, {
				'name': name,
			});
    }
    else if (this.isLookTokenNumeric()) {
      name = this.getToken();
      result = BayrellCode.op_fixed(name);
    }
    else if (this.isLookTokenIdentifier()) {
      /* TODO: Is identifier */
      name = this.matchMultiName();
      if (this.isLookToken("(")) {
        this.match("(");
        var args = this.matchCallArgs();
        this.match(")");
        result = BayrellCode.op_call(name, args);
      }
      else if (this.isLookToken("++")) {
        this.match("++");
        return BayrellCode.op_post_inc(name);
      }
      else if (this.isLookToken("--")) {
        this.match("--");
        return BayrellCode.op_post_dec(name);
      }
      else if (this.isLookToken("[")) {
        var pos = [];
        while (this.isLookToken("[")) {
          this.match("[");
          array_push(pos, this.matchConcat());
          this.match("]");
        }
        result = BayrellCode.op_load_arr(name, pos);
      }
      else {
        result = BayrellCode.op_load(name);
        /* if (in_array(this.look_token, [':', '.'])){
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
				else */
      }
    }
    else if (this.isLookToken("(")) {
      this.match("(");
      result = this.matchTernaryOperator();
      this.match(")");
    }
    else if (this.isLookToken("[")) {
      this.match("[");
      var values = [];
      while (!this.isLookToken("]") && !this.eof()) {
        array_push(values, this.matchConcat());
        if (this.isLookToken(",")) {
          this.match(",");
        }
      }
      this.match("]");
      result = BayrellCode.op_array(values);
    }
    else if (this.isLookToken("{")) {
      var value = this._readUntilString("}", false);
      this.getToken();
      this.match("}");
      result = BayrellCode.op_json("{" + value + "}");
    }
    else {
      name = this.getToken();
      throw this.createError(BayrellParserBay.ERROR_UNKNOWN_IDENT, {
				'name': name,
			});
    }
    return result;
  }
  /* * Сканирует умножение */
  
  matchMultiply(){
    this.match("*");
    return BayrellCode.op_mult(this.matchName());
  }
  /* * Сканирует деление */
  
  matchDivide(){
    this.match("/");
    return BayrellCode.op_div(this.matchName());
  }
  /* * Сканирует умножение, деление, возведение в степень */
  
  matchFactor(){
    var arr = [];
    array_push(arr, this.matchName());
    while (this.isLookTokenArr(["*", "/"]) && !this.eof()) {
      if (this.isLookToken("*")) {
        array_push(arr, this.matchMultiply());
      }
      else if (this.isLookToken("/")) {
        array_push(arr, this.matchDivide());
      }
      else {
        throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
					'what': '"*" or "/"',
				});
      }
    }
    if (count(arr) == 1) {
      return arr[0];
    }
    return BayrellCode.op_calc_nope(arr);
  }
  /* * Сканирует сложение */
  
  matchAdd(){
    this.match("+");
    return BayrellCode.op_add(this.matchFactor());
  }
  /* * Сканирует вычитание */
  
  matchSub(){
    this.match("-");
    return BayrellCode.op_sub(this.matchFactor());
  }
  /* * Сканирует арифметические операции */
  
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
					'what': '"+" or "-"',
				});
      }
    }
    if (count(arr) == 1) {
      return arr[0];
    }
    return BayrellCode.op_calc(arr);
  }
  /* * Сканирует арифметические операции */
  
  matchConcat(){
    var arr = [];
    array_push(arr, this.matchArithmetic());
    while (this.isLookToken("~") && !this.eof()) {
      if (this.isLookToken("~")) {
        this.match("~");
        array_push(arr, this.matchArithmetic());
      }
      else {
        throw this.createError(BayrellParserBay.ERROR_EXPECTED, {
					'what': '~',
				});
      }
    }
    if (count(arr) == 1) {
      return arr[0];
    }
    return BayrellCode.op_concat(arr);
  }
  /* * Сканирует логическое выражение */
  
  matchLogicExpression(){
    var left = this.matchConcat();
    var op = null;
    var right = null;
    if (this.isLookTokenArr([">", "!", "<", "=", "!=", "==", "===", "!==", "<=", ">=", "in", "is"])) {
      op = this.getToken();
      /* TODO: какой то баг
			if (this.isLookToken('=')){
				op = op + this.getToken();
			}
			if (this.look_token == '=' and op == '!=' or this.look_token == '=' and op == '=='){
				op = op + this.getToken();
			} */
      right = this.matchConcat();
    }
    if (op == null) {
      return left;
    }
    else {
      return BayrellCode.op_cmp(op, left, right);
    }
  }
  /* * Сканирует логическое и */
  
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
  /* * Сканирует логическое или */
  
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
  /* * Тернарный оператор */
  
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
  /* * Сканирует выражение */
  
  matchExpression(){
    var code_tree;
    var is_link = false;
    var is_new = false;
    if (this.isLookToken("&")) {
      this.match("&");
      is_link = true;
    }
    if (this.isLookToken("new")) {
      this.match("new");
      is_new = true;
    }
    code_tree = this.matchTernaryOperator();
    /* console.log(code_tree) */
    if (is_link) {
      return BayrellCode.op_link(code_tree);
    }
    if (is_new) {
      return BayrellCode.op_new(code_tree);
    }
    return code_tree;
  }
  /* * Сканирует ifcode директиву */
  
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
				'what': 'then',
			});
    }
    var code_str = this._readUntilString("#", false);
    this.getToken();
    if (flag_open_token) {
      this.match("#endif");
    }
    return BayrellCode.op_ifcode(expr, code_str);
  }
  /* * Сканирует switch директиву */
  
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
  /* * Сканирует препроцессорные директивы */
  
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
			'name': this.look_token,
		});
    return null;
  }
  /* * Сканирует на наличие оператора */
  
  matchOperator(){
    /* Читаем комментарий */
    if (this.look_token_type == "comment") {
      var comment = this.getToken();
      this.mathSemicolon = false;
      return BayrellCode.op_comment(comment);
    }
    if (this.isLookTokenArr(["#switch", "#ifcode"])) {
      this.mathSemicolon = false;
      return this.matchPreprocessorDirective();
    }
    var flags = {
			'export': false,
			'static': false,
			'const': false,
			'public': false,
			'private': false,
			'declare': false,
		};
    while (this.isLookTokenArr(["export", "static", "const", "public", "private", "declare"])) {
      if (this.isLookToken("export")) {
        flags.export = true;
      }
      else if (this.isLookToken("static")) {
        flags.static = true;
      }
      else if (this.isLookToken("const")) {
        flags.const = true;
      }
      else if (this.isLookToken("public")) {
        flags.public = true;
      }
      else if (this.isLookToken("private")) {
        flags.private = true;
      }
      else if (this.isLookToken("declare")) {
        flags.declare = true;
      }
      this.getToken();
    }
    var first_name = this.matchMultiName();
    if (first_name == "return") {
      var value = this.matchExpression();
      return BayrellCode.op_ret(value);
    }
    else if (first_name == "class") {
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
    else if (first_name == "namespace") {
      var name = this.matchMultiName();
      return BayrellCode.op_namespace(name);
    }
    else if (first_name == "package") {
      var name = this.matchMultiName();
      /* return BayrellCode.op_package(name) */
      return null;
    }
    else if (first_name == "use") {
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
    else if (first_name == "if") {
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
    else if (first_name == "while") {
      this.match("(");
      var expr = this.matchExpression();
      this.match(")");
      var code_loop = this.matchOperatorsBlock();
      this.mathSemicolon = false;
      return BayrellCode.op_while(expr, code_loop);
    }
    else if (first_name == "for") {
      this.match("(");
      var loop_init = null;
      var loop_name = this.matchMultiName();
      if (this.isLookTokenIdentifier()) {
        var second_name = this.getToken();
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
					'name': this.look_token,
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
    else if (first_name == "foreach") {
      this.match("(");
      var key_type;
      var key_name;
      var value_type;
      var value_name;
      var arr_name;
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
      arr_name = this.getToken();
      this.match(")");
      var childs = this.matchOperatorsBlock();
      this.mathSemicolon = false;
      return BayrellCode.op_foreach(key_type, key_name, value_type, value_name, arr_name, childs);
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
    else if (first_name == ";") {
      return null;
    }
    else if (first_name == "++") {
      var name = this.matchMultiName();
      this.match("++");
      return BayrellCode.op_inc(BayrellCode.op_load(name));
    }
    else if (first_name == "--") {
      var name = this.matchMultiName();
      this.match("--");
      return BayrellCode.op_dec(BayrellCode.op_load(name));
    }
    if (this.isLookToken("[")) {
      var pos = [];
      while (this.isLookToken("[")) {
        this.match("[");
        array_push(pos, this.matchConcat());
        this.match("]");
      }
      first_name = BayrellCode.op_load_arr(first_name, pos);
    }
    if (this.isLookToken("(")) {
      this.match("(");
      var args = this.matchCallArgs();
      this.match(")");
      return BayrellCode.op_call_func(first_name, args);
    }
    else if (this.isLookToken("=")) {
      this.match("=");
      var code_tree = this.matchExpression();
      return BayrellCode.op_assign(first_name, code_tree);
    }
    else if (this.isLookToken("+=")) {
      this.match("+=");
      var code_tree = this.matchExpression();
      return BayrellCode.op_assign_inc(first_name, code_tree);
    }
    else if (this.isLookToken("-=")) {
      this.match("-=");
      var code_tree = this.matchExpression();
      return BayrellCode.op_assign_dec(first_name, code_tree);
    }
    else if (this.isLookToken("++")) {
      this.match("++");
      return BayrellCode.op_inc(BayrellCode.op_load(first_name));
    }
    else if (this.isLookToken("--")) {
      this.match("--");
      return BayrellCode.op_dec(BayrellCode.op_load(first_name));
    }
    else if (is_string(first_name)) {
      var arr = [];
      var mathSemicolon = true;
      while (!this.eof()) {
        var name = this.getToken();
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
    else {
      throw this.createError("type must be string");
    }
  }
  /* * Парсит блок операторов между {} */
  
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
  /* * Парсит содержимое */
  
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
