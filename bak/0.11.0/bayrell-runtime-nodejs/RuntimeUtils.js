"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.RuntimeUtils = function(ctx)
{
};
Object.assign(Runtime.RuntimeUtils.prototype,
{
});
Object.assign(Runtime.RuntimeUtils,
{
	_variables_names: null,
	JSON_PRETTY: 1,
	/* ============================= Serialization Functions ============================= */
	ObjectToNative: function(ctx, value, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		var value1 = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
		var value2 = Runtime.RuntimeUtils.PrimitiveToNative(ctx, value1);
		return value2;
	},
	NativeToObject: function(ctx, value)
	{
		var value1 = Runtime.RuntimeUtils.NativeToPrimitive(ctx, value);
		var value2 = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value1);
		return value2;
	},
	/**
	 * Returns object to primitive value
	 * @param var obj
	 * @return var
	 */
	ObjectToPrimitive: function(ctx, obj, force_class_name)
	{
		if (force_class_name == undefined) force_class_name = true;
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			return obj.constructor.map(ctx, obj, (ctx, value) => 
			{
				var __v1 = this.ObjectToPrimitive(ctx, value, force_class_name);
				return __v1;
			});
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			obj = obj.constructor.map(ctx, obj, (ctx, value, key) => 
			{
				var __v1 = this.ObjectToPrimitive(ctx, value, force_class_name);
				return __v1;
			});
			return obj.constructor.toDict(ctx, obj);
		}
		var __v0 = use("Runtime.Date");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.DateTime");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.BaseStruct");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var values = new __v1(ctx);
			var __v2 = use("Runtime.rtl");
			var __v3 = obj.constructor.getClassName(ctx, obj);
			var names = __v2.getFields(ctx, __v3);
			for (var i = 0;i < names.constructor.count(ctx, names);i++)
			{
				var variable_name = names.constructor.item(ctx, names, i);
				var value = obj.constructor.get(ctx, obj, variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
				values.constructor.setValue(ctx, values, variable_name, value);
			}
			if (force_class_name)
			{
				var __v4 = obj.constructor.getClassName(ctx, obj);
				values.constructor.setValue(ctx, values, "__class_name__", __v4);
			}
			return values.constructor.toDict(ctx, values);
		}
		return null;
	},
	/**
	 * Returns object to primitive value
	 * @param SerializeContainer container
	 * @return var
	 */
	PrimitiveToObject: function(ctx, obj)
	{
		if (obj === null)
		{
			return null;
		}
		var __v0 = use("Runtime.rtl");
		if (__v0.isScalarValue(ctx, obj))
		{
			return obj;
		}
		var __v0 = use("Runtime.Collection");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Vector");
			var res = new __v1(ctx);
			for (var i = 0;i < obj.constructor.count(ctx, obj);i++)
			{
				var value = obj.constructor.item(ctx, obj, i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.constructor.pushValue(ctx, res, value);
			}
			return res.constructor.toCollection(ctx, res);
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var res = new __v1(ctx);
			var keys = obj.constructor.keys(ctx, obj);
			for (var i = 0;i < keys.constructor.count(ctx, keys);i++)
			{
				var key = keys.constructor.item(ctx, keys, i);
				var value = obj.constructor.item(ctx, obj, key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.constructor.setValue(ctx, res, key, value);
			}
			if (!res.constructor.has(ctx, res, "__class_name__"))
			{
				return res.constructor.toDict(ctx, res);
			}
			if (res.constructor.item(ctx, res, "__class_name__") == "Runtime.Map" || res.constructor.item(ctx, res, "__class_name__") == "Runtime.Dict")
			{
				res.constructor.remove(ctx, res, "__class_name__");
				return res.constructor.toDict(ctx, res);
			}
			var class_name = res.constructor.item(ctx, res, "__class_name__");
			var __v2 = use("Runtime.rtl");
			if (!__v2.class_exists(ctx, class_name))
			{
				return null;
			}
			var __v2 = use("Runtime.rtl");
			if (!__v2.class_implements(ctx, class_name, "Runtime.SerializeInterface"))
			{
				return null;
			}
			/* Assign values */
			var __v2 = use("Runtime.Map");
			var obj = new __v2(ctx);
			var __v3 = use("Runtime.rtl");
			var names = __v3.getFields(ctx, class_name);
			for (var i = 0;i < names.constructor.count(ctx, names);i++)
			{
				var variable_name = names.constructor.item(ctx, names, i);
				if (variable_name != "__class_name__")
				{
					var value = res.constructor.get(ctx, res, variable_name, null);
					obj.constructor.setValue(ctx, obj, variable_name, value);
				}
			}
			/* New instance */
			var __v4 = use("Runtime.rtl");
			var instance = __v4.newInstance(ctx, class_name, use("Runtime.Collection").from([obj]));
			return instance;
		}
		var __v0 = use("Runtime.Date");
		if (obj instanceof __v0)
		{
			return obj;
		}
		var __v0 = use("Runtime.DateTime");
		if (obj instanceof __v0)
		{
			return obj;
		}
		return null;
	},
	NativeToPrimitive: function(ctx, value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (Array.isArray(value))
		{
			var new_value = _Collection.from(value);
			new_value = new_value.map(ctx, (ctx, val)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		if (typeof value == 'object')
		{
			if (value["__class_name__"] == "Runtime.Date")
			{
				var new_value = _Date.from(value);
				return new_value;
			}
			if (value["__class_name__"] == "Runtime.DateTime")
			{
				var new_value = _DateTime.from(value);
				return new_value;
			}
			var new_value = _Dict.from(value);
			new_value = new_value.map(ctx, (ctx, val, key)=>{
				return _Utils.NativeToPrimitive(ctx, val);
			});
			return new_value;
		}
		
		return value;
	},
	PrimitiveToNative: function(ctx, value)
	{
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _DateTime = use("Runtime.DateTime");
		var _Date = use("Runtime.Date");
		var _Dict = use("Runtime.Dict");
		
		if (value === null)
			return null;
		
		if (value instanceof _Date)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.Date");
		}
		else if (value instanceof _DateTime)
		{
			value = value.toDict(ctx).setIm(ctx, "__class_name__", "Runtime.DateTime");
		}
		
		if (value instanceof _Collection)
		{
			var arr = [];
			value.each(ctx, (ctx, v)=>{
				arr.push( _Utils.PrimitiveToNative(ctx, v) );
			});
			return arr;
		}
		if (value instanceof _Dict)
		{
			var obj = {};
			value.each(ctx, (ctx, v, k)=>{
				obj[k] = _Utils.PrimitiveToNative(ctx, v);
			});
			return obj;
		}
		return value;
	},
	/**
	 * Json encode serializable values
	 * @param serializable value
	 * @param SerializeContainer container
	 * @return string 
	 */
	json_encode: function(ctx, value, flags, convert)
	{
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		if (flags == undefined) flags = 0;
		if (convert == undefined) convert = true;
		
		var _rtl = use("Runtime.rtl");
		var _Utils = use("Runtime.RuntimeUtils");
		var _Collection = use("Runtime.Collection");
		var _Dict = use("Runtime.Dict");
		var _Date = use("Runtime.Date");
		var _DateTime = use("Runtime.DateTime");
		
		if (convert) value = _Utils.ObjectToPrimitive(ctx, value);
		return JSON.stringify(value, (key, value) => {
			if (value instanceof _Date) value = value.toDict().setIm("__class_name__", "Runtime.Date");
			if (value instanceof _DateTime) value = value.toDict().setIm("__class_name__", "Runtime.DateTime");
			if (value instanceof _Collection) return value;
			if (value instanceof _Dict) return value.toObject();
			if (_rtl.isScalarValue(value)) return value;
			return null;
		});
	},
	/**
	 * Json decode to primitive values
	 * @param string s Encoded string
	 * @return var 
	 */
	json_decode: function(ctx, obj)
	{
		try{
			
			var _rtl = use("Runtime.rtl");
			var _Utils = use("Runtime.RuntimeUtils");
			var _Collection = use("Runtime.Collection");
			var _Dict = use("Runtime.Dict");
			
			var obj = JSON.parse(obj, function (key, value){
				if (value == null) return value;
				if (Array.isArray(value)){
					return _Collection.from(value);
				}
				if (typeof value == 'object'){
					return _Dict.from(value);
				}
				return value;
			});
			return _Utils.PrimitiveToObject(ctx, obj);
		}
		catch(e){
			throw e;
		}
		return null;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.RuntimeUtils";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.RuntimeUtils",
			"name": "Runtime.RuntimeUtils",
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
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "_variables_names") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"t": "Runtime.Map",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "JSON_PRETTY") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.RuntimeUtils);
module.exports = Runtime.RuntimeUtils;