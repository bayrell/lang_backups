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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var BaseOpCode = require('./BaseOpCode.js');
class OpCall extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpCall";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_call";
		this.value = null;
		this.args = null;
		this.is_await = false;
	}
	createNewInstance(){
		return rtl.newInstance( this.getClassName() );
	}
	assignObject(obj){
		if (obj instanceof OpCall){
			this.op = rtl._clone(obj.op);
			this.value = rtl._clone(obj.value);
			this.args = rtl._clone(obj.args);
			this.is_await = rtl._clone(obj.is_await);
		}
		super.assign(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_call", "");
		else if (variable_name == "value") this.value = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "args") this.args = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "is_await") this.is_await = rtl.correct(value, "bool", false, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "args") return this.args;
		else if (variable_name == "is_await") return this.is_await;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("value");
		names.push("args");
		names.push("is_await");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpCall";
	}
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
}
module.exports = OpCall;