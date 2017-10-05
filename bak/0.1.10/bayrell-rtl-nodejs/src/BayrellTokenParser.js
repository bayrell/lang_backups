"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellCommonParser = require('./BayrellCommonParser.js');
var BayrellCommonParser = m__BayrellCommonParser.BayrellCommonParser;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellTokenParser extends BayrellCommonParser {
	constructor(){
		super();
		this._pair_tokens = [];
		this._string_tokens = ["\"", "'"];
		this._comment_line_tokens = [];
		this._comment_pair_tokens = {};
		this._comment_pair_tokens_sort = [];
		this._all_tokens = [];
	}
	initParser(){
		this._all_tokens = [];
		this._all_tokens = rtl.array_merge(this._all_tokens, this._string_tokens);
		this._all_tokens = rtl.array_merge(this._all_tokens, this._comment_pair_tokens_sort);
		this._all_tokens = rtl.array_merge(this._all_tokens, this._pair_tokens);
		return super.initParser();
	}
	_readSpecialToken(look){
		var len = rtl.strlen(look);
		if (rtl.in_array(look, this._pair_tokens)) {
			this._readString(len);
			return {
				"type":BayrellCommonParser.TOKEN_BASE,
				"value":look,
				"pos":this._getCursorPos(),
			};
		}
		if (rtl.in_array(look, this._string_tokens)) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readTokenString(look);
			/* value = preg_replace('"', "\\\"", value) */
			return {
				"type":BayrellCommonParser.TOKEN_STRING,
				"value":value,
				"pos":pos,
			};
		}
		if (rtl.in_array(look, this._comment_pair_tokens_sort)) {
			var pos = this._getCursorPos();
			this._readString(len);
			var value = this._readUntilString(this._comment_pair_tokens[look]);
			return {
				"type":BayrellCommonParser.TOKEN_COMMENT,
				"value":value,
				"pos":pos,
			};
		}
		return null;
	}
	getToken(){
		this._old_token = rtl.clone(this._current_token);
		this._skipSystemChar();
		/*  Чтение парных токенов */
		var flag = false;
		var cache = {};
		var i = 0;
		var sz = rtl.count(this._all_tokens);
		while (i < sz) {
			var look_str;
			var len = rtl.strlen(this._all_tokens[i]);
			if (rtl.key_exists(cache, len)) {
				look_str = cache[len];
			}
			else {
				cache[len] = this._lookString(len);
				look_str = cache[len];
			}
			if (look_str == this._all_tokens[i]) {
				flag = true;
				this._current_token = this._readSpecialToken(look_str);
				break;
			}
			i = i + 1;
		}
		if (!flag) {
			this._current_token = this._readToken();
		}
		this._look_token = this._current_token["value"];
		this._look_token_type = this._current_token["type"];
		if (this._old_token == null) {
			return null;
		}
		return this._old_token["value"];
	}
}
module.exports.BayrellTokenParser = BayrellTokenParser;
