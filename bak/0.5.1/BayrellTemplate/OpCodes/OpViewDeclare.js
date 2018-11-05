"use strict;"
/*!
 *  Bayrell Template Engine
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
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
var OpFlags = require('bayrell-lang-nodejs').OpCodes.OpFlags;
class OpViewDeclare extends BaseOpCode{
	getClassName(){return "BayrellTemplate.OpCodes.OpViewDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_view";
		this.view_name = "";
		this.view_extends = null;
		this.view_variables = null;
		this.childs = null;
		this.flags = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_view", "");
		else if (variable_name == "view_name") this.view_name = rtl.correct(value, "string", "", "");
		else if (variable_name == "view_extends") this.view_extends = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "view_variables") this.view_variables = rtl.correct(value, "Vector", null, "OpAssignDeclare");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "flags") this.flags = rtl.correct(value, "OpFlags", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "view_name") return this.view_name;
		else if (variable_name == "view_extends") return this.view_extends;
		else if (variable_name == "view_variables") return this.view_variables;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "flags") return this.flags;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("view_name");
		names.push("view_extends");
		names.push("view_variables");
		names.push("childs");
		names.push("flags");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpViewDeclare";
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
		this.view_variables = new Vector();
		this.childs = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpViewDeclare;