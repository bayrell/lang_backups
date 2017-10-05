/*
!
Bayrell
https://github.com/bayrell/bayrell
Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__rtl = require('./rtl.js');
var isset = m__rtl.isset;
var file_get_contents = m__rtl.file_get_contents;
var strlen = m__rtl.strlen;
var clone = m__rtl.clone;
var ord = m__rtl.ord;
var strpos = m__rtl.strpos;
var strtolower = m__rtl.strtolower;
class BayrellSimpleParser extends BayrellError {
	
	constructor(){
		super();
		this.look_token = null;
		this.look = null;
		this.content = null;
		this.pos = null;
		this.size = 0;
		this.result = {};
		this.pointer = {};
		this.current_tabs = 0;
		this.cursor_pos = [0, 0];
		this.cursor_pos_look = [0, 0];
		this.cursor_pos_token = null;
		this.cursor_pos_look_token = [0, 0];
		this.tab_space_count = 4;
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
		return strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_.", strtolower(ch)) !== false;
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
	
	skipSystemChar(){
		while (this.look !== null && this.isSkipChar(this.look)) {
			this.getChar();
		}
	}
	
	reset(){
		this.setPos(0);
	}
	
	setPos(pos){
		this.pos = 0 - 1;
		this.look = null;
		this.look_token = null;
		this.cursor_pos = [1, 1];
		this.cursor_pos_look = clone(this.cursor_pos);
		this.cursor_pos_token = null;
		this.cursor_pos_look_token = clone(this.cursor_pos);
		this.getChar();
		var i = 0;
		while (i < pos) {
			this.getChar();
			i = i + 1;
		}
		this.getToken();
		/*
		var_dump('Ln:'.$this->cursor_pos[0].', Col:'.$this->cursor_pos[1]);
		var_dump($this->pos);
		var_dump($this->look);
		var_dump('---');
		*/
	}
	
	getPos(){
		return this.pos;
	}
	
	setContent(content){
		this.content = content;
		this.size = strlen(content);
		this.reset();
	}
	
	eof(){
		return this.look_token === null;
	}
	
	getChar(){
		var ch = this.look;
		this.cursor_pos = clone(this.cursor_pos_look);
		this.pos = this.pos + 1;
		if (this.pos >= this.size) {
			this.look = null;
		}
		else {
			this.look = this.content[this.pos];
		}
		if (this.look == "\n") {
			this.cursor_pos_look = [this.cursor_pos_look[0] + 1, 1];
			/*
			this.cursor_pos_look[0] = this.cursor_pos_look[0] + 1;
			this.cursor_pos_look[1] = 1;
			*/
		}
		else if (this.look == "\t") {
			this.cursor_pos_look = [this.cursor_pos_look[0], this.cursor_pos_look[1] + this.tab_space_count];
			/*
			this.cursor_pos_look[1] = this.cursor_pos_look[1] + this.tab_space_count;
			*/
		}
		else {
			this.cursor_pos_look = [this.cursor_pos_look[0], this.cursor_pos_look[1] + 1];
			/*
			this.cursor_pos_look[1] = this.cursor_pos_look[1] + 1;
			*/
		}
		/*
		var_dump('---');
		var_dump($this->look);
		var_dump($this->cursor_pos_look);
		*/
		return ch;
	}
	
	getLook(){
		return this.look;
	}
	
	getToken(){
		var token = this.look_token;
		this.cursor_pos_token = clone(this.cursor_pos_look_token);
		this.skipSystemChar();
		if (this.look === null) {
			this.look_token = null;
			return token;
		}
		if (this.isTokenChar(this.look)) {
			this.look_token = "";
			while (this.look !== null && this.isTokenChar(this.look)) {
				this.look_token = this.look_token + this.getChar();
			}
		}
		else {
			this.look_token = this.getChar();
		}
		this.cursor_pos_look_token = clone(this.cursor_pos);
		return token;
	}
	
	getLookToken(){
		return this.look_token;
	}
	
	getCursorPos(){
		if (!isset(this.cursor_pos_token)) {
			return {'line' : 0,
				'col' : 0,
			};
		}
		return {'line' : isset(this.cursor_pos_token[0]) ? this.cursor_pos_token[0] : 0,
			'col' : isset(this.cursor_pos_token[1]) ? this.cursor_pos_token[1] : 0,
		};
	}
	
	readUntilChar(ch, flag){
		if (!isset(flag)) {
			flag = true;
		}
		if (this.look_token == ch) {
			if (flag) {
				this.match(ch);
			}
			return "";
		}
		var s = this.look_token;
		while (this.look !== null && this.look != ch) {
			s = s + this.getChar();
		}
		this.cursor_pos_look_token = this.cursor_pos;
		this.getToken();
		if (flag) {
			this.match(ch);
		}
		return s;
	}
	
	readString(ch, flag){
		return this.readUntilChar(ch, flag);
	}
	
	getLine(flag){
		return this.readUntilChar("\n", flag);
	}
	
	createError(error, params, line, col){
		if (!isset(line)) {
			line = this.cursor_pos_look_token[0];
		}
		if (!isset(col)) {
			col = this.cursor_pos_look_token[1];
		}
		console.log(this.file_id);
		console.log(line);
		console.log(col);
		return new BayrellError(error, null, params, this.file_id, line, col);
	}
	
	error(error, params, line, col){
		if (!isset(line)) {
			line = this.cursor_pos_look_token[0];
		}
		if (!isset(col)) {
			col = this.cursor_pos_look_token[1];
		}
		throw this.createError(error, params);
	}
	
	expected(s){
		throw this.createError("ERROR_EXPECTED", {'what': s,
		});
	}
	
	matchChar(ch){
		if (this.look == ch) {
			return this.getChar();
		}
		if (ch == "\n") {
			this.expected("new line");
		}
		else {
			this.expected(ch);
		}
	}
	
	matchNum(){
		var result = this.getToken();
		if (!is_numeric(result)) {
			this.expected("numeric");
		}
		return result;
	}
	
	match(ch){
		if (this.look_token == ch) {
			return this.getToken();
		}
		if (ch == "\n") {
			this.expected("new line");
		}
		else {
			this.expected(ch);
		}
	}
}
module.exports.BayrellSimpleParser = BayrellSimpleParser;
