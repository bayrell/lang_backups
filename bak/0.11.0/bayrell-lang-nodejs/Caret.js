"use strict;"
var use = require('bay-lang').use;
/*!
 *  Bayrell Language
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
Bayrell.Lang.Caret = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Bayrell.Lang.Caret.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Bayrell.Lang.Caret.prototype.constructor = Bayrell.Lang.Caret;
Object.assign(Bayrell.Lang.Caret.prototype,
{
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.pos = 0;
		this.x = 0;
		this.y = 0;
	},
});
Object.assign(Bayrell.Lang.Caret, use("Runtime.BaseStruct"));
Object.assign(Bayrell.Lang.Caret,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Caret";
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
		if ((f&2)==2)
		{
			a.push("pos");
			a.push("x");
			a.push("y");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "pos") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "x") return Dict.from({
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "y") return Dict.from({
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
});use.add(Bayrell.Lang.Caret);
module.exports = Bayrell.Lang.Caret;