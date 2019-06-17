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
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var Request = require('./Request.js');
var Response = require('./Response.js');
class JsonResponse extends Response{
	/**
	 * Init struct data
	 */
	initData(){
		var headers = this.headers;
		if (headers == null){
			headers = new Dict();
		}
		headers = headers.setIm("Content-Type", "application/json");
		this.assignValue("headers", headers);
	}
	/**
	 * Returns content
	 */
	getContent(){
		return rtl.json_encode(this.data);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.Http.JsonResponse";}
	static getCurrentNamespace(){return "Core.Http";}
	static getCurrentClassName(){return "Core.Http.JsonResponse";}
	static getParentClassName(){return "Core.Http.Response";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__data = new Dict();
		if (names.indexOf("data") == -1)Object.defineProperty(this, "data", { get: function() { return this.__data; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("data") }});
	}
	assignObject(obj){
		if (obj instanceof JsonResponse){
			this.__data = obj.__data;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "data")this.__data = rtl.convert(value,"Runtime.Dict",new Dict(),"primitive");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "data") return this.__data;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("data");
		}
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
module.exports = JsonResponse;