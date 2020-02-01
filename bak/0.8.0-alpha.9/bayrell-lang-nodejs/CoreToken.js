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
Bayrell.Lang.CoreToken = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.CoreToken.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.CoreToken.prototype.constructor = Bayrell.Lang.CoreToken;
Object.assign(Bayrell.Lang.CoreToken.prototype,
{
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__kind = "";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__content = "";
		if (a.indexOf("content") == -1) defProp(this, "content");
		this.__caret_start = null;
		if (a.indexOf("caret_start") == -1) defProp(this, "caret_start");
		this.__caret_end = null;
		if (a.indexOf("caret_end") == -1) defProp(this, "caret_end");
		this.__eof = false;
		if (a.indexOf("eof") == -1) defProp(this, "eof");
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.CoreToken"))
		{
			this.__kind = o.__kind;
			this.__content = o.__content;
			this.__caret_start = o.__caret_start;
			this.__caret_end = o.__caret_end;
			this.__eof = o.__eof;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "kind")this.__kind = v;
		else if (k == "content")this.__content = v;
		else if (k == "caret_start")this.__caret_start = v;
		else if (k == "caret_end")this.__caret_end = v;
		else if (k == "eof")this.__eof = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "kind")return this.__kind;
		else if (k == "content")return this.__content;
		else if (k == "caret_start")return this.__caret_start;
		else if (k == "caret_end")return this.__caret_end;
		else if (k == "eof")return this.__eof;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.CoreToken";
	},
});
Object.assign(Bayrell.Lang.CoreToken, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.CoreToken,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreToken";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.CoreToken",
			"name": "Bayrell.Lang.CoreToken",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
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
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.CoreToken);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.CoreToken = Bayrell.Lang.CoreToken;