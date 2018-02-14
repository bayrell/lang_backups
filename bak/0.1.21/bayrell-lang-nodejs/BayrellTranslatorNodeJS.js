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
		var m_bayrell_rtl = require("bayrell_rtl");
		var lib_name = name;
		var lib_path = lib_name;
		var module_name = "";
		/* Если используемый модуль находится в том же модуле, что и namespace */
		if (lib_name[0] == ".") {
			/* Получаем название модуля */
			var arr = rtl.explode(".", this._namespace);
			var module_name = rtl.attr(arr, 0, "");
			var arr3 = [];
			var arr2 = rtl.explode(".", lib_name);
			arr2[0] = module_name;
			/* Находим общее начало у массивов arr и arr2 */
			var i = 0;
			var j = 0;
			var arr_sz = rtl.count(arr);
			var arr2_sz = rtl.count(arr2);
			while (i < arr_sz && j < arr2_sz && arr[i] == arr2[j]) {
				i++;
				j++;
			}
			/* Добавляем относительный путь */
			if (i == arr_sz) {
				rtl.array_push(arr3, ".");
			}
			else {
				while (i < arr_sz) {
					rtl.array_push(arr3, "..");
					i++;
				}
			}
			while (j < arr2_sz) {
				rtl.array_push(arr3, arr2[j]);
				j++;
			}
			lib_path = rtl.implode("/", arr3) + ".js";
		}
		else {
			/* Получаем название модуля */
			var arr = rtl.explode(".", lib_name);
			var module_name = rtl.attr(arr, 0, "");
			lib_path = module_name;
		}
		_res = _res + rtl.toString(this.out("var " + rtl.toString(var_name) + " = require('" + rtl.toString(lib_path) + "');", level));
		/* Добавляем загрузку модулей */
		var sz = rtl.count(code_tree["arr"]);
		if (sz > 0) {
			for (var i = 0; i < sz; i++) {
				var obj = code_tree.arr[i];
				_res = _res + rtl.toString(this.out("var " + rtl.toString(obj) + " = " + rtl.toString(var_name) + "." + rtl.toString(obj) + ";", level));
			}
		}
		return _res;
	}
	op_declare_class(code_tree, level){
		var is_export = code_tree.flags.export;
		var str_name = code_tree["str_name"];
		var s = rtl.bind(BayrellTranslatorES6.prototype.op_declare_class, this)(code_tree, level);
		var arr2 = rtl.explode(".", this._namespace);
		var obj_name = [];
		/*
		rtl::array_shift(arr2);
		while (rtl::count(arr2) > 0){
			string name = rtl::array_shift(arr2);
			rtl::array_push(obj_name, name);
			
			s = s + this.out("module.exports." ~ rtl::implode(".", obj_name) ~ " = {};", level);
		}
		
		rtl::array_push(obj_name, str_name);
		*/
		s = s + this.out("module.exports = " + rtl.toString(str_name) + ";", level);
		/* s = s + this.out("module.exports." + name + " = " + name + ";", level); */
		return s;
	}
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
