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
var re = require('bayrell-runtime-nodejs').re;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
class RouteInfo extends CoreStruct{
	/**
	 * Init struct data
	 */
	initData(){
		var uri_match = this.uri;
		uri_match = re.replace("\\/", "\\/", uri_match);
		var matches = re.matchAll("{(.*?)}", this.uri);
		if (matches){
			var params = matches.get(0, null);
			params.each((name) => {
				uri_match = re.replace("{"+rtl.toString(name)+"}", "([^\\/]*?)", uri_match);
			});
			this.assignValue("params", params.toCollection());
		}
		else {
			this.assignValue("params", null);
		}
		this.assignValue("uri_match", "^"+rtl.toString(uri_match)+"$");
	}
	/**
	 * Get params
	 * @return Map<string>
	 */
	static getParams(matches, info){
		var __memorize_value = rtl._memorizeValue("Core.UI.Annotations.RouteInfo::getParams", arguments);
		if (__memorize_value != rtl._memorize_not_found) return __memorize_value;
		if (info.params == null){
			var __memorize_value = null;
			rtl._memorizeSave("Core.UI.Annotations.RouteInfo::getParams", arguments, __memorize_value);
			return __memorize_value;
		}
		var res = new Map();
		info.params.each((name, pos) => {
			var match = matches.get(pos, null);
			if (match){
				res.set(name, match);
			}
		});
		var __memorize_value = res.toDict();
		rtl._memorizeSave("Core.UI.Annotations.RouteInfo::getParams", arguments, __memorize_value);
		return __memorize_value;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Annotations.RouteInfo";}
	static getCurrentNamespace(){return "Core.UI.Annotations";}
	static getCurrentClassName(){return "Core.UI.Annotations.RouteInfo";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__uri = "";
		if (names.indexOf("uri") == -1)Object.defineProperty(this, "uri", { get: function() { return this.__uri; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("uri") }});
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__class_name = "";
		if (names.indexOf("class_name") == -1)Object.defineProperty(this, "class_name", { get: function() { return this.__class_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("class_name") }});
		this.__method_name = "";
		if (names.indexOf("method_name") == -1)Object.defineProperty(this, "method_name", { get: function() { return this.__method_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method_name") }});
		this.__uri_match = "";
		if (names.indexOf("uri_match") == -1)Object.defineProperty(this, "uri_match", { get: function() { return this.__uri_match; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("uri_match") }});
		this.__layout_class = "";
		if (names.indexOf("layout_class") == -1)Object.defineProperty(this, "layout_class", { get: function() { return this.__layout_class; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("layout_class") }});
		this.__view_class = "";
		if (names.indexOf("view_class") == -1)Object.defineProperty(this, "view_class", { get: function() { return this.__view_class; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("view_class") }});
		this.__render = false;
		if (names.indexOf("render") == -1)Object.defineProperty(this, "render", { get: function() { return this.__render; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("render") }});
		this.__params = null;
		if (names.indexOf("params") == -1)Object.defineProperty(this, "params", { get: function() { return this.__params; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("params") }});
	}
	assignObject(obj){
		if (obj instanceof RouteInfo){
			this.__uri = obj.__uri;
			this.__name = obj.__name;
			this.__class_name = obj.__class_name;
			this.__method_name = obj.__method_name;
			this.__uri_match = obj.__uri_match;
			this.__layout_class = obj.__layout_class;
			this.__view_class = obj.__view_class;
			this.__render = obj.__render;
			this.__params = obj.__params;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "uri")this.__uri = rtl.convert(value,"string","","");
		else if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "class_name")this.__class_name = rtl.convert(value,"string","","");
		else if (variable_name == "method_name")this.__method_name = rtl.convert(value,"string","","");
		else if (variable_name == "uri_match")this.__uri_match = rtl.convert(value,"string","","");
		else if (variable_name == "layout_class")this.__layout_class = rtl.convert(value,"string","","");
		else if (variable_name == "view_class")this.__view_class = rtl.convert(value,"string","","");
		else if (variable_name == "render")this.__render = rtl.convert(value,"bool",false,"");
		else if (variable_name == "params")this.__params = rtl.convert(value,"Runtime.Collection",null,"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "uri") return this.__uri;
		else if (variable_name == "name") return this.__name;
		else if (variable_name == "class_name") return this.__class_name;
		else if (variable_name == "method_name") return this.__method_name;
		else if (variable_name == "uri_match") return this.__uri_match;
		else if (variable_name == "layout_class") return this.__layout_class;
		else if (variable_name == "view_class") return this.__view_class;
		else if (variable_name == "render") return this.__render;
		else if (variable_name == "params") return this.__params;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("uri");
			names.push("name");
			names.push("class_name");
			names.push("method_name");
			names.push("uri_match");
			names.push("layout_class");
			names.push("view_class");
			names.push("render");
			names.push("params");
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
module.exports = RouteInfo;