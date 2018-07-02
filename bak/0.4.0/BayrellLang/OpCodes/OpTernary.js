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
class OpTernary extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpTernary";}
	_init(){
		super._init();
		this.op = "op_ternary";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = value;
		else if (variable_name == "condition") this.condition = value;
		else if (variable_name == "if_true") this.if_true = value;
		else if (variable_name == "if_false") this.if_false = value;
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "if_true") return this.if_true;
		else if (variable_name == "if_false") return this.if_false;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("condition");
		names.push("if_true");
		names.push("if_false");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpTernary";
	}
	/**
	 * Constructor
	 */
	constructor(condition, if_true, if_false){
		if (condition == undefined) condition=null;
		if (if_true == undefined) if_true=null;
		if (if_false == undefined) if_false=null;
		super();
		this.condition = condition;
		this.if_true = if_true;
		this.if_false = if_false;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpTernary;