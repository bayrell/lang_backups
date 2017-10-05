"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
var BayrellError = m_bayrell_rtl.BayrellError;
var BayrellObject = m_bayrell_rtl.BayrellObject;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellInterpreter extends BayrellObject {
    getClassName(){
        return "bayrell_lang.BayrellInterpreter";
    }
    constructor(){
        super();
        this.class_map = {};
        this.data = {};
        this.registers = [];
    }
    setData(data){
        this.data = data;
    }
    setClassMap(map){
        this.class_map = map;
    }
    addData(data){
        for (var key in data){
            var val = data[key];
            this.data[key] = val;
        }
    }
    getData(name){
        return this.data[name];
    }
    getRegister(pos){
        return this.registers[pos];
    }
    pushRegister(value){
        rtl.array_push(this.registers, value);
    }
    popRegister(){
        return rtl.array_pop(this.registers);
    }
    /* Операторы */
    op_nope(code_tree){
        var i = 0;
        var sz = rtl.count(code_tree["childs"]);
        while (i < sz) {
            var code = code_tree["childs"][i];
            if (code != null) {
                this.run(code);
            }
            i = i + 1;
        }
    }
    op_use(code_tree){
    }
    op_comment(code_tree){
    }
    op_assign(code_tree){
        var var_name = code_tree["name"];
        this.run(code_tree["value"], 0);
        var value = this.popRegister();
        if (var_name["op"] == BayrellCode.OP_LOAD) {
            str_name = var_name["str_name"];
            this.data[str_name] = value;
        }
        else if (rtl.in_array(
            var_name["op"],
            [BayrellCode.OP_LOAD_NAMES, BayrellCode.OP_LOAD_NAMES_CALC]
        )) {
            var arr = var_name["arr"];
            var sz = rtl.count(arr);
            var val = null;
            var code = null;
            var str_name = "";
            for (var i = 0; i < sz; i++) {
                var is_last = i == sz - 1;
                code = arr[i];
                if (rtl.key_exists(code, "str_name")) {
                    str_name = code["str_name"];
                }
                if (code["op"] == BayrellCode.OP_LOAD) {
                    if (is_last) {
                        this.data[str_name] = value;
                    }
                    else {
                        if (!rtl.key_exists(this.data, str_name)) {
                            this.data[str_name] = {};
                        }
                        val = this.data[str_name];
                    }
                }
                else if (code["op"] == BayrellCode.OP_LOAD_ARR) {
                    this.run(code["pos"]);
                    var pos = this.popRegister();
                    if (is_last) {
                        val[pos] = value;
                    }
                    else {
                        if (!rtl.key_exists(val, pos)) {
                            val[pos] = {};
                        }
                        val = val[pos];
                    }
                }
                else if (code["op"] == BayrellCode.OP_LOAD_STATIC) {
                }
                else if (code["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
                    if (is_last) {
                        val[str_name] = value;
                    }
                    else {
                        if (!rtl.key_exists(val, str_name)) {
                            val[str_name] = {};
                        }
                        val = val[str_name];
                    }
                }
                else if (code["op"] == BayrellCode.OP_CALL) {
                }
                if (!rtl.exists(val)) {
                    val = null;
                    break;
                }
            }
        }
    }
    op_assign_inc(code_tree){
    }
    op_assign_dec(code_tree){
    }
    op_declare_var(code_tree){
        this.run(code_tree["value"], 0);
    }
    op_declare_func(code_tree){
    }
    op_declare_class(code_tree){
    }
    op_ret(code_tree){
    }
    op_if(code_tree){
    }
    op_while(code_tree){
    }
    op_for(code_tree){
    }
    op_foreach(code_tree){
    }
    op_throw(code_tree){
    }
    op_break(code_tree){
    }
    op_continue(code_tree){
    }
    /* Операции */
    op_calc(code_tree){
        var i = 0;
        var sz = rtl.count(code_tree["childs"]);
        while (i < sz) {
            var code = code_tree["childs"][i];
            if (code != null) {
                this.run(code, 0);
            }
            i = i + 1;
        }
    }
    op_calc_nope(code_tree){
        var i = 0;
        var sz = rtl.count(code_tree["childs"]);
        while (i < sz) {
            var code = code_tree["childs"][i];
            if (code != null) {
                this.run(code, 0);
            }
            i = i + 1;
        }
    }
    op_fixed(code_tree){
        this.pushRegister(code_tree["str"]);
    }
    op_string(code_tree){
        this.pushRegister(code_tree["str"]);
    }
    op_json(code_tree){
        var res = {};
        var obj = code_tree["obj"];
        for (var key in obj){
            var val = obj[key];
            this.run(val);
            res[key] = this.popRegister();
        }
        this.pushRegister(res);
    }
    op_array(code_tree){
        var arr = [];
        var values = code_tree["values"];
        var sz = rtl.count(values);
        for (var i = 0; i < sz; i++) {
            this.run(values[i]);
            rtl.array_push(arr, this.popRegister());
        }
        this.pushRegister(arr);
    }
    op_load(code_tree){
        var str_name = code_tree["str_name"];
        if (rtl.key_exists(this.data, str_name)) {
            this.pushRegister(this.data[str_name]);
        }
        else {
            this.pushRegister(null);
        }
    }
    op_load_arr(code_tree){
    }
    op_load_static(code_tree){
    }
    op_load_dynamic(code_tree){
    }
    op_load_names(code_tree){
        var arr = code_tree["arr"];
        var sz = rtl.count(arr);
        var code = null;
        var val = null;
        var str_name = "";
        for (var i = 0; i < sz; i++) {
            code = arr[i];
            if (rtl.key_exists(code, "str_name")) {
                str_name = code["str_name"];
            }
            if (code["op"] == BayrellCode.OP_LOAD) {
                if (rtl.key_exists(this.class_map, str_name)) {
                    val = this.class_map[str_name];
                }
                else if (!rtl.key_exists(this.data, str_name)) {
                    this.pushRegister(null);
                    return ;
                }
                else {
                    val = this.data[str_name];
                }
            }
            else if (code["op"] == BayrellCode.OP_LOAD_ARR) {
                this.run(code["pos"]);
                var pos = this.popRegister();
                if (!rtl.key_exists(val, pos)) {
                    val = null;
                    break;
                }
                val = val[pos];
            }
            else if (code["op"] == BayrellCode.OP_LOAD_STATIC) {
                if (rtl.exists(val) && rtl.is_string(val)) {
                    val = [val, str_name];
                }
                else {
                    val = null;
                    break;
                }
            }
            else if (code["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
                val = rtl.attr(val, str_name);
            }
            else if (code["op"] == BayrellCode.OP_CALL) {
                if (rtl.is_exists(val) && rtl.is_array(val)) {
                    this.pushRegister(val);
                    this.op_call(code);
                    val = this.popRegister();
                }
                else {
                    val = null;
                    break;
                }
            }
            if (!rtl.exists(val)) {
                val = null;
                break;
            }
        }
        this.pushRegister(val);
    }
    op_clone(code_tree){
    }
    op_link(code_tree){
    }
    op_new(code_tree){
    }
    op_neg(code_tree){
    }
    op_add(code_tree){
        this.run(code_tree["value"]);
        var value1 = this.popRegister();
        var value2 = this.popRegister();
        this.pushRegister(rtl.toInt(value1) + rtl.toInt(value2));
    }
    op_concat(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(rtl.toString(value1) + rtl.toString(rtl.toString(value2)));
    }
    op_sub(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(value1 - value2);
    }
    op_mult(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(value1 * value2);
    }
    op_div(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(value1 / value2);
    }
    op_mod(code_tree){
    }
    op_not(code_tree){
        this.run(code_tree["value"]);
        var value1 = this.popRegister();
        this.pushRegister(!value1);
    }
    op_or(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(value1 || value2);
    }
    op_and(code_tree){
        this.run(code_tree["value"]);
        var value2 = this.popRegister();
        var value1 = this.popRegister();
        this.pushRegister(value1 && value2);
    }
    op_pow(code_tree){
    }
    op_pre_inc(code_tree){
    }
    op_pre_dec(code_tree){
    }
    op_post_inc(code_tree){
    }
    op_post_dec(code_tree){
    }
    op_inc(code_tree){
    }
    op_dec(code_tree){
    }
    op_call(code_tree){
        var func_name = this.popRegister();
        if (!rtl.is_exists(func_name)) {
            this.pushRegister(null);
            return ;
        }
        if (!rtl.is_array(func_name)) {
            this.pushRegister(null);
            return ;
        }
        var arr = [];
        var args = code_tree["args"];
        var sz = rtl.count(args);
        for (var i = 0; i < sz; i++) {
            this.run(args[i]);
            rtl.array_push(arr, this.popRegister());
        }
        var res = rtl.call_user_func_array(func_name, arr);
        this.pushRegister(res);
    }
    op_cmp(code_tree){
        this.run(code_tree["left"]);
        var left = this.popRegister();
        this.run(code_tree["right"]);
        var right = this.popRegister();
        var res = false;
        if (code_tree["cond"] == "==") {
            res = left == right;
        }
        if (code_tree["cond"] == ">=") {
            res = left >= right;
        }
        if (code_tree["cond"] == "<=") {
            res = left <= right;
        }
        if (code_tree["cond"] == "!=") {
            res = left != right;
        }
        if (code_tree["cond"] == ">") {
            res = left > right;
        }
        if (code_tree["cond"] == "<") {
            res = left < right;
        }
        this.pushRegister(res);
    }
    op_ternary(code_tree){
        this.run(code_tree["expr"]);
        var res = this.popRegister();
        if (rtl.iszero(res)) {
            this.run(code_tree["expr_false"]);
        }
        else {
            this.run(code_tree["expr_true"]);
        }
    }
    /* Поехали */
    run(code_tree){
        if (!rtl.exists(code_tree)) {
            return "";
        }
        var is_json = rtl.is_json(code_tree);
        var is_array = rtl.is_array(code_tree);
        if (!is_json && !is_array) {
            return "";
        }
        var op = rtl.attr(code_tree, "op");
        if (is_json && op == BayrellCode.OP_NOPE) {
            this.op_nope(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_USE) {
            this.op_use(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_COMMENT) {
            this.op_comment(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CALC) {
            this.op_calc(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CALC_NOPE) {
            this.op_calc_nope(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_FIXED) {
            this.op_fixed(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_STRING) {
            this.op_string(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_JSON) {
            this.op_json(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_ARRAY) {
            this.op_array(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD) {
            this.op_load(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_ARR) {
            this.op_load_arr(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_STATIC) {
            this.op_load_static(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_DYNAMIC) {
            this.op_load_dynamic(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_NAMES) {
            this.op_load_names(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_NAMES_CALC) {
            this.op_load_names(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CLONE) {
            this.op_clone(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_LINK) {
            this.op_link(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_NEW) {
            this.op_new(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_NEG) {
            this.op_neg(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_ADD) {
            this.op_add(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_SUB) {
            this.op_sub(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_MULT) {
            this.op_mult(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_DIV) {
            this.op_div(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_MOD) {
            this.op_mod(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_NOT) {
            this.op_not(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_AND) {
            this.op_and(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_OR) {
            this.op_or(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CONCAT) {
            this.op_concat(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_POW) {
            this.op_pow(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_PRE_INC) {
            this.op_pre_inc(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_PRE_DEC) {
            this.op_pre_dec(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_POST_INC) {
            this.op_post_inc(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_POST_DEC) {
            this.op_post_dec(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_INC) {
            this.op_inc(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_DEC) {
            this.op_dec(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CALL) {
            this.op_call(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_RET) {
            this.op_ret(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_VAR) {
            this.op_declare_var(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_FUNC) {
            this.op_declare_func(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_CLASS) {
            this.op_declare_class(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN) {
            this.op_assign(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_TERNARY) {
            this.op_ternary(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN_INC) {
            this.op_assign_inc(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN_DEC) {
            this.op_assign_dec(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_IF) {
            this.op_if(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_WHILE) {
            this.op_while(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_FOR) {
            this.op_for(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_FOREACH) {
            this.op_foreach(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_THROW) {
            this.op_throw(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_BREAK) {
            this.op_break(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CONTINUE) {
            this.op_continue(code_tree);
        }
        else if (is_json && op == BayrellCode.OP_CMP) {
            this.op_cmp(code_tree);
        }
        else if (rtl.is_array(code_tree)) {
            var i = 0;
            var sz = rtl.count(code_tree);
            while (i < sz) {
                var code = code_tree[i];
                if (code != null) {
                    this.run(code);
                }
                i = i + 1;
            }
        }
    }
}
module.exports.BayrellInterpreter = BayrellInterpreter;
