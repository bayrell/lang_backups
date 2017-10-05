/* 
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellTokenParser = m_bayrell_rtl.BayrellTokenParser;
var isset = m_bayrell_rtl.isset;
var in_array = m_bayrell_rtl.in_array;
var array_push = m_bayrell_rtl.array_push;
var strlen = m_bayrell_rtl.strlen;
var clone = m_bayrell_rtl.clone;
var count = m_bayrell_rtl.count;
var ord = m_bayrell_rtl.ord;
var strpos = m_bayrell_rtl.strpos;
var strtolower = m_bayrell_rtl.strtolower;
var file_get_contents = m_bayrell_rtl.file_get_contents;
var implode = m_bayrell_rtl.implode;
var trim = m_bayrell_rtl.trim;
var is_string = m_bayrell_rtl.is_string;
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
class BayrellParserES6 extends BayrellTokenParser {
  constructor(){
    super();
    this.mathSemicolon = true;
    this.pair_tokens = ["&&", "||", ">>", "<<", "->", "++", "--", "+=", "-=", "*=", "/="];
    this.string_tokens = ["\"", "'"];
    this.comment_line_tokens = ["//"];
    this.comment_pair_tokens = {
			'/*!': '*/',
			'/**': '*/',
			'/*': '*/',
		};
    this.comment_pair_tokens_sort = ["/*!", "/**", "/*"];
    /*  x */
  }
  newInstance(){
    return new BayrellParserES6();
  }
}
module.exports.BayrellParserES6 = BayrellParserES6;
