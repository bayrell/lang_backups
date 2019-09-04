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
var CoreEvent = require('bayrell-runtime-nodejs').CoreEvent;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
class MountEvent extends CoreEvent{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Events.MountEvent";}
	static getCurrentNamespace(){return "Core.UI.Events";}
	static getCurrentClassName(){return "Core.UI.Events.MountEvent";}
	static getParentClassName(){return "Runtime.CoreEvent";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__elem = null;
		if (names.indexOf("elem") == -1)Object.defineProperty(this, "elem", { get: function() { return this.__elem; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("elem") }});
		this.__ui = null;
		if (names.indexOf("ui") == -1)Object.defineProperty(this, "ui", { get: function() { return this.__ui; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ui") }});
	}
	assignObject(obj){
		if (obj instanceof MountEvent){
			this.__elem = obj.__elem;
			this.__ui = obj.__ui;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "elem")this.__elem = rtl.convert(value,"mixed",null,"");
		else if (variable_name == "ui")this.__ui = rtl.convert(value,"Runtime.UIStruct",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "elem") return this.__elem;
		else if (variable_name == "ui") return this.__ui;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("elem");
			names.push("ui");
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
module.exports = MountEvent;