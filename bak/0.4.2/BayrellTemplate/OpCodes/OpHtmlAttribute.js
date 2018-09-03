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
class OpHtmlAttribute extends BaseOpCode{
	getClassName(){return "BayrellTemplate.OpCodes.OpHtmlAttribute";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_html_attribute";
		this.key = "";
		this.value = null;
	}
	assignObject(obj){
		if (obj instanceof OpHtmlAttribute){
			this.op = rtl._clone(obj.op);
			this.key = rtl._clone(obj.key);
			this.value = rtl._clone(obj.value);
		}
		super.assign(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = value;
		else if (variable_name == "key") this.key = value;
		else if (variable_name == "value") this.value = value;
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "key") return this.key;
		else if (variable_name == "value") return this.value;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("key");
		names.push("value");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpHtmlAttribute";
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpHtmlAttribute;