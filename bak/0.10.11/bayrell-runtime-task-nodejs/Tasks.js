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
Runtime.Task.Tasks = function(ctx)
{
};
Object.assign(Runtime.Task.Tasks.prototype,
{
	getClassName: function(ctx)
	{
		return "Runtime.Task.Tasks";
	},
});
Object.assign(Runtime.Task.Tasks,
{
	/**
	 * Returns task methods
	 */
	getTaskMethods: function(ctx)
	{
		var __v0 = use("Runtime.Core.Context");
		return __v0.getSubEntities(ctx, ctx.entities, "Runtime.Task.TaskList", "Runtime.Task.TaskMethod");
	},
	/**
	 * Run cron
	 */
	entities: async function(ctx)
	{
		var output = ctx.getDriver(ctx, "Runtime.Task.TaskDriver");
		output.writeln(ctx, "List entities:");
		var entities = ctx.entities;
		if (ctx.cli_args.get(ctx, 2, "") != "")
		{
			var class_name = ctx.cli_args.get(ctx, 2, "");
			entities = entities.filter(ctx, (ctx, obj) => 
			{
				return obj.getClassName(ctx) == class_name;
			});
		}
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			/* log(item); */
			output.writeln(ctx, i + 1 + use("Runtime.rtl").toStr(") ") + use("Runtime.rtl").toStr(item.taskOutput(ctx)));
		}
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.Tasks";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var __v0 = use("Runtime.Task.TaskList");
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Task.Tasks",
			"name": "Runtime.Task.Tasks",
			"annotations": Collection.from([
				new __v0(ctx, use("Runtime.Dict").from({})),
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
			"entities",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		if (field_name == "entities")
		{
		
		var __v0 = use("Runtime.Task.TaskMethod");
			var Collection = use("Runtime.Collection");
			var Dict = use("Runtime.Dict");
			var IntrospectionInfo = use("Runtime.IntrospectionInfo");
			return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_METHOD,
			"class_name": "Runtime.Task.Tasks",
			"name": "entities",
			"async": true,
			"annotations": Collection.from([
				new __v0(ctx, use("Runtime.Dict").from({"alias":"entities","description":"Show all entities"})),
			]),
		});
	}
	return null;
},
});use.add(Runtime.Task.Tasks);
module.exports = Runtime.Task.Tasks;