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
var AnnotationEvent = require('./AnnotationEvent.js');
var ChangeEvent = require('../Events/UserEvent/ChangeEvent.js');
class Event extends AnnotationEvent{
	/**
	 * OnEvent
	 */
	events(){
		return (new Vector()).push(this.event);
	}
	/**
	 * OnEvent
	 */
	static onEvent(manager, e){
		if (e.annotation.cancel){
			e.event.cancel();
		}
		else if (e.annotation.preventDefault){
			e.event.preventDefault();
		}
		var f = rtl.method(manager, e.annotation.method_name);
		f(e);
	}
	/**
	 * Add Emitter
	 */
	static addEmitter(manager, emitter, ui, annotation){
		emitter.addMethod(this.onEventFactory(manager, ui, annotation), (new Vector()).push(annotation.event));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Annotations.Event";}
	static getCurrentNamespace(){return "Core.UI.Annotations";}
	static getCurrentClassName(){return "Core.UI.Annotations.Event";}
	static getParentClassName(){return "Core.UI.Annotations.AnnotationEvent";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__event = "";
		if (names.indexOf("event") == -1)Object.defineProperty(this, "event", { get: function() { return this.__event; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("event") }});
		this.__method_name = "";
		if (names.indexOf("method_name") == -1)Object.defineProperty(this, "method_name", { get: function() { return this.__method_name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("method_name") }});
		this.__cancel = false;
		if (names.indexOf("cancel") == -1)Object.defineProperty(this, "cancel", { get: function() { return this.__cancel; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("cancel") }});
		this.__preventDefault = false;
		if (names.indexOf("preventDefault") == -1)Object.defineProperty(this, "preventDefault", { get: function() { return this.__preventDefault; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("preventDefault") }});
	}
	assignObject(obj){
		if (obj instanceof Event){
			this.__event = obj.__event;
			this.__method_name = obj.__method_name;
			this.__cancel = obj.__cancel;
			this.__preventDefault = obj.__preventDefault;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "event")this.__event = rtl.convert(value,"string","","");
		else if (variable_name == "method_name")this.__method_name = rtl.convert(value,"string","","");
		else if (variable_name == "cancel")this.__cancel = rtl.convert(value,"bool",false,"");
		else if (variable_name == "preventDefault")this.__preventDefault = rtl.convert(value,"bool",false,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "event") return this.__event;
		else if (variable_name == "method_name") return this.__method_name;
		else if (variable_name == "cancel") return this.__cancel;
		else if (variable_name == "preventDefault") return this.__preventDefault;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("event");
			names.push("method_name");
			names.push("cancel");
			names.push("preventDefault");
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
module.exports = Event;