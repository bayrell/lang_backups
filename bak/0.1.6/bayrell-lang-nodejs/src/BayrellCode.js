/*
!
Bayrell
https://github.com/bayrell/bayrell
Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/
class BayrellCode{
	/*
	Операции
	*/
	/*
	!Исправить
	*/
	/*
	Операторы
	*/
	/*
	список зарезервированных слов
	*/
	/*
	Операции
	*/
	
	static op_nope(childs){
		return {'op': BayrellCode.OP_NOPE,'childs': childs};
	}
	
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
	
	static op_array(childs){
		return {'op': BayrellCode.OP_ARRAY,'childs': childs};
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
	
	static op_load_dynamic(name){
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
	
	static op_cmp(expr, left, right){
		return {'op': BayrellCode.OP_CMP, 'expr':expr,'left':left, 'right':right};
	}
	/*
	Операторы
	*/
	
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
	
	static op_if(expr, code_true, code_false, else_if){
		return {'op': BayrellCode.OP_IF,'expr':expr,'true':code_true,'false':code_false, 'else_if': else_if};
	}
	
	static op_while(expr, childs){
		return {'op': BayrellCode.OP_WHILE,'expr':expr, 'childs':childs};
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
		return {'op': BayrellCode.OP_USE, 'name': name, 'import': arr};
	}
	/*
	Объявление переменных
	*/
	
	static op_declare_var(name, type, value, flags){
		return {'op': BayrellCode.OP_DECLARE_VAR,'name':name,'value':value,'type':type, 'flags': flags};
	}
	
	static op_declare_func(name, type, args, code_tree, flags){
		return {'op': BayrellCode.OP_DECLARE_FUNC,'name':name,'args':args,'childs':code_tree,type:type, 'flags': flags};
	}
	
	static op_declare_class(name, extend_name, code_tree, flags){
		return {'op': BayrellCode.OP_DECLARE_CLASS,'name':name, 'extend_name': extend_name, 'childs':code_tree, 'flags': flags};
	}
}
BayrellCode.OP_NOPE = "nope";
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
BayrellCode.OP_CALL = "call";
BayrellCode.OP_CALL_FUNC = "call_func";
BayrellCode.OP_CALC = "calc";
BayrellCode.OP_CALC_NOPE = "calc_nope";
BayrellCode.OP_RET = "ret";
BayrellCode.OP_CMP = "cmp";
BayrellCode.OP_DECLARE_VAR = "declare_var";
BayrellCode.OP_DECLARE_FUNC = "declare_func";
BayrellCode.OP_DECLARE_CLASS = "declare_class";
BayrellCode.OP_ASSIGN = "assign";
BayrellCode.OP_ASSIGN_ARR = "assign_arr";
BayrellCode.OP_IF = "if";
BayrellCode.OP_WHILE = "while";
BayrellCode.OP_THROW = "throw";
BayrellCode.OP_BREAK = "break";
BayrellCode.OP_CONTINUE = "continue";
BayrellCode.OP_NAMESPACE = "namespace";
BayrellCode.OP_PACKAGE = "package";
BayrellCode.OP_USE = "use";
BayrellCode.ReservedWords = ["for", "if", "while", "foreach", "class", "dict", "int", "int64", "int32", "float", "bool", "boolean", "func", "def", "function", "void", "export", "ifdef", "define", "use", "as", "import", "from", "async", "await", "call", "module", "namespace", "using", "try", "catch", "declare", "forward", "list", "array", "object", "var", "include", "require", "str", "static", "const"];
module.exports.BayrellCode = BayrellCode;
