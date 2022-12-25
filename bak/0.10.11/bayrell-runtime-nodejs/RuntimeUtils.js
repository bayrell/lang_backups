"use strict;"
var use = require('bayrell').use;
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
	getClassName: function(ctx)
	{
		return "Runtime.RuntimeUtils";
	},
});
Object.assign(Runtime.RuntimeUtils,
{
	_variables_names: null,
	_global_context: null,
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
	getParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		res.push(ctx, class_name);
		while (class_name != "")
		{
			var __v1 = use("Runtime.rtl");
			var f = __v1.method(ctx, class_name, "getParentClassName");
			class_name = f(ctx);
			if (class_name != "")
			{
				res.push(ctx, class_name);
			}
		}
		var __memorize_value = res.toCollection(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getVariablesNames: function(ctx, class_name, flag)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getVariablesNames", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (flag == undefined) flag = 2;
		/* Get parents names */
		var class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		var __v0 = use("Runtime.Vector");
		var names = class_names.reduce(ctx, (ctx, names, item_class_name) => 
		{
			var item_fields = null;
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(ctx, item_class_name, "getFieldsList");
			try
			{
				item_fields = f(ctx, flag);
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
				names.appendVector(ctx, item_fields);
			}
			return names;
		}, new __v0(ctx));
		var __memorize_value = names.toCollection(ctx);
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getVariablesNames", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospection: function(ctx, class_name, include_parents)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getClassIntrospection", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (include_parents == undefined) include_parents = false;
		var class_info = null;
		var __v0 = use("Runtime.Map");
		var fields = new __v0(ctx);
		var __v1 = use("Runtime.Map");
		var methods = new __v1(ctx);
		var info = null;
		var __v2 = use("Runtime.rtl");
		if (!__v2.class_exists(ctx, class_name))
		{
			var __memorize_value = null;
			use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
			return __memorize_value;
		}
		/* Append annotations */
		var appendAnnotations = (ctx, arr, name, info) => 
		{
			if (info == null)
			{
				return ;
			}
			if (!arr.has(ctx, name))
			{
				var __v2 = use("Runtime.Vector");
				arr.setValue(ctx, name, new __v2(ctx));
			}
			var v = arr.item(ctx, name);
			v.appendVector(ctx, info.annotations);
		};
		/* Get Class Info */
		try
		{
			var __v2 = use("Runtime.rtl");
			info = __v2.method(ctx, class_name, "getClassInfo")(ctx);
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
		var class_names = use("Runtime.Collection").from([]);
		if (include_parents)
		{
			class_names = Runtime.RuntimeUtils.getParents(ctx, class_name);
		}
		else
		{
			class_names = use("Runtime.Collection").from([class_name]);
		}
		for (var i = 0;i < class_names.count(ctx);i++)
		{
			var item_class_name = class_names.item(ctx, i);
			/* Get fields introspection */
			var item_fields = null;
			try
			{
				var __v2 = use("Runtime.rtl");
				item_fields = __v2.method(ctx, item_class_name, "getFieldsList")(ctx, 255);
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
			for (var j = 0;j < item_fields.count(ctx);j++)
			{
				var field_name = item_fields.item(ctx, j);
				var __v2 = use("Runtime.rtl");
				info = __v2.method(ctx, item_class_name, "getFieldInfoByName")(ctx, field_name);
				appendAnnotations(ctx, fields, field_name, info);
			}
			/* Get methods introspection */
			var item_methods = null;
			try
			{
				var __v2 = use("Runtime.rtl");
				item_methods = __v2.method(ctx, item_class_name, "getMethodsList")(ctx, 255);
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
			for (var j = 0;j < item_methods.count(ctx);j++)
			{
				var method_name = item_methods.item(ctx, j);
				var __v2 = use("Runtime.rtl");
				info = __v2.method(ctx, item_class_name, "getMethodInfoByName")(ctx, method_name);
				appendAnnotations(ctx, methods, method_name, info);
			}
		}
		/* To Collection */
		methods = methods.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		fields = fields.map(ctx, (ctx, item, name) => 
		{
			return item.toCollection(ctx);
		});
		var __v2 = use("Runtime.IntrospectionClass");
		var __v3 = use("Runtime.rtl");
		var __memorize_value = new __v2(ctx, use("Runtime.Dict").from({"class_name":class_name,"class_info":(class_info != null) ? (class_info.toCollection(ctx)) : (null),"fields":fields.toDict(ctx),"methods":methods.toDict(ctx),"interfaces":__v3.getInterfaces(ctx, class_name)}));
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospection", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns Introspection of the class name
	 * @param string class_name
	 * @return Vector<IntrospectionInfo>
	 */
	getClassIntrospectionWithParents: function(ctx, class_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getClassIntrospectionWithParents", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __memorize_value = this.getClassIntrospection(ctx, class_name, true);
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getClassIntrospectionWithParents", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns methods in class by annotation name
	 */
	getMethodsIntrospection: function(ctx, class_name, annotations)
	{
		var __v0 = use("Runtime.RuntimeUtils");
		var class_info = __v0.getClassIntrospection(ctx, class_name);
		var d = class_info.methods.filter(ctx, (ctx, arr, method_name) => 
		{
			arr = arr.filter(ctx, (ctx, item) => 
			{
				for (var i = 0;i < annotations.count(ctx);i++)
				{
					var annotation_name = annotations.item(ctx, i);
					var __v1 = use("Runtime.rtl");
					if (__v1.is_instanceof(ctx, item, annotation_name))
					{
						return true;
					}
				}
				return false;
			});
			return arr.count(ctx) > 0;
		});
		return d.keys(ctx);
	},
	/**
	 * Returns IntrospectionInfo of field
	 */
	getFieldInfo: function(ctx, class_name, field_name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.RuntimeUtils.getFieldInfo", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var parents = this.getParents(ctx, class_name);
		for (var i = 0;i < parents.count(ctx);i++)
		{
			var parent_class_name = Runtime.rtl.get(ctx, parents, i);
			var __v0 = use("Runtime.rtl");
			var getFieldInfoByName = __v0.method(ctx, parent_class_name, "getFieldInfoByName");
			var res = getFieldInfoByName(ctx, field_name);
			if (res != null)
			{
				var __memorize_value = res;
				use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getFieldInfo", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = null;
		use("Runtime.rtl")._memorizeSave("Runtime.RuntimeUtils.getFieldInfo", arguments, __memorize_value);
		return __memorize_value;
	},
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
			return obj.map(ctx, (ctx, value) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			obj = obj.map(ctx, (ctx, value, key) => 
			{
				return this.ObjectToPrimitive(ctx, value, force_class_name);
			});
			return obj.toDict(ctx);
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
			var names = __v2.getFields(ctx, obj.getClassName(ctx));
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				var value = obj.get(ctx, variable_name, null);
				var value = Runtime.RuntimeUtils.ObjectToPrimitive(ctx, value, force_class_name);
				values.setValue(ctx, variable_name, value);
			}
			if (force_class_name)
			{
				values.setValue(ctx, "__class_name__", obj.getClassName(ctx));
			}
			return values.toDict(ctx);
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
			for (var i = 0;i < obj.count(ctx);i++)
			{
				var value = obj.item(ctx, i);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.pushValue(ctx, value);
			}
			return res.toCollection(ctx);
		}
		var __v0 = use("Runtime.Dict");
		if (obj instanceof __v0)
		{
			var __v1 = use("Runtime.Map");
			var res = new __v1(ctx);
			var keys = obj.keys(ctx);
			for (var i = 0;i < keys.count(ctx);i++)
			{
				var key = keys.item(ctx, i);
				var value = obj.item(ctx, key);
				value = Runtime.RuntimeUtils.PrimitiveToObject(ctx, value);
				res.setValue(ctx, key, value);
			}
			if (!res.has(ctx, "__class_name__"))
			{
				return res.toDict(ctx);
			}
			if (res.item(ctx, "__class_name__") == "Runtime.Map" || res.item(ctx, "__class_name__") == "Runtime.Dict")
			{
				res.remove(ctx, "__class_name__");
				return res.toDict(ctx);
			}
			var class_name = res.item(ctx, "__class_name__");
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
			for (var i = 0;i < names.count(ctx);i++)
			{
				var variable_name = names.item(ctx, i);
				if (variable_name != "__class_name__")
				{
					var value = res.get(ctx, variable_name, null);
					obj.setValue(ctx, variable_name, value);
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
		if (field_name == "_global_context") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.RuntimeUtils",
			"name": field_name,
			"t": "var",
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