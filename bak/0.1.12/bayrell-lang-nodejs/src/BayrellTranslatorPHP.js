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
class BayrellTranslatorPHP extends BayrellTranslator {
	static newInstance(){
		return new BayrellTranslatorPHP();
	}
	constructor(){
		super();
		this._declare_class_level = false;
		this._calc_level = 0;
		this._is_func_args = 0;
		this._is_func_args_count = 0;
		this._class_name = "";
		this._class_extend_name = "";
		this._func_name = "";
		this._namespace = "";
		this._semicolon = ";";
		this._skip_escape_for_big_words = false;
	}
	createInterpreter(){
		var runtime = BayrellTranslator.prototype.createInterpreter.call(this);
		runtime.addData({
			"PHP":true,
		});
		return runtime;
	}
	translate(code_tree){
		var _res = this.run(code_tree, 0);
		_res = "<?\n" + _res;
		return _res;
	}
	/*  Операторы  */
	op_comment(code_tree, level){
		var value = rtl.preg_replace("\t", this._ident, code_tree["str"]);
		return this.out("/*" + value + " */", level);
	}
	op_namespace(code_tree, level){
		var name = code_tree["str_name"];
		this._namespace = name;
		return this.out("namespace " + name + this._semicolon, level);
	}
	op_use(code_tree, level){
		var _res = "";
		var name = code_tree["str_name"];
		var lib_name = name;
		var sz = rtl.count(code_tree["arr"]);
		if (sz > 0) {
			for (var i = 0; i < sz; i++) {
				var obj = code_tree.arr[i];
				if (rtl.in_array(obj, BayrellCode.PHP_RTL_FUNC)) {
					continue;
				}
				var isFunc = false;
				if (rtl.strtoupper(obj[0]) != obj[0] && obj != "rtl") {
					isFunc = true;
				}
				if (lib_name[0] == ".") {
					/*  TODO: Решить задачу с функциями их и подключением  */
					if (this._namespace == "bayrell_rtl" && isFunc) {
						continue;
					}
					_res = _res + this.out("use \\" + this._namespace + "\\" + obj + this._semicolon, level);
				}
				else {
					/*  TODO: Решить задачу с функциями их и подключением  */
					if (lib_name == "bayrell_rtl" && isFunc) {
						continue;
					}
					_res = _res + this.out("use \\" + lib_name + "\\" + obj + this._semicolon, level);
				}
			}
		}
		return _res;
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
		var res = this.out(s + " .= " + this.run(code_tree.value, level) + this._semicolon, level);
		return res;
	}
	op_declare_var(code_tree, level){
		var s;
		if (this._is_func_args) {
			var name = "$" + code_tree.str_name;
			if (code_tree.flags["pointer"]) {
				name = "&" + name;
			}
			if (this._is_func_args_count == 0) {
				s = name;
			}
			else {
				s = ", " + name;
			}
			if (code_tree.value != null) {
				s = s + " = " + this.run(code_tree.value, level);
			}
			this._is_func_args_count = this._is_func_args_count + 1;
		}
		else {
			var name = "$" + code_tree.str_name;
			/* 
			if (code_tree.flags['const']){
				name = 'const ' +  name;
			} */
			if (code_tree.flags["public"]) {
				name = "public " + name;
			}
			else if (code_tree.flags["private"]) {
				name = "private " + name;
			}
			else if (code_tree.flags["protected"]) {
				name = "protected " + name;
			}
			else {
				if (this._declare_class_level) {
					name = "public " + name;
				}
			}
			if (code_tree.flags["static"]) {
				name = "static " + name;
			}
			if (code_tree.value != null) {
				s = name + " = " + this.run(code_tree.value, level) + this._semicolon;
			}
			else {
				s = name + " = null" + this._semicolon;
			}
			s = this.out(s, level);
		}
		return s;
	}
	op_declare_func(code_tree, level){
		var s = "";
		var args = code_tree["args"];
		var childs = code_tree["childs"];
		var func_name = code_tree["str_name"];
		if (func_name == "constructor") {
			func_name = "__construct";
		}
		else if (func_name == "destructor") {
			func_name = "__destruct";
		}
		if (code_tree.flags["declare"]) {
			return "";
		}
		var old_declare_class_level = this._declare_class_level;
		var old_func_args_count = this._is_func_args_count;
		var old_func_args = this._is_func_args;
		var old_func_name = this._func_name;
		this._declare_class_level = false;
		this._is_func_args = 1;
		this._is_func_args_count = 0;
		this._func_name = func_name;
		/* s = s + this.out("", level); */
		var name = "";
		var flag_pointer = "";
		if (code_tree.flags["pointer"]) {
			flag_pointer = "&";
		}
		if (code_tree.flags["static"]) {
			name = "static function " + flag_pointer + func_name;
		}
		else {
			name = "function " + flag_pointer + func_name;
		}
		s = s + this.out(name + "(" + this.run(args, level) + "){", level);
		if (func_name == "__construct") {
			if (this._class_extend_name != "" && rtl.exists(this._class_extend_name)) {
				s = s + this.out("parent::__construct();", level + 1);
			}
		}
		this._is_func_args = old_func_args;
		this._is_func_args_count = old_func_args_count;
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		this._declare_class_level = old_declare_class_level;
		this._func_name = old_func_name;
		return s;
	}
	op_declare_class(code_tree, level){
		var s = "";
		var name = code_tree["str_name"];
		var childs = code_tree["childs"];
		var is_export = code_tree.flags["export"];
		var old_declare_class_level = this._declare_class_level;
		var old_class_name = this._class_name;
		var old_class_extend_name = this._class_extend_name;
		this._declare_class_level = true;
		this._class_name = name;
		this._class_extend_name = code_tree["extend_name"];
		var extend_name = code_tree["extend_name"];
		if (!rtl.exists(extend_name)) {
			s = s + this.out("class " + name + "{", level);
		}
		else {
			s = s + this.out("class " + name + " extends " + extend_name + " {", level);
		}
		s = s + this.run(childs, level + 1);
		s = s + this.out("}", level);
		this._declare_class_level = old_declare_class_level;
		this._class_extend_name = old_class_extend_name;
		this._class_name = old_class_name;
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
		s = s + this.out("if (" + this.run(expr, level) + "){", level);
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
			s = s + this.out("else{", level);
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
		s = s + this.out("foreach (" + arr_name + " as $" + key_name + " => $" + value_name + "){", level);
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
	/*  Операции  */
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
		var s = code_tree["str"];
		var _res = "";
		var sz = rtl.strlen(s);
		for (var i = 0; i < sz; i++) {
			if (s[i] == "$") {
				_res += "\\$";
			}
			else if (s[i] == "\"") {
				_res += "\\\"";
			}
			else if (s[i] == "\n") {
				_res += "\\n";
			}
			else if (s[i] == "\t") {
				_res += "\\t";
			}
			else if (s[i] == "\r") {
				_res += "\\r";
			}
			else if (s[i] == "\\") {
				_res += "\\\\";
			}
			else {
				_res += rtl.toString(s[i]);
			}
		}
		return "\"" + _res + "\"";
	}
	op_json(code_tree, level){
		var _res = "";
		var obj = code_tree["obj"];
		var ci = 0;
		_res += "[" + this._crlf;
		for (var key in obj){
			var value = obj[key];
			_res += this.out(rtl.json_encode(key) + " => " + this.run(value, level + 1) + ",", level + 1);
			ci++;
		}
		_res += rtl.str_repeat(this._ident, level) + "]";
		if (ci == 0) {
			_res = "[]";
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
				_res = _res + rtl.toString(ch) + rtl.toString(this.run(code, level));
				ch = ", ";
			}
			i = i + 1;
		}
		return "[" + rtl.toString(_res) + "]";
	}
	getName(name, escape){
		if (!rtl.exists(escape)){escape = true;}
		if (rtl.in_array(name, ["null", "false", "true"])) {
			return name;
		}
		if (name == "__CLASS_NAME__") {
			return "get_called_class()";
		}
		if (escape && this._skip_escape_for_big_words) {
			if (rtl.strtoupper(name) == name) {
				escape = false;
			}
		}
		if (escape) {
			return "$" + rtl.toString(name);
		}
		return name;
	}
	op_load(code_tree, level){
		var name = code_tree["str_name"];
		return this.getName(name);
	}
	op_load_names(code_tree, level){
		var old_calc_level = rtl.clone(this._calc_level);
		this._calc_level = 0;
		var old_skip_escape_for_big_words = this._skip_escape_for_big_words;
		this._skip_escape_for_big_words = false;
		var arr = code_tree.arr;
		var sz = rtl.count(arr);
		var code = null;
		var _res = [];
		for (var i = 0; i < sz; i++) {
			var is_escape = true;
			if (i + 1 < sz) {
				code = arr[i + 1];
				if (rtl.in_array(code["op"], [BayrellCode.OP_LOAD_STATIC, BayrellCode.OP_CALL])) {
					is_escape = false;
				}
			}
			code = arr[i];
			var str_name = code["str_name"];
			if (code["op"] == BayrellCode.OP_LOAD) {
				if (str_name == "parent" && this._func_name != "constructor") {
					str_name = "parent::" + rtl.toString(this._func_name);
				}
				rtl.array_push(_res, this.getName(str_name, is_escape));
			}
			else if (code["op"] == BayrellCode.OP_LOAD_ARR) {
				rtl.array_push(_res, "[" + rtl.toString(this.run(code["pos"], level)) + "]");
			}
			else if (code["op"] == BayrellCode.OP_LOAD_STATIC) {
				if (is_escape) {
					rtl.array_push(_res, "::$" + rtl.toString(str_name));
				}
				else {
					rtl.array_push(_res, "::" + rtl.toString(str_name));
				}
			}
			else if (code["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
				rtl.array_push(_res, "->" + rtl.toString(str_name));
			}
			else if (code["op"] == BayrellCode.OP_CALL) {
				rtl.array_push(_res, this.op_call(code, level));
			}
		}
		this._skip_escape_for_big_words = old_skip_escape_for_big_words;
		this._calc_level = old_calc_level;
		if (old_calc_level > 0) {
			return rtl.implode("", _res);
		}
		return this.out(rtl.implode("", _res) + rtl.toString(this._semicolon), level);
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
		return "(" + rtl.toString(args) + ")";
	}
	op_clone(code_tree, level){
		return this.run(code_tree.value, level);
	}
	op_link(code_tree, level){
		return "&" + rtl.toString(this.run(code_tree.value, level));
	}
	op_new(code_tree, level){
		return "new " + rtl.toString(this.run(code_tree.value));
	}
	op_neg(code_tree, level){
		return "-" + rtl.toString(this.run(code_tree.value));
	}
	op_add(code_tree, level){
		return " + " + rtl.toString(this.run(code_tree.value));
	}
	op_sub(code_tree, level){
		return " - " + rtl.toString(this.run(code_tree.value));
	}
	op_concat(code_tree, level){
		return " . " + rtl.toString(this.run(code_tree.value));
	}
	op_mult(code_tree, level){
		return " * " + rtl.toString(this.run(code_tree.value));
	}
	op_div(code_tree, level){
		return " / " + rtl.toString(this.run(code_tree.value));
	}
	op_mod(code_tree, level){
		return " % " + rtl.toString(this.run(code_tree.value));
	}
	op_not(code_tree, level){
		return "!" + rtl.toString(this.run(code_tree.value));
	}
	op_and(code_tree, level){
		return " && " + rtl.toString(this.run(code_tree.value));
	}
	op_or(code_tree, level){
		return " || " + rtl.toString(this.run(code_tree.value));
	}
	op_pow(code_tree, level){
		return "";
	}
	op_pre_inc(code_tree, level){
		return "++" + rtl.toString(this.run(code_tree.value));
	}
	op_pre_dec(code_tree, level){
		return "--" + rtl.toString(this.run(code_tree.value));
	}
	op_post_inc(code_tree, level){
		return this.run(code_tree.value) + "++";
	}
	op_post_dec(code_tree, level){
		return this.run(code_tree.value) + "--";
	}
	op_inc(code_tree, level){
		return this.out(this.run(code_tree.value) + "++" + rtl.toString(this._semicolon), level);
	}
	op_dec(code_tree, level){
		return this.out(this.run(code_tree.value) + "--" + rtl.toString(this._semicolon), level);
	}
	op_cmp(code_tree, level){
		return this.run(code_tree.left) + " " + rtl.toString(code_tree.cond) + " " + rtl.toString(this.run(code_tree.right));
	}
	op_instanceof(code_tree, level){
		var old1 = this._skip_escape_for_big_words;
		this._skip_escape_for_big_words = true;
		var s = this.run(code_tree.left) + " instanceof " + rtl.toString(this.run(code_tree.right));
		this._skip_escape_for_big_words = old1;
		return s;
	}
}
module.exports.BayrellTranslatorPHP = BayrellTranslatorPHP;
