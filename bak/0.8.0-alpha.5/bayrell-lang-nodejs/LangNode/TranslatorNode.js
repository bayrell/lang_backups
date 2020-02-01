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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNode = function()
{
	use("Bayrell.Lang.CoreTranslator").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNode.prototype = Object.create(use("Bayrell.Lang.CoreTranslator").prototype);
Bayrell.Lang.LangNode.TranslatorNode.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNode;
Object.assign(Bayrell.Lang.LangNode.TranslatorNode.prototype,
{
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__async_await = null;
		if (a.indexOf("async_await") == -1) defProp(this, "async_await");
		this.__expression = null;
		if (a.indexOf("expression") == -1) defProp(this, "expression");
		this.__html = null;
		if (a.indexOf("html") == -1) defProp(this, "html");
		this.__operator = null;
		if (a.indexOf("operator") == -1) defProp(this, "operator");
		this.__program = null;
		if (a.indexOf("program") == -1) defProp(this, "program");
		use("Bayrell.Lang.CoreTranslator").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangNode.TranslatorNode"))
		{
			this.__async_await = o.__async_await;
			this.__expression = o.__expression;
			this.__html = o.__html;
			this.__operator = o.__operator;
			this.__program = o.__program;
		}
		use("Bayrell.Lang.CoreTranslator").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "async_await")this.__async_await = v;
		else if (k == "expression")this.__expression = v;
		else if (k == "html")this.__html = v;
		else if (k == "operator")this.__operator = v;
		else if (k == "program")this.__program = v;
		else use("Bayrell.Lang.CoreTranslator").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_await")return this.__async_await;
		else if (k == "expression")return this.__expression;
		else if (k == "html")return this.__html;
		else if (k == "operator")return this.__operator;
		else if (k == "program")return this.__program;
		return use("Bayrell.Lang.CoreTranslator").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNode, use("Bayrell.Lang.CoreTranslator"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNode,
{
	/**
	 * Reset translator
	 */
	reset: function(t)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Bayrell.Lang.LangES6.TranslatorES6AsyncAwait");
		var _v2 = use("Bayrell.Lang.LangNode.TranslatorNodeExpression");
		var _v3 = use("Bayrell.Lang.LangES6.TranslatorES6Html");
		var _v4 = use("Bayrell.Lang.LangES6.TranslatorES6Operator");
		var _v5 = use("Bayrell.Lang.LangNode.TranslatorNodeProgram");
		var _v6 = use("Runtime.Collection");
		var _v7 = use("Runtime.Collection");
		return t.copy(use("Runtime.Dict").create({"value":"","current_namespace_name":"","modules":new _v0(),"async_await":new _v1(),"expression":new _v2(),"html":new _v3(),"operator":new _v4(),"program":new _v5(),"save_vars":new _v6(),"save_op_codes":new _v7(),"save_op_code_inc":0,"preprocessor_flags":use("Runtime.Dict").create({"NODEJS":true,"JAVASCRIPT":true})}));
	},
	/**
	 * Translate BaseOpCode
	 */
	translate: function(t,op_code)
	{
		t = this.reset(t);
		return t.program.constructor.translateProgram(t, op_code);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNode";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNode",
			"name": "Bayrell.Lang.LangNode.TranslatorNode",
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
			a.push("async_await");
			a.push("expression");
			a.push("html");
			a.push("operator");
			a.push("program");
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
});use.add(Bayrell.Lang.LangNode.TranslatorNode);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangNode == undefined) module.exports.Bayrell.Lang.LangNode = {};
module.exports.Bayrell.Lang.LangNode.TranslatorNode = Bayrell.Lang.LangNode.TranslatorNode;