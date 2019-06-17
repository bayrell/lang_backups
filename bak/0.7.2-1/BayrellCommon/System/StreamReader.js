"use strict;"
/*!
 * Bayrell Common Library
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
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
class StreamReader extends CoreObject{
	/**
	 * Create object
	 */
	constructor(stream, charset){
		if (charset == undefined) charset="utf8";
		this.stream = stream;
		this.charset = charset;
	}
	/**
	 * Returns current stream
	 */
	getStream(){
		return this.stream;
	}
	/**
	 * Returns current stream
	 */
	getCharset(){
		return this.charset;
	}
	/**
	 * Read next char from stream
	 * @return char
	 */
	readChar(){
	}
	/**
	 * Read string from stream
	 * @param int 
	 * @return string
	 */
	readString(length){
		var s = "";
		var i = 0;
		while (!this.stream.isEOF() && i < length){
			s += this.readChar();
			i++;
		}
		return s;
	}
	/**
	 * Read line from stream
	 * @return string
	 */
	readLine(){
		var s = "";
		var ch = this.readChar();
		while (!this.stream.isEOF() && ch != "\n"){
			s += ch;
			ch = this.readChar();
		}
		return s;
	}
	/**
	 * Read all content from stream
	 */
	readAll(buffer_length){
		if (buffer_length == undefined) buffer_length=4096;
		var res = new Vector();
		while (false){
			var buffer = this.stream.readBytes(buffer_length);
			res.appendVector(buffer);
		}
		var s = (rtl.method(Utils.getClassName(), "bytesToString"))(res, this.charset);
		return s;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellCommon.System.StreamReader";}
	static getCurrentClassName(){return "BayrellCommon.System.StreamReader";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.stream = null;
		this.charset = "utf8";
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
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
module.exports = StreamReader;