/* * BayrellInterpreter
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellError = m_bayrell_rtl.BayrellError;
var str_repeat = m_bayrell_rtl.str_repeat;
var count = m_bayrell_rtl.count;
var is_array = m_bayrell_rtl.is_array;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellInterpreter extends BayrellError {
  
  constructor(){
    super();
    this.data = {};
    this.registers = [];
  }
  
  addData(data){
    var arr = Object.keys(data);
    var sz = arr.length;
    var i = 0;
    var key;
    while (i < sz) {
      key = arr[i];
      this.data[key] = data[key];
      i = i + 1;
    }
  }
  
  getData(name){
    return this.data[name];
  }
  
  getRegister(pos){
    return this.registers[pos];
  }
  
  pushRegister(value){
    array_push(this.registers, value);
  }
  
  popRegister(){
    return array_pop(this.registers);
  }
  /* Операторы */
  
  op_nope(code_tree){
    var i = 0;
    while (i < count(code_tree.childs)) {
      var code = code_tree.childs[i];
      if (code != null) {
        this.run(code);
      }
      i = i + 1;
    }
    return result;
  }
  
  op_use(code_tree){
    return "";
  }
  
  op_comment(code_tree){
    return "";
  }
  
  op_assign(code_tree){
    /* if (is_object(code_tree.name)){
			
		}
		else{
			code_tree.name
		} */
    this.run(code_tree.value, 0);
  }
  
  op_assign_inc(code_tree){
    return "";
  }
  
  op_assign_dec(code_tree){
    return "";
  }
  
  op_declare_var(code_tree){
    this.run(code_tree.value, 0);
  }
  
  op_declare_func(code_tree){
    return "";
  }
  
  op_declare_class(code_tree){
    return "";
  }
  
  op_ret(code_tree){
    return "";
  }
  
  op_if(code_tree){
    return "";
  }
  
  op_while(code_tree){
    return "";
  }
  
  op_for(code_tree){
    return "";
  }
  
  op_foreach(code_tree){
    return "";
  }
  
  op_throw(code_tree){
    return "";
  }
  
  op_break(code_tree){
    return "";
  }
  
  op_continue(code_tree){
    return "";
  }
  
  op_call_func(code_tree){
    return "";
  }
  /* Операции */
  
  op_calc(code_tree){
    var i = 0;
    while (i < count(code_tree.childs)) {
      var code = code_tree.childs[i];
      if (code != null) {
        this.run(code, 0);
      }
      i = i + 1;
    }
  }
  
  op_calc_nope(code_tree){
    var i = 0;
    while (i < count(code_tree.childs)) {
      var code = code_tree.childs[i];
      if (code != null) {
        this.run(code, 0);
      }
      i = i + 1;
    }
  }
  
  op_fixed(code_tree){
    this.pushRegister(code_tree.value);
  }
  
  op_string(code_tree){
    return "";
  }
  
  op_json(code_tree){
    return "";
  }
  
  op_array(code_tree){
    return "";
  }
  
  op_load(code_tree){
    this.pushRegister(this.data[code_tree.name]);
  }
  
  op_load_arr(code_tree){
    return "";
  }
  
  op_load_static(code_tree){
    return "";
  }
  
  op_load_dynamic(code_tree){
    return "";
  }
  
  op_clone(code_tree){
    return "";
  }
  
  op_link(code_tree){
    return "";
  }
  
  op_new(code_tree){
    return "";
  }
  
  op_neg(code_tree){
    return "";
  }
  
  op_add(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    var value2 = this.popRegister();
    this.pushRegister(toInt(value1) + toInt(value2));
  }
  
  op_concat(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    var value2 = this.popRegister();
    this.pushRegister(toString(value1) + toString(value2));
  }
  
  op_sub(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    var value2 = this.popRegister();
    this.pushRegister(value1 - value2);
  }
  
  op_mult(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    var value2 = this.popRegister();
    this.pushRegister(value1 * value2);
  }
  
  op_div(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    var value2 = this.popRegister();
    this.pushRegister(value1 / value2);
  }
  
  op_mod(code_tree){
  }
  
  op_not(code_tree){
    this.run(code_tree.value);
    var value1 = this.popRegister();
    this.pushRegister(!value1);
  }
  
  op_or(code_tree){
  }
  
  op_and(code_tree){
  }
  
  op_pow(code_tree){
    return "";
  }
  
  op_pre_inc(code_tree){
    return "";
  }
  
  op_pre_dec(code_tree){
    return "";
  }
  
  op_post_inc(code_tree){
    return "";
  }
  
  op_post_dec(code_tree){
    return "";
  }
  
  op_inc(code_tree){
    return "";
  }
  
  op_dec(code_tree){
    return "";
  }
  
  op_call(code_tree){
    return "";
  }
  
  op_cmp(code_tree){
    return "";
  }
  
  op_ternary(code_tree){
    return "";
  }
  /* Поехали */
  
  run(code_tree){
    if (is_array(code_tree)) {
      var i = 0;
      while (i < count(code_tree)) {
        var code = code_tree[i];
        if (code != null) {
          this.run(code);
        }
        i = i + 1;
      }
    }
    else if (code_tree["op"] == BayrellCode.OP_NOPE) {
      this.op_nope(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_USE) {
      this.op_use(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_COMMENT) {
      this.op_comment(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CALC) {
      this.op_calc(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CALC_NOPE) {
      this.op_calc_nope(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_FIXED) {
      this.op_fixed(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_STRING) {
      this.op_string(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_JSON) {
      this.op_json(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_ARRAY) {
      this.op_array(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_LOAD) {
      this.op_load(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_LOAD_ARR) {
      this.op_load_arr(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_LOAD_STATIC) {
      this.op_load_static(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_LOAD_DYNAMIC) {
      this.op_load_dynamic(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CLONE) {
      this.op_clone(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_LINK) {
      this.op_link(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_NEW) {
      this.op_new(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_NEG) {
      this.op_neg(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_ADD) {
      this.op_add(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_SUB) {
      this.op_sub(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_MULT) {
      this.op_mult(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_DIV) {
      this.op_div(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_MOD) {
      this.op_mod(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_NOT) {
      this.op_not(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_AND) {
      this.op_and(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_OR) {
      this.op_or(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CONCAT) {
      this.op_concat(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_POW) {
      this.op_pow(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_PRE_INC) {
      this.op_pre_inc(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_PRE_DEC) {
      this.op_pre_dec(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_POST_INC) {
      this.op_post_inc(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_POST_DEC) {
      this.op_post_dec(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_INC) {
      this.op_inc(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_DEC) {
      this.op_dec(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CALL) {
      this.op_call(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CALL_FUNC) {
      this.op_call_func(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_RET) {
      this.op_ret(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_DECLARE_VAR) {
      this.op_declare_var(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_DECLARE_FUNC) {
      this.op_declare_func(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_DECLARE_CLASS) {
      this.op_declare_class(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_ASSIGN) {
      this.op_assign(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_TERNARY) {
      this.op_ternary(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_ASSIGN_INC) {
      this.op_assign_inc(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_ASSIGN_DEC) {
      this.op_assign_dec(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_IF) {
      this.op_if(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_WHILE) {
      this.op_while(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_FOR) {
      this.op_for(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_FOREACH) {
      this.op_foreach(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_THROW) {
      this.op_throw(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_BREAK) {
      this.op_break(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CONTINUE) {
      this.op_continue(code_tree);
    }
    else if (code_tree["op"] == BayrellCode.OP_CMP) {
      this.op_cmp(code_tree);
    }
  }
}
module.exports.BayrellInterpreter = BayrellInterpreter;
