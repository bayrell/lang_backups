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
Bayrell.Lang.Caret = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.Caret.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.Caret.prototype.constructor = Bayrell.Lang.Caret;
Object.assign(Bayrell.Lang.Caret.prototype,
{
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__pos = 0;
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		this.__x = 0;
		if (a.indexOf("x") == -1) defProp(this, "x");
		this.__y = 0;
		if (a.indexOf("y") == -1) defProp(this, "y");
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.Caret"))
		{
			this.__pos = o.__pos;
			this.__x = o.__x;
			this.__y = o.__y;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "pos")this.__pos = v;
		else if (k == "x")this.__x = v;
		else if (k == "y")this.__y = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.__pos;
		else if (k == "x")return this.__x;
		else if (k == "y")return this.__y;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Caret";
	},
});
Object.assign(Bayrell.Lang.Caret, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.Caret,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Caret";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Caret",
			"name": "Bayrell.Lang.Caret",
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
			a.push("pos");
			a.push("x");
			a.push("y");
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
});use.add(Bayrell.Lang.Caret);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.Caret = Bayrell.Lang.Caret;