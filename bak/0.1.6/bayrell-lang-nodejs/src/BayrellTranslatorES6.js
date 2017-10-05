/*
!
BayrellTranslatorES6
https://github.com/bayrell/bayrell
Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/
var m_bayrell_rtl = require('bayrell-rtl');
var isset = m_bayrell_rtl.isset;
var count = m_bayrell_rtl.count;
var str_repeat = m_bayrell_rtl.str_repeat;
var trim = m_bayrell_rtl.trim;
var is_object = m_bayrell_rtl.is_object;
var m__BayrellTranslator = require('./BayrellTranslator.js');
var BayrellTranslator = m__BayrellTranslator.BayrellTranslator;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellTranslatorES6 extends BayrellTranslator {
	
	constructor(){
		super();
		this._declare_class_level = false;
		this._calc_level = 0;
		this._is_func_args = 0;
		this._is_func_args_count = 0;
	}
	/*
	Операторы
	*/
	
	op_comment(code_tree, level){
		return this.out("/*", level) + this.out(code_tree.value, level) + this.out("*/", level);
	}
	
	op_assign(code_tree, level){
		var s = "";
		if (is_object(code_tree.name)) {
			s = this.run(code_tree.name, 0);
		}
		else {
			s = code_tree.name;
		}
		return this.out(s + " = " + this.run(code_tree.value, 0) + ";", level);
	}
	
	op_declare_var(code_tree, level){
		var s;
		if (this._declare_class_level && !this._is_func_args) {
			return "";
		}
		if (this._is_func_args) {
			if (this._is_func_args_count == 0) {
				s = code_tree.name;
			}
			else {
				s = ", " + code_tree.name;
			}
			this._is_func_args_count = this._is_func_args_count + 1;
			return s;
		}
		else {
			var name = "";
			if (code_tree.flags["static"]) {
				name = "static " + code_tree.name;
			}
			else {
				name = "var " + code_tree.name;
			}
			if (code_tree.value != null) {
				s = name + " = " + this.run(code_tree.value, 0) + ";";
			}
			else {
				s = name + ";";
			}
			return this.out(s, level);
		}
	}
	
	op_declare_func(code_tree, level){
		var s = "";
		var args = code_tree.args;
		var childs = code_tree.childs;
		var name = code_tree.name;
		var old_declare_class_level = this._declare_class_level;
		var old_func_args_count = this._is_func_args_count;
		var old_func_args = this._is_func_args;
		this._declare_class_level = false;
		this._is_func_args = 1;
		this._is_func_args_count = 0;
		s = s + this.out("", level);
		var name = "";
		if (code_tree.flags["static"]) {
			name = "static " + code_tree.name;
		}
		else {
			name = "" + code_tree.name;
		}
		s = s + this.out((name + "(" + this.run(args, 0) + "){"), level);
		this._is_func_args = old_func_args;
		this._is_func_args_count = old_func_args_count;
		s = s + this.run(childs, (level + 1));
		s = s + this.out("}", level);
		this._declare_class_level = old_declare_class_level;
		return s;
	}
	
	op_declare_class(code_tree, level){
		var s = "";
		var name = code_tree.name;
		var childs = code_tree.childs;
		var is_export = code_tree.flags["export"];
		var old_declare_class_level = this._declare_class_level;
		this._declare_class_level = true;
		var extend_name = code_tree["extend_name"];
		if (!isset(extend_name)) {
			s = s + this.out(("class " + name + "{"), level);
		}
		else {
			s = s + this.out(("class " + name + " extends " + extend_name + " {"), level);
		}
		s = s + this.run(childs, (level + 1));
		s = s + this.out("}", level);
		this._declare_class_level = old_declare_class_level;
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && code.flags.static) {
				s = s + this.out((name + "." + code.name + " = " + this.run(code.value, 0) + ";"));
			}
			i = i + 1;
		}
		return s;
	}
	
	op_ret(code_tree, level){
		var s = "return " + this.run(code_tree.value, 0) + ";";
		return this.out(s, level);
	}
	
	op_if(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var _false = code_tree["false"];
		var _else_if = code_tree["else_if"];
		var _true = code_tree["true"];
		s = s + this.out(("if (" + this.run(expr, 0) + ") {"), level);
		s = s + this.run(_true, (level + 1));
		s = s + this.out("}", level);
		if (count(_else_if) > 0 && _else_if != null) {
			var i = 0;
			while (i < count(_else_if)) {
				s = s + str_repeat(this._ident, level) + "else ";
				s = s + trim(this.run(_else_if[i], level)) + this._crlf;
				i = i + 1;
			}
		}
		if (_false != null) {
			s = s + this.out("else {", level);
			s = s + this.run(_false, (level + 1));
			s = s + this.out("}", level);
		}
		return s;
	}
	
	op_while(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var childs = code_tree["childs"];
		s = s + this.out(("while (" + this.run(expr, 0) + ") {"), level);
		s = s + this.run(childs, (level + 1));
		s = s + this.out("}", level);
		return s;
	}
	
	op_throw(code_tree, level){
		return this.out("throw " + this.run(code_tree.value, 0) + ";", level);
	}
	
	op_break(code_tree, level){
		return this.out("break;", level);
	}
	
	op_continue(code_tree, level){
		return this.out("continue;", level);
	}
	
	op_call_func(code_tree, level){
		var args = "";
		var ch = "";
		var i = 0;
		while (i < count(code_tree.args)) {
			var arg = code_tree.args[i];
			if (arg != null) {
				args = args + ch + this.run(arg, 0);
				ch = ", ";
			}
			i = i + 1;
		}
		var s = "";
		if (is_object(code_tree.name)) {
			s = this.run(code_tree.name, 0);
		}
		else {
			s = code_tree.name;
		}
		return this.out(code_tree.name + "(" + args + ");", level);
	}
	/*
	Операции
	*/
	
	op_calc(code_tree, level){
		var result = "";
		this._calc_level = this._calc_level + 1;
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null) {
				result = result + this.run(code, 0);
			}
			i = i + 1;
		}
		this._calc_level = this._calc_level - 1;
		if (this._calc_level > 0) {
			return "(" + result + ")";
		}
		return result;
	}
	
	op_calc_nope(code_tree, level){
		var result = "";
		this._calc_level = this._calc_level + 1;
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null) {
				result = result + this.run(code, 0);
			}
			i = i + 1;
		}
		this._calc_level = this._calc_level - 1;
		return result;
	}
	
	op_fixed(code_tree, level){
		return code_tree.value;
	}
	
	op_string(code_tree, level){
		return "\"" + code_tree.value.replace("\"", "\\\"") + "\"";
	}
	
	op_json(code_tree, level){
		return code_tree.value;
	}
	
	op_array(code_tree, level){
		var result = "";
		var ch = "";
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null) {
				result = result + ch + this.run(code, 0);
				ch = ", ";
			}
			i = i + 1;
		}
		return "[" + result + "]";
	}
	
	op_load(code_tree, level){
		return code_tree.name;
	}
	
	op_load_arr(code_tree, level){
		return code_tree.name + "[" + this.run(code_tree.pos, 0) + "]";
	}
	
	op_load_static(code_tree, level){
		return code_tree.name.join(".");
	}
	
	op_load_dynamic(code_tree, level){
		return code_tree.name.join(".");
	}
	
	op_clone(code_tree, level){
		return "";
	}
	
	op_link(code_tree, level){
		return this.run(code_tree.value, 0);
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
		return "";
	}
	
	op_pre_dec(code_tree, level){
		return "";
	}
	
	op_post_inc(code_tree, level){
		return "";
	}
	
	op_post_dec(code_tree, level){
		return "";
	}
	
	op_call(code_tree, level){
		var args = "";
		var ch = "";
		var i = 0;
		while (i < count(code_tree.args)) {
			var arg = code_tree.args[i];
			if (arg != null) {
				args = args + ch + this.run(arg, 0);
				ch = ", ";
			}
			i = i + 1;
		}
		var s = "";
		if (is_object(code_tree.name)) {
			s = this.run(code_tree.name, 0);
		}
		else {
			s = code_tree.name;
		}
		return s + "(" + args + ")";
	}
	
	op_cmp(code_tree, level){
		return this.run(code_tree.left) + " " + code_tree.expr + " " + this.run(code_tree.right);
	}
}
module.exports.BayrellTranslatorES6 = BayrellTranslatorES6;
