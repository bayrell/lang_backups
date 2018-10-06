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
var BaseOpCode = require('./BaseOpCode.js');
var OpDynamic = require('./OpDynamic.js');
var OpFlags = require('./OpFlags.js');
var OpIdentifier = require('./OpIdentifier.js');
var OpTemplateIdentifier = require('./OpTemplateIdentifier.js');
class OpAssignDeclare extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpAssignDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_assign_declare";
		this.tp = null;
		this.name = null;
		this.value = null;
		this.flags = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_assign_declare", "");
		else if (variable_name == "tp") this.tp = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "name") this.name = rtl.correct(value, "string", null, "");
		else if (variable_name == "value") this.value = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "flags") this.flags = rtl.correct(value, "OpFlags", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tp") return this.tp;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "flags") return this.flags;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("tp");
		names.push("name");
		names.push("value");
		names.push("flags");
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
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpAssignDeclare";
	}
	/**
	 * Constructor
	 */
	constructor(tp, name, value){
		if (tp == undefined) tp=null;
		if (name == undefined) name=null;
		if (value == undefined) value=null;
		super();
		this.tp = tp;
		this.name = name;
		this.value = value;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpAssignDeclare;