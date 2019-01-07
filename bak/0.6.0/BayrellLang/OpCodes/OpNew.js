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
var Vector = require('bayrell-runtime-nodejs').Vector;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
class OpNew extends BaseOpCode{
	/**
	 * Constructor
	 */
	constructor(value, args){
		if (value == undefined) value=null;
		if (args == undefined) args=null;
		super();
		this.value = value;
		this.args = args;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpNew";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_new";
		this.value = null;
		this.args = null;
	}
	assignObject(obj){
		if (obj instanceof OpNew){
			this.op = rtl._clone(obj.op);
			this.value = rtl._clone(obj.value);
			this.args = rtl._clone(obj.args);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_new","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "value"){this.value = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("value",value,sender);}
		else if (variable_name == "args"){this.args = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.BaseOpCode");this.assignValueAfter("args",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "args") return this.args;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("value");
			names.push("args");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpNew;