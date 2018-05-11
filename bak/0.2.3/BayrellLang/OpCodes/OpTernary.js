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
var rtl = require('BayrellRtl').Lib.rtl;
var Vector = require('BayrellRtl').Types.Vector;
var Map = require('BayrellRtl').Types.Map;
var BaseOpCode = require('./BaseOpCode.js');
class OpTernary extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_ternary";
		this.condition = null;
		this.if_true = null;
		this.if_false = null;
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
	/**
	 * Returns name of variables to serialization
	 * @return Vector<string>
	 */
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("condition");
		names.push("expr");
		names.push("if_true");
		names.push("if_false");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "condition"){
			return this.condition;
		}
		else if (variable_name == "expr"){
			return this.expr;
		}
		else if (variable_name == "if_true"){
			return this.if_true;
		}
		else if (variable_name == "if_false"){
			return this.if_false;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "condition"){
			this.condition = value;
		}
		if (variable_name == "expr"){
			this.expr = value;
		}
		if (variable_name == "if_true"){
			this.if_true = value;
		}
		if (variable_name == "if_false"){
			this.if_false = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpTernary){
			this.condition = rtl._clone(obj.condition);
			this.expr = rtl._clone(obj.expr);
			this.if_true = rtl._clone(obj.if_true);
			this.if_false = rtl._clone(obj.if_false);
		}
		super.assign(obj);
	}
}
module.exports = OpTernary;