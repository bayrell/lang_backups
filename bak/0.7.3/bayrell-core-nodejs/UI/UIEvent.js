"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
var Emitter = require('bayrell-runtime-nodejs').Emitter;
var Reference = require('bayrell-runtime-nodejs').Reference;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var AnnotationEvent = require('./Annotations/AnnotationEvent.js');
var CoreManager = require('./Render/CoreManager.js');
class UIEvent extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.UIEvent";}
	static getCurrentNamespace(){return "Core.UI";}
	static getCurrentClassName(){return "Core.UI.UIEvent";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.ref = null;
		this.annotation = null;
		this.event = null;
		this.ui = null;
	}
	assignObject(obj){
		if (obj instanceof UIEvent){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "ref")this.ref = rtl.convert(value,"Runtime.Reference",null,"");
		else if (variable_name == "annotation")this.annotation = rtl.convert(value,"Core.UI.Annotations.AnnotationEvent",null,"");
		else if (variable_name == "event")this.event = rtl.convert(value,"Runtime.CoreEvent",null,"");
		else if (variable_name == "ui")this.ui = rtl.convert(value,"Runtime.UIStruct",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "ref") return this.ref;
		else if (variable_name == "annotation") return this.annotation;
		else if (variable_name == "event") return this.event;
		else if (variable_name == "ui") return this.ui;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 2)==2){
			names.push("ref");
			names.push("annotation");
			names.push("event");
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
module.exports = UIEvent;