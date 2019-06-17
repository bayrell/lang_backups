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
var FileNode = require('./FileNode.js');
class FileStat extends FileNode{
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.FileSystem.FileStat";}
	static getCurrentNamespace(){return "Core.FileSystem";}
	static getCurrentClassName(){return "Core.FileSystem.FileStat";}
	static getParentClassName(){return "Core.FileSystem.FileNode";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.__exists = false;
		if (names.indexOf("exists") == -1)Object.defineProperty(this, "exists", { get: function() { return this.__exists; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("exists") }});
		this.__mode = "";
		if (names.indexOf("mode") == -1)Object.defineProperty(this, "mode", { get: function() { return this.__mode; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("mode") }});
		this.__user = "";
		if (names.indexOf("user") == -1)Object.defineProperty(this, "user", { get: function() { return this.__user; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("user") }});
		this.__group = "";
		if (names.indexOf("group") == -1)Object.defineProperty(this, "group", { get: function() { return this.__group; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("group") }});
		this.__size = 0;
		if (names.indexOf("size") == -1)Object.defineProperty(this, "size", { get: function() { return this.__size; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("size") }});
		this.__atime = 0;
		if (names.indexOf("atime") == -1)Object.defineProperty(this, "atime", { get: function() { return this.__atime; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("atime") }});
		this.__ctime = 0;
		if (names.indexOf("ctime") == -1)Object.defineProperty(this, "ctime", { get: function() { return this.__ctime; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("ctime") }});
		this.__mtime = 0;
		if (names.indexOf("mtime") == -1)Object.defineProperty(this, "mtime", { get: function() { return this.__mtime; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("mtime") }});
		this.__mime = "";
		if (names.indexOf("mime") == -1)Object.defineProperty(this, "mime", { get: function() { return this.__mime; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("mime") }});
		this.__charset = "";
		if (names.indexOf("charset") == -1)Object.defineProperty(this, "charset", { get: function() { return this.__charset; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("charset") }});
		this.__download_url = "";
		if (names.indexOf("download_url") == -1)Object.defineProperty(this, "download_url", { get: function() { return this.__download_url; }, set: function(value) { throw new Runtime.Exceptions.AssignStructValueError("download_url") }});
	}
	assignObject(obj){
		if (obj instanceof FileStat){
			this.__exists = obj.__exists;
			this.__mode = obj.__mode;
			this.__user = obj.__user;
			this.__group = obj.__group;
			this.__size = obj.__size;
			this.__atime = obj.__atime;
			this.__ctime = obj.__ctime;
			this.__mtime = obj.__mtime;
			this.__mime = obj.__mime;
			this.__charset = obj.__charset;
			this.__download_url = obj.__download_url;
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		if (variable_name == "exists")this.__exists = rtl.convert(value,"bool",false,"");
		else if (variable_name == "mode")this.__mode = rtl.convert(value,"string","","");
		else if (variable_name == "user")this.__user = rtl.convert(value,"string","","");
		else if (variable_name == "group")this.__group = rtl.convert(value,"string","","");
		else if (variable_name == "size")this.__size = rtl.convert(value,"int",0,"");
		else if (variable_name == "atime")this.__atime = rtl.convert(value,"int",0,"");
		else if (variable_name == "ctime")this.__ctime = rtl.convert(value,"int",0,"");
		else if (variable_name == "mtime")this.__mtime = rtl.convert(value,"int",0,"");
		else if (variable_name == "mime")this.__mime = rtl.convert(value,"string","","");
		else if (variable_name == "charset")this.__charset = rtl.convert(value,"string","","");
		else if (variable_name == "download_url")this.__download_url = rtl.convert(value,"string","","");
		else super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "exists") return this.__exists;
		else if (variable_name == "mode") return this.__mode;
		else if (variable_name == "user") return this.__user;
		else if (variable_name == "group") return this.__group;
		else if (variable_name == "size") return this.__size;
		else if (variable_name == "atime") return this.__atime;
		else if (variable_name == "ctime") return this.__ctime;
		else if (variable_name == "mtime") return this.__mtime;
		else if (variable_name == "mime") return this.__mime;
		else if (variable_name == "charset") return this.__charset;
		else if (variable_name == "download_url") return this.__download_url;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
		if ((flag | 3)==3){
			names.push("exists");
			names.push("mode");
			names.push("user");
			names.push("group");
			names.push("size");
			names.push("atime");
			names.push("ctime");
			names.push("mtime");
			names.push("mime");
			names.push("charset");
			names.push("download_url");
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
module.exports = FileStat;