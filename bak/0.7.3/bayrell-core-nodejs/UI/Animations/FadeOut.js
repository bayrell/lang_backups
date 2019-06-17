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
var ControllerAnnotation = require('../Annotations/ControllerAnnotation.js');
var ModelChange = require('../Events/ModelChange.js');
class FadeOut extends ControllerAnnotation{
	/**
	 * Init controller
	 */
	static initController(manager, annotation, controller){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Animations.FadeOut";}
	static getCurrentNamespace(){return "Core.UI.Animations";}
	static getCurrentClassName(){return "Core.UI.Animations.FadeOut";}
	static getParentClassName(){return "Core.UI.Annotations.ControllerAnnotation";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__speed = 0;
		if (names.indexOf("speed") == -1)Object.defineProperty(this, "speed", { get: function() { return this.__speed; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("speed") }});
	}
	assignObject(obj){
		if (obj instanceof FadeOut){
			this.__speed = obj.__speed;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "speed")this.__speed = rtl.convert(value,"int",0,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "speed") return this.__speed;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("speed");
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
module.exports = FadeOut;