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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var BaseOpCode = require('./BaseOpCode.js');
var OpAnnotation = require('./OpAnnotation.js');
var OpDynamic = require('./OpDynamic.js');
var OpFlags = require('./OpFlags.js');
var OpIdentifier = require('./OpIdentifier.js');
var OpTemplateIdentifier = require('./OpTemplateIdentifier.js');
class OpAssignDeclare extends BaseOpCode{
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
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpAssignDeclare";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_assign_declare";
		this.tp = null;
		this.name = null;
		this.value = null;
		this.flags = null;
		this.annotations = null;
	}
	assignObject(obj){
		if (obj instanceof OpAssignDeclare){
			this.op = rtl._clone(obj.op);
			this.tp = rtl._clone(obj.tp);
			this.name = rtl._clone(obj.name);
			this.value = rtl._clone(obj.value);
			this.flags = rtl._clone(obj.flags);
			this.annotations = rtl._clone(obj.annotations);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op"){this.op = rtl.correct(value,"string","op_assign_declare","");this.assignValueAfter("op",value,sender);}
		else if (variable_name == "tp"){this.tp = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("tp",value,sender);}
		else if (variable_name == "name"){this.name = rtl.correct(value,"string",null,"");this.assignValueAfter("name",value,sender);}
		else if (variable_name == "value"){this.value = rtl.correct(value,"BayrellLang.OpCodes.BaseOpCode",null,"");this.assignValueAfter("value",value,sender);}
		else if (variable_name == "flags"){this.flags = rtl.correct(value,"BayrellLang.OpCodes.OpFlags",null,"");this.assignValueAfter("flags",value,sender);}
		else if (variable_name == "annotations"){this.annotations = rtl.correct(value,"Vector",null,"BayrellLang.OpCodes.OpAnnotation");this.assignValueAfter("annotations",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tp") return this.tp;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "flags") return this.flags;
		else if (variable_name == "annotations") return this.annotations;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
			names.push("tp");
			names.push("name");
			names.push("value");
			names.push("flags");
			names.push("annotations");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpAssignDeclare;