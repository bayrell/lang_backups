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
var Context = require('./Context.js');
var CoreObject = require('./CoreObject.js');
var Vector = require('./Types/Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
class ContextFactory extends CoreObject{
	_init(){
		super._init();
		this._modules = null;
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof ContextFactory){
			this._modules = rtl._clone(obj._modules);
		}
		super.assign(obj);
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this._modules = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Returns new Instance
	 */
	newInstance(){
		var context = new Context();
		/* Register modules */
		for (var i = 0; i < this._modules.count(); i++){
			context.registerModule(this._modules.item(i));
		}
		/* Init context */
		context.init();
		return context;
	}
	/**
	 * Register module
	 */
	registerModule(module_name){
		this._modules.push(module_name);
	}
}
module.exports = ContextFactory;