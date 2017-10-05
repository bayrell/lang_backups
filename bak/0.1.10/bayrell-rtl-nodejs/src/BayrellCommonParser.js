"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellCommonParser extends BayrellObject {
	/*  Описание токенов */
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
		this._tab_space_count = 4;
		this._look_token = "";
		this._look_token_type = "";
		this._current_token = null;
		this._old_token = null;
		this._code_tree = null;
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
	/*  ---- Begin Read Token System ---- */
	/* 
	 * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {json} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка
	 */
	_createError(error, params, line, col){
		var pos = this._getCursorPos();
		if (!rtl.isset(line)) {
			line = pos["line"];
		}
		if (!rtl.isset(col)) {
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
		if (!rtl.isset(invert)){invert = 1;}
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
	_lookChar(){
		if (this._content_pos >= this._content_sz) {
			return null;
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
			return null;
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
	_readUntilString(match_str, flag){
		if (!rtl.isset(flag)){flag = true;}
		var len = rtl.strlen(s);
		var len_match = rtl.strlen(match_str);
		var s = "";
		var look = this._lookChar();
		var look_str = this._lookString(len_match);
		while (look !== null && look_str != match_str) {
			s = s + look;
			look = this._readLookChar(look);
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
	_readTokenString(match_str, flag){
		return this._readUntilString(match_str, flag);
	}
	_skipSystemChar(){
		var look = this._lookChar();
		while (look !== null && this.isSkipChar(look)) {
			look = this._readLookChar(look);
		}
	}
	_readToken(){
		var pos = this._getCursorPos();
		var value = this._readChar();
		if (!this.isTokenChar(value)) {
			return {
				"type":BayrellCommonParser.TOKEN_BASE,
				"value":value,
				"pos":pos,
			};
		}
		var look = this._lookChar();
		while (look !== null && this.isTokenChar(look)) {
			value = value + look;
			look = this._readLookChar(look);
		}
		return {
			"type":BayrellCommonParser.TOKEN_BASE,
			"value":value,
			"pos":pos,
		};
	}
	eof(){
		return this._look_token === null;
	}
	lookToken(){
		return this._current_token["token"];
	}
	isLookToken(token, type){
		if (!rtl.isset(type)){type = "token";}
		return this._look_token == token && type == this._look_token_type;
	}
	isLookComment(){
		return this._look_token_type == BayrellCommonParser.TOKEN_COMMENT;
	}
	isLookTokenNumeric(type){
		if (!rtl.isset(type)){type = "token";}
		return this.isNumeric(this._look_token) && type == this._look_token_type;
	}
	isLookTokenIdentifier(type){
		if (!rtl.isset(type)){type = "token";}
		return this.isIdentifier(this._look_token) && type == this._look_token_type;
	}
	isLookTokenArr(tokens, type){
		if (!rtl.isset(type)){type = "token";}
		return rtl.in_array(this._look_token, tokens) && type == this._look_token_type;
	}
	getToken(){
		this._old_token = rtl.clone(this._current_token);
		this._skipSystemChar();
		this._current_token = this._readToken();
		this._look_token = this._current_token["value"];
		this._look_token_type = this._current_token["type"];
		if (this._old_token == null) {
			return null;
		}
		return this._old_token["value"];
	}
	getCursorPos(){
		return this._old_token["pos"];
	}
	/*  ---- End Read Token System ---- */
	/* 
	 * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {json} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка
	 */
	createError(error, params, line, col){
		var pos = this.getCursorPos();
		if (!rtl.isset(line)) {
			line = pos["line"];
		}
		if (!rtl.isset(col)) {
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
	 * Ищет следующее вхождение строки. Если нет, то вызывает исключение BayrellError
	 * @param {string} s - строка, которую мы ищем
	 * @return {string} число
	 */
	match(s, token_type){
		if (!rtl.isset(token_type)) {
			token_type = BayrellCommonParser.TOKEN_BASE;
		}
		if (this._look_token == s) {
			return this.getToken();
		}
		if (s == "\n") {
			this.expected("new line");
		}
		else {
			this.expected(s);
		}
	}
	/* 
	 * Сканирует на наличие токена
	 * @param {string} type - тип токена
	 * @return {string} токен
	 */
	matchToken(type){
		if (!rtl.isset(type)){type = "token";}
		if (this._look_token_type == type) {
			return this.getToken();
		}
		throw this.createError(BayrellCommonParser.ERROR_EXPECTED, {
			"what":type + " token",
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
		var result = this.getToken();
		if (!is_numeric(result)) {
			this.expected("numeric");
		}
		return result["token"];
	}
	/* 
	 * Сбрасывает значение
	 */
	reset(){
		this._content_pos = 0;
		this._content_cursor_pos = {
			"line":1,
			"col":1,
		};
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
	 * Инициализация парсера
	 * @param {string} content - программа
	 */
	initParser(){
	}
	/* 
	 * Парсит токены и складывает их в this._code_tree
	 */
	parse(){
		this._code_tree = null;
	}
	/* 
	 * Парсит контент и возвращает code tree дерево
	 * @return {json} Дерево code tree
	 */
	parseContent(){
		this.reset();
		this.parse();
		return this._code_tree;
	}
	/* 
	 * Парсит содержимое файла. Название файла сохраняет в переменную file_name
	 */
	parseFile(file_name, file_id){
		this._file_name = file_name;
		this.file_id = file_id;
		var content = rtl.file_get_contents(file_name);
		this.setContent(content);
		var result = this.parseContent();
		return result;
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
BayrellCommonParser.TOKEN_BASE = "token";
BayrellCommonParser.TOKEN_COMMENT = "comment";
BayrellCommonParser.TOKEN_MULTILINE_COMMENT = "multiline_comment";
BayrellCommonParser.TOKEN_SINGLELINE_COMMENT = "singleline_comment";
BayrellCommonParser.TOKEN_STRING = "string";
BayrellCommonParser.TOKEN_JSON = "json";
BayrellCommonParser.ERROR_EXPECTED = ["bayrell_rtl", "ERROR_EXPECTED", -1001];
BayrellCommonParser.ERROR_UNKNOWN_IDENT = ["bayrell_rtl", "ERROR_UNKNOWN_IDENT", -1003];
BayrellCommonParser.ERROR_IDENT_IS_RESERVER_WORD = ["bayrell_rtl", "ERROR_IDENT_IS_RESERVER_WORD", -1002];
BayrellCommonParser.ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE = ["bayrell_rtl", "ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE", -1004];
BayrellCommonParser.ERROR_UNKNOWN_OP_CODE = ["bayrell_lang", "UNKNOWN_OP_CODE", -1005];
module.exports.BayrellCommonParser = BayrellCommonParser;
