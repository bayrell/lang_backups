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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var AssetsInterface = require('BayrellRuntime').Interfaces.AssetsInterface;
var ContextInterface = require('BayrellRuntime').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('BayrellRuntime').Interfaces.ModuleDescriptionInterface;
var ProviderDescription = require('BayrellRuntime').ProviderDescription;
var JsonProviderFactory = require('./JsonProviderFactory.js');
class ModuleDescription{
	getClassName(){return "BayrellJsonSerializer.ModuleDescription";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
		this.__implements__.push(AssetsInterface);
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getName(){
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
		context.registerProvider("default:json", (new JsonProviderFactory()).setTiny(false));
		context.registerProvider("default:json:min", (new JsonProviderFactory()).setTiny(true));
	}
	/**
	 * Returns description interfaces of the current module
	 * @return Vector<string>
	 */
	static getInterfaces(){
		return (new Vector()).push("Runtime.Interfaces.AssetsInterface").push("Runtime.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Returns required modules
	 * @return Vector<string>
	 */
	static getRequiredAssets(context){
		return null;
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(context){
		return (new Map()).set("Runtime", ">=0.2 <1.0");
	}
	/**
	 * Returns sync loaded files
	 */
	static assetsSyncLoad(context){
		return (new Vector());
	}
	/**
	 * Returns async loaded files
	 */
	static assetsAsyncLoad(context){
		return (new Vector()).push((new Vector()).push("/assets/BayrellJsonSerializer/JsonConvertToString.js").push("/assets/BayrellJsonSerializer/JsonProvider.js").push("/assets/BayrellJsonSerializer/JsonProviderFactory.js").push("/assets/BayrellJsonSerializer/JsonRestoreFromString.js").push("/assets/BayrellJsonSerializer/ModuleDescription.js"));
	}
}
module.exports = ModuleDescription;