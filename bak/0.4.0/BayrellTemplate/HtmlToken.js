"use strict;"
/*!
 *  Bayrell Template Engine
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
var ParserToken = require('BayrellParser').ParserToken;
var ParserEOF = require('BayrellParser').Exceptions.ParserEOF;
var ParserExpected = require('BayrellParser').Exceptions.ParserExpected;
var EndOfStringExpected = require('BayrellLang').Exceptions.EndOfStringExpected;
class HtmlToken extends ParserToken{
	getClassName(){return "BayrellTemplate.HtmlToken";}
	static getParentClassName(){return "ParserToken";}
	_init(){
		super._init();
		this._special_tokens = null;
	}
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		return new HtmlToken(this.context(), this.parser);
	}
	/**
	 * Returns special tokens
	 */
	static getSpecialTokens(){
		return (new Vector()).push("...").push("@json{").push("@raw{").push("@{").push("<!--").push("-->").push("<!").push("</").push("/>");
	}
	/**
	 * Constructor
	 */
	constructor(context, parser){
		if (context == undefined) context=null;
		if (parser == undefined) parser=null;
		super(context, parser);
		this._special_tokens = HtmlToken.getSpecialTokens();
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar(ch){
		return rs.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_-", rs.strtolower(ch)) !== -1;
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
		/* Try to read special tokens */
		var pos = this.findVector(this._special_tokens);
		if (pos >= 0){
			this.tp = HtmlToken.TOKEN_BASE;
			this.token = this._special_tokens.item(pos);
			this.success = true;
			this.readString(rs.strlen(this.token));
			return ;
		}
		this.readNextTokenBase();
	}
}
HtmlToken.TOKEN_NONE = "none";
HtmlToken.TOKEN_BASE = "base";
HtmlToken.TOKEN_HTML = "html";
HtmlToken.TOKEN_STRING = "string";
module.exports = HtmlToken;