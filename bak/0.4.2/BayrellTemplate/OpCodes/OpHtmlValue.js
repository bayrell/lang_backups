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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var Vector = require('BayrellRuntime').Vector;
var BaseOpCode = require('BayrellLang').OpCodes.BaseOpCode;
var OpValue1 = require('BayrellLang').OpCodes.OpValue1;
var OpHtmlAttribute = require('./OpHtmlAttribute.js');
class OpHtmlValue extends OpValue1{
	getClassName(){return "BayrellTemplate.OpCodes.OpHtmlValue";}
	static getParentClassName(){return "OpValue1";}
	_init(){
		super._init();
		this.op = "op_html_value";
		this.tp = "";
	}
	createNewInstance(){
		return rtl.newInstance( this.getClassName() );
	}
	assignObject(obj){
		if (obj instanceof OpHtmlValue){
			this.op = rtl._clone(obj.op);
			this.tp = rtl._clone(obj.tp);
		}
		super.assign(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_html_value", "");
		else if (variable_name == "tp") this.tp = rtl.correct(value, "string", "", "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tp") return this.tp;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("tp");
	}
	/**
	 * Type of attribute
	 * - "" - simple type
	 * - "raw" - raw html output
	 * - "json" - json output
	 */
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpHtmlValue";
	}
}
module.exports = OpHtmlValue;