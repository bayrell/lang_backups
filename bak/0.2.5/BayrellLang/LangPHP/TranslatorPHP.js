"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var re = require('BayrellRtl').Lib.re;
var rs = require('BayrellRtl').Lib.rs;
var CommonTranslator = require('../CommonTranslator.js');
var BaseOpCode = require('../OpCodes/BaseOpCode.js');
var OpAdd = require('../OpCodes/OpAdd.js');
var OpAnd = require('../OpCodes/OpAnd.js');
var OpArray = require('../OpCodes/OpArray.js');
var OpAssign = require('../OpCodes/OpAssign.js');
var OpAssignDeclare = require('../OpCodes/OpAssignDeclare.js');
var OpBitAnd = require('../OpCodes/OpBitAnd.js');
var OpBitNot = require('../OpCodes/OpBitNot.js');
var OpBitOr = require('../OpCodes/OpBitOr.js');
var OpBitXor = require('../OpCodes/OpBitXor.js');
var OpBreak = require('../OpCodes/OpBreak.js');
var OpCall = require('../OpCodes/OpCall.js');
var OpCallAwait = require('../OpCodes/OpCallAwait.js');
var OpChilds = require('../OpCodes/OpChilds.js');
var OpClassDeclare = require('../OpCodes/OpClassDeclare.js');
var OpClone = require('../OpCodes/OpClone.js');
var OpComment = require('../OpCodes/OpComment.js');
var OpCompare = require('../OpCodes/OpCompare.js');
var OpConcat = require('../OpCodes/OpConcat.js');
var OpContinue = require('../OpCodes/OpContinue.js');
var OpDelete = require('../OpCodes/OpDelete.js');
var OpDiv = require('../OpCodes/OpDiv.js');
var OpDynamic = require('../OpCodes/OpDynamic.js');
var OpFlags = require('../OpCodes/OpFlags.js');
var OpFor = require('../OpCodes/OpFor.js');
var OpFunctionDeclare = require('../OpCodes/OpFunctionDeclare.js');
var OpHexNumber = require('../OpCodes/OpHexNumber.js');
var OpIdentifier = require('../OpCodes/OpIdentifier.js');
var OpIf = require('../OpCodes/OpIf.js');
var OpIfElse = require('../OpCodes/OpIfElse.js');
var OpInterfaceDeclare = require('../OpCodes/OpInterfaceDeclare.js');
var OpMod = require('../OpCodes/OpMod.js');
var OpMult = require('../OpCodes/OpMult.js');
var OpNamespace = require('../OpCodes/OpNamespace.js');
var OpNew = require('../OpCodes/OpNew.js');
var OpNope = require('../OpCodes/OpNope.js');
var OpNot = require('../OpCodes/OpNot.js');
var OpNumber = require('../OpCodes/OpNumber.js');
var OpOr = require('../OpCodes/OpOr.js');
var OpPostDec = require('../OpCodes/OpPostDec.js');
var OpPostInc = require('../OpCodes/OpPostInc.js');
var OpPow = require('../OpCodes/OpPow.js');
var OpPreDec = require('../OpCodes/OpPreDec.js');
var OpPreInc = require('../OpCodes/OpPreInc.js');
var OpPreprocessorCase = require('../OpCodes/OpPreprocessorCase.js');
var OpPreprocessorSwitch = require('../OpCodes/OpPreprocessorSwitch.js');
var OpReturn = require('../OpCodes/OpReturn.js');
var OpShiftLeft = require('../OpCodes/OpShiftLeft.js');
var OpShiftRight = require('../OpCodes/OpShiftRight.js');
var OpStatic = require('../OpCodes/OpStatic.js');
var OpString = require('../OpCodes/OpString.js');
var OpSub = require('../OpCodes/OpSub.js');
var OpTemplateIdentifier = require('../OpCodes/OpTemplateIdentifier.js');
var OpTernary = require('../OpCodes/OpTernary.js');
var OpThrow = require('../OpCodes/OpThrow.js');
var OpTryCatch = require('../OpCodes/OpTryCatch.js');
var OpTryCatchChilds = require('../OpCodes/OpTryCatchChilds.js');
var OpUse = require('../OpCodes/OpUse.js');
var OpWhile = require('../OpCodes/OpWhile.js');
class TranslatorPHP extends CommonTranslator{
	_init(){
		super._init();
	}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "parent";
		}
		else if (name == "self"){
			return "static";
		}
		else if (this.modules.has(name)){
			return name;
		}
		else if (this.is_static){
			return name;
		}
		else if (name == "null" || name == "false" || name == "true"){
			return name;
		}
		return "$"+rtl.toString(name);
	}
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		this.modules = new Map();
	}
	/**
	 * Escape string
	 */
	escapeString(s){
		s = re.replace("\\\\", "\\\\", s);
		s = re.replace("\"", "\\\"", s);
		s = re.replace("\\$", "\\$", s);
		s = re.replace("\n", "\\n", s);
		s = re.replace("\r", "\\r", s);
		s = re.replace("\t", "\\t", s);
		return s;
	}
	/**
	 * Escape string
	 */
	convertString(s){
		return "\""+rtl.toString(this.escapeString(s))+"\"";
	}
	/**
	 * Comment
	 */
	OpComment(op_code){
		return "/*"+rtl.toString(op_code.value)+"*/";
	}
	/** =========================== Identifier ============================ */
	/**
	 * HexNumber
	 */
	OpHexNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * Identifier
	 */
	OpIdentifier(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return this.getName(op_code.value);
	}
	/**
	 * Number
	 */
	OpNumber(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return op_code.value;
	}
	/**
	 * String
	 */
	OpString(op_code){
		this.current_opcode_level = this.max_opcode_level;
		return this.convertString(op_code.value);
	}
	/** ======================== Dynamic or static ======================== */
	/**
	 * Array
	 */
	OpArray(op_code){
		return rtl.toString(this.translateRun(op_code.value1))+"["+rtl.toString(this.s(this.translateRun(op_code.value2)))+rtl.toString(this.s("]"));
	}
	/**
	 * Dynamic load
	 */
	OpDynamic(op_code){
		var res = rtl.toString(this.o(this.translateRun(op_code.value), this.max_opcode_level))+"->"+rtl.toString(op_code.name);
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Static load
	 */
	OpStatic(op_code){
		return rtl.toString(this.translateRun(op_code.value))+"::"+rtl.toString(op_code.name);
	}
	/**
	 * Template Identifier
	 */
	OpTemplateIdentifier(op_code){
		return this.translateRun(op_code.t);
	}
	/** ============================ Operations ============================ */
	/**
	 * ADD
	 */
	OpAdd(op_code){
		return this.op(op_code, "+", 13);
	}
	/**
	 * AND
	 */
	OpAnd(op_code){
		return this.op(op_code, "&&", 6);
	}
	/**
	 * Bit AND
	 */
	OpBitAnd(op_code){
		return this.op(op_code, "&", 9);
	}
	/**
	 * Bit NOT
	 */
	OpBitNot(op_code){
		var res = "!"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Bit OR
	 */
	OpBitOr(op_code){
		return this.op(op_code, "|", 7);
	}
	/**
	 * Bit XOR
	 */
	OpBitXor(op_code){
		return this.op(op_code, "^", 8);
	}
	/**
	 * Concat strings
	 */
	OpConcat(op_code){
		var res = "";
		if (op_code.value1 instanceof OpConcat || op_code.value1 instanceof OpString){
			res += this.o(this.s(this.translateRun(op_code.value1)), 13);
		}
		else {
			res += rtl.toString(this.getName("rtl"))+"::toString("+rtl.toString(this.s(this.translateRun(op_code.value1)))+")";
		}
		res += this.s(" . ");
		if (op_code.value2 instanceof OpConcat || op_code.value2 instanceof OpString){
			res += this.o(this.s(this.translateRun(op_code.value2)), 13);
		}
		else {
			res += rtl.toString(this.getName("rtl"))+"::toString("+rtl.toString(this.s(this.translateRun(op_code.value2)))+")";
		}
		this.current_opcode_level = 13;
		return res;
	}
	/**
	 * Divide
	 */
	OpDiv(op_code){
		return this.op(op_code, "/", 14);
	}
	/**
	 * Module
	 */
	OpMod(op_code){
		return this.op(op_code, "%", 14);
	}
	/**
	 * Multiply
	 */
	OpMult(op_code){
		return this.op(op_code, "*", 14);
	}
	/**
	 * New
	 */
	OpNew(op_code){
		var s = "";
		/* Function name */
		s += "new "+rtl.toString(this.translateRun(op_code.value));
		/* Call arguments */
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += rtl.toString(ch)+rtl.toString(this.s(this.translateRun(op)));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		this.current_opcode_level = 19;
		return s;
	}
	/**
	 * Not
	 */
	OpNot(op_code){
		var res = "!"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		return res;
	}
	/**
	 * Or
	 */
	OpOr(op_code){
		return this.op(op_code, "||", 5);
	}
	/**
	 * Post decrement
	 */
	OpPostDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = rtl.toString(this.o(this.translateRun(op_code.value), 17))+"--";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Post increment
	 */
	OpPostInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = rtl.toString(this.o(this.translateRun(op_code.value), 17))+"++";
		this.current_opcode_level = 17;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Pow
	 */
	OpPow(op_code){
		return this.op(op_code, "**", 15);
	}
	/**
	 * Pre decrement
	 */
	OpPreDec(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "--"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Pre increment
	 */
	OpPreInc(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "++"+rtl.toString(this.o(this.translateRun(op_code.value), 16));
		this.current_opcode_level = 16;
		if (!this.is_operation){
			res += ";";
		}
		return res;
	}
	/**
	 * Bit shift left
	 */
	OpShiftLeft(op_code){
		return this.op(op_code, "<<", 12);
	}
	/**
	 * Bit shift right
	 */
	OpShiftRight(op_code){
		return this.op(op_code, ">>", 12);
	}
	/**
	 * Sub
	 */
	OpSub(op_code){
		return this.op(op_code, "-", 13);
	}
	/**
	 * Operator call function
	 */
	OpCall(op_code){
		var s = "";
		this.pushOneLine(true);
		/* Function name */
		var f = true;
		if (op_code.value instanceof OpIdentifier){
			if (op_code.value.value == "parent"){
				if (this.current_function_name == "constructor"){
					s += "parent::__construct";
				}
				else if (this.current_function_name == "destructor"){
					s += "parent::__destruct";
				}
				else {
					s += "parent::"+rtl.toString(this.current_function_name);
				}
				f = false;
			}
		}
		if (f){
			s += this.translateRun(op_code.value);
		}
		this.current_opcode_level = this.max_opcode_level;
		var old_is_operation = this.is_operation;
		this.is_operation = true;
		s += "(";
		if (op_code.args != null){
			var ch = "";
			for (var i = 0; i < op_code.args.count(); i++){
				var op = op_code.args.item(i);
				s += ch + this.s(this.translateRun(op));
				ch = ", ";
			}
		}
		s += ")";
		this.is_operation = old_is_operation;
		/* semicolon */
		this.popOneLine();
		if (!this.is_operation){
			s += ";";
		}
		this.current_opcode_level = this.max_opcode_level;
		return s;
	}
	/**
	 * Operator call function
	 */
	OpCompare(op_code){
		this.current_opcode_level = 10;
		var condition = op_code.condition;
		if (condition == "implements"){
			condition = "instanceof";
		}
		return this.op(op_code, condition, 10);
	}
	/**
	 * Operator call function
	 */
	OpTernary(op_code){
		var semicolon = (this.is_operation) ? ("") : (";");
		var res = "("+rtl.toString(this.translateRun(op_code.condition))+") ? "+"("+rtl.toString(this.s(this.translateRun(op_code.if_true)))+") : "+"("+rtl.toString(this.s(this.translateRun(op_code.if_false)))+")";
		this.current_opcode_level = 4;
		return res;
	}
	/** ========================== Vector and Map ========================= */
	/**
	 * Vector
	 */
	OpVector(op_code){
		var res = "";
		res += "(new "+rtl.toString(this.getName("Vector"))+"())";
		for (var i = 0; i < op_code.values.count(); i++){
			var item = op_code.values.item(i);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s("->push("+rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/**
	 * Map
	 */
	OpMap(op_code){
		var res = "";
		var keys = op_code.values.keys();
		res += "(new "+rtl.toString(this.getName("Map"))+"())";
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var item = op_code.values.item(key);
			this.current_opcode_level = this.max_opcode_level;
			res += this.s("->set("+rtl.toString(rs.json_encode(key))+", "+rtl.toString(this.translateRun(item))+")");
		}
		this.current_opcode_level = this.max_opcode_level;
		return res;
	}
	/** ============================ Operators ============================ */
	/**
	 * Assign
	 */
	OpAssign(op_code){
		var old_is_operation = this.beginOperation();
		/* one line */
		this.pushOneLine(true);
		var res = this.translateRun(op_code.ident);
		this.popOneLine();
		if (op_code.op_name == "="){
			res += " = ";
		}
		else if (op_code.op_name == "~="){
			res += " .= ";
		}
		else if (op_code.op_name == "+="){
			res += " += ";
		}
		else if (op_code.op_name == "-="){
			res += " -= ";
		}
		this.current_opcode_level = 0;
		this.levelInc();
		res += this.s(this.translateRun(op_code.value));
		this.levelDec();
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Assign declare
	 */
	OpAssignDeclare(op_code){
		var res = "";
		var old_is_operation = this.beginOperation();
		var ch_var = "$";
		if (op_code.isFlag("const")){
			ch_var = "";
		}
		if (op_code.value == null){
			this.pushOneLine(true);
			res = rtl.toString(ch_var)+rtl.toString(op_code.name);
			this.popOneLine();
		}
		else {
			this.pushOneLine(true);
			res = rtl.toString(ch_var)+rtl.toString(op_code.name)+" = ";
			this.popOneLine();
			this.current_opcode_level = 0;
			this.levelInc();
			res += this.s(this.translateRun(op_code.value));
			this.levelDec();
		}
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return res;
	}
	/**
	 * Break
	 */
	OpBreak(op_code){
		return "break;";
	}
	/**
	 * Clone
	 */
	OpClone(op_code){
		var old_is_operation = this.beginOperation();
		/* result */
		var s = "rtl::_clone(";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += this.s(")");
		if (!old_is_operation){
			res += this.s(";");
		}
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Continue
	 */
	OpContinue(op_code){
		return "continue;";
	}
	/**
	 * Delete
	 */
	OpDelete(op_code){
		return "";
	}
	/**
	 * For
	 */
	OpFor(op_code){
		var s = "";
		/* Header */
		this.beginOperation();
		s += "for ("+rtl.toString(this.translateRun(op_code.loop_init))+"; "+rtl.toString(this.translateRun(op_code.loop_condition))+"; "+rtl.toString(this.translateRun(op_code.loop_inc))+"){";
		this.endOperation();
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		return s;
	}
	/**
	 * If
	 */
	OpIf(op_code){
		var s = "";
		/* Condition */
		this.beginOperation();
		s += "if ("+rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation();
		/* If true */
		this.levelInc();
		for (var i = 0; i < op_code.if_true.count(); i++){
			s += this.s(this.translateRun(op_code.if_true.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		/* If else */
		for (var i = 0; i < op_code.if_else.count(); i++){
			var if_else = op_code.if_else.item(i);
			this.beginOperation();
			var res = "else if ("+rtl.toString(this.translateRun(if_else.condition))+"){";
			this.endOperation();
			s += this.s(res);
			this.levelInc();
			for (var j = 0; j < if_else.if_true.count(); j++){
				s += this.s(this.translateRun(if_else.if_true.item(j)));
			}
			this.levelDec();
			s += this.s("}");
		}
		/* If false */
		if (op_code.if_false != null){
			s += this.s("else {");
			this.levelInc();
			for (var i = 0; i < op_code.if_false.count(); i++){
				s += this.s(this.translateRun(op_code.if_false.item(i)));
			}
			this.levelDec();
			s += this.s("}");
		}
		return s;
	}
	/**
	 * Return
	 */
	OpReturn(op_code){
		this.beginOperation();
		/* result */
		var s = "return ";
		this.current_opcode_level = 0;
		this.levelInc();
		s += this.s(this.translateRun(op_code.value));
		this.levelDec();
		s += this.s(";");
		this.endOperation();
		return s;
	}
	/**
	 * Throw
	 */
	OpThrow(op_code){
		this.beginOperation();
		/* result */
		var s = "throw ";
		this.current_opcode_level = 0;
		s += this.s(this.translateRun(op_code.value));
		s += ";";
		this.endOperation();
		return s;
	}
	/**
	 * Try Catch
	 */
	OpTryCatch(op_code){
		var s = "";
		s += "try{";
		this.levelInc();
		for (var i = 0; i < op_code.op_try.count(); i++){
			s += this.s(this.translateRun(op_code.op_try.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		var try_catch_childs_sz = op_code.childs.count();
		var is_else = "";
		s += "catch(Exception $_the_exception){";
		for (var i = 0; i < try_catch_childs_sz; i++){
			var try_catch = op_code.childs.item(i);
			this.beginOperation();
			var tp = this.translateRun(try_catch.op_type);
			var name = this.translateRun(try_catch.op_ident);
			this.endOperation();
			if (tp == "$var"){
				tp = "Exception";
			}
			if (tp != "Exception" || try_catch_childs_sz > 1){
				this.levelInc();
				s += this.s(rtl.toString(is_else)+"if ($_the_exception instanceof "+rtl.toString(tp)+"){");
			}
			this.levelInc();
			s += this.s("var "+rtl.toString(name)+" = $_the_exception;");
			for (var j = 0; j < try_catch.childs.count(); j++){
				s += this.s(this.translateRun(try_catch.childs.item(j)));
			}
			this.levelDec();
			if (tp != "Exception" || try_catch_childs_sz > 1){
				s += this.s("}");
				this.levelDec();
			}
			is_else = "else";
		}
		s += this.s("}");
		return s;
	}
	/**
	 * While
	 */
	OpWhile(op_code){
		var s = "";
		/* Condition */
		this.beginOperation();
		s += "while ("+rtl.toString(this.translateRun(op_code.condition))+"){";
		this.endOperation();
		/* Childs */
		this.levelInc();
		for (var i = 0; i < op_code.childs.count(); i++){
			s += this.s(this.translateRun(op_code.childs.item(i)));
		}
		this.levelDec();
		s += this.s("}");
		return s;
	}
	/** ======================== Namespace and use ======================== */
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		var res = "namespace "+rtl.toString(rs.implode("\\", arr))+";";
		if (this.current_module_name != "BayrellRtl"){
			res += this.s("use BayrellRtl\\Lib\\rtl;");
			res += this.s("use BayrellRtl\\Types\\Map;");
			res += this.s("use BayrellRtl\\Types\\Vector;");
			this.modules.set("rtl", "BayrellRtl.Lib.rtl");
			this.modules.set("Map", "BayrellRtl.Types.Map");
			this.modules.set("Vector", "BayrellRtl.Types.Vector");
		}
		return res;
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var lib_name = op_code.value;
		var arr = rs.explode(".", lib_name);
		var class_name = arr.getLastItem("");
		if (op_code.alias_name != ""){
			this.modules.set(op_code.alias_name, lib_name);
		}
		else if (class_name != ""){
			this.modules.set(class_name, lib_name);
		}
		var res = rs.implode("\\", arr);
		if (op_code.alias_name != ""){
			return "use "+rtl.toString(res)+" as "+rtl.toString(op_code.alias_name)+";";
		}
		return "use "+rtl.toString(res)+";";
	}
	/** ============================= Classes ============================= */
	/**
	 * Function declare
	 */
	OpFunctionDeclare(op_code){
		var res = "";
		var ch = "";
		var s = "";
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		if (op_code.isFlag("static")){
			res += "static function ";
		}
		else {
			res += "function ";
		}
		this.beginOperation();
		if (op_code.name == "constructor"){
			res += "__construct";
		}
		else if (op_code.name == "destructor"){
			res += "__destruct";
		}
		else {
			res += op_code.name;
		}
		this.current_function_name = op_code.name;
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			this.pushOneLine(true);
			res += rtl.toString(ch)+"$"+rtl.toString(variable.name);
			if (variable.value != null){
				res += " = "+rtl.toString(this.translateRun(variable.value));
			}
			this.popOneLine();
			ch = ", ";
		}
		res += ")";
		if (this.is_interface){
			res += ";";
			this.endOperation();
		}
		else {
			res += "{";
			this.endOperation();
			this.levelInc();
			if (op_code.childs != null){
				for (var i = 0; i < op_code.childs.count(); i++){
					res += this.s(this.translateRun(op_code.childs.item(i)));
				}
			}
			this.levelDec();
			res += this.s("}");
		}
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		this.beginOperation();
		if (this.is_interface){
			res += "interface ";
		}
		else {
			res += "class ";
		}
		res += op_code.class_name;
		if (op_code.class_extends != ""){
			res += " extends "+rtl.toString(this.translateRun(op_code.class_extends));
		}
		if (op_code.class_implements != null && op_code.class_implements.count() > 0){
			res += " implements ";
			var ch = "";
			for (var i = 0; i < op_code.class_implements.count(); i++){
				var name = op_code.class_implements.item(i);
				res += rtl.toString(ch)+rtl.toString(this.getName(name));
				ch = ", ";
			}
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareVariables(op_code){
		var res = "";
		for (var i = 0; i < op_code.class_variables.count(); i++){
			var variable = op_code.class_variables.item(i);
			if (variable.flags != null){
				this.beginOperation();
				var s = "";
				if (variable.isFlag("const")){
					s += "const ";
				}
				else {
					if (variable.isFlag("static")){
						s += "static ";
					}
					if (variable.isFlag("protected")){
						s += "protected ";
					}
					else {
						s += "public ";
					}
				}
				s += this.OpAssignDeclare(variable);
				s += ";";
				this.endOperation();
				res += this.s(s);
			}
		}
		return res;
	}
	/**
	 * Class declare
	 */
	OpClassDeclare(op_code){
		var res = "";
		var s = "";
		/* Set current class name */
		this.current_class_name = op_code.class_name;
		this.modules.set(this.current_class_name, rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name));
		/* Skip if declare class */
		if (op_code.isFlag("declare")){
			return "";
		}
		res += this.OpClassDeclareHeader(op_code);
		/* Variables */
		res += this.OpClassDeclareVariables(op_code);
		/* Class functions */
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_code2 = op_code.childs.item(i);
			if (op_code2 instanceof OpFunctionDeclare){
				res += this.s(this.OpFunctionDeclare(op_code2));
			}
			else if (op_code2 instanceof OpPreprocessorSwitch){
				res += this.s(this.OpPreprocessorSwitch(op_code2));
			}
			else if (op_code2 instanceof OpComment){
				res += this.s(this.OpComment(op_code2));
			}
		}
		/* Footer class */
		this.levelDec();
		res += this.s("}");
		return res;
	}
	/**
	 * Interface declare
	 */
	OpInterfaceDeclare(op_code){
		this.is_interface = true;
		var res = this.OpClassDeclare(op_code);
		this.is_interface = false;
		return res;
	}
	/** =========================== Preprocessor ========================== */
	calcPreprocessorCondition(op_case){
		if (op_case.condition instanceof OpIdentifier){
			if (op_case.condition.value == "PHP"){
				return true;
			}
		}
		return false;
	}
	/**
	 * Interface declare
	 */
	OpPreprocessorSwitch(op_code){
		if (op_code.childs == null){
			return "";
		}
		var res = "";
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_case = op_code.childs.item(i);
			if (this.calcPreprocessorCondition(op_case)){
				res += this.s(op_case.value);
			}
		}
		return res;
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translate(op_code){
		this.resetTranslator();
		var s = "<?php"+rtl.toString(this.crlf);
		s += this.translateRun(op_code);
		return s;
	}
}
module.exports = TranslatorPHP;