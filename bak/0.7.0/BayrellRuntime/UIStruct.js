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
var Map = require('./Map.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
class UIStruct extends CoreStruct{
	/* TODO: Rewrite to lambda functions */
	/**
	 * Returns true if component
	 * @return bool
	 */
	isComponent(){
		return this.kind == UIStruct.TYPE_COMPONENT;
	}
	/**
	 * Returns true if string
	 * @return bool
	 */
	isString(){
		return this.kind == UIStruct.TYPE_STRING || this.kind == UIStruct.TYPE_RAW;
	}
	/**
	 * Returns true if component and name == class_name
	 * @param string class_name
	 * @return bool
	 */
	isClass(class_name){
		if (this.is_component && this.name == class_name){
			return true;
		}
		return false;
	}
	/**
	 * Returns props value
	 * @return mixed
	 */
	getProps(key, default_value, type_value, type_template){
		if (type_value == undefined) type_value="mixed";
		if (type_template == undefined) type_template="";
		if (this.props == null){
			return default_value;
		}
		return this.props.get(key, default_value, type_value, type_template);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.UIStruct";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.TYPE_ELEMENT = "element";
		this.TYPE_COMPONENT = "component";
		this.TYPE_STRING = "string";
		this.TYPE_RAW = "raw";
		this.__key = "";
		Object.defineProperty(this, "key", { get: function() { return this.__key; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("key") }});
		this.__name = "";
		Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__kind = "element";
		Object.defineProperty(this, "kind", { get: function() { return this.__kind; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("kind") }});
		this.__content = "";
		Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__ref = "";
		Object.defineProperty(this, "ref", { get: function() { return this.__ref; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ref") }});
		this.__control = "";
		Object.defineProperty(this, "control", { get: function() { return this.__control; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("control") }});
		this.__signal_in = "";
		Object.defineProperty(this, "signal_in", { get: function() { return this.__signal_in; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("signal_in") }});
		this.__signal_out = "";
		Object.defineProperty(this, "signal_out", { get: function() { return this.__signal_out; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("signal_out") }});
		this.__props = null;
		Object.defineProperty(this, "props", { get: function() { return this.__props; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("props") }});
		this.__children = null;
		Object.defineProperty(this, "children", { get: function() { return this.__children; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("children") }});
	}
	assignObject(obj){
		if (obj instanceof UIStruct){
			this.__key = rtl._clone(obj.key);
			this.__name = rtl._clone(obj.name);
			this.__kind = rtl._clone(obj.kind);
			this.__content = rtl._clone(obj.content);
			this.__ref = rtl._clone(obj.ref);
			this.__control = rtl._clone(obj.control);
			this.__signal_in = rtl._clone(obj.signal_in);
			this.__signal_out = rtl._clone(obj.signal_out);
			this.__props = rtl._clone(obj.props);
			this.__children = rtl._clone(obj.children);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "key")this.__key = rtl.correct(value,"string","","");
		else if (variable_name == "name")this.__name = rtl.correct(value,"string","","");
		else if (variable_name == "kind")this.__kind = rtl.correct(value,"string","element","");
		else if (variable_name == "content")this.__content = rtl.correct(value,"string","","");
		else if (variable_name == "ref")this.__ref = rtl.correct(value,"string","","");
		else if (variable_name == "control")this.__control = rtl.correct(value,"string","","");
		else if (variable_name == "signal_in")this.__signal_in = rtl.correct(value,"string","","");
		else if (variable_name == "signal_out")this.__signal_out = rtl.correct(value,"string","","");
		else if (variable_name == "props")this.__props = rtl.correct(value,"Runtime.Map",null,"primitive");
		else if (variable_name == "children")this.__children = rtl.correct(value,"Runtime.Vector",null,"Runtime.UIStruct");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "key") return this.__key;
		else if (variable_name == "name") return this.__name;
		else if (variable_name == "kind") return this.__kind;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "ref") return this.__ref;
		else if (variable_name == "control") return this.__control;
		else if (variable_name == "signal_in") return this.__signal_in;
		else if (variable_name == "signal_out") return this.__signal_out;
		else if (variable_name == "props") return this.__props;
		else if (variable_name == "children") return this.__children;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("key");
			names.push("name");
			names.push("kind");
			names.push("content");
			names.push("ref");
			names.push("control");
			names.push("signal_in");
			names.push("signal_out");
			names.push("props");
			names.push("children");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
UIStruct.TYPE_ELEMENT = "element";
UIStruct.TYPE_COMPONENT = "component";
UIStruct.TYPE_STRING = "string";
UIStruct.TYPE_RAW = "raw";
module.exports = UIStruct;