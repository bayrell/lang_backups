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
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
class Request extends CoreStruct{
	/**
	 * Send response
	 * @return Response res
	 */
	static createPHPRequest(){
		var r = null;
		return r;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.Http.Request";}
	static getCurrentNamespace(){return "Core.Http";}
	static getCurrentClassName(){return "Core.Http.Request";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.METHOD_GET = "GET";
		this.METHOD_HEAD = "HEAD";
		this.METHOD_POST = "POST";
		this.METHOD_PUT = "PUT";
		this.METHOD_DELETE = "DELETE";
		this.METHOD_CONNECT = "CONNECT";
		this.METHOD_OPTIONS = "OPTIONS";
		this.METHOD_TRACE = "TRACE";
		this.METHOD_PATCH = "PATCH";
		this.__uri = "";
		if (names.indexOf("uri") == -1)Object.defineProperty(this, "uri", { get: function() { return this.__uri; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("uri") }});
		this.__host = "";
		if (names.indexOf("host") == -1)Object.defineProperty(this, "host", { get: function() { return this.__host; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("host") }});
		this.__method = "GET";
		if (names.indexOf("method") == -1)Object.defineProperty(this, "method", { get: function() { return this.__method; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method") }});
		this.__query = null;
		if (names.indexOf("query") == -1)Object.defineProperty(this, "query", { get: function() { return this.__query; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("query") }});
		this.__payload = null;
		if (names.indexOf("payload") == -1)Object.defineProperty(this, "payload", { get: function() { return this.__payload; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("payload") }});
		this.__cookies = null;
		if (names.indexOf("cookies") == -1)Object.defineProperty(this, "cookies", { get: function() { return this.__cookies; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cookies") }});
		this.__headers = null;
		if (names.indexOf("headers") == -1)Object.defineProperty(this, "headers", { get: function() { return this.__headers; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("headers") }});
		this.__params = null;
		if (names.indexOf("params") == -1)Object.defineProperty(this, "params", { get: function() { return this.__params; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("params") }});
		this.__start_time = 0;
		if (names.indexOf("start_time") == -1)Object.defineProperty(this, "start_time", { get: function() { return this.__start_time; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("start_time") }});
	}
	assignObject(obj){
		if (obj instanceof Request){
			this.__uri = obj.__uri;
			this.__host = obj.__host;
			this.__method = obj.__method;
			this.__query = obj.__query;
			this.__payload = obj.__payload;
			this.__cookies = obj.__cookies;
			this.__headers = obj.__headers;
			this.__params = obj.__params;
			this.__start_time = obj.__start_time;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "uri")this.__uri = rtl.convert(value,"string","","");
		else if (variable_name == "host")this.__host = rtl.convert(value,"string","","");
		else if (variable_name == "method")this.__method = rtl.convert(value,"string","GET","");
		else if (variable_name == "query")this.__query = rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "payload")this.__payload = rtl.convert(value,"Runtime.Dict",null,"mixed");
		else if (variable_name == "cookies")this.__cookies = rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "headers")this.__headers = rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "params")this.__params = rtl.convert(value,"Runtime.Dict",null,"string");
		else if (variable_name == "start_time")this.__start_time = rtl.convert(value,"int",0,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "uri") return this.__uri;
		else if (variable_name == "host") return this.__host;
		else if (variable_name == "method") return this.__method;
		else if (variable_name == "query") return this.__query;
		else if (variable_name == "payload") return this.__payload;
		else if (variable_name == "cookies") return this.__cookies;
		else if (variable_name == "headers") return this.__headers;
		else if (variable_name == "params") return this.__params;
		else if (variable_name == "start_time") return this.__start_time;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("uri");
			names.push("host");
			names.push("method");
			names.push("query");
			names.push("payload");
			names.push("cookies");
			names.push("headers");
			names.push("params");
			names.push("start_time");
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
Request.METHOD_GET = "GET";
Request.METHOD_HEAD = "HEAD";
Request.METHOD_POST = "POST";
Request.METHOD_PUT = "PUT";
Request.METHOD_DELETE = "DELETE";
Request.METHOD_CONNECT = "CONNECT";
Request.METHOD_OPTIONS = "OPTIONS";
Request.METHOD_TRACE = "TRACE";
Request.METHOD_PATCH = "PATCH";
module.exports = Request;