"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellError = m_bayrell_rtl.BayrellError;
var BayrellObject = m_bayrell_rtl.BayrellObject;
var rtl = m_bayrell_rtl.rtl;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
var m__BayrellInterpreter = require('./BayrellInterpreter.js');
var BayrellInterpreter = m__BayrellInterpreter.BayrellInterpreter;
class BayrellTranslator extends BayrellObject {
    static getClassName(){
        return "bayrell_lang.BayrellTranslator";
    }
    constructor(){
        super();
        this._indent = "";
        this._clr = "";
        this._indent = rtl.INDENT;
        this._clr = rtl.CLR;
    }
    setIndent(val){
        this._indent = val;
    }
    getIndent(){
        return this._indent;
    }
    setClr(val){
        this._clr = val;
    }
    getClr(){
        return this._clr;
    }
    createInterpreter(){
        var runtime = new BayrellInterpreter();
        runtime.addData(
            {
                "BAYRELL": false,
                "JAVASCRIPT": false,
                "NODEJS": false,
                "ES5": false,
                "ES6": false,
                "PHP": false,
                "PYTHON": false,
                "LUA": false,
                "CPP": false,
                "JAVA": false,
                "CSHARP": false,
            }
            );
        return runtime;
    }
    out(s, level){
        return rtl.str_repeat(this._indent, level) + s + this._clr;
    }
    static isJsonChilds(childs){
        var sz = rtl.count(childs);
        for (var i = 0; i < sz; i++) {
            var code_tree = childs[i];
            if (rtl.in_array(
                code_tree["op"],
                [BayrellCode.OP_ARRAY, BayrellCode.OP_JSON]
                )) {
                return true;
            }
        }
        return false;
    }
    /* Операторы */
    op_nope(code_tree, level){
        var _res = "";
        var i = 0;
        var arr = code_tree["arr"];
        var sz = rtl.count(arr);
        while (i < sz) {
            var code = arr[i];
            if (code != null) {
                _res = _res + this.run(code, level);
            }
            i = i + 1;
        }
        return _res;
    }
    op_namespace(code_tree, level){
        return "";
    }
    op_use(code_tree, level){
        return "";
    }
    op_comment(code_tree, level){
        return "";
    }
    op_assign(code_tree, level){
        return "";
    }
    op_assign_inc(code_tree, level){
        return "";
    }
    op_assign_dec(code_tree, level){
        return "";
    }
    op_assign_concat(code_tree, level){
        return "";
    }
    op_declare_var(code_tree, level){
        return "";
    }
    op_declare_func(code_tree, level){
        return "";
    }
    op_declare_class(code_tree, level){
        return "";
    }
    op_ret(code_tree, level){
        return "";
    }
    op_if(code_tree, level){
        return "";
    }
    op_while(code_tree, level){
        return "";
    }
    op_for(code_tree, level){
        return "";
    }
    op_foreach(code_tree, level){
        return "";
    }
    op_throw(code_tree, level){
        return "";
    }
    op_break(code_tree, level){
        return "";
    }
    op_continue(code_tree, level){
        return "";
    }
    op_call_func(code_tree, level){
        return "";
    }
    /* Операции */
    op_calc(code_tree, level){
        return "";
    }
    op_calc_nope(code_tree, level){
        return "";
    }
    op_fixed(code_tree, level){
        return "";
    }
    op_string(code_tree, level){
        return "";
    }
    op_json(code_tree, level){
        return "";
    }
    op_array(code_tree, level){
        return "";
    }
    op_load(code_tree, level){
        return "";
    }
    op_load_names(code_tree, level){
        return "";
    }
    op_load_names_calc(code_tree, level){
        return "";
    }
    op_load_arr(code_tree, level){
        return "";
    }
    op_load_static(code_tree, level){
        return "";
    }
    op_load_dynamic(code_tree, level){
        return "";
    }
    op_clone(code_tree, level){
        return "";
    }
    op_link(code_tree, level){
        return "";
    }
    op_new(code_tree, level){
        return "";
    }
    op_neg(code_tree, level){
        return "";
    }
    op_add(code_tree, level){
        return "";
    }
    op_sub(code_tree, level){
        return "";
    }
    op_mult(code_tree, level){
        return "";
    }
    op_div(code_tree, level){
        return "";
    }
    op_mod(code_tree, level){
        return "";
    }
    op_not(code_tree, level){
        return "";
    }
    op_or(code_tree, level){
        return "";
    }
    op_and(code_tree, level){
        return "";
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
    op_inc(code_tree, level){
        return "";
    }
    op_dec(code_tree, level){
        return "";
    }
    op_call(code_tree, level){
        return "";
    }
    op_cmp(code_tree, level){
        return "";
    }
    op_instanceof(code_tree, level){
        return "";
    }
    op_ternary(code_tree, level){
        return "";
    }
    op_concat(code_tree, level){
        return "";
    }
    op_directive_ifcode(code_tree, level){
        var runtime = this.createInterpreter();
        var expr = code_tree.expr;
        runtime.run(expr);
        var _res = runtime.getRegister(0);
        if (_res) {
            return this.out(rtl.trim(code_tree.code_str), level);
        }
        return "";
    }
    /* Поехали */
    run(code_tree, level){
        var _res = "";
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
            _res = this.op_nope(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_USE) {
            _res = this.op_use(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_NAMESPACE) {
            _res = this.op_namespace(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_COMMENT) {
            _res = this.op_comment(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CALC) {
            _res = this.op_calc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CALC_NOPE) {
            _res = this.op_calc_nope(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_FIXED) {
            _res = this.op_fixed(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_STRING) {
            _res = this.op_string(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_JSON) {
            _res = this.op_json(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ARRAY) {
            _res = this.op_array(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD) {
            _res = this.op_load(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_NAMES) {
            _res = this.op_load_names(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_NAMES_CALC) {
            _res = this.op_load_names_calc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_ARR) {
            _res = this.op_load_arr(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_STATIC) {
            _res = this.op_load_static(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LOAD_DYNAMIC) {
            _res = this.op_load_dynamic(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CLONE) {
            _res = this.op_clone(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_LINK) {
            _res = this.op_link(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_NEW) {
            _res = this.op_new(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_NEG) {
            _res = this.op_neg(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ADD) {
            _res = this.op_add(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_SUB) {
            _res = this.op_sub(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_MULT) {
            _res = this.op_mult(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DIV) {
            _res = this.op_div(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_MOD) {
            _res = this.op_mod(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_NOT) {
            _res = this.op_not(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_AND) {
            _res = this.op_and(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_OR) {
            _res = this.op_or(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CONCAT) {
            _res = this.op_concat(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_POW) {
            _res = this.op_pow(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_PRE_INC) {
            _res = this.op_pre_inc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_PRE_DEC) {
            _res = this.op_pre_dec(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_POST_INC) {
            _res = this.op_post_inc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_POST_DEC) {
            _res = this.op_post_dec(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_INC) {
            _res = this.op_inc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DEC) {
            _res = this.op_dec(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CALL) {
            _res = this.op_call(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_RET) {
            _res = this.op_ret(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_VAR) {
            _res = this.op_declare_var(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_FUNC) {
            _res = this.op_declare_func(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DECLARE_CLASS) {
            _res = this.op_declare_class(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN) {
            _res = this.op_assign(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_TERNARY) {
            _res = this.op_ternary(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN_INC) {
            _res = this.op_assign_inc(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN_DEC) {
            _res = this.op_assign_dec(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_ASSIGN_CONCAT) {
            _res = this.op_assign_concat(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_IF) {
            _res = this.op_if(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_WHILE) {
            _res = this.op_while(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_FOR) {
            _res = this.op_for(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_FOREACH) {
            _res = this.op_foreach(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_THROW) {
            _res = this.op_throw(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_BREAK) {
            _res = this.op_break(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CONTINUE) {
            _res = this.op_continue(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_CMP) {
            _res = this.op_cmp(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_INSTANCEOF) {
            _res = this.op_instanceof(code_tree, level);
        }
        else if (is_json && op == BayrellCode.OP_DIRECTIVE_IFCODE) {
            _res = this.op_directive_ifcode(code_tree, level);
        }
        else if (rtl.is_array(code_tree)) {
            var i = 0;
            var sz = rtl.count(code_tree);
            while (i < sz) {
                var code = code_tree[i];
                if (code != null) {
                    _res = _res + this.run(code, level);
                }
                i = i + 1;
            }
        }
        return _res;
    }
    translate(code_tree){
        var _res = this.run(code_tree, 0);
        return _res;
    }
}
module.exports.BayrellTranslator = BayrellTranslator;
