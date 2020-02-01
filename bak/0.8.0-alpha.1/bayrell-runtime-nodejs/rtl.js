"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.rtl = function()
{
};
Object.assign(Runtime.rtl.prototype,
{
	getClassName: function()
	{
		return "Runtime.rtl";
	},
});
Object.assign(Runtime.rtl,
{
	_memorize_cache: null,
	_memorize_not_found: null,
	_memorize_hkey: null,
	isBrowser: function()
	{
		return typeof window !== "undefined";
		return false;
	},
	/**
	 * Find class instance by name. If class does not exists return null.
	 * @return var - class instance
	 */
	find_class: function(class_name)
	{
		if (class_name instanceof Function)
			return class_name;
		
		return use(class_name);
	},
	/**
	 * Returns true if class instanceof class_name
	 * @return bool
	 */
	is_instanceof: function(obj,class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(obj,interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(class_name,interface_name)
	{
		var obj = this.find_class(class_name);
		var obj2 = this.find_class(interface_name);
		
		while (obj != null){
			if (obj.__implements__){
				if (obj.__implements__.indexOf( obj2 ) > -1 ){
					return true;
				}
			}
			obj = obj.__proto__;
		}
		
		return false;
	},
	/**
	 * Returns interface of class
	 * @param string class_name
	 * @return Collection<string>
	 */
	getInterfaces: function(class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(class_name,method_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return false;
		if (
			!this.exists(obj[method_name]) && 
			!this.exists(obj.prototype) && 
			!this.exists(obj.prototype[method_name])
		) return false;
		return true;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(class_name,args)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined) args = [];
		args = args.slice(); 
		args.unshift(null);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(obj,method_name)
	{
		var save = obj;
		if (!(obj instanceof Object))
		{
			var find_obj = this.find_class(obj);
			if (find_obj == null)
			{
				throw new Error("Object " + obj + " not found");
			}
			obj = find_obj;
		}
		
		if (obj[method_name] == null || obj[method_name] == "undefined")
		{
			var class_name = "";
			if (obj.getClassName != undefined) class_name = obj.getClassName();
			else if (obj.getCurrentClassName != undefined) class_name = obj.getCurrentClassName();
			else class_name = save;
			throw new Error("Method " + method_name + " not found in " + class_name);
		}
		
		return function(obj, method_name){ return function () {
			return obj[method_name].apply(obj, arguments);
		}}(obj, method_name);
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	apply: function(f,args)
	{
		if (this.isString(f))
		{
			var a = f.split("::");
			var c = a[0]; var m = a[1];
			c = this.find_class(c);
			f = c[m];
			return f.apply(c, args);
		}
		return f.apply(null, args);
	},
	/**
	 * Call await method
	 * @return fn
	 */
	applyAwait: function(f,args)
	{
		var thread = new Runtime.AsyncThread();
		thread.run( f.apply(null, args) );
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(item,path,def_val,type_value,type_template)
	{
		if (def_val == undefined) def_val = null;
		if (type_value == undefined) type_value = "var";
		if (type_template == undefined) type_template = "";
		if (type_value == undefined) type_value = "var";
		if (type_template == undefined) type_template = "";
		if (def_val == undefined) def_val = null;
		if (item == null) return def_val;
		if (path.count() == 0)
		{
			if (type_value != "var") item = this.convert(item, type_value, def_val, type_template);
			return item;
		}
		var key = path.first();
		var path = path.removeFirstIm();
		var val = def_val;
		if (item instanceof Runtime.Dict || item instanceof Runtime.Collection)
		{
			item = item.get(key, def_val);
			val = this.attr(item, path, def_val, type_value, type_template);
			return val;
		}
		else if (item instanceof Runtime.CoreStruct)
		{
			item = item.takeValue(key, def_val);
			val = this.attr(item, path, def_val, type_value, type_template);
			return val;
		}
		return val;
	},
	/**
	 * Returns value
	 * @param var value
	 * @param var def_val
	 * @param var obj
	 * @return var
	 */
	to: function(v,d,o)
	{
		var _v0 = use("Runtime.rtl");
		var t = o.e;
		if (t == "mixed" || t == "primitive" || t == "var" || t == "fn" || t == "callback")
		{
			return v;
		}
		if (t == "bool")
		{
			return this.toBool(v, d);
		}
		else if (t == "string")
		{
			return this.toString(v, d);
		}
		else if (t == "int")
		{
			return this.toInt(v, d);
		}
		else if (t == "float")
		{
			return this.toFloat(v, d);
		}
		else if (_v0.is_instanceof(v, t))
		{
			return v;
		}
		return d;
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(value,type_value,def_value,type_template)
	{
		var _v0 = use("Runtime.rtl");
		if (def_value == undefined) def_value = null;
		if (type_template == undefined) type_template = "";
		return value;
		if (type_value == "mixed" || type_value == "primitive" || type_value == "var" || type_value == "fun" || type_value == "callback")
		{
			return value;
		}
		if (type_value == "")
		{
			return def_value;
		}
		if (value !== null)
		{
			/* Is scalar value */
			if (type_value == "int" || type_value == "float" || type_value == "byte" || type_value == "double" || type_value == "bool" || type_value == "string")
			{
				try
				{
					if (type_value == "int" || type_value == "byte")
					{
						var val = _v0.toInt(value);
						return val;
					}
					else if (type_value == "float" || type_value == "double")
					{
						var val = _v0.toFloat(value);
						return val;
					}
					else if (type_value == "bool")
					{
						var val = _v0.toBool(value);
						return val;
					}
					else if (type_value == "string")
					{
						var val = _v0.toString(value);
						return val;
					}
				}
				catch (_ex)
				{
					var e = _ex;
				}
			}
			else if ((type_value == "Runtime.Vector" || type_value == "Runtime.Collection") && type_template != "")
			{
				if (this.is_instanceof(value, "Runtime.Collection"))
				{
					return value._correctItemsByType(type_template);
				}
				return null;
			}
			else if ((type_value == "Runtime.Map" || type_value == "Runtime.Dict") && type_template != "")
			{
				if (this.is_instanceof(value, "Runtime.Dict"))
				{
					return value._correctItemsByType(type_template);
				}
				return null;
			}
			else if (_v0.is_instanceof(value, type_value))
			{
				return value;
			}
		}
		return def_value;
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(value,tp)
	{
		var _v0 = use("Runtime.rtl");
		if (tp == "int")
		{
			return Runtime.rtl.isInt(value);
		}
		if (tp == "float" || tp == "double")
		{
			return Runtime.rtl.isDouble(value);
		}
		if (tp == "string")
		{
			return Runtime.rtl.isString(value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return Runtime.rtl.isBoolean(value);
		}
		if (_v0.is_instanceof(value, tp))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is exists
	 * @param var value
	 * @return bool
	 */
	exists: function(value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(value)
	{
		var _v0 = use("Runtime.rtl");
		if (value == null)
		{
			return true;
		}
		if (_v0.isString(value))
		{
			return true;
		}
		if (_v0.isNumber(value))
		{
			return true;
		}
		if (_v0.isBoolean(value))
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is boolean
	 * @param var value
	 * @return bool
	 */
	isBoolean: function(value)
	{
		if (value === false || value === true)
		{
			return true;
		}
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isInt: function(value)
	{
		if (typeof value != "number") return false;
		if (value % 1 !== 0) return false;
		return true;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isDouble: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(value)
	{
		if (typeof value == 'string') return true;
		else if (value instanceof String) return true;
		return false;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toString: function(value)
	{
		var _StringInterface = use("Runtime.Interfaces.StringInterface");
		/*if (isBrowser()) _StringInterface = Runtime.Interfaces.StringInterface; 
		else _StringInterface = StringInterface;*/
		
		if (typeof value == 'string') return value;
		if (value instanceof String) return ""+value;
		if (this.is_implements(value, _StringInterface)) return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		
		throw new Error("Error convert to int");
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		throw new Error("Error convert to boolean");
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		throw new Error("Error convert to float");
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(value)
	{
		return Math.round(value);
	},
	/* ====================== Chains ====================== */
	/**
	 * Apply async chain
	 */
	chainAwait: function(chain,args)
	{
		var _v0 = use("Runtime.rtl");
		for (var i = 0;i < chain.count();i++)
		{
			var chain_name = chain.item(i);
			args = _v0.apply(chain_name, args);
		}
		return args;
	},
	/**
	 * Apply chain
	 */
	chain: function(chain,args)
	{
		var _v0 = use("Runtime.rtl");
		for (var i = 0;i < chain.count();i++)
		{
			var chain_name = chain.item(i);
			args = _v0.apply(chain_name, args);
		}
		return args;
	},
	_memorizeValidHKey: function(hkey,key)
	{
	},
	/**
	 * Clear memorize cache
	 */
	_memorizeClear: function()
	{
		this._memorize_cache = null;
	},
	/**
	 * Returns cached value
	 */
	_memorizeValue: function(name,args)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else hkey = key;
			if (i == sz - 1)
			{
				if (arr[hkey] == undefined) return this._memorize_not_found;
				return arr[hkey];
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
		
		return this._memorize_not_found;
	},
	/**
	 * Returns cached value
	 */
	_memorizeSave: function(name,args,value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else hkey = key;
			if (i == sz - 1)
			{
				arr[hkey] = value;
			}
			else
			{
				if (arr[hkey] == undefined) arr[hkey] = {};
				arr = arr[hkey];
			}
		}
	},
	/* ================ Dirty functions ================ */
	/**
	 * Returns unique value
	 * @param bool flag If true returns as text. Default true
	 * @return string
	 */
	unique: function(flag)
	{
		if (flag == undefined) flag = true;
		if (flag == undefined) flag = true;
		if (flag)
			return "" + (new Date).getTime() + Math.floor((Math.random() * 899999 + 100000));
		return Symbol();
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	dump: function(value)
	{
		console.log(value);
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(a,b)
	{
		if (window != undefined && window.crypto != undefined && window.crypto.getRandomValues != undefined)
		{
			var s = new Uint32Array(1);
			window.crypto.getRandomValues(s);
			return Math.floor(s[0] / 4294967296 * (b - a + 1) + a);
		}
		return Math.floor(Math.random() * (b - a + 1) + a);
	},
	/**
	 * Returns current unix time in seconds
	 * @return int
	 */
	time: function()
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/* =================== Deprecated =================== */
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(message,params,locale,context)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		if (context == undefined) context = null;
		return this.callStaticMethod("Runtime.RuntimeUtils", "translate", [message, params, locale, context]);
	},
	/**
	 * Json encode data
	 * @param var data
	 * @return string
	 */
	json_encode: function(data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "json_encode", [data]);
	},
	/**
	 * Normalize UIStruct
	 * @param var data
	 * @return var
	 */
	normalizeUI: function(data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUI", [data]);
	},
	/**
	 * Normalize UIStruct
	 * @param var data
	 * @return var
	 */
	normalizeUIVector: function(data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUIVector", [data]);
	},
	/**
	 * Call method
	 * @return Object
	 */
	f: function(f)
	{
		return f;
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	correct: function(value,def_value,type_value,type_template)
	{
		if (def_value == undefined) def_value = null;
		if (type_template == undefined) type_template = "";
		return this.convert(value, type_value, def_value, type_template);
	},
	/**
	 * Convert module name to node js package
	 */
	convertNodeJSModuleName: function(name)
	{
		name = new String(name);
		var arr1 = "qazwsxedcrfvtgbyhnujmikolp";
		var arr2 = "01234567890";
		var res = "";
		var sz = name.length;
		var previsbig = false;
		for (var i = 0; i < sz; i++){
			var ch = name[i];
			var ch2 = ch.toUpperCase();
			var ch3 = ch.toLowerCase();
			var isAlpha = arr1.indexOf(ch3) != -1;
			var isNum = arr2.indexOf(ch3) != -1;
			if (i > 0 && ch == ch2 && !previsbig && isAlpha){
				res += "-";
			}
			res += ch3;
			if (ch == ch2 && isAlpha){
				previsbig = true;
			}
			else {
				previsbig = false;
			}
			if (!isAlpha && !isNum){
				previsbig = true;
			}
		}
		res += "-nodejs";
		return res;
	},
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	_clone: function(value,context)
	{
		if (context == undefined) context = null;
		if (val == null)
			return null;
		
		else if (val instanceof Number || typeof val == "number"){
			return val;
		}
		else if (val instanceof String || typeof val == "string"){
			return (new String(val)).toString();
		}
		else if (val instanceof Boolean || typeof val == "boolean"){
			return val;
		}
		else if (val instanceof Date){
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function"){
			return val.cloneNode(true);
		}
		else if (typeof val == 'object' && 
			val.createNewInstance && typeof val.createNewInstance == "function" &&
			val.assignObject && typeof val.assignObject == "function")
		{
			var res = val.createNewInstance();
			if (res) res.assignObject(val);
			return res;
		}
		else if (typeof val == 'object' && 
			val.getClassName && typeof val.getClassName == "function" &&
			val.assignObject && typeof val.assignObject == "function")
		{
			var res = null;
			/*if (isBrowser()) res = Runtime.rtl.newInstance( val.getClassName() );
			else res = rtl.newInstance( val.getClassName() );*/
			res = use("Runtime.rtl").newInstance( val.getClassName() );
			if (res) res.assignObject(val);
			return res;
		}
		else if (Array.isArray(val)){	
			var res = [];
			for (var i=0;i<val.length;i++){
				/*if (isBrowser()) res[i] = Runtime.rtl._clone(val[i]);
				else res[i] = rtl._clone(val[i]);*/
				res[i] = use("Runtime.rtl")._clone(val[i]);
			}
			return res;
		}
		
		return null;
	},
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rtl";
	},
	getParentClassName: function()
	{
		return "";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Runtime.rtl);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.rtl = Runtime.rtl;
if (typeof rtl != 'undefined') 
	rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
if (typeof Runtime != 'undefined') 
	Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
var use = require('bayrell').use; use.platform = "nodejs";
var isBrowser=function(){return typeof window !== "undefined" && this === window;}