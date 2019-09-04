"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
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
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var RoutesInterface = require('../../Interfaces/RoutesInterface.js');
var WebContainer = require('./WebContainer.js');
class CoreRoute extends CoreObject{
	/**
	 * Before call method
	 */
	static before(container, name){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				return async_ctx_0.resolve(container);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Before call method
	 */
	static after(container, name){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				return async_ctx_0.resolve(container);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Render.CoreRoute";}
	static getCurrentNamespace(){return "Core.UI.Render";}
	static getCurrentClassName(){return "Core.UI.Render.CoreRoute";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(RoutesInterface);
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
CoreRoute.__static_implements__ = [];
CoreRoute.__static_implements__.push(RoutesInterface)
module.exports = CoreRoute;