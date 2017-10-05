/* * Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m_bayrell_rtl = require('bayrell_rtl');
var is_array = m_bayrell_rtl.is_array;
var in_array = m_bayrell_rtl.in_array;
var array_push = m_bayrell_rtl.array_push;
var strlen = m_bayrell_rtl.strlen;
var count = m_bayrell_rtl.count;
var is_string = m_bayrell_rtl.is_string;
var isset = m_bayrell_rtl.isset;
var str_repeat = m_bayrell_rtl.str_repeat;
var json_encode_ex = m_bayrell_rtl.json_encode_ex;
var is_object = m_bayrell_rtl.is_object;
class BayrellCode{
  /* Операции */
  /* !Исправить */
  /* Операторы */
  /* Директивы */
  /* список зарезервированных слов */
  /* Операции */
  
  static op_comment(comment){
    return {'op': BayrellCode.OP_COMMENT,'value': comment};
  }
  
  static op_calc(childs){
    return {'op': BayrellCode.OP_CALC,'childs': childs};
  }
  
  static op_calc_nope(childs){
    return {'op': BayrellCode.OP_CALC_NOPE,'childs': childs};
  }
  
  static op_fixed(value){
    return {'op': BayrellCode.OP_FIXED,'value': value};
  }
  
  static op_string(value){
    return {'op': BayrellCode.OP_STRING,'value': value};
  }
  
  static op_json(value){
    return {'op': BayrellCode.OP_JSON,'value': value};
  }
  
  static op_array(values){
    return {'op': BayrellCode.OP_ARRAY,'values': values};
  }
  
  static op_load(name){
    return {'op': BayrellCode.OP_LOAD,'name': name};
  }
  
  static op_load_arr(name, pos){
    return {'op': BayrellCode.OP_LOAD_ARR, 'name': name, 'pos': pos};
  }
  
  static op_load_static(names){
    return {'op': BayrellCode.OP_LOAD_STATIC,'names': names};
  }
  
  static op_load_dynamic(names){
    return {'op': BayrellCode.OP_LOAD_DYNAMIC,'names': names};
  }
  
  static op_clone(value){
    return {'op': BayrellCode.OP_CLONE,'value': value};
  }
  
  static op_link(value){
    return {'op': BayrellCode.OP_LINK,'value': value};
  }
  
  static op_new(value){
    return {'op': BayrellCode.OP_NEW,'value': value};
  }
  
  static op_neg(value){
    return {'op': BayrellCode.OP_NEG,'value': value};
  }
  
  static op_add(value){
    return {'op': BayrellCode.OP_ADD,'value': value};
  }
  
  static op_sub(value){
    return {'op': BayrellCode.OP_SUB,'value': value};
  }
  
  static op_mult(value){
    return {'op': BayrellCode.OP_MULT,'value': value};
  }
  
  static op_div(value){
    return {'op': BayrellCode.OP_DIV,'value': value};
  }
  
  static op_mod(value){
    return {'op': BayrellCode.OP_MOD,'value': value};
  }
  
  static op_not(value){
    return {'op': BayrellCode.OP_NOT,'value': value};
  }
  
  static op_pow(value){
    return {'op': BayrellCode.OP_POW,'value': value};
  }
  
  static op_and(value){
    return {'op': BayrellCode.OP_AND,'value': value};
  }
  
  static op_or(value){
    return {'op': BayrellCode.OP_OR, 'value': value};
  }
  
  static op_ternary(expr, expr_true, expr_false){
    return {'op': BayrellCode.OP_TERNARY, 'expr':expr, 'expr_true':expr_true, 'expr_false':expr_false};
  }
  
  static op_cmp(cond, left, right){
    return {'op': BayrellCode.OP_CMP, 'cond':cond, 'left':left, 'right':right};
  }
  
  static op_pre_inc(value){
    return {'op': BayrellCode.OP_PRE_INC, 'value': value};
  }
  
  static op_pre_dec(value){
    return {'op': BayrellCode.OP_PRE_DEC, 'value': value};
  }
  
  static op_post_inc(value){
    return {'op': BayrellCode.OP_POST_INC, 'value': value};
  }
  
  static op_post_dec(value){
    return {'op': BayrellCode.OP_POST_DEC, 'value': value};
  }
  
  static op_inc(value){
    return {'op': BayrellCode.OP_INC, 'value': value};
  }
  
  static op_dec(value){
    return {'op': BayrellCode.OP_DEC, 'value': value};
  }
  
  static op_concat(childs){
    return {'op': BayrellCode.OP_CONCAT, 'childs': childs};
  }
  /* Операторы */
  
  static op_nope(childs){
    return {'op': BayrellCode.OP_NOPE,'childs': childs};
  }
  
  static op_call(name, args){
    return {'op': BayrellCode.OP_CALL,'name': name,'args':args};
  }
  
  static op_call_func(name, args){
    return {'op':BayrellCode.OP_CALL_FUNC,'name': name,'args':args};
  }
  
  static op_ret(value){
    return {'op': BayrellCode.OP_RET,'value': value};
  }
  
  static op_assign(name, value){
    return {'op': BayrellCode.OP_ASSIGN,'name':name,'value':value};
  }
  
  static op_assign_inc(name, value){
    return {'op': BayrellCode.OP_ASSIGN_INC,'name':name,'value':value};
  }
  
  static op_assign_dec(name, value){
    return {'op': BayrellCode.OP_ASSIGN_DEC,'name':name,'value':value};
  }
  
  static op_if(expr, childs_true, childs_false, else_if){
    return {'op': BayrellCode.OP_IF,'expr':expr,'childs_true':childs_true,'childs_false':childs_false, 'else_if': else_if};
  }
  
  static op_while(expr, childs){
    return {'op': BayrellCode.OP_WHILE,'expr':expr, 'childs':childs};
  }
  
  static op_for(loop_init, loop_expression, loop_inc, childs){
    return {'op': BayrellCode.OP_FOR,'init':loop_init,'inc':loop_inc,'expr':loop_expression,'childs':childs};
  }
  
  static op_foreach(key_type, key_name, value_type, value_name, arr_name, childs){
    return {'op': BayrellCode.OP_FOREACH,'key_type':key_type,'key_name':key_name,
		'value_type':value_type,'value_name':value_name,'arr_name':arr_name,'childs':childs};
  }
  
  static op_throw(value){
    return {'op': BayrellCode.OP_THROW,'value':value};
  }
  
  static op_break(){
    return {'op': BayrellCode.OP_BREAK};
  }
  
  static op_continue(){
    return {'op': BayrellCode.OP_CONTINUE};
  }
  
  static op_namespace(name){
    return {'op': BayrellCode.OP_NAMESPACE, 'name': name};
  }
  
  static op_package(name){
    return {'op': BayrellCode.OP_PACKAGE, 'name': name};
  }
  
  static op_use(name, arr){
    return {'op': BayrellCode.OP_USE, 'name': name, 'arr': arr};
  }
  /* Объявление переменных */
  
  static op_declare_var(name, type, value, flags){
    return {'op': BayrellCode.OP_DECLARE_VAR,'name':name,'value':value,'type':type, 'flags': flags};
  }
  
  static op_declare_func(name, type, args, childs, flags){
    return {'op': BayrellCode.OP_DECLARE_FUNC,'name':name,'args':args,'childs':childs, type:type, 'flags': flags};
  }
  
  static op_declare_class(name, extend_name, childs, flags){
    return {'op': BayrellCode.OP_DECLARE_CLASS,'name':name, 'extend_name': extend_name, 'childs':childs, 'flags': flags};
  }
  /* Процессорные директивы */
  
  static op_ifcode(expr, code_str){
    return {'op': BayrellCode.OP_DIRECTIVE_IFCODE, 'expr':expr, 'code_str': code_str};
  }
  /* Типы данных */
  
  static out(s, level, crlf, ident){
    if (!isset(crlf)) {
      crlf = true;
    }
    if (!isset(ident)) {
      ident = true;
    }
    var res = "";
    if (ident) {
      res = res + str_repeat(BayrellCode._ident, level);
    }
    res = res + s;
    if (crlf) {
      res = res + BayrellCode._crlf;
    }
    return res;
  }
  
  static dump_flags(flags, level){
    var result = BayrellCode.out("{", level, true, false);
    /* Флаги */
    var names = ["export", "static", "const", "public", "private", "declare"];
    var i = 0;
    var sz = count(names);
    while (i < sz) {
      var name = names[i];
      if (isset(flags[name])) {
        result = result + BayrellCode.out(("\"" + name + "\": " + json_encode_ex(flags[name]) + ","), (level + 1));
      }
      i = i + 1;
    }
    result = result + BayrellCode.out("}", level, false);
    return result;
  }
  
  static dump_arr(arr, level){
    var result = "";
    var i = 0;
    var sz = count(arr);
    while (i < sz) {
      var code = arr[i];
      if (code != null) {
        var res = BayrellCode.dump(code, level);
        if (res != "") {
          result = result + res + "," + BayrellCode._crlf;
        }
      }
      i = i + 1;
    }
    return result;
  }
  
  static dump(code_tree, level, ident){
    if (!isset(ident)) {
      ident = true;
    }
    var result = "";
    if (code_tree == null) {
      return "null";
    }
    var old_prev_nope = BayrellCode._prev_nope;
    BayrellCode._prev_nope = false;
    if (is_array(code_tree)) {
      result = BayrellCode.dump_arr(code_tree, level);
    }
    else if (code_tree["op"] == BayrellCode.OP_NOPE) {
      BayrellCode._prev_nope = BayrellCode._minifi && true;
      if (!old_prev_nope) {
        result = result + BayrellCode.out("{", level, true, ident);
        result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
        result = result + BayrellCode.out(("\"" + "childs" + "\": ["), (level + 1));
      }
      var childs = code_tree.childs;
      if (old_prev_nope) {
        result = result + BayrellCode.dump_arr(childs, level);
      }
      else {
        result = result + BayrellCode.dump_arr(childs, (level + 2));
      }
      if (!old_prev_nope) {
        result = result + BayrellCode.out("],", (level + 1));
        result = result + BayrellCode.out("}", level, false);
      }
    }
    else if (code_tree["op"] == BayrellCode.OP_CALC) {
      result = result + BayrellCode.out("{", level, true, ident);
      result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
      result = result + BayrellCode.out(("\"" + "childs" + "\": ["), (level + 1));
      var childs = code_tree.childs;
      result = result + BayrellCode.dump_arr(childs, (level + 2));
      result = result + BayrellCode.out("],", (level + 1));
      result = result + BayrellCode.out("}", level, false);
    }
    else if (code_tree["op"] == BayrellCode.OP_CALC_NOPE) {
      if (!BayrellCode._minifi) {
        result = result + BayrellCode.out("{", level, true, ident);
        result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
        result = result + BayrellCode.out(("\"" + "childs" + "\": ["), (level + 1));
      }
      var childs = code_tree.childs;
      if (!BayrellCode._minifi) {
        result = result + BayrellCode.dump_arr(childs, (level + 2));
      }
      else {
        result = result + BayrellCode.dump_arr(childs, level);
      }
      if (!BayrellCode._minifi) {
        result = result + BayrellCode.out("],", (level + 1));
        result = result + BayrellCode.out("}", level, false);
      }
    }
    else if (in_array(code_tree["op"], [BayrellCode.OP_COMMENT, BayrellCode.OP_FIXED, BayrellCode.OP_STRING])) {
      result = result + BayrellCode.out("{", level, true, ident);
      result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
      result = result + BayrellCode.out(("\"" + "value" + "\": " + json_encode_ex(code_tree["value"]) + ","), (level + 1));
      result = result + BayrellCode.out("}", level, false);
    }
    else if (code_tree["op"] == BayrellCode.OP_JSON) {
      result = result + BayrellCode.out("{", level, true, ident);
      result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
      result = result + BayrellCode.out(("\"" + "value" + "\": " + json_encode_ex(code_tree["value"]) + ","), (level + 1));
      result = result + BayrellCode.out("}", level, false);
    }
    else {
      result = result + BayrellCode.out("{", level, true, ident);
      result = result + BayrellCode.out(("\"" + "op" + "\": " + json_encode_ex(code_tree["op"]) + ","), (level + 1));
      /* Строки */
      var names = ["name", "cond", "key_type", "key_name", "value_type", "value_name", "arr_name", "type", "code_str"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        if (isset(code_tree[name])) {
          result = result + BayrellCode.out(("\"" + name + "\": " + json_encode_ex(code_tree[name]) + ","), (level + 1));
        }
        i = i + 1;
      }
      /* Массивы */
      var names = ["arr", "values", "pos", "names", "args", "else_if", "childs", "childs_true", "childs_false"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        if (isset(code_tree[name])) {
          var arr = code_tree[name];
          result = result + BayrellCode.out(("\"" + name + "\": ["), (level + 1));
          result = result + BayrellCode.dump_arr(arr, (level + 2));
          result = result + BayrellCode.out("],", (level + 1));
        }
        i = i + 1;
      }
      /* Объекты */
      var names = ["value", "expr", "expr_true", "expr_false", "left", "right", "init", "inc"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        if (isset(code_tree[name])) {
          var obj = code_tree[name];
          result = result + BayrellCode.out(("\"" + name + "\": " + BayrellCode.dump(obj, (level + 1), false) + ","), (level + 1));
        }
        i = i + 1;
      }
      if (isset(code_tree["flags"])) {
        result = result + BayrellCode.out(("\"" + "flags" + "\": " + BayrellCode.dump_flags(code_tree["flags"], (level + 1)) + ","), (level + 1));
      }
      result = result + BayrellCode.out("}", level, false);
    }
    BayrellCode._prev_nope = old_prev_nope;
    return result;
  }
  
  static compare_arr(arr1, arr2){
    var i = 0;
    var sz1 = count(arr1);
    var sz2 = count(arr2);
    if (sz1 != sz2) {
      return false;
    }
    while (i < sz1) {
      var code1 = arr1[i];
      var code2 = arr2[i];
      i = i + 1;
      if (!BayrellCode.compare(code1, code2)) {
        return false;
      }
    }
    return true;
  }
  
  static compare(code1, code2){
    if (code1 == null && code2 != null) {
      return false;
    }
    if (code1 != null && code2 == null) {
      return false;
    }
    if (code1 == null && code2 == null) {
      return true;
    }
    if (is_array(code1) && is_array(code2)) {
      return BayrellCode.compare_arr(code1, code2);
    }
    else if (is_array(code1) && !is_array(code2)) {
      return false;
    }
    else if (!is_array(code1) && is_array(code2)) {
      return false;
    }
    else if (!is_object(code1) || !is_object(code2)) {
      return false;
    }
    else if (!is_object(code1) || !is_object(code2)) {
      return false;
    }
    else if (code1["op"] != code2["op"]) {
      return false;
    }
    else {
      var is_value_string = in_array(code1["op"], [BayrellCode.OP_COMMENT, BayrellCode.OP_FIXED, BayrellCode.OP_STRING, BayrellCode.OP_JSON]);
      /* Строки */
      var names = ["value", "name", "cond", "key_type", "key_name", "value_type", "value_name", "arr_name", "type", "code_str"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        i = i + 1;
        if (isset(code1[name]) && isset(code2[name])) {
          if (name == "value" && !is_value_string) {
            continue;
          }
          var value1 = code1[name];
          var value2 = code2[name];
          if (!is_string(value1) || !is_string(value2) || (name == "value" && !is_value_string)) {
            return false;
          }
          if (value1 != value2) {
            return false;
          }
        }
        else if ((isset(code1[name]) && !isset(code2[name])) || (!isset(code1[name]) && isset(code2[name]))) {
          return false;
        }
      }
      /* Массивы */
      var names = ["arr", "values", "pos", "names", "args", "else_if", "childs", "true", "false"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        i = i + 1;
        if (isset(code1[name]) && isset(code2[name])) {
          var value1 = code1[name];
          var value2 = code2[name];
          if (!is_array(value1) || !is_array(value2)) {
            return false;
          }
          if (!BayrellCode.compare_arr(value1, value2)) {
            return false;
          }
        }
        else if ((isset(code1[name]) && !isset(code2[name])) || (!isset(code1[name]) && isset(code2[name]))) {
          return false;
        }
      }
      /* Объекты */
      var names = ["value", "expr", "expr_true", "expr_false", "left", "right", "init", "inc"];
      var i = 0;
      var sz = count(names);
      while (i < sz) {
        var name = names[i];
        i = i + 1;
        if (isset(code1[name]) && isset(code2[name])) {
          if (name == "value" && is_value_string) {
            continue;
          }
          var value1 = code1[name];
          var value2 = code2[name];
          if (!is_object(value1) || !is_object(value2)) {
            return false;
          }
          if (!BayrellCode.compare(value1, value2)) {
            return false;
          }
        }
        else if ((isset(code1[name]) && !isset(code2[name])) || (!isset(code1[name]) && isset(code2[name]))) {
          return false;
        }
      }
      if (isset(code1["flags"]) && isset(code2["flags"])) {
        var flags1 = code1["flags"];
        var flags2 = code2["flags"];
        var names = ["export", "static", "const", "public", "private", "declare"];
        var i = 0;
        var sz = count(names);
        while (i < sz) {
          var name = names[i];
          i = i + 1;
          if (isset(flags1[name]) && isset(flags2[name])) {
            var value1 = flags1[name];
            var value2 = flags2[name];
            if (value1 != value2) {
              return false;
            }
          }
          else if (isset(flags1[name]) && flags1[name] == true) {
            return false;
          }
          else if (isset(flags2[name]) && flags2[name] == true) {
            return false;
          }
        }
      }
      else if ((isset(code1["flags"]) && !isset(code2["flags"])) || (!isset(code1["flags"]) && isset(code2["flags"]))) {
        return false;
      }
    }
    return true;
  }
}
BayrellCode.OP_NOPE = "nope";
BayrellCode.OP_OPERATOR = "op";
BayrellCode.OP_COMMENT = "comment";
BayrellCode.OP_FIXED = "fix";
BayrellCode.OP_STRING = "string";
BayrellCode.OP_JSON = "json";
BayrellCode.OP_ARRAY = "array";
BayrellCode.OP_LOAD = "load";
BayrellCode.OP_LOAD_ARR = "load_arr";
BayrellCode.OP_LOAD_STATIC = "op_load_static";
BayrellCode.OP_LOAD_DYNAMIC = "op_load_dynamic";
BayrellCode.OP_NOT = "not";
BayrellCode.OP_CLONE = "clone";
BayrellCode.OP_LINK = "link";
BayrellCode.OP_NEW = "new";
BayrellCode.OP_COPY = "copy";
BayrellCode.OP_NEG = "neg";
BayrellCode.OP_ADD = "add";
BayrellCode.OP_SUB = "sub";
BayrellCode.OP_MULT = "mult";
BayrellCode.OP_DIV = "div";
BayrellCode.OP_MOD = "mod";
BayrellCode.OP_POW = "pow";
BayrellCode.OP_AND = "and";
BayrellCode.OP_OR = "or";
BayrellCode.OP_PRE_INC = "pre_inc";
BayrellCode.OP_PRE_DEC = "pre_dec";
BayrellCode.OP_POST_INC = "post_inc";
BayrellCode.OP_POST_DEC = "post_dec";
BayrellCode.OP_INC = "inc";
BayrellCode.OP_DEC = "dec";
BayrellCode.OP_CONCAT = "concat";
BayrellCode.OP_CALL = "call";
BayrellCode.OP_CALL_FUNC = "call_func";
BayrellCode.OP_CALC = "calc";
BayrellCode.OP_CALC_NOPE = "calc_nope";
BayrellCode.OP_RET = "ret";
BayrellCode.OP_CMP = "cmp";
BayrellCode.OP_DECLARE_VAR = "var";
BayrellCode.OP_DECLARE_FUNC = "func";
BayrellCode.OP_DECLARE_CLASS = "class";
BayrellCode.OP_TERNARY = "ternary";
BayrellCode.OP_ASSIGN = "assign";
BayrellCode.OP_ASSIGN_ARR = "assign_arr";
BayrellCode.OP_ASSIGN_INC = "assign_inc";
BayrellCode.OP_ASSIGN_DEC = "assign_dec";
BayrellCode.OP_IF = "if";
BayrellCode.OP_WHILE = "while";
BayrellCode.OP_FOR = "for";
BayrellCode.OP_FOREACH = "foreach";
BayrellCode.OP_THROW = "throw";
BayrellCode.OP_BREAK = "break";
BayrellCode.OP_CONTINUE = "continue";
BayrellCode.OP_NAMESPACE = "namespace";
BayrellCode.OP_PACKAGE = "package";
BayrellCode.OP_USE = "use";
BayrellCode.OP_DIRECTIVE_IFCODE = "ifcode";
BayrellCode.ReservedWords = ["for", "if", "while", "foreach", "class", "dict", "int", "int64", "int32", "float", "bool", "boolean", "func", "def", "function", "void", "export", "ifdef", "define", "use", "as", "import", "from", "async", "await", "call", "module", "namespace", "using", "try", "catch", "declare", "forward", "list", "array", "object", "var", "include", "require", "str", "static", "const"];
BayrellCode.TYPES = ["int32", "uint32", "int64", "uint64", "double", "int", "string", "array", "var", "object", "pointer"];
BayrellCode._ident = "  ";
BayrellCode._crlf = "\n";
BayrellCode._prev_nope = false;
BayrellCode._minifi = false;
module.exports.BayrellCode = BayrellCode;
