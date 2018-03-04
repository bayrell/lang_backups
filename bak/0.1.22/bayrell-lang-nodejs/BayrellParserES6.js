"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
var BayrellTokenParser = m_bayrell_rtl.BayrellTokenParser;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParserES6 extends BayrellTokenParser {
	getClassName(){
		return "bayrell_lang.BayrellParserES6";
	}
	constructor(){
		super();
		this.mathSemicolon = true;
		this.pair_tokens = ["&&", "||", ">>", "<<", "->", "++", "--", "+=", "-=", "*=", "/="];
		this.string_tokens = ["\"", "'"];
		this.comment_line_tokens = ["//"];
		this.comment_pair_tokens = {
			"/*!": "*/",
			"/**": "*/",
			"/*": "*/",
		};
		this.comment_pair_tokens_sort = ["/*!", "/**", "/*"];
		/* x */
	}
}
module.exports.BayrellParserES6 = BayrellParserES6;
