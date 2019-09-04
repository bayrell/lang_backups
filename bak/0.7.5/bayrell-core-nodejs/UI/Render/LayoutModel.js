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
class LayoutModel extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Render.LayoutModel";}
	static getCurrentNamespace(){return "Core.UI.Render";}
	static getCurrentClassName(){return "Core.UI.Render.LayoutModel";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__title = "";
		if (names.indexOf("title") == -1)Object.defineProperty(this, "title", { get: function() { return this.__title; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("title") }});
		this.__meta_description = "";
		if (names.indexOf("meta_description") == -1)Object.defineProperty(this, "meta_description", { get: function() { return this.__meta_description; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("meta_description") }});
		this.__meta_keywords = "";
		if (names.indexOf("meta_keywords") == -1)Object.defineProperty(this, "meta_keywords", { get: function() { return this.__meta_keywords; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("meta_keywords") }});
		this.__content = "";
		if (names.indexOf("content") == -1)Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__view = "";
		if (names.indexOf("view") == -1)Object.defineProperty(this, "view", { get: function() { return this.__view; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("view") }});
		this.__model = null;
		if (names.indexOf("model") == -1)Object.defineProperty(this, "model", { get: function() { return this.__model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("model") }});
		this.__assets = null;
		if (names.indexOf("assets") == -1)Object.defineProperty(this, "assets", { get: function() { return this.__assets; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("assets") }});
		this.__components = null;
		if (names.indexOf("components") == -1)Object.defineProperty(this, "components", { get: function() { return this.__components; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("components") }});
		this.__modules = null;
		if (names.indexOf("modules") == -1)Object.defineProperty(this, "modules", { get: function() { return this.__modules; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("modules") }});
		this.__modules_path = null;
		if (names.indexOf("modules_path") == -1)Object.defineProperty(this, "modules_path", { get: function() { return this.__modules_path; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("modules_path") }});
		this.__css_vars = new Dict();
		if (names.indexOf("css_vars") == -1)Object.defineProperty(this, "css_vars", { get: function() { return this.__css_vars; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("css_vars") }});
	}
	assignObject(obj){
		if (obj instanceof LayoutModel){
			this.__title = obj.__title;
			this.__meta_description = obj.__meta_description;
			this.__meta_keywords = obj.__meta_keywords;
			this.__content = obj.__content;
			this.__view = obj.__view;
			this.__model = obj.__model;
			this.__assets = obj.__assets;
			this.__components = obj.__components;
			this.__modules = obj.__modules;
			this.__modules_path = obj.__modules_path;
			this.__css_vars = obj.__css_vars;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "title")this.__title = rtl.convert(value,"string","","");
		else if (variable_name == "meta_description")this.__meta_description = rtl.convert(value,"string","","");
		else if (variable_name == "meta_keywords")this.__meta_keywords = rtl.convert(value,"string","","");
		else if (variable_name == "content")this.__content = rtl.convert(value,"string","","");
		else if (variable_name == "view")this.__view = rtl.convert(value,"string","","");
		else if (variable_name == "model")this.__model = rtl.convert(value,"Runtime.CoreStruct",null,"");
		else if (variable_name == "assets")this.__assets = rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "components")this.__components = rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "modules")this.__modules = rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "modules_path")this.__modules_path = rtl.convert(value,"Runtime.Collection",null,"string");
		else if (variable_name == "css_vars")this.__css_vars = rtl.convert(value,"Runtime.Dict",new Dict(),"string");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "title") return this.__title;
		else if (variable_name == "meta_description") return this.__meta_description;
		else if (variable_name == "meta_keywords") return this.__meta_keywords;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "view") return this.__view;
		else if (variable_name == "model") return this.__model;
		else if (variable_name == "assets") return this.__assets;
		else if (variable_name == "components") return this.__components;
		else if (variable_name == "modules") return this.__modules;
		else if (variable_name == "modules_path") return this.__modules_path;
		else if (variable_name == "css_vars") return this.__css_vars;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("title");
			names.push("meta_description");
			names.push("meta_keywords");
			names.push("content");
			names.push("view");
			names.push("model");
			names.push("assets");
			names.push("components");
			names.push("modules");
			names.push("modules_path");
			names.push("css_vars");
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
module.exports = LayoutModel;