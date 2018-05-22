"use strict;"
/*!
 *  Bayrell Runtime Library
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
var rtl = require('./Lib/rtl.js');
var Vector = require('./Types/Vector.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "BayrellRtl";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.2.6";
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
		return (new Vector()).push("BayrellRtl.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(){
		return null;
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