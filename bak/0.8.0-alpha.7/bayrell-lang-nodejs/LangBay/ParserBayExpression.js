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
Bayrell.Lang.LangBay.ParserBayExpression = function(/*__ctx*/)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayExpression"))
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
		return "Bayrell.Lang.LangBay.ParserBayExpression";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayExpression,
{
	/**
	 * Read bit not
	 */
	readBitNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		if (token.content == "!")
		{
			var op_code = null;
			var res = parser.parser_base.constructor.readBaseItem(look.clone());
			parser = res[0];
			op_code = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"value1":op_code,"math":"!","caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
		}
		return parser.parser_base.constructor.readBaseItem(parser);
	},
	/**
	 * Read bit shift
	 */
	readBitShift: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitNot(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == ">>" || token.content == "<<"))
		{
			math = token.content;
			var res = this.readBitNot(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read bit and
	 */
	readBitAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitShift(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "&")
		{
			math = token.content;
			var res = this.readBitShift(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read bit or
	 */
	readBitOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitAnd(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "|" || token.content == "xor"))
		{
			math = token.content;
			var res = this.readBitAnd(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read factor
	 */
	readFactor: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readBitOr(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "*" || token.content == "/" || token.content == "%" || token.content == "div" || token.content == "mod"))
		{
			math = token.content;
			var res = this.readBitOr(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read arithmetic
	 */
	readArithmetic: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readFactor(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "+" || token.content == "-"))
		{
			math = token.content;
			var res = this.readFactor(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read concat
	 */
	readConcat: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readArithmetic(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "~")
		{
			math = token.content;
			var res = this.readArithmetic(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read compare
	 */
	readCompare: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readConcat(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var content = token.content;
		if (content == "===" || content == "!==" || content == "==" || content == "!=" || content == ">=" || content == "<=" || content == ">" || content == "<")
		{
			var math = token.content;
			var res = this.readConcat(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone()}));
			parser = look.clone();
		}
		else if (content == "is" || content == "implements" || content == "instanceof")
		{
			var math = token.content;
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":math,"caret_start":caret_start,"caret_end":parser.caret.clone()}));
			parser = look.clone();
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read not
	 */
	readNot: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		if (token.content == "not")
		{
			var op_code = null;
			var start = parser.clone();
			var res = this.readCompare(look.clone());
			parser = res[0];
			op_code = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"value1":op_code,"math":"not","caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
		}
		return this.readCompare(parser);
	},
	/**
	 * Read and
	 */
	readAnd: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readNot(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "and" || token.content == "&&"))
		{
			math = token.content;
			var res = this.readNot(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":"and","caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read or
	 */
	readOr: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var look_value = null;
		var res = this.readAnd(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var math = "";
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "or" || token.content == "||"))
		{
			math = token.content;
			var res = this.readAnd(look);
			look = res[0];
			look_value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpMath");
			op_code = new __v0(use("Runtime.Dict").create({"value1":op_code,"value2":look_value,"math":"or","caret_start":caret_start,"caret_end":look.caret.clone()}));
			parser = look.clone();
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read element
	 */
	readElement: function(parser)
	{
		/* Try to read function */
		if (parser.parser_operator.constructor.tryReadFunction(parser.clone(), false))
		{
			return parser.parser_operator.constructor.readDeclareFunction(parser, false);
		}
		return this.readOr(parser);
	},
	/**
	 * Read ternary operation
	 */
	readTernary: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var res = this.readElement(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start.clone();
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "?")
		{
			condition = op_code;
			var res = this.readOr(look);
			parser = res[0];
			if_true = res[1];
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
			if (token.content == ":")
			{
				var res = this.readOr(look);
				parser = res[0];
				if_false = res[1];
			}
			var __v0 = use("Bayrell.Lang.OpCodes.OpTernary");
			op_code = new __v0(use("Runtime.Dict").create({"condition":condition,"if_true":if_true,"if_false":if_false,"caret_start":caret_start,"caret_end":parser.caret.clone()}));
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read expression
	 */
	readExpression: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			return parser.parser_html.constructor.readHTML(parser);
		}
		if (token.content == "@css")
		{
			return parser.parser_html.constructor.readCss(parser);
		}
		return this.readTernary(parser);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayExpression";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayExpression",
			"name": "Bayrell.Lang.LangBay.ParserBayExpression",
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
});use.add(Bayrell.Lang.LangBay.ParserBayExpression);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayExpression = Bayrell.Lang.LangBay.ParserBayExpression;