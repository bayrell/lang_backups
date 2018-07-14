"use strict;"
/*!
 *  Bayrell Parser Library.  
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var rs = require('BayrellRuntime').rs;
var ParserEOF = require('./Exceptions/ParserEOF.js');
var ParserExpected = require('./Exceptions/ParserExpected.js');
var ParserInterface = require('./Interfaces/ParserInterface.js');
var ParserCursorPos = require('./ParserCursorPos.js');
class ParserReader extends ParserCursorPos{
	getClassName(){return "BayrellParser.ParserReader";}
	static getParentClassName(){return "ParserCursorPos";}
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new ParserReader(this.context(), this.parser);
	}
	/**
	 * Throws expected error
	 */
	expected(message){
		if (message == "\n"){
			throw new ParserExpected(this.context(), "new line", this.line, this.col);
		}
		else {
			throw new ParserExpected(this.context(), message, this.line, this.col);
		}
	}
	/**
	 * Return current char. Throws error if EOF.
	 * @return char
	 */
	lookChar(){
		if (this.isEOF()){
			return "";
		}
		return this.parser.getContentPos(this.pos);
	}
	/**
	 * Look next N chars. Throws error if EOF.
	 * @param int len
	 * @return string
	 */
	lookString(len){
		if (this.pos + len - 1 >= this.parser.getContentSize()){
			return "";
		}
		return this.parser.getContentString(this.pos, len);
	}
	/**
	 * Find next string
	 * @param {string} s
	 * @return {bool} return True if next string is s
	 */
	findString(s){
		var len = rs.strlen(s);
		if (this.pos + len - 1 >= this.parser.getContentSize()){
			return false;
		}
		var next_s = this.parser.getContentString(this.pos, len);
		if (next_s == s){
			return true;
		}
		return false;
	}
	/**
	 * Check next string == look_str
	 * @param {string} look_str
	 */
	match(look_str){
		if (this.findString(look_str)){
			this.moveString(look_str);
			return ;
		}
		throw this.expected(look_str);
	}
	/**
	 * Find string from Vector
	 * @param {Vector<string>} vect
	 * @return {int} vector's index or -1 if not found
	 */
	findVector(vect){
		for (var i = 0; i < vect.count(); i++){
			var s = vect.item(i);
			if (this.findString(s)){
				return i;
			}
		}
		return -1;
	}
	/**
	 * Read next char. Throws error if EOF.
	 * @param {int} len
	 * @return {string}
	 */
	readChar(){
		var ch = this.lookChar();
		this.moveChar(ch);
		return ch;
	}
	/**
	 * Read N chars from content
	 * @param {int} len
	 * @return {string}
	 */
	readString(len){
		var s = this.lookString(len);
		this.moveString(s);
		return s;
	}
	/**
	 * Read string until next string is not equal find_str. Throws error if EOF.
	 * @param {string} find_str - founded string
	 * @return {string} readed string
	 */
	readUntilString(match_str, flag_read_last){
		if (flag_read_last == undefined) flag_read_last=true;
		var len_match = rs.strlen(match_str);
		if (len_match == 0){
			return "";
		}
		var s = "";
		var look = "";
		var look_str = this.lookString(len_match);
		while (look_str != "" && look_str != match_str && !this.isEOF()){
			look = this.readChar();
			s = rtl.toString(s)+rtl.toString(look);
			look_str = this.lookString(len_match);
		}
		if (flag_read_last){
			if (look_str == match_str){
				s = rtl.toString(s)+rtl.toString(look_str);
				this.moveString(look_str);
			}
		}
		return s;
	}
	/**
	 * Skip comments
	 */
	readUntilVector(v){
		var look = "";
		var res_str = "";
		var pos = this.findVector(v);
		while (pos == -1 && !this.isEOF()){
			look = this.readChar();
			res_str += look;
			pos = this.findVector(v);
		}
		if (pos != -1){
			var s = v.item(pos);
			var sz = rs.strlen(s);
			var look_str = this.lookString(sz);
			if (look_str == s){
				return res_str;
			}
		}
		throw new ParserEOF(this.context(), start_line, start_col);
	}
	/**
	 * Read string until end of line. Throws error if EOF.
	 * @return {string} readed string
	 */
	readLine(){
		var s = this.readUntilString("\n");
		return s;
	}
}
module.exports = ParserReader;