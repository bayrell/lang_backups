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
Runtime.CoreObject = function()
{
	
	this._init();
};
Object.assign(Runtime.CoreObject.prototype,
{
	/**
	 * Init function
	 */
	_init: function()
	{
	},
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeValue: function(variable_name,default_value)
	{
		if (default_value == undefined) default_value = null;
		return this.takeVirtualValue(variable_name, default_value);
	},
	/**
	 * Returns virtual values
	 * @param string variable_name
	 * @param string default_value
	 * @return var
	 */
	takeVirtualValue: function(variable_name,default_value)
	{
		if (default_value == undefined) default_value = null;
		return default_value;
	},
	/**
	 * Set new value
	 * @param string variable_name
	 * @param var value
	 */
	assignValue: function(variable_name,value)
	{
		this.assignVirtualValue(variable_name, value);
	},
	/**
	 * Assign virtual value
	 * @param string variable_name
	 * @param var value
	 */
	assignVirtualValue: function(variable_name,value)
	{
	},
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject: function(obj)
	{
	},
	/**
	 * Set new values instance by Map
	 * @param Map<var> map
	 * @return CoreObject
	 */
	assignDict: function(values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		var _v0 = use("Runtime.rtl");
		var f = _v0.method("Runtime.RuntimeUtils", "getVariablesNames");
		var names = f(this.getClassName(), 2);
		for (var i = 0;i < names.count();i++)
		{
			var name = names.item(i);
			this.assignValue(name, values.get(name, null));
		}
		return this;
	},
	/**
	 * Set new values instance by Map
	 * @param Dict<var> map
	 * @return CoreObject
	 */
	setDict: function(values)
	{
		if (values == undefined) values = null;
		if (values == null)
		{
			return null;
		}
		var _v0 = use("Runtime.rtl");
		values.each(_v0.method(this, "assignValue"));
		return this;
	},
	/**
	 * Dump serializable object to Map
	 * @return Map<var>
	 */
	takeDict: function(fields,flag)
	{
		if (fields == undefined) fields = null;
		if (flag == undefined) flag = 2;
		var _v0 = use("Runtime.Map");
		var values = new _v0();
		if (fields == null)
		{
			var _v0 = use("Runtime.rtl");
			var f = _v0.method("Runtime.RuntimeUtils", "getVariablesNames");
			var names = f(this.getClassName(), flag);
			for (var i = 0;i < names.count();i++)
			{
				var name = names.item(i);
				values.set(name, this.takeValue(name, null));
			}
		}
		else
		{
			for (var i = 0;i < fields.count();i++)
			{
				var name = fields.item(i);
				values.set(name, this.takeValue(name, null));
			}
		}
		return values.toDict();
	},
	staticMethod: function(method_name)
	{
		var _v0 = use("Runtime.rtl");
		return _v0.method(this.getClassName(), method_name);
	},
	callStatic: function(method_name)
	{
		return null;
	},
	callStaticParent: function(method_name)
	{
		return null;
	},
	getClassName: function()
	{
		return "Runtime.CoreObject";
	},
});
Object.assign(Runtime.CoreObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreObject";
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
			"class_name": "Runtime.CoreObject",
			"name": "Runtime.CoreObject",
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
});use.add(Runtime.CoreObject);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.CoreObject = Runtime.CoreObject;