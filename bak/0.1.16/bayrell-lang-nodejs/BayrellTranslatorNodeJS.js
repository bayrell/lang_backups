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
    static getClassName(){
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
    op_use(code_tree, level){
        /* Инициируем переменные */
        var _res = "";
        var name = code_tree["str_name"];
        var lib_name = name;
        var lib_path = lib_name;
        var var_name = "m_" + rtl.toString(re.replace("\\.", "_", lib_name));
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
        var name = code_tree["str_name"];
        var s = rtl.bind(BayrellTranslatorES6.prototype.op_declare_class, this)(code_tree, level);
        if (is_export) {
            s = s + this.out("module.exports." + name + " = " + name + ";", level);
        }
        return s;
    }
}
module.exports.BayrellTranslatorNodeJS = BayrellTranslatorNodeJS;
