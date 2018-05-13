"use strict;"
/*!
 *  Bayrell Template Engine
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
var rs = require('BayrellRtl').Lib.rs;
var re = require('BayrellRtl').Lib.re;
var BaseOpCode = require('BayrellLang').OpCodes.BaseOpCode;
var OpAdd = require('BayrellLang').OpCodes.OpAdd;
var OpAnd = require('BayrellLang').OpCodes.OpAnd;
var OpArray = require('BayrellLang').OpCodes.OpArray;
var OpAssign = require('BayrellLang').OpCodes.OpAssign;
var OpAssignDeclare = require('BayrellLang').OpCodes.OpAssignDeclare;
var OpBitAnd = require('BayrellLang').OpCodes.OpBitAnd;
var OpBitNot = require('BayrellLang').OpCodes.OpBitNot;
var OpBitOr = require('BayrellLang').OpCodes.OpBitOr;
var OpBitXor = require('BayrellLang').OpCodes.OpBitXor;
var OpBreak = require('BayrellLang').OpCodes.OpBreak;
var OpCall = require('BayrellLang').OpCodes.OpCall;
var OpCallAwait = require('BayrellLang').OpCodes.OpCallAwait;
var OpChilds = require('BayrellLang').OpCodes.OpChilds;
var OpClassDeclare = require('BayrellLang').OpCodes.OpClassDeclare;
var OpClone = require('BayrellLang').OpCodes.OpClone;
var OpComment = require('BayrellLang').OpCodes.OpComment;
var OpCompare = require('BayrellLang').OpCodes.OpCompare;
var OpConcat = require('BayrellLang').OpCodes.OpConcat;
var OpContinue = require('BayrellLang').OpCodes.OpContinue;
var OpDelete = require('BayrellLang').OpCodes.OpDelete;
var OpDiv = require('BayrellLang').OpCodes.OpDiv;
var OpDynamic = require('BayrellLang').OpCodes.OpDynamic;
var OpFlags = require('BayrellLang').OpCodes.OpFlags;
var OpFor = require('BayrellLang').OpCodes.OpFor;
var OpFunctionDeclare = require('BayrellLang').OpCodes.OpFunctionDeclare;
var OpHexNumber = require('BayrellLang').OpCodes.OpHexNumber;
var OpIdentifier = require('BayrellLang').OpCodes.OpIdentifier;
var OpIf = require('BayrellLang').OpCodes.OpIf;
var OpIfElse = require('BayrellLang').OpCodes.OpIfElse;
var OpInterfaceDeclare = require('BayrellLang').OpCodes.OpInterfaceDeclare;
var OpMap = require('BayrellLang').OpCodes.OpMap;
var OpMod = require('BayrellLang').OpCodes.OpMod;
var OpMult = require('BayrellLang').OpCodes.OpMult;
var OpNamespace = require('BayrellLang').OpCodes.OpNamespace;
var OpNew = require('BayrellLang').OpCodes.OpNew;
var OpNope = require('BayrellLang').OpCodes.OpNope;
var OpNot = require('BayrellLang').OpCodes.OpNot;
var OpNumber = require('BayrellLang').OpCodes.OpNumber;
var OpOr = require('BayrellLang').OpCodes.OpOr;
var OpPostDec = require('BayrellLang').OpCodes.OpPostDec;
var OpPostInc = require('BayrellLang').OpCodes.OpPostInc;
var OpPow = require('BayrellLang').OpCodes.OpPow;
var OpPreDec = require('BayrellLang').OpCodes.OpPreDec;
var OpPreInc = require('BayrellLang').OpCodes.OpPreInc;
var OpPreprocessorCase = require('BayrellLang').OpCodes.OpPreprocessorCase;
var OpPreprocessorSwitch = require('BayrellLang').OpCodes.OpPreprocessorSwitch;
var OpReturn = require('BayrellLang').OpCodes.OpReturn;
var OpShiftLeft = require('BayrellLang').OpCodes.OpShiftLeft;
var OpShiftRight = require('BayrellLang').OpCodes.OpShiftRight;
var OpStatic = require('BayrellLang').OpCodes.OpStatic;
var OpString = require('BayrellLang').OpCodes.OpString;
var OpSub = require('BayrellLang').OpCodes.OpSub;
var OpTemplateIdentifier = require('BayrellLang').OpCodes.OpTemplateIdentifier;
var OpTernary = require('BayrellLang').OpCodes.OpTernary;
var OpThrow = require('BayrellLang').OpCodes.OpThrow;
var OpTryCatch = require('BayrellLang').OpCodes.OpTryCatch;
var OpTryCatchChilds = require('BayrellLang').OpCodes.OpTryCatchChilds;
var OpUse = require('BayrellLang').OpCodes.OpUse;
var OpVector = require('BayrellLang').OpCodes.OpVector;
var OpWhile = require('BayrellLang').OpCodes.OpWhile;
var OpComponent = require('./OpCodes/OpComponent.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlCall = require('./OpCodes/OpHtmlCall.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlExpression = require('./OpCodes/OpHtmlExpression.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
var OpRender = require('./OpCodes/OpRender.js');
var OpTemplateDeclare = require('./OpCodes/OpTemplateDeclare.js');
var OpViewDeclare = require('./OpCodes/OpViewDeclare.js');
var TranslatorES6 = require('./TranslatorES6.js');
class TranslatorNodeJS extends TranslatorES6{
	_init(){
		super._init();
	}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "super";
		}
		else if (name == "self"){
			return this.current_class_name;
		}
		return name;
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		if (this.current_module_name != "BayrellRtl"){
			return "var rs = require('BayrellRtl').Lib.rs;"+rtl.toString(this.s("var rtl = require('BayrellRtl').Lib.rtl;"))+rtl.toString(this.s("var Vector = require('BayrellRtl').Types.Vector;"))+rtl.toString(this.s("var Map = require('BayrellRtl').Types.Map;"))+rtl.toString(this.s("var CoreView = require('BayrellWeb').CoreView;"))+rtl.toString(this.s("var CoreViewItem = require('BayrellWeb').CoreViewItem;"));
		}
		return "";
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var res = "";
		var lib_name = op_code.value;
		var var_name = "m_"+rtl.toString(re.replace("\\.", "_", lib_name));
		var arr1 = rs.explode(".", lib_name);
		var arr2 = rs.explode(".", this.current_namespace);
		var sz_arr1 = arr1.count();
		var sz_arr2 = arr2.count();
		if (sz_arr1 < 2){
			return "";
		}
		var class_name = arr1.getLastItem();
		if (op_code.alias_name != ""){
			class_name = op_code.alias_name;
		}
		if (arr1.item(0) == arr2.item(0)){
			var pos = 0;
			while (pos < sz_arr1 && pos < sz_arr2 && arr1.item(pos) == arr2.item(pos)){
				pos++
			}
			var js_path = "";
			if (pos == arr2.count()){
				js_path = "./";
			}
			else {
				for (var j = pos; j < sz_arr2; j++){
					js_path = rtl.toString(js_path)+"../";
				}
			}
			var ch = "";
			for (var j = pos; j < sz_arr1; j++){
				js_path = rtl.toString(js_path)+rtl.toString(ch)+rtl.toString(arr1.item(j));
				ch = "/";
			}
			var module_name = arr1.shift();
			var module_path = rs.implode(".", arr1);
			js_path = rtl.toString(js_path)+".js";
			res = "var "+rtl.toString(class_name)+" = require('"+rtl.toString(js_path)+"');";
		}
		else {
			var module_name = arr1.shift();
			var module_path = rs.implode(".", arr1);
			res = "var "+rtl.toString(class_name)+" = require('"+rtl.toString(module_name)+"')."+rtl.toString(module_path)+";";
		}
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		this.beginOperation();
		res += "class "+rtl.toString(op_code.class_name);
		if (op_code.class_extends != ""){
			res += " extends "+rtl.toString(this.translateRun(op_code.class_extends));
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooter(op_code){
		var res = "";
		for (var i = 0; i < op_code.class_variables.count(); i++){
			var variable = op_code.class_variables.item(i);
			if (variable.flags != null && variable.flags.p_static == true){
				this.beginOperation();
				var s = rtl.toString(op_code.class_name)+"."+rtl.toString(variable.name)+" = "+rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		res += this.s("module.exports = "+rtl.toString(op_code.class_name)+";");
		return res;
	}
	/**
	 * Class declare header
	 */
	OpViewDeclareHeader(op_code){
		var res = "";
		this.beginOperation();
		res += "class "+rtl.toString(op_code.view_name);
		if (op_code.view_extends != null){
			res += " extends "+rtl.toString(this.translateRun(op_code.view_extends));
		}
		else {
			s += " extends "+rtl.toString(this.getName("CoreView"));
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpViewDeclareFooter(op_code){
		var res = "";
		for (var i = 0; i < op_code.view_variables.count(); i++){
			var variable = op_code.view_variables.item(i);
			if (variable.flags != null && variable.flags.p_static == true){
				this.beginOperation();
				var s = rtl.toString(op_code.view_name)+"."+rtl.toString(variable.name)+" = "+rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		res += this.s("module.exports = "+rtl.toString(op_code.view_name)+";");
		return res;
	}
}
module.exports = TranslatorNodeJS;