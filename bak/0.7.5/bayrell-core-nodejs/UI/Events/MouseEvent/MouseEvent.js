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
var UserEvent = require('../UserEvent/UserEvent.js');
class MouseEvent extends UserEvent{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Events.MouseEvent.MouseEvent";}
	static getCurrentNamespace(){return "Core.UI.Events.MouseEvent";}
	static getCurrentClassName(){return "Core.UI.Events.MouseEvent.MouseEvent";}
	static getParentClassName(){return "Core.UI.Events.UserEvent.UserEvent";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__altKey = false;
		if (names.indexOf("altKey") == -1)Object.defineProperty(this, "altKey", { get: function() { return this.__altKey; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("altKey") }});
		this.__button = 0;
		if (names.indexOf("button") == -1)Object.defineProperty(this, "button", { get: function() { return this.__button; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("button") }});
		this.__buttons = 0;
		if (names.indexOf("buttons") == -1)Object.defineProperty(this, "buttons", { get: function() { return this.__buttons; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("buttons") }});
		this.__clientX = 0;
		if (names.indexOf("clientX") == -1)Object.defineProperty(this, "clientX", { get: function() { return this.__clientX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("clientX") }});
		this.__clientY = 0;
		if (names.indexOf("clientY") == -1)Object.defineProperty(this, "clientY", { get: function() { return this.__clientY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("clientY") }});
		this.__ctrlKey = false;
		if (names.indexOf("ctrlKey") == -1)Object.defineProperty(this, "ctrlKey", { get: function() { return this.__ctrlKey; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ctrlKey") }});
		this.__detail = 0;
		if (names.indexOf("detail") == -1)Object.defineProperty(this, "detail", { get: function() { return this.__detail; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("detail") }});
		this.__layerX = 0;
		if (names.indexOf("layerX") == -1)Object.defineProperty(this, "layerX", { get: function() { return this.__layerX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("layerX") }});
		this.__layerY = 0;
		if (names.indexOf("layerY") == -1)Object.defineProperty(this, "layerY", { get: function() { return this.__layerY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("layerY") }});
		this.__metaKey = false;
		if (names.indexOf("metaKey") == -1)Object.defineProperty(this, "metaKey", { get: function() { return this.__metaKey; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("metaKey") }});
		this.__movementX = 0;
		if (names.indexOf("movementX") == -1)Object.defineProperty(this, "movementX", { get: function() { return this.__movementX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("movementX") }});
		this.__movementY = 0;
		if (names.indexOf("movementY") == -1)Object.defineProperty(this, "movementY", { get: function() { return this.__movementY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("movementY") }});
		this.__offsetX = 0;
		if (names.indexOf("offsetX") == -1)Object.defineProperty(this, "offsetX", { get: function() { return this.__offsetX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("offsetX") }});
		this.__offsetY = 0;
		if (names.indexOf("offsetY") == -1)Object.defineProperty(this, "offsetY", { get: function() { return this.__offsetY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("offsetY") }});
		this.__pageX = 0;
		if (names.indexOf("pageX") == -1)Object.defineProperty(this, "pageX", { get: function() { return this.__pageX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("pageX") }});
		this.__pageY = 0;
		if (names.indexOf("pageY") == -1)Object.defineProperty(this, "pageY", { get: function() { return this.__pageY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("pageY") }});
		this.__screenX = 0;
		if (names.indexOf("screenX") == -1)Object.defineProperty(this, "screenX", { get: function() { return this.__screenX; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("screenX") }});
		this.__screenY = 0;
		if (names.indexOf("screenY") == -1)Object.defineProperty(this, "screenY", { get: function() { return this.__screenY; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("screenY") }});
		this.__shiftKey = false;
		if (names.indexOf("shiftKey") == -1)Object.defineProperty(this, "shiftKey", { get: function() { return this.__shiftKey; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("shiftKey") }});
		this.__x = 0;
		if (names.indexOf("x") == -1)Object.defineProperty(this, "x", { get: function() { return this.__x; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("x") }});
		this.__y = 0;
		if (names.indexOf("y") == -1)Object.defineProperty(this, "y", { get: function() { return this.__y; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("y") }});
	}
	assignObject(obj){
		if (obj instanceof MouseEvent){
			this.__altKey = obj.__altKey;
			this.__button = obj.__button;
			this.__buttons = obj.__buttons;
			this.__clientX = obj.__clientX;
			this.__clientY = obj.__clientY;
			this.__ctrlKey = obj.__ctrlKey;
			this.__detail = obj.__detail;
			this.__layerX = obj.__layerX;
			this.__layerY = obj.__layerY;
			this.__metaKey = obj.__metaKey;
			this.__movementX = obj.__movementX;
			this.__movementY = obj.__movementY;
			this.__offsetX = obj.__offsetX;
			this.__offsetY = obj.__offsetY;
			this.__pageX = obj.__pageX;
			this.__pageY = obj.__pageY;
			this.__screenX = obj.__screenX;
			this.__screenY = obj.__screenY;
			this.__shiftKey = obj.__shiftKey;
			this.__x = obj.__x;
			this.__y = obj.__y;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "altKey")this.__altKey = rtl.convert(value,"bool",false,"");
		else if (variable_name == "button")this.__button = rtl.convert(value,"int",0,"");
		else if (variable_name == "buttons")this.__buttons = rtl.convert(value,"int",0,"");
		else if (variable_name == "clientX")this.__clientX = rtl.convert(value,"int",0,"");
		else if (variable_name == "clientY")this.__clientY = rtl.convert(value,"int",0,"");
		else if (variable_name == "ctrlKey")this.__ctrlKey = rtl.convert(value,"bool",false,"");
		else if (variable_name == "detail")this.__detail = rtl.convert(value,"int",0,"");
		else if (variable_name == "layerX")this.__layerX = rtl.convert(value,"int",0,"");
		else if (variable_name == "layerY")this.__layerY = rtl.convert(value,"int",0,"");
		else if (variable_name == "metaKey")this.__metaKey = rtl.convert(value,"bool",false,"");
		else if (variable_name == "movementX")this.__movementX = rtl.convert(value,"int",0,"");
		else if (variable_name == "movementY")this.__movementY = rtl.convert(value,"int",0,"");
		else if (variable_name == "offsetX")this.__offsetX = rtl.convert(value,"int",0,"");
		else if (variable_name == "offsetY")this.__offsetY = rtl.convert(value,"int",0,"");
		else if (variable_name == "pageX")this.__pageX = rtl.convert(value,"int",0,"");
		else if (variable_name == "pageY")this.__pageY = rtl.convert(value,"int",0,"");
		else if (variable_name == "screenX")this.__screenX = rtl.convert(value,"int",0,"");
		else if (variable_name == "screenY")this.__screenY = rtl.convert(value,"int",0,"");
		else if (variable_name == "shiftKey")this.__shiftKey = rtl.convert(value,"bool",false,"");
		else if (variable_name == "x")this.__x = rtl.convert(value,"int",0,"");
		else if (variable_name == "y")this.__y = rtl.convert(value,"int",0,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "altKey") return this.__altKey;
		else if (variable_name == "button") return this.__button;
		else if (variable_name == "buttons") return this.__buttons;
		else if (variable_name == "clientX") return this.__clientX;
		else if (variable_name == "clientY") return this.__clientY;
		else if (variable_name == "ctrlKey") return this.__ctrlKey;
		else if (variable_name == "detail") return this.__detail;
		else if (variable_name == "layerX") return this.__layerX;
		else if (variable_name == "layerY") return this.__layerY;
		else if (variable_name == "metaKey") return this.__metaKey;
		else if (variable_name == "movementX") return this.__movementX;
		else if (variable_name == "movementY") return this.__movementY;
		else if (variable_name == "offsetX") return this.__offsetX;
		else if (variable_name == "offsetY") return this.__offsetY;
		else if (variable_name == "pageX") return this.__pageX;
		else if (variable_name == "pageY") return this.__pageY;
		else if (variable_name == "screenX") return this.__screenX;
		else if (variable_name == "screenY") return this.__screenY;
		else if (variable_name == "shiftKey") return this.__shiftKey;
		else if (variable_name == "x") return this.__x;
		else if (variable_name == "y") return this.__y;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("altKey");
			names.push("button");
			names.push("buttons");
			names.push("clientX");
			names.push("clientY");
			names.push("ctrlKey");
			names.push("detail");
			names.push("layerX");
			names.push("layerY");
			names.push("metaKey");
			names.push("movementX");
			names.push("movementY");
			names.push("offsetX");
			names.push("offsetY");
			names.push("pageX");
			names.push("pageY");
			names.push("screenX");
			names.push("screenY");
			names.push("shiftKey");
			names.push("x");
			names.push("y");
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
module.exports = MouseEvent;