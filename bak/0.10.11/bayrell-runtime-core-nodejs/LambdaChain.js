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
Runtime.Core.LambdaChain = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.Core.LambdaChain.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.Core.LambdaChain.prototype.constructor = Runtime.Core.LambdaChain;
Object.assign(Runtime.Core.LambdaChain.prototype,
{
	logName: function(ctx)
	{
		return this.getClassName(ctx) + use("Runtime.rtl").toStr(" -> ") + use("Runtime.rtl").toStr(this.name) + use("Runtime.rtl").toStr(" -> [") + use("Runtime.rtl").toStr(this.pos) + use("Runtime.rtl").toStr("] ") + use("Runtime.rtl").toStr(this.value);
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.name = "";
		this.value = "";
		this.chain = "";
		this.pos = 0;
		this.is_async = false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Core.LambdaChain"))
		{
			this.name = o.name;
			this.value = o.value;
			this.chain = o.chain;
			this.pos = o.pos;
			this.is_async = o.is_async;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "name")this.name = v;
		else if (k == "value")this.value = v;
		else if (k == "chain")this.chain = v;
		else if (k == "pos")this.pos = v;
		else if (k == "is_async")this.is_async = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "chain")return this.chain;
		else if (k == "pos")return this.pos;
		else if (k == "is_async")return this.is_async;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.LambdaChain";
	},
});
Object.assign(Runtime.Core.LambdaChain, use("Runtime.BaseStruct"));
Object.assign(Runtime.Core.LambdaChain,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.LambdaChain";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Core.LambdaChain",
			"name": "Runtime.Core.LambdaChain",
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
			a.push("name");
			a.push("value");
			a.push("chain");
			a.push("pos");
			a.push("is_async");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "value") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "chain") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "pos") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
			"name": field_name,
			"t": "double",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_async") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Core.LambdaChain",
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
});use.add(Runtime.Core.LambdaChain);
module.exports = Runtime.Core.LambdaChain;