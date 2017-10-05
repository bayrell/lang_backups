"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
var m__BayrellTranslator = require('./BayrellTranslator.js');
var BayrellTranslator = m__BayrellTranslator.BayrellTranslator;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellTranslatorES6 extends BayrellTranslator {
	static newInstance(){
		return new BayrellTranslatorES6();
	}
	constructor(){
		super();
		this._declare_class_level = false;
		this._calc_level = 0;
		this._is_func_args = 0;
		this._is_func_args_count = 0;
		this._is_func_args_default_values = [];
		this._class_name = "";
		this._class_extend_name = "";
		this._constructor_declare_vars = [];
		this._func_name = "";
		this._semicolon = ";";
	}
	createInterpreter(){
		var runtime = BayrellTranslator.prototype.createInterpreter.call(this);
		runtime.addData({
			"JAVASCRIPT":true,
			"ES6":true,
		});
		return runtime;
	}
	translate(code_tree){
		var _res = this.run(code_tree, 0);
		_res = "\"use strict;\"\n" + _res;
		return _res;
	}
	/*  Операторы */
	op_comment(code_tree, level){
		return this.out("/* " + code_tree["str"] + " */", level);
	}
	op_assign(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " = " + this.run(code_tree.value, level) + this._semicolon, level);
		return res;
	}
	op_assign_dec(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " -= " + this.run(code_tree.value, level) + this._semicolon, level);
		return res;
	}
	op_assign_inc(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " += " + this.run(code_tree.value, level) + this._semicolon, level);
		return res;
	}
	op_assign_concat(code_tree, level){
		var s = this.run(code_tree.name, level);
		var val = "";
		if (code_tree.value.op == BayrellCode.OP_STRING) {
			val = this.run(code_tree.value, level);
		}
		else {
			var old_calc_level = this._calc_level;
			this._calc_level = 0;
			val = "rtl.toString(" + this.run(code_tree.value, level) + ")";
			this._calc_level = old_calc_level;
		}
		return this.out(s + " += " + val + this._semicolon, level);
	}
	op_declare_var(code_tree, level){
		var s;
		if (this._declare_class_level && !this._is_func_args) {
			return "";
		}
		if (this._is_func_args) {
			var name = code_tree["str_name"];
			if (this._is_func_args_count == 0) {
				s = name;
			}
			else {
				s = ", " + name;
			}
			if (code_tree.value != null) {
				rtl.array_push(this._is_func_args_default_values, {
					"name":name,
					"value":code_tree.value,
				});
			}
			this._is_func_args_count = this._is_func_args_count + 1;
		}
		else {
			var name = code_tree["str_name"];
			if (code_tree.flags["static"]) {
				name = "static " + name;
			}
			if (code_tree.value != null) {
				s = "var " + name + " = " + this.run(code_tree.value, level) + this._semicolon;
			}
			else {
				s = "var " + name + this._semicolon;
			}
			s = this.out(s, level);
		}
		return s;
	}
	op_declare_func(code_tree, level){
		var s = "";
		var args = code_tree.args;
		var childs = code_tree.childs;
		var func_name = code_tree["str_name"];
		if (code_tree.flags["declare"]) {
			return "";
		}
		var old_declare_class_level = this._declare_class_level;
		var old_func_args_count = this._is_func_args_count;
		var old_func_args_default_values = rtl.clone(this._is_func_args_default_values);
		var old_func_args = this._is_func_args;
		var old_func_name = this._func_name;
		this._declare_class_level = false;
		this._is_func_args = 1;
		this._is_func_args_count = 0;
		this._func_name = func_name;
		/* s = s + this.out("", level) */
		var name = "";
		if (code_tree.flags["static"]) {
			name = "static " + func_name;
		}
		else {
			name = "" + func_name;
		}
		s = s + this.out(name + "(" + this.run(args, level) + "){", level);
		if (name == "constructor") {
			if (this._class_extend_name != "" && rtl.isset(this._class_extend_name)) {
				s = s + this.out("super();", level + 1);
			}
			for (var i = 0; i < rtl.count(this._constructor_declare_vars); i++) {
				var code = this._constructor_declare_vars[i];
				if (rtl.isset(code.value)) {
					s = s + this.out("this." + code["str_name"] + " = " + this.run(code.value, level + 1) + this._semicolon, level + 1);
				}
				else {
					s = s + this.out("this." + code["str_name"] + " = null" + this._semicolon, level + 1);
				}
			}
		}
		var i = 0;
		var sz = rtl.count(this._is_func_args_default_values);
		while (i < sz) {
			var obj = this._is_func_args_default_values[i];
			s = s + this.out("if (!rtl.isset(" + obj.name + ")){" + obj.name + " = " + this.run(obj.value, level) + ";}", level + 1);
			i = i + 1;
		}
		this._is_func_args = 0;
		this._is_func_args_count = 0;
		this._is_func_args_default_values = [];
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		this._is_func_args = old_func_args;
		this._is_func_args_count = old_func_args_count;
		this._is_func_args_default_values = old_func_args_default_values;
		this._declare_class_level = old_declare_class_level;
		this._func_name = old_func_name;
		return s;
	}
	op_declare_class(code_tree, level){
		var s = "";
		var name = code_tree["str_name"];
		var childs = code_tree.childs;
		var is_export = code_tree.flags["export"];
		var old_declare_class_level = this._declare_class_level;
		var old_class_name = this._class_name;
		var old_class_extend_name = this._class_extend_name;
		var old_constructor_declare_vars = this._constructor_declare_vars;
		this._declare_class_level = true;
		this._class_name = name;
		this._class_extend_name = code_tree["extend_name"];
		/*  Считаем переменные которые должны быть объявлены в конструкторе */
		this._constructor_declare_vars = [];
		for (var i = 0; i < rtl.count(code_tree.childs); i++) {
			var code = code_tree.childs[i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && !code.flags.static) {
				rtl.array_push(this._constructor_declare_vars, code);
			}
		}
		var extend_name = code_tree["extend_name"];
		if (!rtl.isset(extend_name)) {
			s = s + this.out("class " + name + "{", level);
		}
		else {
			s = s + this.out("class " + name + " extends " + extend_name + " {", level);
		}
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		this._declare_class_level = old_declare_class_level;
		/*  Считаем статические переменные которые должны быть объявлены после класса */
		var i = 0;
		var sz = rtl.count(code_tree.childs);
		while (i < sz) {
			var code = code_tree.childs[i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && code.flags.static) {
				if (rtl.isset(code.value)) {
					s = s + this.out(name + "." + code["str_name"] + " = " + this.run(code.value, level) + this._semicolon, level);
				}
				else {
					s = s + this.out(name + "." + code["str_name"] + " = null" + this._semicolon, level);
				}
			}
			i = i + 1;
		}
		this._class_name = old_class_name;
		this._class_extend_name = old_class_extend_name;
		this._constructor_declare_vars = old_constructor_declare_vars;
		return s;
	}
	op_ret(code_tree, level){
		var s = "return " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon);
		return this.out(s, level);
	}
	op_if(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var childs_false = code_tree["childs_false"];
		var childs_true = code_tree["childs_true"];
		var else_if = code_tree["else_if"];
		s = s + this.out("if (" + this.run(expr, level) + ") {", level);
		s = s + this.run(childs_true, level + 1);
		s = s + this.out("}", level);
		if (rtl.count(else_if) > 0 && else_if != null) {
			var i = 0;
			while (i < rtl.count(else_if)) {
				s = s + rtl.str_repeat(this._ident, level) + "else ";
				s = s + rtl.trim(this.run(else_if[i], level)) + this._crlf;
				i = i + 1;
			}
		}
		if (childs_false != null && rtl.count(childs_false) > 0) {
			s = s + this.out("else {", level);
			s = s + this.run(childs_false, level + 1);
			s = s + this.out("}", level);
		}
		return s;
	}
	op_while(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var childs = code_tree["childs"];
		s = s + this.out("while (" + this.run(expr, level) + ") {", level);
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		return s;
	}
	op_for(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var loop_init = code_tree.init;
		var loop_expression = code_tree.expr;
		var loop_inc = code_tree.inc;
		var childs = code_tree["childs"];
		this._semicolon = "";
		s = s + this.out("for (" + rtl.trim(this.run(loop_init, level)) + "; " + rtl.trim(this.run(loop_expression, level)) + "; " + rtl.trim(this.run(loop_inc, level)) + ") {", level);
		this._semicolon = ";";
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		return s;
	}
	op_foreach(code_tree, level){
		var s = "";
		var key_name = code_tree["key_name"];
		var value_name = code_tree["value_name"];
		var arr_name = this.run(code_tree["name"], level);
		var childs = code_tree["childs"];
		s = s + this.out("for (var " + key_name + " in " + arr_name + "){", level);
		s = s + this.out("var " + value_name + " = " + arr_name + "[" + key_name + "];", level + 1);
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		return s;
	}
	op_throw(code_tree, level){
		return this.out("throw " + this.run(code_tree.value, level) + this._semicolon, level);
	}
	op_break(code_tree, level){
		return this.out("break" + this._semicolon, level);
	}
	op_continue(code_tree, level){
		return this.out("continue" + this._semicolon, level);
	}
	/*  Операции */
	op_calc(code_tree, level){
		var _res = "";
		this._calc_level = this._calc_level + 1;
		var i = 0;
		while (i < rtl.count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null) {
				_res = _res + this.run(code, level);
			}
			i = i + 1;
		}
		this._calc_level = this._calc_level - 1;
		if (this._calc_level > 0) {
			return "(" + _res + ")";
		}
		return _res;
	}
	op_ternary(code_tree, level){
		var s = "(" + rtl.toString(this.run(code_tree.expr)) + ") ? " + rtl.toString(this.run(code_tree.expr_true)) + " : " + rtl.toString(this.run(code_tree.expr_false));
		if (this._calc_level > 0) {
			return "(" + rtl.toString(s) + ")";
		}
		return s;
	}
	op_fixed(code_tree, level){
		return code_tree["str"];
	}
	op_string(code_tree, level){
		/* 
		#switch
		#case ifcode JAVASCRIPT then
		var value = rtl.preg_replace('"', "\\\"", code_tree.value);
		#endswitch
	 */
		/* return "'" + value + "'" */
		return rtl.json_encode(code_tree["str"]);
	}
	op_json(code_tree, level){
		var _res = "";
		var obj = code_tree["obj"];
		var ci = 0;
		_res += "{" + this._crlf;
		for (var key in obj){
			var value = obj[key];
			_res += this.out(rtl.json_encode(key) + ":" + this.run(value, level + 1) + ",", level + 1);
			ci++;
		}
		_res += rtl.str_repeat(this._ident, level) + "}";
		if (ci == 0) {
			_res = "{}";
		}
		return _res;
	}
	op_array(code_tree, level){
		var _res = "";
		var ch = "";
		var i = 0;
		while (i < rtl.count(code_tree.values)) {
			var code = code_tree.values[i];
			if (code != null) {
				_res = _res + ch + this.run(code, level);
				ch = ", ";
			}
			i = i + 1;
		}
		return "[" + _res + "]";
	}
	getName(name, escape){
		if (!rtl.isset(escape)){escape = true;}
		if (name == "__CLASS_NAME__") {
			return "this";
		}
		return name;
	}
	op_load(code_tree, level){
		return this.getName(code_tree["str_name"]);
	}
	op_load_names(code_tree, level){
		var old_calc_level = rtl.clone(this._calc_level);
		this._calc_level = 0;
		var arr = code_tree.arr;
		var sz = rtl.count(arr);
		var code = null;
		var _res = [];
		for (var i = 0; i < sz; i++) {
			code = arr[i];
			var str_name = code["str_name"];
			if (str_name == "self") {
				str_name = this._class_name;
			}
			if (code["op"] == BayrellCode.OP_LOAD) {
				if (str_name == "parent" && this._func_name != "constructor") {
					str_name = "rtl.bind(" + rtl.toString(this._class_extend_name) + ".prototype." + rtl.toString(this._func_name) + ", this)";
				}
				else {
					str_name = this.getName(str_name);
				}
				rtl.array_push(_res, str_name);
			}
			else if (code["op"] == BayrellCode.OP_LOAD_ARR) {
				rtl.array_push(_res, "[" + rtl.toString(this.run(code["pos"], level)) + "]");
			}
			else if (code["op"] == BayrellCode.OP_LOAD_STATIC) {
				rtl.array_push(_res, "." + rtl.toString(str_name));
			}
			else if (code["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
				rtl.array_push(_res, "." + rtl.toString(str_name));
			}
			else if (code["op"] == BayrellCode.OP_CALL) {
				rtl.array_push(_res, this.op_call(code, level));
			}
		}
		this._calc_level = old_calc_level;
		if (old_calc_level > 0) {
			return rtl.implode("", _res);
		}
		return this.out(rtl.implode("", _res) + this._semicolon, level);
	}
	op_load_names_calc(code_tree, level){
		this._calc_level = this._calc_level + 1;
		var _res = this.op_load_names(code_tree, level);
		this._calc_level = this._calc_level - 1;
		return _res;
	}
	op_call(code_tree, level){
		var old_calc_level = this._calc_level;
		this._calc_level = 0;
		var args = "";
		var ch = "";
		var i = 0;
		while (i < rtl.count(code_tree.args)) {
			var arg = code_tree.args[i];
			if (arg != null) {
				args = args + ch + this.run(arg, level);
				ch = ", ";
			}
			i = i + 1;
		}
		this._calc_level = old_calc_level;
		return "(" + args + ")";
	}
	op_clone(code_tree, level){
		return "rtl.clone(" + this.run(code_tree.value, level) + ")";
	}
	op_link(code_tree, level){
		return this.run(code_tree.value, level);
	}
	op_new(code_tree, level){
		return "new " + this.run(code_tree.value);
	}
	op_neg(code_tree, level){
		return "-" + this.run(code_tree.value);
	}
	op_add(code_tree, level){
		return " + " + this.run(code_tree.value);
	}
	op_sub(code_tree, level){
		return " - " + this.run(code_tree.value);
	}
	op_concat(code_tree, level){
		if (code_tree.value.op == BayrellCode.OP_STRING) {
			return " + " + this.run(code_tree.value);
		}
		var old_calc_level = this._calc_level;
		this._calc_level = 0;
		var res = " + rtl.toString(" + this.run(code_tree.value) + ")";
		this._calc_level = old_calc_level;
		return res;
	}
	op_mult(code_tree, level){
		return " * " + this.run(code_tree.value);
	}
	op_div(code_tree, level){
		return " / " + this.run(code_tree.value);
	}
	op_mod(code_tree, level){
		return " % " + this.run(code_tree.value);
	}
	op_not(code_tree, level){
		return "!" + this.run(code_tree.value);
	}
	op_and(code_tree, level){
		return " && " + this.run(code_tree.value);
	}
	op_or(code_tree, level){
		return " || " + this.run(code_tree.value);
	}
	op_pow(code_tree, level){
		return "";
	}
	op_pre_inc(code_tree, level){
		return "++" + this.run(code_tree.value);
	}
	op_pre_dec(code_tree, level){
		return "--" + this.run(code_tree.value);
	}
	op_post_inc(code_tree, level){
		return this.run(code_tree.value) + "++";
	}
	op_post_dec(code_tree, level){
		return this.run(code_tree.value) + "--";
	}
	op_inc(code_tree, level){
		return this.out(this.run(code_tree.value) + "++" + this._semicolon, level);
	}
	op_dec(code_tree, level){
		return this.out(this.run(code_tree.value) + "--" + this._semicolon, level);
	}
	op_cmp(code_tree, level){
		return this.run(code_tree.left) + " " + code_tree.cond + " " + this.run(code_tree.right);
	}
}
module.exports.BayrellTranslatorES6 = BayrellTranslatorES6;
