/* * Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var isset = m__rtl.isset;
var file_get_contents = m__rtl.file_get_contents;
var strlen = m__rtl.strlen;
var clone = m__rtl.clone;
var ord = m__rtl.ord;
var strpos = m__rtl.strpos;
var strtolower = m__rtl.strtolower;
var count = m__rtl.count;
var substr = m__rtl.substr;
var in_array = m__rtl.in_array;
class BayrellCommonParser extends BayrellObject {
  /* Описание токенов */
  
  constructor(){
    super();
    this.file_name = null;
    this._content = null;
    this._content_sz = 0;
    this._content_pos = 0;
    this._content_cursor_pos = {
			'line': 0,
			'col': 0,
		};
    this.tab_space_count = 4;
    this.look_token = null;
    this.look_token_type = null;
    this.current_token = null;
    this.old_token = null;
    this.code_tree = null;
  }
  
  isAlphaChar(ch){
    return strpos("qazwsxedcrfvtgbyhnujmikolp", strtolower(ch)) !== false;
  }
  
  isNumChar(ch){
    return strpos("0123456789", ch) !== false;
  }
  
  isNumeric(s){
    var i = 0;
    while (i < strlen(s)) {
      if (!this.isNumChar(s[i])) {
        return false;
      }
      i = i + 1;
    }
    return true;
  }
  
  isSkipChar(ch){
    if (ord(ch) <= 32) {
      return true;
    }
  }
  
  isTokenChar(ch){
    return strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", strtolower(ch)) !== false;
  }
  
  isToken(s){
    var i = 0;
    while (i < strlen(s)) {
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
  /* ---- Begin Read Token System ---- */
  /* * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {object} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка */
  
  _createError(error, params, line, col){
    var pos = this._getCursorPos();
    if (!isset(line)) {
      line = pos["line"];
    }
    if (!isset(col)) {
      col = pos["col"];
    }
    return BayrellError.newInstance(error, params, this.file_name, line, col);
  }
  
  _match(look_str){
    var s = this._readString(strlen(look_str));
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
  /* * Вызываем исключение, о том что срока s не была найдена
	 * @param {string} s - строка */
  
  _expected(s){
    throw this._createError(BayrellCommonParser.ERROR_EXPECTED, { 'what': s });
  }
  
  _getCursorPos(){
    return clone(this._content_cursor_pos);
  }
  
  _moveCursorPos(ch, invert){
    if (!isset(invert)) {
      invert = 1;
    }
    if (ch == "\n") {
      this._content_cursor_pos = {'line':this._content_cursor_pos['line'] + invert, 'col':1};
    }
    else if (ch == "\t") {
      this._content_cursor_pos = {'line':this._content_cursor_pos['line'], 'col':this._content_cursor_pos['col'] + this.tab_space_count * invert};
    }
    else {
      this._content_cursor_pos = {'line':this._content_cursor_pos['line'], 'col':this._content_cursor_pos['col'] + invert};
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
    var s = substr(this._content, this._content_pos, len);
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
    var s = substr(this._content, this._content_pos, len);
    var i = 0;
    while (i < len) {
      this._content_pos = this._content_pos + 1;
      this._moveCursorPos(s[i], 1);
      i = i + 1;
    }
    return s;
  }
  
  _readUntilString(match_str, flag){
    if (!isset(flag)) {
      flag = true;
    }
    var len = strlen(s);
    var len_match = strlen(match_str);
    var s = "";
    var look = this._lookChar();
    var look_str = this._lookString(len_match);
    while (look !== null && look_str != match_str) {
      s = s + look;
      look = this._readLookChar(look);
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
				'type': BayrellCommonParser.TOKEN_BASE,
				'value': value,
				'pos': pos,
			};
    }
    var look = this._lookChar();
    while (look !== null && this.isTokenChar(look)) {
      value = value + look;
      look = this._readLookChar(look);
    }
    return {
			'type': BayrellCommonParser.TOKEN_BASE,
			'value': value,
			'pos': pos,
		};
  }
  
  eof(){
    return this.look_token === null;
  }
  
  lookToken(){
    return this.current_token["token"];
  }
  
  isLookToken(token, type){
    if (!isset(type)) {
      type = "token";
    }
    /* TODO: Default */
    return this.look_token == token && type == this.look_token_type;
  }
  
  isLookTokenNumeric(type){
    if (!isset(type)) {
      type = "token";
    }
    /* TODO: Default */
    return this.isNumeric(this.look_token) && type == this.look_token_type;
  }
  
  isLookTokenIdentifier(type){
    if (!isset(type)) {
      type = "token";
    }
    /* TODO: Default */
    return this.isIdentifier(this.look_token) && type == this.look_token_type;
  }
  
  isLookTokenArr(tokens, type){
    if (!isset(type)) {
      type = "token";
    }
    /* TODO: Default */
    return in_array(this.look_token, tokens) && type == this.look_token_type;
  }
  
  getToken(){
    this.old_token = clone(this.current_token);
    this._skipSystemChar();
    this.current_token = this._readToken();
    this.look_token = this.current_token["value"];
    this.look_token_type = this.current_token["type"];
    if (this.old_token == null) {
      return null;
    }
    return this.old_token["value"];
  }
  
  getCursorPos(){
    return this.old_token["pos"];
  }
  /* ---- End Read Token System ---- */
  /* * Создаем определённую ошибку
	 * @param {string} error - строка
	 * @param {object} params - параметры перевода
	 * @param {int} line - линия
	 * @param {int} col - позиция в линии
	 * @return {BayrellError} ошибка */
  
  createError(error, params, line, col, file_name){
    var pos = this.getCursorPos();
    if (!isset(line)) {
      line = pos["line"];
    }
    if (!isset(col)) {
      col = pos["col"];
    }
    if (!isset(file_name)) {
      file_name = this.file_name;
    }
    return BayrellError.newInstance(error, params, this.file_name, line, col);
  }
  /* * Вызываем исключение, о том что срока s не была найдена
	 * @param {string} s - строка */
  
  expected(s){
    throw this.createError(BayrellCommonParser.ERROR_EXPECTED, {
			'what': s,
		});
  }
  /* * Ищет следующее вхождение строки. Если нет, то вызывает исключение BayrellError
	 * @param {string} s - строка, которую мы ищем
	 * @return {string} число */
  
  match(s, token_type){
    if (!isset(token_type)) {
      token_type = "token";
    }
    /* TODO: Default */
    if (this.look_token == s) {
      return this.getToken();
    }
    if (s == "\n") {
      this.expected("new line");
    }
    else {
      this.expected(s);
    }
  }
  /* * Ищет следующее вхождение число. Если нет, то вызывает исключение BayrellError
	 * @return {string} число */
  
  matchNum(){
    var result = this.getToken();
    if (!is_numeric(result)) {
      this.expected("numeric");
    }
    return result["token"];
  }
  /* * Сбрасывает значение */
  
  reset(){
    this._content_pos = 0;
    this._content_cursor_pos = {
			'line': 1,
			'col': 1,
		};
    this._content_sz = strlen(this._content);
    this.initParser();
    this.getToken();
  }
  /* * Устанавливает контент 
	 * @param {string} content - программа */
  
  setContent(content){
    this._content = content;
  }
  /* * Инициализация парсера
	 * @param {string} content - программа */
  
  initParser(){
  }
  /* * Парсит токены и складывает их в this.code_tree */
  
  parse(){
    this.code_tree = null;
  }
  /* * Парсит контент и возвращает code tree дерево
	 * @return {object} Дерево code tree */
  
  parseContent(){
    this.reset();
    this.parse();
    return this.code_tree;
  }
  /* * Парсит содержимое файла. Название файла сохраняет в переменную file_name */
  
  parseFile(file_name, file_id){
    this.file_name = file_name;
    this.file_id = file_id;
    var content = file_get_contents(file_name);
    this.setContent(content);
    var result = this.parseContent();
    return result;
  }
  /* * Сравнивает по токенам собственное содержимое с другим парсером */
  
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
  /* * Сравнивает по токенам собственное содержимое с другой строкой */
  
  compareContent(content){
    var parser = this.newInstance();
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
module.exports.BayrellCommonParser = BayrellCommonParser;
