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
Bayrell.Lang.LangES6.TranslatorES6Expression = function(__ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6Expression.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.LangES6.TranslatorES6Expression.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6Expression;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6Expression"))
		{
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Runtime.CoreStruct").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Expression,
{
	/**
	 * Returns string
	 */
	toString: function(__ctx, s)
	{
		var __v0 = use("Runtime.re");
		s = __v0.replace(__ctx, "\\\\", "\\\\", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace(__ctx, "\"", "\\\"", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace(__ctx, "\n", "\\n", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace(__ctx, "\r", "\\r", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace(__ctx, "\t", "\\t", s);
		return "\"" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(__ctx, t, pattern)
	{
		var names = this.findModuleNames(__ctx, t, pattern.entity_name.names);
		var __v0 = use("Runtime.rs");
		var e = __v0.join(__ctx, ".", names);
		var a = (pattern.template != null) ? pattern.template.map(__ctx, (__ctx, pattern) => 
		{
			return this.toPattern(__ctx, t, pattern);
		}) : null;
		var __v0 = use("Runtime.rs");
		var b = (a != null) ? ",\"t\":[" + use("Runtime.rtl").toString(__v0.join(__ctx, ",", a)) + use("Runtime.rtl").toString("]") : "";
		return "{\"e\":" + use("Runtime.rtl").toString(this.toString(__ctx, e)) + use("Runtime.rtl").toString(b) + use("Runtime.rtl").toString("}");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(__ctx, t, s)
	{
		var module_name = this.findModuleName(__ctx, t, "rtl");
		return module_name + use("Runtime.rtl").toString(".toString(") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(__ctx, t, module_name)
	{
		if (module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if (module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if (module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if (module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if (module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if (module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if (module_name == "ArrayInterface")
		{
			return "";
		}
		else if (t.modules.has(__ctx, module_name))
		{
			return t.modules.item(__ctx, module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(__ctx, t, names)
	{
		if (names.count(__ctx) > 0)
		{
			var module_name = names.first(__ctx);
			module_name = this.findModuleName(__ctx, t, module_name);
			if (module_name != "")
			{
				names = names.setIm(__ctx, 0, module_name);
			}
		}
		return names;
	},
	/**
	 * Use module name
	 */
	useModuleName: function(__ctx, t, module_name)
	{
		module_name = this.findModuleName(__ctx, t, module_name);
		return module_name;
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(__ctx, t, op_code)
	{
		var names = this.findModuleNames(__ctx, t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = __v0.join(__ctx, ".", names);
		return use("Runtime.Collection").from([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(__ctx, t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (t.modules.has(__ctx, op_code.value) || op_code.kind == __v0.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(__ctx, t, module_name);
			return use("Runtime.Collection").from([t,new_module_name]);
		}
		var content = op_code.value;
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(__ctx, t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + use("Runtime.rtl").toString(content);
			t = t.copy(__ctx, { "opcode_level": 15 });
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(__ctx, t, op_code)
	{
		return use("Runtime.Collection").from([t,this.toString(__ctx, op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.map(__ctx, (__ctx, op_code) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		var module_name = this.findModuleName(__ctx, t, "Collection");
		var __v0 = use("Runtime.rs");
		content = module_name + use("Runtime.rtl").toString(".from([") + use("Runtime.rtl").toString(__v0.join(__ctx, ",", values)) + use("Runtime.rtl").toString("])");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(__ctx, t, op_code)
	{
		var content = "";
		var values = op_code.values.transition(__ctx, (__ctx, op_code, key) => 
		{
			var res = this.Expression(__ctx, t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(__ctx, key) + use("Runtime.rtl").toString(":") + use("Runtime.rtl").toString(s);
		});
		var module_name = this.findModuleName(__ctx, t, "Dict");
		var __v0 = use("Runtime.rs");
		content = module_name + use("Runtime.rtl").toString(".from({") + use("Runtime.rtl").toString(__v0.join(__ctx, ",", values)) + use("Runtime.rtl").toString("})");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(__ctx, t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
		var __v2 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v3 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code instanceof __v0)
		{
			return this.OpIdentifier(__ctx, t, op_code);
		}
		else if (op_code instanceof __v1)
		{
			var __v2 = use("Runtime.Vector");
			var attrs = new __v2(__ctx);
			var op_code_item = op_code;
			var op_code_first = op_code;
			var prev_kind = "";
			var s = "";
			var __v2 = use("Bayrell.Lang.OpCodes.OpAttr");
			while (op_code_first instanceof __v2)
			{
				attrs.push(__ctx, op_code_first);
				op_code_item = op_code_first;
				op_code_first = op_code_first.obj;
			}
			attrs = attrs.reverseIm(__ctx);
			var __v2 = use("Bayrell.Lang.OpCodes.OpCall");
			var __v3 = use("Bayrell.Lang.OpCodes.OpNew");
			var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			if (op_code_first instanceof __v2)
			{
				prev_kind = "var";
				var res = this.OpCall(__ctx, t, op_code_first);
				t = res[0];
				s = res[1];
			}
			else if (op_code_first instanceof __v3)
			{
				prev_kind = "var";
				var res = this.OpNew(__ctx, t, op_code_first);
				t = res[0];
				s = "(" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(")");
			}
			else if (op_code_first instanceof __v4)
			{
				var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (t.modules.has(__ctx, op_code_first.value) || op_code_first.kind == __v5.KIND_SYS_TYPE)
				{
					prev_kind = "static";
					var res = this.OpIdentifier(__ctx, t, op_code_first);
					t = res[0];
					s = res[1];
				}
				else if (op_code_first.kind == __v6.KIND_CLASSREF)
				{
					if (op_code_first.value == "static")
					{
						s = "this" + use("Runtime.rtl").toString(((!t.is_static_function) ? ".constructor" : ""));
						prev_kind = "static";
					}
					else if (op_code_first.value == "self")
					{
						prev_kind = "static";
						s = t.current_class_full_name;
					}
					else if (op_code_first.value == "this")
					{
						prev_kind = "var";
						s = "this";
					}
				}
				else
				{
					prev_kind = "var";
					s = op_code_first.value;
				}
			}
			for (var i = 0;i < attrs.count(__ctx);i++)
			{
				var attr = attrs.item(__ctx, i);
				var __v2 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v3 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v4 = use("Bayrell.Lang.OpCodes.OpAttr");
				if (attr.kind == __v2.KIND_ATTR)
				{
					s += use("Runtime.rtl").toString("." + use("Runtime.rtl").toString(attr.value.value));
				}
				else if (attr.kind == __v3.KIND_STATIC)
				{
					if (prev_kind == "var")
					{
						s += use("Runtime.rtl").toString(".constructor." + use("Runtime.rtl").toString(attr.value.value));
					}
					else
					{
						s += use("Runtime.rtl").toString("." + use("Runtime.rtl").toString(attr.value.value));
					}
					prev_kind = "static";
				}
				else if (attr.kind == __v4.KIND_DYNAMIC)
				{
					var res = this.Expression(__ctx, t, attr.value);
					t = res[0];
					s += use("Runtime.rtl").toString("[" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("]"));
				}
			}
			return use("Runtime.Collection").from([t,s]);
		}
		else if (op_code instanceof __v2)
		{
			return this.OpCall(__ctx, t, op_code);
		}
		else if (op_code instanceof __v3)
		{
			return this.OpPipe(__ctx, t, op_code);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(__ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(__ctx, t, op_code.value);
		t = res[0];
		var s = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v1 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v2 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v3 = use("Bayrell.Lang.OpCodes.OpInc");
		if (op_code.kind == __v0.KIND_PRE_INC)
		{
			content = "++" + use("Runtime.rtl").toString(s);
		}
		else if (op_code.kind == __v1.KIND_PRE_DEC)
		{
			content = "--" + use("Runtime.rtl").toString(s);
		}
		else if (op_code.kind == __v2.KIND_POST_INC)
		{
			content = s + use("Runtime.rtl").toString("++");
		}
		else if (op_code.kind == __v3.KIND_POST_DEC)
		{
			content = s + use("Runtime.rtl").toString("--");
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(__ctx, t, op_code)
	{
		var res = this.Expression(__ctx, t, op_code.value1);
		t = res[0];
		var opcode_level1 = res[0].opcode_level;
		var s1 = res[1];
		var op = "";
		var op_math = op_code.math;
		var opcode_level = 0;
		if (op_code.math == "!")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == ">>")
		{
			opcode_level = 12;
			op = ">>";
		}
		if (op_code.math == "<<")
		{
			opcode_level = 12;
			op = "<<";
		}
		if (op_code.math == "&")
		{
			opcode_level = 9;
			op = "&";
		}
		if (op_code.math == "xor")
		{
			opcode_level = 8;
			op = "^";
		}
		if (op_code.math == "|")
		{
			opcode_level = 7;
			op = "|";
		}
		if (op_code.math == "*")
		{
			opcode_level = 14;
			op = "*";
		}
		if (op_code.math == "/")
		{
			opcode_level = 14;
			op = "/";
		}
		if (op_code.math == "%")
		{
			opcode_level = 14;
			op = "%";
		}
		if (op_code.math == "div")
		{
			opcode_level = 14;
			op = "div";
		}
		if (op_code.math == "mod")
		{
			opcode_level = 14;
			op = "mod";
		}
		if (op_code.math == "+")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "-")
		{
			opcode_level = 13;
			op = "-";
		}
		if (op_code.math == "~")
		{
			opcode_level = 13;
			op = "+";
		}
		if (op_code.math == "!")
		{
			opcode_level = 13;
			op = "!";
		}
		if (op_code.math == "===")
		{
			opcode_level = 10;
			op = "===";
		}
		if (op_code.math == "!==")
		{
			opcode_level = 10;
			op = "!==";
		}
		if (op_code.math == "==")
		{
			opcode_level = 10;
			op = "==";
		}
		if (op_code.math == "!=")
		{
			opcode_level = 10;
			op = "!=";
		}
		if (op_code.math == ">=")
		{
			opcode_level = 10;
			op = ">=";
		}
		if (op_code.math == "<=")
		{
			opcode_level = 10;
			op = "<=";
		}
		if (op_code.math == ">")
		{
			opcode_level = 10;
			op = ">";
		}
		if (op_code.math == "<")
		{
			opcode_level = 10;
			op = "<";
		}
		if (op_code.math == "is")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "instanceof")
		{
			opcode_level = 10;
			op = "instanceof";
		}
		if (op_code.math == "implements")
		{
			opcode_level = 10;
			op = "implements";
		}
		if (op_code.math == "not")
		{
			opcode_level = 16;
			op = "!";
		}
		if (op_code.math == "and")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "&&")
		{
			opcode_level = 6;
			op = "&&";
		}
		if (op_code.math == "or")
		{
			opcode_level = 5;
			op = "||";
		}
		if (op_code.math == "||")
		{
			opcode_level = 5;
			op = "||";
		}
		var content = "";
		if (op_code.math == "!" || op_code.math == "not")
		{
			content = op + use("Runtime.rtl").toString(t.o(__ctx, s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(__ctx, t, op_code.value2);
			t = res[0];
			var opcode_level2 = res[0].opcode_level;
			var s2 = res[1];
			var op1 = t.o(__ctx, s1, opcode_level1, opcode_level);
			var op2 = t.o(__ctx, s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(this.rtlToStr(__ctx, t, op2));
			}
			else if (op_math == "implements")
			{
				var rtl_name = this.findModuleName(__ctx, t, "rtl");
				content = rtl_name + use("Runtime.rtl").toString(".is_implements(") + use("Runtime.rtl").toString(op1) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(op2) + use("Runtime.rtl").toString(")");
			}
			else
			{
				content = op1 + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(op2);
			}
		}
		t = t.copy(__ctx, { "opcode_level": opcode_level });
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(__ctx, t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(__ctx, t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		var flag = false;
		content += use("Runtime.rtl").toString("(");
		if (t.current_function == null || t.current_function.is_context)
		{
			content += use("Runtime.rtl").toString("__ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = t.expression.constructor.Expression(__ctx, t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s));
			flag = true;
		}
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(__ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		if (t.current_function.isFlag(__ctx, "async") && op_code.is_await)
		{
			return t.async_await.constructor.OpCall(__ctx, t, op_code, is_expression);
		}
		var s = "";
		var flag = false;
		var res = t.expression.constructor.Dynamic(__ctx, t, op_code.obj);
		t = res[0];
		s = res[1];
		if (s == "parent")
		{
			s = this.useModuleName(__ctx, t, t.current_class_extends_name);
			if (t.current_function.name != "constructor")
			{
				if (t.current_function.isStatic(__ctx))
				{
					s += use("Runtime.rtl").toString("." + use("Runtime.rtl").toString(t.current_function.name));
				}
				else
				{
					s += use("Runtime.rtl").toString(".prototype." + use("Runtime.rtl").toString(t.current_function.name));
				}
			}
			s += use("Runtime.rtl").toString(".call(this");
			flag = true;
		}
		else
		{
			s += use("Runtime.rtl").toString("(");
		}
		var content = s;
		if (t.current_function.is_context && op_code.is_context)
		{
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString("__ctx"));
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = t.expression.constructor.Expression(__ctx, t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s));
			flag = true;
		}
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(__ctx, t, op_code, is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		if (t.current_function.isFlag(__ctx, "async") && op_code.is_await)
		{
			return t.async_await.constructor.OpPipe(__ctx, t, op_code, is_expression);
		}
		var content = "";
		var res = t.expression.constructor.Expression(__ctx, t, op_code.obj);
		t = res[0];
		var res = t.constructor.addSaveOpCode(__ctx, t, use("Runtime.Dict").from({"op_code":op_code.obj,"var_content":res[1]}));
		t = res[0];
		var var_name = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code.kind == __v0.KIND_METHOD)
		{
			content = var_name + use("Runtime.rtl").toString(".constructor.") + use("Runtime.rtl").toString(op_code.method_name.value);
		}
		else
		{
			var res = this.OpTypeIdentifier(__ctx, t, op_code.class_name);
			t = res[0];
			content = res[1] + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(op_code.method_name.value);
		}
		var flag = false;
		content += use("Runtime.rtl").toString("(");
		if (t.current_function.is_context && op_code.is_context)
		{
			content += use("Runtime.rtl").toString("__ctx");
			flag = true;
		}
		for (var i = 0;i < op_code.args.count(__ctx);i++)
		{
			var item = op_code.args.item(__ctx, i);
			var res = t.expression.constructor.Expression(__ctx, t, item);
			t = res[0];
			var s1 = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s1));
			flag = true;
		}
		content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(var_name));
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(__ctx, t, op_code)
	{
		var names = this.findModuleNames(__ctx, t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = __v0.join(__ctx, ".", names);
		return use("Runtime.Collection").from([t,this.toString(__ctx, s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(__ctx, t, op_code)
	{
		var content = "";
		t = t.copy(__ctx, { "opcode_level": 100 });
		var res = t.expression.constructor.Expression(__ctx, t, op_code.condition);
		t = res[0];
		var condition = res[1];
		var res = t.expression.constructor.Expression(__ctx, t, op_code.if_true);
		t = res[0];
		var if_true = res[1];
		var res = t.expression.constructor.Expression(__ctx, t, op_code.if_false);
		t = res[0];
		var if_false = res[1];
		content += use("Runtime.rtl").toString("(" + use("Runtime.rtl").toString(condition) + use("Runtime.rtl").toString(") ? ") + use("Runtime.rtl").toString(if_true) + use("Runtime.rtl").toString(" : ") + use("Runtime.rtl").toString(if_false));
		t = t.copy(__ctx, { "opcode_level": 11 });
		/* OpTernary */
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(__ctx, t, op_code)
	{
		var content = "";
		var res = this.Expression(__ctx, t, op_code.value);
		t = res[0];
		var value = res[1];
		content = this.useModuleName(__ctx, t, "rtl") + use("Runtime.rtl").toString(".to(") + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(this.toPattern(__ctx, t, op_code.pattern)) + use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpTernary
	 */
	OpDeclareFunction: function(__ctx, t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = t.copy(__ctx, { "current_function": op_code });
		var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, op_code);
		var args = res[1];
		content += use("Runtime.rtl").toString("(" + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(") => "));
		var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		/* Restore function */
		t = t.copy(__ctx, { "current_function": save_f });
		/* OpTernary */
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(__ctx, t, op_code)
	{
		var content = "";
		t = t.copy(__ctx, { "opcode_level": 100 });
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpNumber");
		var __v3 = use("Bayrell.Lang.OpCodes.OpString");
		var __v4 = use("Bayrell.Lang.OpCodes.OpCollection");
		var __v5 = use("Bayrell.Lang.OpCodes.OpDict");
		var __v6 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v7 = use("Bayrell.Lang.OpCodes.OpMath");
		var __v8 = use("Bayrell.Lang.OpCodes.OpNew");
		var __v9 = use("Bayrell.Lang.OpCodes.OpAttr");
		var __v10 = use("Bayrell.Lang.OpCodes.OpPipe");
		var __v11 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v12 = use("Bayrell.Lang.OpCodes.OpClassOf");
		var __v13 = use("Bayrell.Lang.OpCodes.OpTernary");
		var __v14 = use("Bayrell.Lang.OpCodes.OpTypeConvert");
		var __v15 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
		var __v16 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		if (op_code instanceof __v0)
		{
			var res = this.OpIdentifier(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v1)
		{
			var res = this.OpTypeIdentifier(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v2)
		{
			var res = this.OpNumber(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v3)
		{
			var res = this.OpString(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v4)
		{
			var res = this.OpCollection(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v5)
		{
			var res = this.OpDict(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v6)
		{
			t = t.copy(__ctx, { "opcode_level": 16 });
			var res = this.OpInc(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v7)
		{
			var res = this.OpMath(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v8)
		{
			var res = this.OpNew(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v9 || op_code instanceof __v10)
		{
			var res = this.Dynamic(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v11)
		{
			var res = this.OpCall(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v12)
		{
			var res = this.OpClassOf(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v13)
		{
			var res = this.OpTernary(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v14)
		{
			var res = this.OpTypeConvert(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v15)
		{
			var res = this.OpDeclareFunction(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v16)
		{
			var res = t.html.constructor.OpHtmlItems(__ctx, t, op_code);
			t = res[0];
			content = res[1];
		}
		return use("Runtime.Collection").from([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Expression",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Expression",
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6Expression);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Expression = Bayrell.Lang.LangES6.TranslatorES6Expression;