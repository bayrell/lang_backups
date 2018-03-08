"use strict;"
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
var re = m_bayrell_rtl.re;
var rtl = m_bayrell_rtl.rtl;
class BayrellTranslatorNodeJS extends BayrellTranslatorES6 {
	getClassName(){
		return "bayrell_lang.BayrellTranslatorNodeJS";
	}
	getName(name, escape){
		if (!rtl.exists(escape)){escape = true;}
		if (name == "__CLASS_NAME__") {
			return "this.constructor.name";
		}
		else if (name == "self") {
			return this._class_name;
		}
		else if (name == "__CLASS_FULL_NAME__") {
			return "eval(this.constructor.name).getClassName()";
		}
		return name;
	}
	createInterpreter(){
		var runtime = BayrellTranslatorES6.prototype.createInterpreter.call(this);
		runtime.addData(
			{
				"JAVASCRIPT": true,
				"ES6": false,
				"NODEJS": true,
			}
		);
		return runtime;
	}
	op_namespace(code_tree, level){
		var name = code_tree["str_name"];
		this._namespace = name;
		var arr = rtl.explode(".", name);
		if (arr[0] != "BayrellRtl") {
			return this.out("var rtl = require('BayrellRtl').Lib.rtl;", level);
		}
		return "";
	}
	op_use(code_tree, level){
		/* Инициируем переменные */
		var _res = "";
		var lib_name = code_tree["str_name"];
		var var_name = "m_" + rtl.toString(re.replace("\\.", "_", lib_name));
		var arr = rtl.explode(".", lib_name);
		var sz_arr = rtl.count(arr);
		var arr2 = rtl.explode(".", this._namespace);
		var sz_arr2 = rtl.count(arr2);
		if (sz_arr < 2) {
			return _res;
		}
		var class_name = arr[sz_arr - 1];
		if (arr[0] == arr2[0]) {
			var pos = 0;
			while (pos < sz_arr && pos < sz_arr2 && arr[pos] == arr2[pos]) {
				pos++;
			}
			var js_path = "";
			if (pos == sz_arr2) {
				js_path = "./";
			}
			else {
				for (var j = pos; j < sz_arr2; j++) {
					js_path = js_path + "../";
				}
			}
			var ch = "";
			for (var j = pos; j < sz_arr; j++) {
				js_path = js_path + rtl.toString(ch) + rtl.toString(arr[j]);
				ch = "/";
			}
			var module_name = rtl.array_shift(arr);
			var module_path = rtl.implode(".", arr);
			js_path = js_path + ".js";
			_res = this.out("var " + rtl.toString(class_name) + " = require('" + rtl.toString(js_path) + "');", level);
		}
		else {
			var module_name = rtl.array_shift(arr);
			var module_path = rtl.implode(".", arr);
			_res = this.out("var " + rtl.toString(class_name) + " = require('" + rtl.toString(module_name) + "')." + rtl.toString(module_path) + ";", level);
		}
		return _res;
	}
	op_declare_class_header(code_tree, level){
		var name = code_tree["str_name"];
		var extend_name = code_tree["extend_name"];
		if (!rtl.exists(extend_name)) {
			return this.out("class " + rtl.toString(name) + " {", level);
		}
		else {
			return this.out("class " + rtl.toString(name) + " extends " + rtl.toString(this.getName(extend_name)) + " {", level);
		}
	}
	op_declare_class_footer(code_tree, level){
		var s = "";
		var name = code_tree["str_name"];
		var i = 0;
		var sz = rtl.count(code_tree["childs"]);
		while (i < sz) {
			var code = code_tree["childs"][i];
			if (code != null && code["op"] == BayrellCode.OP_DECLARE_VAR && code.flags.static) {
				if (rtl.exists(code.value)) {
					s = s + rtl.toString(this.out(name + "." + rtl.toString(code["str_name"]) + " = " + rtl.toString(this.run(code.value, level)) + rtl.toString(this._semicolon), level));
				}
				else {
					s = s + rtl.toString(this.out(name + "." + rtl.toString(code["str_name"]) + " = null" + rtl.toString(this._semicolon), level));
				}
			}
			i = i + 1;
		}
		return s;
	}
	op_declare_class(code_tree, level){
		var is_export = code_tree.flags.export;
		var str_name = code_tree["str_name"];
		var s = rtl.bind(BayrellTranslatorES6.prototype.op_declare_class, this)(code_tree, level);
		var arr2 = rtl.explode(".", this._namespace);
		var obj_name = [];
		var namespace_arr = rtl.explode(".", this._namespace);
		rtl.array_push(namespace_arr, str_name);
		var full_name = rtl.implode(".", namespace_arr);
		/*
		rtl::array_shift(arr2);
		while (rtl::count(arr2) > 0){
			string name = rtl::array_shift(arr2);
			rtl::array_push(obj_name, name);
			
			s = s + this.out("module.exports." ~ rtl::implode(".", obj_name) ~ " = {};", level);
		}
		*/
		/*rtl::array_push(obj_name, str_name);*/
		s = s + this.out("module.exports = " + rtl.toString(str_name) + ";", level);
		/*s = s ~ this.out("module.exports = " ~ full_name ~ ";", level);*/
		return s;
	}
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
