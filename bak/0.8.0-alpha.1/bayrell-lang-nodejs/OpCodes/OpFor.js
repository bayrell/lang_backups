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
Bayrell.Lang.OpCodes.OpFor = function()
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpFor.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpFor.prototype.constructor = Bayrell.Lang.OpCodes.OpFor;
Object.assign(Bayrell.Lang.OpCodes.OpFor.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_for";
		if (a.indexOf("op") == -1)Object.defineProperty(this, "op",{get:function(){return this.__op;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("op");}});
		this.__expr1 = null;
		if (a.indexOf("expr1") == -1)Object.defineProperty(this, "expr1",{get:function(){return this.__expr1;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("expr1");}});
		this.__expr2 = null;
		if (a.indexOf("expr2") == -1)Object.defineProperty(this, "expr2",{get:function(){return this.__expr2;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("expr2");}});
		this.__expr3 = null;
		if (a.indexOf("expr3") == -1)Object.defineProperty(this, "expr3",{get:function(){return this.__expr3;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("expr3");}});
		this.__value = null;
		if (a.indexOf("value") == -1)Object.defineProperty(this, "value",{get:function(){return this.__value;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("value");}});
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpFor"))
		{
			this.__op = o.__op;
			this.__expr1 = o.__expr1;
			this.__expr2 = o.__expr2;
			this.__expr3 = o.__expr3;
			this.__value = o.__value;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "expr1")this.__expr1 = v;
		else if (k == "expr2")this.__expr2 = v;
		else if (k == "expr3")this.__expr3 = v;
		else if (k == "value")this.__value = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "expr1")return this.__expr1;
		else if (k == "expr2")return this.__expr2;
		else if (k == "expr3")return this.__expr3;
		else if (k == "value")return this.__value;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFor";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpFor, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpFor,
{
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpFor";
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
			a.push("expr1");
			a.push("expr2");
			a.push("expr3");
			a.push("value");
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
use.add(Bayrell.Lang.OpCodes.OpFor);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpFor = Bayrell.Lang.OpCodes.OpFor;