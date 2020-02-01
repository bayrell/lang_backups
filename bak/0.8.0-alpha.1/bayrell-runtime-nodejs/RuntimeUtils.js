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
		var _v1 = use("Runtime.rtl");
		var res = new _v0();
		while (class_name != "")
		{
			var f = _v1.method(class_name, "getParentClassName");
			class_name = f();
			if (class_name != "")
			{
				res.push(class_name);
			}
		}
		return res;
	},
	/**
	 * Returns names of variables to serialization
	 * @param Vector<string>
	 */
	getVariablesNames: function(class_name,flag)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Runtime.RuntimeUtils");
		var _v2 = use("Runtime.Map");
		if (flag == undefined) flag = 0;
		var names = new _v0();
		var variables_names = _v1._variables_names;
		if (variables_names == null)
		{
			_v1._variables_names = new _v2();
		}
		if (_v1._variables_names.has(class_name))
		{
			var m = _v1._variables_names;
			var v = m.item(class_name);
			if (v.has(flag))
			{
				names.appendVector(v.item(flag));
				return names.toCollection();
			}
		}
		var classes = Runtime.RuntimeUtils.getParents(class_name);
		classes.prepend(class_name);
		classes.each((class_name) => 
		{
			var _v0 = use("Runtime.rtl");
			try
			{
				_v0.method(class_name, "getFieldsList")(names, flag);
			}
			catch (_ex)
			{
				var e = _ex;
			}
			try
			{
				_v0.method(class_name, "getVirtualFieldsList")(names, flag);
			}
			catch (_ex)
			{
				var e = _ex;
			}
		});
		names = names.removeDublicatesIm();
		var variables_names = _v1._variables_names;
		if (!_v1._variables_names.has(class_name))
		{
			_v1._variables_names.set(class_name, use("Runtime.Dict").create({}));
		}
		var v = _v1._variables_names.item(class_name);
		v.set(flag, names.copy());
		_v1._variables_names.set(class_name, v);
		return names.toCollection();
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getIntrospection: function(class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getIntrospection", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.Vector");
		var res = new _v0();
		var class_names = Runtime.RuntimeUtils.getParents(class_name);
		class_names.prepend(class_name);
		class_names.each((item_class_name) => 
		{
			var _v0 = use("Runtime.Vector");
			var _v1 = use("Runtime.rtl");
			var names = new _v0();
			/* Get fields introspection */
			try
			{
				_v1.method(item_class_name, "getFieldsList")(names);
			}
			catch (_ex)
			{
				var e = _ex;
			}
			names.each((field_name) => 
			{
				var _v0 = use("Runtime.rtl");
				var info = null;
				try
				{
					info = _v0.method(item_class_name, "getFieldInfoByName")(field_name);
				}
				catch (_ex)
				{
					var e = _ex;
					info = null;
				}
				if (info != null)
				{
					info = info.copy({ "class_name": item_class_name });
					res.push(info);
				}
			});
			/* Get virtual fields introspection */
			names.clear();
			try
			{
				_v1.method(item_class_name, "getVirtualFieldsList")(names);
			}
			catch (_ex)
			{
				var e = _ex;
			}
			names.each((field_name) => 
			{
				var _v0 = use("Runtime.rtl");
				var info = null;
				try
				{
					info = _v0.method(item_class_name, "getVirtualFieldInfo")(field_name);
				}
				catch (_ex)
				{
					var e = _ex;
					info = null;
				}
				if (info != null)
				{
					info = info.copy({ "class_name": item_class_name });
					res.push(info);
				}
			});
			/* Get methods introspection */
			names.clear();
			try
			{
				_v1.method(item_class_name, "getMethodsList")(names);
			}
			catch (_ex)
			{
				var e = _ex;
			}
			names.each((method_name) => 
			{
				var _v0 = use("Runtime.rtl");
				var info = null;
				try
				{
					info = _v0.method(item_class_name, "getMethodInfoByName")(method_name);
				}
				catch (_ex)
				{
					var e = _ex;
					info = null;
				}
				if (info != null)
				{
					info = info.copy({ "class_name": item_class_name });
					res.push(info);
				}
			});
			/* Get class introspection */
			var info = null;
			try
			{
				info = _v1.method(item_class_name, "getClassInfo")();
			}
			catch (_ex)
			{
				var e = _ex;
				info = null;
			}
			if (info != null)
			{
				info = info.copy({ "class_name": item_class_name });
				res.push(info);
			}
		});
		var __memorize_value =  res.toCollection();
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getIntrospection", arguments, __memorize_value);
		return __memorize_value;;
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
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Runtime.Map");
		var _v2 = use("Runtime.Annotations.IntrospectionInfo");
		var _v3 = use("Runtime.Annotations.IntrospectionClass");
		var _v4 = use("Runtime.rtl");
		var arr = this.getIntrospection(class_name);
		var info = new _v0();
		var fields = new _v1();
		var methods = new _v1();
		for (var i = 0;i < arr.count();i++)
		{
			var item = arr.item(i);
			if (item.kind == _v2.ITEM_CLASS)
			{
				info = item.annotations.toCollection();
			}
			if (item.kind == _v2.ITEM_FIELD)
			{
				fields.set(item.name, item.annotations.toCollection());
			}
			if (item.kind == _v2.ITEM_METHOD)
			{
				methods.set(item.name, item.annotations.toCollection());
			}
		}
		var __memorize_value =  new _v3(use("Runtime.Dict").create({"class_name":class_name,"info":info.toCollection(),"fields":fields.toDict(),"methods":methods.toDict(),"interfaces":_v4.getInterfaces(class_name)}));
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Returns item
	 */
	getItem: function(obj,path,default_value,type_value,type_template)
	{
		var _v0 = use("Runtime.rtl");
		var _v1 = use("Runtime.Dict");
		var _v2 = use("Runtime.Collection");
		if (type_value == undefined) type_value = "var";
		if (type_template == undefined) type_template = "";
		if (path.count() == 0)
		{
			return _v0.convert(obj, type_value, default_value, type_template);
		}
		if (obj == null)
		{
			return default_value;
		}
		if (obj instanceof _v1 || obj instanceof _v2)
		{
			var item = path.first();
			path = path.removeFirstIm();
			obj = obj.get(item, default_value);
			return this.getItem(obj, path, default_value, type_value, type_template);
		}
		return default_value;
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
		var _v0 = use("Runtime.rtl");
		var _v1 = use("Runtime.Collection");
		var _v2 = use("Runtime.Dict");
		var _v3 = use("Runtime.Interfaces.SerializeInterface");
		var _v4 = use("Runtime.Map");
		if (force_class_name == undefined) force_class_name = false;
		if (obj === null)
		{
			return null;
		}
		if (_v0.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof _v1)
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
		if (obj instanceof _v2)
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
				obj = obj.setIm("__class_name__", );
			}
			return obj.toDict();
		}
		if (Runtime.rtl.is_implements(obj, _v3))
		{
			var values = new _v4();
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
		var _v0 = use("Runtime.rtl");
		var _v1 = use("Runtime.Collection");
		var _v2 = use("Runtime.Vector");
		var _v3 = use("Runtime.Dict");
		var _v4 = use("Runtime.Map");
		var _v5 = use("Runtime.CoreStruct");
		if (obj === null)
		{
			return null;
		}
		if (_v0.isScalarValue(obj))
		{
			return obj;
		}
		if (obj instanceof _v1)
		{
			var res = new _v2();
			for (var i = 0;i < obj.count();i++)
			{
				var value = obj.item(i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(value);
				res.push(value);
			}
			return res.toCollection();
		}
		if (obj instanceof _v3)
		{
			var res = new _v4();
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
			if (!_v0.class_exists(class_name))
			{
				return null;
			}
			if (!_v0.class_implements(class_name, "Runtime.Interfaces.SerializeInterface"))
			{
				return null;
			}
			/* New instance */
			var instance = _v0.newInstance(class_name, null);
			/* Assign values */
			var obj = new _v4();
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
			if (instance instanceof _v5)
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
					return _Vector.createNewInstance(value);
				}
				if (typeof value == 'object'){
					return new _Map(value);
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
		var _v0 = use("Runtime.rs");
		var _v1 = use("Runtime.rtl");
		if (length == undefined) length = 16;
		if (options == undefined) options = "abc";
		var s = "";
		if (_v0.strpos(options, "a") >= 0)
		{
			s += use("Runtime.rtl").toString("abcdefghjkmnpqrstuvwxyz");
		}
		if (_v0.strpos(options, "b") >= 0)
		{
			s += use("Runtime.rtl").toString("ABCDEFGHJKMNPQRSTUVWXYZ");
		}
		if (_v0.strpos(options, "c") >= 0)
		{
			s += use("Runtime.rtl").toString("1234567890");
		}
		if (_v0.strpos(options, "d") >= 0)
		{
			s += use("Runtime.rtl").toString("!@#$%^&?*_-+=~(){}[]<>|/,.:;\\");
		}
		if (_v0.strpos(options, "e") >= 0)
		{
			s += use("Runtime.rtl").toString("`\"'");
		}
		var res = "";
		var c = _v0.strlen(s);
		for (var i = 0;i < length;i++)
		{
			var k = _v1.random(0, c - 1);
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
		var _v1 = use("Runtime.Vector");
		var _v2 = use("Runtime.Map");
		if (_v0.isScalarValue(value))
		{
			return true;
		}
		if (value instanceof _v1)
		{
			return true;
		}
		if (value instanceof _v2)
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
		var _v0 = use("Runtime.rs");
		var r = "";
		var a = "1234567890abcdef";
		var sz = _v0.strlen(s);
		var h = 0;
		for (var i = 0;i < sz;i++)
		{
			var c = _v0.ord(s[i]);
			h = (h << 2) + (h >> 14) + c & 65535;
		}
		var p = 0;
		while (h != 0 || p < 4)
		{
			var c = h & 15;
			h = h >> 4;
			r += use("Runtime.rtl").toString(a[c]);
		}
		var __memorize_value =  r;
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getCssHash", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUIVector: function(data)
	{
		var _v0 = use("Runtime.Collection");
		var _v1 = use("Runtime.Vector");
		var _v2 = use("Runtime.UIStruct");
		var _v3 = use("Runtime.rtl");
		if (data instanceof _v0)
		{
			var res = new _v1();
			for (var i = 0;i < data.count();i++)
			{
				var item = data.item(i);
				if (item instanceof _v0)
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
					res.push(new _v2(use("Runtime.Dict").create({"kind":_v2.TYPE_RAW,"content":_v3.toString(item)})));
				}
			}
			return res.toCollection();
		}
		else if (data instanceof _v2)
		{
			return new _v0(this.normalizeUI(data));
		}
		else if (_v3.isString(data))
		{
			return new _v0(this.normalizeUI(data));
		}
		return null;
	},
	/**
	 * Normalize UIStruct
	 */
	normalizeUI: function(data)
	{
		var _v0 = use("Runtime.UIStruct");
		var _v1 = use("Runtime.Map");
		var _v2 = use("Runtime.rtl");
		if (data instanceof _v0)
		{
			var obj = use("Runtime.Dict").create({"children":this.normalizeUIVector(data.children)});
			if (data.props != null && data.props instanceof _v1)
			{
				obj.set("props", data.props.toDict());
			}
			return data.copy(obj);
		}
		else if (_v2.isString(data))
		{
			return new _v0(use("Runtime.Dict").create({"kind":_v0.TYPE_RAW,"content":_v2.toString(data)}));
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
use.add(Runtime.RuntimeUtils);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeUtils = Runtime.RuntimeUtils;