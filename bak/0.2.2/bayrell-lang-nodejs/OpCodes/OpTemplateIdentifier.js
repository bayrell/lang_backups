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
var rtl = require('BayrellRtl').Lib.rtl;
var BaseOpCode = require('./BaseOpCode.js');
var SerializeInterface = require('BayrellRtl').Interfaces.SerializeInterface;
class OpTemplateIdentifier extends BaseOpCode{
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
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpTypeIdentifier){
			this.t = rtl._clone(obj.t);
			this.childs = rtl._clone(obj.childs);
		}
		super.assign(obj);
	}
}
module.exports = OpTemplateIdentifier;