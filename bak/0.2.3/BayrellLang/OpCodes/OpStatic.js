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
class OpStatic extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_static";
		this.value = null;
		this.name = null;
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpStatic";
	}
	/**
	 * Constructor
	 */
	constructor(value, name){
		if (value == undefined) value=null;
		if (name == undefined) name=null;
		super();
		this.value = value;
		this.name = name;
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
		names.push("value");
		names.push("name");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "value"){
			return this.value;
		}
		else if (variable_name == "name"){
			return this.name;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "value"){
			this.value = value;
		}
		else if (variable_name == "name"){
			this.name = value;
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
		if (obj instanceof OpStatic){
			this.value = rtl._clone(obj.value);
			this.name = obj.name;
		}
		super.assign(obj);
	}
}
module.exports = OpStatic;