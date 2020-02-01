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
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype.constructor = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait.prototype,
{
	_init: function()
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		var __v0 = use("Runtime.Collection");
		this.__async_stack = new __v0();
		if (a.indexOf("async_stack") == -1) defProp(this, "async_stack");
		this.__pos = use("Runtime.Collection").create([0]);
		if (a.indexOf("pos") == -1) defProp(this, "pos");
		this.__async_t = "__async_t";
		if (a.indexOf("async_t") == -1) defProp(this, "async_t");
		this.__async_var = "__async_var";
		if (a.indexOf("async_var") == -1) defProp(this, "async_var");
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6AsyncAwait"))
		{
			this.__async_stack = o.__async_stack;
			this.__pos = o.__pos;
			this.__async_t = o.__async_t;
			this.__async_var = o.__async_var;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "async_stack")this.__async_stack = v;
		else if (k == "pos")this.__pos = v;
		else if (k == "async_t")this.__async_t = v;
		else if (k == "async_var")this.__async_var = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "async_stack")return this.__async_stack;
		else if (k == "pos")return this.__pos;
		else if (k == "async_t")return this.__async_t;
		else if (k == "async_var")return this.__async_var;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait,
{
	/**
	 * Returns current pos
	 */
	currentPos: function(t)
	{
		var __v0 = use("Runtime.rs");
		return t.expression.constructor.toString(__v0.join(".", t.async_await.pos));
	},
	/**
	 * Returns current pos
	 */
	nextPos: function(t)
	{
		var pos = t.async_await.pos;
		t = t.copy({ "async_await": t.async_await.copy({ "pos": pos.setIm(pos.count() - 1, pos.last() + 1) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(__v0.join(".", t.async_await.pos));
		return use("Runtime.Collection").create([t,res]);
	},
	/**
	 * Returns push pos
	 */
	pushPos: function(t)
	{
		var pos = t.async_await.pos;
		t = t.copy({ "async_await": t.async_await.copy({ "pos": pos.setIm(pos.count() - 1, pos.last() + 1).pushIm(0) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(__v0.join(".", t.async_await.pos));
		return use("Runtime.Collection").create([t,res]);
	},
	/**
	 * Returns inc pos
	 */
	levelIncPos: function(t)
	{
		var pos = t.async_await.pos;
		t = t.copy({ "async_await": t.async_await.copy({ "pos": pos.setIm(pos.count() - 1, pos.last()).pushIm(0) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(__v0.join(".", t.async_await.pos));
		return use("Runtime.Collection").create([t,res]);
	},
	/**
	 * Returns pop pos
	 */
	popPos: function(t)
	{
		var pos = t.async_await.pos.removeLastIm();
		t = t.copy({ "async_await": t.async_await.copy({ "pos": pos.setIm(pos.count() - 1, pos.last() + 1) }) });
		var __v0 = use("Runtime.rs");
		var res = t.expression.constructor.toString(__v0.join(".", t.async_await.pos));
		return use("Runtime.Collection").create([t,res]);
	},
	/**
	 * OpCall
	 */
	OpCall: function(t,op_code,is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var s = "";
		var flag = false;
		if (s == "")
		{
			var res = t.expression.constructor.Dynamic(t, op_code.obj);
			t = res[0];
			s = res[1];
			if (s == "parent")
			{
				s = t.expression.constructor.useModuleName(t, t.current_class_extends_name);
				if (t.current_function.name != "constructor")
				{
					if (t.current_function.isStatic())
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
		}
		var content = s;
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = res[0];
			var s = res[1];
			content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(s));
			flag = true;
		}
		content += use("Runtime.rtl").toString(")");
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(next_pos) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString(".call(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(content) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(t.expression.constructor.toString(var_name)) + use("Runtime.rtl").toString(");"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(next_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return use("Runtime.Collection").create([t,async_t + use("Runtime.rtl").toString(".getVar(") + use("Runtime.rtl").toString(t.expression.constructor.toString(var_name)) + use("Runtime.rtl").toString(")")]);
		}
		return use("Runtime.Collection").create([t,""]);
	},
	/**
	 * OpPipe
	 */
	OpPipe: function(t,op_code,is_expression)
	{
		if (is_expression == undefined) is_expression = true;
		var content = "";
		var var_name = "";
		var flag = false;
		var res = t.expression.constructor.Expression(t, op_code.obj);
		t = res[0];
		var_name = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
		if (op_code.kind == __v0.KIND_METHOD)
		{
			content = var_name + use("Runtime.rtl").toString(".constructor.") + use("Runtime.rtl").toString(op_code.method_name.value);
		}
		else
		{
			var res = t.expression.constructor.OpTypeIdentifier(t, op_code.class_name);
			t = res[0];
			content = res[1] + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(op_code.method_name.value);
		}
		var flag = false;
		content += use("Runtime.rtl").toString("(");
		for (var i = 0;i < op_code.args.count();i++)
		{
			var item = op_code.args.item(i);
			var res = t.expression.constructor.Expression(t, item);
			t = res[0];
			var s1 = res[1];
			content += use("Runtime.rtl").toString(((i > 0) ? ", " : "") + use("Runtime.rtl").toString(s1));
			flag = true;
		}
		content += use("Runtime.rtl").toString(((flag) ? ", " : "") + use("Runtime.rtl").toString(var_name));
		content += use("Runtime.rtl").toString(")");
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = res[1];
		var res = this.nextPos(t);
		t = res[0];
		var next_pos = res[1];
		var async_t = t.async_await.async_t;
		content = t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(next_pos) + use("Runtime.rtl").toString(")") + use("Runtime.rtl").toString(".call(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(content) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(t.expression.constructor.toString(var_name)) + use("Runtime.rtl").toString(");"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(next_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		if (is_expression)
		{
			return use("Runtime.Collection").create([t,async_t + use("Runtime.rtl").toString(".getVar(") + use("Runtime.rtl").toString(t.expression.constructor.toString(var_name)) + use("Runtime.rtl").toString(")")]);
		}
		return use("Runtime.Collection").create([t,""]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t,op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.pushIm(new __v0(use("Runtime.Dict").create({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Start Loop */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Loop Assign */
		var __v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.expr1 instanceof __v0)
		{
			var res = t.constructor.saveOpCodeCall(t, t.operator.staticMethod("OpAssign"), use("Runtime.Collection").create([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += use("Runtime.rtl").toString(save);
			}
			content += use("Runtime.rtl").toString(value);
		}
		else
		{
			var res = t.constructor.saveOpCodeCall(t, t.expression.staticMethod("Expression"), use("Runtime.Collection").create([op_code.expr1]));
			t = res[0];
			var save = res[1];
			var value = res[2];
			if (save != "")
			{
				content += use("Runtime.rtl").toString(save);
			}
			content += use("Runtime.rtl").toString(value);
		}
		/* Loop Expression */
		var res = this.nextPos(t);
		t = res[0];
		var loop_expression = res[1];
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(loop_expression) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Loop Expression */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(loop_expression) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, t.expression.staticMethod("Expression"), use("Runtime.Collection").create([op_code.expr2]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toString(save);
		}
		/* Loop condition */
		content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(async_var) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(";")));
		var res = this.nextPos(t);
		t = res[0];
		var start_loop = res[1];
		content += use("Runtime.rtl").toString(t.s("if (async_var)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_loop) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		/* Start Loop */
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Loop */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_loop) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1] + use("Runtime.rtl").toString(";")));
		var res = t.operator.constructor.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* End Loop */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(loop_expression) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* End Loop */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.removeLastIm() }) });
		t = t.copy({ "async_await": t.async_await.copy({ "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpIfBlock
	 */
	OpIfBlock: function(t,condition,op_code,end_pos)
	{
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, t.expression.staticMethod("Expression"), use("Runtime.Collection").create([condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toString(save);
		}
		var res = this.nextPos(t);
		t = res[0];
		var start_if = res[1];
		var res = this.nextPos(t);
		t = res[0];
		var next_if = res[1];
		/* If condition */
		content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(async_var) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(";")));
		content += use("Runtime.rtl").toString(t.s("if (async_var)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_if) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(next_if) + use("Runtime.rtl").toString(");")));
		/* Start Loop */
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* If true */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_if) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = t.operator.constructor.Operators(t, op_code);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* End if */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Next If */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(next_if) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t,op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var if_true_pos = "";
		var if_false_pos = "";
		var res = this.pushPos(t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(t);
		save_t = res[0];
		var end_pos = res[1];
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Start if */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* If true */
		var res = this.OpIfBlock(t, op_code.condition, op_code.if_true, end_pos);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* If else */
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = this.OpIfBlock(t, if_else.condition, if_else.if_true, end_pos);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		/* Else */
		if (op_code.if_false)
		{
			content += use("Runtime.rtl").toString(t.s("/* If false */"));
			var res = t.operator.constructor.Operators(t, op_code.if_false);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		/* End if */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* End if */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		t = t.copy({ "async_await": t.async_await.copy({ "pos": save_t.async_await.pos }) });
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
			s1 = res[1];
		}
		else
		{
			s1 = "null";
		}
		var async_t = t.async_await.async_t;
		content = t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".ret(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(");"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t,op_code)
	{
		var save_t = null;
		var content = "";
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var res = this.nextPos(t);
		t = res[0];
		var start_pos = res[1];
		var res = this.nextPos(t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.pushIm(new __v0(use("Runtime.Dict").create({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		/* Start Try Catch */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Start Try */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.levelIncPos(t);
		t = res[0];
		var start_catch = res[1];
		content += use("Runtime.rtl").toString(t.s(async_t + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".catch_push(") + use("Runtime.rtl").toString(start_catch) + use("Runtime.rtl").toString(");")));
		var res = t.operator.constructor.Operators(t, op_code.op_try);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* Start Catch */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".catch_pop().jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Start Catch */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_catch) + use("Runtime.rtl").toString(")")));
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
				s = "if (true)";
			}
			s += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			s += use("Runtime.rtl").toString((s != "") ? t.s("var " + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = _ex;")) : "var " + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = _ex;"));
			var res = t.operator.constructor.Operators(t, item.value);
			t = res[0];
			s += use("Runtime.rtl").toString(t.s(res[1]));
			t = t.levelDec();
			s += use("Runtime.rtl").toString(t.s("}"));
			if (i != 0)
			{
				s = "else " + use("Runtime.rtl").toString(s);
			}
			content += use("Runtime.rtl").toString(t.s(s));
		}
		content += use("Runtime.rtl").toString(t.s("else"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("throw _ex;"));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		/* End Try Catch */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* End Catch */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.removeLastIm() }) });
		t = t.copy({ "async_await": t.async_await.copy({ "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t,op_code)
	{
		var save_t = null;
		var async_t = t.async_await.async_t;
		var async_var = t.async_await.async_var;
		var content = "";
		var res = this.pushPos(t);
		t = res[0];
		var start_pos = res[1];
		var res = this.popPos(t);
		save_t = res[0];
		var end_pos = res[1];
		var __v0 = use("Bayrell.Lang.LangES6.AsyncAwait");
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.pushIm(new __v0(use("Runtime.Dict").create({"start_pos":start_pos,"end_pos":end_pos}))) }) });
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Start while */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		/* Call condition expression */
		var res = t.constructor.saveOpCodeCall(t, t.expression.staticMethod("Expression"), use("Runtime.Collection").create([op_code.condition]));
		t = res[0];
		var save = res[1];
		var value = res[2];
		if (save != "")
		{
			content += use("Runtime.rtl").toString(save);
		}
		/* Loop condition */
		content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(async_var) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(";")));
		var res = this.nextPos(t);
		t = res[0];
		var start_loop = res[1];
		content += use("Runtime.rtl").toString(t.s("if (async_var)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_loop) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(");")));
		/* Start Loop */
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* Loop while */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(start_loop) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = t.operator.constructor.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/* End Loop */
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".jump(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(start_pos) + use("Runtime.rtl").toString(");")));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("/* End while */"));
		content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(end_pos) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		t = t.copy({ "async_await": t.async_await.copy({ "async_stack": t.async_await.async_stack.removeLastIm() }) });
		t = t.copy({ "async_await": t.async_await.copy({ "pos": save_t.async_await.pos }) });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t,f)
	{
		var save_t = t;
		/* Save op codes */
		var save_vars = t.save_vars;
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		t = t.constructor.clearSaveOpCode(t);
		var async_t = t.async_await.async_t;
		t = t.levelInc();
		var s1 = t.s("return (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(") =>"));
		s1 += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		s1 += use("Runtime.rtl").toString(t.s("if (" + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".pos() == ") + use("Runtime.rtl").toString(this.currentPos(t)) + use("Runtime.rtl").toString(")")));
		s1 += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		if (f.value)
		{
			var res = t.operator.constructor.Operators(t, f.value);
			t = res[0];
			s1 += use("Runtime.rtl").toString(res[1]);
		}
		else if (f.expression)
		{
			var res = t.expression.constructor.Expression(t, f.expression);
			t = res[0];
			var expr = res[1];
			s1 += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".ret(") + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(", ") + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(");")));
		}
		t = t.levelDec();
		s1 += use("Runtime.rtl").toString(t.s("}"));
		s1 += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(async_t) + use("Runtime.rtl").toString(".ret_void();")));
		t = t.levelDec();
		s1 += use("Runtime.rtl").toString(t.s("};"));
		t = t.levelDec();
		/* Content */
		var content = "";
		content = t.s("{");
		t = t.levelInc();
		if (t.save_vars.count() > 0)
		{
			var __v0 = use("Runtime.rs");
			content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(__v0.join(",", t.save_vars)) + use("Runtime.rtl").toString(";")));
		}
		content += use("Runtime.rtl").toString(s1);
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		/* Restore save op codes */
		t = t.copy({ "save_vars": save_vars });
		t = t.copy({ "save_op_codes": save_op_codes });
		t = t.copy({ "save_op_code_inc": save_op_code_inc });
		return use("Runtime.Collection").create([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"name": "Bayrell.Lang.LangES6.TranslatorES6AsyncAwait",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("async_stack");
			a.push("pos");
			a.push("async_t");
			a.push("async_var");
		}
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6AsyncAwait);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6AsyncAwait = Bayrell.Lang.LangES6.TranslatorES6AsyncAwait;