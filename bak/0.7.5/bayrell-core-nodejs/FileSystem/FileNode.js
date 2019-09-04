"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
class FileNode extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.FileSystem.FileNode";}
	static getCurrentNamespace(){return "Core.FileSystem";}
	static getCurrentClassName(){return "Core.FileSystem.FileNode";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.KIND_FOLDER = "folder";
		this.KIND_SYMLINK = "symlink";
		this.KIND_FILE = "file";
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__kind = "";
		if (names.indexOf("kind") == -1)Object.defineProperty(this, "kind", { get: function() { return this.__kind; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("kind") }});
		this.__items = null;
		if (names.indexOf("items") == -1)Object.defineProperty(this, "items", { get: function() { return this.__items; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("items") }});
	}
	assignObject(obj){
		if (obj instanceof FileNode){
			this.__name = obj.__name;
			this.__kind = obj.__kind;
			this.__items = obj.__items;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "kind")this.__kind = rtl.convert(value,"string","","");
		else if (variable_name == "items")this.__items = rtl.convert(value,"Runtime.Collection",null,"Core.FileSystem.FileNode");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "name") return this.__name;
		else if (variable_name == "kind") return this.__kind;
		else if (variable_name == "items") return this.__items;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("name");
			names.push("kind");
			names.push("items");
		}
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
FileNode.KIND_FOLDER = "folder";
FileNode.KIND_SYMLINK = "symlink";
FileNode.KIND_FILE = "file";
module.exports = FileNode;