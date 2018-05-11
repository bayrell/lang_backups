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
var Vector = require('BayrellRtl').Types.Vector;
var BaseOpCode = require('./BaseOpCode.js');
var OpFlags = require('./OpFlags.js');
class OpClassDeclare extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_class";
		this.class_name = "";
		this.class_extends = "";
		this.class_implements = null;
		this.class_variables = null;
		this.childs = null;
		this.class_template = null;
		this.flags = null;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpClassDeclare){
			this.class_name = obj.class_name;
			this.class_extends = rtl._clone(obj.class_extends);
			this.class_implements = rtl._clone(obj.class_implements);
			this.class_variables = rtl._clone(obj.class_variables);
			this.class_template = rtl._clone(obj.class_template);
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
		return "BayrellLang.OpCodes.OpClassDeclare";
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
		this.class_implements = new Vector();
		this.class_variables = new Vector();
		this.class_template = new Vector();
		this.childs = new Vector();
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
		names.push("class_name");
		names.push("class_template");
		names.push("class_extends");
		names.push("class_implements");
		names.push("class_variables");
		names.push("childs");
		names.push("flags");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "class_name"){
			return this.class_name;
		}
		else if (variable_name == "class_extends"){
			return this.class_extends;
		}
		else if (variable_name == "class_implements"){
			return this.class_implements;
		}
		else if (variable_name == "class_variables"){
			return this.class_variables;
		}
		else if (variable_name == "class_template"){
			return this.class_template;
		}
		else if (variable_name == "childs"){
			return this.childs;
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
		if (variable_name == "class_name"){
			this.class_name = value;
		}
		else if (variable_name == "class_extends"){
			this.class_extends = value;
		}
		else if (variable_name == "class_implements"){
			this.class_implements = value;
		}
		else if (variable_name == "class_variables"){
			this.class_variables = value;
		}
		else if (variable_name == "class_template"){
			this.class_template = value;
		}
		else if (variable_name == "childs"){
			this.childs = value;
		}
		else if (variable_name == "flags"){
			this.flags = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
}
module.exports = OpClassDeclare;