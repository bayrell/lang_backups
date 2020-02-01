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
/* Lambda Functions */
Runtime.lib = function()
{
};
Object.assign(Runtime.lib.prototype,
{
	getClassName: function()
	{
		return "Runtime.lib";
	},
});
Object.assign(Runtime.lib,
{
	/**
	 * Check object is istance
	 */
	isInstance: function(class_name)
	{
		return (item) => 
		{
			var _v0 = use("Runtime.rtl");
			return _v0.is_instanceof(item, class_name);
		};
	},
	/**
	 * Check object is implements interface
	 */
	isImplements: function(class_name)
	{
		return (item) => 
		{
			var _v0 = use("Runtime.rtl");
			return _v0.is_implements(item, class_name);
		};
	},
	/**
	 * Check class is implements interface
	 */
	classImplements: function(class_name)
	{
		return (item) => 
		{
			var _v0 = use("Runtime.rtl");
			return _v0.class_implements(item, class_name);
		};
	},
	/**
	 * Create struct
	 */
	createStruct: function(class_name)
	{
		return (data) => 
		{
			var _v0 = use("Runtime.rtl");
			return _v0.newInstance(class_name, use("Runtime.Collection").create([data]));
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
			return (item1 != null) ? item1.takeValue(key, def_value) : def_value;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalAttr: function(key,value)
	{
		return (item1) => 
		{
			return (item1 != null) ? item1.takeValue(key) == value : false;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalNotAttr: function(key,value)
	{
		return (item1) => 
		{
			return (item1 != null) ? item1.takeValue(key) != value : false;
		};
	},
	/**
	 * Equal two struct by key
	 */
	equalMethod: function(method_name,value)
	{
		return (item1) => 
		{
			if (item1 == null)
			{
				return false;
			}
			var _v0 = use("Runtime.rtl");
			var f = _v0.method(item1, method_name);
			return f() == value;
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
	/**
	 * Take dict
	 */
	takeDict: function(fields)
	{
		return (item) => 
		{
			return item.takeDict(fields);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.lib";
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
			"class_name": "Runtime.lib",
			"name": "Runtime.lib",
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
});use.add(Runtime.lib);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.lib = Runtime.lib;