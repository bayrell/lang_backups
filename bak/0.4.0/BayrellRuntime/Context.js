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
var CoreObject = require('./CoreObject.js');
var Map = require('./Map.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
class Context extends CoreObject{
	getClassName(){return "Runtime.Context";}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Vector();
		this._values = new Map();
		this._providers_names = new Map();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns registed modules
	 * @return Vector<string>
	 */
	getModules(){
		return this._modules.copy();
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		var module_description_class_name = rtl.toString(module_name)+".ModuleDescription";
		if (this._modules.indexOf(module_description_class_name) != -1){
			return ;
		}
		this._modules.push(module_description_class_name);
		/* Call onRegister */
		var args = (new Vector()).push(this);
		rtl.callStaticMethod(module_description_class_name, "onRegister", args);
		/* Register required Modules*/
		var modules = rtl.callStaticMethod(module_description_class_name, "getRequiredModules", args);
		if (modules != null){
			var keys = modules.keys();
			var sz = keys.count();
			for (var i = 0; i < sz; i++){
				var module_name = keys.item(i);
				this.registerModule(module_name);
			}
		}
		return this;
	}
	/**
	 * Register module
	 * @param string provider_name
	 * @param string factory_name
	 * @param int type
	 */
	registerProvider(provider_name, factory){
		if (!this._providers_names.has(provider_name)){
			this._providers_names.set(provider_name, factory);
		}
		return this;
	}
	/**
	 * Init context
	 */
	init(){
		var args = new Vector();
		args.push(this);
		var sz = this._modules.count();
		for (var i = 0; i < sz; i++){
			var module_description_class_name = this._modules.item(i);
			rtl.callStaticMethod(module_description_class_name, "initContext", args);
		}
	}
	/**
	 * Returns provider description by name. If provider does not exists returns null.
	 * @param string provider_name
	 * @return ProviderDescription 
	 */
	getProviderDescription(provider_name){
		if (!this._providers_names.has(provider_name)){
			return null;
		}
		return this._providers_names.item(provider_name);
	}
	/**
	 * Returns temporary provider
	 *
	 * @params string provider_name
	 * @return CoreObject
	 */
	createProvider(provider_name){
		if (!this._providers_names.has(provider_name)){
			return null;
		}
		var factory_obj = this._providers_names.item(provider_name);
		if (factory_obj == null){
			return null;
		}
		var obj = factory_obj.newInstance(this);
		return obj;
	}
	/**
	 * Set value
	 * @param string name
	 * @param mixed value
	 */
	setValue(name, value){
		this._values.set(name, value);
	}
	/**
	 * Get value
	 * @param string name
	 * @param mixed value
	 */
	getValue(name, default_value){
		if (default_value == undefined) default_value=null;
		return this._values.get(name, default_value);
	}
	/**
	 * Set application locale
	 * @params string locale
	 */
	setLocale(locale){
		this._locale = locale;
	}
	/**
	 * Get application locale
	 * @params string locale
	 */
	getLocale(){
		return this._locale;
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		return message;
	}
}
module.exports = Context;