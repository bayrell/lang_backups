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
class OpVector extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_vector";
		this.values = null;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = value;
		else if (variable_name == "values") this.values = value;
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "values") return this.values;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		names.push("op");
		names.push("values");
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpVector";
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.values = new Vector();
	}
	/**
	 * Destructor
	 */
	destructor(){
		super.destructor();
	}
}
module.exports = OpVector;