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
var LayoutModel = require('./LayoutModel.js');
class RenderResult extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Render.RenderResult";}
	static getCurrentNamespace(){return "Core.UI.Render";}
	static getCurrentClassName(){return "Core.UI.Render.RenderResult";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__layout_class = "";
		if (names.indexOf("layout_class") == -1)Object.defineProperty(this, "layout_class", { get: function() { return this.__layout_class; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("layout_class") }});
		this.__view_class = "";
		if (names.indexOf("view_class") == -1)Object.defineProperty(this, "view_class", { get: function() { return this.__view_class; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("view_class") }});
		this.__layout_model = null;
		if (names.indexOf("layout_model") == -1)Object.defineProperty(this, "layout_model", { get: function() { return this.__layout_model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("layout_model") }});
		this.__view_model = null;
		if (names.indexOf("view_model") == -1)Object.defineProperty(this, "view_model", { get: function() { return this.__view_model; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("view_model") }});
	}
	assignObject(obj){
		if (obj instanceof RenderResult){
			this.__layout_class = obj.__layout_class;
			this.__view_class = obj.__view_class;
			this.__layout_model = obj.__layout_model;
			this.__view_model = obj.__view_model;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "layout_class")this.__layout_class = rtl.convert(value,"string","","");
		else if (variable_name == "view_class")this.__view_class = rtl.convert(value,"string","","");
		else if (variable_name == "layout_model")this.__layout_model = rtl.convert(value,"Core.UI.Render.LayoutModel",null,"");
		else if (variable_name == "view_model")this.__view_model = rtl.convert(value,"Runtime.CoreStruct",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "layout_class") return this.__layout_class;
		else if (variable_name == "view_class") return this.__view_class;
		else if (variable_name == "layout_model") return this.__layout_model;
		else if (variable_name == "view_model") return this.__view_model;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("layout_class");
			names.push("view_class");
			names.push("layout_model");
			names.push("view_model");
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
module.exports = RenderResult;