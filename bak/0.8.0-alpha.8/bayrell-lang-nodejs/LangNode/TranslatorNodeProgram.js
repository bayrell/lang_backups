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
Bayrell.Lang.LangNode.TranslatorNodeProgram = function(__ctx)
{
	use("Bayrell.Lang.LangES6.TranslatorES6Program").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype = Object.create(use("Bayrell.Lang.LangES6.TranslatorES6Program").prototype);
Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeProgram;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangNode.TranslatorNodeProgram"))
		{
		}
		use("Bayrell.Lang.LangES6.TranslatorES6Program").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Bayrell.Lang.LangES6.TranslatorES6Program").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Bayrell.Lang.LangES6.TranslatorES6Program").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeProgram";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram, use("Bayrell.Lang.LangES6.TranslatorES6Program"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeProgram,
{
	/**
	 * Translate program
	 */
	translateProgramHeader: function(__ctx, t, op_code)
	{
		var content = "\"use strict;\"";
		content += use("Runtime.rtl").toString(t.s(__ctx, "var use = require('bayrell').use;"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(__ctx, t, op_code)
	{
		var content = "";
		var name = "";
		content += use("Runtime.rtl").toString("use.add(" + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(");"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "if (module.exports == undefined) module.exports = {};"));
		var __v0 = use("Runtime.rs");
		var arr = __v0.split(__ctx, "\\.", t.current_namespace_name);
		for (var i = 0;i < arr.count(__ctx);i++)
		{
			name = name + use("Runtime.rtl").toString(((i == 0) ? "" : ".")) + use("Runtime.rtl").toString(arr.item(__ctx, i));
			var s = "if (module.exports." + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(" == undefined) module.exports.") + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(" = {};");
			content += use("Runtime.rtl").toString((content == 0) ? s : t.s(__ctx, s));
		}
		content += use("Runtime.rtl").toString(t.s(__ctx, "module.exports." + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(";")));
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeProgram";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNodeProgram",
			"name": "Bayrell.Lang.LangNode.TranslatorNodeProgram",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangNode.TranslatorNodeProgram);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangNode == undefined) module.exports.Bayrell.Lang.LangNode = {};
module.exports.Bayrell.Lang.LangNode.TranslatorNodeProgram = Bayrell.Lang.LangNode.TranslatorNodeProgram;