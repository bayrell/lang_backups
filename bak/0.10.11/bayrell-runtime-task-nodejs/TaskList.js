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
Runtime.Task.TaskList = function(ctx)
{
	use("Runtime.Core.Entity").apply(this, arguments);
};
Runtime.Task.TaskList.prototype = Object.create(use("Runtime.Core.Entity").prototype);
Runtime.Task.TaskList.prototype.constructor = Runtime.Task.TaskList;
Object.assign(Runtime.Task.TaskList.prototype,
{
	/* Entity name for task output */
	entityName: function(ctx)
	{
		return this.getClassName(ctx) + use("Runtime.rtl").toStr(" -> ") + use("Runtime.rtl").toStr(((this.value) ? (this.value) : (this.name)));
	},
	/* Add class info in Context::getRequiredEntities */
	addClassInfo: function(ctx, class_name)
	{
		return this.copy(ctx, use("Runtime.Dict").from({"name":class_name}));
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Task.TaskList"))
		{
		}
		use("Runtime.Core.Entity").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		use("Runtime.Core.Entity").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.Core.Entity").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Task.TaskList";
	},
});
Object.assign(Runtime.Task.TaskList, use("Runtime.Core.Entity"));
Object.assign(Runtime.Task.TaskList,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Task";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Task.TaskList";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.Entity";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Task.TaskList",
			"name": "Runtime.Task.TaskList",
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
});use.add(Runtime.Task.TaskList);
module.exports = Runtime.Task.TaskList;