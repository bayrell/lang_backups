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
Runtime.CoreStruct = function(obj)
{
	var _v0 = use("Runtime.rtl");
	use("Runtime.CoreObject").call(this);
	if (obj != null)
	{
		obj.each(_v0.method(this, "assignValue"));
		this.initData(null, obj);
	}
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
};
Runtime.CoreStruct.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.CoreStruct.prototype.constructor = Runtime.CoreStruct;
Object.assign(Runtime.CoreStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(old,changed)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	copy: function(obj)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Runtime.rtl");
		if (obj == undefined) obj = null;
		if (obj == null)
		{
			return this;
		}
		if (!(obj instanceof _v0))
		{
			var _Dict = use("Runtime.Dict");
			if (typeof obj == "object") obj = _Dict.create(obj);
		}
		var res = _v1.newInstance(this.getClassName(), use("Runtime.Collection").create([]));
		res.assignObject(this);
		obj.each(_v1.method(res, "assignValue"));
		res.initData(this, obj);
		/* Return object */
		return res;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return CoreStruct
	 */
	clone: function(fields)
	{
		var _v0 = use("Runtime.Map");
		var _v1 = use("Runtime.rtl");
		var obj = new _v0();
		fields.each((field_name) => 
		{
			obj.set(field_name, this.takeValue(field_name));
		});
		/* Return object */
		var res = _v1.newInstance(this.getClassName(), use("Runtime.Collection").create([obj.toDict()]));
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return CoreStruct
	 */
	map: function(field_name,f)
	{
		var _v0 = use("Runtime.Map");
		return this.copy((new _v0()).set(field_name, f(this.takeValue(field_name))).toDict());
	},
	getClassName: function()
	{
		return "Runtime.CoreStruct";
	},
});
Object.assign(Runtime.CoreStruct, use("Runtime.CoreObject"));
Object.assign(Runtime.CoreStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items)
	{
		var _v0 = use("Runtime.rtl");
		return _v0.newInstance(this.getCurrentClassName(), use("Runtime.Collection").create([items]));
	},
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
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
	__implements__:
	[
		use("Runtime.Interfaces.SerializeInterface"),
	],
});
use.add(Runtime.CoreStruct);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.CoreStruct = Runtime.CoreStruct;