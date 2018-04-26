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
class OpTryCatchChilds extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_try_catch_childs";
		this.op_type = null;
		this.op_ident = null;
		this.childs = null;
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpTryCatchChilds";
	}
	/**
	 * Constructor
	 */
	constructor(op_type, op_ident, childs){
		if (op_type == undefined) op_type=null;
		if (op_ident == undefined) op_ident=null;
		if (childs == undefined) childs=null;
		super();
		this.op_type = op_type;
		this.op_ident = op_ident;
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
		names.push("op_type");
		names.push("op_ident");
		names.push("childs");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "op_type"){
			return this.op_type;
		}
		else if (variable_name == "op_ident"){
			return this.op_ident;
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
		if (variable_name == "op_type"){
			this.op_type = value;
		}
		if (variable_name == "op_ident"){
			this.op_ident = value;
		}
		if (variable_name == "childs"){
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
		if (obj instanceof OpTryCatchChilds){
			this.op_type = rtl.clone(obj.op_type);
			this.op_ident = rtl.clone(obj.op_ident);
			this.childs = rtl.clone(obj.childs);
		}
		super.assign(obj);
	}
}
module.exports = OpTryCatchChilds;