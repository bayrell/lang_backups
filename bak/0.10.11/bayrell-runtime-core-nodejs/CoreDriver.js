"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.CoreDriver = function(ctx, object_name, entity)
{
	if (object_name == undefined) object_name = "";
	if (entity == undefined) entity = null;
	use("Runtime.Core.CoreObject").call(this, ctx, object_name);
	this.entity = entity;
};
Runtime.Core.CoreDriver.prototype = Object.create(use("Runtime.Core.CoreObject").prototype);
Runtime.Core.CoreDriver.prototype.constructor = Runtime.Core.CoreDriver;
Object.assign(Runtime.Core.CoreDriver.prototype,
{
	/**
	 * Returns entity
	 */
	getEntity: function(ctx)
	{
		return this.entity;
	},
	/**
	 * Start driver
	 */
	startDriver: async function(ctx)
	{
	},
	_init: function(ctx)
	{
		use("Runtime.Core.CoreObject").prototype._init.call(this,ctx);
		this.entity = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.CoreDriver";
	},
});
Object.assign(Runtime.Core.CoreDriver, use("Runtime.Core.CoreObject"));
Object.assign(Runtime.Core.CoreDriver,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.CoreDriver";
	},
	getParentClassName: function()
	{
		return "Runtime.Core.CoreObject";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.CoreDriver",
			"name": "Runtime.Core.CoreDriver",
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
			a.push("entity");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "entity") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.CoreDriver",
			"name": field_name,
			"t": "Runtime.Core.Entity",
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
});use.add(Runtime.Core.CoreDriver);
module.exports = Runtime.Core.CoreDriver;