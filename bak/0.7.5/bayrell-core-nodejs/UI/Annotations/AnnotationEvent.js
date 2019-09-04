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
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
var CoreManager = require('../Render/CoreManager.js');
var UIController = require('../UIController.js');
var UIEvent = require('../UIEvent.js');
class AnnotationEvent extends CoreStruct{
	/**
	 * OnEvent
	 */
	events(){
		return (new Vector());
	}
	/**
	 * OnEvent
	 */
	static onEvent(manager, e){
	}
	/**
	 * Factory onEvent
	 */
	static onEventFactory(manager, ui, annotation){
		return (event) => {
			var ui_event = new UIEvent((new Map()).set("annotation", annotation).set("event", event).set("ui", ui));
			this.onEvent(manager, ui_event);
		}
	}
	/**
	 * Add Emitter
	 */
	static addEmitter(manager, emitter, ui, annotation){
	}
	/**
	 * Dispatch Event
	 */
	static dispatch(manager, ui, annotation, event, ref){
		if (ref == undefined) ref=null;
		var ui_event = new UIEvent((new Map()).set("annotation", annotation).set("event", event).set("ref", ref).set("ui", ui));
		this.onEvent(manager, ui_event);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Annotations.AnnotationEvent";}
	static getCurrentNamespace(){return "Core.UI.Annotations";}
	static getCurrentClassName(){return "Core.UI.Annotations.AnnotationEvent";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	assignObject(obj){
		if (obj instanceof AnnotationEvent){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
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
module.exports = AnnotationEvent;