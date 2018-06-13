"use strict;"
/*!
 *  Bayrell Json Serializer
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
var CoreObject = require('BayrellRtl').CoreObject;
var ContextObject = require('BayrellRtl').ContextObject;
var ContextInterface = require('BayrellRtl').Interfaces.ContextInterface;
var FactoryInterface = require('BayrellRtl').Interfaces.FactoryInterface;
var JsonProvider = require('./JsonProvider.js');
class JsonProviderFactory extends ContextObject{
	_init(){
		super._init();
		this.display_class_name = true;
		this.indent = "  ";
		this.space = " ";
		this.crlf = "\n";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
	}
	/**
	 * Set tiny
	 */
	setTiny(flag){
		if (flag){
			this.display_class_name = false;
			this.indent = "";
			this.space = "";
			this.crlf = "";
		}
		else {
			this.display_class_name = true;
			this.indent = "  ";
			this.space = " ";
			this.crlf = "\n";
		}
		return this;
	}
	/**
	 * Returns new Instance
	 */
	newInstance(context){
		var obj = new JsonProvider(context);
		obj.setDisplayClassName(this.display_class_name);
		obj.setIndent(this.indent);
		obj.setSpace(this.space);
		obj.setCRLF(this.crlf);
		return obj;
	}
}
module.exports = JsonProviderFactory;