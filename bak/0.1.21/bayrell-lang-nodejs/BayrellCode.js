"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
class BayrellCode{
	getClassName(){
		return "bayrell_lang.BayrellCode";
	}
	/* Операции */
	/* Операторы */
	/* Директивы */
	/* список зарезервированных слов */
	/* список зарезервированных слов в PHP */
	/* Операции */
	static op_comment(value){
		return {
			"op": BayrellCode.OP_COMMENT,
			"str": value,
		};
	}
	static op_calc(childs){
		return {
			"op": BayrellCode.OP_CALC,
			"childs": childs,
		};
	}
	static op_calc_nope(childs){
		return {
			"op": BayrellCode.OP_CALC_NOPE,
			"childs": childs,
		};
	}
	static op_fixed(value){
		return {
			"op": BayrellCode.OP_FIXED,
			"str": value,
		};
	}
	static op_string(value){
		return {
			"op": BayrellCode.OP_STRING,
			"str": value,
		};
	}
	static op_array(values){
		return {
			"op": BayrellCode.OP_ARRAY,
			"values": values,
		};
	}
	static op_json(obj){
		return {
			"op": BayrellCode.OP_JSON,
			"obj": obj,
		};
	}
	static op_load(str_name){
		return {
			"op": BayrellCode.OP_LOAD,
			"str_name": str_name,
		};
	}
	static op_load_names(arr){
		return {
			"op": BayrellCode.OP_LOAD_NAMES,
			"arr": arr,
		};
	}
	static op_load_names_calc(arr){
		return {
			"op": BayrellCode.OP_LOAD_NAMES_CALC,
			"arr": arr,
		};
	}
	static op_load_arr(pos){
		return {
			"op": BayrellCode.OP_LOAD_ARR,
			"pos": pos,
		};
	}
	static op_load_static(str_name){
		return {
			"op": BayrellCode.OP_LOAD_STATIC,
			"str_name": str_name,
		};
	}
	static op_load_dynamic(str_name){
		return {
			"op": BayrellCode.OP_LOAD_DYNAMIC,
			"str_name": str_name,
		};
	}
	static op_clone(value){
		return {
			"op": BayrellCode.OP_CLONE,
			"value": value,
		};
	}
	static op_link(value){
		return {
			"op": BayrellCode.OP_LINK,
			"value": value,
		};
	}
	static op_new(value){
		return {
			"op": BayrellCode.OP_NEW,
			"value": value,
		};
	}
	static op_del(value){
		return {
			"op": BayrellCode.OP_DEL,
			"value": value,
		};
	}
	static op_neg(value){
		return {
			"op": BayrellCode.OP_NEG,
			"value": value,
		};
	}
	static op_add(value){
		return {
			"op": BayrellCode.OP_ADD,
			"value": value,
		};
	}
	static op_sub(value){
		return {
			"op": BayrellCode.OP_SUB,
			"value": value,
		};
	}
	static op_mult(value){
		return {
			"op": BayrellCode.OP_MULT,
			"value": value,
		};
	}
	static op_div(value){
		return {
			"op": BayrellCode.OP_DIV,
			"value": value,
		};
	}
	static op_mod(value){
		return {
			"op": BayrellCode.OP_MOD,
			"value": value,
		};
	}
	static op_not(value){
		return {
			"op": BayrellCode.OP_NOT,
			"value": value,
		};
	}
	static op_pow(value){
		return {
			"op": BayrellCode.OP_POW,
			"value": value,
		};
	}
	static op_and(value){
		return {
			"op": BayrellCode.OP_AND,
			"value": value,
		};
	}
	static op_or(value){
		return {
			"op": BayrellCode.OP_OR,
			"value": value,
		};
	}
	static op_ternary(expr, expr_true, expr_false){
		return {
			"op": BayrellCode.OP_TERNARY,
			"expr": expr,
			"expr_true": expr_true,
			"expr_false": expr_false,
		};
	}
	static op_cmp(cond, left, right){
		return {
			"op": BayrellCode.OP_CMP,
			"cond": cond,
			"left": left,
			"right": right,
		};
	}
	static op_instanceof(cond, left, right){
		return {
			"op": BayrellCode.OP_INSTANCEOF,
			"cond": cond,
			"left": left,
			"right": right,
		};
	}
	static op_pre_inc(value){
		return {
			"op": BayrellCode.OP_PRE_INC,
			"value": value,
		};
	}
	static op_pre_dec(value){
		return {
			"op": BayrellCode.OP_PRE_DEC,
			"value": value,
		};
	}
	static op_post_inc(value){
		return {
			"op": BayrellCode.OP_POST_INC,
			"value": value,
		};
	}
	static op_post_dec(value){
		return {
			"op": BayrellCode.OP_POST_DEC,
			"value": value,
		};
	}
	static op_inc(value){
		return {
			"op": BayrellCode.OP_INC,
			"value": value,
		};
	}
	static op_dec(value){
		return {
			"op": BayrellCode.OP_DEC,
			"value": value,
		};
	}
	static op_concat(value){
		return {
			"op": BayrellCode.OP_CONCAT,
			"value": value,
		};
	}
	/* Операторы */
	static op_nope(arr){
		return {
			"op": BayrellCode.OP_NOPE,
			"arr": arr,
		};
	}
	static op_call(args){
		return {
			"op": BayrellCode.OP_CALL,
			"args": args,
		};
	}
	static op_ret(value){
		return {
			"op": BayrellCode.OP_RET,
			"value": value,
		};
	}
	static op_assign(name, value){
		return {
			"op": BayrellCode.OP_ASSIGN,
			"name": name,
			"value": value,
		};
	}
	static op_assign_inc(name, value){
		return {
			"op": BayrellCode.OP_ASSIGN_INC,
			"name": name,
			"value": value,
		};
	}
	static op_assign_dec(name, value){
		return {
			"op": BayrellCode.OP_ASSIGN_DEC,
			"name": name,
			"value": value,
		};
	}
	static op_assign_concat(name, value){
		return {
			"op": BayrellCode.OP_ASSIGN_CONCAT,
			"name": name,
			"value": value,
		};
	}
	static op_if(expr, childs_true, childs_false, else_if){
		return {
			"op": BayrellCode.OP_IF,
			"expr": expr,
			"childs_true": childs_true,
			"childs_false": childs_false,
			"else_if": else_if,
		};
	}
	static op_while(expr, childs){
		return {
			"op": BayrellCode.OP_WHILE,
			"expr": expr,
			"childs": childs,
		};
	}
	static op_for(loop_init, loop_expression, loop_inc, childs){
		return {
			"op": BayrellCode.OP_FOR,
			"init": loop_init,
			"inc": loop_inc,
			"expr": loop_expression,
			"childs": childs,
		};
	}
	static op_foreach(key_type, key_name, value_type, value_name, name, childs){
		return {
			"op": BayrellCode.OP_FOREACH,
			"key_type": key_type,
			"key_name": key_name,
			"value_type": value_type,
			"value_name": value_name,
			"name": name,
			"childs": childs,
		};
	}
	static op_throw(value){
		return {
			"op": BayrellCode.OP_THROW,
			"value": value,
		};
	}
	static op_break(){
		return {
			"op": BayrellCode.OP_BREAK,
		};
	}
	static op_continue(){
		return {
			"op": BayrellCode.OP_CONTINUE,
		};
	}
	static op_namespace(name){
		return {
			"op": BayrellCode.OP_NAMESPACE,
			"str_name": name,
		};
	}
	static op_package(name){
		return {
			"op": BayrellCode.OP_PACKAGE,
			"str_name": name,
		};
	}
	static op_use(name, arr){
		return {
			"op": BayrellCode.OP_USE,
			"str_name": name,
			"arr": arr,
		};
	}
	static op_try_catch(code_try, code_catch, name){
		return {
			"op": BayrellCode.OP_TRY_CATCH,
			"try": code_try,
			"catch": code_catch,
			"name": name,
		};
	}
	/* Объявление переменных */
	static op_declare_var(name, type, value, flags){
		return {
			"op": BayrellCode.OP_DECLARE_VAR,
			"str_name": name,
			"value": value,
			"type": type,
			"flags": flags,
		};
	}
	static op_declare_func(name, type, args, childs, flags){
		return {
			"op": BayrellCode.OP_DECLARE_FUNC,
			"str_name": name,
			"args": args,
			"childs": childs,
			"type": type,
			"flags": flags,
		};
	}
	static op_declare_class(name, extend_name, childs, flags){
		return {
			"op": BayrellCode.OP_DECLARE_CLASS,
			"str_name": name,
			"extend_name": extend_name,
			"childs": childs,
			"flags": flags,
		};
	}
	/* Процессорные директивы */
	static op_ifcode(expr, code_str){
		return {
			"op": BayrellCode.OP_DIRECTIVE_IFCODE,
			"expr": expr,
			"code_str": code_str,
		};
	}
	/*
	 * Патчим code_tree с помощью синонимов
	 */
	static patchCodeTreeByAlias(code_tree, aliases){
		if (!rtl.exists(code_tree)) {
			return null;
		}
		var is_json = rtl.is_json(code_tree);
		var is_array = rtl.is_array(code_tree);
		if (!is_json && !is_array) {
			return null;
		}
		var op = rtl.attr(code_tree, "op");
		if (is_json && op == BayrellCode.OP_LOAD) {
			var str_name = code_tree["str_name"];
			if (rtl.key_exists(aliases, str_name)) {
				code_tree = aliases[str_name];
			}
		}
		else if (is_json && rtl.in_array(
			op,
			[BayrellCode.OP_LOAD_NAMES, BayrellCode.OP_LOAD_NAMES_CALC]
		)) {
			var arr = code_tree["arr"];
			var arr_sz = rtl.count(arr);
			if (arr_sz > 0) {
				/* Меняем первый элемент */
				var code = arr[0];
				if (code["op"] == BayrellCode.OP_LOAD) {
					var str_name = code["str_name"];
					if (rtl.key_exists(aliases, str_name)) {
						var arr2 = [];
						var code2 = aliases[str_name];
						if (code2 != null) {
							/* Синоним существует, его код code2. Теперь его нужно поместить вместо arr[0] */
							if (code2["op"] == BayrellCode.OP_LOAD) {
								arr[0]["str_name"] = code2["str_name"];
							}
							else if (rtl.in_array(
								code2["op"],
								[BayrellCode.OP_LOAD_NAMES, BayrellCode.OP_LOAD_NAMES_CALC]
							)) {
								var arr2 = code2["arr"];
								arr2 = rtl.array_merge(arr2, rtl.array_slice(arr, 1));
								code_tree["arr"] = arr2;
							}
						}
					}
				}
				var arr = code_tree["arr"];
				var arr_sz = rtl.count(arr);
				for (var i = 0; i < arr_sz; i++) {
					var code = arr[i];
					if (code["op"] == BayrellCode.OP_LOAD_ARR) {
						code["pos"] = BayrellCode.patchCodeTreeByAlias(code["pos"], aliases);
					}
					else if (code["op"] == BayrellCode.OP_CALL) {
						var args = code["args"];
						var args_sz = rtl.count(args);
						for (var j = 0; j < args_sz; j++) {
							args[j] = BayrellCode.patchCodeTreeByAlias(args[j], aliases);
						}
					}
				}
			}
		}
		if (is_json && op == BayrellCode.OP_CALL) {
			var str_name = code_tree["str_name"];
			if (rtl.key_exists(aliases, str_name)) {
				code_tree = aliases[str_name];
			}
		}
		else if (is_json && op == BayrellCode.OP_CMP) {
			code_tree["left"] = BayrellCode.patchCodeTreeByAlias(code_tree["left"], aliases);
			code_tree["right"] = BayrellCode.patchCodeTreeByAlias(code_tree["right"], aliases);
		}
		else if (is_json && op == BayrellCode.OP_TERNARY) {
			code_tree["expr"] = BayrellCode.patchCodeTreeByAlias(code_tree["expr"], aliases);
			code_tree["expr_false"] = BayrellCode.patchCodeTreeByAlias(code_tree["expr_false"], aliases);
			code_tree["expr_true"] = BayrellCode.patchCodeTreeByAlias(code_tree["expr_true"], aliases);
		}
		else if (is_json && rtl.key_exists(code_tree, "childs")) {
			var childs = code_tree["childs"];
			var i = 0;
			var sz = rtl.count(childs);
			for (var i = 0; i < sz; i++) {
				childs[i] = BayrellCode.patchCodeTreeByAlias(childs[i], aliases);
			}
		}
		else if (is_array) {
			var i = 0;
			var sz = rtl.count(code_tree);
			for (var i = 0; i < sz; i++) {
				code_tree[i] = BayrellCode.patchCodeTreeByAlias(code_tree[i], aliases);
			}
		}
		return code_tree;
	}
	/* Типы данных */
	static out(s, level, crlf, ident){
		if (!rtl.exists(crlf)){crlf = true;}
		if (!rtl.exists(ident)){ident = true;}
		var res = "";
		if (ident) {
			res = res + rtl.str_repeat(BayrellCode._ident, level);
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
		var names = BayrellCode.FLAGS;
		var i = 0;
		var sz = rtl.count(names);
		while (i < sz) {
			var name = names[i];
			if (rtl.key_exists(flags, name)) {
				result = result + BayrellCode.out("\"" + name + "\": " + rtl.json_encode(flags[name]) + ",", level + 1);
			}
			i = i + 1;
		}
		result = result + BayrellCode.out("}", level, false);
		return result;
	}
	static dump_arr(arr, level){
		var result = "";
		var i = 0;
		var sz = rtl.count(arr);
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
		if (!rtl.exists(ident)){ident = true;}
		var result = "";
		if (code_tree == null) {
			return "null";
		}
		var old_prev_nope = BayrellCode._prev_nope;
		BayrellCode._prev_nope = false;
		if (rtl.is_array(code_tree)) {
			result = BayrellCode.dump_arr(code_tree, level);
		}
		else if (code_tree["op"] == BayrellCode.OP_NOPE) {
			BayrellCode._prev_nope = BayrellCode._minifi && true;
			if (!old_prev_nope) {
				result = result + BayrellCode.out("{", level, true, ident);
				result = result + BayrellCode.out("\"" + "op" + "\": " + rtl.json_encode(code_tree["op"]) + ",", level + 1);
				result = result + BayrellCode.out("\"" + "childs" + "\": [", level + 1);
			}
			var childs = code_tree.childs;
			if (old_prev_nope) {
				result = result + BayrellCode.dump_arr(childs, level);
			}
			else {
				result = result + BayrellCode.dump_arr(childs, level + 2);
			}
			if (!old_prev_nope) {
				result = result + BayrellCode.out("],", level + 1);
				result = result + BayrellCode.out("}", level, false);
			}
		}
		else if (code_tree["op"] == BayrellCode.OP_CALC) {
			result = result + BayrellCode.out("{", level, true, ident);
			result = result + BayrellCode.out("\"" + "op" + "\": " + rtl.json_encode(code_tree["op"]) + ",", level + 1);
			result = result + BayrellCode.out("\"" + "childs" + "\": [", level + 1);
			var childs = code_tree.childs;
			result = result + BayrellCode.dump_arr(childs, level + 2);
			result = result + BayrellCode.out("],", level + 1);
			result = result + BayrellCode.out("}", level, false);
		}
		else if (code_tree["op"] == BayrellCode.OP_CALC_NOPE) {
			if (!BayrellCode._minifi) {
				result = result + BayrellCode.out("{", level, true, ident);
				result = result + BayrellCode.out("\"" + "op" + "\": " + rtl.json_encode(code_tree["op"]) + ",", level + 1);
				result = result + BayrellCode.out("\"" + "childs" + "\": [", level + 1);
			}
			var childs = code_tree.childs;
			if (!BayrellCode._minifi) {
				result = result + BayrellCode.dump_arr(childs, level + 2);
			}
			else {
				result = result + BayrellCode.dump_arr(childs, level);
			}
			if (!BayrellCode._minifi) {
				result = result + BayrellCode.out("],", level + 1);
				result = result + BayrellCode.out("}", level, false);
			}
		}
		else if (code_tree["op"] == BayrellCode.OP_JSON) {
			result = result + BayrellCode.out("{", level, true, ident);
			result = result + BayrellCode.out("\"" + "op" + "\": " + rtl.json_encode(code_tree["op"]) + ",", level + 1);
			result = result + BayrellCode.out("\"" + "value" + "\": " + rtl.json_encode(code_tree["value"]) + ",", level + 1);
			result = result + BayrellCode.out("}", level, false);
		}
		else {
			result = result + BayrellCode.out("{", level, true, ident);
			result = result + BayrellCode.out("\"" + "op" + "\": " + rtl.json_encode(code_tree["op"]) + ",", level + 1);
			/* Строки */
			var names = ["cond", "key_type", "key_name", "value_type", "value_name", "arr_name", "code_str", "str_name"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				if (rtl.key_exists(code_tree, name)) {
					result = result + BayrellCode.out("\"" + name + "\": " + rtl.json_encode(code_tree[name]) + ",", level + 1);
				}
				i = i + 1;
			}
			/* Массивы */
			var names = ["arr", "values", "names", "args", "else_if", "childs", "childs_true", "childs_false"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				if (rtl.key_exists(code_tree, name)) {
					var arr = code_tree[name];
					result = result + BayrellCode.out("\"" + name + "\": [", level + 1);
					result = result + BayrellCode.dump_arr(arr, level + 2);
					result = result + BayrellCode.out("],", level + 1);
				}
				i = i + 1;
			}
			/* Объекты */
			var names = ["value", "expr", "pos", "expr_true", "expr_false", "left", "right", "init", "inc", "type", "name"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				if (rtl.key_exists(code_tree, name)) {
					var obj = code_tree[name];
					result = result + BayrellCode.out("\"" + name + "\": " + BayrellCode.dump(obj, level + 1, false) + ",", level + 1);
				}
				i = i + 1;
			}
			if (rtl.key_exists(code_tree, "flags")) {
				result = result + BayrellCode.out("\"" + "flags" + "\": " + BayrellCode.dump_flags(code_tree["flags"], level + 1) + ",", level + 1);
			}
			result = result + BayrellCode.out("}", level, false);
		}
		BayrellCode._prev_nope = old_prev_nope;
		return result;
	}
	static compare_arr(arr1, arr2){
		var i = 0;
		var sz1 = rtl.count(arr1);
		var sz2 = rtl.count(arr2);
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
		if (rtl.is_array(code1) && rtl.is_array(code2)) {
			return BayrellCode.compare_arr(code1, code2);
		}
		else if (rtl.is_array(code1) && !rtl.is_array(code2)) {
			return false;
		}
		else if (!rtl.is_array(code1) && rtl.is_array(code2)) {
			return false;
		}
		else if (!rtl.is_json(code1) || !rtl.is_json(code2)) {
			return false;
		}
		else if (!rtl.is_json(code1) || !rtl.is_json(code2)) {
			return false;
		}
		else if (code1["op"] != code2["op"]) {
			return false;
		}
		else {
			/* Строки */
			var names = ["str", "cond", "key_type", "key_name", "value_type", "value_name", "arr_name", "code_str", "str_name"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				i = i + 1;
				if (rtl.key_exists(code1, name) && rtl.key_exists(code2, name)) {
					var value1 = code1[name];
					var value2 = code2[name];
					if (!rtl.is_string(value1) || !rtl.is_string(value2)) {
						return false;
					}
					if (value1 != value2) {
						return false;
					}
				}
				else if ((rtl.key_exists(code1, name) && !rtl.key_exists(code2, name)) || (!rtl.key_exists(code1, name) && rtl.exists(rtl.key_exists, name))) {
					return false;
				}
			}
			/* Массивы */
			var names = ["arr", "values", "names", "args", "else_if", "childs", "true", "false"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				i = i + 1;
				if (rtl.key_exists(code1, name) && rtl.key_exists(code2, name)) {
					var value1 = code1[name];
					var value2 = code2[name];
					if (!rtl.is_array(value1) || !rtl.is_array(value2)) {
						return false;
					}
					if (!BayrellCode.compare_arr(value1, value2)) {
						return false;
					}
				}
				else if ((rtl.key_exists(code1, name) && !rtl.key_exists(code2, name)) || (!rtl.key_exists(code1, name) && rtl.key_exists(code2, name))) {
					return false;
				}
			}
			/* Объекты */
			var names = ["value", "expr", "pos", "expr_true", "expr_false", "left", "right", "init", "inc", "type", "name"];
			var i = 0;
			var sz = rtl.count(names);
			while (i < sz) {
				var name = names[i];
				i = i + 1;
				if (rtl.key_exists(code1, name) && rtl.key_exists(code2, name)) {
					var value1 = code1[name];
					var value2 = code2[name];
					if (!rtl.is_json(value1) || !rtl.is_json(value2)) {
						return false;
					}
					if (!BayrellCode.compare(value1, value2)) {
						return false;
					}
				}
				else if ((rtl.key_exists(code1, name) && !rtl.key_exists(code2, name)) || (!rtl.key_exists(code1, name) && rtl.key_exists(code2, name))) {
					return false;
				}
			}
			if (rtl.key_exists(code1, "flags") && rtl.key_exists(code2, "flags")) {
				var flags1 = code1["flags"];
				var flags2 = code2["flags"];
				var names = BayrellCode.FLAGS;
				var i = 0;
				var sz = rtl.count(names);
				while (i < sz) {
					var name = names[i];
					i = i + 1;
					if (rtl.key_exists(flags1, name) && rtl.key_exists(flags2, name)) {
						var value1 = flags1[name];
						var value2 = flags2[name];
						if (value1 != value2) {
							return false;
						}
					}
					else if (rtl.key_exists(flags1, name) && flags1[name] == true) {
						return false;
					}
					else if (rtl.key_exists(flags2, name) && flags2[name] == true) {
						return false;
					}
				}
			}
			else if ((rtl.key_exists(code1, "flags") && !rtl.key_exists(code2, "flags")) || (!rtl.key_exists(code1, "flags") && rtl.key_exists(code2, "flags"))) {
				return false;
			}
		}
		return true;
	}
}
BayrellCode.OP_NOPE = "nope";
BayrellCode.OP_CALC_NOPE = "calc_nope";
BayrellCode.OP_OPERATOR = "op";
BayrellCode.OP_COMMENT = "comment";
BayrellCode.OP_FIXED = "fix";
BayrellCode.OP_STRING = "string";
BayrellCode.OP_ARRAY = "array";
BayrellCode.OP_JSON = "json";
BayrellCode.OP_LOAD = "load";
BayrellCode.OP_LOAD_ARR = "load_arr";
BayrellCode.OP_LOAD_STATIC = "op_load_static";
BayrellCode.OP_LOAD_DYNAMIC = "op_load_dynamic";
BayrellCode.OP_LOAD_NAMES = "op_load_names";
BayrellCode.OP_LOAD_NAMES_CALC = "op_load_names_calc";
BayrellCode.OP_NOT = "not";
BayrellCode.OP_CLONE = "clone";
BayrellCode.OP_LINK = "link";
BayrellCode.OP_NEW = "new";
BayrellCode.OP_DEL = "del";
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
BayrellCode.OP_TRY_CATCH = "try_catch";
BayrellCode.OP_CALL = "call";
BayrellCode.OP_CALC = "calc";
BayrellCode.OP_RET = "ret";
BayrellCode.OP_CMP = "cmp";
BayrellCode.OP_INSTANCEOF = "instanceof";
BayrellCode.OP_DECLARE_VAR = "var";
BayrellCode.OP_DECLARE_FUNC = "func";
BayrellCode.OP_DECLARE_CLASS = "class";
BayrellCode.OP_TERNARY = "ternary";
BayrellCode.OP_ASSIGN = "assign";
BayrellCode.OP_ASSIGN_ARR = "assign_arr";
BayrellCode.OP_ASSIGN_INC = "assign_inc";
BayrellCode.OP_ASSIGN_DEC = "assign_dec";
BayrellCode.OP_ASSIGN_CONCAT = "assign_concat";
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
BayrellCode.ReservedWords = ["for", "if", "while", "foreach", "class", "dict", "int", "int64", "int32", "float", "bool", "boolean", "func", "def", "function", "void", "export", "ifdef", "define", "use", "as", "import", "from", "async", "await", "call", "module", "namespace", "using", "try", "catch", "declare", "forward", "list", "array", "json", "var", "include", "require", "str", "static", "const", "default", "result"];
BayrellCode.PHP_RTL_FUNC = ["var_dump", "ord", "trim", "strlen", "str_repeat", "strpos", "strfind", "strtoupper", "substr", "base64_encode", "base64_decode", "json_decode_ex", "json_encode", "explode", "implode", "preg_replace", "preg_match", "time", "microtime", "array_reverse", "array_sort", "array_pop", "array_push", "array_merge", "count", "is_array", "is_string", "is_json", "is_numeric", "gettype", "isset", "in_array", "rand", "mt_rand", "dirname", "file_get_contents", "file_put_contents", "file_exists", "filemtime", "mkdir", "strtolower", "key_exists"];
BayrellCode.TYPES = ["int32", "uint32", "int64", "uint64", "double", "int", "string", "array", "var", "json", "pointer"];
BayrellCode.FLAGS = ["export", "static", "const", "public", "private", "declare", "protected", "pointer"];
BayrellCode.FLAGS_OBJ = {
	"export": false,
	"static": false,
	"const": false,
	"public": false,
	"private": false,
	"protected": false,
	"declare": false,
	"pointer": false,
};
BayrellCode._ident = "  ";
BayrellCode._crlf = "\n";
BayrellCode._prev_nope = false;
BayrellCode._minifi = false;
module.exports.BayrellCode = BayrellCode;
