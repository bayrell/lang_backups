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
Bayrell.Lang.LangBay.ParserBayOperator = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayOperator";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayOperator,
{
	/**
	 * Read return
	 */
	readReturn: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpReturn");
		var token = null;
		var op_code = null;
		var look = null;
		var res = parser.parser_base.constructor.matchToken(parser, "return");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content != ";")
		{
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			op_code = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read delete
	 */
	readDelete: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpDelete");
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "delete");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = res[0];
		op_code = res[1];
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"op_code":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read throw
	 */
	readThrow: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpThrow");
		var token = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "throw");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		op_code = res[1];
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"expression":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read try
	 */
	readTry: function(parser)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpTryCatchItem");
		var _v2 = use("Bayrell.Lang.OpCodes.OpTryCatch");
		var look = null;
		var token = null;
		var op_try = null;
		var items = new _v0();
		var res = parser.parser_base.constructor.matchToken(parser, "try");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		/* Try */
		var res = this.readOperators(parser);
		parser = res[0];
		op_try = res[1];
		/* Catch */
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == "catch")
		{
			parser = look;
			var op_catch = null;
			var var_op_code = null;
			var pattern = null;
			var item_caret_start = token.caret_start;
			/* Read ident */
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = res[0];
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = res[0];
			pattern = res[1];
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			var_op_code = res[1];
			var var_name = var_op_code.value;
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = res[0];
			/* Save vars */
			var save_vars = parser.vars;
			parser = parser.copy({ "vars": parser.vars.setIm(var_name, true) });
			/* Catch operators */
			var res = this.readOperators(parser);
			parser = res[0];
			op_catch = res[1];
			/* Restore vars */
			parser = parser.copy({ "vars": save_vars });
			var item = new _v1(use("Runtime.Dict").create({"name":var_name,"pattern":pattern,"value":op_catch,"caret_start":item_caret_start,"caret_end":parser.caret}));
			items.push(item);
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v2(use("Runtime.Dict").create({"op_try":op_try,"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read then
	 */
	readThen: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "then")
		{
			return use("Runtime.Collection").create([look,token]);
		}
		return use("Runtime.Collection").create([parser,token]);
	},
	/**
	 * Read do
	 */
	readDo: function(parser)
	{
		var look = null;
		var token = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "do")
		{
			return use("Runtime.Collection").create([look,token]);
		}
		return use("Runtime.Collection").create([parser,token]);
	},
	/**
	 * Read if
	 */
	readIf: function(parser)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpIfElse");
		var _v2 = use("Bayrell.Lang.OpCodes.OpIf");
		var look = null;
		var look2 = null;
		var token = null;
		var token2 = null;
		var if_condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new _v0();
		var res = parser.parser_base.constructor.matchToken(parser, "if");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		/* Read expression */
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = res[0];
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		if_condition = res[1];
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = res[0];
		var res = this.readThen(parser);
		parser = res[0];
		/* If true */
		var res = this.readOperators(parser);
		parser = res[0];
		if_true = res[1];
		/* Else */
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && (token.content == "else" || token.content == "elseif"))
		{
			var res = parser.parser_base.constructor.readToken(look);
			look2 = res[0];
			token2 = res[1];
			if (token2.content == "elseif" || token2.content == "if")
			{
				var ifelse_condition = null;
				var ifelse_block = null;
				if (token.content == "elseif")
				{
					parser = look;
				}
				else if (token2.content == "if")
				{
					parser = look2;
				}
				/* Read expression */
				var res = parser.parser_base.constructor.matchToken(parser, "(");
				parser = res[0];
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = res[0];
				ifelse_condition = res[1];
				var res = parser.parser_base.constructor.matchToken(parser, ")");
				parser = res[0];
				var res = this.readThen(parser);
				parser = res[0];
				var res = this.readOperators(parser);
				parser = res[0];
				ifelse_block = res[1];
				if_else.push(new _v1(use("Runtime.Dict").create({"condition":ifelse_condition,"if_true":ifelse_block,"caret_start":token2.caret_start,"caret_end":parser.caret})));
			}
			else
			{
				var res = this.readOperators(look);
				parser = res[0];
				if_false = res[1];
				break;
			}
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v2(use("Runtime.Dict").create({"condition":if_condition,"if_true":if_true,"if_false":if_false,"if_else":if_else.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read For
	 */
	readFor: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpFor");
		var look = null;
		var token = null;
		var op_code = null;
		var expr1 = null;
		var expr2 = null;
		var expr3 = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.matchToken(parser, "for");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = res[0];
		token = res[1];
		var res = this.readAssign(parser);
		parser = res[0];
		expr1 = res[1];
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = res[0];
		token = res[1];
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		expr2 = res[1];
		var res = parser.parser_base.constructor.matchToken(parser, ";");
		parser = res[0];
		token = res[1];
		var res = this.readOperator(parser);
		parser = res[0];
		expr3 = res[1];
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = res[0];
		token = res[1];
		var res = this.readOperators(parser);
		parser = res[0];
		op_code = res[1];
		/* Restore vars */
		parser = parser.copy({ "vars": save_vars });
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"expr1":expr1,"expr2":expr2,"expr3":expr3,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read While
	 */
	readWhile: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpWhile");
		var look = null;
		var token = null;
		var condition = null;
		var op_code = null;
		var res = parser.parser_base.constructor.matchToken(parser, "while");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = res[0];
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		condition = res[1];
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = res[0];
		var res = this.readDo(parser);
		parser = res[0];
		token = res[1];
		var res = this.readOperators(parser);
		parser = res[0];
		op_code = res[1];
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"condition":condition,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read assign
	 */
	readAssign: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v1 = use("Runtime.Vector");
		var _v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v3 = use("Bayrell.Lang.OpCodes.OpAssignValue");
		var _v4 = use("Bayrell.Lang.Exceptions.ParserError");
		var start = parser;
		var save = null;
		var look = null;
		var token = null;
		var pattern = null;
		var op_code = null;
		var reg_name = null;
		var expression = null;
		var names = null;
		var values = null;
		var kind = _v0.KIND_ASSIGN;
		var var_name = "";
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = res[0];
		op_code = res[1];
		var caret_start = op_code.caret_start;
		var_name = op_code.value;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "<=")
		{
			kind = _v0.KIND_STRUCT;
			var arr = new _v1();
			while (!token.eof && token.content == "<=")
			{
				parser = look;
				save = parser;
				var res = parser.parser_base.constructor.readToken(parser);
				parser = res[0];
				token = res[1];
				var name = token.content;
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content != "<=")
				{
					parser = save;
					break;
				}
				else
				{
					if (!parser.parser_base.constructor.isIdentifier(name))
					{
						throw new _v2("Identifier",save.caret,parser.file_name);
					}
					arr.push(name);
				}
			}
			names = arr.toCollection();
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			expression = res[1];
		}
		else if (token.content != "=" && token.content != "+=" && token.content != "-=" && token.content != "~=" && token.content != "." && token.content != "::" && token.content != "[")
		{
			var var_op_code = null;
			kind = _v0.KIND_DECLARE;
			values = new _v1();
			parser = start;
			var res = parser.parser_base.constructor.readTypeIdentifier(parser);
			parser = res[0];
			pattern = res[1];
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			var_op_code = res[1];
			var_name = var_op_code.value;
			/* Read expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == "=")
			{
				var res = parser.parser_expression.constructor.readExpression(look);
				parser = res[0];
				expression = res[1];
			}
			else
			{
				expression = null;
			}
			parser = parser.copy({ "vars": parser.vars.setIm(var_name, true) });
			values.push(new _v3(use("Runtime.Dict").create({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
			/* Look next token */
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content == ",")
			{
				var res = parser.parser_base.constructor.readIdentifier(look);
				parser = res[0];
				var_op_code = res[1];
				var_name = var_op_code.value;
				/* Read expression */
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content == "=")
				{
					var res = parser.parser_expression.constructor.readExpression(look);
					parser = res[0];
					expression = res[1];
				}
				else
				{
					expression = null;
				}
				parser = parser.copy({ "vars": parser.vars.setIm(var_name, true) });
				values.push(new _v3(use("Runtime.Dict").create({"var_name":var_name,"expression":expression,"caret_start":var_op_code.caret_start,"caret_end":parser.caret})));
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
			}
			var_name = "";
			expression = null;
		}
		else
		{
			parser = start;
			kind = _v0.KIND_ASSIGN;
			var op = "";
			var res = parser.parser_base.constructor.readDynamic(parser);
			parser = res[0];
			var op_code = res[1];
			var res = parser.parser_base.constructor.readToken(parser);
			parser = res[0];
			token = res[1];
			if (token.content == "=" || token.content == "+=" || token.content == "-=" || token.content == "~=")
			{
				op = token.content;
			}
			else
			{
				throw new _v4("Unknown operator " + use("Runtime.rtl").toString(token.content),token.caret_start,parser.file_name);
			}
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			expression = res[1];
			values = use("Runtime.Collection").create([new _v3(use("Runtime.Dict").create({"op_code":op_code,"expression":expression,"op":op}))]);
			var_name = "";
			expression = null;
		}
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"pattern":pattern,"values":(values != null) ? values.toCollection() : null,"caret_start":caret_start,"caret_end":parser.caret,"expression":expression,"var_name":var_name,"names":names,"kind":kind}))]);
	},
	/**
	 * Read operator
	 */
	readInc: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var _v1 = use("Bayrell.Lang.OpCodes.OpInc");
		var look = null;
		var look1 = null;
		var look2 = null;
		var token = null;
		var token1 = null;
		var token2 = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look1 = res[0];
		token1 = res[1];
		var caret_start = token1.caret_start;
		var res = parser.parser_base.constructor.readToken(look1);
		look2 = res[0];
		token2 = res[1];
		var look1_content = token1.content;
		var look2_content = token2.content;
		if ((look1_content == "++" || look1_content == "--") && parser.parser_base.constructor.isIdentifier(look2_content))
		{
			parser = look2;
			var op_code = new _v0(use("Runtime.Dict").create({"value":look2_content,"caret_start":token2.caret_start,"caret_end":token2.caret_end}));
			op_code = new _v1(use("Runtime.Dict").create({"kind":(look1_content == "++") ? _v1.KIND_PRE_INC : _v1.KIND_PRE_DEC,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return use("Runtime.Collection").create([parser,op_code]);
		}
		if ((look2_content == "++" || look2_content == "--") && parser.parser_base.constructor.isIdentifier(look1_content))
		{
			parser = look2;
			var op_code = new _v0(use("Runtime.Dict").create({"value":look1_content,"caret_start":token1.caret_start,"caret_end":token1.caret_end}));
			op_code = new _v1(use("Runtime.Dict").create({"kind":(look2_content == "++") ? _v1.KIND_POST_INC : _v1.KIND_POST_DEC,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}));
			return use("Runtime.Collection").create([parser,op_code]);
		}
		return use("Runtime.Collection").create([parser,null]);
	},
	/**
	 * Read call function
	 */
	readCallFunction: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpCall");
		var op_code = null;
		var res = parser.parser_base.constructor.readDynamic(parser);
		parser = res[0];
		op_code = res[1];
		if (op_code instanceof _v0)
		{
			return use("Runtime.Collection").create([parser,op_code]);
		}
		return use("Runtime.Collection").create([parser,null]);
	},
	/**
	 * Read operator
	 */
	readOperator: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpBreak");
		var _v1 = use("Bayrell.Lang.OpCodes.OpContinue");
		var look = null;
		var token = null;
		parser = parser.copy({ "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		parser = parser.copy({ "skip_comments": true });
		if (token.content == "/")
		{
			return parser.parser_base.constructor.readComment(parser);
		}
		else if (token.content == "#switch" || token.content == "#ifcode")
		{
			return parser.parser_preprocessor.constructor.readPreprocessor(parser);
		}
		else if (token.content == "break")
		{
			return use("Runtime.Collection").create([look,new _v0(use("Runtime.Dict").create({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "continue")
		{
			return use("Runtime.Collection").create([look,new _v1(use("Runtime.Dict").create({"caret_start":caret_start,"caret_end":look.caret}))]);
		}
		else if (token.content == "delete")
		{
			return this.readDelete(parser);
		}
		else if (token.content == "return")
		{
			return this.readReturn(parser);
		}
		else if (token.content == "throw")
		{
			return this.readThrow(parser);
		}
		else if (token.content == "try")
		{
			return this.readTry(parser);
		}
		else if (token.content == "if")
		{
			return this.readIf(parser);
		}
		else if (token.content == "for")
		{
			return this.readFor(parser);
		}
		else if (token.content == "while")
		{
			return this.readWhile(parser);
		}
		var op_code = null;
		/* Read op inc */
		var res = this.readInc(parser);
		look = res[0];
		op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		/* Read op call function */
		var res = this.readCallFunction(parser);
		look = res[0];
		op_code = res[1];
		if (op_code != null)
		{
			return res;
		}
		return this.readAssign(parser);
	},
	/**
	 * Read operators
	 */
	readOperators: function(parser)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpItems");
		var look = null;
		var token = null;
		var op_code = null;
		/* Save vars */
		var save_vars = parser.vars;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		if (token.content == "{")
		{
			var arr = new _v0();
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			parser = parser.copy({ "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			parser = parser.copy({ "skip_comments": true });
			while (!token.eof && token.content != "}")
			{
				var parser_value = null;
				var res = this.readOperator(parser);
				parser = res[0];
				parser_value = res[1];
				if (parser_value != null)
				{
					arr.push(parser_value);
				}
				parser = parser.copy({ "skip_comments": false });
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
				parser = parser.copy({ "skip_comments": true });
				if (token.content == ";")
				{
					parser = look;
					parser = parser.copy({ "skip_comments": false });
					var res = parser.parser_base.constructor.readToken(parser);
					look = res[0];
					token = res[1];
					parser = parser.copy({ "skip_comments": true });
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = res[0];
			op_code = new _v1(use("Runtime.Dict").create({"items":arr.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}));
		}
		else
		{
			var res = this.readOperator(parser);
			parser = res[0];
			op_code = res[1];
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = res[0];
		}
		/* Restore vars */
		parser = parser.copy({ "vars": save_vars });
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read flags
	 */
	readFlags: function(parser)
	{
		var _v0 = use("Runtime.Map");
		var _v1 = use("Bayrell.Lang.OpCodes.OpFlags");
		var look = null;
		var token = null;
		var values = new _v0();
		var current_flags = _v1.getFlags();
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && current_flags.indexOf(token.content) >= 0)
		{
			var flag = token.content;
			values.set("p_" + use("Runtime.rtl").toString(flag), true);
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v1(values)]);
	},
	/**
	 * Read function args
	 */
	readDeclareFunctionArgs: function(parser,find_ident)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Runtime.Dict");
		var _v2 = use("Bayrell.Lang.OpCodes.OpDeclareFunctionArg");
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new _v0();
		var res = parser.parser_base.constructor.matchToken(parser, "(");
		parser = res[0];
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != ")")
		{
			var arg_value = null;
			var arg_pattern = null;
			var arg_expression = null;
			var arg_start = parser;
			/* Arg type */
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, find_ident);
			parser = res[0];
			arg_pattern = res[1];
			/* Arg name */
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			arg_value = res[1];
			var arg_name = arg_value.value;
			/* Arg expression */
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == "=")
			{
				parser = look;
				var save_vars = parser.vars;
				parser = parser.copy({ "vars": new _v1() });
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = res[0];
				arg_expression = res[1];
				parser = parser.copy({ "vars": save_vars });
			}
			/* Register variable in parser */
			parser = parser.copy({ "vars": parser.vars.setIm(arg_name, true) });
			items.push(new _v2(use("Runtime.Dict").create({"pattern":arg_pattern,"name":arg_name,"expression":arg_expression,"caret_start":arg_pattern.caret_start,"caret_end":parser.caret})));
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
			}
		}
		var res = parser.parser_base.constructor.matchToken(parser, ")");
		parser = res[0];
		return use("Runtime.Collection").create([parser,items.toCollection()]);
	},
	/**
	 * Read function variables
	 */
	readDeclareFunctionUse: function(parser,vars,find_ident)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserError");
		if (vars == undefined) vars = null;
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var items = new _v0();
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "use")
		{
			parser = look;
			var res = parser.parser_base.constructor.matchToken(parser, "(");
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var ident = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = res[0];
				ident = res[1];
				var name = ident.value;
				if (vars != null && find_ident)
				{
					if (!vars.has(name))
					{
						throw new _v1("Unknown identifier '" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("'"),ident.caret_start,parser.file_name);
					}
				}
				items.push(name);
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look;
					var res = parser.parser_base.constructor.readToken(parser);
					look = res[0];
					token = res[1];
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ")");
			parser = res[0];
		}
		return use("Runtime.Collection").create([parser,items.toCollection()]);
	},
	/**
	 * Read function
	 */
	readDeclareFunction: function(parser,has_name)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
		if (has_name == undefined) has_name = true;
		var look = null;
		var parser_value = null;
		var op_code = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = parser.copy({ "vars": new _v0() });
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = res[0];
		parser_value = res[1];
		var caret_start = parser_value.caret_start;
		var result_type = parser_value;
		var expression = null;
		var name = "";
		if (has_name)
		{
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			parser_value = res[1];
			var name = parser_value.value;
		}
		/* Read function arguments */
		var args = null;
		var res = this.readDeclareFunctionArgs(parser);
		parser = res[0];
		args = res[1];
		/* Read function variables */
		var vars = null;
		var res = this.readDeclareFunctionUse(parser, save_vars);
		parser = res[0];
		vars = res[1];
		/* Add variables */
		vars.each((name) => 
		{
			parser = parser.copy({ "vars": parser.vars.setIm(name, true) });
		});
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "=>")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "=>");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			expression = res[1];
			op_code = null;
		}
		else if (token.content == "{")
		{
			var save = parser;
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			var res = this.readOperators(save);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == ";")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ";");
			parser = res[0];
			expression = null;
			op_code = null;
		}
		/* Restore vars */
		parser = parser.copy({ "vars": save_vars });
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"args":args,"vars":vars,"name":name,"result_type":result_type,"expression":expression,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Returns true if next is function
	 */
	tryReadFunction: function(parser,has_name,flags)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
		if (has_name == undefined) has_name = true;
		if (flags == undefined) flags = null;
		var look = null;
		var parser_value = null;
		var token = null;
		/* Clear vars */
		var save_vars = parser.vars;
		parser = parser.copy({ "vars": new _v0() });
		parser = parser.copy({ "find_ident": false });
		var res = false;
		try
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(parser, false);
			parser = res[0];
			parser_value = res[1];
			var caret_start = parser_value.caret_start;
			if (has_name)
			{
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = res[0];
			}
			var res = this.readDeclareFunctionArgs(parser, false);
			parser = res[0];
			var res = this.readDeclareFunctionUse(parser, null, false);
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			if (flags != null && flags.p_declare || parser.current_class_kind == "interface")
			{
				if (token.content != ";")
				{
					throw new _v1("Function",caret_start,parser.file_name);
				}
			}
			else if (token.content != "=>" && token.content != "{")
			{
				throw new _v1("Function",caret_start,parser.file_name);
			}
			res = true;
		}
		catch (_ex)
		{
			if (_ex instanceof _v1)
			{
				var e = _ex;
				res = false;
			}
		}
		/* Restore vars */
		parser = parser.copy({ "vars": save_vars });
		parser = parser.copy({ "find_ident": true });
		return res;
	},
	/**
	 * Read annotation
	 */
	readAnnotation: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpAnnotation");
		var look = null;
		var token = null;
		var name = null;
		var params = null;
		var res = parser.parser_base.constructor.matchToken(parser, "@");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readTypeIdentifier(parser);
		parser = res[0];
		name = res[1];
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.readDict(parser);
			parser = res[0];
			params = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"name":name,"params":params}))]);
	},
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayOperator";
	},
	getParentClassName: function()
	{
		return "";
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
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Bayrell.Lang.LangBay.ParserBayOperator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayOperator = Bayrell.Lang.LangBay.ParserBayOperator;