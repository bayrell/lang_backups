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
class ProviderDescription extends CoreObject{
	_init(){
		super._init();
		this._provider_name = "";
		this._factory_name = "";
		this._type = "";
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof Context){
			this._provider_name = rtl.clone(obj._provider_name);
			this._factory_name = rtl.clone(obj._factory_name);
			this._type = rtl.clone(obj._type);
		}
		super.assign(obj);
	}
	/**
	 * Constructor
	 */
	constructor(provider_name, factory_name, type){
		super();
		this._provider_name = provider_name;
		this._factory_name = factory_name;
		this._type = type;
	}
	getProviderName(){
		return this._provider_name;
	}
	getFactoryName(){
		return this._factory_name;
	}
	getTypeName(){
		return this._type;
	}
}
module.exports = ProviderDescription;