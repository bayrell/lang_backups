"use strict;"
/*!
 *  Bayrell File System Provider
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Vector = require('bayrell-runtime-nodejs').Vector;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('bayrell-runtime-nodejs').Interfaces.ModuleDescriptionInterface;
var FileSystemProviderFactory = require('./FileSystemProviderFactory.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "BayrellFileSystem";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.5.0";
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
		context.registerProviderFactory("default:fs", new FileSystemProviderFactory());
	}
	/**
	 * Returns description interfaces of the current module
	 * @return Vector<string>
	 */
	static getInterfaces(){
		return (new Vector()).push("Runtime.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(context){
		return (new Map()).set("Runtime", ">=0.2 <1.0");
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellFileSystem.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
	}
}
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
module.exports = ModuleDescription;