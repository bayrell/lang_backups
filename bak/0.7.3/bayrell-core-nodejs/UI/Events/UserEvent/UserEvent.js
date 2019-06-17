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
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var ElementInterface = require('../../Interfaces/ElementInterface.js');
class UserEvent extends CoreEvent{
	/**
	 * Prevent default mouse event
	 */
	preventDefault(){
	}
	/**
	 * Cancel event
	 */
	isCancel(){
		return this.cancelBubble;
	}
	/**
	 * Cancel event
	 */
	cancel(){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Events.UserEvent.UserEvent";}
	static getCurrentNamespace(){return "Core.UI.Events.UserEvent";}
	static getCurrentClassName(){return "Core.UI.Events.UserEvent.UserEvent";}
	static getParentClassName(){return "Runtime.CoreEvent";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__bubbles = false;
		if (names.indexOf("bubbles") == -1)Object.defineProperty(this, "bubbles", { get: function() { return this.__bubbles; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("bubbles") }});
		this.__cancel_bubble = false;
		if (names.indexOf("cancel_bubble") == -1)Object.defineProperty(this, "cancel_bubble", { get: function() { return this.__cancel_bubble; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cancel_bubble") }});
		this.__cancelable = true;
		if (names.indexOf("cancelable") == -1)Object.defineProperty(this, "cancelable", { get: function() { return this.__cancelable; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cancelable") }});
		this.__composed = true;
		if (names.indexOf("composed") == -1)Object.defineProperty(this, "composed", { get: function() { return this.__composed; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("composed") }});
		this.__default_prevented = false;
		if (names.indexOf("default_prevented") == -1)Object.defineProperty(this, "default_prevented", { get: function() { return this.__default_prevented; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("default_prevented") }});
		this.__event_phase = 0;
		if (names.indexOf("event_phase") == -1)Object.defineProperty(this, "event_phase", { get: function() { return this.__event_phase; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("event_phase") }});
		this.__is_trusted = true;
		if (names.indexOf("is_trusted") == -1)Object.defineProperty(this, "is_trusted", { get: function() { return this.__is_trusted; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("is_trusted") }});
		this.__ui = null;
		if (names.indexOf("ui") == -1)Object.defineProperty(this, "ui", { get: function() { return this.__ui; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ui") }});
		this.__es6_event = null;
		if (names.indexOf("es6_event") == -1)Object.defineProperty(this, "es6_event", { get: function() { return this.__es6_event; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("es6_event") }});
		this.__currentElement = null;
		if (names.indexOf("currentElement") == -1)Object.defineProperty(this, "currentElement", { get: function() { return this.__currentElement; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("currentElement") }});
		this.__target = null;
		if (names.indexOf("target") == -1)Object.defineProperty(this, "target", { get: function() { return this.__target; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("target") }});
	}
	assignObject(obj){
		if (obj instanceof UserEvent){
			this.__name = obj.__name;
			this.__bubbles = obj.__bubbles;
			this.__cancel_bubble = obj.__cancel_bubble;
			this.__cancelable = obj.__cancelable;
			this.__composed = obj.__composed;
			this.__default_prevented = obj.__default_prevented;
			this.__event_phase = obj.__event_phase;
			this.__is_trusted = obj.__is_trusted;
			this.__ui = obj.__ui;
			this.__es6_event = obj.__es6_event;
			this.__currentElement = obj.__currentElement;
			this.__target = obj.__target;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "bubbles")this.__bubbles = rtl.convert(value,"bool",false,"");
		else if (variable_name == "cancel_bubble")this.__cancel_bubble = rtl.convert(value,"bool",false,"");
		else if (variable_name == "cancelable")this.__cancelable = rtl.convert(value,"bool",true,"");
		else if (variable_name == "composed")this.__composed = rtl.convert(value,"bool",true,"");
		else if (variable_name == "default_prevented")this.__default_prevented = rtl.convert(value,"bool",false,"");
		else if (variable_name == "event_phase")this.__event_phase = rtl.convert(value,"int",0,"");
		else if (variable_name == "is_trusted")this.__is_trusted = rtl.convert(value,"bool",true,"");
		else if (variable_name == "ui")this.__ui = rtl.convert(value,"Runtime.UIStruct",null,"");
		else if (variable_name == "es6_event")this.__es6_event = rtl.convert(value,"mixed",null,"");
		else if (variable_name == "currentElement")this.__currentElement = rtl.convert(value,"mixed",null,"");
		else if (variable_name == "target")this.__target = rtl.convert(value,"mixed",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "name") return this.__name;
		else if (variable_name == "bubbles") return this.__bubbles;
		else if (variable_name == "cancel_bubble") return this.__cancel_bubble;
		else if (variable_name == "cancelable") return this.__cancelable;
		else if (variable_name == "composed") return this.__composed;
		else if (variable_name == "default_prevented") return this.__default_prevented;
		else if (variable_name == "event_phase") return this.__event_phase;
		else if (variable_name == "is_trusted") return this.__is_trusted;
		else if (variable_name == "ui") return this.__ui;
		else if (variable_name == "es6_event") return this.__es6_event;
		else if (variable_name == "currentElement") return this.__currentElement;
		else if (variable_name == "target") return this.__target;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("name");
			names.push("bubbles");
			names.push("cancel_bubble");
			names.push("cancelable");
			names.push("composed");
			names.push("default_prevented");
			names.push("event_phase");
			names.push("is_trusted");
			names.push("ui");
			names.push("es6_event");
			names.push("currentElement");
			names.push("target");
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
module.exports = UserEvent;