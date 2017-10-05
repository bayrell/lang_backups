/* 
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html) */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellCommonParser = require('./BayrellCommonParser.js');
var BayrellCommonParser = m__BayrellCommonParser.BayrellCommonParser;
var m__rtl = require('./rtl.js');
var isset = m__rtl.isset;
var file_get_contents = m__rtl.file_get_contents;
var strlen = m__rtl.strlen;
var clone = m__rtl.clone;
var ord = m__rtl.ord;
var strpos = m__rtl.strpos;
var strtolower = m__rtl.strtolower;
var array_merge = m__rtl.array_merge;
var count = m__rtl.count;
var in_array = m__rtl.in_array;
var trim = m__rtl.trim;
var json_decode_ex = m__rtl.json_decode_ex;
class BayrellTokenParser extends BayrellCommonParser {
  constructor(){
    super();
    this.pair_tokens = [];
    this.string_tokens = ["\"", "'"];
    this.comment_line_tokens = [];
    this.comment_pair_tokens = {};
    this.comment_pair_tokens_sort = [];
    this.all_tokens = [];
  }
  initParser(){
    this.all_tokens = [];
    this.all_tokens = array_merge(this.all_tokens, this.string_tokens);
    this.all_tokens = array_merge(this.all_tokens, this.comment_pair_tokens_sort);
    this.all_tokens = array_merge(this.all_tokens, this.pair_tokens);
    return super.initParser();
  }
  _readSpecialToken(look){
    var len = strlen(look);
    if (in_array(look, this.pair_tokens)) {
      this._readString(len);
      return {
				'type' : BayrellCommonParser.TOKEN_BASE,
				'value' : look,
				'pos' : this._getCursorPos(),
			};
    }
    if (in_array(look, this.string_tokens)) {
      var pos = this._getCursorPos();
      this._readString(len);
      var value = this._readTokenString(look);
      /* value = preg_replace('"', "\\\"", value) */
      return {
				'type' : BayrellCommonParser.TOKEN_STRING,
				/*'value' : json_decode_ex('"'+value+'"'),*/
				'value' : value,
				'pos' : pos,
			};
    }
    if (in_array(look, this.comment_pair_tokens_sort)) {
      var pos = this._getCursorPos();
      this._readString(len);
      var value = this._readUntilString(this.comment_pair_tokens[look]);
      return {
				'type' : BayrellCommonParser.TOKEN_COMMENT,
				'value' : value,
				'pos' : pos,
			};
    }
    return null;
  }
  getToken(){
    this.old_token = clone(this.current_token);
    this._skipSystemChar();
    /*  Чтение парных токенов */
    var flag = false;
    var cache = {};
    var i = 0;
    var sz = count(this.all_tokens);
    while (i < sz) {
      var look_str;
      var len = strlen(this.all_tokens[i]);
      if (isset(cache[len])) {
        look_str = cache[len];
      }
      else {
        cache[len] = this._lookString(len);
        look_str = cache[len];
      }
      if (look_str == this.all_tokens[i]) {
        flag = true;
        this.current_token = this._readSpecialToken(look_str);
        break;
      }
      i = i + 1;
    }
    if (!flag) {
      this.current_token = this._readToken();
    }
    this.look_token = this.current_token["value"];
    this.look_token_type = this.current_token["type"];
    if (this.old_token == null) {
      return null;
    }
    return this.old_token["value"];
  }
}
module.exports.BayrellTokenParser = BayrellTokenParser;
