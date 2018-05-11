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
class OpAssign extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_assign";
		this.ident = null;
		this.value = null;
		this.op_name = "";
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpAssign";
	}
	/**
	 * Constructor
	 */
	constructor(ident, value, op_name){
		if (ident == undefined) ident=null;
		if (value == undefined) value=null;
		if (op_name == undefined) op_name="";
		super();
		this.ident = ident;
		this.value = value;
		this.op_name = op_name;
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
		names.push("ident");
		names.push("value");
		names.push("op_name");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "ident"){
			return this.ident;
		}
		else if (variable_name == "value"){
			return this.value;
		}
		else if (variable_name == "op_name"){
			return this.op_name;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "ident"){
			this.ident = value;
		}
		else if (variable_name == "value"){
			this.value = value;
		}
		else if (variable_name == "op_name"){
			this.op_name = value;
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
		if (obj instanceof OpAssign){
			this.ident = rtl._clone(obj.ident);
			this.value = rtl._clone(obj.value);
			this.op_name = obj.op_name;
		}
		super.assign(obj);
	}
}
module.exports = OpAssign;