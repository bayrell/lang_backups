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
var ContextInterface = require('BayrellRtl').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('BayrellRtl').Interfaces.ModuleDescriptionInterface;
var ProviderDescription = require('BayrellRtl').ProviderDescription;
var JsonProviderFactory = require('./JsonProviderFactory.js');
class ModuleDescription{
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "BayrellJsonSerializer";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.1.1";
	}
	/**
	 * Init context
	 * @param ContextInterface context
	 */
	static initContext(context){
	}
	/**
	 * Called then module registed in context
	 * @param ContextInterface context
	 */
	static onRegister(context){
		context.registerProvider("default.json", (new JsonProviderFactory()).setTiny(false), ProviderDescription.PROVIDER_TEMPORARY);
		context.registerProvider("default.json.min", (new JsonProviderFactory()).setTiny(true), ProviderDescription.PROVIDER_TEMPORARY);
	}
	/**
	 * Returns description interfaces of the current module
	 * @return Vector<string>
	 */
	static getInterfaces(){
		return (new Vector()).push("BayrellRtl.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(){
		return (new Map()).set("BayrellRtl", ">=0.2 <1.0");
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredDevModules(){
		return null;
	}
}
module.exports = ModuleDescription;