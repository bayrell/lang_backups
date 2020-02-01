"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpPipe = function()
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpPipe.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpPipe.prototype.constructor = Bayrell.Lang.OpCodes.OpPipe;
Object.assign(Bayrell.Lang.OpCodes.OpPipe.prototype,
{
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_pipe";
		if (a.indexOf("op") == -1) defProp(this, "op");
		this.__kind = "";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__class_name = "";
		if (a.indexOf("class_name") == -1) defProp(this, "class_name");
		this.__method_name = "";
		if (a.indexOf("method_name") == -1) defProp(this, "method_name");
		this.__obj = null;
		if (a.indexOf("obj") == -1) defProp(this, "obj");
		this.__args = null;
		if (a.indexOf("args") == -1) defProp(this, "args");
		this.__is_await = false;
		if (a.indexOf("is_await") == -1) defProp(this, "is_await");
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpPipe"))
		{
			this.__op = o.__op;
			this.__kind = o.__kind;
			this.__class_name = o.__class_name;
			this.__method_name = o.__method_name;
			this.__obj = o.__obj;
			this.__args = o.__args;
			this.__is_await = o.__is_await;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "class_name")this.__class_name = v;
		else if (k == "method_name")this.__method_name = v;
		else if (k == "obj")this.__obj = v;
		else if (k == "args")this.__args = v;
		else if (k == "is_await")this.__is_await = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "kind")return this.__kind;
		else if (k == "class_name")return this.__class_name;
		else if (k == "method_name")return this.__method_name;
		else if (k == "obj")return this.__obj;
		else if (k == "args")return this.__args;
		else if (k == "is_await")return this.__is_await;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPipe";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpPipe, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpPipe,
{
	KIND_METHOD: "method",
	KIND_LAMBDA: "lambda",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpPipe";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.OpCodes.OpPipe",
			"name": "Bayrell.Lang.OpCodes.OpPipe",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("op");
			a.push("kind");
			a.push("class_name");
			a.push("method_name");
			a.push("obj");
			a.push("args");
			a.push("is_await");
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
});use.add(Bayrell.Lang.OpCodes.OpPipe);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpPipe = Bayrell.Lang.OpCodes.OpPipe;