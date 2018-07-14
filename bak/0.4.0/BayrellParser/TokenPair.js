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
var CoreObject = require('BayrellRuntime').CoreObject;
var ParserToken = require('./ParserToken.js');
class TokenPair extends CoreObject{
	getClassName(){return "BayrellParser.TokenPair";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this.current_token = null;
		this.next_token = null;
	}
	/**
	 * Current token
	 */
	/**
	 * Next token
	 */
	/**
	 * Constructor
	 */
	constructor(current_token, next_token){
		if (current_token == undefined) current_token=null;
		if (next_token == undefined) next_token=null;
		super();
		this.current_token = current_token;
		this.next_token = next_token;
	}
}
module.exports = TokenPair;