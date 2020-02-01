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
Bayrell.Lang.OpCodes.OpIfElse = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpIfElse.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.OpCodes.OpIfElse.prototype.constructor = Bayrell.Lang.OpCodes.OpIfElse;
Object.assign(Bayrell.Lang.OpCodes.OpIfElse.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__condition = null;
		if (a.indexOf("condition") == -1)Object.defineProperty(this, "condition",{get:function(){return this.__condition;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("condition");}});
		this.__if_true = null;
		if (a.indexOf("if_true") == -1)Object.defineProperty(this, "if_true",{get:function(){return this.__if_true;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("if_true");}});
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpIfElse"))
		{
			this.__condition = o.__condition;
			this.__if_true = o.__if_true;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "condition")this.__condition = v;
		else if (k == "if_true")this.__if_true = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "condition")return this.__condition;
		else if (k == "if_true")return this.__if_true;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIfElse";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpIfElse, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.OpCodes.OpIfElse,
{
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpIfElse";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("condition");
			a.push("if_true");
		}
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Bayrell.Lang.OpCodes.OpIfElse);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpIfElse = Bayrell.Lang.OpCodes.OpIfElse;