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
var rs = require('BayrellRtl').Lib.rs;
var ParserEOF = require('./Exceptions/ParserEOF.js');
var ParserExpected = require('./Exceptions/ParserExpected.js');
var ParserReader = require('./ParserReader.js');
class ParserToken extends ParserReader{
	_init(){
		super._init();
		this.token = "";
		this.tp = "";
		this.start_pos = 0;
		this.start_line = 1;
		this.start_col = 1;
		this.success = false;
	}
	/**
	 * Token content
	 */
	/**
	 * Token type
	 */
	/**
	 * Start pos of the current token
	 */
	/**
	 * Start current token line
	 */
	/**
	 * Start current token column
	 */
	/**
	 * The token is success readed
	 */
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new ParserToken(this.context(), this.parser);
	}
	/**
	 * Assign all data from other object
	 * @param {BayrellObject} obj
	 */
	assign(obj){
		if (obj instanceof ParserToken){
			this.tp = obj.tp;
			this.token = obj.token;
			this.success = obj.success;
			this.start_line = obj.start_line;
			this.start_col = obj.start_col;
		}
		super.assign(obj);
	}
	/**
	 * Reset cursor
	 */
	reset(){
		super.reset();
		this.token = "";
		this.tp = "";
		this.success = false;
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", rs.strtolower(ch)) !== -1;
	}
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar(ch){
		if (rs.ord(ch) <= 32){
			return true;
		}
		return false;
	}
	/**
	 * Skip system char. Throws error if EOF.
	 */
	skipSystemChar(){
		var look = this.lookChar();
		while (this.isSkipChar(look)){
			this.moveChar(look);
			look = this.lookChar();
		}
	}
	/**
	 * Assign new value of the start position
	 */
	initStartPos(){
		this.start_pos = this.pos;
		this.start_line = this.line;
		this.start_col = this.col;
	}
	/**
	 * Init read next token
	 */
	readNextTokenInit(){
		this.tp = ParserToken.TOKEN_NONE;
		this.token = "";
		this.success = false;
		this.start_line = this.line;
		this.start_col = this.col;
		this.start_pos = this.pos;
		if (this.isEOF()){
			throw new ParserEOF(this.context());
		}
	}
	/**
	 * Read base next token
	 */
	readNextTokenBase(){
		var look = this.lookChar();
		this.tp = ParserToken.TOKEN_BASE;
		this.success = true;
		this.token = look;
		this.moveChar(look);
		if (this.isTokenChar(look)){
			try{
				look = this.lookChar();
				while (this.isTokenChar(look) && !this.isEOF()){
					this.token = rtl.toString(this.token)+rtl.toString(look);
					this.moveChar(look);
					look = this.lookChar();
				}
			}catch(_the_exception){
				if (_the_exception instanceof Error){
					var e = _the_exception;
					if (e instanceof ParserEOF){
					}
					else {
						throw e;
					}
				}
				else { throw _the_exception; }
			}
		}
	}
	/**
	 * Get next token without move cursor pos. Throws error if EOF.
	 * @param {BayrellParserToken} token
	 */
	readNextToken(){
		/* Init next token function */
		this.readNextTokenInit();
		this.skipSystemChar();
		this.initStartPos();
		/* Read base token */
		this.readNextTokenBase();
	}
}
ParserToken.TOKEN_NONE = "none";
ParserToken.TOKEN_BASE = "base";
module.exports = ParserToken;