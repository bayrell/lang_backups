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
class FileIOResult extends CoreStruct{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.FileSystem.FileIOResult";}
	static getCurrentNamespace(){return "Core.FileSystem";}
	static getCurrentClassName(){return "Core.FileSystem.FileIOResult";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.KIND_READ_BINARY = "rb";
		this.KIND_WRITE_BINARY = "wb";
		this.__name = "";
		if (names.indexOf("name") == -1)Object.defineProperty(this, "name", { get: function() { return this.__name; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("name") }});
		this.__kind = "";
		if (names.indexOf("kind") == -1)Object.defineProperty(this, "kind", { get: function() { return this.__kind; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("kind") }});
		this.__content = "";
		if (names.indexOf("content") == -1)Object.defineProperty(this, "content", { get: function() { return this.__content; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("content") }});
		this.__bytes = null;
		if (names.indexOf("bytes") == -1)Object.defineProperty(this, "bytes", { get: function() { return this.__bytes; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("bytes") }});
		this.__offset = 0;
		if (names.indexOf("offset") == -1)Object.defineProperty(this, "offset", { get: function() { return this.__offset; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("offset") }});
		this.__count = 0;
		if (names.indexOf("count") == -1)Object.defineProperty(this, "count", { get: function() { return this.__count; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("count") }});
		this.__size = 0;
		if (names.indexOf("size") == -1)Object.defineProperty(this, "size", { get: function() { return this.__size; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("size") }});
		this.__eof = false;
		if (names.indexOf("eof") == -1)Object.defineProperty(this, "eof", { get: function() { return this.__eof; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("eof") }});
	}
	assignObject(obj){
		if (obj instanceof FileIOResult){
			this.__name = obj.__name;
			this.__kind = obj.__kind;
			this.__content = obj.__content;
			this.__bytes = obj.__bytes;
			this.__offset = obj.__offset;
			this.__count = obj.__count;
			this.__size = obj.__size;
			this.__eof = obj.__eof;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "name")this.__name = rtl.convert(value,"string","","");
		else if (variable_name == "kind")this.__kind = rtl.convert(value,"string","","");
		else if (variable_name == "content")this.__content = rtl.convert(value,"string","","");
		else if (variable_name == "bytes")this.__bytes = rtl.convert(value,"Runtime.Collection",null,"mixed");
		else if (variable_name == "offset")this.__offset = rtl.convert(value,"int",0,"");
		else if (variable_name == "count")this.__count = rtl.convert(value,"int",0,"");
		else if (variable_name == "size")this.__size = rtl.convert(value,"int",0,"");
		else if (variable_name == "eof")this.__eof = rtl.convert(value,"bool",false,"");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "name") return this.__name;
		else if (variable_name == "kind") return this.__kind;
		else if (variable_name == "content") return this.__content;
		else if (variable_name == "bytes") return this.__bytes;
		else if (variable_name == "offset") return this.__offset;
		else if (variable_name == "count") return this.__count;
		else if (variable_name == "size") return this.__size;
		else if (variable_name == "eof") return this.__eof;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("name");
			names.push("kind");
			names.push("content");
			names.push("bytes");
			names.push("offset");
			names.push("count");
			names.push("size");
			names.push("eof");
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
FileIOResult.KIND_READ_BINARY = "rb";
FileIOResult.KIND_WRITE_BINARY = "wb";
module.exports = FileIOResult;