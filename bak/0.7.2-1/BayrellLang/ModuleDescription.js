"use strict;"
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('bayrell-runtime-nodejs').Interfaces.ModuleDescriptionInterface;
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getName(){
		return "BayrellLang";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.7.2";
	}
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules(){
		return (new Map()).set("Runtime", ">=0.2 <1.0").set("BayrellParser", ">=0.1 <1.0");
	}
	/**
	 * Compatibility with older versions
	 */
	static getRequiredModules(){
		return this.requiredModules();
	}
	/**
	 * Returns enities
	 */
	static entities(){
		return null;
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
	}
	/**
	 * Returns description interfaces of the current module
	 * @return Vector<string>
	 */
	static getInterfaces(){
		return (new Vector()).push("Runtime.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Called then context read config
	 * @param ContextInterface context
	 * @param Map<mixed> config
	 */
	static onReadConfig(context, config){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.ModuleDescription";}
	static getCurrentClassName(){return "BayrellLang.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
module.exports = ModuleDescription;