"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
var BayrellCommonParser = m_bayrell_rtl.BayrellCommonParser;
var BayrellError = m_bayrell_rtl.BayrellError;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParserBay extends BayrellCommonParser {
    getClassName(){
        return "bayrell_lang.BayrellParserBay";
    }
    constructor(){
        super();
        this._mathSemicolon = true;
    }
    _initSpecTokens(){
        this._spec_tokens = [
            {
                "token": BayrellCommonParser.TOKEN_BASE,
                "type": BayrellCommonParser.TYPE_SINGLE,
                "arr": ["!==", "===", "!=", "==", "<=", ">=", "::", "&&", "||", ">>", "<<", "->", "++", "--", "+=", "-=", "~=", "#ifcode", "#switch", "#case", "#endswitch", "#endif"],
            },
            {
                "token": BayrellCommonParser.TOKEN_STRING,
                "type": BayrellCommonParser.TYPE_STRING,
                "arr": ["\"", "'"],
                "func": "_readTokenString",
            },
            {
                "token": BayrellCommonParser.TOKEN_COMMENT,
                "type": BayrellCommonParser.TYPE_PAIR,
                "json": {
                    "/*!": "*/",
                    "/**": "*/",
                    "/*": "*/",
                },
            }
        ];
    }
    _readTokenString(match_str, flag){
        if (!rtl.exists(flag)){flag = true;}
        var arr1 = ["n", "r", "t", "\\", "\"", "'"];
        /*
		\[0-7]{1,3}	- последовательность символов, соответствующая регулярному выражению символа в восьмеричной системе счисления, который молча переполняется, чтобы поместиться в байт (т.е. "\400" === "\000")
		\x[0-9A-Fa-f]{1,2} - последовательность символов, соответствующая регулярному выражению символа в шестнадцатеричной системе счисления
		\u{[0-9A-Fa-f]+} - последовательность символов, соответствующая регулярному выражению символа Unicode, которая отображается в строка в представлении UTF-8 (добавлено в PHP 7.0.0)
		*/
        var len = rtl.strlen(s);
        var len_match = rtl.strlen(match_str);
        var s = "";
        var look = this._lookChar();
        var look_str = this._lookString(len_match);
        while (look !== "" && look_str != match_str) {
            if (look == "\\") {
                var look2 = this._readLookChar(look);
                if (rtl.in_array(look2, arr1)) {
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
                }
                else {
                    s = s + rtl.toString(look2);
                }
                look = this._readLookChar(look2);
            }
            else {
                s = s + rtl.toString(look);
                look = this._readLookChar(look);
            }
            look_str = this._lookString(len_match);
        }
        if (len > 1) {
            s = rtl.substr(s, 0, rtl.strlen(s) - len_match + 1);
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
	 * Поиск запятой в цикле
	 * @return {int} результат
	 *   -1 - прервать и выйти из цикла. Комманда break
	 *    1 - продолжить выполнение цикла с начала. Комманда continue
	 *    0 - идти дальше
	 */
    matchComma(match_comma, stop_token){
        if (match_comma) {
            this.match(",");
            match_comma = false;
        }
        if (this.isLookComment()) {
            this.getToken();
            return 1;
        }
        if (this.eof()) {
            return -1;
        }
        if (this.isLookToken(stop_token)) {
            return -1;
        }
        return 0;
    }
    /*
	 * Вызвать аргументы
	 */
    matchCallArgs(ch){
        if (!rtl.exists(ch)){ch = ")";}
        var childs = [];
        var match_comma = false;
        while (!this.isLookToken(ch) && !this.eof()) {
            /* Ищем запятую. Запятая должна разделять элементы */
            var res = this.matchComma(match_comma, ch);
            if (res == 1) {
                continue;
            }
            else if (res == -1) {
                break;
            }
            rtl.array_push(childs, this.matchExpression());
            match_comma = true;
        }
        return childs;
    }
    /*
	 * Вызвать аргументы
	 */
    matchTypeArgs(ch){
        if (!rtl.exists(ch)){ch = ">";}
        var childs = [];
        var match_comma = false;
        while (!this.isLookToken(ch) && !this.eof()) {
            /* Ищем запятую. Запятая должна разделять элементы */
            var res = this.matchComma(match_comma, ch);
            if (res == 1) {
                continue;
            }
            else if (res == -1) {
                break;
            }
            rtl.array_push(childs, this.matchIdentifier());
            match_comma = true;
        }
        return childs;
    }
    /*
	 * Читает флаги
	 */
    readFlags(){
        var flags = rtl.clone(BayrellCode.FLAGS_OBJ);
        var sz = rtl.count(BayrellCode.FLAGS);
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
        var match_comma = false;
        while (!this.isLookToken(")") && !this.eof()) {
            /* Ищем запятую. Запятая должна разделять элементы */
            var res = this.matchComma(match_comma, ")");
            if (res == 1) {
                continue;
            }
            else if (res == -1) {
                break;
            }
            var flags = this.readFlags();
            /* TODO: тип может быть классом с указанием package и namespace. 
			Нужно использовать функцию matchMultiName */
            var tp = this.getToken();
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
            rtl.array_push(childs, BayrellCode.op_declare_var(name, tp, value, flags));
            match_comma = true;
        }
        return childs;
    }
    /*
	 * Сканирует имя, разделенное точками
	 */
    matchMultiName(){
        var name = "";
        var names = [];
        /* TODO: проверка на то, что getToken это токен, а не строка, коммментарий или еще чего */
        if (!this.isLookToken(".")) {
            name = this.getToken();
            rtl.array_push(names, name);
        }
        while (this.isLookToken(".")) {
            name = this.getToken();
            rtl.array_push(names, name);
            /* read name */
            name = this.getToken();
            rtl.array_push(names, name);
        }
        return rtl.implode("", names);
    }
    mathNum(){
        var value = this.getToken();
        if (this.isLookToken(".")) {
            this.match(".");
            if (!this.isLookTokenNumeric()) {
                throw this.createError(
                    BayrellParserBay.ERROR_EXPECTED,
                    {
                        "what": "double",
                    }
                );
            }
            value += rtl.toString("." + rtl.toString(this.getToken()));
        }
        return value;
    }
    /*
	 * Сканирует на наличие идентификатора
	 */
    matchName(arr1){
        if (!rtl.exists(arr1)){arr1 = [".", "::", "[", "("];}
        if (this._look_token_type == "string") {
            var value = this.getToken();
            return BayrellCode.op_string(value);
        }
        else if (this.isLookTokenNumeric()) {
            var name = this.mathNum();
            return BayrellCode.op_fixed(name);
        }
        var arr0 = [".", "::", "[", "(", "<"];
        /* Определяем символы, которые нужно анализировать пересечением массивов arr0 и arr1 */
        var arr2 = [];
        var sz = rtl.count(arr1);
        for (var i = 0; i < sz; i++) {
            if (rtl.in_array(arr1[i], arr0)) {
                rtl.array_push(arr2, arr1[i]);
            }
        }
        var name = this.matchIdentifier();
        var arr = [];
        var pos = null;
        var args = [];
        rtl.array_push(arr, BayrellCode.op_load(name));
        while (this.isLookTokenArr(arr2)) {
            if (this.isLookToken(".")) {
                this.match(".");
                name = this.matchIdentifier();
                rtl.array_push(arr, BayrellCode.op_load_dynamic(name));
            }
            else if (this.isLookToken("::")) {
                this.match("::");
                name = this.matchIdentifier();
                rtl.array_push(arr, BayrellCode.op_load_static(name));
            }
            else if (this.isLookToken("[")) {
                this.match("[");
                pos = this.matchExpression();
                this.match("]");
                rtl.array_push(arr, BayrellCode.op_load_arr(pos));
            }
            else if (this.isLookToken("(")) {
                this.match("(");
                args = this.matchCallArgs();
                this.match(")");
                rtl.array_push(arr, BayrellCode.op_call(args));
            }
            else if (this.isLookToken("<")) {
                this.match("<");
                args = this.matchTypeArgs(">");
                this.match(">");
                /*rtl::array_push(arr,  BayrellCode::op_call(args));*/
            }
        }
        if (rtl.count(arr) == 1) {
            return arr[0];
        }
        var res = BayrellCode.op_load_names_calc(arr);
        return res;
    }
    /*
	 * Сканирует Array
	 */
    matchArray(){
        this.match("[");
        var values = [];
        var match_comma = false;
        while (!this.isLookToken("]") && !this.eof()) {
            /* Ищем запятую. Запятая должна разделять элементы */
            var res = this.matchComma(match_comma, "]");
            if (res == 1) {
                continue;
            }
            else if (res == -1) {
                break;
            }
            if (this.isLookComment()) {
                this.getToken();
                continue;
            }
            rtl.array_push(values, this.matchExpression());
            match_comma = true;
        }
        this.match("]");
        return BayrellCode.op_array(values);
    }
    /*
	 * Сканирует JSON
	 */
    matchJson(){
        this.match("{");
        var obj = {};
        var match_comma = false;
        while (!this.isLookToken("}") && !this.eof()) {
            /* Ищем запятую. Запятая должна разделять элементы */
            var res = this.matchComma(match_comma, "}");
            if (res == 1) {
                continue;
            }
            else if (res == -1) {
                break;
            }
            if (this._look_token_type == BayrellCommonParser.TOKEN_STRING) {
                var key = this.getToken();
                this.match(":");
                var value = this.matchExpression();
                obj[key] = value;
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_EXPECTED,
                    {
                        "what": "string key",
                    }
                );
            }
            match_comma = true;
        }
        this.match("}");
        return BayrellCode.op_json(obj);
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
            return this.matchArray();
        }
        else if (this.isLookToken("{")) {
            return this.matchJson();
        }
        var res = this.matchName();
        if (this.isLookToken("++")) {
            this.match("++");
            return BayrellCode.op_post_inc(res);
        }
        else if (this.isLookToken("--")) {
            this.match("--");
            return BayrellCode.op_post_dec(res);
        }
        return res;
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
        rtl.array_push(arr, this.matchOpName());
        while (this.isLookTokenArr(
            ["*", "/"]
        ) && !this.eof()) {
            if (this.isLookToken("*")) {
                rtl.array_push(arr, this.matchMultiply());
            }
            else if (this.isLookToken("/")) {
                rtl.array_push(arr, this.matchDivide());
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_EXPECTED,
                    {
                        "what": "\"*\" or \"/\"",
                    }
                );
            }
        }
        if (rtl.count(arr) == 1) {
            return arr[0];
        }
        return BayrellCode.op_calc(arr);
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
        rtl.array_push(arr, this.matchFactor());
        while (this.isLookTokenArr(
            ["+", "-"]
        ) && !this.eof()) {
            if (this.isLookToken("+")) {
                rtl.array_push(arr, this.matchAdd());
            }
            else if (this.isLookToken("-")) {
                rtl.array_push(arr, this.matchSub());
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_EXPECTED,
                    {
                        "what": "\"+\" or \"-\"",
                    }
                );
            }
        }
        if (rtl.count(arr) == 1) {
            return arr[0];
        }
        return BayrellCode.op_calc(arr);
    }
    /*
	 * Сканирует арифметические операции
	 */
    matchConcat(){
        var arr = [];
        rtl.array_push(arr, this.matchArithmetic());
        while (this.isLookToken("~") && !this.eof()) {
            if (this.isLookToken("~")) {
                this.match("~");
                rtl.array_push(arr, BayrellCode.op_concat(this.matchArithmetic()));
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_EXPECTED,
                    {
                        "what": "~",
                    }
                );
            }
        }
        if (rtl.count(arr) == 1) {
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
        if (this.isLookTokenArr(
            [">", "!", "<", "=", "!=", "==", "===", "!==", "<=", ">=", "in", "is", "instanceof"]
        )) {
            op = this.getToken();
            /*
			TODO: какой то баг
			if (this.isLookToken('=')){
				op = op + this.getToken();
			}
			if (this._look_token == '=' and op == '!=' or this._look_token == '=' and op == '=='){
				op = op + this.getToken();
			}
			*/
            right = this.matchConcat();
        }
        if (op == null) {
            return left;
        }
        else if (op == "instanceof") {
            return BayrellCode.op_instanceof(op, left, right);
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
        rtl.array_push(arr, this.matchLogicExpression());
        while (this.isLookToken("and") && !this.eof()) {
            this.match("and");
            rtl.array_push(arr, BayrellCode.op_and(this.matchLogicExpression()));
        }
        if (rtl.count(arr) == 1) {
            return arr[0];
        }
        return BayrellCode.op_calc(arr);
    }
    /*
	 * Сканирует логическое или
	 */
    matchOr(){
        var arr = [];
        rtl.array_push(arr, this.matchAnd());
        while (this.isLookToken("or") && !this.eof()) {
            this.match("or");
            rtl.array_push(arr, BayrellCode.op_or(this.matchAnd()));
        }
        if (rtl.count(arr) == 1) {
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
            throw this._createError(
                BayrellCommonParser.ERROR_EXPECTED,
                {
                    "what": "then",
                }
            );
        }
        var code_str = this._readUntilStringArr(
            ["#endif", "#case", "#endswitch"],
            false
        );
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
            rtl.array_push(arr, this.matchPreprocessorDirective());
        }
        this.match("#endswitch");
        if (rtl.count(arr) == 1) {
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
        throw this.createError(
            BayrellParserBay.ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE,
            {
                "name": this._look_token,
            }
        );
        return null;
    }
    /*
	 * Сканирует на наличие оператора
	 */
    matchOperator(){
        /* Читаем комментарий */
        if (this._look_token_type == "comment") {
            var comment = this.getToken();
            this._mathSemicolon = false;
            return BayrellCode.op_comment(comment);
        }
        if (this.isLookTokenArr(
            ["#switch", "#ifcode"]
        )) {
            this._mathSemicolon = false;
            return this.matchPreprocessorDirective();
        }
        var flags = this.readFlags();
        /*string first_name = this.matchName();*/
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
            this._mathSemicolon = false;
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
            /*return BayrellCode::op_package(name);*/
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
                    rtl.array_push(arr, token);
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
                        rtl.array_push(else_if, this.matchOperatorsBlock());
                    }
                    else {
                        if (code_false != null) {
                            this.error("dublicate else");
                        }
                        code_false = this.matchOperatorsBlock();
                    }
                }
            }
            this._mathSemicolon = false;
            return BayrellCode.op_if(expr, code_true, code_false, else_if);
        }
        else if (this.isLookToken("while")) {
            this.match("while");
            this.match("(");
            var expr = this.matchExpression();
            this.match(")");
            var code_loop = this.matchOperatorsBlock();
            this._mathSemicolon = false;
            return BayrellCode.op_while(expr, code_loop);
        }
        else if (this.isLookToken("for")) {
            this.match("for");
            this.match("(");
            var loop_init = null;
            var loop_name = this.matchName(
                [".", "::"]
            );
            if (this.isLookTokenIdentifier()) {
                var second_name = this.matchIdentifier();
                this.match("=");
                var code_tree = this.matchExpression();
                loop_init = BayrellCode.op_declare_var(
                    second_name,
                    loop_name,
                    code_tree,
                    {}
                );
            }
            else if (this.isLookToken("=")) {
                this.match("=");
                var code_tree = this.matchExpression();
                loop_init = BayrellCode.op_assign(loop_name, code_tree);
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_UNKNOWN_IDENT,
                    {
                        "name": this._look_token,
                    }
                );
            }
            this.match(";");
            var loop_expression = this.matchExpression();
            this.match(";");
            var loop_inc = this.matchOperator();
            this.match(")");
            var childs = this.matchOperatorsBlock();
            this._mathSemicolon = false;
            return BayrellCode.op_for(loop_init, loop_expression, loop_inc, childs);
        }
        else if (this.isLookToken("foreach")) {
            this.match("foreach");
            this.match("(");
            var key_type;
            var key_name;
            var value_type;
            var value_name;
            value_type = this.getToken();
            value_name = this.getToken();
            key_type = "";
            key_name = "";
            if (this.isLookToken(",")) {
                this.match(",");
                key_type = value_type;
                key_name = value_name;
                value_type = this.getToken();
                value_name = this.getToken();
            }
            this.match("in");
            var arr_name = this.matchName();
            this.match(")");
            var childs = this.matchOperatorsBlock();
            this._mathSemicolon = false;
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
        else if (this.isLookToken("delete")) {
            this.match("delete");
            var name = this.matchName(
                [".", "::", "["]
            );
            return BayrellCode.op_del(name);
        }
        else if (this.isLookToken(";")) {
            this.match(";");
            return null;
        }
        else if (this.isLookToken("++")) {
            this.match("++");
            var first_name = this.matchName(
                [".", "::"]
            );
            return BayrellCode.op_inc(first_name);
        }
        else if (this.isLookToken("--")) {
            this.match("--");
            var first_name = this.matchName(
                [".", "::"]
            );
            return BayrellCode.op_dec(first_name);
        }
        var first_name = this.matchName(
            [".", "::", "[", "<"]
        );
        /* Match SubOperator */
        if (this.isLookToken("=")) {
            this.match("=");
            var code_tree = this.matchExpression();
            return BayrellCode.op_assign(first_name, code_tree);
        }
        else if (this.isLookToken("++")) {
            this.match("++");
            return BayrellCode.op_inc(first_name);
        }
        else if (this.isLookToken("--")) {
            this.match("--");
            return BayrellCode.op_dec(first_name);
        }
        else if (this.isLookToken("+=")) {
            this.match("+=");
            var code_tree = this.matchExpression();
            return BayrellCode.op_assign_inc(first_name, code_tree);
        }
        else if (this.isLookToken("~=")) {
            this.match("~=");
            var code_tree = this.matchExpression();
            return BayrellCode.op_assign_concat(first_name, code_tree);
        }
        else if (this.isLookToken("-=")) {
            this.match("-=");
            var code_tree = this.matchExpression();
            return BayrellCode.op_assign_dec(first_name, code_tree);
        }
        else if (this.isLookToken(";")) {
            return first_name;
        }
        else if (this.isLookTokenArr(
            ["("]
        )) {
            var arr = [];
            if (first_name["op"] == BayrellCode.OP_LOAD) {
                rtl.array_push(arr, first_name);
            }
            else if (first_name["op"] == BayrellCode.OP_LOAD_NAMES || first_name["op"] == BayrellCode.OP_LOAD_NAMES_CALC) {
                arr = rtl.clone(first_name["arr"]);
            }
            else {
                throw this.createError(
                    BayrellParserBay.ERROR_UNKNOWN_OP_CODE,
                    {}
                );
            }
            var name = "";
            var pos = null;
            var args = [];
            while (this.isLookTokenArr(
                [".", "::", "[", "("]
            )) {
                if (this.isLookToken(".")) {
                    this.match(".");
                    name = this.matchToken();
                    rtl.array_push(arr, BayrellCode.op_load_dynamic(name));
                }
                else if (this.isLookToken("::")) {
                    this.match("::");
                    name = this.matchToken();
                    rtl.array_push(arr, BayrellCode.op_load_static(name));
                }
                else if (this.isLookToken("[")) {
                    this.match("[");
                    pos = this.matchExpression();
                    this.match("]");
                    rtl.array_push(arr, BayrellCode.op_load_arr(pos));
                }
                else if (this.isLookToken("(")) {
                    this.match("(");
                    args = this.matchCallArgs();
                    this.match(")");
                    rtl.array_push(arr, BayrellCode.op_call(args));
                }
            }
            return BayrellCode.op_load_names(arr);
        }
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
                rtl.array_push(arr, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
            }
            else if (this.isLookToken("(")) {
                this.match("(");
                var args = this.matchDeclareArgs();
                this.match(")");
                var code_tree = null;
                if (flags["declare"] == false) {
                    code_tree = this.matchOperatorsBlock();
                    this._mathSemicolon = false;
                }
                else {
                    this._mathSemicolon = true;
                }
                rtl.array_push(arr, BayrellCode.op_declare_func(name, first_name, args, code_tree, flags));
            }
            else {
                rtl.array_push(arr, BayrellCode.op_declare_var(name, first_name, code_tree, flags));
            }
            if (this.isLookToken(",")) {
                this.match(",");
            }
            else {
                break;
            }
        }
        if (rtl.count(arr) == 1) {
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
            rtl.array_push(code_tree, this.matchOperator());
            if (this._mathSemicolon || this.isLookToken(";")) {
                this.match(";");
            }
            this._mathSemicolon = true;
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
    parseRun(){
        var arr = [];
        while (!this.eof()) {
            rtl.array_push(arr, this.matchOperator());
            if (this._mathSemicolon) {
                this.match(";");
            }
            this._mathSemicolon = true;
        }
        if (rtl.count(arr) == 1) {
            this._code_tree = arr[0];
        }
        else {
            this._code_tree = BayrellCode.op_nope(arr);
        }
    }
    /*
	 * Парсит контент и возвращает code tree дерево
	 * @return {json} Дерево code tree
	 */
    parse(){
        this.reset();
        this.parseRun();
        return this._code_tree;
    }
    /*
	 * Парсит контент выражение и возвращает code tree дерево
	 * @return {json} Дерево code tree
	 */
    parseExpression(content){
        this.setContent(content);
        this.reset();
        this._code_tree = this.matchExpression();
        return this._code_tree;
    }
}
module.exports.BayrellParserBay = BayrellParserBay;
