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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
var OpFlags = require('bayrell-lang-nodejs').OpCodes.OpFlags;
class OpTemplateDeclare extends BaseOpCode{
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpTemplateDeclare){
			this.name = obj.name;
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
		return "BayrellTemplate.OpCodes.OpTemplateDeclare";
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
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellTemplate.OpCodes.OpTemplateDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_template";
		this.name = "";
		this.args = null;
		this.childs = null;
		this.flags = null;
	}
	assignObject(obj){
		if (obj instanceof OpTemplateDeclare){
			this.op = rtl._clone(obj.op);
			this.name = rtl._clone(obj.name);
			this.args = rtl._clone(obj.args);
			this.childs = rtl._clone(obj.childs);
			this.flags = rtl._clone(obj.flags);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_template", "");
		else if (variable_name == "name") this.name = rtl.correct(value, "string", "", "");
		else if (variable_name == "args") this.args = rtl.correct(value, "Runtime.Vector", null, "OpAssignDeclare");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Runtime.Vector", null, "BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "flags") this.flags = rtl.correct(value, "BayrellLang.OpCodes.OpFlags", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "args") return this.args;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "flags") return this.flags;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("op");
		names.push("name");
		names.push("args");
		names.push("childs");
		names.push("flags");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpTemplateDeclare;