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
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var BaseOpCode = require('./BaseOpCode.js');
class OpCompare extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_compare";
		this.condition = "";
		this.value1 = null;
		this.value2 = null;
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpCompare";
	}
	/**
	 * Constructor
	 */
	constructor(condition, value1, value2){
		if (condition == undefined) condition="";
		if (value1 == undefined) value1=null;
		if (value2 == undefined) value2=null;
		super();
		this.condition = condition;
		this.value1 = value1;
		this.value2 = value2;
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
		names.push("value1");
		names.push("value2");
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
		if (variable_name == "value1"){
			return this.value1;
		}
		if (variable_name == "value2"){
			return this.value2;
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
		else if (variable_name == "value1"){
			this.value1 = value;
		}
		else if (variable_name == "value2"){
			this.value2 = value;
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
		if (obj instanceof OpCompare){
			this.condition = rtl._clone(obj.condition);
			this.value1 = rtl._clone(obj.value1);
			this.value2 = rtl._clone(obj.value2);
		}
		super.assign(obj);
	}
}
module.exports = OpCompare;