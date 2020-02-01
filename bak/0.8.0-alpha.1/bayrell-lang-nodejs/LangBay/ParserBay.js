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
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBay = function()
{
	use("Bayrell.Lang.CoreParser").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBay.prototype = Object.create(use("Bayrell.Lang.CoreParser").prototype);
Bayrell.Lang.LangBay.ParserBay.prototype.constructor = Bayrell.Lang.LangBay.ParserBay;
Object.assign(Bayrell.Lang.LangBay.ParserBay.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__vars = null;
		if (a.indexOf("vars") == -1)Object.defineProperty(this, "vars",{get:function(){return this.__vars;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("vars");}});
		this.__uses = null;
		if (a.indexOf("uses") == -1)Object.defineProperty(this, "uses",{get:function(){return this.__uses;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("uses");}});
		this.__current_namespace = null;
		if (a.indexOf("current_namespace") == -1)Object.defineProperty(this, "current_namespace",{get:function(){return this.__current_namespace;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_namespace");}});
		this.__current_class = null;
		if (a.indexOf("current_class") == -1)Object.defineProperty(this, "current_class",{get:function(){return this.__current_class;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class");}});
		this.__current_namespace_name = "";
		if (a.indexOf("current_namespace_name") == -1)Object.defineProperty(this, "current_namespace_name",{get:function(){return this.__current_namespace_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_namespace_name");}});
		this.__current_class_name = "";
		if (a.indexOf("current_class_name") == -1)Object.defineProperty(this, "current_class_name",{get:function(){return this.__current_class_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class_name");}});
		this.__current_class_kind = "";
		if (a.indexOf("current_class_kind") == -1)Object.defineProperty(this, "current_class_kind",{get:function(){return this.__current_class_kind;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class_kind");}});
		this.__find_identifier = true;
		if (a.indexOf("find_identifier") == -1)Object.defineProperty(this, "find_identifier",{get:function(){return this.__find_identifier;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("find_identifier");}});
		this.__skip_comments = true;
		if (a.indexOf("skip_comments") == -1)Object.defineProperty(this, "skip_comments",{get:function(){return this.__skip_comments;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("skip_comments");}});
		this.__parser_base = null;
		if (a.indexOf("parser_base") == -1)Object.defineProperty(this, "parser_base",{get:function(){return this.__parser_base;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("parser_base");}});
		this.__parser_expression = null;
		if (a.indexOf("parser_expression") == -1)Object.defineProperty(this, "parser_expression",{get:function(){return this.__parser_expression;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("parser_expression");}});
		this.__parser_operator = null;
		if (a.indexOf("parser_operator") == -1)Object.defineProperty(this, "parser_operator",{get:function(){return this.__parser_operator;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("parser_operator");}});
		this.__parser_preprocessor = null;
		if (a.indexOf("parser_preprocessor") == -1)Object.defineProperty(this, "parser_preprocessor",{get:function(){return this.__parser_preprocessor;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("parser_preprocessor");}});
		this.__parser_program = null;
		if (a.indexOf("parser_program") == -1)Object.defineProperty(this, "parser_program",{get:function(){return this.__parser_program;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("parser_program");}});
		use("Bayrell.Lang.CoreParser").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBay"))
		{
			this.__vars = o.__vars;
			this.__uses = o.__uses;
			this.__current_namespace = o.__current_namespace;
			this.__current_class = o.__current_class;
			this.__current_namespace_name = o.__current_namespace_name;
			this.__current_class_name = o.__current_class_name;
			this.__current_class_kind = o.__current_class_kind;
			this.__find_identifier = o.__find_identifier;
			this.__skip_comments = o.__skip_comments;
			this.__parser_base = o.__parser_base;
			this.__parser_expression = o.__parser_expression;
			this.__parser_operator = o.__parser_operator;
			this.__parser_preprocessor = o.__parser_preprocessor;
			this.__parser_program = o.__parser_program;
		}
		use("Bayrell.Lang.CoreParser").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "vars")this.__vars = v;
		else if (k == "uses")this.__uses = v;
		else if (k == "current_namespace")this.__current_namespace = v;
		else if (k == "current_class")this.__current_class = v;
		else if (k == "current_namespace_name")this.__current_namespace_name = v;
		else if (k == "current_class_name")this.__current_class_name = v;
		else if (k == "current_class_kind")this.__current_class_kind = v;
		else if (k == "find_identifier")this.__find_identifier = v;
		else if (k == "skip_comments")this.__skip_comments = v;
		else if (k == "parser_base")this.__parser_base = v;
		else if (k == "parser_expression")this.__parser_expression = v;
		else if (k == "parser_operator")this.__parser_operator = v;
		else if (k == "parser_preprocessor")this.__parser_preprocessor = v;
		else if (k == "parser_program")this.__parser_program = v;
		else use("Bayrell.Lang.CoreParser").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "vars")return this.__vars;
		else if (k == "uses")return this.__uses;
		else if (k == "current_namespace")return this.__current_namespace;
		else if (k == "current_class")return this.__current_class;
		else if (k == "current_namespace_name")return this.__current_namespace_name;
		else if (k == "current_class_name")return this.__current_class_name;
		else if (k == "current_class_kind")return this.__current_class_kind;
		else if (k == "find_identifier")return this.__find_identifier;
		else if (k == "skip_comments")return this.__skip_comments;
		else if (k == "parser_base")return this.__parser_base;
		else if (k == "parser_expression")return this.__parser_expression;
		else if (k == "parser_operator")return this.__parser_operator;
		else if (k == "parser_preprocessor")return this.__parser_preprocessor;
		else if (k == "parser_program")return this.__parser_program;
		return use("Bayrell.Lang.CoreParser").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBay";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBay, use("Bayrell.Lang.CoreParser"));
Object.assign(Bayrell.Lang.LangBay.ParserBay,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Bayrell.Lang.Caret");
		var _v2 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var _v3 = use("Bayrell.Lang.LangBay.ParserBayExpression");
		var _v4 = use("Bayrell.Lang.LangBay.ParserBayOperator");
		var _v5 = use("Bayrell.Lang.LangBay.ParserBayPreprocessor");
		var _v6 = use("Bayrell.Lang.LangBay.ParserBayProgram");
		return parser.copy(use("Runtime.Dict").create({"vars":new _v0(),"uses":new _v0(),"caret":new _v1(use("Runtime.Dict").create({})),"token":null,"parser_base":new _v2(),"parser_expression":new _v3(),"parser_operator":new _v4(),"parser_preprocessor":new _v5(),"parser_program":new _v6()}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser,content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		return parser.parser_program.constructor.readProgram(parser);
	},
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBay";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("vars");
			a.push("uses");
			a.push("current_namespace");
			a.push("current_class");
			a.push("current_namespace_name");
			a.push("current_class_name");
			a.push("current_class_kind");
			a.push("find_identifier");
			a.push("skip_comments");
			a.push("parser_base");
			a.push("parser_expression");
			a.push("parser_operator");
			a.push("parser_preprocessor");
			a.push("parser_program");
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
use.add(Bayrell.Lang.LangBay.ParserBay);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBay = Bayrell.Lang.LangBay.ParserBay;