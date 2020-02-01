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
Bayrell.Lang.OpCodes.OpDeclareClass = function()
{
	use("Bayrell.Lang.OpCodes.BaseOpCode").apply(this, arguments);
};
Bayrell.Lang.OpCodes.OpDeclareClass.prototype = Object.create(use("Bayrell.Lang.OpCodes.BaseOpCode").prototype);
Bayrell.Lang.OpCodes.OpDeclareClass.prototype.constructor = Bayrell.Lang.OpCodes.OpDeclareClass;
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__op = "op_class";
		if (a.indexOf("op") == -1)Object.defineProperty(this, "op",{get:function(){return this.__op;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("op");}});
		this.__kind = "";
		if (a.indexOf("kind") == -1)Object.defineProperty(this, "kind",{get:function(){return this.__kind;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("kind");}});
		this.__name = "";
		if (a.indexOf("name") == -1)Object.defineProperty(this, "name",{get:function(){return this.__name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("name");}});
		this.__extend_name = "";
		if (a.indexOf("extend_name") == -1)Object.defineProperty(this, "extend_name",{get:function(){return this.__extend_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("extend_name");}});
		this.__annotations = null;
		if (a.indexOf("annotations") == -1)Object.defineProperty(this, "annotations",{get:function(){return this.__annotations;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("annotations");}});
		this.__comments = null;
		if (a.indexOf("comments") == -1)Object.defineProperty(this, "comments",{get:function(){return this.__comments;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("comments");}});
		this.__template = null;
		if (a.indexOf("template") == -1)Object.defineProperty(this, "template",{get:function(){return this.__template;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("template");}});
		this.__flags = null;
		if (a.indexOf("flags") == -1)Object.defineProperty(this, "flags",{get:function(){return this.__flags;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("flags");}});
		this.__fn_create = null;
		if (a.indexOf("fn_create") == -1)Object.defineProperty(this, "fn_create",{get:function(){return this.__fn_create;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("fn_create");}});
		this.__fn_destroy = null;
		if (a.indexOf("fn_destroy") == -1)Object.defineProperty(this, "fn_destroy",{get:function(){return this.__fn_destroy;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("fn_destroy");}});
		this.__class_extends = null;
		if (a.indexOf("class_extends") == -1)Object.defineProperty(this, "class_extends",{get:function(){return this.__class_extends;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("class_extends");}});
		this.__class_implements = null;
		if (a.indexOf("class_implements") == -1)Object.defineProperty(this, "class_implements",{get:function(){return this.__class_implements;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("class_implements");}});
		this.__vars = null;
		if (a.indexOf("vars") == -1)Object.defineProperty(this, "vars",{get:function(){return this.__vars;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("vars");}});
		this.__functions = null;
		if (a.indexOf("functions") == -1)Object.defineProperty(this, "functions",{get:function(){return this.__functions;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("functions");}});
		this.__items = null;
		if (a.indexOf("items") == -1)Object.defineProperty(this, "items",{get:function(){return this.__items;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("items");}});
		this.__is_static = false;
		if (a.indexOf("is_static") == -1)Object.defineProperty(this, "is_static",{get:function(){return this.__is_static;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("is_static");}});
		this.__is_declare = false;
		if (a.indexOf("is_declare") == -1)Object.defineProperty(this, "is_declare",{get:function(){return this.__is_declare;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("is_declare");}});
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.OpCodes.OpDeclareClass"))
		{
			this.__op = o.__op;
			this.__kind = o.__kind;
			this.__name = o.__name;
			this.__extend_name = o.__extend_name;
			this.__annotations = o.__annotations;
			this.__comments = o.__comments;
			this.__template = o.__template;
			this.__flags = o.__flags;
			this.__fn_create = o.__fn_create;
			this.__fn_destroy = o.__fn_destroy;
			this.__class_extends = o.__class_extends;
			this.__class_implements = o.__class_implements;
			this.__vars = o.__vars;
			this.__functions = o.__functions;
			this.__items = o.__items;
			this.__is_static = o.__is_static;
			this.__is_declare = o.__is_declare;
		}
		use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "op")this.__op = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "name")this.__name = v;
		else if (k == "extend_name")this.__extend_name = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "comments")this.__comments = v;
		else if (k == "template")this.__template = v;
		else if (k == "flags")this.__flags = v;
		else if (k == "fn_create")this.__fn_create = v;
		else if (k == "fn_destroy")this.__fn_destroy = v;
		else if (k == "class_extends")this.__class_extends = v;
		else if (k == "class_implements")this.__class_implements = v;
		else if (k == "vars")this.__vars = v;
		else if (k == "functions")this.__functions = v;
		else if (k == "items")this.__items = v;
		else if (k == "is_static")this.__is_static = v;
		else if (k == "is_declare")this.__is_declare = v;
		else use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "op")return this.__op;
		else if (k == "kind")return this.__kind;
		else if (k == "name")return this.__name;
		else if (k == "extend_name")return this.__extend_name;
		else if (k == "annotations")return this.__annotations;
		else if (k == "comments")return this.__comments;
		else if (k == "template")return this.__template;
		else if (k == "flags")return this.__flags;
		else if (k == "fn_create")return this.__fn_create;
		else if (k == "fn_destroy")return this.__fn_destroy;
		else if (k == "class_extends")return this.__class_extends;
		else if (k == "class_implements")return this.__class_implements;
		else if (k == "vars")return this.__vars;
		else if (k == "functions")return this.__functions;
		else if (k == "items")return this.__items;
		else if (k == "is_static")return this.__is_static;
		else if (k == "is_declare")return this.__is_declare;
		return use("Bayrell.Lang.OpCodes.BaseOpCode").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareClass";
	},
});
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass, use("Bayrell.Lang.OpCodes.BaseOpCode"));
Object.assign(Bayrell.Lang.OpCodes.OpDeclareClass,
{
	KIND_CLASS: "class",
	KIND_STRUCT: "struct",
	KIND_INTERFACE: "interface",
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.OpCodes";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.OpCodes.OpDeclareClass";
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
			a.push("kind");
			a.push("name");
			a.push("extend_name");
			a.push("annotations");
			a.push("comments");
			a.push("template");
			a.push("flags");
			a.push("fn_create");
			a.push("fn_destroy");
			a.push("class_extends");
			a.push("class_implements");
			a.push("vars");
			a.push("functions");
			a.push("items");
			a.push("is_static");
			a.push("is_declare");
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
use.add(Bayrell.Lang.OpCodes.OpDeclareClass);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.OpCodes == undefined) module.exports.Bayrell.Lang.OpCodes = {};
module.exports.Bayrell.Lang.OpCodes.OpDeclareClass = Bayrell.Lang.OpCodes.OpDeclareClass;