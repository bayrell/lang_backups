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
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
Runtime.RuntimeUtils = function()
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
	getClassName: function()
	{
		return "Runtime.RuntimeUtils";
	},
});
Object.assign(Runtime.RuntimeUtils,
{
	_global_context: null,
	_variables_names: null,
	JSON_PRETTY: 1,
	/**
	 * Returns global context
	 * @return Context
	 */
	getContext: function()
	{
		return RuntimeUtils._global_context;
	},
	/**
	 * Set global context
	 * @param Context context
	 */
	setContext: function(context)
	{
		/*if (isBrowser()) Runtime.RuntimeUtils._global_context = context;
		else RuntimeUtils._global_context = context;*/
		use("Runtime.RuntimeUtils")._global_context = context;
		return context;
	},
	/* ========================== Class Introspection Functions ========================== */
	/**
	 * Returns parents class names
	 * @return Vector<string>
	 */
	getParents: function(class_name)
	{
		var _v0 = use("Runtime.Vector");
		var res = new _v0();
		res.push(class_name);
		while (class_name != "")
		{
			var _v0 = use("Runtime.rtl");
			var f = _v0.method(class_name, "getParentClassName");
			class_name = f();
			if (class_name != "")
			{
				res.push(class_name);
			}
		}
		return res.toCollection();
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getVariablesNames: function(class_name,flag)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getVariablesNames", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(class_name);
		var _v0 = use("Runtime.Vector");
		var names = class_names.reduce((names,item_class_name) => 
		{
			var item_fields = null;
			try
			{
				var _v0 = use("Runtime.rtl");
				item_fields = _v0.method(item_class_name, "getFieldsList")(flag);
			}
			catch (_ex)
			{
				if (true)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			if (item_fields != null)
			{
				names.appendVector(item_fields);
			}
			return names;
		}, new _v0());
		var __memorize_value = names.toCollection();
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getVariablesNames", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospection: function(class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getClassIntrospection", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var class_info = null;
		var _v0 = use("Runtime.Map");
		var fields = new _v0();
		var _v0 = use("Runtime.Map");
		var methods = new _v0();
		var info = null;
		/* Append annotations */
		var appendAnnotations = (arr,name,info) => 
		{
			if (!arr.has(name))
			{
				var _v0 = use("Runtime.Vector");
				arr.set(name, new _v0());
			}
			var v = arr.item(name);
			v.appendVector(info.annotations);
		};
		/* Get Class Info */
		try
		{
			var _v0 = use("Runtime.rtl");
			info = _v0.method(class_name, "getClassInfo")();
			if (info != null)
			{
				class_info = info.annotations;
			}
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
			}
			else
			{
				throw _ex;
			}
		}
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(class_name);
		for (var i = 0;i < class_names.count();i++)
		{
			var item_class_name = class_names.item(i);
			/* Get fields introspection */
			var item_fields = null;
			try
			{
				var _v0 = use("Runtime.rtl");
				item_fields = _v0.method(item_class_name, "getFieldsList")(3);
			}
			catch (_ex)
			{
				if (true)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			for (var j = 0;j < item_fields.count();j++)
			{
				var field_name = item_fields.item(j);
				var _v0 = use("Runtime.rtl");
				info = _v0.method(item_class_name, "getFieldInfoByName")(field_name);
				appendAnnotations(fields, field_name, info);
			}
			/* Get methods introspection */
			var item_methods = null;
			try
			{
				var _v0 = use("Runtime.rtl");
				item_methods = _v0.method(item_class_name, "getMethodsList")();
			}
			catch (_ex)
			{
				if (true)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			for (var j = 0;j < item_methods.count();j++)
			{
				var method_name = item_methods.item(j);
				var _v0 = use("Runtime.rtl");
				info = _v0.method(item_class_name, "getMethodInfoByName")(method_name);
				appendAnnotations(methods, method_name, info);
			}
		}
		/* To Collection */
		methods = methods.map((name,item) => 
		{
			return item.toCollection();
		});
		fields = fields.map((name,item) => 
		{
			return item.toCollection();
		});
		var _v0 = use("Runtime.Annotations.IntrospectionClass");
		var _v1 = use("Runtime.rtl");
		var __memorize_value = new _v0(use("Runtime.Dict").create({"class_name":class_name,"class_info":class_info.toCollection(),"fields":fields.toDict(),"methods":methods.toDict(),"interfaces":_v1.getInterfaces(class_name)}));
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(value,force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
		value = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
		value = Runtime.RuntimeUtils.PrimitiveToNative(value);
		return value;
	},
	NativeToObject: function(value)
	{
		value = Runtime.RuntimeUtils.NativeToPrimitive(value);
		value = Runtime.RuntimeUtils.PrimitiveToObject(value);
		return value;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(obj,force_class_name)
	{
		if (force_class_name == undefined) force_class_name = false;
		if (obj === null)
		{
			return null;
		}
		var _v0 = use("Runtime.rtl");
		if (_v0.isScalarValue(obj))
		{
			return obj;
		}
		var _v0 = use("Runtime.Collection");
		if (obj instanceof _v0)
		{
			return obj.map((value) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
			/*
			Vector<var> res = new Vector();
			for (int i=0; i<obj.count(); i++)
			{
				var value = obj.item(i);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.push(value);
			}
			return res.toCollection();
			*/
		}
		var _v0 = use("Runtime.Dict");
		if (obj instanceof _v0)
		{
			obj = obj.map((key,value) => 
			{
				return this.ObjectToPrimitive(value, force_class_name);
			});
			/*
			Map<var> res = new Map();
			Vector<string> keys = obj.keys();
			
			for (int i=0; i<keys.count(); i++)
			{
				string key = keys.item(i);
				var value = obj.item(key);
				value = self::ObjectToPrimitive( value, force_class_name );
				res.set(key, value);
			}
			
			delete keys;
			*/
			if (force_class_name)
			{
				obj = obj.setIm("__class_name__", "Runtime.Dict");
			}
			return obj.toDict();
		}
		var _v0 = use("Runtime.Interfaces.SerializeInterface");
		if (Runtime.rtl.is_implements(obj, _v0))
		{
			var _v1 = use("Runtime.Map");
			var values = new _v1();
			var names = this.getVariablesNames(obj.getClassName(), 1);
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				var value = obj.takeValue(variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(value, force_class_name);
				values.set(variable_name, value);
			}
			values.set("__class_name__", obj.getClassName());
			return values.toDict();
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(obj)
	{
		if (obj === null)
		{
			return null;
		}
		var _v0 = use("Runtime.rtl");
		if (_v0.isScalarValue(obj))
		{
			return obj;
		}
		var _v0 = use("Runtime.Collection");
		if (obj instanceof _v0)
		{
			var _v1 = use("Runtime.Vector");
			var res = new _v1();
			for (var i = 0;i < obj.count();i++)
			{
				var value = obj.item(i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.push(value);
			}
			return res.toCollection();
		}
		var _v0 = use("Runtime.Dict");
		if (obj instanceof _v0)
		{
			var _v1 = use("Runtime.Map");
			var res = new _v1();
			var keys = obj.keys();
			for (var i = 0;i < keys.count();i++)
			{
				var key = keys.item(i);
				var value = obj.item(key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.set(key, value);
			}
			if (!res.has("__class_name__"))
			{
				return res;
			}
			if (res.item("__class_name__") == "Runtime.Map" || res.item("__class_name__") == "Runtime.Dict")
			{
				res.remove("__class_name__");
				return res.toDict();
			}
			var class_name = res.item("__class_name__");
			var _v1 = use("Runtime.rtl");
			if (!_v1.class_exists(class_name))
			{
				return null;
			}
			var _v1 = use("Runtime.rtl");
			if (!_v1.class_implements(class_name, "Runtime.Interfaces.SerializeInterface"))
			{
				return null;
			}
			/* New instance */
			var _v1 = use("Runtime.rtl");
			var instance = _v1.newInstance(class_name, null);
			/* Assign values */
			var _v1 = use("Runtime.Map");
			var obj = new _v1();
			var names = this.getVariablesNames(class_name, 1);
			for (var i = 0;i < names.count();i++)
			{
				var variable_name = names.item(i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(variable_name, null);
					obj.set(variable_name, value);
					instance.assignValue(variable_name, value);
				}
			}
			var _v1 = use("Runtime.CoreStruct");
			if (instance instanceof _v1)
			{
				instance.initData(null, obj);
			}
			return instance;
		}
		return null;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(value,flags,convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		/*
		var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
		var _Collection=null;if (isBrowser()) _Collection=Runtime.Collection; else _Collection=Collection;
		var _Dict=null;if (isBrowser()) _Dict=Runtime.Dict; else _Dict=Dict;
		var _rtl=null;if (isBrowser()) _rtl=Runtime.rtl; else _rtl=rtl;
		*/
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		
		if (convert) value = _Utils.ObjectToPrimitive(value);
		return JSON.stringify(value, function (key, value){
			if (_rtl.isScalarValue(value)) return value;
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(s)
	{
		try{
			/*
			var _Utils=null;if (isBrowser()) _Utils=Runtime.RuntimeUtils; else _Utils=RuntimeUtils;
			var _Vector=null;if (isBrowser()) _Vector=Runtime.Vector; else _Vector=Vector;
			var _Map=null;if (isBrowser()) _Map=Runtime.Map; else _Map=Map;	
			*/
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			
			var obj = JSON.parse(s, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Collection.create(value);
				}
				if (typeof value == 'object'){
					return _Dict.create(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(obj);
		}
		catch(e){
			throw e;
			return null;
		}
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	base64_encode: function(s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode: function(s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/**
	 * Base64 encode
	 * @param string s
	 * @return string 
	 */
	base64_encode_url: function(s)
	{
		return Buffer.from(s).toString('base64');
	},
	/**
	 * Base64 decode
	 * @param string s
	 * @return string 
	 */
	base64_decode_url: function(s)
	{
		return Buffer.from(s, 'base64').toString('ascii');
	},
	/* ================================= Other Functions ================================= */
	/*
	 * Generate password
	 *
	 * @param int length The lenght of the password
	 * @param string options What kinds of the char can be in password
	 *   a - lower case chars
	 *   b - upper case chars
	 *   c - numbers
	 *   d - special chars !@#$%^&?*_-+=~(){}[]<>|/,.:;\\
	 *   e - quotes `"'
	 */
	randomString: function(length,options)
	{
		if (length == undefined) length = 16;
		if (options == undefined) options = "abc";
		var s = "";
		var _v0 = use("Runtime.rs");
		if (_v0.strpos(options, "a") >= 0)
		{
			s += use("Runtime.rtl").toString("abcdefghjkmnpqrstuvwxyz");
		}
		var _v0 = use("Runtime.rs");
		if (_v0.strpos(options, "b") >= 0)
		{
			s += use("Runtime.rtl").toString("ABCDEFGHJKMNPQRSTUVWXYZ");
		}
		var _v0 = use("Runtime.rs");
		if (_v0.strpos(options, "c") >= 0)
		{
			s += use("Runtime.rtl").toString("1234567890");
		}
		var _v0 = use("Runtime.rs");
		if (_v0.strpos(options, "d") >= 0)
		{
			s += use("Runtime.rtl").toString("!@#$%^&?*_-+=~(){}[]<>|/,.:;\\");
		}
		var _v0 = use("Runtime.rs");
		if (_v0.strpos(options, "e") >= 0)
		{
			s += use("Runtime.rtl").toString("`\"'");
		}
		var res = "";
		var _v0 = use("Runtime.rs");
		var c = _v0.strlen(s);
		for (var i = 0;i < length;i++)
		{
			var _v0 = use("Runtime.rtl");
			var k = _v0.random(0, c - 1);
			res += use("Runtime.rtl").toString(s[k]);
		}
		return res;
	},
	/**
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	isPrimitiveValue: function(value)
	{
		var _v0 = use("Runtime.rtl");
		if (_v0.isScalarValue(value))
		{
			return true;
		}
		var _v0 = use("Runtime.Vector");
		if (value instanceof _v0)
		{
			return true;
		}
		var _v0 = use("Runtime.Map");
		if (value instanceof _v0)
		{
			return true;
		}
		return false;
	},
	/**
	 * Convert bytes to string
	 * @param Vector<byte> arr - vector of the bytes
	 * @string charset - charset of the bytes vector. Default utf8
	 * @return string
	 */
	bytesToString: function(arr,charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toString: function(arr,charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.bytesToString(arr, charset);
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param Vector<byte> arr - output vector
	 * @param charset - Result bytes charset. Default utf8
	 */
	stringToBytes: function(s,arr,charset)
	{
		if (charset == undefined) charset = "utf8";
	},
	/**
	 * Convert string to bytes
	 * @param string s - incoming string
	 * @param charset - Result bytes charset. Default utf8
	 * @return Collection<byte> output collection
	 */
	toBytes: function(s,charset)
	{
		if (charset == undefined) charset = "utf8";
		return this.stringToBytes(s, charset);
	},
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Dict params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(message,params,locale,context)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		if (context == undefined) context = null;
		if (context == null)
		{
			context = Runtime.RuntimeUtils.getContext();
		}
		if (context != null)
		{
			context.translate(message, params, locale);
		}
		return message;
	},
	/**
	 * Retuns css hash 
	 * @param string component class name
	 * @return string hash
	 */
	getCssHash: function(s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getCssHash", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var r = "";
		var a = "1234567890abcdef";
		var _v0 = use("Runtime.rs");
		var sz = _v0.strlen(s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var _v0 = use("Runtime.rs");
			var _v1 = use("Runtime.rs");
			var c = _v0.ord(_v1.substr(s, i, 1));
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			var _v0 = use("Runtime.rs");
			r += use("Runtime.rtl").toString(_v0.substr(a, c, 1));
			p = p + 1;
		}
		var __memorize_value = r;
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getCssHash", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUIVector: function(data)
	{
		var _v0 = use("Runtime.Collection");
		var _v1 = use("Runtime.UIStruct");
		var _v2 = use("Runtime.rtl");
		if (data instanceof _v0)
		{
			var _v1 = use("Runtime.Vector");
			var res = new _v1();
			for (var i = 0;i < data.count();i++)
			{
				var item = data.item(i);
				var _v1 = use("Runtime.Collection");
				var _v2 = use("Runtime.UIStruct");
				var _v3 = use("Runtime.rtl");
				if (item instanceof _v1)
				{
					var new_item = this.normalizeUIVector(item);
					res.appendVector(new_item);
				}
				else if (item instanceof _v2)
				{
					res.push(item);
				}
				else if (_v3.isString(item))
				{
					var _v4 = use("Runtime.UIStruct");
					var _v5 = use("Runtime.UIStruct");
					var _v6 = use("Runtime.rtl");
					res.push(new _v4(use("Runtime.Dict").create({"kind":_v5.TYPE_RAW,"content":_v6.toString(item)})));
				}
			}
			return res.toCollection();
		}
		else if (data instanceof _v1)
		{
			var _v2 = use("Runtime.Collection");
			return new _v2(this.normalizeUI(data));
		}
		else if (_v2.isString(data))
		{
			var _v3 = use("Runtime.Collection");
			return new _v3(this.normalizeUI(data));
		}
		return null;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUI: function(data)
	{
		var _v0 = use("Runtime.UIStruct");
		var _v1 = use("Runtime.rtl");
		if (data instanceof _v0)
		{
			var obj = use("Runtime.Dict").create({"children":this.normalizeUIVector(data.children)});
			var _v1 = use("Runtime.Map");
			if (data.props != null && data.props instanceof _v1)
			{
				obj.set("props", data.props.toDict());
			}
			return data.copy(obj);
		}
		else if (_v1.isString(data))
		{
			var _v2 = use("Runtime.UIStruct");
			var _v3 = use("Runtime.UIStruct");
			var _v4 = use("Runtime.rtl");
			return new _v2(use("Runtime.Dict").create({"kind":_v3.TYPE_RAW,"content":_v4.toString(data)}));
		}
		return null;
	},
	/* Lambda Functions */
	isInstance: function(class_name)
	{
		return (item) => 
		{
			var _v0 = use("Runtime.rtl");
			return _v0.is_instance(item, class_name);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equal: function(value)
	{
		return (item) => 
		{
			return item == value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNot: function(value)
	{
		return (item) => 
		{
			return item != value;
		};
	},
	/**
	 * Returns attr of item
	 */
	attr: function(key,def_value)
	{
		return (item1) => 
		{
			return item1.takeValue(key, def_value);
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalItemKey: function(key)
	{
		return (item1,value) => 
		{
			return item1.takeValue(key) == value;
		};
	},
	/**
	 * Returns max id from items
	 */
	getMaxIdFromItems: function(items,start)
	{
		if (start == undefined) start = 0;
		return items.reduce((value,item) => 
		{
			return (item.id > value) ? item.id : value;
		}, start);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.RuntimeUtils";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.RuntimeUtils",
			"name": "Runtime.RuntimeUtils",
			"annotations": Collection.create([
			]),
		});
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
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Runtime.RuntimeUtils);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeUtils = Runtime.RuntimeUtils;