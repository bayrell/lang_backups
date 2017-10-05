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
var rtl = m_bayrell_rtl.rtl;
class BayrellTranslatorNodeJS extends BayrellTranslatorES6 {
	static newInstance(){
		return new BayrellTranslatorNodeJS();
	}
	createInterpreter(){
		var runtime = BayrellTranslatorES6.prototype.createInterpreter.call(this);
		runtime.addData({
			"JAVASCRIPT":true,
			"ES6":true,
			"NODEJS":true,
		});
		return runtime;
	}
	op_use(code_tree, level){
		var name = code_tree["str_name"];
		var lib_name = name;
		var var_name = "m_" + name.replace(".", "_");
		if (name[0] == ".") {
			lib_name = "." + lib_name.replace(".", "/") + ".js";
		}
		else {
			lib_name = lib_name.replace(".", "_");
		}
		var _res = "";
		_res = _res + this.out("var " + var_name + " = require('" + lib_name + "');", level);
		if (rtl.count(code_tree.arr) > 0) {
			var i = 0;
			while (i < rtl.count(code_tree.arr)) {
				var obj = code_tree.arr[i];
				_res = _res + this.out("var " + obj + " = " + var_name + "." + obj + ";", level);
				i = i + 1;
			}
		}
		return _res;
	}
	op_declare_class(code_tree, level){
		var is_export = code_tree.flags.export;
		var name = code_tree["str_name"];
		var s = rtl.bind(BayrellTranslatorES6.prototype.op_declare_class, this)(code_tree, level);
		if (is_export) {
			s = s + this.out("module.exports." + name + " = " + name + ";", level);
		}
		return s;
	}
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
