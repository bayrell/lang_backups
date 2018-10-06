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
class OpTemplateIdentifier extends BaseOpCode{
	getClassName(){return "BayrellLang.OpCodes.OpTemplateIdentifier";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_template_identifier";
		this.t = null;
		this.childs = null;
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpTemplateIdentifier";
	}
	/**
	 * Constructor
	 */
	constructor(t, childs){
		if (t == undefined) t=null;
		if (childs == undefined) childs=null;
		super();
		this.t = t;
		this.childs = childs;
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
		names.push("type");
		names.push("childs");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "type"){
			return this.t;
		}
		else if (variable_name == "childs"){
			return this.childs;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "type"){
			this.t = value;
		}
		else if (variable_name == "childs"){
			this.childs = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
}
module.exports = OpTemplateIdentifier;