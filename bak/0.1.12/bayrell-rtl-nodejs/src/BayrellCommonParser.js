"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016-2017 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
  */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellCommonParser extends BayrellObject {
	/*  Описание токенов  */
	constructor(){
		super();
		this._file_name = "";
		this._content = "";
		this._content_sz = 0;
		this._content_pos = 0;
		this._content_cursor_pos = {
			"line":0,
			"col":0,
		};
		this._start_pos = {
			"line":1,
			"col":1,
		};
		this._look_token = "";
		this._look_token_type = "";
		this._current_token = null;
		this._old_token = null;
		this._code_tree = null;
		this._crlf = "\n";
		this._indent = "\t";
		this._tab_space_count = 4;
		this._spec_tokens = [];
		this._all_tokens = [];
		this._all_tokens_sz = 0;
		this._initSpecTokens();
		var sz = rtl.count(this._spec_tokens);
		for (var i = 0; i < sz; i++) {
			var row = this._spec_tokens[i];
			if (row["type"] == BayrellCommonParser.TYPE_PAIR) {
				for (var key in row["json"]){
					var val = row["json"][key];
					rtl.array_push(this._all_tokens, key);
				}
			}
			else {
				var sz2 = rtl.count(row["arr"]);
				for (var j = 0; j < sz2; j++) {
					rtl.array_push(this._all_tokens, row["arr"][j]);
				}
			}
		}
		this._all_tokens_sz = rtl.count(this._all_tokens);
	}
	_initSpecTokens(){
	}
	isAlphaChar(ch){
		return rtl.strpos("qazwsxedcrfvtgbyhnujmikolp", rtl.strtolower(ch)) !== -1;
	}
	isNumChar(ch){
		return rtl.strpos("0123456789", ch) !== -1;
	}
	isNumeric(s){
		var i = 0;
		while (i < rtl.strlen(s)) {
			if (!this.isNumChar(s[i])) {
				return false;
			}
			i = i + 1;
		}
		return true;
	}
	isSkipChar(ch){
		if (rtl.ord(ch) <= 32) {
			return true;
		}
		return false;
	}
	isTokenChar(ch){
		return rtl.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", rtl.strtolower(ch)) !== -1;
	}
	isToken(s){
		var i = 0;
		while (i < rtl.strlen(s)) {
			if (!this.isTokenChar(s[i])) {
				return false;
			}
			i = i + 1;
		}
		return true;
	}
	isIdentifier(name){
		return this.isToken(name);
	}
	/*  ---- Begin core read token system ----  */
	/* 
	 * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {json} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка
	  */
	_createError(error, params, line, col){
		if (!rtl.exists(line)){line = -1;}
		if (!rtl.exists(col)){col = -1;}
		var pos = this._getCursorPos();
		if (line == -1) {
			line = pos["line"];
		}
		if (col == -1) {
			col = pos["col"];
		}
		return BayrellError.createError(error, params, this._file_name, line, col);
	}
	_match(look_str){
		var s = this._readString(rtl.strlen(look_str));
		if (s == look_str) {
			return s;
		}
		if (look_str == "\n") {
			this._expected("new line");
		}
		else {
			this._expected(look_str);
		}
	}
	/* 
	 * Вызываем исключение, о том что срока s не была найдена
	 * @param {string} s - строка
	  */
	_expected(s){
		throw this._createError(BayrellCommonParser.ERROR_EXPECTED, {
			"what":s,
		});
	}
	_getCursorPos(){
		return rtl.clone(this._content_cursor_pos);
	}
	_moveCursorPos(ch, invert){
		if (!rtl.exists(invert)){invert = 1;}
		if (ch == "\n") {
			this._content_cursor_pos = {
				"line":this._content_cursor_pos["line"] + invert,
				"col":1,
			};
		}
		else if (ch == "\t") {
			this._content_cursor_pos = {
				"line":this._content_cursor_pos["line"],
				"col":this._content_cursor_pos["col"] + this._tab_space_count * invert,
			};
		}
		else {
			this._content_cursor_pos = {
				"line":this._content_cursor_pos["line"],
				"col":this._content_cursor_pos["col"] + invert,
			};
		}
	}
	_movePosByToken(token, invert){
		if (!rtl.exists(invert)){invert = 1;}
		var sz = rtl.strlen(token);
		for (var i = 0; i < sz; i++) {
			this._moveCursorPos(token[i], invert);
		}
		this._content_pos = this._content_pos - sz;
	}
	_lookChar(){
		if (this._content_pos >= this._content_sz) {
			return "";
		}
		var ch = this._content[this._content_pos];
		return ch;
	}
	_lookString(len){
		if (this._content_pos + len - 1 >= this._content_sz) {
			return null;
		}
		var s = rtl.substr(this._content, this._content_pos, len);
		return s;
	}
	_readChar(){
		if (this._content_pos >= this._content_sz) {
			return "";
		}
		var ch = this._content[this._content_pos];
		this._content_pos = this._content_pos + 1;
		this._moveCursorPos(ch, 1);
		return ch;
	}
	_readLookChar(look){
		this._content_pos = this._content_pos + 1;
		this._moveCursorPos(look, 1);
		return this._lookChar();
	}
	_readString(len){
		if (this._content_pos + len - 1 >= this._content_sz) {
			return null;
		}
		var s = rtl.substr(this._content, this._content_pos, len);
		var i = 0;
		while (i < len) {
			this._content_pos = this._content_pos + 1;
			this._moveCursorPos(s[i], 1);
			i = i + 1;
		}
		return s;
	}
	/* 
	 * Читает строку, до тех пор, пока не встретит match_str
	 * @param {string} match_str - строка окончание
	 * @param {bool} flag_match - нужно ли прочитать match_str или нет. По умолчанию true.
	 * @return {string} Прочитанная строка, без окончания
	  */
	_readUntilString(match_str, flag_match){
		if (!rtl.exists(flag_match)){flag_match = true;}
		var len_match = rtl.strlen(match_str);
		var s = "";
		var look = this._lookChar();
		var look_str = this._lookString(len_match);
		while (look != "" && look_str != match_str) {
			s = s + rtl.toString(look);
			look = this._readLookChar(look);
			look_str = this._lookString(len_match);
		}
		/* 
		if (len_match > 1){
			s = rtl::substr(s, 0, rtl::strlen(s) - len_match + 1);
		}
		 */
		if (flag_match) {
			this._match(match_str);
		}
		return s;
	}
	/* 
	 * Возвращает индекс строки из массива, которая идет следующей. Либо -1, если строка не найдена
	 * @param {array} match_str - массив строк
	 * @return {int} Индекс в массиве
	  */
	_lookStringFromArr(match_str){
		var look_str = "";
		var s = "";
		var sz = rtl.count(match_str);
		for (var i = 0; i < sz; i++) {
			s = match_str[i];
			look_str = this._lookString(rtl.strlen(s));
			if (look_str == s) {
				return i;
			}
		}
		return -1;
	}
	/* 
	 * Читает строку, до тех пор, пока не встретит хотя бы одну строку из массива match_str
	 * @param {string} match_str - массив строк окончаний
	 * @param {bool} flag_match - нужно ли прочитать match_str или нет. По умолчанию true.
	 * @return {string} Прочитанная строка, без окончания
	  */
	_readUntilStringArr(match_str, flag_match){
		if (!rtl.exists(flag_match)){flag_match = true;}
		var s = "";
		var look = this._lookChar();
		var j = this._lookStringFromArr(match_str);
		while (look != "" && j == -1) {
			s = s + rtl.toString(look);
			look = this._readLookChar(look);
			j = this._lookStringFromArr(match_str);
		}
		if (flag_match && j != -1) {
			this._match(match_str[j]);
		}
		return s;
	}
	_skipSystemChar(){
		var look = this._lookChar();
		while (look != "" && this.isSkipChar(look)) {
			look = this._readLookChar(look);
		}
	}
	_readToken(){
		var pos = this._getCursorPos();
		var value = this._readChar();
		if (value == "") {
			return {
				"type":BayrellCommonParser.TOKEN_NONE,
				"value":"",
				"pos":pos,
			};
		}
		if (!this.isTokenChar(value)) {
			return {
				"type":BayrellCommonParser.TOKEN_BASE,
				"value":value,
				"pos":pos,
			};
		}
		var look = this._lookChar();
		while (look != "" && this.isTokenChar(look)) {
			value = value + rtl.toString(look);
			look = this._readLookChar(look);
		}
		return {
			"type":BayrellCommonParser.TOKEN_BASE,
			"value":value,
			"pos":pos,
		};
	}
	_readTokenString(look, flag){
		if (!rtl.exists(flag)){flag = true;}
		return this._readUntilString(look, flag);
	}
	_readSpecialTokenRow(look, len, row){
		var type = row["type"];
		if (type == BayrellCommonParser.TYPE_SINGLE) {
			this._readString(len);
			return {
				"type":row["token"],
				"value":look,
				"pos":this._getCursorPos(),
			};
		}
		else if (type == BayrellCommonParser.TYPE_TWINS) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readUntilString(look);
			return {
				"type":row["token"],
				"value":value,
				"pos":pos,
			};
		}
		else if (type == BayrellCommonParser.TYPE_PAIR) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readUntilString(row["json"][look]);
			return {
				"type":row["token"],
				"value":value,
				"pos":pos,
			};
		}
		else if (type == BayrellCommonParser.TYPE_END_LINE) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readUntilString(this._rtl);
			return {
				"type":row["token"],
				"value":value,
				"pos":pos,
			};
		}
		else if (type == BayrellCommonParser.TYPE_STRING) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readTokenString(look);
			return {
				"type":row["token"],
				"value":value,
				"pos":pos,
			};
		}
		return null;
	}
	_readSpecialTokenUnknownType(look, len, row){
		return null;
	}
	_readSpecialToken(look){
		var len = rtl.strlen(look);
		var sz = rtl.count(this._spec_tokens);
		for (var i = 0; i < sz; i++) {
			var row = this._spec_tokens[i];
			if (rtl.in_array(row["type"], [BayrellCommonParser.TYPE_SINGLE, BayrellCommonParser.TYPE_TWINS, BayrellCommonParser.TYPE_END_LINE, BayrellCommonParser.TYPE_STRING])) {
				if (rtl.in_array(look, row["arr"])) {
					return this._readSpecialTokenRow(look, len, row);
				}
			}
			else if (row["type"] == BayrellCommonParser.TYPE_PAIR) {
				if (rtl.key_exists(row["json"], look)) {
					return this._readSpecialTokenRow(look, len, row);
				}
			}
			else {
				return this._readSpecialTokenUnknownType(look, len, row);
			}
		}
		return null;
	}
	/*  ---- End core read token system ----  */
	getToken(){
		this._old_token = rtl.clone(this._current_token);
		this._skipSystemChar();
		/*  Чтение парных токенов  */
		var flag = false;
		if (this._all_tokens_sz > 0) {
			var cache = {};
			var i = 0;
			while (i < this._all_tokens_sz) {
				var look_str;
				var len = rtl.strlen(this._all_tokens[i]);
				if (rtl.key_exists(cache, len)) {
					look_str = cache[len];
				}
				else {
					cache[len] = this._lookString(len);
					look_str = cache[len];
				}
				if (look_str == this._all_tokens[i]) {
					this._current_token = this._readSpecialToken(look_str);
					if (this._current_token != null) {
						flag = true;
					}
					break;
				}
				i = i + 1;
			}
		}
		if (!flag) {
			this._current_token = this._readToken();
		}
		this._look_token = this._current_token["value"];
		this._look_token_type = this._current_token["type"];
		if (this._old_token == null) {
			return null;
		}
		return this._old_token["value"];
	}
	getTokenJson(){
		this.getToken();
		return rtl.clone(this._old_token);
	}
	readUntilString(match_str, flag_match){
		if (!rtl.exists(flag_match)){flag_match = true;}
		if (this._current_token["value"] == match_str) {
			if (flag_match) {
				this.getToken();
			}
			return "";
		}
		var s = this._current_token["value"] + rtl.toString(this._readUntilString(match_str, flag_match));
		this.getToken();
		return s;
	}
	readLine(){
		return this.readUntilString("\n");
	}
	getCursorPos(){
		if (this._old_token == null) {
			return rtl.clone(this._content_cursor_pos);
		}
		return rtl.clone(this._old_token["pos"]);
	}
	getLookCursorPos(){
		return this.getLookPos();
	}
	getLookPos(){
		if (this._current_token == null) {
			return rtl.clone(this._content_cursor_pos);
		}
		return rtl.clone(this._current_token["pos"]);
	}
	eof(){
		return this._look_token_type == BayrellCommonParser.TOKEN_NONE;
	}
	lookToken(){
		return this._current_token["value"];
	}
	lookTokenType(){
		return this._current_token["type"];
	}
	isLookToken(token, type){
		if (!rtl.exists(type)){type = "token";}
		return this._look_token == token && type == this._look_token_type;
	}
	isLookComment(){
		return this._look_token_type == BayrellCommonParser.TOKEN_COMMENT;
	}
	isLookTokenNumeric(type){
		if (!rtl.exists(type)){type = "token";}
		return this.isNumeric(this._look_token) && type == this._look_token_type;
	}
	isLookTokenIdentifier(type){
		if (!rtl.exists(type)){type = "token";}
		return this.isIdentifier(this._look_token) && type == this._look_token_type;
	}
	isLookTokenArr(tokens, type){
		if (!rtl.exists(type)){type = "token";}
		return rtl.in_array(this._look_token, tokens) && type == this._look_token_type;
	}
	/* 
	 * Ищет следующее вхождение строки. Если нет, то вызывает исключение BayrellError
	 * @param {string} s - строка, которую мы ищем
	 * @return {string} число
	  */
	match(s, token_type){
		if (!rtl.exists(token_type)){token_type = "";}
		if (token_type == "") {
			token_type = BayrellCommonParser.TOKEN_BASE;
		}
		var token = this.getToken();
		if (token == s) {
			return token;
		}
		if (s == "\n") {
			this.expected("new line");
		}
		else {
			this.expected(s);
		}
	}
	/* 
	 * Сканирует на наличие токена определенного типа
	 * @param {string} type - тип токена
	 * @return {string} токен
	  */
	matchToken(type){
		if (!rtl.exists(type)){type = "token";}
		var token = this.getTokenJson();
		if (token["type"] == type) {
			return token["value"];
		}
		throw this.createError(BayrellCommonParser.ERROR_EXPECTED, {
			"what":type,
		});
	}
	/* 
	 * Сканирует на наличие идентификатора
	 * @return {string} токен
	  */
	matchIdentifier(){
		var token = this.matchToken();
		if (!this.isIdentifier(token)) {
			throw this.createError(BayrellCommonParser.ERROR_UNKNOWN_IDENT, {
				"name":token,
			});
		}
		return token;
	}
	/* 
	 * Ищет следующее вхождение число. Если нет, то вызывает исключение BayrellError
	 * @return {string} число
	  */
	matchNum(){
		var _res = this.getToken();
		if (!is_numeric(_res)) {
			this.expected("numeric");
		}
		return _res["token"];
	}
	/* 
	 * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {json} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка
	  */
	createError(error, params, line, col){
		if (!rtl.exists(line)){line = -1;}
		if (!rtl.exists(col)){col = -1;}
		var pos = this.getCursorPos();
		if (line == -1) {
			line = pos["line"];
		}
		if (col == -1) {
			col = pos["col"];
		}
		return BayrellError.createError(error, params, this._file_name, line, col);
	}
	/* 
	 * Вызываем исключение, о том что срока s не была найдена
	 * @param {string} s - строка
	  */
	expected(s){
		throw this.createError(BayrellCommonParser.ERROR_EXPECTED, {
			"what":s,
		});
	}
	/* 
	 * Сбрасывает значение
	  */
	reset(){
		this._content_pos = 0;
		this._content_cursor_pos = rtl.clone(this._start_pos);
		this._content_sz = rtl.strlen(this._content);
		this.initParser();
		this.getToken();
	}
	/* 
	 * Устанавливает контент 
	 * @param {string} content - программа
	  */
	setContent(content){
		this._content = content;
	}
	/* 
	 * Устанавливаем название файла
	  */
	setFileName(file_name){
		this._file_name = file_name;
	}
	/* 
	 * Получаем название файла
	  */
	getFileName(file_name){
		return this._file_name;
	}
	/* 
	 * Устанавливаем стратовую позицию
	  */
	setInitPos(start_pos){
		this._start_pos = rtl.clone(start_pos);
	}
	/* 
	 * Инициализация парсера
	 * @param {string} content - программа
	  */
	initParser(){
	}
	/* 
	 * Запускает процесс парсера и складывает результат в this._code_tree
	  */
	parseRun(){
		this._code_tree = null;
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
	 * Парсит содержимое строки
	  */
	parseContent(content){
		this.setContent(content);
		this.reset();
		this.parseRun();
		return this._code_tree;
	}
	/* 
	 * Парсит содержимое файла. Название файла сохраняет в переменную file_name
	  */
	parseFile(file_name){
		this._file_name = file_name;
		var content = rtl.file_get_contents(file_name);
		this.setContent(content);
		this.reset();
		this.parseRun();
		return this._code_tree;
	}
	/* 
	 * Сравнивает по токенам собственное содержимое с другим парсером
	  */
	compare(parser){
		this.reset();
		parser.reset();
		while (!this.eof() && !parser.eof()) {
			var token1 = this.getToken();
			var token2 = parser.getToken();
			if (token1 != token2) {
				return false;
			}
		}
		if (this.eof() && parser.eof()) {
			return true;
		}
		return false;
	}
	/* 
	 * Сравнивает по токенам собственное содержимое с другой строкой
	  */
	compareContent(content){
		var parser = BayrellCommonParser.newInstance();
		parser.setContent(content);
		return this.compare(parser);
	}
}
BayrellCommonParser.TOKEN_NONE = "none";
BayrellCommonParser.TOKEN_BASE = "token";
BayrellCommonParser.TOKEN_COMMENT = "comment";
BayrellCommonParser.TOKEN_MULTILINE_COMMENT = "multiline_comment";
BayrellCommonParser.TOKEN_SINGLELINE_COMMENT = "singleline_comment";
BayrellCommonParser.TOKEN_STRING = "string";
BayrellCommonParser.TOKEN_JSON = "json";
BayrellCommonParser.TYPE_NONE = 0;
BayrellCommonParser.TYPE_SINGLE = 1;
BayrellCommonParser.TYPE_TWINS = 2;
BayrellCommonParser.TYPE_PAIR = 3;
BayrellCommonParser.TYPE_END_LINE = 4;
BayrellCommonParser.TYPE_STRING = 5;
BayrellCommonParser.ERROR_EXPECTED = ["bayrell_rtl", "ERROR_EXPECTED", -1001];
BayrellCommonParser.ERROR_UNKNOWN_IDENT = ["bayrell_rtl", "ERROR_UNKNOWN_IDENT", -1003];
BayrellCommonParser.ERROR_IDENT_IS_RESERVER_WORD = ["bayrell_rtl", "ERROR_IDENT_IS_RESERVER_WORD", -1002];
BayrellCommonParser.ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE = ["bayrell_rtl", "ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE", -1004];
BayrellCommonParser.ERROR_UNKNOWN_OP_CODE = ["bayrell_lang", "UNKNOWN_OP_CODE", -1005];
BayrellCommonParser.ERROR_NOT_ALLOWED_HERE = ["bayrell_rtl", "ERROR_NOT_ALLOWED_HERE", -1006];
module.exports.BayrellCommonParser = BayrellCommonParser;
