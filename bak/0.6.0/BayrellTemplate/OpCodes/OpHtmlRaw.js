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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
var OpValue1 = require('bayrell-lang-nodejs').OpCodes.OpValue1;
class OpHtmlRaw extends OpValue1{
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellTemplate.OpCodes.OpHtmlRaw";
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellTemplate.OpCodes.OpHtmlRaw";}
	static getParentClassName(){return "OpValue1";}
	_init(){
		super._init();
		this.op = "op_html_raw";
	}
	assignObject(obj){
		if (obj instanceof OpHtmlRaw){
			this.op = rtl._clone(obj.op);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "op") this.op = rtl.correct(value, "string", "op_html_raw", "");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("op");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpHtmlRaw;