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
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPOperator = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHPOperator"))
		{
		}
	},
	assignValue: function(__ctx,k,v)
	{
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(__ctx, t, op_code, pos)
	{
		if (pos == undefined) pos = 0;
		if (op_code.names.count(__ctx) <= pos)
		{
			return t.expression.constructor.Expression(__ctx, t, op_code.expression);
		}
		var names = op_code.names.slice(__ctx, 0, pos).unshiftIm(__ctx, op_code.var_name);
		var __v0 = use("Runtime.rs");
		var s = "$" + use("Runtime.rtl").toString(__v0.join(__ctx, "->", names));
		var name = op_code.names.item(__ctx, pos);
		var res = this.OpAssignStruct(__ctx, t, op_code, pos + 1);
		t = res[0];
		s += use("Runtime.rtl").toString("->copy($__ctx, [\"" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("\"=>") + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("])"));
		return use("Runtime.Collection").from([t,s]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(__ctx, t, op_code, flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
		var __v2 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.kind == __v0.KIND_ASSIGN || op_code.kind == __v1.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count(__ctx);i++)
			{
				var s = "";
				var op = "=";
				var item = op_code.values.item(__ctx, i);
				if (item.expression == null)
				{
					continue;
				}
				var __v2 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (op_code.kind == __v2.KIND_DECLARE)
				{
					s = "$" + use("Runtime.rtl").toString(item.var_name);
				}
				else
				{
					var res = t.expression.constructor.Dynamic(__ctx, t, item.op_code);
					t = res[0];
					s = res[1];
					op = item.op;
				}
				if (item.expression != null)
				{
					var res = t.expression.constructor.Expression(__ctx, t, item.expression);
					t = res[0];
					if (op == "~=")
					{
						s += use("Runtime.rtl").toString(" .= " + use("Runtime.rtl").toString(t.expression.constructor.rtlToStr(__ctx, t, res[1])));
					}
					else
					{
						s += use("Runtime.rtl").toString(" " + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(res[1]));
					}
				}
				content += use("Runtime.rtl").toString((flag_indent) ? t.s(__ctx, s + use("Runtime.rtl").toString(";")) : s + use("Runtime.rtl").toString(";"));
				if (item.var_name != "" && t.save_vars.indexOf(__ctx, item.var_name) == -1)
				{
					t = t.copy(__ctx, { "save_vars": t.save_vars.pushIm(__ctx, item.var_name) });
				}
			}
		}
		else if (op_code.kind == __v2.KIND_STRUCT)
		{
			var s = "$" + use("Runtime.rtl").toString(op_code.var_name) + use("Runtime.rtl").toString(" = ");
			var res = this.OpAssignStruct(__ctx, t, op_code, 0);
			t = res[0];
			content = t.s(__ctx, s + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(";"));
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(__ctx, t, op_code)
	{
		var content = "";
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(__ctx, t, op_code)
	{
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.expr1 instanceof __v0)
		{
			var res = this.OpAssign(__ctx, t, op_code.expr1, false);
			t = res[0];
			s1 = res[1];
		}
		else
		{
			var res = t.expression.constructor.Expression(__ctx, t, op_code.expr1);
			t = res[0];
			s1 = res[1];
		}
		var res = t.expression.constructor.Expression(__ctx, t, op_code.expr2);
		t = res[0];
		s2 = res[1];
		var res = t.expression.constructor.Expression(__ctx, t, op_code.expr3);
		t = res[0];
		s3 = res[1];
		content = t.s(__ctx, "for (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(";") + use("Runtime.rtl").toString(s3) + use("Runtime.rtl").toString(")"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		var res = this.Operators(__ctx, t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(__ctx, t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(__ctx, t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content = t.s(__ctx, "if (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		var res = this.Operators(__ctx, t, op_code.if_true);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		for (var i = 0;i < op_code.if_else.count(__ctx);i++)
		{
			var if_else = op_code.if_else.item(__ctx, i);
			var res = t.expression.constructor.Expression(__ctx, t, if_else.condition);
			t = res[0];
			var s2 = res[1];
			content += use("Runtime.rtl").toString(t.s(__ctx, "else if (" + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(")")));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var res = this.Operators(__ctx, t, if_else.if_true);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		}
		if (op_code.if_false != null)
		{
			content += use("Runtime.rtl").toString(t.s(__ctx, "else"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			var res = this.Operators(__ctx, t, op_code.if_false);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(__ctx, t, op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(__ctx, t, op_code.expression);
			t = res[0];
			s1 = res[1];
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag(__ctx, "memorize"))
		{
			var content = "$__memorize_value = " + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";");
			content += use("Runtime.rtl").toString(t.s(__ctx, t.expression.constructor.getModuleName(__ctx, t, "Runtime.rtl") + use("Runtime.rtl").toString("::_memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_function.name) + use("Runtime.rtl").toString("\", func_get_args(), $__memorize_value);")));
			content += use("Runtime.rtl").toString(t.s(__ctx, "return $__memorize_value;"));
			return use("Runtime.Collection").from([t,content]);
		}
		content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";")));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(__ctx, t, op_code)
	{
		var res = t.expression.constructor.Expression(__ctx, t, op_code.expression);
		t = res[0];
		var content = t.s(__ctx, "throw " + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(";"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(__ctx, t, op_code)
	{
		var content = "";
		content += use("Runtime.rtl").toString(t.s(__ctx, "try"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		var res = this.Operators(__ctx, t, op_code.op_try);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(__ctx, res[1]));
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "catch (\\Exception $_ex)"));
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		for (var i = 0;i < op_code.items.count(__ctx);i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(__ctx, i);
			var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, item.pattern);
			t = res[0];
			pattern += use("Runtime.rtl").toString(res[1]);
			if (pattern != "\\var")
			{
				s = "if ($_ex instanceof " + use("Runtime.rtl").toString(pattern) + use("Runtime.rtl").toString(")");
			}
			else
			{
				s = "";
			}
			var flag = true;
			if (s == "")
			{
				flag = false;
			}
			if (flag || i > 0)
			{
				s += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
			}
			s += use("Runtime.rtl").toString((s != "") ? t.s(__ctx, "$" + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = $_ex;")) : "$" + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = $_ex;"));
			var res = this.Operators(__ctx, t, item.value);
			t = res[0];
			s += use("Runtime.rtl").toString(res[1]);
			if (flag || i > 0)
			{
				t = t.levelDec(__ctx);
				s += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			}
			if (i != 0)
			{
				s = "else " + use("Runtime.rtl").toString(s);
			}
			content += use("Runtime.rtl").toString(t.s(__ctx, s));
		}
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(__ctx, t, op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(__ctx, t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content += use("Runtime.rtl").toString(t.s(__ctx, "while (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		var res = this.Operators(__ctx, t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(__ctx, t, op_code)
	{
		var content = "";
		if (t.preprocessor_flags.has(__ctx, op_code.condition.value))
		{
			var __v0 = use("Runtime.rs");
			content = __v0.trim(__ctx, op_code.content);
		}
		return use("Runtime.Collection").from([t,t.s(__ctx, content)]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(__ctx, t, op_code)
	{
		var content = t.s(__ctx, "/*" + use("Runtime.rtl").toString(op_code.value) + use("Runtime.rtl").toString("*/"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(__ctx, t, comments)
	{
		var content = "";
		for (var i = 0;i < comments.count(__ctx);i++)
		{
			var res = this.OpComment(__ctx, t, comments.item(__ctx, i));
			content += use("Runtime.rtl").toString(res[1]);
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(__ctx, t, comments, content)
	{
		if (comments && comments.count(__ctx) > 0)
		{
			var res = this.OpComments(__ctx, t, comments);
			var s = res[1];
			if (s != "")
			{
				content = s + use("Runtime.rtl").toString(content);
			}
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(__ctx, t, op_code)
	{
		var content = "";
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var __v1 = use("Bayrell.Lang.OpCodes.OpAssignStruct");
		var __v2 = use("Bayrell.Lang.OpCodes.OpBreak");
		var __v3 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v4 = use("Bayrell.Lang.OpCodes.OpContinue");
		var __v5 = use("Bayrell.Lang.OpCodes.OpDelete");
		var __v6 = use("Bayrell.Lang.OpCodes.OpFor");
		var __v7 = use("Bayrell.Lang.OpCodes.OpIf");
		var __v8 = use("Bayrell.Lang.OpCodes.OpPipe");
		var __v9 = use("Bayrell.Lang.OpCodes.OpReturn");
		var __v10 = use("Bayrell.Lang.OpCodes.OpThrow");
		var __v11 = use("Bayrell.Lang.OpCodes.OpTryCatch");
		var __v12 = use("Bayrell.Lang.OpCodes.OpWhile");
		var __v13 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v14 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var __v15 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		var __v16 = use("Bayrell.Lang.OpCodes.OpComment");
		if (op_code instanceof __v0)
		{
			var res = this.OpAssign(__ctx, t, op_code);
			t = res[0];
			var content = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(__ctx, t, save_op_codes.count(__ctx));
			if (save != "")
			{
				content = save + use("Runtime.rtl").toString(content);
			}
			t = t.copy(__ctx, { "save_op_codes": save_op_codes });
			t = t.copy(__ctx, { "save_op_code_inc": save_op_code_inc });
			return use("Runtime.Collection").from([t,content]);
		}
		else if (op_code instanceof __v1)
		{
			var res = this.OpAssignStruct(__ctx, t, op_code);
			t = res[0];
			var s1 = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(__ctx, t, save_op_codes.count(__ctx));
			if (save != "")
			{
				content = save;
			}
			content += use("Runtime.rtl").toString(t.s(__ctx, "$" + use("Runtime.rtl").toString(op_code.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";")));
			t = t.copy(__ctx, { "save_op_codes": save_op_codes });
			t = t.copy(__ctx, { "save_op_code_inc": save_op_code_inc });
			return use("Runtime.Collection").from([t,content]);
		}
		else if (op_code instanceof __v2)
		{
			content = t.s(__ctx, "break;");
		}
		else if (op_code instanceof __v3)
		{
			var res = t.expression.constructor.OpCall(__ctx, t, op_code);
			t = res[0];
			content = t.s(__ctx, res[1] + use("Runtime.rtl").toString(";"));
		}
		else if (op_code instanceof __v4)
		{
			content = t.s(__ctx, "continue;");
		}
		else if (op_code instanceof __v5)
		{
			var res = this.OpDelete(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v6)
		{
			var res = this.OpFor(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v7)
		{
			var res = this.OpIf(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v8)
		{
			var res = t.expression.constructor.OpPipe(__ctx, t, op_code, false);
			t = res[0];
			content = t.s(__ctx, res[1] + use("Runtime.rtl").toString(";"));
		}
		else if (op_code instanceof __v9)
		{
			var res = this.OpReturn(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v10)
		{
			var res = this.OpThrow(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v11)
		{
			var res = this.OpTryCatch(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v12)
		{
			var res = this.OpWhile(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v13)
		{
			var res = t.expression.constructor.OpInc(__ctx, t, op_code);
			t = res[0];
			content = t.s(__ctx, res[1] + use("Runtime.rtl").toString(";"));
		}
		else if (op_code instanceof __v14)
		{
			var res = this.OpPreprocessorIfCode(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v15)
		{
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var res = this.OpPreprocessorIfCode(__ctx, t, op_code.items.item(__ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString(s);
			}
		}
		else if (op_code instanceof __v16)
		{
			var res = this.OpComment(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(__ctx, t, save_op_codes.count(__ctx));
		if (save != "")
		{
			content = save + use("Runtime.rtl").toString(content);
		}
		/* Restore save op codes */
		t = t.copy(__ctx, { "save_op_codes": save_op_codes });
		t = t.copy(__ctx, { "save_op_code_inc": save_op_code_inc });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(__ctx, t, op_code)
	{
		var content = "";
		var f1 = (__ctx, op_code) => 
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpBreak");
			var __v1 = use("Bayrell.Lang.OpCodes.OpCall");
			var __v2 = use("Bayrell.Lang.OpCodes.OpContinue");
			var __v3 = use("Bayrell.Lang.OpCodes.OpReturn");
			var __v4 = use("Bayrell.Lang.OpCodes.OpThrow");
			return op_code instanceof __v0 || op_code instanceof __v1 || op_code instanceof __v2 || op_code instanceof __v3 || op_code instanceof __v4;
		};
		var __v0 = use("Bayrell.Lang.OpCodes.OpItems");
		if (op_code instanceof __v0)
		{
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var item = op_code.items.item(__ctx, i);
				var res = this.Operator(__ctx, t, item);
				t = res[0];
				content += use("Runtime.rtl").toString(res[1]);
			}
		}
		else
		{
			var res = this.Operator(__ctx, t, op_code);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(__ctx, t, f)
	{
		var content = "";
		if (f.args != null)
		{
			var flag = false;
			if (f.is_context)
			{
				content += use("Runtime.rtl").toString("$__ctx");
				flag = true;
			}
			for (var i = 0;i < f.args.count(__ctx, i);i++)
			{
				var arg = f.args.item(__ctx, i);
				var name = arg.name;
				var expr = "";
				if (arg.expression != null)
				{
					var res = t.expression.constructor.Expression(__ctx, t, arg.expression);
					t = res[0];
					expr = res[1];
				}
				content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString("$") + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(((expr != "") ? "=" + use("Runtime.rtl").toString(expr) : "")));
				flag = true;
			}
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(__ctx, t, f)
	{
		var save_t = t;
		var content = "";
		t = t.levelInc(__ctx);
		if (f.value)
		{
			var res = t.operator.constructor.Operators(__ctx, t, f.value);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t.constructor.clearSaveOpCode(__ctx, t);
			var res = t.expression.constructor.Expression(__ctx, t, f.expression);
			t = res[0];
			var expr = res[1];
			var s = "";
			if (f.flags != null && f.flags.isFlag(__ctx, "memorize"))
			{
				s = "$__memorize_value = " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";");
				s += use("Runtime.rtl").toString(t.s(__ctx, t.expression.constructor.getModuleName(__ctx, t, "Runtime.rtl") + use("Runtime.rtl").toString("::_memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("\", func_get_args(), $__memorize_value);")));
				s += use("Runtime.rtl").toString(t.s(__ctx, "return $__memorize_value;"));
			}
			else
			{
				s = t.s(__ctx, "return " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(__ctx, t);
			if (save != "")
			{
				content += use("Runtime.rtl").toString(save);
			}
			content += use("Runtime.rtl").toString(s);
		}
		if (f.flags != null && f.flags.isFlag(__ctx, "memorize"))
		{
			var s = "";
			s += use("Runtime.rtl").toString(t.s(__ctx, "$__memorize_value = " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(__ctx, t, "Runtime.rtl")) + use("Runtime.rtl").toString("::_memorizeValue(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("\", func_get_args());")));
			s += use("Runtime.rtl").toString(t.s(__ctx, "if ($__memorize_value != " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(__ctx, t, "Runtime.rtl")) + use("Runtime.rtl").toString("::$_memorize_not_found) return $__memorize_value;")));
			content = s + use("Runtime.rtl").toString(content);
		}
		t = t.levelDec(__ctx);
		content = t.s(__ctx, "{") + use("Runtime.rtl").toString(content);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPOperator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPOperator = Bayrell.Lang.LangPHP.TranslatorPHPOperator;