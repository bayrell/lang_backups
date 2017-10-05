/* * BayrellTranslatorNodeJS
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
var m__BayrellTranslatorES6 = require('./BayrellTranslatorES6.js');
var BayrellTranslatorES6 = m__BayrellTranslatorES6.BayrellTranslatorES6;
var m_bayrell_rtl = require('bayrell_rtl');
var isset = m_bayrell_rtl.isset;
var count = m_bayrell_rtl.count;
var str_repeat = m_bayrell_rtl.str_repeat;
var trim = m_bayrell_rtl.trim;
class BayrellTranslatorNodeJS extends BayrellTranslatorES6 {
  
  createInterpreter(){
    var runtime = BayrellTranslatorES6.prototype.createInterpreter.call(this);
    runtime.addData({
			'JAVASCRIPT': true,
			'ES6': true,
		});
    return runtime;
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
    /* var name = code_tree["name"];
		var var_name = preg_replace('\\.', '_', name);
		var_name = preg_replace('::', '_', var_name);
		
		var lib_name = '';
		var arr = explode("::", name);
		var arr_0 = arr[0];
		lib_name = preg_replace('\\.', '_', arr_0);
		
		if (count(arr)>1){
			var arr_1 = arr[1];
			arr_1 = preg_replace('\\.', '/', arr_1);
			
			if (lib_name != '')
				lib_name = lib_name + "/" + arr_1;
			else
				lib_name = "./" + arr_1;
		}
		
		var result = "";
		result = result + this.out(("var " + var_name + " = require('" + remove_last_slash(lib_name) + "/index.js');"), level);
		if (count(code_tree.import) > 0) {
			var i = 0;
			while (i < count(code_tree.import)) {
				var obj = code_tree.import[i];
				result = result + this.out(("var " + obj + " = " + var_name + "." + obj + ";"), level);
				i = i + 1;
			}
		}
		return result */
  }
  
  op_declare_class(code_tree, level){
    var s = "";
    var name = code_tree.name;
    var childs = code_tree.childs;
    var is_export = code_tree.flags.export;
    var extend_name = code_tree["extend_name"];
    this._declare_class_level = this._declare_class_level + 1;
    if (!isset(extend_name)) {
      s = s + this.out(("class " + name + "{"), level);
    }
    else {
      s = s + this.out(("class " + name + " extends " + extend_name + " {"), level);
    }
    s = s + this.run(childs, (level + 1));
    s = s + this.out("}", level);
    this._declare_class_level = this._declare_class_level - 1;
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
    return s;
  }
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
