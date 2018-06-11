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
var ContextInterface = require('BayrellRtl').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('BayrellRtl').Interfaces.ModuleDescriptionInterface;
var ParserBay = require('BayrellLang').LangBay.ParserBay;
var ParserBayToken = require('BayrellLang').LangBay.ParserBayToken;
var ParserBayNameToken = require('BayrellLang').LangBay.ParserBayNameToken;
var OpAssign = require('BayrellLang').OpCodes.OpAssign;
var OpAssignDeclare = require('BayrellLang').OpCodes.OpAssignDeclare;
var OpCall = require('BayrellLang').OpCodes.OpCall;
var OpComment = require('BayrellLang').OpCodes.OpComment;
var OpConcat = require('BayrellLang').OpCodes.OpConcat;
var OpFor = require('BayrellLang').OpCodes.OpFor;
var OpIf = require('BayrellLang').OpCodes.OpIf;
var OpIfElse = require('BayrellLang').OpCodes.OpIfElse;
var OpNope = require('BayrellLang').OpCodes.OpNope;
var OpString = require('BayrellLang').OpCodes.OpString;
var OpComponent = require('./OpCodes/OpComponent.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlCall = require('./OpCodes/OpHtmlCall.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlEscape = require('./OpCodes/OpHtmlEscape.js');
var OpHtmlExpression = require('./OpCodes/OpHtmlExpression.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlValue = require('./OpCodes/OpHtmlValue.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
var OpRender = require('./OpCodes/OpRender.js');
var OpTemplateDeclare = require('./OpCodes/OpTemplateDeclare.js');
var OpViewDeclare = require('./OpCodes/OpViewDeclare.js');
var HtmlToken = require('./HtmlToken.js');
class TemplateParser extends ParserBay{
	_init(){
		super._init();
		this.is_allow_at_symbol = false;
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
	 * Read Html Comment
	 */
	readHtmlComment(){
		this.matchNextToken("<!--");
		var res_str = this.current_token.readUntilString("-->", false);
		this.assignCurrentToken(this.current_token);
		this.matchNextToken("-->");
		return new OpHtmlComment(res_str);
	}
	/**
	 * Read Html Doctype
	 */
	readHtmlDOCTYPE(){
		var s = this.current_token.readUntilString(">", false);
		this.assignCurrentToken(this.current_token);
		var res = new OpHtmlText("<!"+rtl.toString(rs.trim(s))+">");
		this.matchNextToken(">");
		return res;
	}
	/**
	 * Read expression
	 * @return BaseOpCode
	 */
	readExpression(){
		if (this.findNextToken("@")){
			if (!this.is_allow_at_symbol){
				throw this.parserError("@ are not alowed here");
			}
			this.matchNextToken("@");
			this.matchNextToken("view");
			this.matchNextToken("{");
			var v = this.readTemplateBlock();
			this.matchNextToken("}");
			return new OpHtmlView(v);
		}
		return super.readExpression();
	}
	/**
	 * Read Html Attributes
	 */
	readHtmlAttributes(){
		if (this.findNextToken(">")){
			return null;
		}
		var res = new Vector();
		while (!this.findNextToken(">") && !this.findNextToken("/>")){
			var attr = new OpHtmlAttribute();
			attr.key = this.readNextToken().token;
			if (this.findNextToken("=")){
				this.matchNextToken("=");
				if (this.findNextToken("'") || this.findNextToken("\"")){
					var match_str = this.readNextToken().token;
					attr.bracket = match_str;
					attr.value = new OpHtmlExpression(this.readHtmlBlock(match_str, false, false, true));
					this.matchNextToken(match_str);
				}
				else if (this.findNextToken("@{") || this.findNextToken("@raw{") || this.findNextToken("@json{")){
					var is_raw = false;
					var is_json = false;
					if (this.findNextToken("@{")){
						this.matchNextToken("@{");
					}
					else if (this.findNextToken("@json{")){
						this.matchNextToken("@json{");
						is_raw = true;
						is_json = true;
					}
					else {
						this.matchNextToken("@raw{");
						is_raw = true;
					}
					this.pushToken(new ParserBayToken(this.context(), this));
					attr.is_raw = is_raw;
					attr.is_json = is_json;
					attr.bracket = "\"";
					attr.value = this.readExpression();
					this.popRestoreToken();
					this.matchNextToken("}");
				}
				else {
					throw this.parserError("Unknown token "+rtl.toString(this.readAnyNextToken().token));
				}
			}
			else {
				attr.bracket = "\"";
				attr.value = new OpHtmlExpression((new Vector()).push(new OpString(attr.key)));
			}
			res.push(attr);
		}
		return res;
	}
	/**
	 * Read operator if
	 * @return BaseOpCode
	 */
	readHtmlIf(){
		this.matchNextToken("@if");
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Vector();
		/* Read condition */
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Restore tokens */
		this.popRestoreToken();
		/* Read if true operators block */
		this.matchNextToken("{");
		if_true = this.readHtmlBlock("}");
		this.matchNextToken("}");
		/* Read else or elseif */
		while (this.findNextToken("@elseif") || this.findNextToken("@else")){
			if (this.findNextToken("@else")){
				this.matchNextToken("@else");
				if (this.findNextToken("if")){
					var op_if_else = new OpIfElse();
					this.matchNextToken("if");
					this.pushToken(new ParserBayToken(this.context(), this));
					this.matchNextToken("(");
					op_if_else.condition = this.readExpression();
					this.matchNextToken(")");
					this.popRestoreToken();
					this.matchNextToken("{");
					op_if_else.if_true = this.readHtmlBlock("}");
					this.matchNextToken("}");
					if_else.push(op_if_else);
				}
				else {
					this.matchNextToken("{");
					if_false = this.readHtmlBlock("}");
					this.matchNextToken("}");
					break;
				}
			}
			else if (this.findNextToken("@elseif")){
				var op_if_else = new OpIfElse();
				this.matchNextToken("@elseif");
				this.pushToken(new ParserBayToken(this.context(), this));
				this.matchNextToken("(");
				op_if_else.condition = this.readExpression();
				this.matchNextToken(")");
				this.popRestoreToken();
				this.matchNextToken("{");
				op_if_else.if_true = this.readOperatorsBlock();
				this.matchNextToken("}");
				if_else.push(op_if_else);
			}
		}
		this.skip_comments = old_skip_comments;
		return new OpIf(condition, if_true, if_false, if_else);
	}
	/**
	 * Read operator while
	 * @return BaseOpCode
	 */
	readHtmlWhile(){
		this.matchNextToken("@while");
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var condition = null;
		var childs = null;
		/* Read condition */
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Restore tokens */
		this.popRestoreToken();
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readHtmlBlock("}");
		this.matchNextToken("}");
		return new OpWhile(condition, childs);
	}
	/**
	 * Read operator for
	 * @return BaseOpCode
	 */
	readHtmlFor(){
		this.matchNextToken("@for");
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var loop_condition = null;
		var loop_init = null;
		var loop_inc = null;
		var childs = null;
		/* Read loop header */
		this.matchNextToken("(");
		loop_init = this.readOperatorAssign();
		this.matchNextToken(";");
		loop_condition = this.readExpression();
		this.matchNextToken(";");
		loop_inc = this.readExpression();
		this.matchNextToken(")");
		/* Restore tokens */
		this.popRestoreToken();
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readHtmlBlock("}");
		this.matchNextToken("}");
		return new OpFor(loop_condition, loop_init, loop_inc, childs);
	}
	/**
	 * Read call args
	 * @return BaseOpCode
	 */
	readRenderCallArgs(){
		var v = new Vector();
		var op_code = this.readExpression();
		v.push(op_code);
		while (this.findNextToken(",")){
			this.matchNextToken(",");
			op_code = this.readExpression();
			v.push(op_code);
		}
		return v;
	}
	/**
	 * Read call body
	 * @return BaseOpCode
	 */
	readRenderCallBody(){
		var v = null;
		this.matchNextToken("(");
		if (!this.findNextToken(")")){
			v = this.readRenderCallArgs();
		}
		this.matchNextToken(")");
		return v;
	}
	/**
	 * Read operator render
	 * @return BaseOpCode
	 */
	readHtmlRender(){
		this.matchNextToken("@render");
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var old_is_allow_at_symbol = this.is_allow_at_symbol;
		this.is_allow_at_symbol = true;
		/* Read call method */
		var obj = this.readCallDynamic(true, false, true, false);
		var v = this.readRenderCallBody();
		/* Restore tokens */
		this.popRestoreToken();
		this.is_allow_at_symbol = old_is_allow_at_symbol;
		return new OpRender(obj, v);
	}
	/**
	 * Read operator render
	 * @return BaseOpCode
	 */
	readHtmlComponent(){
		this.matchNextToken("@component");
		var component_args = new Map();
		var alias_name = "";
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var old_is_allow_at_symbol = this.is_allow_at_symbol;
		this.is_allow_at_symbol = true;
		/* Read call method */
		var component_name = this.readCallDynamic(true, false, false, false);
		this.matchNextToken("{");
		while (!this.findNextToken("}")){
			if (this.lookNextTokenType() != ParserBayToken.TOKEN_STRING){
				this.parserExpected("string");
			}
			var key = this.readAnyNextToken().token;
			this.matchNextToken(":");
			var value = this.readExpression();
			component_args.set(key, value);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("}");
		/* Restore tokens */
		this.popRestoreToken();
		this.is_allow_at_symbol = old_is_allow_at_symbol;
		return new OpComponent(component_name, alias_name, component_args);
	}
	/**
	 * Read operator render
	 * @return BaseOpCode
	 */
	readHtmlCall(){
		this.matchNextToken("@call");
		/* Push new token */
		this.pushToken(new ParserBayToken(this.context(), this));
		var old_is_allow_at_symbol = this.is_allow_at_symbol;
		this.is_allow_at_symbol = true;
		/* Read call method */
		var obj = this.readCallDynamic(true, true, true, false);
		var v = this.readRenderCallBody();
		/* Restore tokens */
		this.popRestoreToken();
		this.is_allow_at_symbol = old_is_allow_at_symbol;
		return new OpHtmlCall(obj, v);
	}
	/**
	 * Read operator block
	 * @return BaseOpCode
	 */
	readHtmlTag(){
		if (this.findNextToken("<!")){
			this.matchNextToken("<!");
			if (this.findNextString("DOCTYPE")){
				return this.readHtmlDOCTYPE();
			}
		}
		else if (this.findNextToken("<")){
			this.matchNextToken("<");
			var res = new OpHtmlTag();
			res.tag_name = this.readNextToken().token;
			res.attributes = this.readHtmlAttributes();
			if (this.isDoubleToken(res.tag_name)){
				this.matchNextToken(">");
			}
			else {
				this.matchNextToken("/>");
			}
			if (res.tag_name == "script" || res.tag_name == "pre" || res.tag_name == "textarea"){
				var close_tag = "</"+rtl.toString(res.tag_name)+">";
				res.is_plain = true;
				res.childs = this.readHtmlBlock("</"+rtl.toString(res.tag_name)+">", false, true);
				this.matchNextToken("</");
				this.matchNextToken(res.tag_name);
				this.matchNextToken(">");
			}
			else if (this.isDoubleToken(res.tag_name)){
				var close_tag = "</"+rtl.toString(res.tag_name)+">";
				res.childs = this.readHtmlBlock("</");
				this.matchNextToken("</");
				this.matchNextToken(res.tag_name);
				this.matchNextToken(">");
			}
			return res;
		}
		else if (this.findNextToken("@component")){
			var res = this.readHtmlComponent();
			this.matchNextToken(";");
			return res;
		}
		else if (this.findNextToken("@render")){
			var res = this.readHtmlRender();
			this.matchNextToken(";");
			return res;
		}
		else if (this.findNextToken("@call")){
			var res = this.readHtmlCall();
			this.matchNextToken(";");
			return res;
		}
		else if (this.findNextToken("@while")){
			return this.readHtmlWhile();
		}
		else if (this.findNextToken("@for")){
			return this.readHtmlFor();
		}
		else if (this.findNextToken("@set") || this.findNextToken("@declare")){
			var is_declare = false;
			if (this.findNextToken("@set")){
				this.matchNextToken("@set");
			}
			else {
				this.matchNextToken("@declare");
				is_declare = true;
			}
			this.pushToken(new ParserBayToken(this.context(), this));
			var res = this.readOperatorAssign();
			if (res){
				this.matchNextToken(";");
			}
			if (is_declare && res instanceof OpAssign){
				throw this.parserError("Assign variable must use @set");
			}
			else if (!is_declare && res instanceof OpAssignDeclare){
				throw this.parserError("Declare variable must use @declare");
			}
			this.popRestoreToken();
			return res;
		}
		else if (this.findNextToken("@if")){
			return this.readHtmlIf();
		}
		else if (this.findNextToken("<!--")){
			return this.readHtmlComment();
		}
		return null;
	}
	/**
	 * Read Html Expression
	 */
	readHtmlBlock(match_str, parse_html_tokens, is_plain, is_html_expression){
		if (parse_html_tokens == undefined) parse_html_tokens=true;
		if (is_plain == undefined) is_plain=false;
		if (is_html_expression == undefined) is_html_expression=false;
		var len_match = rs.strlen(match_str);
		if (len_match == 0){
			return null;
		}
		var look_str = this.current_token.lookString(len_match);
		var childs = new Vector();
		var special_tokens = HtmlToken.getSpecialTokens();
		special_tokens.removeValue("@{");
		special_tokens.removeValue("@raw{");
		special_tokens.removeValue("@json{");
		special_tokens.removeValue("<!--");
		var bracket_level = 0;
		var s = "";
		/* Main loop */
		while (look_str != "" && !this.current_token.isEOF() && (look_str != match_str || look_str == "}" && bracket_level > 0)){
			var res = null;
			var is_next_html_token = this.current_token.findString("<");
			var is_next_special_token = this.current_token.findVector(special_tokens) != -1;
			if (parse_html_tokens && (is_next_special_token || is_next_html_token)){
				if (!is_plain){
					s = rs.trim(s, "\\t\\r\\n");
				}
				if (s != ""){
					if (is_html_expression){
						childs.push(new OpString(s));
					}
					else {
						childs.push(new OpHtmlText(s));
					}
				}
				s = "";
				this.assignCurrentToken(this.current_token);
				res = this.readHtmlTag();
			}
			else if (this.current_token.findString("@{") || this.current_token.findString("@raw{") || this.current_token.findString("@json{")){
				if (!is_plain){
					s = rs.trim(s, "\\t\\r\\n");
				}
				if (s != ""){
					if (is_html_expression){
						childs.push(new OpString(s));
					}
					else {
						childs.push(new OpHtmlText(s));
					}
				}
				s = "";
				var is_raw = false;
				var is_json = false;
				if (this.current_token.findString("@{")){
					this.current_token.match("@{");
				}
				else if (this.current_token.findString("@json{")){
					this.current_token.match("@json{");
					is_raw = true;
					is_json = true;
				}
				else {
					this.current_token.match("@raw{");
					is_raw = true;
				}
				this.assignCurrentToken(this.current_token);
				this.pushToken(new ParserBayToken(this.context(), this));
				res = this.readExpression();
				if (!is_html_expression){
					res = new OpHtmlValue(res);
					res.is_raw = is_raw;
					res.is_json = is_json;
				}
				else {
					res = new OpHtmlEscape(res);
					res.is_raw = is_raw;
					res.is_json = is_json;
				}
				this.popRestoreToken();
				this.matchNextToken("}");
			}
			if (res != null){
				childs.push(res);
			}
			else {
				var look = this.current_token.readChar();
				s = rtl.toString(s)+rtl.toString(look);
				if (look == "{"){
					bracket_level++
				}
				else if (look == "}"){
					bracket_level--
				}
			}
			look_str = this.current_token.lookString(len_match);
		}
		if (!is_plain){
			s = rs.trim(s, "\\t\\r\\n");
		}
		if (s != ""){
			if (is_html_expression){
				childs.push(new OpString(s));
			}
			else {
				childs.push(new OpHtmlText(s));
			}
		}
		this.assignCurrentToken(this.current_token);
		return childs;
	}
	/**
	 * Read operator block
	 * @return BaseOpCode
	 */
	readTemplateBlock(){
		/* Push new token */
		this.pushToken(new HtmlToken(this.context(), this));
		/* Read html block */
		var res = this.readHtmlBlock("}");
		/* Restore tokens */
		this.popRestoreToken();
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareTemplate(template_flags){
		var res = new OpTemplateDeclare();
		res.flags = template_flags;
		this.matchNextToken("template");
		res.name = this.readIdentifierName();
		this.matchNextToken("(");
		while (!this.findNextToken(")") && !this.isEOF()){
			var op_code = this.readOperatorAssign();
			if (op_code instanceof OpAssign){
				throw this.parserError("Assign are not alowed here");
			}
			else if (op_code instanceof OpAssignDeclare){
				res.args.push(op_code);
			}
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(")");
		if (this.findNextToken("{")){
			this.matchNextToken("{");
			res.childs = this.readTemplateBlock();
			this.matchNextToken("}");
		}
		else {
			this.matchNextToken(";");
		}
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareView(view_flags){
		var res = new OpViewDeclare();
		res.flags = view_flags;
		this.matchNextToken("view");
		var flags = null;
		var op_code = null;
		res.view_name = this.readIdentifierName();
		if (this.findNextToken("extends")){
			this.matchNextToken("extends");
			res.view_extends = this.readIdentifier();
		}
		this.matchNextToken("{");
		while (!this.findNextToken("}") && !this.isEOF()){
			if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
				res.childs.push(new OpComment(this.readAnyNextToken().token));
				continue;
			}
			flags = this.readFlags();
			if (this.findNextToken("template")){
				op_code = this.readDeclareTemplate(flags);
				res.childs.push(op_code);
				continue;
			}
			op_code = this.readDeclareClassFunction(flags);
			if (op_code){
				op_code.flags = flags;
				res.childs.push(op_code);
				continue;
			}
			op_code = this.readOperatorAssign();
			if (op_code instanceof OpAssign){
				throw this.parserError("Assign are not alowed here");
			}
			else if (op_code instanceof OpAssignDeclare){
				op_code.flags = flags;
				res.view_variables.push(op_code);
				this.matchNextToken(";");
				continue;
			}
			throw this.parserError("Unknown operator");
		}
		this.matchNextToken("}");
		return res;
	}
	/**
	 * Read program
	 * @return BaseOpCode
	 */
	readProgram(){
		var op_code = null;
		var res = new Vector();
		while (!this.isEOF()){
			if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
				res.push(new OpComment(this.readAnyNextToken().token));
				continue;
			}
			else if (this.findNextToken("namespace")){
				res.push(this.readOperatorNamespace());
				continue;
			}
			else if (this.findNextToken("use")){
				res.push(this.readOperatorUse());
				continue;
			}
			else if (this.findNextTokenPreprocessor()){
				res.push(this.readPreprocessor());
				continue;
			}
			var flags = this.readFlags();
			if (this.findNextToken("view")){
				res.push(this.readDeclareView(flags));
			}
			else {
				throw this.parserError("Unknown token "+rtl.toString(this.lookNextToken()));
			}
		}
		return res;
	}
	/**
	 * Reset parser to default settings
	 */
	resetParser(){
		super.resetParser();
	}
	/**
	 * Parser function
	 */
	runParser(){
		this._result = new OpNope(this.readProgram());
	}
}
module.exports = TemplateParser;