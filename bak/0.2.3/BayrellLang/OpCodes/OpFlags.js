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
var Vector = require('BayrellRtl').Types.Vector;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var BaseOpCode = require('./BaseOpCode.js');
var SerializeInterface = require('BayrellRtl').Interfaces.SerializeInterface;
class OpFlags extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_flags";
		this.p_async = false;
		this.p_export = false;
		this.p_static = false;
		this.p_const = false;
		this.p_public = false;
		this.p_private = false;
		this.p_protected = false;
		this.p_declare = false;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpFlags){
			this.p_async = obj.p_async;
			this.p_export = obj.p_export;
			this.p_static = obj.p_static;
			this.p_const = obj.p_const;
			this.p_public = obj.p_public;
			this.p_private = obj.p_private;
			this.p_protected = obj.p_protected;
			this.p_declare = obj.p_declare;
		}
		super.assign(obj);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpFlags";
	}
	/**
	 * Returns name of variables to serialization
	 * @return Vector<string>
	 */
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("export");
		names.push("static");
		names.push("const");
		names.push("public");
		names.push("private");
		names.push("declare");
		names.push("protected");
		names.push("async");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "export"){
			return this.p_export;
		}
		else if (variable_name == "static"){
			return this.p_static;
		}
		else if (variable_name == "const"){
			return this.p_const;
		}
		else if (variable_name == "public"){
			return this.p_public;
		}
		else if (variable_name == "private"){
			return this.p_private;
		}
		else if (variable_name == "declare"){
			return this.p_declare;
		}
		else if (variable_name == "protected"){
			return this.p_protected;
		}
		else if (variable_name == "async"){
			return this.p_async;
		}
		return super.takeValue(variable_name, default_value);
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		if (variable_name == "export"){
			this.p_export = value;
		}
		else if (variable_name == "static"){
			this.p_static = value;
		}
		else if (variable_name == "const"){
			this.p_const = value;
		}
		else if (variable_name == "public"){
			this.p_public = value;
		}
		else if (variable_name == "private"){
			this.p_private = value;
		}
		else if (variable_name == "declare"){
			this.p_declare = value;
		}
		else if (variable_name == "protected"){
			this.p_protected = value;
		}
		else if (variable_name == "async"){
			this.p_async = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
	/**
	 * Assign flag
	 */
	assignFlag(flag_name){
		if (OpFlags.hasFlag(flag_name)){
			this.assignValue(flag_name, true);
			return true;
		}
		return false;
	}
	/**
	 * Get flags
	 */
	static getFlags(){
		return (new Vector()).push("export").push("static").push("const").push("public").push("private").push("declare").push("protected").push("async");
	}
	/**
	 * Get flags
	 */
	static hasFlag(flag_name){
		if (flag_name == "export" || flag_name == "static" || flag_name == "const" || flag_name == "public" || flag_name == "private" || flag_name == "declare" || flag_name == "protected" || flag_name == "async"){
			return true;
		}
		return false;
	}
}
module.exports = OpFlags;