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
var CoreObject = require('BayrellRtl').CoreObject;
var rs = require('BayrellRtl').Lib.rs;
var Utils = require('BayrellRtl').Lib.Utils;
var SerializeInterface = require('BayrellRtl').Interfaces.SerializeInterface;
var KeyNotFound = require('BayrellRtl').Exceptions.KeyNotFound;
class JsonConvertToString extends CoreObject{
	_init(){
		super._init();
		this._display_class_name = true;
		this._indent = "  ";
		this._space = " ";
		this._crlf = "\n";
	}
	/**
	 * Escape string
	 */
	escape(s){
		return s;
	}
	/**
	 * Return string with indent
	 * @param string s
	 * @param int level
	 * @return string
	 */
	out(s, level){
		for (var i = 0; i < level; i++){
			s = rtl.toString(this._indent)+rtl.toString(s);
		}
		return s;
	}
	/**
	 * Convert primitive value to json string
	 */
	convertToPrimitiveValue(value, level){
		if (value instanceof Vector){
			if (value.count() == 0){
				return "[]";
			}
			var res = new Vector();
			for (var i = 0; i < value.count(); i++){
				var val = value.item(i);
				if (val == null){
					res.push(this.out("null", level + 1));
				}
				else if (rtl.isScalarValue(val) || val instanceof Vector || val instanceof Map){
					res.push(this.out(this.convertToPrimitiveValue(val, level + 1), level + 1));
				}
				else if (rtl.implements(val, SerializeInterface)){
					res.push(this.out(this.convertToString(val, level + 1), level + 1));
				}
				else {
					res.push(this.out("null", level + 1));
				}
			}
			var res_str = "["+rtl.toString(this._crlf)+rtl.toString(rs.implode(","+rtl.toString(this._crlf), res))+rtl.toString(this._crlf)+rtl.toString(this.out("]", level));
			return res_str;
		}
		else if (value instanceof Map){
			var res = new Vector();
			var names = value.keys();
			if (names.count() == 0){
				return "{}";
			}
			for (var i = 0; i < names.count(); i++){
				var key = names.item(i);
				var val = null;
				try{
					val = value.item(key);
				}catch(_the_exception){
					if (_the_exception instanceof KeyNotFound){
						var e = _the_exception;
						val = null;
					}
				}
				if (val == null){
					res.push(this.out("\""+rtl.toString(this.escape(key))+"\":"+rtl.toString(this._space)+"null", level + 1));
				}
				else if (rtl.isScalarValue(val) || val instanceof Vector || val instanceof Map){
					res.push(this.out("\""+rtl.toString(this.escape(key))+"\":"+rtl.toString(this._space)+rtl.toString(this.convertToPrimitiveValue(val, level + 1)), level + 1));
				}
				else if (rtl.implements(val, SerializeInterface)){
					res.push(this.out("\""+rtl.toString(this.escape(key))+"\":"+rtl.toString(this._space)+rtl.toString(this.convertToString(val, level + 1)), level + 1));
				}
				else {
					res.push(this.out("\""+rtl.toString(this.escape(key))+"\":"+rtl.toString(this._space)+"null", level + 1));
				}
			}
			var res_str = "{"+rtl.toString(this._crlf)+rtl.toString(rs.implode(","+rtl.toString(this._crlf), res))+rtl.toString(this._crlf)+rtl.toString(this.out("}", level));
			return res_str;
		}
		else if (rtl.isString(value)){
			return "\""+rtl.toString(this.escape(value))+"\"";
		}
		return rtl.toString(value);
	}
	/**
	 * Convert object to string
	 * @return string
	 */
	convertToString(obj, level){
		if (!rtl.implements(obj, SerializeInterface)){
			if (Utils.isPrimitiveValue(obj)){
				return this.convertToPrimitiveValue(obj, level);
			}
			return null;
		}
		var names = new Vector();
		var classname = obj.getClassName();
		obj.getVariablesNames(names);
		var data = new Map();
		if (this._display_class_name){
			data.set("__class_name__", classname);
		}
		for (var i = 0; i < names.count(); i++){
			var key = names.item(i);
			var value = obj.takeValue(key);
			data.set(key, value);
		}
		var res_str = this.convertToPrimitiveValue(data, level);
		return res_str;
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
}
module.exports = JsonConvertToString;