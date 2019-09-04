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
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var BaseOpCode = require('./BaseOpCode.js');
var OpFlags = require('./OpFlags.js');
class OpClassDeclare extends BaseOpCode{
	/*public serializable Vector<OpAssignDeclare> class_variables = null;*/
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
	 * Has Annotations
	 */
	hasAnnotations(){
		return this.annotations != null && this.annotations.count() > 0;
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
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpClassDeclare";}
	static getCurrentNamespace(){return "BayrellLang.OpCodes";}
	static getCurrentClassName(){return "BayrellLang.OpCodes.OpClassDeclare";}
	static getParentClassName(){return "BayrellLang.OpCodes.BaseOpCode";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.op = "op_class";
		this.class_name = "";
		this.class_extends = "";
		this.class_implements = null;
		this.childs = null;
		this.class_template = null;
		this.flags = null;
		this.annotations = null;
	}
	assignObject(obj){
		if (obj instanceof OpClassDeclare){
			this.op = rtl._clone(obj.op);
			this.class_name = rtl._clone(obj.class_name);
			this.class_extends = rtl._clone(obj.class_extends);
			this.class_implements = rtl._clone(obj.class_implements);
			this.childs = rtl._clone(obj.childs);
			this.class_template = rtl._clone(obj.class_template);
			this.flags = rtl._clone(obj.flags);
			this.annotations = rtl._clone(obj.annotations);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = rtl.convert(value,"string","op_class","");
		else if (variable_name == "class_name")this.class_name = rtl.convert(value,"string","","");
		else if (variable_name == "class_extends")this.class_extends = rtl.convert(value,"BayrellLang.OpCodes.BaseOpCode","","");
		else if (variable_name == "class_implements")this.class_implements = rtl.convert(value,"Runtime.Vector",null,"string");
		else if (variable_name == "childs")this.childs = rtl.convert(value,"Runtime.Vector",null,"BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "class_template")this.class_template = rtl.convert(value,"Runtime.Vector",null,"BayrellLang.OpCodes.BaseOpCode");
		else if (variable_name == "flags")this.flags = rtl.convert(value,"BayrellLang.OpCodes.OpFlags",null,"");
		else if (variable_name == "annotations")this.annotations = rtl.convert(value,"Runtime.Vector",null,"OpAnnotation");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "class_name") return this.class_name;
		else if (variable_name == "class_extends") return this.class_extends;
		else if (variable_name == "class_implements") return this.class_implements;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "class_template") return this.class_template;
		else if (variable_name == "flags") return this.flags;
		else if (variable_name == "annotations") return this.annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("class_name");
			names.push("class_extends");
			names.push("class_implements");
			names.push("childs");
			names.push("class_template");
			names.push("flags");
			names.push("annotations");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = OpClassDeclare;