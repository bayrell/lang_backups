"use strict;"
var use = require('bay-lang').use;
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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(ctx, key, prev)
{
	if (prev == undefined) prev = null;
	var __v0 = use("Runtime.rtl");
	use("Runtime.Exceptions.RuntimeException").call(this, ctx, ctx.constructor.translate(ctx, "Runtime", "Key '%key%' not found", use("Runtime.Dict").from({"key":key})), __v0.ERROR_KEY_NOT_FOUND, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
});
Object.assign(Runtime.Exceptions.KeyNotFound, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
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
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
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
});use.add(Runtime.Exceptions.KeyNotFound);
module.exports = Runtime.Exceptions.KeyNotFound;