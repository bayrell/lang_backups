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
var CloneableInterface = require('bayrell-runtime-nodejs').Interfaces.CloneableInterface;
var SerializeInterface = require('bayrell-runtime-nodejs').Interfaces.SerializeInterface;
var Component = require('../Component.js');
var UserEvent = require('./UserEvent.js');
class UpdateStateEvent extends CoreEvent{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Events.UpdateStateEvent";}
	static getCurrentNamespace(){return "Core.UI.Events";}
	static getCurrentClassName(){return "Core.UI.Events.UpdateStateEvent";}
	static getParentClassName(){return "Runtime.CoreEvent";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__props = null;
		if (names.indexOf("props") == -1)Object.defineProperty(this, "props", { get: function() { return this.__props; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("props") }});
	}
	assignObject(obj){
		if (obj instanceof UpdateStateEvent){
			this.__props = obj.__props;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "props")this.__props = rtl.convert(value,"Runtime.Map",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "props") return this.__props;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("props");
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
module.exports = UpdateStateEvent;