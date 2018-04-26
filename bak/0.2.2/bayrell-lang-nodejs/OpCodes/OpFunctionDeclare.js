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
var BaseOpCode = require('./BaseOpCode.js');
var OpFlags = require('./OpFlags.js');
class OpFunctionDeclare extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_function";
		this.name = "";
		this.result_type = null;
		this.args = null;
		this.childs = null;
		this.flags = null;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpFunctionDeclare){
			this.name = obj.name;
			this.result_type = obj.result_type;
			this.args = rtl._clone(obj.args);
			this.childs = rtl._clone(obj.childs);
			this.flags = rtl._clone(obj.flags);
		}
		super.assign(obj);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpFunctionDeclare";
	}
	/**
	 * Read is Flag
	 */
	isFlag(name){
		if (this.flags == null){
			return false;
		}
		if (!OpFlags.hasFlag(name)){
			return false;
		}
		return this.flags.takeValue(name);
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.args = new Vector();
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
		names.push("name");
		names.push("result_type");
		names.push("args");
		names.push("flags");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "name"){
			return this.name;
		}
		else if (variable_name == "result_type"){
			return this.result_type;
		}
		else if (variable_name == "args"){
			return this.args;
		}
		else if (variable_name == "flags"){
			return this.flags;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "name"){
			this.name = value;
		}
		else if (variable_name == "result_type"){
			this.result_type = value;
		}
		else if (variable_name == "args"){
			this.args = value;
		}
		else if (variable_name == "flags"){
			this.flags = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
}
module.exports = OpFunctionDeclare;