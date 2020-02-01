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
Runtime.CoreDriver = function(context)
{
	use("Runtime.CoreObject").call(this);
	this._context = context;
};
Runtime.CoreDriver.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.CoreDriver.prototype.constructor = Runtime.CoreDriver;
Object.assign(Runtime.CoreDriver.prototype,
{
	/**
	 * Returns context
	 *
	 * @return Context 
	 */
	context: function()
	{
		return this._context;
	},
	/**
	 * Start driver
	 */
	startDriver: function()
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
			}
			return __async_t.ret_void();
		};
	},
	_init: function(/*__ctx*/)
	{
		this._context = null;
		use("Runtime.CoreObject").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.CoreDriver"))
		{
			this._context = o._context;
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "_context")this._context = v;
		else use("Runtime.CoreObject").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "_context")return this._context;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.CoreDriver";
	},
});
Object.assign(Runtime.CoreDriver, use("Runtime.CoreObject"));
Object.assign(Runtime.CoreDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.CoreDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.CoreDriver",
			"name": "Runtime.CoreDriver",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("_context");
		}
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
});use.add(Runtime.CoreDriver);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.CoreDriver = Runtime.CoreDriver;