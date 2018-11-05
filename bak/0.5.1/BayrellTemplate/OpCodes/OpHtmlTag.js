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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
var OpHtmlAttribute = require('./OpHtmlAttribute.js');
class OpHtmlTag extends BaseOpCode{
	getClassName(){return "BayrellTemplate.OpCodes.OpHtmlTag";}
	static getParentClassName(){return "BaseOpCode";}
	_init(){
		super._init();
		this.op = "op_html_tag";
		this.tag_name = "";
		this.attributes = null;
		this.spreads = null;
		this.childs = null;
		this.is_plain = false;
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_html_tag", "");
		else if (variable_name == "tag_name") this.tag_name = rtl.correct(value, "string", "", "");
		else if (variable_name == "attributes") this.attributes = rtl.correct(value, "Vector", null, "OpHtmlAttribute");
		else if (variable_name == "spreads") this.spreads = rtl.correct(value, "Vector", null, "mixed");
		else if (variable_name == "childs") this.childs = rtl.correct(value, "Vector", null, "BaseOpCode");
		else if (variable_name == "is_plain") this.is_plain = rtl.correct(value, "bool", false, "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		else if (variable_name == "tag_name") return this.tag_name;
		else if (variable_name == "attributes") return this.attributes;
		else if (variable_name == "spreads") return this.spreads;
		else if (variable_name == "childs") return this.childs;
		else if (variable_name == "is_plain") return this.is_plain;
		return super.takeValue(variable_name, default_value);
	}
	getVariablesNames(names){
		super.getVariablesNames(names);
		names.push("op");
		names.push("tag_name");
		names.push("attributes");
		names.push("spreads");
		names.push("childs");
		names.push("is_plain");
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
}
module.exports = OpHtmlTag;