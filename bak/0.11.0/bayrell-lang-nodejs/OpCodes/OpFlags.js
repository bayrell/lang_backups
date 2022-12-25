"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.OpCodes == 'undefined') Bayrell.Lang.OpCodes = {};
Bayrell.Lang.OpCodes.OpFlags = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpFlags.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Bayrell.Lang.OpCodes.OpFlags.prototype.constructor = Bayrell.Lang.OpCodes.OpFlags;
Object.assign(Bayrell.Lang.OpCodes.OpFlags.prototype,
{
	/**
	 * Read is Flag
	 */
	isFlag: function(ctx, name)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpFlags");
		if (!__v0.hasFlag(ctx, name))
		{
			return false;
		}
		return this.takeValue(ctx, "p_" + use("Runtime.rtl").toStr(name));
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.p_async = false;
		this.p_export = false;
		this.p_static = false;
		this.p_const = false;
		this.p_public = false;
		this.p_private = false;
		this.p_protected = false;
		this.p_declare = false;
		this.p_serializable = false;
		this.p_cloneable = false;
		this.p_assignable = false;
		this.p_memorize = false;
		this.p_lambda = false;
		this.p_pure = false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpFlags"))
		{
			this.p_async = o.p_async;
			this.p_export = o.p_export;
			this.p_static = o.p_static;
			this.p_const = o.p_const;
			this.p_public = o.p_public;
			this.p_private = o.p_private;
			this.p_protected = o.p_protected;
			this.p_declare = o.p_declare;
			this.p_serializable = o.p_serializable;
			this.p_cloneable = o.p_cloneable;
			this.p_assignable = o.p_assignable;
			this.p_memorize = o.p_memorize;
			this.p_lambda = o.p_lambda;
			this.p_pure = o.p_pure;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "p_async")this.p_async = v;
		else if (k == "p_export")this.p_export = v;
		else if (k == "p_static")this.p_static = v;
		else if (k == "p_const")this.p_const = v;
		else if (k == "p_public")this.p_public = v;
		else if (k == "p_private")this.p_private = v;
		else if (k == "p_protected")this.p_protected = v;
		else if (k == "p_declare")this.p_declare = v;
		else if (k == "p_serializable")this.p_serializable = v;
		else if (k == "p_cloneable")this.p_cloneable = v;
		else if (k == "p_assignable")this.p_assignable = v;
		else if (k == "p_memorize")this.p_memorize = v;
		else if (k == "p_lambda")this.p_lambda = v;
		else if (k == "p_pure")this.p_pure = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "p_async")return this.p_async;
		else if (k == "p_export")return this.p_export;
		else if (k == "p_static")return this.p_static;
		else if (k == "p_const")return this.p_const;
		else if (k == "p_public")return this.p_public;
		else if (k == "p_private")return this.p_private;
		else if (k == "p_protected")return this.p_protected;
		else if (k == "p_declare")return this.p_declare;
		else if (k == "p_serializable")return this.p_serializable;
		else if (k == "p_cloneable")return this.p_cloneable;
		else if (k == "p_assignable")return this.p_assignable;
		else if (k == "p_memorize")return this.p_memorize;
		else if (k == "p_lambda")return this.p_lambda;
		else if (k == "p_pure")return this.p_pure;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpFlags, use("Runtime.BaseStruct"));
Object.assign(Bayrell.Lang.OpCodes.OpFlags,
{
	/**
	 * Get flags
	 */
	getFlags: function(ctx)
	{
		return use("Runtime.Collection").from(["async","export","static","const","public","private","declare","protected","serializable","cloneable","assignable","memorize","pure"]);
	},
	/**
	 * Get flags
	 */
	hasFlag: function(ctx, flag_name)
	{
		if (flag_name == "async" || flag_name == "export" || flag_name == "static" || flag_name == "const" || flag_name == "public" || flag_name == "private" || flag_name == "declare" || flag_name == "protected" || flag_name == "serializable" || flag_name == "cloneable" || flag_name == "assignable" || flag_name == "memorize" || flag_name == "lambda" || flag_name == "pure")
		{
			return true;
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFlags";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		return Dict.from({
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
			a.push("p_async");
			a.push("p_export");
			a.push("p_static");
			a.push("p_const");
			a.push("p_public");
			a.push("p_private");
			a.push("p_protected");
			a.push("p_declare");
			a.push("p_serializable");
			a.push("p_cloneable");
			a.push("p_assignable");
			a.push("p_memorize");
			a.push("p_lambda");
			a.push("p_pure");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "p_async") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_export") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_static") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_const") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_public") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_private") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_protected") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_declare") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_serializable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_cloneable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_assignable") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_memorize") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_lambda") return Dict.from({
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "p_pure") return Dict.from({
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
});use.add(Bayrell.Lang.OpCodes.OpFlags);
module.exports = Bayrell.Lang.OpCodes.OpFlags;