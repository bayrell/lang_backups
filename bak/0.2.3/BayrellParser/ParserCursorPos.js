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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var re = require('BayrellRtl').Lib.re;
var rs = require('BayrellRtl').Lib.rs;
var ContextObject = require('BayrellRtl').ContextObject;
var ContextInterface = require('BayrellRtl').Interfaces.ContextInterface;
var ParserInterface = require('./Interfaces/ParserInterface.js');
class ParserCursorPos extends ContextObject{
	_init(){
		super._init();
		this.parser = null;
	}
	/**
	 * Current content of the file
	 */
	/**
	 * Current parser pos
	 */
	/**
	 * Current file line
	 */
	/**
	 * Current file column
	 */
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof ParserCursorPos){
			this.pos = obj.pos;
			this.line = obj.line;
			this.col = obj.col;
			this.parser = obj.parser;
		}
		super.assign(obj);
	}
	/**
	 * Return true if eof
	 * @param {bool}
	 */
	isEOF(){
		return this.pos >= this.parser.getContentSize();
	}
	/**
	 * Reset cursor
	 */
	reset(){
		this.pos = 0;
		this.line = 1;
		this.col = 1;
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context);
		this.parser = parser;
	}
	/**
	 * Destructor
	 */
	destructor(){
		this.parser = null;
		super.destructor();
	}
	/**
	 * Move cursor pos by char
	 * @param char ch
	 * @param int len
	 * @param int invert
	 */
	moveChar(ch, len, invert){
		if (len == undefined) len=1;
		if (invert == undefined) invert=1;
		if (ch == ""){
			return ;
		}
		if (ch == "\n"){
			this.line = this.line + invert * len;
			this.col = 1;
		}
		else if (ch == "\t"){
			this.col = this.col + this.parser.tab_space_count * invert * len;
		}
		else {
			this.col = this.col + invert * len;
		}
		this.pos = this.pos + invert * len;
	}
	/**
	 * Move pos by string
	 * @param {string} s
	 * @param {int} invert
	 */
	moveString(s, invert){
		if (invert == undefined) invert=1;
		var sz = rs.strlen(s);
		for (var i = 0; i < sz; i++){
			this.moveChar(s[i], 1, invert);
		}
	}
}
module.exports = ParserCursorPos;