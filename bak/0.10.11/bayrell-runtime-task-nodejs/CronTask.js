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
Runtime.Task.CronTask = function(ctx)
{
	use("Runtime.Task.TaskMethod").apply(this, arguments);
};
Runtime.Task.CronTask.prototype = Object.create(use("Runtime.Task.TaskMethod").prototype);
Runtime.Task.CronTask.prototype.constructor = Runtime.Task.CronTask;
Object.assign(Runtime.Task.CronTask.prototype,
{
	nextRun: function(ctx)
	{
		return 0;
	},
	_init: function(ctx)
	{
		use("Runtime.Task.TaskMethod").prototype._init.call(this,ctx);
		this.cron = "";
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Task.CronTask"))
		{
			this.cron = o.cron;
		}
		use("Runtime.Task.TaskMethod").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "cron")this.cron = v;
		else use("Runtime.Task.TaskMethod").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "cron")return this.cron;
		return use("Runtime.Task.TaskMethod").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Task.CronTask";
	},
});
Object.assign(Runtime.Task.CronTask, use("Runtime.Task.TaskMethod"));
Object.assign(Runtime.Task.CronTask,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.CronTask";
	},
	getParentClassName: function()
	{
		return "Runtime.Task.TaskMethod";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Task.CronTask",
			"name": "Runtime.Task.CronTask",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&3)==3)
		{
			a.push("cron");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "cron") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Task.CronTask",
			"name": field_name,
			"t": "string",
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
});use.add(Runtime.Task.CronTask);
module.exports = Runtime.Task.CronTask;