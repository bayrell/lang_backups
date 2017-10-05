/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
var m__BayrellTranslatorES6 = require('./BayrellTranslatorES6.js');
var BayrellTranslatorES6 = m__BayrellTranslatorES6.BayrellTranslatorES6;
var m_bayrell_rtl = require('bayrell_rtl');
var isset = m_bayrell_rtl.isset;
var count = m_bayrell_rtl.count;
var str_repeat = m_bayrell_rtl.str_repeat;
var trim = m_bayrell_rtl.trim;
var strfind = m_bayrell_rtl.strfind;
var explode = m_bayrell_rtl.explode;
var implode = m_bayrell_rtl.implode;
var is_object = m_bayrell_rtl.is_object;
var array_push = m_bayrell_rtl.array_push;
class BayrellTranslatorNodeJS extends BayrellTranslatorES6 {
	createInterpreter(){
		var runtime = BayrellTranslatorES6.prototype.createInterpreter.call(this);
		runtime.addData({
			"JAVASCRIPT":true,
			"ES6":true,
			"NODEJS":true,
		});
		return runtime;
	}
	getName(name){
		var s = "";
		if (is_object(name)) {
			s = this.run(name, 0);
		}
		else if (strfind(name, "::") > -1) {
			var arr = explode("::", name);
			var sz = count(arr);
			for (var i = 0; i < sz; i++) {
				if (arr[i] == "self") {
					arr[i] = this._class_name;
				}
			}
			s = implode(".", arr);
		}
		else {
			s = name;
		}
		return s;
	}
	op_use(code_tree, level){
		var name = code_tree["name"];
		var lib_name = name;
		var var_name = "m_" + name.replace(".", "_");
		if (name[0] == ".") {
			lib_name = "." + lib_name.replace(".", "/") + ".js";
		}
		else {
			lib_name = lib_name.replace(".", "_");
		}
		var result = "";
		result = result + this.out(("var " + var_name + " = require('" + lib_name + "');"), level);
		if (count(code_tree.arr) > 0) {
			var i = 0;
			while (i < count(code_tree.arr)) {
				var obj = code_tree.arr[i];
				result = result + this.out(("var " + obj + " = " + var_name + "." + obj + ";"), level);
				i = i + 1;
			}
		}
		return result;
	}
	op_declare_class(code_tree, level){
		var s = "";
		var name = code_tree.name;
		var childs = code_tree.childs;
		var is_export = code_tree.flags.export;
		var extend_name = code_tree["extend_name"];
		var old_class_name = this._class_name;
		var old_class_extend_name = this._class_extend_name;
		var old_constructor_declare_vars = this._constructor_declare_vars;
		this._declare_class_level = this._declare_class_level + 1;
		this._class_name = name;
		this._class_extend_name = code_tree["extend_name"];
		/*  Считаем переменные которые должны быть объявлены в конструкторе */
		this._constructor_declare_vars = [];
		for (var i = 0; i < count(code_tree.childs); i++) {
			var code = code_tree.childs[i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && !code.flags.static) {
				array_push(this._constructor_declare_vars, code);
			}
		}
		if (!isset(extend_name)) {
			s = s + this.out(("class " + name + "{"), level);
		}
		else {
			s = s + this.out(("class " + name + " extends " + extend_name + " {"), level);
		}
		s = s + this.run(childs, (level + 1));
		s = s + this.out("}", level);
		this._declare_class_level = this._declare_class_level - 1;
		/*  Считаем статические переменные которые должны быть объявлены после класса */
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && code.flags.static) {
				s = s + this.out((name + "." + code.name + " = " + this.run(code.value, 0) + ";"));
			}
			i = i + 1;
		}
		if (is_export) {
			s = s + this.out(("module.exports." + name + " = " + name + ";"), level);
		}
		this._class_name = old_class_name;
		this._class_extend_name = old_class_extend_name;
		this._constructor_declare_vars = old_constructor_declare_vars;
		return s;
	}
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
