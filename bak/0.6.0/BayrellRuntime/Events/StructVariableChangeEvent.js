"use strict;"
/*!
 *  Bayrell Runtime Library
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
var CoreEvent = require('../CoreEvent.js');
var CoreObject = require('../CoreObject.js');
var rtl = require('../rtl.js');
class StructVariableChangeEvent extends CoreEvent{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.Events.StructVariableChangeEvent";}
	static getParentClassName(){return "CoreEvent";}
	_init(){
		super._init();
		this.varname = "";
		this.value = null;
		this.obj = null;
	}
	assignObject(obj){
		if (obj instanceof StructVariableChangeEvent){
			this.varname = rtl._clone(obj.varname);
			this.value = rtl._clone(obj.value);
			this.obj = rtl._clone(obj.obj);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "varname"){this.varname = rtl.correct(value,"string","","");this.assignValueAfter("varname",value,sender);}
		else if (variable_name == "value"){this.value = rtl.correct(value,"mixed",null,"");this.assignValueAfter("value",value,sender);}
		else if (variable_name == "obj"){this.obj = rtl.correct(value,"Runtime.CoreObject",null,"");this.assignValueAfter("obj",value,sender);}
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "varname") return this.varname;
		else if (variable_name == "value") return this.value;
		else if (variable_name == "obj") return this.obj;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("varname");
			names.push("value");
			names.push("obj");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = StructVariableChangeEvent;