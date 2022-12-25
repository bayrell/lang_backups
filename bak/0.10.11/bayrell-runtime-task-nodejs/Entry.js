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
Runtime.Task.Entry = function(ctx)
{
};
Object.assign(Runtime.Task.Entry.prototype,
{
	getClassName: function(ctx)
	{
		return "Runtime.Task.Entry";
	},
});
Object.assign(Runtime.Task.Entry,
{
	/**
	 * Run cron
	 */
	appRun: async function(ctx)
	{
		var output = ctx.getDriver(ctx, "Runtime.Task.TaskDriver");
		var __v0 = use("Runtime.lib");
		var task_lists = ctx.entities.filter(ctx, __v0.isInstance(ctx, "Runtime.Task.TaskList"));
		var sz = ctx.cli_args.count(ctx);
		var __v1 = use("Runtime.Task.Tasks");
		var methods = __v1.getTaskMethods(ctx);
		/* Output all tasks */
		if (sz == 1)
		{
			output.writeln(ctx, "Methods:");
			var __v2 = use("Runtime.Map");
			var h = new __v2(ctx);
			for (var i = 0;i < methods.count(ctx);i++)
			{
				var m = methods.item(ctx, i);
				var content = "";
				if (m.alias != "" && !h.has(ctx, m.alias))
				{
					content = m.alias;
					h.setValue(ctx, m.alias, true);
				}
				else
				{
					content = m.class_name + use("Runtime.rtl").toStr("::") + use("Runtime.rtl").toStr(m.method_name);
				}
				if (m.description != "")
				{
					content += use("Runtime.rtl").toStr(" - " + use("Runtime.rtl").toStr(m.description));
				}
				output.writeln(ctx, "  " + use("Runtime.rtl").toStr(content));
			}
		}
		else if (sz >= 2)
		{
			var cmd = ctx.cli_args.item(ctx, 1);
			var find_method = methods.findItem(ctx, (ctx, m) => 
			{
				if (m.alias == cmd)
				{
					return true;
				}
				var __v3 = use("Runtime.rs");
				var arr = __v3.split(ctx, "::", cmd);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				if (m.class_name == class_name && m.method_name == method_name)
				{
					return true;
				}
				return false;
			});
			if (find_method != null)
			{
				var __v3 = use("Runtime.rtl");
				var f = __v3.method(ctx, find_method.class_name, find_method.method_name);
				await f(ctx);
			}
			else
			{
				output.writeln(ctx, "Method not found");
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.Entry";
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
			"class_name": "Runtime.Task.Entry",
			"name": "Runtime.Task.Entry",
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
});use.add(Runtime.Task.Entry);
module.exports = Runtime.Task.Entry;