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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Operator = function()
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Operator.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Operator";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Operator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(t,op_code,pos)
	{
		var _v0 = use("Runtime.rs");
		if (op_code.names.count() <= pos)
		{
			return t.expression.constructor.Expression(t, op_code.expression);
		}
		var names = op_code.names.slice(0, pos).unshiftIm(op_code.var_name);
		var s = _v0.join(".", names);
		var name = op_code.names.item(pos);
		var res = this.OpAssignStruct(t, op_code, pos + 1);
		t = res[0];
		s += use("Runtime.rtl").toString(".copy({ \"" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("\": ") + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(" })"));
		return use("Runtime.Collection").create([t,s]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(t,op_code)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
		var content = new _v0();
		if (op_code.kind == _v1.KIND_ASSIGN || op_code.kind == _v1.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count();i++)
			{
				var s = "";
				var op = "=";
				var item = op_code.values.item(i);
				if (op_code.kind == _v1.KIND_DECLARE)
				{
					s = "var " + use("Runtime.rtl").toString(item.var_name);
				}
				else
				{
					var res = t.expression.constructor.Dynamic(t, item.op_code);
					t = res[0];
					s = res[1];
					op = item.op;
				}
				if (item.expression != null)
				{
					var res = t.expression.constructor.Expression(t, item.expression);
					t = res[0];
					if (op == "~=")
					{
						s += use("Runtime.rtl").toString(" += " + use("Runtime.rtl").toString(t.expression.constructor.rtlToStr(t, res[1])));
					}
					else
					{
						s += use("Runtime.rtl").toString(" " + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(res[1]));
					}
				}
				content.push(s);
			}
		}
		else if (op_code.kind == _v1.KIND_STRUCT)
		{
			var s = op_code.var_name + use("Runtime.rtl").toString(" = ");
			var res = this.OpAssignStruct(t, op_code, 0);
			t = res[0];
			content.push(s + use("Runtime.rtl").toString(res[1]));
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(t,op_code)
	{
		var content = "";
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		if (op_code.expr1 instanceof _v0)
		{
			var res = this.OpAssign(t, op_code.expr1);
			t = res[0];
			s1 = res[1][0];
		}
		else
		{
			var res = t.expression.constructor.Expression(t, op_code.expr1);
			t = res[0];
			s1 = res[1];
		}
		var res = t.expression.constructor.Expression(t, op_code.expr2);
		t = res[0];
		s2 = res[1];
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = res[0];
		s3 = res[1];
		content = "for (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";") + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(";") + use("Runtime.rtl").toString(s3) + use("Runtime.rtl").toString(")");
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t,op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content = "if (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")");
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.if_true);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = t.expression.constructor.Expression(t, if_else.condition);
			t = res[0];
			var s2 = res[1];
			content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(")")));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, if_else.if_true);
			t = res[0];
			content += use("Runtime.rtl").toString(t.s(res[1]));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
		}
		if (op_code.if_false != null)
		{
			content += use("Runtime.rtl").toString(t.s("else"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, op_code.if_false);
			t = res[0];
			content += use("Runtime.rtl").toString(t.s(res[1]));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t,op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = res[0];
			s1 = " " + use("Runtime.rtl").toString(res[1]);
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag("memorize"))
		{
			var content = "var __memorize_value = " + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";");
			content += use("Runtime.rtl").toString(t.s(t.expression.constructor.useModuleName(t, "Runtime.rtl") + use("Runtime.rtl").toString("._memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_function.name) + use("Runtime.rtl").toString("\", arguments, __memorize_value);")));
			content += use("Runtime.rtl").toString(t.s("return __memorize_value;"));
			return use("Runtime.Collection").create([t,content]);
		}
		content += use("Runtime.rtl").toString("return" + use("Runtime.rtl").toString(s1));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(t,op_code)
	{
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = res[0];
		var content = "throw " + use("Runtime.rtl").toString(res[1]);
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t,op_code)
	{
		var content = "";
		content += use("Runtime.rtl").toString("try");
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.op_try);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("catch (_ex)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		for (var i = 0;i < op_code.items.count();i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = res[0];
			pattern += use("Runtime.rtl").toString(res[1]);
			if (pattern != "var")
			{
				s = "if (_ex instanceof " + use("Runtime.rtl").toString(pattern) + use("Runtime.rtl").toString(")");
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
				s += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
			}
			s += use("Runtime.rtl").toString((s != "") ? t.s("var " + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = _ex;")) : "var " + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = _ex;"));
			var res = this.Operators(t, item.value);
			t = res[0];
			s += use("Runtime.rtl").toString(t.s(res[1]));
			if (flag || i > 0)
			{
				t = t.levelDec();
				s += use("Runtime.rtl").toString(t.s("}"));
			}
			if (i != 0)
			{
				s = "else " + use("Runtime.rtl").toString(s);
			}
			content += use("Runtime.rtl").toString(t.s(s));
		}
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t,op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content += use("Runtime.rtl").toString("while (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(t,op_code)
	{
		var _v0 = use("Runtime.rs");
		var content = "";
		if (t.preprocessor_flags.has(op_code.condition.value))
		{
			content = _v0.trim(op_code.content);
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(t,op_code)
	{
		var content = "/*" + use("Runtime.rtl").toString(op_code.value) + use("Runtime.rtl").toString("*/");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(t,comments)
	{
		var content = "";
		for (var i = 0;i < comments.count();i++)
		{
			var res = this.OpComment(t, comments.item(i));
			content += use("Runtime.rtl").toString((i == 0) ? res[1] : t.s(res[1]));
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(t,comments,content)
	{
		if (comments && comments.count() > 0)
		{
			var res = this.OpComments(t, comments);
			var s = res[1];
			if (s != "")
			{
				content = s + use("Runtime.rtl").toString(t.s(content));
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v1 = use("Bayrell.Lang.OpCodes.OpBreak");
		var _v2 = use("Bayrell.Lang.OpCodes.OpCall");
		var _v3 = use("Bayrell.Lang.OpCodes.OpContinue");
		var _v4 = use("Bayrell.Lang.OpCodes.OpDelete");
		var _v5 = use("Bayrell.Lang.OpCodes.OpFor");
		var _v6 = use("Bayrell.Lang.OpCodes.OpIf");
		var _v7 = use("Bayrell.Lang.OpCodes.OpReturn");
		var _v8 = use("Bayrell.Lang.OpCodes.OpThrow");
		var _v9 = use("Bayrell.Lang.OpCodes.OpTryCatch");
		var _v10 = use("Bayrell.Lang.OpCodes.OpWhile");
		var _v11 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var _v12 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		var _v13 = use("Bayrell.Lang.OpCodes.OpComment");
		if (op_code instanceof _v0)
		{
			return this.OpAssign(t, op_code);
		}
		else if (op_code instanceof _v1)
		{
			return use("Runtime.Collection").create([t,"break"]);
		}
		else if (op_code instanceof _v2)
		{
			return t.expression.constructor.OpCall(t, op_code);
		}
		else if (op_code instanceof _v3)
		{
			return use("Runtime.Collection").create([t,"continue"]);
		}
		else if (op_code instanceof _v4)
		{
			return this.OpDelete(t, op_code);
		}
		else if (op_code instanceof _v5)
		{
			return this.OpFor(t, op_code);
		}
		else if (op_code instanceof _v6)
		{
			return this.OpIf(t, op_code);
		}
		else if (op_code instanceof _v7)
		{
			return this.OpReturn(t, op_code);
		}
		else if (op_code instanceof _v8)
		{
			return this.OpThrow(t, op_code);
		}
		else if (op_code instanceof _v9)
		{
			return this.OpTryCatch(t, op_code);
		}
		else if (op_code instanceof _v10)
		{
			return this.OpWhile(t, op_code);
		}
		else if (op_code instanceof _v11)
		{
			return this.OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof _v12)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = this.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString((content == "") ? s : t.s(s));
			}
			return use("Runtime.Collection").create([t,content]);
		}
		else if (op_code instanceof _v13)
		{
			return this.OpComment(t, op_code);
		}
		return use("Runtime.Collection").create([t,""]);
	},
	/**
	 * Operators
	 */
	Operators: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpItems");
		var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
		var content = "";
		var f1 = (op_code) => 
		{
			var _v0 = use("Bayrell.Lang.OpCodes.OpBreak");
			var _v1 = use("Bayrell.Lang.OpCodes.OpCall");
			var _v2 = use("Bayrell.Lang.OpCodes.OpContinue");
			var _v3 = use("Bayrell.Lang.OpCodes.OpReturn");
			var _v4 = use("Bayrell.Lang.OpCodes.OpThrow");
			return op_code instanceof _v0 || op_code instanceof _v1 || op_code instanceof _v2 || op_code instanceof _v3 || op_code instanceof _v4;
		};
		if (op_code instanceof _v0)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.Operator(t, item);
				t = res[0];
				var ch = "";
				if (item instanceof _v1)
				{
					var r = res[1];
					for (var j = 0;j < r.count();j++)
					{
						var s = r.item(j);
						content += use("Runtime.rtl").toString(((i == 0 && j == 0) ? s : t.s(s)) + use("Runtime.rtl").toString(";"));
					}
				}
				else
				{
					if (f1(item))
					{
						ch = ";";
					}
					var s = (res[1] != "") ? res[1] + use("Runtime.rtl").toString(ch) : "";
					content += use("Runtime.rtl").toString((i == 0) ? s : t.s(s));
				}
			}
		}
		else
		{
			var res = this.Operator(t, op_code);
			t = res[0];
			var ch = "";
			if (op_code instanceof _v1)
			{
				var r = res[1];
				for (var j = 0;j < r.count();j++)
				{
					var s = r.item(j);
					content += use("Runtime.rtl").toString(((j == 0) ? s : t.s(s)) + use("Runtime.rtl").toString(";"));
				}
			}
			else
			{
				if (f1(op_code))
				{
					ch = ";";
				}
				var s = (res[1] != "") ? res[1] + use("Runtime.rtl").toString(ch) : "";
				content += use("Runtime.rtl").toString(s);
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(t,f)
	{
		var content = "";
		if (f.args != null)
		{
			for (var i = 0;i < f.args.count(i);i++)
			{
				var arg = f.args.item(i);
				var name = arg.name;
				content += use("Runtime.rtl").toString(((i == 0) ? "" : ",") + use("Runtime.rtl").toString(name));
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t,f)
	{
		var save_t = t;
		var content = "";
		t = t.levelInc();
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		if (f.args)
		{
			for (var i = 0;i < f.args.count();i++)
			{
				var arg = f.args.item(i);
				if (arg.expression == null)
				{
					continue;
				}
				var res = t.expression.constructor.Expression(t, arg.expression);
				t = res[0];
				var s = res[1];
				s = "if (" + use("Runtime.rtl").toString(arg.name) + use("Runtime.rtl").toString(" == undefined) ") + use("Runtime.rtl").toString(arg.name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";");
				content += use("Runtime.rtl").toString(t.s(s));
			}
		}
		if (f.value)
		{
			var res = t.operator.constructor.Operators(t, f.value);
			t = res[0];
			content += use("Runtime.rtl").toString(t.s(res[1]));
		}
		else if (f.expression)
		{
			var res = t.expression.constructor.Expression(t, f.expression);
			t = res[0];
			var expr = res[1];
			var s = "";
			if (f.flags != null && f.flags.isFlag("memorize"))
			{
				s = "var __memorize_value = " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";");
				s += use("Runtime.rtl").toString(t.s(t.expression.constructor.useModuleName(t, "Runtime.rtl") + use("Runtime.rtl").toString("._memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_function.name) + use("Runtime.rtl").toString("\", arguments, __memorize_value);")));
				s += use("Runtime.rtl").toString(t.s("return __memorize_value;"));
			}
			else
			{
				s = "return " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";");
			}
			content += use("Runtime.rtl").toString(t.s(s));
		}
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content = t.s(save + use("Runtime.rtl").toString(content));
		}
		if (f.flags != null && f.flags.isFlag("memorize"))
		{
			var s = "";
			s += use("Runtime.rtl").toString("var __memorize_value = " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, "Runtime.rtl")) + use("Runtime.rtl").toString("._memorizeValue(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_function.name) + use("Runtime.rtl").toString("\", arguments);"));
			s += use("Runtime.rtl").toString(t.s("if (__memorize_value != " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, "Runtime.rtl")) + use("Runtime.rtl").toString("._memorize_not_found) return __memorize_value;")));
			content = t.s(s + use("Runtime.rtl").toString(content));
		}
		t = t.levelDec();
		content = "{" + use("Runtime.rtl").toString(content);
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([save_t,content]);
	},
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Operator";
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
use.add(Bayrell.Lang.LangES6.TranslatorES6Operator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Operator = Bayrell.Lang.LangES6.TranslatorES6Operator;