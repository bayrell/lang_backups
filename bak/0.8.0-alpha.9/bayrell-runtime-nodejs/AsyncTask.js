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
Runtime.AsyncTask = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Object.assign(Runtime.AsyncTask.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__pos = null;
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		this.__f = null;
		if (a.indexOf("f") == -1) defProp(this, "f");
		this.__catch_stack = null;
		if (a.indexOf("catch_stack") == -1) defProp(this, "catch_stack");
		use("Runtime.CoreStruct").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.AsyncTask"))
		{
			this.__pos = o.__pos;
			this.__f = o.__f;
			this.__catch_stack = o.__catch_stack;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "pos")this.__pos = v;
		else if (k == "f")this.__f = v;
		else if (k == "catch_stack")this.__catch_stack = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.__pos;
		else if (k == "f")return this.__f;
		else if (k == "catch_stack")return this.__catch_stack;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.AsyncTask";
	},
});
Object.assign(Runtime.AsyncTask, use("Runtime.CoreStruct"));
Object.assign(Runtime.AsyncTask,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.AsyncTask";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncTask",
			"name": "Runtime.AsyncTask",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("pos");
			a.push("f");
			a.push("catch_stack");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.AsyncTask);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.AsyncTask = Runtime.AsyncTask;