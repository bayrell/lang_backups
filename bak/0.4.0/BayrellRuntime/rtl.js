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
var StringInterface = require('./Interfaces/StringInterface.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class rtl{
	getClassName(){return "Runtime.rtl";}
	
	static implements(obj, interface_name){
		if (obj == undefined) return false;
		if (obj.__implements__ == undefined) return false;
		return obj.__implements__.indexOf(interface_name) != -1;
	}
	
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	static find_class(class_name){
		if (class_name instanceof Function)
			return class_name;
		
		var class_name_arr = class_name.split('.');
		if (class_name_arr.length < 2)
			return null;
		
		var module_name = class_name_arr[0];
		var last_name = class_name_arr[ class_name_arr.length - 1 ];
		
		if (module_name == 'Runtime') 
			module_name = 'BayrellRuntime';
		
		var obj = require(module_name);
		for (var i=1; i<class_name_arr.length - 1; i++){
			if (!this.exists(obj[class_name_arr[i]])){
				obj = null;
				break;
			}
			obj = obj[ class_name_arr[i] ];
		}
		
		if (!this.exists(obj))
			return null;
		
		obj = obj[last_name];
		return obj;
	}
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	
	static newInstance(class_name, args){
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined) args = [];
		args = args.slice(); 
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	}
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 *
	declare export static Object newInstanceByObject(Object obj);
	
	#switch
	#case ifcode PHP then
	static function newInstanceByObject($obj){
		$class_name = get_class($obj);
		return new $class_name();
	}
	#case ifcode JAVASCRIPT then
	static newInstanceByObject(obj){
		var f = Function.prototype.bind.apply(obj.constructor, [null]);
		return new f;
	}
	#endswitch
	*/
	/**
	 * Call method
	 * @return Object
	 */
	
	static callMethod(obj, method_name, args){
		var f = obj[method_name];
		return f.apply(obj, args);
	}
	/**
	 * Call method
	 * @return Object
	 */
	
	static callStaticMethod(class_name, method_name, args){
		var obj = this.find_class(class_name);
		var f = obj[method_name];
		return f.apply(obj, args);
	}
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	
	static clone(val, context){
		if (isBrowser()) return Runtime.rtl._clone(val, context);
		else return rtl._clone(val, context);
	}
	static _clone(val, context){
		if (context == undefined)
			context = null;
		
		if (val == null)
			return null;
		
		else if (val instanceof Number){
			return new Number(val);
		}
		else if (val instanceof String){
			return new String(val);
		}
		else if (val instanceof Boolean){
			return new Boolean(val);
		}
		else if (val instanceof Date){
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function"){
			return val.cloneNode(true);
		}
		else if (typeof val == 'object' && 
			val.createNewInstance && typeof val.createNewInstance == "function" &&
			val.assign && typeof val.assign == "function")
		{
			var res = val.createNewInstance();
			res.assign(val);
			return res;
		}
		else if (Array.isArray(val)){	
			var res = [];
			for (var i=0;i<val.length;i++){
				res[i] = this.clone(val[i]);
			}
			return res;
		}
		
		return val;
	}
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return boolean
	 */
	
	static exists(value){
		return (value != null) && (value != undefined);
	}
	/**
	 * Returns true if value is scalar value
	 * @return boolean 
	 */
	static isScalarValue(value){
		if (rtl.isString(value)){
			return true;
		}
		if (rtl.isNumber(value)){
			return true;
		}
		if (rtl.isBoolean(value)){
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return boolean
	 */
	static isBoolean(value){
		if (value === false || value === true){
			return true;
		}
		return false;
	}
	/**
	 * Return true if value is number
	 * @param var value
	 * @return boolean
	 */
	
	static isNumber(value){
		if (typeof value == "number") return true;
		return false;
	}
	/**
	 * Return true if value is string
	 * @param var value
	 * @return boolean
	 */
	
	static isString(value){
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	}
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	
	static toString(value){
		var _StringInterface = null;
		if (isBrowser()) _StringInterface = Runtime.Interfaces.StringInterface; 
		else _StringInterface = StringInterface;
		if (typeof value == 'string') return value;
		if (value instanceof String) return value;
		if (this.implements(value, _StringInterface)) return value.toString();
		return new String(value);
	}
	/**
	 * Convert value to int
	 * @param var value
	 * @return string
	 */
	
	static toInt(val){
		return parseInt(val);
	}
	/**
	 * Returns unique value
	 * @return string
	 */
	
	static unique(){
		return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
	}
}
module.exports = rtl;