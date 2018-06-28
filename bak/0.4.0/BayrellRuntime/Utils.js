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
var Context = require('./Context.js');
var Map = require('./Map.js');
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class Utils{
	/**
	 * Returns global context
	 * @return ContextInterface
	 */
	static globalContext(){
		
		if (isBrowser()) return Runtime.Utils._global_context;
		return Utils._global_context;
	}
	/**
	 * Set global context
	 * @param ContextInterface context
	 */
	static setGlobalContext(context){
		
		if (isBrowser()) Runtime.Utils._global_context = context;
		else Utils._global_context = context;
		return context;
	}
	/**
	 * Returns global context
	 * @param Context context
	 */
	static getGlobalContext(){
		return Utils.globalContext();
	}
	/**
	 * Register global Context
	 */
	static createContext(modules){
		var context = new Context();
		modules.each((module) => {
			context.registerModule(module);
		});
		return context;
	}
	/**
	 * Register global Context
	 */
	static registerGlobalContext(modules){
		var context = Utils.createContext(modules);
		Utils.setGlobalContext(context);
		return context;
	}
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	static isPrimitiveValue(value){
		if (rtl.isScalarValue(value)){
			return true;
		}
		if (value instanceof Vector){
			return true;
		}
		if (value instanceof Map){
			return true;
		}
		return false;
	}
	/**
	 * Get value from object
	 */
	static get(obj, key, default_value){
		if (default_value == undefined) default_value=null;
		if (obj instanceof Vector){
			return obj.get(key, default_value);
		}
		if (obj instanceof Map){
			return obj.get(key, default_value);
		}
		return default_value;
	}
	/**
	 * Set value to object
	 */
	static set(obj, key, value){
		if (value == undefined) value=null;
		if (obj instanceof Vector){
			obj.set(key, value);
		}
		if (obj instanceof Map){
			obj.set(key, value);
		}
	}
	/**
	 * Call each
	 */
	static each(obj, f){
		if (obj instanceof Vector){
			obj.each(f);
		}
		if (obj instanceof Map){
			obj.each(f);
		}
	}
	/**
	 * Convert bytes to string
	 * @param Vector<byte> arr - vector of the bytes
	 * @string charset - charset of the bytes vector. Default utf8
	 * @return string
	 */
	bytesToString(arr, charset){
		if (charset == undefined) charset="utf8";
	}
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	stringToBytes(s, arr, charset){
		if (charset == undefined) charset="utf8";
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	static translate(message, params, locale, context){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		if (context == undefined) context=null;
		if (context == null){
			context = Utils.globalContext();
		}
		if (context != null){
			var args = (new Vector()).push(message).push(params).push(locale);
			return rtl.callMethod(context, "translate", args);
		}
		return message;
	}
}
Utils._global_context = null;
module.exports = Utils;