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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var Vector = require('bayrell-runtime-nodejs').Vector;
var BaseOpCode = require('./BaseOpCode.js');
var OpValueString = require('./OpValueString.js');
var OpHtmlAttribute = require('./OpHtmlAttribute.js');
class OpHtmlText extends OpValueString{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.OpCodes.OpHtmlText";}
	static getParentClassName(){return "OpValueString";}
	_init(){
		super._init();
		this.op = "op_html_text";
	}
	assignObject(obj){
		if (obj instanceof OpHtmlText){
			this.op = rtl._clone(obj.op);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "op")this.op = rtl.correct(value,"string","op_html_text","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "op") return this.op;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("op");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = OpHtmlText;