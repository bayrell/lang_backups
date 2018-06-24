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
var AssetsInterface = require('./Interfaces/AssetsInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getName(){
		return "BayrellRtl";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.3.1";
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
		return (new Vector()).push("BayrellRtl.Interfaces.AssetsInterface").push("BayrellRtl.Interfaces.ModuleDescriptionInterface");
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
		return (new Vector()).push((new Vector()).push("/assets/BayrellRtl/Lib/fs.js").push("/assets/BayrellRtl/Lib/rs.js").push("/assets/BayrellRtl/Lib/re.js").push("/assets/BayrellRtl/Lib/rtl.js").push("/assets/BayrellRtl/Types/Map.js").push("/assets/BayrellRtl/Types/PathInfo.js").push("/assets/BayrellRtl/Types/Vector.js").push("/assets/BayrellRtl/CoreObject.js").push("/assets/BayrellRtl/RuntimeConstant.js").push("/assets/BayrellRtl/Exceptions/RuntimeException.js").push("/assets/BayrellRtl/Interfaces/CloneableInterface.js").push("/assets/BayrellRtl/Interfaces/ContextInterface.js").push("/assets/BayrellRtl/Interfaces/FactoryInterface.js").push("/assets/BayrellRtl/Interfaces/MapInterface.js").push("/assets/BayrellRtl/Interfaces/ModuleDescriptionInterface.js").push("/assets/BayrellRtl/Interfaces/SerializeInterface.js").push("/assets/BayrellRtl/Interfaces/StringInterface.js").push("/assets/BayrellRtl/Providers/AssertInterface.js").push("/assets/BayrellRtl/Providers/LogInterface.js").push("/assets/BayrellRtl/Providers/SerializeStringInterface.js")).push((new Vector()).push("/assets/BayrellRtl/Context.js").push("/assets/BayrellRtl/ContextFactory.js").push("/assets/BayrellRtl/ContextObject.js").push("/assets/BayrellRtl/CoreAsset.js").push("/assets/BayrellRtl/ModuleDescription.js").push("/assets/BayrellRtl/ProviderDescription.js").push("/assets/BayrellRtl/Exceptions/AssertError.js").push("/assets/BayrellRtl/Exceptions/IndexOutOfRange.js").push("/assets/BayrellRtl/Exceptions/KeyNotFound.js").push("/assets/BayrellRtl/Exceptions/UnknownError.js").push("/assets/BayrellRtl/Lib/Utils.js").push("/assets/BayrellRtl/Types/Pipe.js")).push((new Vector()).push("/assets/BayrellRtl/NewInstanceContainer.js"));
	}
}
module.exports = ModuleDescription;