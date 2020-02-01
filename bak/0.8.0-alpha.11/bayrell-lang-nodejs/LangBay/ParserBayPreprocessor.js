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
Bayrell.Lang.LangBay.ParserBayPreprocessor = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayPreprocessor"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor,
{
	/**
	 * Read namespace
	 */
	readPreprocessor: function(ctx, parser)
	{
		var start = parser.clone(ctx);
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		if (token.content == "#switch")
		{
			return this.readPreprocessorSwitch(ctx, start);
		}
		return null;
	},
	/**
	 * Read preprocessor switch
	 */
	readPreprocessorSwitch: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		/* Save vars */
		var save_vars = parser.vars;
		parser = parser.copy(ctx, { "vars": parser.vars.concat(ctx, use("Runtime.Dict").from({"ES6":true,"NODEJS":true,"JAVASCRIPT":true,"PHP":true,"PYTHON3":true})) });
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "#switch");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
		look = res[0];
		token = res[1];
		while (token.content == "#case")
		{
			parser = look.clone(ctx);
			/* Skip ifcode */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			if (token.content == "ifcode")
			{
				parser = look.clone(ctx);
			}
			/* Read condition */
			var condition = null;
			parser = parser.copy(ctx, { "find_ident": false });
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = res[0];
			condition = res[1];
			parser = parser.copy(ctx, { "find_ident": true });
			/* Read then */
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "then");
			parser = res[0];
			token = res[1];
			/* Read content */
			var content = "";
			var caret_content = parser.caret.clone(ctx);
			var res = parser.parser_base.constructor.readUntilStringArr(ctx, parser, use("Runtime.Collection").from(["#case","#endswitch"]), false);
			parser = res[0];
			content = res[1];
			/* Look content */
			var res = parser.parser_base.constructor.readToken(ctx, parser.clone(ctx));
			look = res[0];
			token = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
			var ifcode = new __v0(ctx, use("Runtime.Dict").from({"condition":condition,"content":content,"caret_start":caret_content,"caret_end":parser.caret.clone(ctx)}));
			items.push(ctx, ifcode);
		}
		/* Restore vars */
		parser = parser.copy(ctx, { "vars": save_vars });
		/* read endswitch */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "#endswitch");
		parser = res[0];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"items":items.toCollection(ctx),"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/**
	 * Read preprocessor ifdef
	 */
	readPreprocessorIfDef: function(ctx, parser, kind)
	{
		if (kind == undefined) kind = "";
		var items = null;
		var token = null;
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "#ifdef");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone(ctx);
		/* Read condition */
		var condition = null;
		parser = parser.copy(ctx, { "find_ident": false });
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = res[0];
		condition = res[1];
		parser = parser.copy(ctx, { "find_ident": true });
		/* Read then */
		var res = parser.parser_base.constructor.matchToken(ctx, parser, "then");
		parser = res[0];
		token = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
		var __v1 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
		if (kind == __v0.KIND_PROGRAM)
		{
			var res = parser.parser_program.constructor.readProgram(ctx, parser, "#endif");
			parser = res[0];
			items = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "#endif");
			parser = res[0];
		}
		else if (kind == __v1.KIND_CLASS_BODY)
		{
			var res = parser.parser_program.constructor.readClassBody(ctx, parser, "#endif");
			parser = res[0];
			items = res[1];
			var res = parser.parser_base.constructor.matchToken(ctx, parser, "#endif");
			parser = res[0];
			var d = parser.parser_program.constructor.classBodyAnalyze(ctx, parser, items);
			items = d.item(ctx, "functions");
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"items":items,"condition":condition,"caret_start":caret_start,"caret_end":parser.caret.clone(ctx)}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayPreprocessor);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayPreprocessor = Bayrell.Lang.LangBay.ParserBayPreprocessor;