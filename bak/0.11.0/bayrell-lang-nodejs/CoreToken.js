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
Bayrell.Lang.CoreToken = function(ctx)
{
	use("Runtime.BaseStruct").apply(this, arguments);
};
Bayrell.Lang.CoreToken.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Bayrell.Lang.CoreToken.prototype.constructor = Bayrell.Lang.CoreToken;
Object.assign(Bayrell.Lang.CoreToken.prototype,
{
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		this.kind = "";
		this.content = "";
		this.caret_start = null;
		this.caret_end = null;
		this.eof = false;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.CoreToken"))
		{
			this.kind = o.kind;
			this.content = o.content;
			this.caret_start = o.caret_start;
			this.caret_end = o.caret_end;
			this.eof = o.eof;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "kind")this.kind = v;
		else if (k == "content")this.content = v;
		else if (k == "caret_start")this.caret_start = v;
		else if (k == "caret_end")this.caret_end = v;
		else if (k == "eof")this.eof = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.kind;
		else if (k == "content")return this.content;
		else if (k == "caret_start")return this.caret_start;
		else if (k == "caret_end")return this.caret_end;
		else if (k == "eof")return this.eof;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
});
Object.assign(Bayrell.Lang.CoreToken, use("Runtime.BaseStruct"));
Object.assign(Bayrell.Lang.CoreToken,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreToken";
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
			a.push("kind");
			a.push("content");
			a.push("caret_start");
			a.push("caret_end");
			a.push("eof");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		if (field_name == "kind") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "content") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_start") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "caret_end") return Dict.from({
			"t": "Bayrell.Lang.Caret",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "eof") return Dict.from({
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
});use.add(Bayrell.Lang.CoreToken);
module.exports = Bayrell.Lang.CoreToken;