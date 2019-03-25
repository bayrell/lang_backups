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
var CoreStruct = require('./CoreStruct.js');
var Emitter = require('./Emitter.js');
var Reference = require('./Reference.js');
class UIControl extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.UIControl";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.__key = "";
		Object.defineProperty(this, "key", { get: function() { return this.__key; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("key") }});
		this.__ref = null;
		Object.defineProperty(this, "ref", { get: function() { return this.__ref; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ref") }});
		this.__signal_in = null;
		Object.defineProperty(this, "signal_in", { get: function() { return this.__signal_in; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("signal_in") }});
		this.__signal_out = null;
		Object.defineProperty(this, "signal_out", { get: function() { return this.__signal_out; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("signal_out") }});
	}
	assignObject(obj){
		if (obj instanceof UIControl){
			this.__key = rtl._clone(obj.key);
			this.__ref = rtl._clone(obj.ref);
			this.__signal_in = rtl._clone(obj.signal_in);
			this.__signal_out = rtl._clone(obj.signal_out);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "key")this.__key = rtl.correct(value,"string","","");
		else if (variable_name == "ref")this.__ref = rtl.correct(value,"Runtime.Reference",null,"");
		else if (variable_name == "signal_in")this.__signal_in = rtl.correct(value,"Runtime.Emitter",null,"");
		else if (variable_name == "signal_out")this.__signal_out = rtl.correct(value,"Runtime.Emitter",null,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "key") return this.__key;
		else if (variable_name == "ref") return this.__ref;
		else if (variable_name == "signal_in") return this.__signal_in;
		else if (variable_name == "signal_out") return this.__signal_out;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("key");
			names.push("ref");
			names.push("signal_in");
			names.push("signal_out");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
module.exports = UIControl;