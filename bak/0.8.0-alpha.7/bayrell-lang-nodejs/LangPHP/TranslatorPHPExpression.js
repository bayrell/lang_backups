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
Bayrell.Lang.LangPHP.TranslatorPHPExpression = function(/*__ctx*/)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHPExpression"))
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPExpression,
{
	/**
	 * Returns string
	 */
	toString: function(s)
	{
		var __v0 = use("Runtime.re");
		s = __v0.replace("\\\\", "\\\\", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace("\"", "\\\"", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace("\n", "\\n", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace("\r", "\\r", s);
		var __v0 = use("Runtime.re");
		s = __v0.replace("\t", "\\t", s);
		return "\"" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString("\"");
	},
	/**
	 * To pattern
	 */
	toPattern: function(t, pattern)
	{
		var names = this.findModuleNames(t, pattern.entity_name.names);
		var __v0 = use("Runtime.rs");
		var e = __v0.join(".", names);
		var a = (pattern.template != null) ? pattern.template.map((pattern) => 
		{
			return this.toPattern(t, pattern);
		}) : null;
		var __v0 = use("Runtime.rs");
		var b = (a != null) ? ",\"t\":[" + use("Runtime.rtl").toString(__v0.join(",", a)) + use("Runtime.rtl").toString("]") : "";
		return "[\"e\"=>" + use("Runtime.rtl").toString(this.toString(e)) + use("Runtime.rtl").toString(b) + use("Runtime.rtl").toString("]");
	},
	/**
	 * Returns string
	 */
	rtlToStr: function(t, s)
	{
		var module_name = this.getModuleName(t, "rtl");
		return module_name + use("Runtime.rtl").toString("::toString(") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(")");
	},
	/**
	 * Find module name
	 */
	findModuleName: function(t, module_name)
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
			return "ArrayAccess";
		}
		else if (t.modules.has(module_name))
		{
			return t.modules.item(module_name);
		}
		return module_name;
	},
	/**
	 * Returns module name
	 */
	findModuleNames: function(t, names)
	{
		if (names.count() > 0)
		{
			var module_name = names.first();
			module_name = this.findModuleName(t, module_name);
			if (module_name != "")
			{
				var __v0 = use("Runtime.rs");
				names = names.removeFirstIm().prependCollectionIm(__v0.split("\\.", module_name));
			}
		}
		return names;
	},
	/**
	 * Return module name
	 */
	getModuleName: function(t, module_name)
	{
		module_name = this.findModuleName(t, module_name);
		var __v0 = use("Runtime.rs");
		module_name = __v0.replace("\\.", "\\", module_name);
		return "\\" + use("Runtime.rtl").toString(module_name);
	},
	/**
	 * Return module name
	 */
	getModuleNames: function(t, names)
	{
		var __v0 = use("Runtime.rs");
		return "\\" + use("Runtime.rtl").toString(__v0.join("\\", this.findModuleNames(t, names)));
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = "\\" + use("Runtime.rtl").toString(__v0.join("\\", names));
		return use("Runtime.Collection").create([t,s]);
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (t.modules.has(op_code.value) || op_code.kind == __v0.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.getModuleName(t, module_name);
			return use("Runtime.Collection").create([t,new_module_name]);
		}
		else if (op_code.kind == __v1.KIND_VARIABLE)
		{
			var content = op_code.value;
			return use("Runtime.Collection").create([t,"$" + use("Runtime.rtl").toString(content)]);
		}
		else if (op_code.kind == __v2.KIND_CLASSREF)
		{
			var content = op_code.value;
			if (content == "this")
			{
				content = "$this";
			}
			return use("Runtime.Collection").create([t,content]);
		}
		var content = op_code.value;
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpNumber
	 */
	OpNumber: function(t, op_code)
	{
		var content = op_code.value;
		if (op_code.negative)
		{
			content = "-" + use("Runtime.rtl").toString(content);
			t = t.copy({ "opcode_level": 15 });
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpString
	 */
	OpString: function(t, op_code)
	{
		return use("Runtime.Collection").create([t,this.toString(op_code.value)]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(t, op_code)
	{
		var content = "";
		var values = op_code.values.map((op_code) => 
		{
			var res = this.Expression(t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		var module_name = this.getModuleName(t, "Collection");
		var __v0 = use("Runtime.rs");
		content = module_name + use("Runtime.rtl").toString("::create([") + use("Runtime.rtl").toString(__v0.join(",", values)) + use("Runtime.rtl").toString("])");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t, op_code, flag_array)
	{
		if (flag_array == undefined) flag_array = false;
		var content = "";
		var values = op_code.values.transition((op_code, key) => 
		{
			var res = this.Expression(t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(key) + use("Runtime.rtl").toString("=>") + use("Runtime.rtl").toString(s);
		});
		var module_name = this.getModuleName(t, "Dict");
		if (!flag_array)
		{
			var __v0 = use("Runtime.rs");
			content = module_name + use("Runtime.rtl").toString("::create([") + use("Runtime.rtl").toString(__v0.join(",", values)) + use("Runtime.rtl").toString("])");
		}
		else
		{
			var __v0 = use("Runtime.rs");
			content = "[" + use("Runtime.rtl").toString(__v0.join(",", values)) + use("Runtime.rtl").toString("]");
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Dynamic
	 */
	Dynamic: function(t, op_code, next_op_code)
	{
		if (next_op_code == undefined) next_op_code = null;
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
		var __v2 = use("Bayrell.Lang.OpCodes.OpCall");
		var __v3 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code instanceof __v0)
		{
			return this.OpIdentifier(t, op_code);
		}
		else if (op_code instanceof __v1)
		{
			var __v2 = use("Runtime.Vector");
			var attrs = new __v2();
			var op_code_item = op_code;
			var op_code_next = op_code;
			var prev_kind = "";
			var s = "";
			var __v2 = use("Bayrell.Lang.OpCodes.OpAttr");
			while (op_code_next instanceof __v2)
			{
				attrs.push(op_code_next);
				op_code_item = op_code_next;
				op_code_next = op_code_next.obj;
			}
			attrs = attrs.reverseIm();
			var __v2 = use("Bayrell.Lang.OpCodes.OpCall");
			var __v3 = use("Bayrell.Lang.OpCodes.OpNew");
			var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			if (op_code_next instanceof __v2)
			{
				prev_kind = "var";
				var res = this.OpCall(t, op_code_next);
				t = res[0];
				s = res[1];
			}
			else if (op_code_next instanceof __v3)
			{
				prev_kind = "var";
				var res = this.OpNew(t, op_code_next);
				t = res[0];
				s = "(" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(")");
			}
			else if (op_code_next instanceof __v4)
			{
				var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (t.modules.has(op_code_next.value) || op_code_next.kind == __v5.KIND_SYS_TYPE)
				{
					prev_kind = "static";
					var res = this.OpIdentifier(t, op_code_next);
					t = res[0];
					s = res[1];
				}
				else if (op_code_next.kind == __v6.KIND_CLASSREF)
				{
					if (op_code_next.value == "static")
					{
						s = "static";
						prev_kind = "static";
					}
					else if (op_code_next.value == "self")
					{
						prev_kind = "static";
						s = this.getModuleName(t, t.current_class_full_name);
					}
					else if (op_code_next.value == "this")
					{
						prev_kind = "var";
						s = "$this";
					}
				}
				else
				{
					prev_kind = "var";
					s = "$" + use("Runtime.rtl").toString(op_code_next.value);
				}
			}
			var attrs_sz = attrs.count();
			for (var i = 0;i < attrs.count();i++)
			{
				var attr = attrs.item(i);
				var next_attr = attrs.get(i + 1, null);
				var __v2 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v3 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v4 = use("Bayrell.Lang.OpCodes.OpAttr");
				var __v5 = use("Bayrell.Lang.OpCodes.OpAttr");
				if (attr.kind == __v2.KIND_ATTR)
				{
					s += use("Runtime.rtl").toString("->" + use("Runtime.rtl").toString(attr.value.value));
				}
				else if (attr.kind == __v3.KIND_STATIC)
				{
					if (prev_kind == "static")
					{
						var attr_val = attr.value.value;
						var __v4 = use("Bayrell.Lang.OpCodes.OpCall");
						var __v5 = use("Runtime.rs");
						if (i == attrs_sz - 1 && next_op_code instanceof __v4)
						{
							s += use("Runtime.rtl").toString("::" + use("Runtime.rtl").toString(attr_val));
						}
						else if (__v5.strtoupper(attr_val) == attr_val)
						{
							s += use("Runtime.rtl").toString("::" + use("Runtime.rtl").toString(attr_val));
						}
						else
						{
							s += use("Runtime.rtl").toString("::$" + use("Runtime.rtl").toString(attr_val));
						}
					}
					else
					{
						s += use("Runtime.rtl").toString("->staticMethod(" + use("Runtime.rtl").toString(this.toString(attr.value.value)) + use("Runtime.rtl").toString(")"));
					}
					prev_kind = "static";
				}
				else if (attr.kind == __v4.KIND_DYNAMIC)
				{
					var res = this.Expression(t, attr.value);
					t = res[0];
					s += use("Runtime.rtl").toString("[" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("]"));
				}
				else if (attr.kind == __v5.KIND_PIPE)
				{
					s += use("Runtime.rtl").toString("->" + use("Runtime.rtl").toString(attr.value.value));
				}
			}
			return use("Runtime.Collection").create([t,s]);
		}
		else if (op_code instanceof __v2)
		{
			return this.OpCall(t, op_code);
		}
		else if (op_code instanceof __v3)
		{
			return this.OpPipe(t, op_code);
		}
		return use("Runtime.Collection").create([t,""]);
	},
	/**
	 * OpInc
	 */
	OpInc: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = res[0];
		var s = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v1 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v2 = use("Bayrell.Lang.OpCodes.OpInc");
		var __v3 = use("Bayrell.Lang.OpCodes.OpInc");
		if (op_code.kind == __v0.KIND_PRE_INC)
		{
			content = "++$" + use("Runtime.rtl").toString(s);
		}
		else if (op_code.kind == __v1.KIND_PRE_DEC)
		{
			content = "--$" + use("Runtime.rtl").toString(s);
		}
		else if (op_code.kind == __v2.KIND_POST_INC)
		{
			content = "$" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString("++");
		}
		else if (op_code.kind == __v3.KIND_POST_DEC)
		{
			content = "$" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString("--");
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpMath
	 */
	OpMath: function(t, op_code)
	{
		var res = this.Expression(t, op_code.value1);
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
			content = op + use("Runtime.rtl").toString(t.o(s1, opcode_level1, opcode_level));
		}
		else
		{
			var res = this.Expression(t, op_code.value2);
			t = res[0];
			var opcode_level2 = res[0].opcode_level;
			var s2 = res[1];
			var op1 = t.o(s1, opcode_level1, opcode_level);
			var op2 = t.o(s2, opcode_level2, opcode_level);
			if (op_math == "~")
			{
				content = op1 + use("Runtime.rtl").toString(" . ") + use("Runtime.rtl").toString(this.rtlToStr(t, op2));
			}
			else if (op_math == "implements")
			{
				content = op1 + use("Runtime.rtl").toString(" instanceof ") + use("Runtime.rtl").toString(op2);
			}
			else
			{
				content = op1 + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(op2);
			}
		}
		t = t.copy({ "opcode_level": opcode_level });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpNew
	 */
	OpNew: function(t, op_code)
	{
		var content = "new ";
		var res = this.OpTypeIdentifier(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		content += use("Runtime.rtl").toString("(");
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toString(((i == 0) ? "" : ",") + use("Runtime.rtl").toString(s));
		}
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t, op_code)
	{
		var s = "";
		var flag = false;
		var res = this.Dynamic(t, op_code.obj, op_code);
		t = res[0];
		s = res[1];
		if (s == "parent")
		{
			var f_name = t.current_function.name;
			if (f_name == "constructor")
			{
				f_name = "__construct";
			}
			s = "parent::" + use("Runtime.rtl").toString(f_name) + use("Runtime.rtl").toString("(");
		}
		else
		{
			s += use("Runtime.rtl").toString("(");
		}
		var content = s;
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = this.Expression(t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s));
			flag = true;
		}
		/*if (t.current_function.is_context and op_code.is_context) content ~= (flag ? ", " : "") ~ "$__ctx";*/
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.obj, op_code);
		t = res[0];
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code.obj,"var_content":res[1]}));
		t = res[0];
		var var_name = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code.kind == __v0.KIND_METHOD)
		{
			content = "(" + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("->staticMethod(") + use("Runtime.rtl").toString(op_code.method_name.value) + use("Runtime.rtl").toString("))");
		}
		else
		{
			var res = this.OpTypeIdentifier(t, op_code.class_name);
			t = res[0];
			content = res[1] + use("Runtime.rtl").toString("::") + use("Runtime.rtl").toString(op_code.method_name.value);
		}
		var flag = false;
		content += use("Runtime.rtl").toString("(");
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = this.Expression(t, item);
			t = res[0];
			var s1 = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s1));
			flag = true;
		}
		content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(var_name));
		/*if (t.current_function.is_context and op_code.is_context) content ~= ", $__ctx";*/
		content += use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpClassOf
	 */
	OpClassOf: function(t, op_code)
	{
		var names = this.findModuleNames(t, op_code.entity_name.names);
		var __v0 = use("Runtime.rs");
		var s = __v0.join(".", names);
		return use("Runtime.Collection").create([t,this.toString(s)]);
	},
	/**
	 * OpTernary
	 */
	OpTernary: function(t, op_code)
	{
		var content = "";
		t = t.copy({ "opcode_level": 100 });
		var res = this.Expression(t, op_code.condition);
		t = res[0];
		var condition = res[1];
		var res = this.Expression(t, op_code.if_true);
		t = res[0];
		var if_true = res[1];
		var res = this.Expression(t, op_code.if_false);
		t = res[0];
		var if_false = res[1];
		content += use("Runtime.rtl").toString("(" + use("Runtime.rtl").toString(condition) + use("Runtime.rtl").toString(") ? ") + use("Runtime.rtl").toString(if_true) + use("Runtime.rtl").toString(" : ") + use("Runtime.rtl").toString(if_false));
		t = t.copy({ "opcode_level": 11 });
		/* OpTernary */
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpTypeConvert
	 */
	OpTypeConvert: function(t, op_code)
	{
		var content = "";
		var res = this.Expression(t, op_code.value);
		t = res[0];
		var value = res[1];
		content = "\\Runtime\\rtl::to(" + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(this.toPattern(t, op_code.pattern)) + use("Runtime.rtl").toString(")");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpTernary
	 */
	OpDeclareFunction: function(t, op_code)
	{
		var content = "";
		/* Set function name */
		var save_f = t.current_function;
		t = t.copy({ "current_function": op_code });
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code);
		var args = res[1];
		content += use("Runtime.rtl").toString("function (" + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(")"));
		if (op_code.vars != null && op_code.vars.count() > 0)
		{
			var vars = op_code.vars.map((s) => 
			{
				return "&$" + use("Runtime.rtl").toString(s);
			});
			var __v0 = use("Runtime.rs");
			content += use("Runtime.rtl").toString(" use (" + use("Runtime.rtl").toString(__v0.join(",", vars)) + use("Runtime.rtl").toString(")"));
		}
		var res = t.operator.constructor.OpDeclareFunctionBody(t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		/* Restore function */
		t = t.copy({ "current_function": save_f });
		/* OpTernary */
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Expression
	 */
	Expression: function(t, op_code)
	{
		var content = "";
		t = t.copy({ "opcode_level": 100 });
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
			var res = this.OpIdentifier(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v1)
		{
			var res = this.OpTypeIdentifier(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v2)
		{
			var res = this.OpNumber(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v3)
		{
			var res = this.OpString(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v4)
		{
			var res = this.OpCollection(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v5)
		{
			var res = this.OpDict(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v6)
		{
			t = t.copy({ "opcode_level": 16 });
			var res = this.OpInc(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v7)
		{
			var res = this.OpMath(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v8)
		{
			var res = this.OpNew(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v9 || op_code instanceof __v10)
		{
			var res = this.Dynamic(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v11)
		{
			var res = this.OpCall(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v12)
		{
			var res = this.OpClassOf(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v13)
		{
			var res = this.OpTernary(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v14)
		{
			var res = this.OpTypeConvert(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v15)
		{
			var res = this.OpDeclareFunction(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof __v16)
		{
			var res = t.html.constructor.OpHtmlItems(t, op_code);
			t = res[0];
			content = res[1];
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPExpression";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPExpression",
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPExpression);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPExpression = Bayrell.Lang.LangPHP.TranslatorPHPExpression;