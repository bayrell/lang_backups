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
Bayrell.Lang.LangBay.ParserBayPreprocessor = function(/*__ctx*/)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayPreprocessor"))
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayPreprocessor";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayPreprocessor,
{
	/**
	 * Read namespace
	 */
	readPreprocessor: function(parser)
	{
		var start = parser.clone();
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "#switch")
		{
			return this.readPreprocessorSwitch(start);
		}
		return null;
	},
	/**
	 * Read preprocessor switch
	 */
	readPreprocessorSwitch: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0();
		/* Save vars */
		var save_vars = parser.vars;
		parser = parser.copy({ "vars": parser.vars.concat(use("Runtime.Dict").create({"ES6":true,"NODEJS":true,"JAVASCRIPT":true,"PHP":true,"PYTHON3":true})) });
		var res = parser.parser_base.constructor.matchToken(parser, "#switch");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (token.content == "#case")
		{
			parser = look.clone();
			/* Skip ifcode */
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
			if (token.content == "ifcode")
			{
				parser = look.clone();
			}
			/* Read condition */
			var condition = null;
			parser = parser.copy({ "find_ident": false });
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			condition = res[1];
			parser = parser.copy({ "find_ident": true });
			/* Read then */
			var res = parser.parser_base.constructor.matchToken(parser, "then");
			parser = res[0];
			token = res[1];
			/* Read content */
			var content = "";
			var caret_content = parser.caret.clone();
			var res = parser.parser_base.constructor.readUntilStringArr(parser, use("Runtime.Collection").create(["#case","#endswitch"]), false);
			parser = res[0];
			content = res[1];
			/* Look content */
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
			var ifcode = new __v0(use("Runtime.Dict").create({"condition":condition,"content":content,"caret_start":caret_content,"caret_end":parser.caret.clone()}));
			items.push(ifcode);
		}
		/* Restore vars */
		parser = parser.copy({ "vars": save_vars });
		/* read endswitch */
		var res = parser.parser_base.constructor.matchToken(parser, "#endswitch");
		parser = res[0];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
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
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"name": "Bayrell.Lang.LangBay.ParserBayPreprocessor",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
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
});use.add(Bayrell.Lang.LangBay.ParserBayPreprocessor);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayPreprocessor = Bayrell.Lang.LangBay.ParserBayPreprocessor;