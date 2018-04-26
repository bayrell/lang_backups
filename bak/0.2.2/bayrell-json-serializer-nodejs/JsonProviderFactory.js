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
var CoreObject = require('BayrellRtl').CoreObject;
var ContextObject = require('BayrellRtl').ContextObject;
var FactoryInterface = require('BayrellRtl').Interfaces.FactoryInterface;
var JsonProvider = require('./JsonProvider.js');
class JsonProviderFactory extends ContextObject{
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
	}
	/**
	 * Returns new Instance
	 */
	newInstance(){
		var obj = new JsonProvider(this.context());
		obj.setDisplayClassName(true);
		obj.setIndent("  ");
		obj.setCRLF("\n");
		obj.setSpace("  ");
		return obj;
	}
}
module.exports = JsonProviderFactory;