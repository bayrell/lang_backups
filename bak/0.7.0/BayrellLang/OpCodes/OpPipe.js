"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
class OpPipe extends BaseOpCode{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpPipe";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		this.__op = "op_pipe";
		Object.defineProperty(this, "op", { get: function() { return this.__op; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("op") }});
		this.__value = null;
		Object.defineProperty(this, "value", { get: function() { return this.__value; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("value") }});
		this.__items = null;
		Object.defineProperty(this, "items", { get: function() { return this.__items; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("items") }});
		this.__is_return_value = false;
		Object.defineProperty(this, "is_return_value", { get: function() { return this.__is_return_value; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("is_return_value") }});
	}
	assignObject(obj){
		if (obj instanceof OpPipe){
			this.__op = rtl._clone(obj.op);
			this.__value = rtl._clone(obj.value);
			this.__items = rtl._clone(obj.items);
			this.__is_return_value = rtl._clone(obj.is_return_value);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.__op = rtl.correct(value,"string","op_pipe","");
		else if (variable_name == "value")this.__value = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");
		else if (variable_name == "items")this.__items = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "is_return_value")this.__is_return_value = rtl.correct(value,"bool",false,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.__op;
		else if (variable_name == "value") return this.__value;
		else if (variable_name == "items") return this.__items;
		else if (variable_name == "is_return_value") return this.__is_return_value;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("value");
			names.push("items");
			names.push("is_return_value");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpPipe;