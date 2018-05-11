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
var BayrellLangTranslatorPHP = require('BayrellLang').LangPHP.TranslatorPHP;
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
class TranslatorPHP extends BayrellLangTranslatorPHP{
	_init(){
		super._init();
		this.html_view = 0;
		this.html_component = 0;
		this.variables = null;
	}
	/**
	 * Returns if tag name is double token
	 */
	isDoubleToken(tag_name){
		if (tag_name == "img"){
			return false;
		}
		if (tag_name == "meta"){
			return false;
		}
		if (tag_name == "input"){
			return false;
		}
		if (tag_name == "link"){
			return false;
		}
		if (tag_name == "br"){
			return false;
		}
		return true;
	}
	/**
	 * Returns current variable;
	 */
	getCurrentVariable(){
		return "$"+rtl.toString(this.variables.getLastItem("html_result"));
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		var res = super.OpNamespace(op_code);
		this.modules.set("CoreView", "BayrellWeb.CoreView");
		this.modules.set("CoreViewItem", "BayrellWeb.CoreViewItem");
		res += this.s("use BayrellWeb\\CoreView;");
		res += this.s("use BayrellWeb\\CoreViewItem;");
		return res;
	}
	/**
	 * Html attributes
	 */
	OpHtmlTagAttributes(op_code){
		var res = new Vector();
		if (op_code.attributes == null){
			return "";
		}
		for (var i = 0; i < op_code.attributes.count(); i++){
			var item = op_code.attributes.item(i);
			if (item == null){
				continue;
			}
			if (item.key == "" || item.value == null){
				continue;
			}
			res.push("\" "+rtl.toString(item.key)+"\".'=\"'."+rtl.toString(this.translateRun(item.value))+".'\"'");
		}
		if (res.count() == 0){
			return "";
		}
		var s = rs.implode(".", res);
		return "\"."+rtl.toString(s)+".\"";
	}
	/**
	 * Html tag
	 */
	OpHtmlTag(op_code){
		var res = "";
		var old_is_operation = this.beginOperation();
		var attrs = this.OpHtmlTagAttributes(op_code);
		if (this.isDoubleToken(op_code.tag_name)){
			res += rtl.toString(this.getCurrentVariable())+" .= $this->out(\"<"+rtl.toString(op_code.tag_name)+rtl.toString(attrs)+">\");";
		}
		else {
			res += rtl.toString(this.getCurrentVariable())+" .= $this->out(\"<"+rtl.toString(op_code.tag_name)+rtl.toString(attrs)+"/>\");";
		}
		this.endOperation(old_is_operation);
		if (this.isDoubleToken(op_code.tag_name)){
			res += this.s("$this->levelInc();");
			if (op_code.childs != null){
				for (var i = 0; i < op_code.childs.count(); i++){
					res += this.s(this.translateRun(op_code.childs.item(i)));
				}
			}
			res += this.s("$this->levelDec();");
			res += this.s(rtl.toString(this.getCurrentVariable())+" .= $this->out(\"</"+rtl.toString(op_code.tag_name)+">\");");
		}
		return res;
	}
	/**
	 * Html expression
	 */
	OpHtmlExpression(op_code){
		if (op_code.childs == null){
			return "\"\"";
		}
		if (op_code.childs.count() == 0){
			return "\"\"";
		}
		var v = new Vector();
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			var s = this.translateRun(item);
			if (s == ""){
				continue;
			}
			v.push(s);
		}
		return rs.implode(".", v);
	}
	/**
	 * Html text
	 */
	OpHtmlText(op_code){
		if (op_code.value instanceof OpHtmlExpression){
			if (op_code.value.childs == null){
				return "";
			}
			if (op_code.value.childs.count() == 0){
				return "";
			}
			var res = "";
			for (var i = 0; i < op_code.value.childs.count(); i++){
				var item = op_code.value.childs.item(i);
				var s = "";
				if (item instanceof OpHtmlComment){
					s = "<!-- "+rtl.toString(rs.trim(item.value))+" -->";
					s = this.escapeString(s);
				}
				else if (item instanceof OpString){
					s = this.escapeString(rs.trim(item.value));
				}
				else {
					var old_is_operation = this.beginOperation();
					s = this.translateRun(item);
					s = "this.htmlEscape(rs::trim("+rtl.toString(s)+"))";
					this.endOperation(old_is_operation);
				}
				if (s == ""){
					continue;
				}
				s = rtl.toString(this.getCurrentVariable())+" .= $this->out("+rtl.toString(s)+");";
				if (res == ""){
					res = s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		var old_is_operation = this.beginOperation();
		var s = rtl.toString(this.getCurrentVariable())+" .= $this->out(rs::trim("+rtl.toString(this.translateRun(op_code.value))+"));";
		this.endOperation(old_is_operation);
		return s;
	}
	/**
	 * Html comment
	 */
	OpHtmlComment(op_code){
		var s = "<!-- "+rtl.toString(rs.trim(op_code.value))+" -->";
		return rtl.toString(this.getCurrentVariable())+" .= $this->out("+rtl.toString(this.escapeString(s))+");";
	}
	/**
	 * Html View
	 */
	OpHtmlView(op_code){
		return "new "+rtl.toString(this.getName("CoreViewItem"))+"("+rtl.toString(op_code.variable)+")";
	}
	/**
	 * render view
	 */
	OpRenderRecurseHtmlView(op_code){
		var res = "";
		op_code.variable = "html_view_"+rtl.toString(this.html_view);
		this.html_view++
		res = "$"+rtl.toString(op_code.variable)+"=\"\";";
		this.variables.push(op_code.variable);
		for (var i = 0; i < op_code.childs.count(); i++){
			var item = op_code.childs.item(i);
			res += this.s(this.translateRun(item));
		}
		this.variables.pop(op_code.variable);
		return res;
	}
	/**
	 * render view
	 */
	OpRenderRecurse(op_code){
		var res = "";
		var s = "";
		if (op_code instanceof OpNope){
			for (var i = 0; i < op_code.childs.count(); i++){
				var item = op_code.childs.item(i);
				s = this.OpRenderRecurse(item);
				if (res == ""){
					res += s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		else if (op_code instanceof OpAdd || op_code instanceof OpAnd || op_code instanceof OpArray || op_code instanceof OpBitAnd || op_code instanceof OpBitOr || op_code instanceof OpBitXor || op_code instanceof OpCompare || op_code instanceof OpConcat || op_code instanceof OpDiv || op_code instanceof OpMod || op_code instanceof OpMult || op_code instanceof OpOr || op_code instanceof OpPow || op_code instanceof OpShiftLeft || op_code instanceof OpShiftRight || op_code instanceof OpSub){
			res += this.OpRenderRecurse(op_code.value1);
			s = this.OpRenderRecurse(op_code.value2);
			if (res == ""){
				res += s;
			}
			else {
				res += this.s(s);
			}
			return res;
		}
		else if (op_code instanceof OpBitNot || op_code instanceof OpClone || op_code instanceof OpDynamic || op_code instanceof OpNot || op_code instanceof OpStatic){
			return this.OpRenderRecurse(op_code.value);
		}
		else if (op_code instanceof OpCall || op_code instanceof OpNew){
			if (op_code.args == null){
				return "";
			}
			for (var i = 0; i < op_code.args.count(); i++){
				var item = op_code.args.item(i);
				s = this.OpRenderRecurse(item);
				if (res == ""){
					res += s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		else if (op_code instanceof OpMap){
			var values = op_code.values.values();
			for (var i = 0; i < values.count(); i++){
				var item = values.item(i);
				s = this.OpRenderRecurse(item);
				if (res == ""){
					res += s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		else if (op_code instanceof OpTernary){
			res += this.OpRenderRecurse(op_code.condition);
			s = this.OpRenderRecurse(op_code.if_true);
			if (res == ""){
				res += s;
			}
			else {
				res += this.s(s);
			}
			s = this.OpRenderRecurse(op_code.if_false);
			if (res == ""){
				res += s;
			}
			else {
				res += this.s(s);
			}
			return res;
		}
		else if (op_code instanceof OpVector){
			for (var i = 0; i < op_code.values.count(); i++){
				var item = op_code.values.item(i);
				s = this.OpRenderRecurse(item);
				if (res == ""){
					res += s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpRenderRecurseHtmlView(op_code);
		}
		else if (op_code instanceof OpComponent){
			var values = op_code.args.values();
			for (var i = 0; i < values.count(); i++){
				var item = values.item(i);
				s = this.OpRenderRecurse(item);
				if (res == ""){
					res += s;
				}
				else {
					res += this.s(s);
				}
			}
			return res;
		}
		return res;
	}
	/**
	 * Html Rener
	 */
	OpRender(op_code){
		var res = this.OpRenderRecurse(op_code);
		var s = rtl.toString(this.getCurrentVariable())+" .= "+rtl.toString(this.OpCall(op_code));
		if (res != ""){
			res += this.s(s);
		}
		else {
			res += s;
		}
		return res;
	}
	/**
	 * render component
	 */
	OpComponent(op_code){
		var component_name = "html_component_"+rtl.toString(this.html_component);
		this.html_component++
		/* Create components */
		var old_is_operation = this.beginOperation();
		var s0 = "$"+rtl.toString(component_name)+" = new "+rtl.toString(this.translateRun(op_code.name))+"(this.context(), this.renderContainer());";
		this.endOperation(old_is_operation);
		/* Output @view */
		var s1 = this.OpRenderRecurse(op_code);
		/* Build class properties */
		var s2 = "";
		var keys = op_code.args.keys();
		for (var i = 0; i < keys.count(); i++){
			var key = keys.item(i);
			var item = op_code.args.item(key);
			var s = rtl.toString(component_name)+".assignValue("+rtl.toString(this.escapeString(key))+", "+rtl.toString(this.translateRun(item))+");";
			if (s2 == ""){
				s2 = s;
			}
			else {
				s2 += this.s(s);
			}
		}
		/* Call main function */
		var s3 = rtl.toString(this.getCurrentVariable())+" .= "+rtl.toString(component_name)+".main();";
		return rtl.toString(s0)+rtl.toString(this.s(s1))+rtl.toString(this.s(s2))+rtl.toString(this.s(s3));
	}
	/**
	 * Template declare
	 */
	OpTemplateDeclare(op_code){
		var res = "";
		var ch = "";
		var s = "";
		/* Skip if declare function */
		if (op_code.isFlag("declare")){
			return "";
		}
		if (op_code.isFlag("static")){
			res += "static ";
		}
		this.beginOperation();
		res += "function "+rtl.toString(op_code.name);
		this.current_function_name = op_code.name;
		res += "(";
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			this.pushOneLine(true);
			res += rtl.toString(ch)+rtl.toString(variable.name);
			this.popOneLine();
			ch = ", ";
		}
		res += ")";
		res += "{";
		this.endOperation();
		this.levelInc();
		res += this.s(rtl.toString(this.getCurrentVariable())+" = '';");
		/* Default variables */
		for (var i = 0; i < op_code.args.count(); i++){
			var variable = op_code.args.item(i);
			if (variable.value == null){
				continue;
			}
			this.pushOneLine(true);
			s = "if ("+rtl.toString(variable.name)+" == undefined) "+rtl.toString(variable.name)+"="+rtl.toString(this.translateRun(variable.value))+";";
			this.popOneLine();
			res += this.s(s);
		}
		/* Childs */
		if (op_code.childs != null){
			for (var i = 0; i < op_code.childs.count(); i++){
				res += this.s(this.translateRun(op_code.childs.item(i)));
			}
		}
		res += this.s("return "+rtl.toString(this.getCurrentVariable())+";");
		this.levelDec();
		res += this.s("}");
		return res;
	}
	/**
	 * Class declare header
	 */
	OpViewDeclareHeader(op_code){
		var res = "";
		this.beginOperation();
		if (this.is_interface){
			res += "interface ";
		}
		else {
			res += "class ";
		}
		res += op_code.view_name;
		if (op_code.view_extends != null){
			res += " extends "+rtl.toString(this.translateRun(op_code.view_extends));
		}
		else {
			res += " extends "+rtl.toString(this.getName("CoreView"));
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpViewDeclareVariables(op_code){
		var res = "";
		for (var i = 0; i < op_code.view_variables.count(); i++){
			var variable = op_code.view_variables.item(i);
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
	 * View declare
	 */
	OpViewDeclare(op_code){
		/* Skip if declare class */
		if (op_code.isFlag("declare")){
			return "";
		}
		var res = "";
		var s = "";
		/* Set current class name */
		this.current_class_name = op_code.view_name;
		this.modules.set(this.current_class_name, rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name));
		/* Header */
		res += this.OpViewDeclareHeader(op_code);
		/* Variables */
		res += this.OpViewDeclareVariables(op_code);
		/* Class functions */
		for (var i = 0; i < op_code.childs.count(); i++){
			var op_code2 = op_code.childs.item(i);
			if (op_code2 instanceof OpFunctionDeclare){
				res += this.s(this.OpFunctionDeclare(op_code2));
			}
			else if (op_code2 instanceof OpTemplateDeclare){
				res += this.s(this.OpTemplateDeclare(op_code2));
			}
			else if (op_code2 instanceof OpComment){
				res += this.s(this.OpComment(op_code2));
			}
		}
		/* Footer */
		this.levelDec();
		res += this.s("}");
		return res;
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateRun(op_code){
		if (op_code instanceof OpViewDeclare){
			return this.OpViewDeclare(op_code);
		}
		else if (op_code instanceof OpComponent){
			return this.OpComponent(op_code);
		}
		else if (op_code instanceof OpHtmlComment){
			return this.OpHtmlComment(op_code);
		}
		else if (op_code instanceof OpHtmlExpression){
			return this.OpHtmlExpression(op_code);
		}
		else if (op_code instanceof OpHtmlTag){
			return this.OpHtmlTag(op_code);
		}
		else if (op_code instanceof OpHtmlText){
			return this.OpHtmlText(op_code);
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpHtmlView(op_code);
		}
		else if (op_code instanceof OpRender){
			return this.OpRender(op_code);
		}
		return super.translateRun(op_code);
	}
	/**
	 * Reset translator to default settings
	 */
	resetTranslator(){
		super.resetTranslator();
		this.html_view = 0;
		this.variables = new Vector();
	}
}
module.exports = TranslatorPHP;