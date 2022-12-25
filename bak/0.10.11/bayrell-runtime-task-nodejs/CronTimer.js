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
Runtime.Task.CronTimer = function(ctx)
{
	use("Runtime.Task.TaskMethod").apply(this, arguments);
};
Runtime.Task.CronTimer.prototype = Object.create(use("Runtime.Task.TaskMethod").prototype);
Runtime.Task.CronTimer.prototype.constructor = Runtime.Task.CronTimer;
Object.assign(Runtime.Task.CronTimer.prototype,
{
	nextRun: function(ctx)
	{
		return this.last_run + this.timer;
	},
	_init: function(ctx)
	{
		use("Runtime.Task.TaskMethod").prototype._init.call(this,ctx);
		this.timer = 0;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Task.CronTimer"))
		{
			this.timer = o.timer;
		}
		use("Runtime.Task.TaskMethod").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "timer")this.timer = v;
		else use("Runtime.Task.TaskMethod").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "timer")return this.timer;
		return use("Runtime.Task.TaskMethod").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Task.CronTimer";
	},
});
Object.assign(Runtime.Task.CronTimer, use("Runtime.Task.TaskMethod"));
Object.assign(Runtime.Task.CronTimer,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.CronTimer";
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
			"class_name": "Runtime.Task.CronTimer",
			"name": "Runtime.Task.CronTimer",
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
			a.push("timer");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "timer") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Task.CronTimer",
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
});use.add(Runtime.Task.CronTimer);
module.exports = Runtime.Task.CronTimer;