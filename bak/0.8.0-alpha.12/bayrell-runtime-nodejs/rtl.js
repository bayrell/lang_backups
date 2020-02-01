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
Runtime.rtl = function(ctx)
{
};
Object.assign(Runtime.rtl.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.rtl"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
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
	 * Define props
	 */
	defProp: function(obj, name)
	{
		Object.defineProperty
		(
			obj,
			name,
			{
				get:() => { return obj["__" + name] },
				set:(value) => {
					var AssignStructValueError = use("Runtime.Exceptions.AssignStructValueError");
					throw new AssignStructValueError(null, name); 
				}
			}
		);
	},
	/**
	 * Define class
	 */
	defClass: function(obj)
	{
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
	is_instanceof: function(ctx, obj, class_name)
	{
		var c = this.find_class(class_name);
		if (c == null) return false;
		return c.prototype.isPrototypeOf(obj);
	},
	/**
	 * Returns true if obj implements interface_name
	 * @return bool
	 */
	is_implements: function(ctx, obj, interface_name)
	{
		if (obj == undefined) return false;
		if (obj.constructor.__implements__ == undefined) return false;
		return obj.constructor.__implements__.indexOf(interface_name) != -1;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_exists: function(ctx, class_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		return true;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	class_implements: function(ctx, class_name, interface_name)
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
	getInterfaces: function(ctx, class_name)
	{
		return this.find_class(class_name).__implements__;
	},
	/**
	 * Returns true if class exists
	 * @return bool
	 */
	method_exists: function(ctx, class_name, method_name)
	{
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return false;
		if (
			!this.exists(ctx, obj[method_name]) && 
			!this.exists(ctx, obj.prototype) && 
			!this.exists(ctx, obj.prototype[method_name])
		) return false;
		return true;
	},
	/**
	 * Create object by class_name. If class name does not exists return null
	 * @return Object
	 */
	newInstance: function(ctx, class_name, args)
	{
		if (args == undefined) args = null;
		var obj = this.find_class(class_name);
		if (!this.exists(ctx, obj)) return null;
		if (!(obj instanceof Function)) return null;
		if (args == undefined || args == null) args = [];
		args = args.slice(); 
		args.unshift(null);
		args.unshift(ctx);
		var f = Function.prototype.bind.apply(obj, args);
		return new f;
	},
	/**
	 * Returns callback
	 * @return fn
	 */
	method: function(ctx, obj, method_name)
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
	apply: function(ctx, f, args)
	{
		if (args == null) args = [];
		args.unshift(ctx);
		if (this.isString(ctx, f))
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
	applyAwait: function(ctx, f, args)
	{
		args.unshift(ctx);
		var t = new Runtime.AsyncThread(ctx, {
			"tasks": Runtime.Collection.from([
				new Runtime.AsyncTask(ctx, {
					"pos": "0",
					"f": f.apply(null, args),
				})
			])
		});
		Runtime.AsyncThread.run(ctx, t);
	},
	/**
	 * Returns callback
	 * @return var
	 */
	attr: function(ctx, item, path, def_val)
	{
		if (def_val == undefined) def_val = null;
		if (def_val == undefined) def_val = null;
		if (item == null) return def_val;
		if (path.count() == 0)
		{
			return item;
		}
		var key = path.first(ctx);
		var path = path.removeFirstIm(ctx);
		var val = def_val;
		if (item instanceof Runtime.Dict || item instanceof Runtime.Collection)
		{
			item = item.get(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
			return val;
		}
		else if (item instanceof Runtime.CoreStruct)
		{
			item = item.takeValue(ctx, key, def_val);
			val = this.attr(ctx, item, path, def_val);
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
	to: function(v, o)
	{
		var e = o["e"];
		if (e == "mixed" || e == "primitive" || e == "var" || e == "fn" || e == "callback")
		{
			return v;
		}
		var __v0 = use("Runtime.rtl");
		if (e == "bool")
		{
			return this.toBool(null, v);
		}
		else if (e == "string")
		{
			return this.toString(null, v);
		}
		else if (e == "int")
		{
			return this.toInt(null, v);
		}
		else if (e == "float")
		{
			return this.toFloat(null, v);
		}
		else if (__v0.is_instanceof(null, v, e))
		{
			return v;
		}
		return v;
	},
	/**
	 * Returns value if value instanceof type_value, else returns def_value
	 * @param var value
	 * @param string type_value
	 * @param var def_value
	 * @param var type_template
	 * @return var
	 */
	convert: function(value, type_value, def_value, type_template)
	{
		if (def_value == undefined) def_value = null;
		if (type_template == undefined) type_template = "";
		return value;
	},
	/**
	 * Returns true if value instanceof tp
	 * @param var value
	 * @param string tp
	 * @return bool
	 */
	checkValue: function(ctx, value, tp)
	{
		if (tp == "int")
		{
			return Runtime.rtl.isInt(ctx, value);
		}
		if (tp == "float" || tp == "double")
		{
			return Runtime.rtl.isDouble(ctx, value);
		}
		if (tp == "string")
		{
			return Runtime.rtl.isString(ctx, value);
		}
		if (tp == "bool" || tp == "boolean")
		{
			return Runtime.rtl.isBoolean(ctx, value);
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.is_instanceof(ctx, value, tp))
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
	exists: function(ctx, value)
	{
		return (value != null) && (value != undefined);
	},
	/**
	 * Returns true if value is scalar value
	 * @return bool 
	 */
	isScalarValue: function(ctx, value)
	{
		if (value == null)
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isString(ctx, value))
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isNumber(ctx, value))
		{
			return true;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isBoolean(ctx, value))
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
	isBoolean: function(ctx, value)
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
	isInt: function(ctx, value)
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
	isDouble: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is number
	 * @param var value
	 * @return bool
	 */
	isNumber: function(ctx, value)
	{
		if (typeof value == "number") return true;
		return false;
	},
	/**
	 * Return true if value is string
	 * @param var value
	 * @return bool
	 */
	isString: function(ctx, value)
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
	toString: function(ctx, value)
	{
		var _StringInterface = use("Runtime.Interfaces.StringInterface");
		/*if (isBrowser()) _StringInterface = Runtime.Interfaces.StringInterface; 
		else _StringInterface = StringInterface;*/
		
		if (value == null) return "";
		if (typeof value == 'string') return value;
		if (value instanceof String) return ""+value;
		if (this.is_implements(null, value, _StringInterface)) return value.toString();
		return ""+value;
	},
	/**
	 * Convert value to string
	 * @param var value
	 * @return string
	 */
	toStr: function(value)
	{
		return this.toString(null, value);
	},
	/**
	 * Convert value to int
	 * @param var value
	 * @return int
	 */
	toInt: function(ctx, val)
	{
		var res = parseInt(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Convert value to boolean
	 * @param var value
	 * @return bool
	 */
	toBool: function(ctx, val)
	{
		var res = false;
		if (val == false || val == 'false') return false;
		if (val == true || val == 'true') return true;
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return false;
	},
	/**
	 * Convert value to float
	 * @param var value
	 * @return float
	 */
	toFloat: function(ctx, val)
	{
		var res = parseFloat(val);
		var s_res = new String(res);
		var s_val = new String(val);
		if (s_res.localeCompare(s_val) == 0)
			return res;
		return 0;
	},
	/**
	 * Round up
	 * @param double value
	 * @return int
	 */
	ceil: function(ctx, value)
	{
		return Math.ceil(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	floor: function(ctx, value)
	{
		return Math.floor(value);
	},
	/**
	 * Round down
	 * @param double value
	 * @return int
	 */
	round: function(ctx, value)
	{
		return Math.round(value);
	},
	/* ====================== Chains ====================== */
	/**
	 * Apply async chain
	 */
	chainAwait: function(ctx, chain, args)
	{
		var i,chain_name;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				return __async_t.jump(ctx, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos(ctx) == "1.0")
			{
				i = 0;
				return __async_t.jump(ctx, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos(ctx) == "1.1")
			{
				var __async_var = i < chain.count(ctx);
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.2");
				}
				return __async_t.jump(ctx, "2");
			}
			/* Loop */
			else if (__async_t.pos(ctx) == "1.2")
			{
				i++;
				chain_name = chain.item(ctx, i);
				var __v0 = use("Runtime.rtl");
				return __async_t.jump(ctx, "1.3").call(ctx, __v0.apply(ctx, chain_name, args),"__v1");
			}
			else if (__async_t.pos(ctx) == "1.3")
			{
				args = __async_t.getVar(ctx, "__v1");
				return __async_t.jump(ctx, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos(ctx) == "2")
			{
				return __async_t.ret(ctx, args);
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Apply chain
	 */
	chain: function(ctx, chain, args)
	{
		for (var i = 0;i < chain.count(ctx);i++)
		{
			var chain_name = chain.item(ctx, i);
			var __v0 = use("Runtime.rtl");
			args = __v0.apply(ctx, chain_name, args);
		}
		return args;
	},
	_memorizeValidHKey: function(hkey, key)
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
	_memorizeValue: function(name, args)
	{
		if (this._memorize_cache == null) return this._memorize_not_found;
		if (this._memorize_cache[name] == undefined) return this._memorize_not_found;
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else return this._memorize_not_found;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
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
	_memorizeSave: function(name, args, value)
	{
		if (this._memorize_cache == null) this._memorize_cache = {};
		if (this._memorize_cache[name] == undefined) this._memorize_cache[name] = {};
		var arr = this._memorize_cache[name];
		var sz = args.length;
		for (var i=0; i<sz; i++)
		{
			var key = args[i];
			var hkey = null;
			if (key != null && typeof key == 'object')
			{
				if (key.__uq__ != undefined) hkey = key.__uq__;
				else hkey = null;
			}
			else if (typeof key == 'string') hkey = "__s_" + key;
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
	unique: function(ctx, flag)
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
	dump: function(ctx, value)
	{
		console.log(value);
	},
	/**
	 * Returns random value x, where a <= x <= b
	 * @param int a
	 * @param int b
	 * @return int
	 */
	random: function(ctx, a, b)
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
	time: function(ctx)
	{
		return Math.round((new Date()).getTime() / 1000);
	},
	/**
	 * Clone var
	 * @param {var} value - Variable
	 * @return {var} result
	 */
	clone: function(ctx, val)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var CoreObject = use("Runtime.CoreObject");
		var CoreStruct = use("Runtime.CoreStruct");
		var FakeStruct = use("Runtime.FakeStruct");
		var Reference = use("Runtime.Reference");
		
		if (val == null)
			return null;
		
		else if (val instanceof Number || typeof val == "number")
		{
			return val;
		}
		else if (val instanceof String || typeof val == "string")
		{
			return (new String(val)).toString();
		}
		else if (val instanceof Boolean || typeof val == "boolean")
		{
			return val;
		}
		else if (typeof val == "symbol")
		{
			return Symbol();
		}
		else if (val instanceof Date)
		{
			return new Date(val);
		}
		else if (typeof val == 'object' && val.nodeType && typeof val.cloneNode == "function")
		{
			return val.cloneNode(true);
		}
		else if (val instanceof Collection)
		{
			var res = val.constructor.Instance();
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof Dict)
		{
			var res = val.constructor.Instance();
			for (var key in val._map)
			{
				res._map[key] = this.clone(ctx, val._map[key]);
			}
			return res;
		}
		else if (Array.isArray(val))
		{	
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			for (var i=0;i<val.length;i++)
			{
				res.push(ctx, this.clone(ctx, val[i]));
			}
			return res;
		}
		else if (val instanceof CoreStruct)
		{
			return val;
		}
		else if (val instanceof FakeStruct)
		{
			return val.clone(ctx);
		}
		else if (val instanceof Reference)
		{
			return new Reference(ctx, val.ref);
		}
		else if (val instanceof CoreObject || typeof val == 'object')
		{
			var proto = Object.getPrototypeOf(val);
			var res = Object.create(proto);
			var a = Object.getOwnPropertyNames(val);
			for (var i=0;i<a.length;i++)
			{
				var key = a[i];
				res[key] = this.clone(ctx, val[key]);
			}
			return res;
		}
		
		return null;
	},
	/* =================== Deprecated =================== */
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(ctx, message, params, locale, context)
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
	json_encode: function(ctx, data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "json_encode", [data]);
	},
	/**
	 * Normalize UIStruct
	 * @param var data
	 * @return var
	 */
	normalizeUI: function(ctx, data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUI", [data]);
	},
	/**
	 * Normalize UIStruct
	 * @param var data
	 * @return var
	 */
	normalizeUIVector: function(ctx, data)
	{
		return this.callStaticMethod("Runtime.RuntimeUtils", "normalizeUIVector", [data]);
	},
	/**
	 * Call method
	 * @return Object
	 */
	f: function(ctx, f)
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
	correct: function(ctx, value, def_value, type_value, type_template)
	{
		if (def_value == undefined) def_value = null;
		if (type_template == undefined) type_template = "";
		return this.convert(ctx, value, type_value, def_value, type_template);
	},
	/**
	 * Convert module name to node js package
	 */
	convertNodeJSModuleName: function(ctx, name)
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
	/* ======================= Class Init Functions ======================= */
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.rtl",
			"name": "Runtime.rtl",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "_memorize_cache") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_not_found") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "_memorize_hkey") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.rtl",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.rtl);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.rtl = Runtime.rtl;
if (typeof rtl != 'undefined') rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};
if (typeof Runtime != 'undefined') Runtime.rtl._memorize_not_found = {'s':'memorize_key_not_found','id':Symbol()};