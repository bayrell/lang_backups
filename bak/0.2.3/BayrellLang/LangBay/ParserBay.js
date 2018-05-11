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
var Vector = require('BayrellRtl').Types.Vector;
var Map = require('BayrellRtl').Types.Map;
var rs = require('BayrellRtl').Lib.rs;
var Vector = require('BayrellRtl').Types.Vector;
var CommonParser = require('../CommonParser.js');
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
var OpMap = require('../OpCodes/OpMap.js');
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
var OpVector = require('../OpCodes/OpVector.js');
var OpWhile = require('../OpCodes/OpWhile.js');
var ParserBayToken = require('./ParserBayToken.js');
var ParserBayNameToken = require('./ParserBayNameToken.js');
var HexNumberExpected = require('../Exceptions/HexNumberExpected.js');
var TwiceDeclareElseError = require('../Exceptions/TwiceDeclareElseError.js');
var ParserError = require('BayrellParser').Exceptions.ParserError;
class ParserBay extends CommonParser{
	_init(){
		super._init();
	}
	/**
	 * Tokens Fabric
	 * @return BayrellParserToken
	 */
	createToken(){
		return new ParserBayToken(this.context(), this);
	}
	/**
	 * Read double value and
	 * @return BaseOpCode
	 */
	readFixed(){
		var res = "";
		/* Try to read HEX Number */
		this.pushToken();
		try{
			res = this.matchHexNumber();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof HexNumberExpected){
					throw ex;
				}
				else if (ex instanceof ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
		}
		if (res != null){
			this.popToken();
			return new OpHexNumber(res);
		}
		else {
			this.popReturnToken();
		}
		this.pushToken();
		try{
			res = this.matchDouble();
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					res = null;
				}
				else {
					throw ex;
				}
			}
		}
		if (res != null){
			this.popToken();
			return new OpNumber(res);
		}
		else {
			this.popReturnToken();
		}
		if (this.lookNextTokenType() == ParserBayToken.TOKEN_STRING){
			return new OpString(this.readAnyNextToken().token);
		}
		return null;
	}
	/**
	 * Read name
	 */
	readIdentifierName(){
		var res = this.lookNextToken();
		var s = rs.charAt(res, 0);
		if (!this.isLetterChar(s) && s != "_"){
			throw this.parserError(this.translate("ERROR_PARSER_FIRST_CHAR_MUST_BE_LETTER"));
		}
		this.readNextToken();
		return res;
	}
	/**
	 * Read name
	 */
	readDynamicNameOld(){
		/* Create new token */
		var token = new ParserBayNameToken(this.context(), this);
		token.assign(this.current_token);
		token.readNextToken();
		/* Get name */
		var name = token.token;
		/* Assign next token */
		this.current_token.assign(token);
		this.next_token.assign(token);
		this.next_token.readNextToken();
		/* Destroy new token */
		return name;
	}
	/**
	 * Read name
	 */
	readDynamicName(){
		/* Create new token */
		var next_token = new ParserBayNameToken(this.context(), this);
		this.pushToken(next_token);
		/* Get name */
		var name = next_token.token;
		/* Assign next token */
		this.popReturnToken();
		this.assignCurrentToken(next_token);
		return name;
	}
	/**
	 * Read Identifier
	 * @return OpIdentifier
	 */
	readIdentifier(){
		var res = this.readIdentifierName();
		return new OpIdentifier(res);
	}
	/**
	 * Read call args
	 * @return BaseOpCode
	 */
	readCallArgs(){
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
	readCallBody(){
		var v = null;
		this.matchNextToken("(");
		if (!this.findNextToken(")")){
			v = this.readCallArgs();
		}
		this.matchNextToken(")");
		return v;
	}
	/**
	 * Read new or await function
	 */
	readGroupExpression(){
		if (this.findNextToken("(")){
			this.matchNextToken("(");
			var op_code = this.readExpression();
			this.matchNextToken(")");
			return op_code;
		}
		return this.readIdentifier();
	}
	/**
	 * Read new instance
	 * @return BaseOpCode
	 */
	readNewInstance(){
		this.matchNextToken("new");
		var ident = this.readTemplateIdentifier();
		var v = this.readCallBody();
		return new OpNew(ident, v);
	}
	/**
	 * Read call await
	 * @return BaseOpCode
	 */
	readCallAwait(){
		this.matchNextToken("await");
		var ident = this.readCallDynamic(true, true, true, true);
		var v = this.readCallBody();
		return new OpCallAwait(ident, v);
	}
	/**
	 * Read clone
	 * @return BaseOpCode
	 */
	readClone(){
		this.matchNextToken("clone");
		var value = this.readExpression();
		return new OpClone(value);
	}
	/**
	 * Read new or await function
	 */
	readNewAwait(){
		if (this.findNextToken("new")){
			return this.readNewInstance();
		}
		else if (this.findNextToken("await")){
			return this.readCallAwait();
		}
		else if (this.findNextToken("clone")){
			return this.readClone();
		}
		return this.readGroupExpression();
	}
	/**
	 * Read call dynamic
	 * @return BaseOpCode
	 */
	readCallDynamic(allow_dynamic, allow_bracket, allow_static, allow_call){
		if (allow_dynamic == undefined) allow_dynamic=true;
		if (allow_bracket == undefined) allow_bracket=true;
		if (allow_static == undefined) allow_static=true;
		if (allow_call == undefined) allow_call=true;
		var name = "";
		var can_static = true;
		var obj = this.readGroupExpression();
		var ident = null;
		while (this.findNextToken(".") && allow_dynamic || this.findNextToken("[") && allow_bracket || this.findNextToken("::") && allow_static || this.findNextToken("(") && allow_call){
			if (this.findNextToken(".") && allow_dynamic){
				this.matchNextToken(".");
				name = this.readIdentifierName();
				obj = new OpDynamic(obj, name);
			}
			else if (this.findNextToken("[") && allow_bracket){
				this.matchNextToken("[");
				ident = this.readExpression();
				this.matchNextToken("]");
				obj = new OpArray(obj, ident);
			}
			else if (this.findNextToken("::") && allow_static){
				if (!can_static){
					throw this.parserError(this.translate("ERROR_PARSER_STATIC_METHOD_IS_NOT_ALOWED_HERE"));
				}
				this.matchNextToken("::");
				name = this.readIdentifierName();
				obj = new OpStatic(obj, name);
				can_static = false;
			}
			else if (this.findNextToken("(") && allow_call){
				var v = this.readCallBody();
				obj = new OpCall(obj, v);
				can_static = false;
			}
		}
		return obj;
	}
	/**
	 * Read type identifier
	 * @return BaseOpCode
	 */
	readTemplateIdentifier(){
		var op_code1 = this.readCallDynamic(true, false, false, false);
		if (!this.findNextToken("<")){
			return op_code1;
		}
		var v = new Vector();
		this.matchNextToken("<");
		while (true){
			var op_code2 = this.readCallDynamic(true, false, false, false);
			v.push(op_code2);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
				continue;
			}
			break;
		}
		this.matchNextToken(">");
		return new OpTemplateIdentifier(op_code1, v);
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readVector(){
		var res = new OpVector();
		this.matchNextToken("[");
		while (!this.findNextToken("]")){
			res.values.push(this.readExpression());
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("]");
		return res;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readMap(){
		var res = new OpMap();
		this.matchNextToken("{");
		while (!this.findNextToken("}")){
			if (this.lookNextTokenType() != ParserBayToken.TOKEN_STRING){
				throw this.parserExpected("string");
			}
			var key = this.readAnyNextToken().token;
			this.matchNextToken(":");
			var value = this.readExpression();
			res.values.set(key, value);
			if (this.findNextToken(",")){
				this.matchNextToken(",");
			}
		}
		this.matchNextToken("}");
		return res;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readExpressionElement(){
		if (this.findNextToken("new")){
			return this.readNewInstance();
		}
		else if (this.findNextToken("await")){
			return this.readCallAwait();
		}
		else if (this.findNextToken("clone")){
			return this.readClone();
		}
		else if (this.findNextToken("[")){
			return this.readVector();
		}
		else if (this.findNextToken("{")){
			return this.readMap();
		}
		var op_code = this.readFixed();
		if (op_code != null){
			return op_code;
		}
		return this.readCallDynamic(true, true, true, true);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readExpressionPostfix(){
		var op_code = this.readExpressionElement();
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPostDec(op_code);
		}
		return op_code;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readExpressionPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPreDec(this.readExpressionPostfix());
		}
		return this.readExpressionPostfix();
	}
	/**
	 * Read bit NOT
	 * @return BaseOpCode
	 */
	readExpressionBitNot(){
		if (this.findNextToken("!")){
			this.matchNextToken("!");
			return new OpBitNot(this.readExpressionPrefix());
		}
		return this.readExpressionPrefix();
	}
	/**
	 * Read pow
	 * @return BaseOpCode
	 */
	readExpressionPow(){
		var op_code = this.readExpressionBitNot();
		while (this.findNextToken("**")){
			this.matchNextToken("**");
			op_code = new OpPow(op_code, this.readExpressionBitNot());
		}
		return op_code;
	}
	/**
	 * Read arithmetic multiply and divide
	 * @return BaseOpCode
	 */
	readExpressionFactor(){
		/* Read first opcode */
		var op_code = this.readExpressionPow();
		while (this.findNextToken("*") || this.findNextToken("/") || this.findNextToken("%")){
			if (this.findNextToken("*")){
				this.matchNextToken("*");
				op_code = new OpMult(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("/")){
				this.matchNextToken("/");
				op_code = new OpDiv(op_code, this.readExpressionPow());
			}
			else if (this.findNextToken("%")){
				this.matchNextToken("%");
				op_code = new OpMod(op_code, this.readExpressionPow());
			}
			else {
				throw this.nextTokenExpected("\"*\", \"/\" or \"%\"");
			}
		}
		return op_code;
	}
	/**
	 * Read arithmetic expression
	 * @return BaseOpCode
	 */
	readExpressionArithmetic(){
		/* Read first opcode */
		var op_code = this.readExpressionFactor();
		while (this.findNextToken("+") || this.findNextToken("-")){
			if (this.findNextToken("+")){
				this.matchNextToken("+");
				op_code = new OpAdd(op_code, this.readExpressionFactor());
			}
			else if (this.findNextToken("-")){
				this.matchNextToken("-");
				op_code = new OpSub(op_code, this.readExpressionFactor());
			}
			else {
				throw this.nextTokenExpected("\"+\" or \"-\"");
			}
		}
		return op_code;
	}
	/**
	 * Read shift
	 * @return BaseOpCode
	 */
	readExpressionShift(){
		/* Read first opcode */
		var op_code = this.readExpressionArithmetic();
		while (this.findNextToken("<<") || this.findNextToken(">>")){
			if (this.findNextToken("<<")){
				this.matchNextToken("<<");
				op_code = new OpShiftLeft(op_code, this.readExpressionArithmetic());
			}
			else if (this.findNextToken(">>")){
				this.matchNextToken(">>");
				op_code = new OpShiftRight(op_code, this.readExpressionArithmetic());
			}
			else {
				throw this.nextTokenExpected("\"<<\" or \">>\"");
			}
		}
		return op_code;
	}
	/**
	 * Read concat string
	 * @return BaseOpCode
	 */
	readExpressionConcat(){
		/* Read first opcode */
		var op_code = this.readExpressionShift();
		while (this.findNextToken("~")){
			this.matchNextToken("~");
			op_code = new OpConcat(op_code, this.readExpressionShift());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare1(){
		/* Read first opcode */
		var op_code = this.readExpressionConcat();
		while (this.findNextToken("<") || this.findNextToken("<=") || this.findNextToken(">") || this.findNextToken(">=") || this.findNextToken("in") || this.findNextToken("instanceof") || this.findNextToken("implements")){
			var cond = this.readNextToken().token;
			op_code = new OpCompare(cond, op_code, this.readExpressionConcat());
		}
		return op_code;
	}
	/**
	 * Read compare
	 * @return BaseOpCode
	 */
	readExpressionCompare2(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare1();
		while (this.findNextToken("==") || this.findNextToken("===") || this.findNextToken("!=") || this.findNextToken("!==")){
			var cond = this.readNextToken().token;
			op_code = new OpCompare(cond, op_code, this.readExpressionCompare1());
		}
		return op_code;
	}
	/**
	 * Read bit AND
	 * @return BaseOpCode
	 */
	readExpressionBitAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionCompare2();
		while (this.findNextToken("&")){
			this.matchNextToken("&");
			op_code = new OpBitAnd(op_code, this.readExpressionCompare2());
		}
		return op_code;
	}
	/**
	 * Read bit XOR
	 * @return BaseOpCode
	 */
	readExpressionBitXor(){
		/* Read first opcode */
		var op_code = this.readExpressionBitAnd();
		while (this.findNextToken("^")){
			this.matchNextToken("^");
			op_code = new OpBitXor(op_code, this.readExpressionBitAnd());
		}
		return op_code;
	}
	/**
	 * Read bit OR
	 * @return BaseOpCode
	 */
	readExpressionBitOr(){
		/* Read first opcode */
		var op_code = this.readExpressionBitXor();
		while (this.findNextToken("|")){
			this.matchNextToken("|");
			op_code = new OpBitOr(op_code, this.readExpressionBitXor());
		}
		return op_code;
	}
	/**
	 * Read NOT
	 * @return BaseOpCode
	 */
	readExpressionNot(){
		if (this.findNextToken("not")){
			this.matchNextToken("not");
			return new OpNot(this.readExpressionBitOr());
		}
		return this.readExpressionBitOr();
	}
	/**
	 * Read AND
	 * @return BaseOpCode
	 */
	readExpressionAnd(){
		/* Read first opcode */
		var op_code = this.readExpressionNot();
		while (this.findNextToken("and")){
			this.matchNextToken("and");
			op_code = new OpAnd(op_code, this.readExpressionNot());
		}
		return op_code;
	}
	/**
	 * Read OR
	 * @return BaseOpCode
	 */
	readExpressionOr(){
		/* Read first opcode */
		var op_code = this.readExpressionAnd();
		while (this.findNextToken("or")){
			this.matchNextToken("or");
			op_code = new OpOr(op_code, this.readExpressionAnd());
		}
		return op_code;
	}
	/**
	 * Read ternary operator
	 * @return BaseOpCode
	 */
	readExpressionTernary(){
		/* Read first opcode */
		var op_code = this.readExpressionOr();
		if (this.findNextToken("?")){
			this.matchNextToken("?");
			var if_true = this.readExpressionOr();
			this.matchNextToken(":");
			var if_false = this.readExpressionOr();
			return new OpTernary(op_code, if_true, if_false);
		}
		return op_code;
	}
	/**
	 * Read expression
	 * @return BaseOpCode
	 */
	readExpression(){
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		var res = this.readExpressionTernary();
		this.skip_comments = old_skip_comments;
		return res;
	}
	/**
	 * Read operator assign
	 * @return BaseOpCode
	 */
	readOperatorAssign(){
		var op_type = null;
		var op_ident = null;
		var op_ident_name = "";
		var op_exp = null;
		var success = false;
		var v = (new Vector()).push("=").push("~=").push("+=").push("-=");
		/* Read assign */
		success = false;
		this.pushToken();
		try{
			op_ident = this.readCallDynamic(true, true, true, false);
			if (this.findNextTokenVector(v) != -1){
				success = true;
			}
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
		}
		if (success){
			this.popToken();
			var pos = this.findNextTokenVector(v);
			var op_name = v.item(pos);
			this.matchNextToken(op_name);
			op_exp = this.readExpression();
			return new OpAssign(op_ident, op_exp, op_name);
		}
		this.popReturnToken();
		/* Read declare */
		this.pushToken();
		try{
			op_type = this.readTemplateIdentifier();
			op_ident_name = this.readIdentifierName();
			success = true;
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var ex = _the_exception;
				if (ex instanceof ParserError){
					success = false;
				}
				else {
					throw ex;
				}
			}
		}
		if (success){
			this.popToken();
			if (this.findNextToken("=")){
				this.matchNextToken("=");
				op_exp = this.readExpression();
			}
			return new OpAssignDeclare(op_type, op_ident_name, op_exp);
		}
		this.popReturnToken();
		return null;
	}
	/**
	 * Read operator if
	 * @return BaseOpCode
	 */
	readOperatorIf(){
		var old_skip_comments = this.skip_comments;
		this.skip_comments = true;
		var condition = null;
		var if_true = null;
		var if_false = null;
		var if_else = new Vector();
		/* Read condition */
		this.matchNextToken("if");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read if true operators block */
		if (this.lookNextToken() == "{"){
			this.matchNextToken("{");
			if_true = this.readOperatorsBlock();
			this.matchNextToken("}");
		}
		else {
			if_true = new Vector();
			if_true.push(this.readOperator());
		}
		while (this.findNextToken("elseif") || this.findNextToken("else")){
			if (this.findNextToken("else")){
				this.matchNextToken("else");
				if (this.findNextToken("if")){
					var op_if_else = new OpIfElse();
					this.matchNextToken("if");
					this.matchNextToken("(");
					op_if_else.condition = this.readExpression();
					this.matchNextToken(")");
					if (this.lookNextToken() == "{"){
						this.matchNextToken("{");
						op_if_else.if_true = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						op_if_else.if_true = new Vector();
						op_if_else.if_true.push(this.readOperator());
					}
					if_else.push(op_if_else);
				}
				else {
					if (this.lookNextToken() == "{"){
						this.matchNextToken("{");
						if_false = this.readOperatorsBlock();
						this.matchNextToken("}");
					}
					else {
						if_false = new Vector();
						if_false.push(this.readOperator());
					}
					break;
				}
			}
			else if (this.findNextToken("elseif")){
				var op_if_else = new OpIfElse();
				this.matchNextToken("elseif");
				this.matchNextToken("(");
				op_if_else.condition = this.readExpression();
				this.matchNextToken(")");
				if (this.lookNextToken() == "{"){
					this.matchNextToken("{");
					op_if_else.if_true = this.readOperatorsBlock();
					this.matchNextToken("}");
					if_else.push(op_if_else);
				}
				else {
					op_if_else.if_true = new Vector();
					op_if_else.if_true.push(this.readOperator());
				}
			}
		}
		this.skip_comments = old_skip_comments;
		return new OpIf(condition, if_true, if_false, if_else);
	}
	/**
	 * Read operator while
	 * @return BaseOpCode
	 */
	readOperatorWhile(){
		var condition = null;
		var childs = null;
		/* Read condition */
		this.matchNextToken("while");
		this.matchNextToken("(");
		condition = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new OpWhile(condition, childs);
	}
	/**
	 * Read operator for
	 * @return BaseOpCode
	 */
	readOperatorFor(){
		var loop_condition = null;
		var loop_init = null;
		var loop_inc = null;
		var childs = null;
		/* Read loop header */
		this.matchNextToken("for");
		this.matchNextToken("(");
		loop_init = this.readOperatorAssign();
		this.matchNextToken(";");
		loop_condition = this.readExpression();
		this.matchNextToken(";");
		loop_inc = this.readExpression();
		this.matchNextToken(")");
		/* Read operators block */
		this.matchNextToken("{");
		childs = this.readOperatorsBlock();
		this.matchNextToken("}");
		return new OpFor(loop_condition, loop_init, loop_inc, childs);
	}
	/**
	 * Read operator try
	 * @return BaseOpCode
	 */
	readOperatorTry(){
		var op_try = null;
		var op_catch = new Vector();
		/* Read try block */
		this.matchNextToken("try");
		this.matchNextToken("{");
		op_try = this.readOperatorsBlock();
		this.matchNextToken("}");
		/* Read catch */
		while (this.findNextToken("catch")){
			var try_catch_child = new OpTryCatchChilds();
			this.matchNextToken("catch");
			this.matchNextToken("(");
			try_catch_child.op_type = this.readTemplateIdentifier();
			try_catch_child.op_ident = this.readIdentifier();
			this.matchNextToken(")");
			this.matchNextToken("{");
			try_catch_child.childs = this.readOperatorsBlock();
			this.matchNextToken("}");
			op_catch.push(try_catch_child);
		}
		return new OpTryCatch(op_try, op_catch);
	}
	/**
	 * Read operator return
	 * @return BaseOpCode
	 */
	readOperatorReturn(){
		this.matchNextToken("return");
		var value = null;
		if (!this.findNextToken(";")){
			value = this.readExpression();
		}
		this.matchNextToken(";");
		return new OpReturn(value);
	}
	/**
	 * Read operator throw
	 * @return BaseOpCode
	 */
	readOperatorThrow(){
		this.matchNextToken("throw");
		var value = this.readExpression();
		this.matchNextToken(";");
		return new OpThrow(value);
	}
	/**
	 * Read operator delete
	 * @return BaseOpCode
	 */
	readOperatorDelete(){
		this.matchNextToken("delete");
		var value = this.readCallDynamic(true, true, false, false);
		this.matchNextToken(";");
		return new OpDelete(value);
	}
	/**
	 * Read postfix
	 * @return BaseOpCode
	 */
	readOperatorPostfix(){
		this.pushToken();
		var op_code = this.readExpressionElement();
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			this.popToken();
			return new OpPostInc(op_code);
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			this.popToken();
			return new OpPostDec(op_code);
		}
		this.popReturnToken();
		return null;
	}
	/**
	 * Read prefix
	 * @return BaseOpCode
	 */
	readOperatorPrefix(){
		if (this.findNextToken("++")){
			this.matchNextToken("++");
			return new OpPreInc(this.readExpressionPostfix());
		}
		else if (this.findNextToken("--")){
			this.matchNextToken("--");
			return new OpPreDec(this.readExpressionPostfix());
		}
		return null;
	}
	/**
	 * Read operator 
	 * @return BaseOpCode
	 */
	readOperator(){
		if (this.findNextToken(";")){
			this.matchNextToken(";");
			return null;
		}
		else if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
			return new OpComment(this.readAnyNextToken().token);
		}
		else if (this.findNextToken("if")){
			return this.readOperatorIf();
		}
		else if (this.findNextToken("while")){
			return this.readOperatorWhile();
		}
		else if (this.findNextToken("for")){
			return this.readOperatorFor();
		}
		else if (this.findNextToken("try")){
			return this.readOperatorTry();
		}
		else if (this.findNextToken("return")){
			return this.readOperatorReturn();
		}
		else if (this.findNextToken("throw")){
			return this.readOperatorThrow();
		}
		else if (this.findNextToken("delete")){
			return this.readOperatorDelete();
		}
		else if (this.findNextToken("break")){
			this.matchNextToken("break");
			this.matchNextToken(";");
			return new OpBreak();
		}
		else if (this.findNextToken("continue")){
			this.matchNextToken("continue");
			this.matchNextToken(";");
			return new OpContinue();
		}
		else if (this.findNextTokenPreprocessor()){
			return this.readPreprocessor();
		}
		var res = this.readOperatorPrefix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		var res = this.readOperatorPostfix();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		var res = this.readOperatorAssign();
		if (res){
			this.matchNextToken(";");
			return res;
		}
		return this.readExpressionElement();
		/*return this.readCallDynamic(true, true, true, true);*/
	}
	/**
	 * Read operator block
	 * @return BaseOpCode
	 */
	readOperatorsBlock(){
		var res = new Vector();
		var match_bracket = false;
		if (this.findNextToken("{")){
			this.matchNextToken("{");
			match_bracket = true;
		}
		var op_code = null;
		while (!this.findNextToken("}") && !this.isEOF()){
			op_code = this.readOperator();
			if (op_code != null){
				res.push(op_code);
			}
		}
		if (match_bracket){
			this.matchNextToken("}");
		}
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorNamespace(){
		this.matchNextToken("namespace");
		var name = this.readDynamicName();
		this.matchNextToken(";");
		return new OpNamespace(name);
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readOperatorUse(){
		this.matchNextToken("use");
		var name = this.readDynamicName();
		var alias_name = "";
		if (this.findNextToken("as")){
			this.matchNextToken("as");
			alias_name = this.readIdentifierName();
		}
		this.matchNextToken(";");
		return new OpUse(name, alias_name);
	}
	/**
	 * Read flags
	 * @return OpFlags
	 */
	readFlags(){
		var flags = null;
		var flags_vector = OpFlags.getFlags();
		if (this.findNextTokenVector(flags_vector) != -1){
			flags = new OpFlags();
			while (this.findNextTokenVector(flags_vector) != -1){
				if (!flags.assignFlag(this.lookNextToken())){
					throw this.parserError("Unknown flag '"+rtl.toString(this.lookNextToken())+"'");
				}
				this.readNextToken();
			}
		}
		if (flags_vector != null){
		}
		return flags;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareClassFunction(){
		var res = new OpFunctionDeclare();
		this.pushToken();
		res.result_type = this.readTemplateIdentifier();
		res.name = this.readIdentifierName();
		/* If not function */
		if (this.lookNextToken() != "("){
			this.popReturnToken();
			return null;
		}
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
		this.popToken();
		if (this.findNextToken("{")){
			res.childs = this.readOperatorsBlock();
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
	readClassBody(res){
		var flags = null;
		var op_code = null;
		res.class_name = this.readIdentifierName();
		if (this.findNextToken("<")){
			this.matchNextToken("<");
			while (true){
				var op_code2 = this.readCallDynamic(true, false, false, false);
				res.class_template.push(op_code2);
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
			this.matchNextToken(">");
		}
		if (this.findNextToken("extends")){
			this.matchNextToken("extends");
			res.class_extends = this.readIdentifier();
		}
		if (this.findNextToken("implements")){
			this.matchNextToken("implements");
			while (!this.findNextToken("{") && !this.isEOF()){
				res.class_implements.push(this.readDynamicName());
				if (this.findNextToken(",")){
					this.matchNextToken(",");
					continue;
				}
				break;
			}
		}
		this.matchNextToken("{");
		while (!this.findNextToken("}") && !this.isEOF()){
			if (this.findNextTokenPreprocessor()){
				res.childs.push(this.readPreprocessor());
				continue;
			}
			else if (this.lookNextTokenType() == ParserBayToken.TOKEN_COMMENT){
				res.childs.push(new OpComment(this.readAnyNextToken().token));
				continue;
			}
			flags = this.readFlags();
			op_code = this.readDeclareClassFunction();
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
				res.class_variables.push(op_code);
				this.matchNextToken(";");
				continue;
			}
			throw this.parserError("Unknown operator");
		}
		this.matchNextToken("}");
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareClass(class_flags){
		var res = new OpClassDeclare();
		this.matchNextToken("class");
		this.readClassBody(res);
		res.flags = class_flags;
		return res;
	}
	/**
	 * Read operator namespace
	 * @return BaseOpCode
	 */
	readDeclareInterface(class_flags){
		var res = new OpInterfaceDeclare();
		this.matchNextToken("interface");
		this.readClassBody(res);
		res.flags = class_flags;
		return res;
	}
	/**
	 * Prepocessor
	 */
	findNextTokenPreprocessor(){
		var token = this.lookNextToken();
		if (this.lookNextTokenType() == ParserBayToken.TOKEN_BASE && (token == "#switch" || token == "#ifcode")){
			return true;
		}
		return false;
	}
	/**
	 * Read prepocessors block
	 */
	readPreprocessor(){
		if (this.findNextToken("#switch")){
			var childs = new Vector();
			var comment;
			var pos;
			this.matchNextToken("#switch");
			var v = (new Vector()).push("#case").push("#endswitch");
			while (this.findNextToken("#case")){
				this.matchNextToken("#case");
				this.matchNextToken("ifcode");
				var op_case = new OpPreprocessorCase();
				op_case.condition = this.readExpression();
				if (!this.findNextToken("then")){
					throw this.nextTokenExpected("then");
				}
				op_case.value = rs.trim(this.next_token.readUntilVector(v));
				childs.push(op_case);
				this.readAnyNextToken();
				pos = this.findNextTokenVector(v);
				if (pos == -1){
					throw this.parserError("Unknown preprocessor token "+rtl.toString(this.lookNextToken()));
				}
			}
			this.matchNextToken("#endswitch");
			return new OpPreprocessorSwitch(childs);
		}
		else if (this.findNextToken("#ifcode")){
			this.matchNextToken("#endifcode");
		}
		else {
			throw this.parserError("Unknown preprocessor token "+rtl.toString(this.lookNextToken()));
		}
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
			if (this.findNextToken("class")){
				res.push(this.readDeclareClass(flags));
			}
			else if (this.findNextToken("interface")){
				res.push(this.readDeclareInterface(flags));
			}
			else {
				throw this.parserError("Unknown token "+rtl.toString(this.lookNextToken()));
			}
		}
		return res;
	}
	/**
	 * Parser function
	 */
	runParser(){
		this._result = new OpNope(this.readProgram());
	}
}
module.exports = ParserBay;