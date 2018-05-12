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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var Vector = require('BayrellRtl').Types.Vector;
var BaseOpCode = require('BayrellLang').OpCodes.BaseOpCode;
var OpHtmlAttribute = require('./OpHtmlAttribute.js');
class OpHtmlTag extends BaseOpCode{
	_init(){
		super._init();
		this.op = "op_html_tag";
		this.tag_name = "";
		this.attributes = null;
		this.childs = null;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		if (obj instanceof OpHtmlDeclare){
			this.tag_name = obj.tag_name;
			this.attributes = rtl._clone(obj.attributes);
			this.childs = rtl._clone(obj.childs);
		}
		super.assign(obj);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpHtmlTag";
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.childs = new Vector();
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
		names.push("tag_name");
		names.push("attributes");
		names.push("childs");
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
		if (variable_name == "tag_name"){
			return this.tag_name;
		}
		else if (variable_name == "attributes"){
			return this.attributes;
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
		if (variable_name == "tag_name"){
			this.tag_name = value;
		}
		else if (variable_name == "attributes"){
			this.attributes = value;
		}
		else if (variable_name == "childs"){
			this.childs = value;
		}
		else {
			super.assignValue(variable_name, value);
		}
	}
}
module.exports = OpHtmlTag;