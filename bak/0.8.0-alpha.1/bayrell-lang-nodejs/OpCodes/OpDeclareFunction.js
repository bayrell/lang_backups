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
Bayrell.Lang.OpCodes.OpDeclareFunction = function()
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpDeclareFunction.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareFunction;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction.prototype,
{
	/**
	 * Returns true if static function
	 */
	isStatic: function()
	{
		return this.flags.isFlag("static") || this.flags.isFlag("lambda");
	},
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_function";
		if (a.indexOf("op") == -1)Object.defineProperty(this, "op",{get:function(){return this.__op;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("op");}});
		this.__name = "";
		if (a.indexOf("name") == -1)Object.defineProperty(this, "name",{get:function(){return this.__name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("name");}});
		this.__annotations = null;
		if (a.indexOf("annotations") == -1)Object.defineProperty(this, "annotations",{get:function(){return this.__annotations;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("annotations");}});
		this.__comments = null;
		if (a.indexOf("comments") == -1)Object.defineProperty(this, "comments",{get:function(){return this.__comments;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("comments");}});
		this.__args = null;
		if (a.indexOf("args") == -1)Object.defineProperty(this, "args",{get:function(){return this.__args;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("args");}});
		this.__vars = null;
		if (a.indexOf("vars") == -1)Object.defineProperty(this, "vars",{get:function(){return this.__vars;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("vars");}});
		this.__result_type = null;
		if (a.indexOf("result_type") == -1)Object.defineProperty(this, "result_type",{get:function(){return this.__result_type;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("result_type");}});
		this.__expression = null;
		if (a.indexOf("expression") == -1)Object.defineProperty(this, "expression",{get:function(){return this.__expression;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("expression");}});
		this.__value = null;
		if (a.indexOf("value") == -1)Object.defineProperty(this, "value",{get:function(){return this.__value;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("value");}});
		this.__flags = null;
		if (a.indexOf("flags") == -1)Object.defineProperty(this, "flags",{get:function(){return this.__flags;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("flags");}});
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpDeclareFunction"))
		{
			this.__op = o.__op;
			this.__name = o.__name;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__args = o.__args;
			this.__vars = o.__vars;
			this.__result_type = o.__result_type;
			this.__expression = o.__expression;
			this.__value = o.__value;
			this.__flags = o.__flags;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "name")this.__name = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "args")this.__args = v;
		else if (k == "vars")this.__vars = v;
		else if (k == "result_type")this.__result_type = v;
		else if (k == "expression")this.__expression = v;
		else if (k == "value")this.__value = v;
		else if (k == "flags")this.__flags = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "name")return this.__name;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "args")return this.__args;
		else if (k == "vars")return this.__vars;
		else if (k == "result_type")return this.__result_type;
		else if (k == "expression")return this.__expression;
		else if (k == "value")return this.__value;
		else if (k == "flags")return this.__flags;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareFunction,
{
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareFunction";
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
			a.push("name");
			a.push("annotations");
			a.push("comments");
			a.push("args");
			a.push("vars");
			a.push("result_type");
			a.push("expression");
			a.push("value");
			a.push("flags");
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
use.add(Bayrell.Lang.OpCodes.OpDeclareFunction);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpDeclareFunction = Bayrell.Lang.OpCodes.OpDeclareFunction;