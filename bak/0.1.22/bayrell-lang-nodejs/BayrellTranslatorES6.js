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
	getClassName(){
		return "bayrell_lang.BayrellTranslatorES6";
	}
	constructor(){
		super();
		this._modules = {
			"rtl": "BayrellRtl.Lib.rtl",
		};
		this._declare_class_level = false;
		this._calc_level = 0;
		this._is_func_args = 0;
		this._is_func_args_count = 0;
		this._is_func_args_default_values = [];
		this._class_name = "";
		this._class_extend_name = "";
		this._constructor_declare_vars = [];
		this._func_name = "";
		this._namespace = "";
		this._semicolon = ";";
	}
	createInterpreter(){
		var runtime = BayrellTranslator.prototype.createInterpreter.call(this);
		runtime.addData(
			{
				"JAVASCRIPT": true,
				"ES6": true,
			}
		);
		return runtime;
	}
	translate(code_tree){
		var _res = this.run(code_tree, 0);
		_res = "\"use strict;\"\n" + rtl.toString(_res);
		return _res;
	}
	/* Операторы */
	op_comment(code_tree, level){
		return this.out("/*" + rtl.toString(code_tree["str"]) + "*/", level);
	}
	op_namespace(code_tree, level){
		var name = code_tree["str_name"];
		this._namespace = name;
		return "";
	}
	op_assign(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " = " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon), level);
		return res;
	}
	op_assign_dec(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " -= " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon), level);
		return res;
	}
	op_assign_inc(code_tree, level){
		var s = this.run(code_tree.name, level);
		var res = this.out(s + " += " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon), level);
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
			val = this.getName("rtl") + ".toString(" + rtl.toString(this.run(code_tree.value, level)) + ")";
			this._calc_level = old_calc_level;
		}
		return this.out(s + " += " + rtl.toString(val) + rtl.toString(this._semicolon), level);
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
				s = ", " + rtl.toString(name);
			}
			if (code_tree.value != null) {
				rtl.array_push(
					this._is_func_args_default_values,
					{
						"name": name,
						"value": code_tree.value,
					}
				);
			}
			this._is_func_args_count = this._is_func_args_count + 1;
		}
		else {
			var name = code_tree["str_name"];
			if (code_tree.flags["static"]) {
				name = "static " + rtl.toString(name);
			}
			if (code_tree.value != null) {
				s = "var " + rtl.toString(name) + " = " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon);
			}
			else {
				s = "var " + rtl.toString(name) + rtl.toString(this._semicolon);
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
		/*s = s ~ this.out("", level);*/
		var name = "";
		if (code_tree.flags["static"]) {
			name = "static " + rtl.toString(func_name);
		}
		else {
			name = "" + rtl.toString(func_name);
		}
		s = s + rtl.toString(this.out(name + "(" + rtl.toString(this.run(args, level)) + "){", level));
		if (name == "constructor") {
			/*
			if (this._class_extend_name != "" and rtl::exists(this._class_extend_name)){
				s = s ~ this.out("super();", level+1);
			}
			*/
		}
		var i = 0;
		var sz = rtl.count(this._is_func_args_default_values);
		while (i < sz) {
			var obj = this._is_func_args_default_values[i];
			s = s + rtl.toString(this.out("if (!" + rtl.toString(this.getName("rtl")) + ".exists(" + rtl.toString(obj.name) + ")){" + rtl.toString(obj.name) + " = " + rtl.toString(this.run(obj.value, level)) + ";}", level + 1));
			i = i + 1;
		}
		this._is_func_args = 0;
		this._is_func_args_count = 0;
		this._is_func_args_default_values = [];
		s = s + rtl.toString(this.run(childs, level + 1));
		s = s + rtl.toString(this.out("}", level));
		this._is_func_args = old_func_args;
		this._is_func_args_count = old_func_args_count;
		this._is_func_args_default_values = old_func_args_default_values;
		this._declare_class_level = old_declare_class_level;
		this._func_name = old_func_name;
		return s;
	}
	op_use(code_tree, level){
		var lib_name = code_tree["str_name"];
		var arr = rtl.explode(".", lib_name);
		var sz_arr = rtl.count(arr);
		var class_name = arr[sz_arr - 1];
		this._modules[class_name] = lib_name;
		return "";
	}
	op_declare_class(code_tree, level){
		var s = "";
		var implements_arr = code_tree["implements_arr"];
		var name = code_tree["str_name"];
		var childs = code_tree["childs"];
		var is_export = code_tree.flags["export"];
		var old_declare_class_level = this._declare_class_level;
		var old_class_name = this._class_name;
		var old_class_extend_name = this._class_extend_name;
		var old_constructor_declare_vars = this._constructor_declare_vars;
		this._declare_class_level = true;
		this._class_name = name;
		this._class_extend_name = code_tree["extend_name"];
		this._modules[this._class_name] = this._namespace + "." + rtl.toString(this._class_name);
		var jarr = [];
		var namespace_arr = rtl.explode(".", this._namespace);
		for (var i = 0; i < rtl.count(namespace_arr); i++) {
			var jname = namespace_arr[i];
			rtl.array_push(jarr, jname);
			var jstr = rtl.implode(".", jarr);
			s = s + rtl.toString(this.out("if (typeof " + rtl.toString(jstr) + " == 'undefined') " + rtl.toString(jstr) + " = {};", level));
		}
		/* Считаем переменные которые должны быть объявлены в конструкторе */
		this._constructor_declare_vars = [];
		for (var i = 0; i < rtl.count(code_tree["childs"]); i++) {
			var code = code_tree["childs"][i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && !code.flags.static) {
				rtl.array_push(this._constructor_declare_vars, code);
			}
		}
		var extend_name = code_tree["extend_name"];
		if (!rtl.exists(extend_name)) {
			s = s + rtl.toString(this.out(this._namespace + "." + rtl.toString(name) + " = class {", level));
		}
		else {
			s = s + rtl.toString(this.out(this._namespace + "." + rtl.toString(name) + " = class extends " + rtl.toString(this.getName(extend_name)) + "{", level));
		}
		if (this._namespace != "BayrellRtl" || this._class_name != "CoreObject") {
			if (rtl.count(this._constructor_declare_vars) > 0 || rtl.count(implements_arr) > 0) {
				s = s + rtl.toString(this.out("_init(){", level + 1));
				if (rtl.exists(this._class_extend_name)) {
					s = s + rtl.toString(this.out("super._init();", level + 2));
				}
				for (var i = 0; i < rtl.count(this._constructor_declare_vars); i++) {
					var code = this._constructor_declare_vars[i];
					if (rtl.exists(code.value)) {
						s = s + rtl.toString(this.out("this." + rtl.toString(code["str_name"]) + " = " + rtl.toString(this.run(code.value, level + 2)) + rtl.toString(this._semicolon), level + 2));
					}
					else {
						s = s + rtl.toString(this.out("this." + rtl.toString(code["str_name"]) + " = null" + rtl.toString(this._semicolon), level + 2));
					}
				}
				/* Добавляем интерфейсы */
				s = s + rtl.toString(this.out("this.__implements__ = []" + rtl.toString(this._semicolon), level + 2));
				for (var i = 0; i < rtl.count(implements_arr); i++) {
					var implements_name = implements_arr[i];
					s = s + rtl.toString(this.out("this.__implements__.push('" + rtl.toString(this.getName(implements_name)) + "')" + rtl.toString(this._semicolon), level + 2));
				}
				s = s + rtl.toString(this.out("}", level + 1));
			}
		}
		s = s + rtl.toString(this.run(childs, level + 1));
		s = s + rtl.toString(this.out("}", level));
		this._declare_class_level = old_declare_class_level;
		/* Считаем статические переменные которые должны быть объявлены после класса */
		var i = 0;
		var sz = rtl.count(code_tree["childs"]);
		while (i < sz) {
			var code = code_tree["childs"][i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && code.flags.static) {
				if (rtl.exists(code.value)) {
					s = s + rtl.toString(this.out(this._namespace + "." + rtl.toString(name) + "." + rtl.toString(code["str_name"]) + " = " + rtl.toString(this.run(code.value, level)) + rtl.toString(this._semicolon), level));
				}
				else {
					s = s + rtl.toString(this.out(this._namespace + "." + rtl.toString(name) + "." + rtl.toString(code["str_name"]) + " = null" + rtl.toString(this._semicolon), level));
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
		s = s + rtl.toString(this.out("if (" + rtl.toString(this.run(expr, level)) + ") {", level));
		s = s + rtl.toString(this.run(childs_true, level + 1));
		s = s + rtl.toString(this.out("}", level));
		if (rtl.count(else_if) > 0 && else_if != null) {
			var i = 0;
			while (i < rtl.count(else_if)) {
				s = s + rtl.toString(rtl.str_repeat(this._indent, level)) + "else ";
				s = s + rtl.toString(rtl.trim(this.run(else_if[i], level))) + rtl.toString(this._clr);
				i = i + 1;
			}
		}
		if (childs_false != null && rtl.count(childs_false) > 0) {
			s = s + rtl.toString(this.out("else {", level));
			s = s + rtl.toString(this.run(childs_false, level + 1));
			s = s + rtl.toString(this.out("}", level));
		}
		return s;
	}
	op_while(code_tree, level){
		var s = "";
		var expr = code_tree.expr;
		var childs = code_tree["childs"];
		s = s + rtl.toString(this.out("while (" + rtl.toString(this.run(expr, level)) + ") {", level));
		s = s + rtl.toString(this.run(childs, level + 1));
		s = s + rtl.toString(this.out("}", level));
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
		s = s + rtl.toString(this.out("for (" + rtl.toString(rtl.trim(this.run(loop_init, level))) + "; " + rtl.toString(rtl.trim(this.run(loop_expression, level))) + "; " + rtl.toString(rtl.trim(this.run(loop_inc, level))) + ") {", level));
		this._semicolon = ";";
		s = s + rtl.toString(this.run(childs, level + 1));
		s = s + rtl.toString(this.out("}", level));
		return s;
	}
	op_foreach(code_tree, level){
		var s = "";
		var key_name = code_tree["key_name"];
		var value_name = code_tree["value_name"];
		var arr_name = this.run(code_tree["name"], level);
		var childs = code_tree["childs"];
		s = s + rtl.toString(this.out("for (var " + rtl.toString(key_name) + " in " + rtl.toString(arr_name) + "){", level));
		s = s + rtl.toString(this.out("var " + rtl.toString(value_name) + " = " + rtl.toString(arr_name) + "[" + rtl.toString(key_name) + "];", level + 1));
		s = s + rtl.toString(this.run(childs, level + 1));
		s = s + rtl.toString(this.out("}", level));
		return s;
	}
	op_throw(code_tree, level){
		return this.out("throw " + rtl.toString(this.run(code_tree.value, level)) + rtl.toString(this._semicolon), level);
	}
	op_break(code_tree, level){
		return this.out("break" + rtl.toString(this._semicolon), level);
	}
	op_continue(code_tree, level){
		return this.out("continue" + rtl.toString(this._semicolon), level);
	}
	op_try_catch(code_tree, level){
		var s = "";
		s = s + rtl.toString(this.out("try{", level));
		s = s + rtl.toString(this.run(code_tree["try"], level + 1));
		s = s + rtl.toString(this.out("}", level));
		s = s + rtl.toString(this.out("catch (" + rtl.toString(code_tree.name) + "){", level));
		s = s + rtl.toString(this.run(code_tree["catch"], level + 1));
		s = s + rtl.toString(this.out("}", level));
		return s;
	}
	/* Операции */
	op_calc(code_tree, level){
		var _res = "";
		this._calc_level = this._calc_level + 1;
		var i = 0;
		var sz = rtl.count(code_tree["childs"]);
		while (i < sz) {
			var code = code_tree["childs"][i];
			if (code != null) {
				_res = _res + rtl.toString(this.run(code, level));
			}
			i = i + 1;
		}
		this._calc_level = this._calc_level - 1;
		if (this._calc_level > 0) {
			return "(" + rtl.toString(_res) + ")";
		}
		return _res;
	}
	op_ternary(code_tree, level){
		var s = "(" + rtl.toString(this.run(code_tree.expr, level)) + ") ? " + rtl.toString(this.run(code_tree.expr_true, level)) + " : " + rtl.toString(this.run(code_tree.expr_false, level));
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
		var value = rtl::preg_replace('"', "\\\"", code_tree.value);
		#endswitch
		*/
		/*return "'" + value + "'";*/
		return rtl.json_encode(code_tree["str"]);
	}
	op_json(code_tree, level){
		var _res = "";
		var obj = code_tree["obj"];
		var ci = 0;
		_res += rtl.toString("{" + rtl.toString(this._clr));
		for (var key in obj){
			var value = obj[key];
			_res += rtl.toString(this.out(rtl.json_encode(key) + ": " + rtl.toString(this.run(value, level + 1)) + ",", level + 1));
			ci++;
		}
		_res += rtl.toString(rtl.str_repeat(this._indent, level) + "}");
		if (ci == 0) {
			_res = "{}";
		}
		return _res;
	}
	op_array(code_tree, level){
		var values = code_tree["values"];
		var is_childs = BayrellTranslatorES6.isJsonChilds(values);
		var sz = rtl.count(values);
		if (sz == 0) {
			return "[]";
		}
		var _res = "";
		if (is_childs) {
			_res = "[" + rtl.toString(this._clr);
			for (var i = 0; i < sz; i++) {
				var code = values[i];
				if (i == sz - 1) {
					_res += rtl.toString(this.out(this.run(code, level + 1), level + 1));
				}
				else {
					_res += rtl.toString(this.out(this.run(code, level + 1) + ",", level + 1));
				}
			}
			_res += rtl.toString(rtl.str_repeat(this._indent, level) + "]");
		}
		else {
			_res = "[";
			var ch = "";
			for (var i = 0; i < sz; i++) {
				var code = values[i];
				_res += rtl.toString(ch + rtl.toString(this.run(code, level + 1)));
				ch = ", ";
			}
			_res += "]";
		}
		return _res;
	}
	op_call(code_tree, level){
		var old_calc_level = this._calc_level;
		this._calc_level = 0;
		var args = code_tree["args"];
		var is_childs = BayrellTranslatorES6.isJsonChilds(args);
		var sz = rtl.count(args);
		if (sz == 0) {
			this._calc_level = old_calc_level;
			return "()";
		}
		var _res = "";
		if (is_childs) {
			_res = "(" + rtl.toString(this._clr);
			for (var i = 0; i < sz; i++) {
				var arg = args[i];
				if (i == sz - 1) {
					_res += rtl.toString(this.out(this.run(arg, level + 1), level + 1));
				}
				else {
					_res += rtl.toString(this.out(this.run(arg, level + 1) + ",", level + 1));
				}
			}
			_res += rtl.toString(rtl.str_repeat(this._indent, level) + ")");
		}
		else {
			_res = "(";
			var ch = "";
			for (var i = 0; i < sz; i++) {
				var arg = args[i];
				_res += rtl.toString(ch + rtl.toString(this.run(arg, level)));
				ch = ", ";
			}
			_res += ")";
		}
		this._calc_level = old_calc_level;
		return _res;
	}
	getName(name, escape){
		if (!rtl.exists(escape)){escape = true;}
		if (name == "__CLASS_NAME__") {
			return "this.constructor.name";
		}
		else if (name == "__CLASS_FULL_NAME__") {
			return "eval(this.constructor.name).getClassName()";
		}
		else if (rtl.exists(this._modules[name])) {
			return this._modules[name];
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
		var arr = code_tree["arr"];
		var sz = rtl.count(arr);
		var code = null;
		var _res = [];
		for (var i = 0; i < sz; i++) {
			code = arr[i];
			var str_name = "";
			if (rtl.key_exists(code, "str_name")) {
				str_name = code["str_name"];
				if (str_name == "self") {
					str_name = this._namespace + "." + rtl.toString(this._class_name);
				}
			}
			if (str_name == "constructor" && this._func_name == "constructor") {
				continue;
			}
			if (code["op"] == BayrellCode.OP_LOAD) {
				if (str_name == "parent") {
					if (this._func_name == "constructor") {
						str_name = "super";
					}
					else {
						str_name = "super";
						/*
						str_name = "rtl.bind(" ~ 
							this._class_extend_name ~ 
							".prototype." ~ 
							this._func_name ~ 
							", this)"
						;*/
					}
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
		return this.out(rtl.implode("", _res) + rtl.toString(this._semicolon), level);
	}
	op_load_names_calc(code_tree, level){
		this._calc_level = this._calc_level + 1;
		var _res = this.op_load_names(code_tree, level);
		this._calc_level = this._calc_level - 1;
		return _res;
	}
	op_clone(code_tree, level){
		return this.getName("rtl") + ".clone(" + rtl.toString(this.run(code_tree["value"], level)) + ")";
	}
	op_link(code_tree, level){
		return this.run(code_tree["value"], level);
	}
	op_new(code_tree, level){
		return "new " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_del(code_tree, level){
		var s = "";
		this._calc_level = 1;
		var name = this.run(code_tree["value"], level);
		s += rtl.toString(this.out("if (" + rtl.toString(name) + " instanceof " + rtl.toString(this.getName("CoreObject")) + ") {" + rtl.toString(name) + "._del();}", level));
		this._calc_level = 0;
		/*s ~= this.out("delete " ~ this.run(code_tree['value'], level) ~ ";", level);*/
		return s;
	}
	op_neg(code_tree, level){
		return "-" + rtl.toString(this.run(code_tree["value"], level));
	}
	op_add(code_tree, level){
		return " + " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_sub(code_tree, level){
		return " - " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_concat(code_tree, level){
		if (code_tree["value"]["op"] == BayrellCode.OP_STRING) {
			return " + " + rtl.toString(this.run(code_tree["value"], level));
		}
		var old_calc_level = this._calc_level;
		this._calc_level = 0;
		var res = " + " + rtl.toString(this.getName("rtl")) + ".toString(" + rtl.toString(this.run(code_tree["value"], level)) + ")";
		this._calc_level = old_calc_level;
		return res;
	}
	op_mult(code_tree, level){
		return " * " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_div(code_tree, level){
		return " / " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_mod(code_tree, level){
		return " % " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_not(code_tree, level){
		return "!" + rtl.toString(this.run(code_tree["value"], level));
	}
	op_and(code_tree, level){
		return " && " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_or(code_tree, level){
		return " || " + rtl.toString(this.run(code_tree["value"], level));
	}
	op_pow(code_tree, level){
		return "";
	}
	op_pre_inc(code_tree, level){
		return "++" + rtl.toString(this.run(code_tree["value"], level));
	}
	op_pre_dec(code_tree, level){
		return "--" + rtl.toString(this.run(code_tree["value"], level));
	}
	op_post_inc(code_tree, level){
		return this.run(code_tree["value"], level) + "++";
	}
	op_post_dec(code_tree, level){
		return this.run(code_tree["value"], level) + "--";
	}
	op_inc(code_tree, level){
		return this.out(this.run(code_tree["value"], level) + "++" + rtl.toString(this._semicolon), level);
	}
	op_dec(code_tree, level){
		return this.out(this.run(code_tree["value"], level) + "--" + rtl.toString(this._semicolon), level);
	}
	op_cmp(code_tree, level){
		return this.run(code_tree["left"], level) + " " + rtl.toString(code_tree["cond"]) + " " + rtl.toString(this.run(code_tree["right"], level));
	}
	op_instanceof(code_tree, level){
		return this.run(code_tree["left"], level) + " instanceof " + rtl.toString(this.run(code_tree["right"], level));
	}
	op_implements(code_tree, level){
		var str_name = "";
		if (code_tree["right"]["op"] == "load") {
			str_name = code_tree["right"]["str_name"];
			str_name = this.getName(str_name);
		}
		return this.getName("rtl") + ".implements(" + rtl.toString(this.run(code_tree["left"], level)) + ", '" + rtl.toString(str_name) + "')";
	}
}
module.exports.BayrellTranslatorES6 = BayrellTranslatorES6;
