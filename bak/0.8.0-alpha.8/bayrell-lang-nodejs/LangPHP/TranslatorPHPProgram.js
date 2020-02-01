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
Bayrell.Lang.LangPHP.TranslatorPHPProgram = function(__ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHPProgram"))
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
		return "Bayrell.Lang.LangPHP.TranslatorPHPProgram";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPProgram,
{
	/**
	 * OpNamespace
	 */
	OpNamespace: function(__ctx, t, op_code)
	{
		var __v0 = use("Runtime.rs");
		var arr = __v0.split(__ctx, "\\.", op_code.name);
		t = t.copy(__ctx, { "current_namespace_name": op_code.name });
		var __v0 = use("Runtime.rs");
		return use("Runtime.Collection").from([t,t.s(__ctx, "namespace " + use("Runtime.rtl").toString(__v0.join(__ctx, "\\", arr)) + use("Runtime.rtl").toString(";"))]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassConstructor: function(__ctx, t, op_code)
	{
		if (op_code.fn_create == null)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var open = "";
		var content = "";
		var save_t = t;
		/* Set function name */
		t = t.copy(__ctx, { "current_function": op_code.fn_create });
		/* Clear save op codes */
		t = t.constructor.clearSaveOpCode(__ctx, t);
		open += use("Runtime.rtl").toString(t.s(__ctx, "function __construct("));
		var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, op_code.fn_create);
		t = res[0];
		open += use("Runtime.rtl").toString(res[1]);
		open += use("Runtime.rtl").toString(")");
		open += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Function body */
		var res = t.operator.constructor.Operators(__ctx, t, (op_code.fn_create.expression) ? op_code.fn_create.expression : op_code.fn_create.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* Constructor end */
		var save = t.constructor.outputSaveOpCode(__ctx, t);
		if (save != "")
		{
			content = open + use("Runtime.rtl").toString(t.s(__ctx, save + use("Runtime.rtl").toString(content)));
		}
		else
		{
			content = open + use("Runtime.rtl").toString(content);
		}
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([save_t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClassBody: function(__ctx, t, op_code)
	{
		var content = "";
		var class_kind = op_code.kind;
		content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
		t = t.levelInc(__ctx);
		/* Static variables */
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE && op_code.vars != null)
		{
			for (var i = 0;i < op_code.vars.count(__ctx);i++)
			{
				var variable = op_code.vars.item(__ctx, i);
				var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (variable.kind != __v1.KIND_DECLARE)
				{
					continue;
				}
				var is_static = variable.flags.isFlag(__ctx, "static");
				var is_const = variable.flags.isFlag(__ctx, "const");
				for (var j = 0;j < variable.values.count(__ctx);j++)
				{
					var value = variable.values.item(__ctx, j);
					var res = t.expression.constructor.Expression(__ctx, t, value.expression);
					var s = (value.expression != null) ? res[1] : "null";
					var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (is_static && is_const)
					{
						content += use("Runtime.rtl").toString(t.s(__ctx, "const " + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString("=") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
					else if (is_static)
					{
						content += use("Runtime.rtl").toString(t.s(__ctx, "static $" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString("=") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
					else if (class_kind == __v1.KIND_STRUCT)
					{
						content += use("Runtime.rtl").toString(t.s(__ctx, "public $__" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
					else
					{
						content += use("Runtime.rtl").toString(t.s(__ctx, "public $" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
				}
			}
		}
		/* Constructor */
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE)
		{
			var res = this.OpDeclareClassConstructor(__ctx, t, op_code);
			content += use("Runtime.rtl").toString(res[1]);
		}
		/* Functions */
		if (op_code.functions != null)
		{
			for (var i = 0;i < op_code.functions.count(__ctx);i++)
			{
				var f = op_code.functions.item(__ctx, i);
				if (f.flags.isFlag(__ctx, "declare"))
				{
					continue;
				}
				/* Set function name */
				t = t.copy(__ctx, { "current_function": f });
				var s1 = "";
				var s2 = "";
				if (f.isStatic(__ctx))
				{
					s1 += use("Runtime.rtl").toString("static ");
					t = t.copy(__ctx, { "is_static_function": true });
				}
				else
				{
					t = t.copy(__ctx, { "is_static_function": false });
				}
				var res = t.operator.constructor.OpDeclareFunctionArgs(__ctx, t, f);
				var args = res[1];
				s1 += use("Runtime.rtl").toString("function " + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(args) + use("Runtime.rtl").toString(")"));
				var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
				if (class_kind != __v0.KIND_INTERFACE)
				{
					var res = t.operator.constructor.OpDeclareFunctionBody(__ctx, t, f);
					s2 += use("Runtime.rtl").toString(res[1]);
				}
				else
				{
					s2 += use("Runtime.rtl").toString(";");
				}
				s1 = t.s(__ctx, s1);
				/* Function comments */
				var res = t.operator.constructor.AddComments(__ctx, t, f.comments, s1 + use("Runtime.rtl").toString(s2));
				content += use("Runtime.rtl").toString(res[1]);
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE)
		{
			content += use("Runtime.rtl").toString(t.s(__ctx, "/* ======================= Class Init Functions ======================= */"));
		}
		/* Init variables */
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE && op_code.vars != null)
		{
			var vars = op_code.vars.filter(__ctx, (__ctx, variable) => 
			{
				return !variable.flags.isFlag(__ctx, "static");
			});
			if (t.current_class_full_name != "Runtime.CoreObject" && vars.count(__ctx) > 0)
			{
				content += use("Runtime.rtl").toString(t.s(__ctx, "function _init($__ctx)"));
				content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				if (t.current_class_extends_name != "")
				{
					content += use("Runtime.rtl").toString(t.s(__ctx, "parent::_init($__ctx);"));
				}
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_static)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v1.KIND_DECLARE)
					{
						continue;
					}
					var prefix = "";
					var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					var __v2 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == __v1.KIND_STRUCT)
					{
						prefix = "__";
					}
					else if (class_kind == __v2.KIND_CLASS)
					{
						prefix = "";
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						var res = t.expression.constructor.Expression(__ctx, t, value.expression);
						var s = (value.expression != null) ? res[1] : "null";
						content += use("Runtime.rtl").toString(t.s(__ctx, "$this->" + use("Runtime.rtl").toString(prefix) + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(";")));
					}
				}
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			}
			/* Struct */
			var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			if (class_kind == __v1.KIND_STRUCT)
			{
				/* Assign Object */
				content += use("Runtime.rtl").toString(t.s(__ctx, "function assignObject($__ctx,$o)"));
				content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				var __v2 = use("Runtime.rs");
				content += use("Runtime.rtl").toString(t.s(__ctx, "if ($o instanceof \\" + use("Runtime.rtl").toString(__v2.replace(__ctx, "\\.", "\\", t.current_class_full_name)) + use("Runtime.rtl").toString(")")));
				content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var __v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v2.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(__ctx, "const");
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						content += use("Runtime.rtl").toString(t.s(__ctx, "$this->__" + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = $o->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
					}
				}
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
				content += use("Runtime.rtl").toString(t.s(__ctx, "parent::assignObject($__ctx,$o);"));
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
				/* Assign Value */
				content += use("Runtime.rtl").toString(t.s(__ctx, "function assignValue($__ctx,$k,$v)"));
				content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				var flag = false;
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var __v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v2.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(__ctx, "const");
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						if (t.flag_struct_check_types)
						{
							content += use("Runtime.rtl").toString(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("$this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = Runtime.rtl.to($v, null, ") + use("Runtime.rtl").toString(this.toPattern(__ctx, t, variable.pattern)) + use("Runtime.rtl").toString(");")));
						}
						else
						{
							content += use("Runtime.rtl").toString(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString("$this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(" = $v;")));
						}
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toString("parent::assignValue($__ctx,$k,$v);")));
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
				/* Take Value */
				content += use("Runtime.rtl").toString(t.s(__ctx, "function takeValue($__ctx,$k,$d=null)"));
				content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
				t = t.levelInc(__ctx);
				var flag = false;
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var __v2 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v2.KIND_DECLARE)
					{
						continue;
					}
					var is_const = variable.flags.isFlag(__ctx, "const");
					var is_static = variable.flags.isFlag(__ctx, "static");
					if (is_const || is_static)
					{
						continue;
					}
					for (var j = 0;j < variable.values.count(__ctx);j++)
					{
						var value = variable.values.item(__ctx, j);
						content += use("Runtime.rtl").toString(t.s(__ctx, ((flag) ? "else " : "") + use("Runtime.rtl").toString("if ($k == ") + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, value.var_name)) + use("Runtime.rtl").toString(")return $this->__") + use("Runtime.rtl").toString(value.var_name) + use("Runtime.rtl").toString(";")));
						flag = true;
					}
				}
				content += use("Runtime.rtl").toString(t.s(__ctx, "return parent::takeValue($__ctx,$k,$d);"));
				t = t.levelDec(__ctx);
				content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (class_kind != __v0.KIND_INTERFACE)
		{
			/* Get class name function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "function getClassName()"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get current namespace function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getCurrentNamespace()"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_namespace_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get current class name function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getCurrentClassName()"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toString(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get parent class name function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getParentClassName()"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.expression.constructor.findModuleName(__ctx, t, t.current_class_extends_name))) + use("Runtime.rtl").toString(";")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Class info */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getClassInfo($__ctx)"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return new \\Runtime\\Annotations\\IntrospectionInfo(["));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_CLASS,"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "\"class_name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
			content += use("Runtime.rtl").toString(t.s(__ctx, "\"name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
			content += use("Runtime.rtl").toString(t.s(__ctx, "\"annotations\"=>\\Runtime\\Collection::from(["));
			t = t.levelInc(__ctx);
			for (var j = 0;j < op_code.annotations.count(__ctx);j++)
			{
				var annotation = op_code.annotations.item(__ctx, j);
				var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
				t = res[0];
				var name = res[1];
				var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
				t = res[0];
				var params = res[1];
				content += use("Runtime.rtl").toString(t.s(__ctx, "new " + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(params) + use("Runtime.rtl").toString("),")));
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "]),"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "]);"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get fields list of the function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getFieldsList($__ctx,$f)"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "$a = [];"));
			if (op_code.vars != null)
			{
				var __v1 = use("Runtime.Map");
				var vars = new __v1(__ctx);
				for (var i = 0;i < op_code.vars.count(__ctx);i++)
				{
					var variable = op_code.vars.item(__ctx, i);
					var is_static = variable.flags.isFlag(__ctx, "static");
					var is_serializable = variable.flags.isFlag(__ctx, "serializable");
					var is_assignable = variable.flags.isFlag(__ctx, "assignable");
					var has_annotation = variable.annotations != null && variable.annotations.count(__ctx) > 0;
					if (is_static)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpAssign");
					if (variable.kind != __v1.KIND_DECLARE)
					{
						continue;
					}
					var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
					if (class_kind == __v1.KIND_STRUCT)
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
						if (!vars.has(__ctx, flag))
						{
							var __v1 = use("Runtime.Vector");
							vars.set(__ctx, flag, new __v1(__ctx));
						}
						var v = vars.item(__ctx, flag);
						for (var j = 0;j < variable.values.count(__ctx);j++)
						{
							var value = variable.values.item(__ctx, j);
							v.push(__ctx, value.var_name);
						}
					}
				}
				vars.each(__ctx, (__ctx, v, flag) => 
				{
					content += use("Runtime.rtl").toString(t.s(__ctx, "if (($f|" + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")==") + use("Runtime.rtl").toString(flag) + use("Runtime.rtl").toString(")")));
					content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
					t = t.levelInc(__ctx);
					v.each(__ctx, (__ctx, varname) => 
					{
						content += use("Runtime.rtl").toString(t.s(__ctx, "$a[] = " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, varname)) + use("Runtime.rtl").toString(";")));
					});
					t = t.levelDec(__ctx);
					content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
				});
			}
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toString("::from($a);")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get field info by name */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getFieldInfoByName($__ctx,$field_name)"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get methods list of the function */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getMethodsList($__ctx)"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "$a = ["));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s(__ctx, t.expression.constructor.toString(__ctx, f.name) + use("Runtime.rtl").toString(",")));
				}
			}
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "];"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "return " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(__ctx, t, "Runtime.Collection")) + use("Runtime.rtl").toString("::from($a);")));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
			/* Get method info by name */
			content += use("Runtime.rtl").toString(t.s(__ctx, "static function getMethodInfoByName($__ctx,$field_name)"));
			content += use("Runtime.rtl").toString(t.s(__ctx, "{"));
			t = t.levelInc(__ctx);
			if (op_code.functions != null)
			{
				for (var i = 0;i < op_code.functions.count(__ctx);i++)
				{
					var f = op_code.functions.item(__ctx, i);
					if (f.flags.isFlag(__ctx, "declare"))
					{
						continue;
					}
					if (f.annotations.count(__ctx) == 0)
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s(__ctx, "if ($field_name == " + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, f.name)) + use("Runtime.rtl").toString(")")));
					t = t.levelInc(__ctx);
					content += use("Runtime.rtl").toString(t.s(__ctx, "return new \\Runtime\\Annotations\\IntrospectionInfo(["));
					t = t.levelInc(__ctx);
					content += use("Runtime.rtl").toString(t.s(__ctx, "\"kind\"=>\\Runtime\\Annotations\\IntrospectionInfo::ITEM_METHOD,"));
					content += use("Runtime.rtl").toString(t.s(__ctx, "\"class_name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, t.current_class_full_name)) + use("Runtime.rtl").toString(",")));
					content += use("Runtime.rtl").toString(t.s(__ctx, "\"name\"=>" + use("Runtime.rtl").toString(t.expression.constructor.toString(__ctx, f.name)) + use("Runtime.rtl").toString(",")));
					content += use("Runtime.rtl").toString(t.s(__ctx, "\"annotations\"=>\\Runtime\\Collection::from(["));
					t = t.levelInc(__ctx);
					for (var j = 0;j < f.annotations.count(__ctx);j++)
					{
						var annotation = f.annotations.item(__ctx, j);
						var res = t.expression.constructor.OpTypeIdentifier(__ctx, t, annotation.name);
						t = res[0];
						var name = res[1];
						var res = t.expression.constructor.OpDict(__ctx, t, annotation.params, true);
						t = res[0];
						var params = res[1];
						content += use("Runtime.rtl").toString(t.s(__ctx, "new " + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("(") + use("Runtime.rtl").toString(params) + use("Runtime.rtl").toString("),")));
					}
					t = t.levelDec(__ctx);
					content += use("Runtime.rtl").toString(t.s(__ctx, "]),"));
					t = t.levelDec(__ctx);
					content += use("Runtime.rtl").toString(t.s(__ctx, "]);"));
					t = t.levelDec(__ctx);
				}
			}
			content += use("Runtime.rtl").toString(t.s(__ctx, "return null;"));
			t = t.levelDec(__ctx);
			content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		}
		/* Class items */
		for (var i = 0;i < op_code.items.count(__ctx);i++)
		{
			var item = op_code.items.item(__ctx, i);
			var __v0 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
			var __v1 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
			if (item instanceof __v0)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(__ctx, t, item);
				content += use("Runtime.rtl").toString(t.s(__ctx, res[1]));
			}
			else if (item instanceof __v1)
			{
				for (var j = 0;i < item.items.count(__ctx);i++)
				{
					var res = t.operator.constructor.OpPreprocessorIfCode(__ctx, t, item.items.item(__ctx, i));
					var s = res[1];
					if (s == "")
					{
						continue;
					}
					content += use("Runtime.rtl").toString(t.s(__ctx, res[1]));
				}
			}
		}
		t = t.levelDec(__ctx);
		content += use("Runtime.rtl").toString(t.s(__ctx, "}"));
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClassFooter
	 */
	OpDeclareClassFooter: function(__ctx, t, op_code)
	{
		var content = "";
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * OpDeclareClass
	 */
	OpDeclareClass: function(__ctx, t, op_code)
	{
		if (op_code.is_declare)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var content = "";
		t = t.copy(__ctx, { "current_class_name": op_code.name });
		t = t.copy(__ctx, { "current_class_full_name": t.current_namespace_name + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_class_name) });
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.class_extends != null)
		{
			var __v0 = use("Runtime.rs");
			var extends_name = __v0.join(__ctx, ".", op_code.class_extends.entity_name.names);
			t = t.copy(__ctx, { "current_class_extends_name": extends_name });
		}
		else if (op_code.kind == __v0.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "Runtime.CoreStruct" });
		}
		else if (op_code.kind == __v1.KIND_STRUCT)
		{
			t = t.copy(__ctx, { "current_class_extends_name": "" });
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		if (op_code.kind != __v0.KIND_INTERFACE)
		{
			if (op_code.class_extends != null)
			{
				content = "class " + use("Runtime.rtl").toString(t.current_class_name) + use("Runtime.rtl").toString(" extends ") + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(__ctx, t, t.current_class_extends_name));
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
		if (op_code.class_implements != null && op_code.class_implements.count(__ctx) > 0)
		{
			var arr = op_code.class_implements.map(__ctx, (__ctx, item) => 
			{
				return t.expression.constructor.getModuleNames(__ctx, t, item.entity_name.names);
			});
			var __v0 = use("Runtime.rs");
			var s1 = __v0.join(__ctx, ", ", arr);
			content += use("Runtime.rtl").toString(" implements " + use("Runtime.rtl").toString(s1));
		}
		/* Class body */
		var res = this.OpDeclareClassBody(__ctx, t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		/* Class comments */
		var res = t.operator.constructor.AddComments(__ctx, t, op_code.comments, content);
		content = res[1];
		/* Class footer */
		var res = this.OpDeclareClassFooter(__ctx, t, op_code);
		content += use("Runtime.rtl").toString(res[1]);
		return use("Runtime.Collection").from([t,t.s(__ctx, content)]);
	},
	/**
	 * Translate item
	 */
	translateItem: function(__ctx, t, op_code)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpNamespace");
		var __v1 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var __v2 = use("Bayrell.Lang.OpCodes.OpComment");
		var __v3 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var __v4 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		if (op_code instanceof __v0)
		{
			return this.OpNamespace(__ctx, t, op_code);
		}
		else if (op_code instanceof __v1)
		{
			return this.OpDeclareClass(__ctx, t, op_code);
		}
		else if (op_code instanceof __v2)
		{
			return t.operator.constructor.OpComment(__ctx, t, op_code);
		}
		else if (op_code instanceof __v3)
		{
			return t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code);
		}
		else if (op_code instanceof __v4)
		{
			var content = "";
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var res = t.operator.constructor.OpPreprocessorIfCode(__ctx, t, op_code.items.item(__ctx, i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString(s);
			}
			return use("Runtime.Collection").from([t,content]);
		}
		return use("Runtime.Collection").from([t,""]);
	},
	/**
	 * Translate program
	 */
	translateProgramHeader: function(__ctx, t, op_code)
	{
		var content = "<?php";
		return use("Runtime.Collection").from([t,content]);
	},
	/**
	 * Translate program
	 */
	translateProgram: function(__ctx, t, op_code)
	{
		var content = "";
		if (op_code.uses != null)
		{
			t = t.copy(__ctx, { "modules": op_code.uses });
		}
		if (op_code.items != null)
		{
			var res = this.translateProgramHeader(__ctx, t, op_code);
			content += use("Runtime.rtl").toString(res[1]);
			for (var i = 0;i < op_code.items.count(__ctx);i++)
			{
				var item = op_code.items.item(__ctx, i);
				var res = this.translateItem(__ctx, t, item);
				t = res[0];
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString(s);
			}
		}
		return use("Runtime.Collection").from([t,content]);
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPProgram",
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
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPProgram);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPProgram = Bayrell.Lang.LangPHP.TranslatorPHPProgram;