/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellError = m_bayrell_rtl.BayrellError;
var str_repeat = m_bayrell_rtl.str_repeat;
var count = m_bayrell_rtl.count;
var is_array = m_bayrell_rtl.is_array;
var trim = m_bayrell_rtl.trim;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
var m__BayrellInterpreter = require('./BayrellInterpreter.js');
var BayrellInterpreter = m__BayrellInterpreter.BayrellInterpreter;
class BayrellTranslator extends BayrellError {
	constructor(){
		super();
		this._result = [];
		this._ident = "\t";
		this._crlf = "\n";
	}
	createInterpreter(){
		var runtime = new BayrellInterpreter();
		runtime.addData({
			"BAYRELL":false,
			"JAVASCRIPT":false,
			"NODEJS":false,
			"ES5":false,
			"ES6":false,
			"PHP":false,
			"PYTHON":false,
			"LUA":false,
			"CPP":false,
			"JAVA":false,
			"CSHARP":false,
		});
		return runtime;
	}
	out(s, level){
		return str_repeat(this._ident, level) + s + this._crlf;
	}
	/*  Операторы */
	op_nope(code_tree, level){
		var result = "";
		var i = 0;
		while (i < count(code_tree.childs)) {
			var code = code_tree.childs[i];
			if (code != null) {
				result = result + this.run(code, level);
			}
			i = i + 1;
		}
		return result;
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
	/*  Операции */
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
	op_object(code_tree, level){
		return "";
	}
	op_array(code_tree, level){
		return "";
	}
	op_load(code_tree, level){
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
		var result = runtime.getRegister(0);
		if (result) {
			return this.out(trim(code_tree.code_str), level);
		}
		return "";
	}
	/*  Поехали */
	run(code_tree, level){
		var result = "";
		if (is_array(code_tree)) {
			var i = 0;
			while (i < count(code_tree)) {
				var code = code_tree[i];
				if (code != null) {
					result = result + this.run(code, level);
				}
				i = i + 1;
			}
		}
		else if (code_tree["op"] == BayrellCode.OP_NOPE) {
			result = this.op_nope(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_USE) {
			result = this.op_use(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_NAMESPACE) {
			result = this.op_namespace(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_COMMENT) {
			result = this.op_comment(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CALC) {
			result = this.op_calc(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CALC_NOPE) {
			result = this.op_calc_nope(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_FIXED) {
			result = this.op_fixed(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_STRING) {
			result = this.op_string(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_OBJECT) {
			result = this.op_object(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_ARRAY) {
			result = this.op_array(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_LOAD) {
			result = this.op_load(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_LOAD_ARR) {
			result = this.op_load_arr(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_LOAD_STATIC) {
			result = this.op_load_static(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
			result = this.op_load_dynamic(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CLONE) {
			result = this.op_clone(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_LINK) {
			result = this.op_link(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_NEW) {
			result = this.op_new(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_NEG) {
			result = this.op_neg(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_ADD) {
			result = this.op_add(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_SUB) {
			result = this.op_sub(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_MULT) {
			result = this.op_mult(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DIV) {
			result = this.op_div(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_MOD) {
			result = this.op_mod(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_NOT) {
			result = this.op_not(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_AND) {
			result = this.op_and(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_OR) {
			result = this.op_or(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CONCAT) {
			result = this.op_concat(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_POW) {
			result = this.op_pow(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_PRE_INC) {
			result = this.op_pre_inc(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_PRE_DEC) {
			result = this.op_pre_dec(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_POST_INC) {
			result = this.op_post_inc(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_POST_DEC) {
			result = this.op_post_dec(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_INC) {
			result = this.op_inc(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DEC) {
			result = this.op_dec(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CALL) {
			result = this.op_call(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CALL_FUNC) {
			result = this.op_call_func(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_RET) {
			result = this.op_ret(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DECLARE_VAR) {
			result = this.op_declare_var(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DECLARE_FUNC) {
			result = this.op_declare_func(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DECLARE_CLASS) {
			result = this.op_declare_class(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_ASSIGN) {
			result = this.op_assign(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_TERNARY) {
			result = this.op_ternary(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_ASSIGN_INC) {
			result = this.op_assign_inc(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_ASSIGN_DEC) {
			result = this.op_assign_dec(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_IF) {
			result = this.op_if(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_WHILE) {
			result = this.op_while(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_FOR) {
			result = this.op_for(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_FOREACH) {
			result = this.op_foreach(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_THROW) {
			result = this.op_throw(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_BREAK) {
			result = this.op_break(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CONTINUE) {
			result = this.op_continue(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_CMP) {
			result = this.op_cmp(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_DIRECTIVE_IFCODE) {
			result = this.op_directive_ifcode(code_tree, level);
		}
		return result;
	}
	translate(code_tree){
		var result = this.run(code_tree, 0);
		return result;
	}
}
module.exports.BayrellTranslator = BayrellTranslator;
