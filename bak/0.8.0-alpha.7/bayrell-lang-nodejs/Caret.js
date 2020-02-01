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
Bayrell.Lang.Caret = function(/*__ctx*/)
{
	use("Runtime.FakeStruct").apply(this, arguments);
};
Bayrell.Lang.Caret.prototype = Object.create(use("Runtime.FakeStruct").prototype);
Bayrell.Lang.Caret.prototype.constructor = Bayrell.Lang.Caret;
Object.assign(Bayrell.Lang.Caret.prototype,
{
	_init: function(/*__ctx*/)
	{
		this.pos = 0;
		this.x = 0;
		this.y = 0;
		use("Runtime.FakeStruct").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.Caret"))
		{
			this.pos = o.pos;
			this.x = o.x;
			this.y = o.y;
		}
		use("Runtime.FakeStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "pos")this.pos = v;
		else if (k == "x")this.x = v;
		else if (k == "y")this.y = v;
		else use("Runtime.FakeStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "pos")return this.pos;
		else if (k == "x")return this.x;
		else if (k == "y")return this.y;
		return use("Runtime.FakeStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.Caret";
	},
});
Object.assign(Bayrell.Lang.Caret, use("Runtime.FakeStruct"));
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
		return "Runtime.FakeStruct";
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
		if ((f|2)==2)
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