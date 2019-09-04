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
var ControllerAnnotation = require('./ControllerAnnotation.js');
var ChangeEvent = require('../Events/UserEvent/ChangeEvent.js');
class SignalOut extends ControllerAnnotation{
	/**
	 * Init controller
	 */
	static initController(controller, manager, annotation, controller_name){
		controller.addSignalOut(this.onEvent(manager, annotation), (new Vector()).push(annotation.event));
	}
	/**
	 * On event
	 */
	static onEvent(manager, annotation){
		return (event) => {
			manager.signalOut(event);
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Annotations.SignalOut";}
	static getCurrentNamespace(){return "Core.UI.Annotations";}
	static getCurrentClassName(){return "Core.UI.Annotations.SignalOut";}
	static getParentClassName(){return "Core.UI.Annotations.ControllerAnnotation";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__event = "";
		if (names.indexOf("event") == -1)Object.defineProperty(this, "event", { get: function() { return this.__event; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("event") }});
	}
	assignObject(obj){
		if (obj instanceof SignalOut){
			this.__event = obj.__event;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "event")this.__event = rtl.convert(value,"string","","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "event") return this.__event;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("event");
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
module.exports = SignalOut;