"use strict;"
/*!
 *  Bayrell Json Serializer
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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var rtl = require('BayrellRtl').Lib.rtl;
var ContextObject = require('BayrellRtl').ContextObject;
var Vector = require('BayrellRtl').Types.Vector;
var AssertInterface = require('BayrellRtl').Interfaces.AssertInterface;
var SerializeInterface = require('BayrellRtl').Interfaces.SerializeInterface;
var SerializeStringInterface = require('BayrellRtl').Providers.SerializeStringInterface;
var JsonConvertToString = require('./JsonConvertToString.js');
var JsonRestoreFromString = require('./JsonRestoreFromString.js');
class JsonProvider extends ContextObject{
	_init(){
		super._init();
		this._display_class_name = true;
		this._indent = "  ";
		this._space = " ";
		this._crlf = "\n";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(SerializeStringInterface);
	}
	/**
	 * Convert object to string
	 * @return string
	 */
	convertToString(obj){
		var provider = new JsonConvertToString();
		provider.setDisplayClassName(this._display_class_name);
		provider.setIndent(this._indent);
		provider.setSpace(this._space);
		provider.setCRLF(this._crlf);
		var res = provider.convertToString(obj, 0);
		return res;
	}
	/**
	 * Restore object from string
	 * @param string s
	 */
	restoreFromString(s){
		var provider = new JsonRestoreFromString();
		var res = provider.restoreFromString(obj);
		return res;
	}
	/**
	 * Set display class name
	 * @param boolean value
	 */
	setDisplayClassName(value){
		this._display_class_name = value;
	}
	/**
	 * Set indent
	 * @param string value
	 */
	setIndent(value){
		this._indent = value;
	}
	/**
	 * Set space
	 * @param string value
	 */
	setSpace(value){
		this._space = value;
	}
	/**
	 * Set crlf
	 * @param string value
	 */
	setCRLF(value){
		this._crlf = value;
	}
	/**
	 * Returns display class name
	 * @return string
	 */
	getDisplayClassName(){
		return this._display_class_name;
	}
	/**
	 * Returns indent
	 * @return string
	 */
	getIndent(){
		return this._indent;
	}
	/**
	 * Set space
	 * @param string value
	 */
	getSpace(){
		return this._space;
	}
	/**
	 * Returns crlf
	 * @return string
	 */
	getCRLF(){
		return this._crlf;
	}
	/**
	 * Get space
	 * @return string
	 */
	getSpace(){
		return this._space;
	}
}
module.exports = JsonProvider;