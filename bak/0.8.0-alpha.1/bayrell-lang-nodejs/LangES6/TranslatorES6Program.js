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
Bayrell.Lang.LangES6.TranslatorES6Program = function()
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Program,
{
	/**
	 * To pattern
	 */
	toPattern: function(t,pattern)
	{
		var _v0 = use("Runtime.rs");
		var names = t.expression.constructor.findModuleNames(t, pattern.entity_name.names);
		var e = _v0.join(".", names);
		var a = (pattern.template != null) ? pattern.template.map((pattern) => 
		{
			return this.toPattern(t, pattern);
		}) : null;
		var b = (a != null) ? ",\"t\":[" + use("Runtime.rtl").toString(_v0.join(",", a)) + use("Runtime.rtl").toString("]") : "";
		return "{\"e\":" + use("Runtime.rtl").toString(t.expression.constructor.toString(e)) + use("Runtime.rtl").toString(b) + use("Runtime.rtl").toString("}");
	},
	/**
	 * OpNamespace
	 */
	OpNamespace: function(t,op_code)
	{
		var _v0 = use("Runtime.rs");
		var content = "";
		var name = "";
		var s = "";
		var arr = _v0.split("\\.", op_code.name);
		for (var i = 0;i < arr.count();i++)
		{
			name = name + use("Runtime.rtl").toString(((i == 0) ? "" : ".")) + use("Runtime.rtl").toString(arr.item(i));
			s = "if (typeof " + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(" == 'undefined') ") + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(" = {};");
			content += use("Runtime.rtl").toString((i == 0) ? s : t.s(s));
		}
		t = t.copy({ "current_namespace_name": op_code.name });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(t,op_code)
	{
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy({ "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		if (op_code.fn_create == null)
		{
			open += use("Runtime.rtl").toString(t.current_class_full_name + use("Runtime.rtl").toString(" = "));
			open += use("Runtime.rtl").toString("function()");
			open += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			/* Call parent */
			if (t.current_class_extends_name != "")
			{
				content += use("Runtime.rtl").toString(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + use("Runtime.rtl").toString(".apply(this, arguments);")));
			}
		}
		else
		{
			open += use("Runtime.rtl").toString(t.current_class_full_name + use("Runtime.rtl").toString(" = function("));
			var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code.fn_create);
			t = res[0];
			open += use("Runtime.rtl").toString(res[1]);
			open += use("Runtime.rtl").toString(")");
			open += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
		}
		/* Function body */
		if (op_code.fn_create != null)
		{
			var res = t.operator.constructor.Operators(t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
			t = res[0];
			content += use("Runtime.rtl").toString(t.s(res[1]));
		}
		/* Constructor end */
		var save = t.constructor.outputSaveOpCode(t);
		if (save != "")
		{
			content = open + use("Runtime.rtl").toString(t.s(save + use("Runtime.rtl").toString(content)));
		}
		else
		{
			content = open + use("Runtime.rtl").toString(content);
		}
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("};"));
		return use("Runtime.Collection").create([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBodyStatic: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v1 = use("Runtime.Map");
		var _v2 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var _v3 = use("Runtime.Vector");
		var content = "";
		var class_kind = op_code.kind;
		var current_class_extends_name = t.expression.constructor.findModuleName(t, t.current_class_extends_name);
		/* Returns parent class name */
		var parent_class_name = "";
		if (op_code.class_extends != null)
		{
			var res = t.expression.constructor.OpTypeIdentifier(t, op_code.class_extends);
			parent_class_name = res[1];
		}
		if (current_class_extends_name != "")
		{
			content += use("Runtime.rtl").toString("Object.assign(" + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, current_class_extends_name)) + use("Runtime.rtl").toString(");"));
		}
		content += use("Runtime.rtl").toString(t.s("Object.assign(" + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(","), content));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Static variables */
		if (op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count();i++)
			{
				var variable = op_code.vars.item(i);
				if (variable.kind != _v0.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag("static");
				if (!is_static)
				{
					continue;
				}
				for (var j = 0;j < variable.values.count();j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					content += use("Runtime.rtl").toString(t.s(value.var_name + use("Runtime.rtl").toString(": ") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(",")));
				}
			}
		}
		/* Static Functions */
		if (op_code.functions != null)
		{
			t = t.copy({ "is_static_function": true });
			for (var i = 0;i < op_code.functions.count();i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (!f.isStatic())
				{
					continue;
				}
				/* Set function name */
				t = t.copy({ "current_function": f });
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = res[1];
				s += use("Runtime.rtl").toString(f.name + use("Runtime.rtl").toString(": function(") + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
				s += use("Runtime.rtl").toString(t.s(res[1]));
				s += use("Runtime.rtl").toString(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, s);
				content += use("Runtime.rtl").toString(t.s(res[1]));
			}
		}
		/* Get current namespace function */
		content += use("Runtime.rtl").toString(t.s("getCurrentNamespace: function()"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_namespace_name)) + use("Runtime.rtl").toString(";")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get current class name function */
		content += use("Runtime.rtl").toString(t.s("getCurrentClassName: function()"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get parent class name function */
		content += use("Runtime.rtl").toString(t.s("getParentClassName: function()"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(current_class_extends_name)) + use("Runtime.rtl").toString(";")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get fields list of the function */
		content += use("Runtime.rtl").toString(t.s("getFieldsList: function(f)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("var a = [];"));
		content += use("Runtime.rtl").toString(t.s("if (f==undefined) f=0;"));
		if (op_code.vars != null)
		{
			var vars = new _v1();
			for (var i = 0;i < op_code.vars.count();i++)
			{
				var variable = op_code.vars.item(i);
				var is_static = variable.flags.isFlag("static");
				var is_serializable = variable.flags.isFlag("serializable");
				var is_assignable = variable.flags.isFlag("assignable");
				var has_annotation = variable.annotations != null && variable.annotations.count() > 0;
				if (is_static)
				{
					continue;
				}
				if (variable.kind != _v0.KIND_DECLARE)
				{
					continue;
				}
				if (class_kind == _v2.KIND_STRUCT)
				{
					is_serializable = true;
					is_assignable = true;
				}
				if (is_serializable)
				{
					is_assignable = true;
				}
				var flag = 0;
				if (is_serializable)
				{
					flag = flag | 1;
				}
				if (is_assignable)
				{
					flag = flag | 2;
				}
				if (has_annotation)
				{
					flag = flag | 4;
				}
				if (flag != 0)
				{
					if (!vars.has(flag))
					{
						vars.set(flag, new _v3());
					}
					var v = vars.item(flag);
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						v.push(value.var_name);
					}
				}
			}
			vars.each((flag,v) => 
			{
				content += use("Runtime.rtl").toString(t.s("if ((f|" + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")==") + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")")));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				v.each((varname) => 
				{
					content += use("Runtime.rtl").toString(t.s("a.push(" + use("Runtime.rtl").toString(t.expression.constructor.toString(varname)) + use("Runtime.rtl").toString(");")));
				});
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
			});
		}
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + use("Runtime.rtl").toString(".create(a);")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get field info by name */
		content += use("Runtime.rtl").toString(t.s("getFieldInfoByName: function(field_name)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return null;"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get methods list of the function */
		content += use("Runtime.rtl").toString(t.s("getMethodsList: function()"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("var a = [];"));
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, "Runtime.Collection")) + use("Runtime.rtl").toString(".create(a);")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Get method info by name */
		content += use("Runtime.rtl").toString(t.s("getMethodInfoByName: function(field_name)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return null;"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		/* Add implements */
		if (op_code.class_implements != null && op_code.class_implements.count() > 0)
		{
			content += use("Runtime.rtl").toString(t.s("__implements__:"));
			content += use("Runtime.rtl").toString(t.s("["));
			t = t.levelInc();
			for (var i = 0;i < op_code.class_implements.count();i++)
			{
				var item = op_code.class_implements.item(i);
				var module_name = item.entity_name.names.first();
				var s = t.expression.constructor.useModuleName(t, module_name);
				content += use("Runtime.rtl").toString(t.s(s + use("Runtime.rtl").toString(",")));
			}
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("],"));
		}
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("});"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
		var content = "";
		var class_kind = op_code.kind;
		content += use("Runtime.rtl").toString("Object.assign(" + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".prototype,"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Functions */
		if (op_code.functions != null)
		{
			t = t.copy({ "is_static_function": false });
			for (var i = 0;i < op_code.functions.count();i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				if (f.isStatic())
				{
					continue;
				}
				/* Set function name */
				t = t.copy({ "current_function": f });
				var s = "";
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = res[1];
				s += use("Runtime.rtl").toString(f.name + use("Runtime.rtl").toString(": function(") + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(")"));
				var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
				s += use("Runtime.rtl").toString(t.s(res[1]));
				s += use("Runtime.rtl").toString(",");
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, s);
				content += use("Runtime.rtl").toString(t.s(res[1]));
			}
		}
		/* Init variables */
		if (op_code.vars != null)
		{
			var vars = op_code.vars.filter((variable) => 
			{
				return !variable.flags.isFlag("static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count() > 0)
			{
				content += use("Runtime.rtl").toString(t.s("_init: function()"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				if (class_kind == _v0.KIND_STRUCT)
				{
					content += use("Runtime.rtl").toString(t.s("var a = Object.getOwnPropertyNames(this);"));
				}
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_static = variable.flags.isFlag("static");
					if (is_static)
					{
						continue;
					}
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					if (class_kind == _v0.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == _v0.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						var res = t.expression.constructor.Expression(t, value.expression);
						var s = (value.expression != null) ? res[1] : "null";
						content += use("Runtime.rtl").toString(t.s("this." + use("Runtime.rtl").toString(prefix) + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
						if (class_kind == _v0.KIND_STRUCT)
						{
							content += use("Runtime.rtl").toString(t.s("if (a.indexOf(" + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(") == -1)") + use("Runtime.rtl").toString("Object.defineProperty(this, ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(",{") + use("Runtime.rtl").toString("get:function(){return this.") + use("Runtime.rtl").toString(prefix) + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";},") + use("Runtime.rtl").toString("set:function(value){") + use("Runtime.rtl").toString("throw new Runtime.Exceptions.AssignStructValueError(") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(");}") + use("Runtime.rtl").toString("});")));
						}
					}
				}
				if (t.current_class_extends_name != "")
				{
					content += use("Runtime.rtl").toString(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + use("Runtime.rtl").toString(".prototype._init.call(this);")));
				}
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("},"));
			}
			/* Struct */
			if (class_kind == _v0.KIND_STRUCT)
			{
				/* Assign Object */
				content += use("Runtime.rtl").toString(t.s("assignObject: function(o)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				content += use("Runtime.rtl").toString(t.s("if (o instanceof " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, t.current_class_full_name)) + use("Runtime.rtl").toString(")")));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += use("Runtime.rtl").toString(t.s("this.__" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = o.__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
				}
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
				content += use("Runtime.rtl").toString(t.s(t.expression.constructor.useModuleName(t, t.current_class_extends_name) + use("Runtime.rtl").toString(".prototype.assignObject.call(this,o);")));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("},"));
				/* Assign Value */
				content += use("Runtime.rtl").toString(t.s("assignValue: function(k,v)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						if (t.flag_struct_check_types)
						{
							content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if (k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("this.__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = Runtime.rtl.to(v, null, ") + use("Runtime.rtl").toString(this.toPattern(t, variable.pattern)) + use("Runtime.rtl").toString(");")));
						}
						else
						{
							content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if (k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("this.__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = v;")));
						}
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + use("Runtime.rtl").toString(".prototype.assignValue.call(this,k,v);")));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("},"));
				/* Take Value */
				content += use("Runtime.rtl").toString(t.s("takeValue: function(k,d)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				content += use("Runtime.rtl").toString(t.s("if (d == undefined) d = null;"));
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag("const");
					var is_static = variable.flags.isFlag("static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if (k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")return this.__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + use("Runtime.rtl").toString(".prototype.takeValue.call(this,k,d);")));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("},"));
			}
		}
		/* Get class name function */
		content += use("Runtime.rtl").toString(t.s("getClassName: function()"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("},"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("});"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t,op_code)
	{
		var content = "";
		content = "window[\"class." + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString("\"] = ") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(";");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(t,op_code)
	{
		var _v0 = use("Runtime.rs");
		var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.is_declare)
		{
			return use("Runtime.Collection").create([t,""]);
		}
		var content = "";
		t = t.copy({ "current_class_name": op_code.name });
		t = t.copy({ "current_class_full_name": t.current_namespace_name + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_class_name) });
		if (op_code.class_extends != null)
		{
			var extends_name = _v0.join(".", op_code.class_extends.entity_name.names);
			t = t.copy({ "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == _v1.KIND_STRUCT)
		{
			t = t.copy({ "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == _v1.KIND_STRUCT)
		{
			t = t.copy({ "current_class_extends_name": "" });
		}
		/* Constructor */
		var res = this.OpDeclareClassConstructor(t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		/* Extends */
		if (op_code.class_extends != null)
		{
			content += use("Runtime.rtl").toString(t.s(t.current_class_full_name + use("Runtime.rtl").toString(".prototype = Object.create(") + use("Runtime.rtl").toString(t.expression.constructor.useModuleName(t, t.current_class_extends_name)) + use("Runtime.rtl").toString(".prototype);")));
			content += use("Runtime.rtl").toString(t.s(t.current_class_full_name + use("Runtime.rtl").toString(".prototype.constructor = ") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(";")));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(t, op_code);
		var s = res[1];
		content += use("Runtime.rtl").toString(t.s(s));
		/* Class static functions */
		var res = this.OpDeclareClassBodyStatic(t, op_code);
		content += use("Runtime.rtl").toString(t.s(res[1]));
		/* Class comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += use("Runtime.rtl").toString(t.s(res[1]));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpNamespace");
		var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var _v2 = use("Bayrell.Lang.OpCodes.OpComment");
		var _v3 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var _v4 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		if (op_code instanceof _v0)
		{
			return this.OpNamespace(t, op_code);
		}
		else if (op_code instanceof _v1)
		{
			return this.OpDeclareClass(t, op_code);
		}
		else if (op_code instanceof _v2)
		{
			return t.operator.constructor.OpComment(t, op_code);
		}
		else if (op_code instanceof _v3)
		{
			return t.operator.constructor.OpPreprocessorIfCode(t, op_code);
		}
		else if (op_code instanceof _v4)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString((content == "") ? s : t.s(s));
			}
			return use("Runtime.Collection").create([t,content]);
		}
		return use("Runtime.Collection").create([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(t,op_code)
	{
		var content = "\"use strict;\"";
		content += use("Runtime.rtl").toString(t.s("var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined')" + use("Runtime.rtl").toString(" ? Runtime.rtl.find_class : null;")));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(t,op_code)
	{
		var content = "";
		if (op_code.uses != null)
		{
			t = t.copy({ "modules": op_code.uses });
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(t, op_code);
			content += use("Runtime.rtl").toString(res[1]);
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.translateItem(t, item);
				t = res[0];
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString((content == "") ? s : t.s(s));
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Program";
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
use.add(Bayrell.Lang.LangES6.TranslatorES6Program);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Program = Bayrell.Lang.LangES6.TranslatorES6Program;