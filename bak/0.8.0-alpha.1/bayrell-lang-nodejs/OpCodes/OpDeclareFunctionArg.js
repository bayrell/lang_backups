"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
Bayrell.Lang.OpCodes.OpDeclareFunctionArg = function()
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_function_arg";
		if (a.indexOf("op") == -1)Object.defineProperty(this, "op",{get:function(){return this.__op;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("op");}});
		this.__pattern = null;
		if (a.indexOf("pattern") == -1)Object.defineProperty(this, "pattern",{get:function(){return this.__pattern;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("pattern");}});
		this.__name = "";
		if (a.indexOf("name") == -1)Object.defineProperty(this, "name",{get:function(){return this.__name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("name");}});
		this.__expression = null;
		if (a.indexOf("expression") == -1)Object.defineProperty(this, "expression",{get:function(){return this.__expression;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("expression");}});
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpDeclareFunctionArg"))
		{
			this.__op = o.__op;
			this.__pattern = o.__pattern;
			this.__name = o.__name;
			this.__expression = o.__expression;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "pattern")this.__pattern = v;
		else if (k == "name")this.__name = v;
		else if (k == "expression")this.__expression = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "pattern")return this.__pattern;
		else if (k == "name")return this.__name;
		else if (k == "expression")return this.__expression;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunctionArg";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunctionArg,
{
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunctionArg";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.BaseOpCode";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("op");
			a.push("pattern");
			a.push("name");
			a.push("expression");
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
use.add(Bayrell.Lang.OpCodes.OpDeclareFunctionArg);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpDeclareFunctionArg = Bayrell.Lang.OpCodes.OpDeclareFunctionArg;