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
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
var AssetsInterface = require('./Interfaces/AssetsInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getName(){
		return "Runtime";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.4.0";
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
		return (new Vector()).push("Runtime.Interfaces.AssetsInterface").push("Runtime.Interfaces.ModuleDescriptionInterface");
	}
	/**
	 * Returns required assets
	 * @return Map<string, string>
	 */
	static getRequiredAssets(){
		return null;
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
	/**
	 * Returns sync loaded files
	 */
	static assetsSyncLoad(){
		return null;
	}
	/**
	 * Returns async loaded files
	 */
	static assetsAsyncLoad(){
		return (new Vector()).push((new Vector()).push("/assets/Runtime/rs.js").push("/assets/Runtime/re.js").push("/assets/Runtime/rtl.js").push("/assets/Runtime/Map.js").push("/assets/Runtime/Utils.js").push("/assets/Runtime/Vector.js").push("/assets/Runtime/CoreObject.js").push("/assets/Runtime/RuntimeConstant.js").push("/assets/Runtime/Exceptions/RuntimeException.js").push("/assets/Runtime/Interfaces/CloneableInterface.js").push("/assets/Runtime/Interfaces/ContextInterface.js").push("/assets/Runtime/Interfaces/FactoryInterface.js").push("/assets/Runtime/Interfaces/ModuleDescriptionInterface.js").push("/assets/Runtime/Interfaces/SerializeInterface.js").push("/assets/Runtime/Interfaces/StringInterface.js")).push((new Vector()).push("/assets/Runtime/Context.js").push("/assets/Runtime/ContextObject.js").push("/assets/Runtime/ModuleDescription.js").push("/assets/Runtime/Exceptions/IndexOutOfRange.js").push("/assets/Runtime/Exceptions/KeyNotFound.js").push("/assets/Runtime/Exceptions/UnknownError.js"));
	}
}
module.exports = ModuleDescription;