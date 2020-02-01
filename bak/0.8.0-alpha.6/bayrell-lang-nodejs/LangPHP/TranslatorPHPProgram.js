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
Bayrell.Lang.LangPHP.TranslatorPHPProgram = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram,
{
	/**
	 * OpNamespace
	 */
	OpNamespace: function(t,op_code)
	{
		var _v0 = use("Runtime.rs");
		var arr = _v0.split("\\.", op_code.name);
		t = t.copy({ "current_namespace_name": op_code.name });
		var _v0 = use("Runtime.rs");
		return use("Runtime.Collection").create([t,t.s("namespace " + use("Runtime.rtl").toString(_v0.join("\\", arr)) + use("Runtime.rtl").toString(";"))]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(t,op_code)
	{
		if (op_code.fn_create == null)
		{
			return use("Runtime.Collection").create([t,""]);
		}
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy({ "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(t);
		open += use("Runtime.rtl").toString(t.s("function __construct("));
		var res = t.operator.constructor.OpDeclareFunctionArgs(t, op_code.fn_create);
		t = res[0];
		open += use("Runtime.rtl").toString(res[1]);
		open += use("Runtime.rtl").toString(")");
		open += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Function body */
		var res = t.operator.constructor.Operators(t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
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
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(t,op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Static variables */
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != _v0.KIND_INTERFACE && op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count();i++)
			{
				var variable = op_code.vars.item(i);
				var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != _v1.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag("static");
				var is_const = variable.flags.isFlag("const");
				for (var j = 0;j < variable.values.count();j++)
				{
					var value = variable.values.item(j);
					var res = t.expression.constructor.Expression(t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (is_static && is_const)
					{
						content += use("Runtime.rtl").toString(t.s("const " + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString("=") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
					else if (is_static)
					{
						content += use("Runtime.rtl").toString(t.s("static $" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString("=") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
					else if (class_kind == _v1.KIND_STRUCT)
					{
						content += use("Runtime.rtl").toString(t.s("public $__" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
					else
					{
						content += use("Runtime.rtl").toString(t.s("public $" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
				}
			}
		}
		/* Constructor */
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != _v0.KIND_INTERFACE)
		{
			var res = this.OpDeclareClassConstructor(t, op_code);
			content += use("Runtime.rtl").toString(t.s(res[1]));
		}
		/* Functions */
		if (op_code.functions != null)
		{
			for (var i = 0;i < op_code.functions.count();i++)
			{
				var f = op_code.functions.item(i);
				if (f.flags.isFlag("declare"))
				{
					continue;
				}
				/* Set function name */
				t = t.copy({ "current_function": f });
				var s1 = "";
				var s2 = "";
				if (f.isStatic())
				{
					s1 += use("Runtime.rtl").toString("static ");
					t = t.copy({ "is_static_function": true });
				}
				else
				{
					t = t.copy({ "is_static_function": false });
				}
				var res = t.operator.constructor.OpDeclareFunctionArgs(t, f);
				var args = res[1];
				s1 += use("Runtime.rtl").toString("function " + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(")"));
				var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
				if (class_kind != _v0.KIND_INTERFACE)
				{
					var res = t.operator.constructor.OpDeclareFunctionBody(t, f);
					s2 += use("Runtime.rtl").toString(res[1]);
				}
				else
				{
					s2 += use("Runtime.rtl").toString(";");
				}
				s1 = t.s(s1);
				/* Function comments */
				var res = t.operator.constructor.AddComments(t, f.comments, s1 + use("Runtime.rtl").toString(s2));
				content += use("Runtime.rtl").toString(res[1]);
			}
		}
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != _v0.KIND_INTERFACE)
		{
			content += use("Runtime.rtl").toString(t.s("/* ======================= Class Init Functions ======================= */"));
		}
		/* Init variables */
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != _v0.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter((variable) => 
			{
				return !variable.flags.isFlag("static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count() > 0)
			{
				content += use("Runtime.rtl").toString(t.s("function _init()"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				if (t.current_class_extends_name != "")
				{
					content += use("Runtime.rtl").toString(t.s("parent::_init();"));
				}
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var is_static = variable.flags.isFlag("static");
					if (is_static)
					{
						continue;
					}
					var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					var _v2 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == _v1.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == _v2.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count();j++)
					{
						var value = variable.values.item(j);
						var res = t.expression.constructor.Expression(t, value.expression);
						var s = (value.expression != null) ? res[1] : "null";
						content += use("Runtime.rtl").toString(t.s("$this->" + use("Runtime.rtl").toString(prefix) + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
				}
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
			}
			/* Struct */
			var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			if (class_kind == _v1.KIND_STRUCT)
			{
				/* Assign Object */
				content += use("Runtime.rtl").toString(t.s("function assignObject($o)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				var _v2 = use("Runtime.rs");
				content += use("Runtime.rtl").toString(t.s("if ($o instanceof \\" + use("Runtime.rtl").toString(_v2.replace("\\.", "\\", t.current_class_full_name)) + use("Runtime.rtl").toString(")")));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != _v2.KIND_DECLARE)
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
						content += use("Runtime.rtl").toString(t.s("$this->__" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = $o->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
				}
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
				content += use("Runtime.rtl").toString(t.s("parent::assignObject($o);"));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
				/* Assign Value */
				content += use("Runtime.rtl").toString(t.s("function assignValue($k,$v)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != _v2.KIND_DECLARE)
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
							content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("$this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = Runtime.rtl.to($v, null, ") + use("Runtime.rtl").toString(this.toPattern(t, variable.pattern)) + use("Runtime.rtl").toString(");")));
						}
						else
						{
							content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("$this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = $v;")));
						}
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("parent::assignValue($k,$v);")));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
				/* Take Value */
				content += use("Runtime.rtl").toString(t.s("function takeValue($k,$d=null)"));
				content += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
				var flag = false;
				for (var i = 0;i < op_code.vars.count();i++)
				{
					var variable = op_code.vars.item(i);
					var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != _v2.KIND_DECLARE)
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
						content += use("Runtime.rtl").toString(t.s(((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(value.var_name)) + use("Runtime.rtl").toString(")return $this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s("return parent::takeValue($k,$d);"));
				t = t.levelDec();
				content += use("Runtime.rtl").toString(t.s("}"));
			}
		}
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != _v0.KIND_INTERFACE)
		{
			/* Get class name function */
			content += use("Runtime.rtl").toString(t.s("function getClassName()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get current namespace function */
			content += use("Runtime.rtl").toString(t.s("static function getCurrentNamespace()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_namespace_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get current class name function */
			content += use("Runtime.rtl").toString(t.s("static function getCurrentClassName()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get parent class name function */
			content += use("Runtime.rtl").toString(t.s("static function getParentClassName()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.toString(t.expression.constructor.findModuleName(t, t.current_class_extends_name))) + use("Runtime.rtl").toString(";")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Class info */
			content += use("Runtime.rtl").toString(t.s("static function getClassInfo()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return new \\Runtime\\Annotations\\IntrospectionInfo(["));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_CLASS,"));
			content += use("Runtime.rtl").toString(t.s("\"class_name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
			content += use("Runtime.rtl").toString(t.s("\"name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
			content += use("Runtime.rtl").toString(t.s("\"annotations\"=>\\Runtime\\Collection::create(["));
			t = t.levelInc();
			for (var j = 0;j < op_code.annotations.count();j++)
			{
				var annotation = op_code.annotations.item(j);
				var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
				t = res[0];
				var name = res[1];
				var res = t.expression.constructor.OpDict(t, annotation.params, true);
				t = res[0];
				var params = res[1];
				content += use("Runtime.rtl").toString(t.s("new " + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(params) + use("Runtime.rtl").toString("),")));
			}
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("]),"));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("]);"));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get fields list of the function */
			content += use("Runtime.rtl").toString(t.s("static function getFieldsList($f)"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("$a = [];"));
			if (op_code.vars != null)
			{
				var _v1 = use("Runtime.Map");
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
					var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != _v1.KIND_DECLARE)
					{
						continue;
					}
					var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == _v1.KIND_STRUCT)
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
							var _v1 = use("Runtime.Vector");
							vars.set(flag, new _v1());
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
					content += use("Runtime.rtl").toString(t.s("if (($f|" + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")==") + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")")));
					content += use("Runtime.rtl").toString(t.s("{"));
					t = t.levelInc();
					v.each((varname) => 
					{
						content += use("Runtime.rtl").toString(t.s("$a[] = " + use("Runtime.rtl").toString(t.expression.constructor.toString(varname)) + use("Runtime.rtl").toString(";")));
					});
					t = t.levelDec();
					content += use("Runtime.rtl").toString(t.s("}"));
				});
			}
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(t, "Runtime.Collection")) + use("Runtime.rtl").toString("::create($a);")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get field info by name */
			content += use("Runtime.rtl").toString(t.s("static function getFieldInfoByName($field_name)"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("return null;"));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get methods list of the function */
			content += use("Runtime.rtl").toString(t.s("static function getMethodsList()"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			content += use("Runtime.rtl").toString(t.s("$a = ["));
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					if (f.flags.isFlag("declare"))
					{
						continue;
					}
					if (f.annotations.count() == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s(t.expression.constructor.toString(f.name) + use("Runtime.rtl").toString(",")));
				}
			}
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("];"));
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(t, "Runtime.Collection")) + use("Runtime.rtl").toString("::create($a);")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
			/* Get method info by name */
			content += use("Runtime.rtl").toString(t.s("static function getMethodInfoByName($field_name)"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count();i++)
				{
					var f = op_code.functions.item(i);
					if (f.flags.isFlag("declare"))
					{
						continue;
					}
					if (f.annotations.count() == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s("if ($field_name == " + use("Runtime.rtl").toString(t.expression.constructor.toString(f.name)) + use("Runtime.rtl").toString(")")));
					t = t.levelInc();
					content += use("Runtime.rtl").toString(t.s("return new \\Runtime\\Annotations\\IntrospectionInfo(["));
					t = t.levelInc();
					content += use("Runtime.rtl").toString(t.s("\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_METHOD,"));
					content += use("Runtime.rtl").toString(t.s("\"class_name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
					content += use("Runtime.rtl").toString(t.s("\"name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(f.name)) + use("Runtime.rtl").toString(",")));
					content += use("Runtime.rtl").toString(t.s("\"annotations\"=>\\Runtime\\Collection::create(["));
					t = t.levelInc();
					for (var j = 0;j < f.annotations.count();j++)
					{
						var annotation = f.annotations.item(j);
						var res = t.expression.constructor.OpTypeIdentifier(t, annotation.name);
						t = res[0];
						var name = res[1];
						var res = t.expression.constructor.OpDict(t, annotation.params, true);
						t = res[0];
						var params = res[1];
						content += use("Runtime.rtl").toString(t.s("new " + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(params) + use("Runtime.rtl").toString("),")));
					}
					t = t.levelDec();
					content += use("Runtime.rtl").toString(t.s("]),"));
					t = t.levelDec();
					content += use("Runtime.rtl").toString(t.s("]);"));
					t = t.levelDec();
				}
			}
			content += use("Runtime.rtl").toString(t.s("return null;"));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
		}
		/* Class items */
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			var _v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
			var _v1 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
			if (item instanceof _v0)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(t, item);
				content += use("Runtime.rtl").toString(t.s(res[1]));
			}
			else if (item instanceof _v1)
			{
				for (var j = 0;i < item.items.count();i++)
				{
					var res = t.operator.constructor.OpPreprocessorIfCode(t, item.items.item(i));
					var s = res[1];
					if (s == "")
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s(res[1]));
				}
			}
		}
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(t,op_code)
	{
		var content = "";
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(t,op_code)
	{
		if (op_code.is_declare)
		{
			return use("Runtime.Collection").create([t,""]);
		}
		var content = "";
		t = t.copy({ "current_class_name": op_code.name });
		t = t.copy({ "current_class_full_name": t.current_namespace_name + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_class_name) });
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var _v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.class_extends != null)
		{
			var _v0 = use("Runtime.rs");
			var extends_name = _v0.join(".", op_code.class_extends.entity_name.names);
			t = t.copy({ "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == _v0.KIND_STRUCT)
		{
			t = t.copy({ "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == _v1.KIND_STRUCT)
		{
			t = t.copy({ "current_class_extends_name": "" });
		}
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.kind != _v0.KIND_INTERFACE)
		{
			if (op_code.class_extends != null)
			{
				content = "class " + use("Runtime.rtl").toString(t.current_class_name) + use("Runtime.rtl").toString(" extends ") + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(t, t.current_class_extends_name));
			}
			else
			{
				content = "class " + use("Runtime.rtl").toString(t.current_class_name);
			}
		}
		else
		{
			content = "interface " + use("Runtime.rtl").toString(t.current_class_name);
		}
		/* Add implements */
		if (op_code.class_implements != null && op_code.class_implements.count() > 0)
		{
			var arr = op_code.class_implements.map((item) => 
			{
				return t.expression.constructor.getModuleNames(t, item.entity_name.names);
			});
			var _v0 = use("Runtime.rs");
			var s1 = _v0.join(", ", arr);
			content += use("Runtime.rtl").toString(" implements " + use("Runtime.rtl").toString(s1));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		/* Class comments */
		var res = t.operator.constructor.AddComments(t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		return use("Runtime.Collection").create([t,t.s(content)]);
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
				content += use("Runtime.rtl").toString(s);
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
		var content = "<?php";
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
				content += use("Runtime.rtl").toString(s);
			}
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
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
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPProgram);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPProgram = Bayrell.Lang.LangPHP.TranslatorPHPProgram;