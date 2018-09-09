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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var BaseOpCode = require('./BaseOpCode.js');
class OpPreprocessorCase extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpPreprocessorCase";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_preprocessor_case";
		this.condition = null;
		this.value = null;
	}
	createNewInstance(){
		return rtl.newInstance( this.getClassName() );
	}
	assignObject(obj){
		if (obj instanceof OpPreprocessorCase){
			this.op = rtl._clone(obj.op);
			this.condition = rtl._clone(obj.condition);
			this.value = rtl._clone(obj.value);
		}
		super.assign(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_preprocessor_case", "");
		else if (variable_name == "condition") this.condition = rtl.correct(value, "BaseOpCode", null, "");
		else if (variable_name == "value") this.value = rtl.correct(value, "string", null, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "condition") return this.condition;
		else if (variable_name == "value") return this.value;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("condition");
		names.push("value");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpPreprocessorCase";
	}
	/**
	 * Constructor
	 */
	constructor(condition, value){
		if (condition == undefined) condition=null;
		if (value == undefined) value="";
		super();
		this.condition = condition;
		this.value = value;
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpPreprocessorCase;