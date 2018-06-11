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
var CoreObject = require('./CoreObject.js');
var Map = require('./Types/Map.js');
var Vector = require('./Types/Vector.js');
var MapInterface = require('./Interfaces/MapInterface.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
var ModuleDescriptionInterface = require('./Interfaces/ModuleDescriptionInterface.js');
var ContextObject = require('./ContextObject.js');
var ProviderDescription = require('./ProviderDescription.js');
class Context extends CoreObject{
	/*protected Map<string, var> _values = null;*/
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Vector();
		this._providers_names = new Map();
		this._current_providers = new Map();
		/*this._values = new Map<string, var>();*/
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
		var modules = rtl.callStaticMethod(module_description_class_name, "getRequiredModules");
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
	registerProvider(provider_name, factory, type){
		if (!this._providers_names.has(provider_name)){
			var description = new ProviderDescription(provider_name, factory, type);
			this._providers_names.set(provider_name, description);
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
	 * Returns standart provider
	 *
	 * @params string provider_name
	 * @return ContextObject
	 */
	getProvider(provider_name){
		if (this._providers_names.has(provider_name)){
			var description = this._providers_names.item(provider_name);
			if (description.getType() == ProviderDescription.PROVIDER_REGULAR){
				if (this._current_providers.has(provider_name)){
					return this._current_providers.item(provider_name);
				}
			}
			var obj = this.createProvider(provider_name);
			if (obj == null){
				return null;
			}
			if (description.getType() == ProviderDescription.PROVIDER_REGULAR){
				this._current_providers.set(provider_name, obj);
			}
			return obj;
		}
		return null;
	}
	/**
	 * Returns temporary provider
	 *
	 * @params string provider_name
	 * @return ContextObject
	 */
	createProvider(provider_name){
		if (!this._providers_names.has(provider_name)){
			return null;
		}
		var description = this._providers_names.item(provider_name);
		if (description == null){
			return null;
		}
		var factory_obj = description.getFactory();
		var obj = factory_obj.newInstance();
		return obj;
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
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		return message;
	}
	/**
	 * Set attribute value
	 * @params string attr_name - Attribute name
	 * @params var value - value
	 */
	/*void setValue(string attr_name, var value){
		this._values.set(attr_name, value);
	}*/
	/**
	 * Get attribute value
	 * @params string attr_name - Attribute name
	 * @params var default_value - Default value if not exists
	 * @return var value
	 */
	/*var getValue(string attr_name, var default_value){
		return this._values.get(attr_name, default_value);
	}*/
	/**
	 * Return true if attr is exists
	 * @params string attr_name - Attribute name
	 * @return boolean
	 */
	/*boolean hasValue(string attr_name){
		return this._values.contains(attr_name);
	}*/
}
module.exports = Context;