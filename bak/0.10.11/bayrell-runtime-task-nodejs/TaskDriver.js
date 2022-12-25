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
if (typeof Runtime.Task == 'undefined') Runtime.Task = {};
Runtime.Task.TaskDriver = function(ctx)
{
	use("Runtime.Core.CoreDriver").apply(this, arguments);
};
Runtime.Task.TaskDriver.prototype = Object.create(use("Runtime.Core.CoreDriver").prototype);
Runtime.Task.TaskDriver.prototype.constructor = Runtime.Task.TaskDriver;
Object.assign(Runtime.Task.TaskDriver.prototype,
{
	/**
	 * Start driver
	 */
	startDriver: async function(ctx)
	{
		if (ctx.entry_point == "Runtime.Task.Entry")
		{
			this.output_cli = true;
		}
	},
	/**
	 * Write
	 */
	write: function(ctx, msg)
	{
		if (!this.output_cli)
		{
			return ;
		}
		process.stdout.write(msg);
	},
	/**
	 * Write line
	 */
	writeln: function(ctx, msg)
	{
		this.write(ctx, msg + use("Runtime.rtl").toStr("\n"));
	},
	_init: function(ctx)
	{
		use("Runtime.Core.CoreDriver").prototype._init.call(this,ctx);
		this.output_cli = false;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Task.TaskDriver";
	},
});
Object.assign(Runtime.Task.TaskDriver, use("Runtime.Core.CoreDriver"));
Object.assign(Runtime.Task.TaskDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.TaskDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Task.TaskDriver",
			"name": "Runtime.Task.TaskDriver",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("output_cli");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "output_cli") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Task.TaskDriver",
			"name": field_name,
			"t": "bool",
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
});use.add(Runtime.Task.TaskDriver);
module.exports = Runtime.Task.TaskDriver;