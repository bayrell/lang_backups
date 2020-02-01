"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangBay == 'undefined') Bayrell.Lang.LangBay = {};
Bayrell.Lang.LangBay.ParserBayBase = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayBase,
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	isChar: function(ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		var __memorize_value = _v0.strpos("qazwsxedcrfvtgbyhnujmikolp", _v0.strtolower(ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		var __memorize_value = _v0.strpos("0123456789", ch) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		var __memorize_value = _v0.strpos("0123456789abcdef", _v0.strtolower(ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		var sz = _v0.strlen(s);
		for (var i = 0;i < sz;i++)
		{
			if (!this.isNumber(_v0.charAt(s, i)))
			{
				var __memorize_value =  false;
				use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;;
			}
		}
		var __memorize_value =  true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Is system type
	 */
	isSystemType: function(name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "void")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "bool")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "byte")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "int")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "double")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "float")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "char")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "string")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "list")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "scalar")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "primitive")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "html")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Error")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Object")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "DateTime")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Collection")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Dict")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Vector")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "Map")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "rs")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "rtl")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;;
		}
		var __memorize_value =  false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		if (name == "")
		{
			var __memorize_value =  false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (name == "@")
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;;
		}
		if (this.isNumber(_v0.charAt(name, 0)))
		{
			var __memorize_value =  false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;;
		}
		var sz = _v0.strlen(name);
		for (var i = 0;i < sz;i++)
		{
			var ch = _v0.charAt(name, i);
			if (this.isChar(ch) || this.isNumber(ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value =  false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;;
		}
		var __memorize_value =  true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(parser,name,caret)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserError");
		var kind = "";
		if (parser.vars.has(name))
		{
			kind = _v0.KIND_VARIABLE;
		}
		else if (parser.uses.has(name))
		{
			kind = _v0.KIND_MODULE;
		}
		else if (this.isSystemType(name))
		{
			kind = _v0.KIND_SYS_TYPE;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			kind = _v0.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			kind = _v0.KIND_FUNCTION;
		}
		else if (name == "@")
		{
			kind = _v0.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			kind = _v0.KIND_CLASSREF;
		}
		else if (parser.find_ident)
		{
			throw new _v1("Unknown identifier '" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("'"),caret,parser.file_name);
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		var __memorize_value =  _v0.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", _v0.strtolower(ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var _v0 = use("Runtime.rs");
		if (_v0.ord(ch) <= 32)
		{
			var __memorize_value =  true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;;
		}
		var __memorize_value =  false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;;
	},
	/**
	 * Returns next X
	 */
	nextX: function(parser,ch,pos)
	{
		if (ch == "\t")
		{
			return pos + parser.tab_size;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return pos + 1;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(parser,ch,pos)
	{
		if (ch == "\n")
		{
			return pos + 1;
		}
		return pos;
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(str,skip_comments)
	{
		return skip_comments && str == "/*";
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(str)
	{
		return str == "*/";
	},
	/**
	 * Skip char
	 */
	skipChar: function(parser,content,start_pos)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		var _v1 = use("Runtime.rs");
		var _v2 = use("Bayrell.Lang.Caret");
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new _v0();
		}
		var ch = _v1.charAt(content, pos);
		var ch2 = _v1.substr(content, pos, 2);
		while ((this.isSkipChar(ch) || this.isCommentOpen(ch2, skip_comments)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(ch2, skip_comments))
			{
				ch2 = _v1.substr(content, pos, 2);
				while (!this.isCommentClose(ch2) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					ch2 = _v1.substr(content, pos, 2);
				}
				if (this.isCommentClose(ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			ch = _v1.charAt(content, pos);
			ch2 = _v1.substr(content, pos, 2);
		}
		return new _v2(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(parser,content,start_pos)
	{
		var _v0 = use("Runtime.rs");
		var pos = start_pos.pos;
		var s = "";
		s = _v0.substr(content, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		s = _v0.substr(content, pos, 7);
		if (s == "#ifcode" || s == "#switch")
		{
			return s;
		}
		s = _v0.substr(content, pos, 6);
		if (s == "#endif")
		{
			return s;
		}
		s = _v0.substr(content, pos, 5);
		if (s == "#case")
		{
			return s;
		}
		s = _v0.substr(content, pos, 3);
		if (s == "!==" || s == "===" || s == "#if")
		{
			return s;
		}
		s = _v0.substr(content, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "->" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(parser,content,start_pos)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		var _v1 = use("Runtime.rs");
		var _v2 = use("Bayrell.Lang.Caret");
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			throw new _v0();
		}
		var s = this.readSpecialToken(parser, content, start_pos);
		if (s != "")
		{
			var sz = _v1.strlen(s);
			for (var i = 0;i < sz;i++)
			{
				var ch = _v1.charAt(s, i);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			return new _v2(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
		}
		var ch = _v1.charAt(content, pos);
		if (!this.isTokenChar(ch))
		{
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ch))
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = _v1.charAt(content, pos);
			}
		}
		return new _v2(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read next token
	 */
	readToken: function(parser)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		var _v1 = use("Bayrell.Lang.CoreToken");
		var _v2 = use("Runtime.rs");
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		try
		{
			caret_start = this.skipChar(parser, parser.content, parser.caret);
			caret_end = this.nextToken(parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof _v0)
			{
				var e = _ex;
				if (caret_start == null)
				{
					caret_start = parser.caret;
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else 
			{
				var e = _ex;
				throw e;
			}
		}
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),new _v1(use("Runtime.Dict").create({"content":_v2.substr(parser.content, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Returns next token
	 */
	matchToken: function(parser,next_token)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var token = null;
		/* Read token */
		var res = this.readToken(parser);
		parser = res[0];
		token = res[1];
		if (next_token != token.content)
		{
			throw new _v0(next_token,token.caret_start,parser.file_name);
		}
		return use("Runtime.Collection").create([parser,token]);
	},
	/**
	 * Read number
	 */
	readNumber: function(parser)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v1 = use("Bayrell.Lang.OpCodes.OpNumber");
		var token = null;
		var start = parser;
		/* Read token */
		var res = this.readToken(parser);
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		if (token.content == "")
		{
			throw new _v0("Number",caret_start,parser.file_name);
		}
		if (!this.isStringOfNumbers(token.content))
		{
			throw new _v0("Number",caret_start,parser.file_name);
		}
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(parser,arr,flag_include)
	{
		var _v0 = use("Runtime.rs");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v2 = use("Bayrell.Lang.Caret");
		if (flag_include == undefined) flag_include = true;
		var token = null;
		var look = null;
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		/* Search next string in arr */
		var search = (pos) => 
		{
			var _v0 = use("Runtime.rs");
			for (var i = 0;i < arr.count();i++)
			{
				var item = arr.item(i);
				var sz = _v0.strlen(item);
				var str = _v0.substr(content, pos, sz);
				if (str == item)
				{
					return i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		var start_pos = pos;
		var end_pos = pos;
		/* Read string value */
		var ch = "";
		var arr_pos = search(pos);
		while (pos < content_sz && arr_pos == -1)
		{
			ch = _v0.charAt(content, pos);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				throw new _v1(_v0.join(",", arr),new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name);
			}
			arr_pos = search(pos);
		}
		if (arr_pos == -1)
		{
			throw new _v1("End of string",new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name);
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(arr_pos);
			var sz = _v0.strlen(item);
			for (var i = 0;i < sz;i++)
			{
				ch = _v0.charAt(content, pos);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var caret_end = new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":end_pos}));
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),_v0.substr(content, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(parser)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v1 = use("Runtime.rs");
		var _v2 = use("Bayrell.Lang.Caret");
		var _v3 = use("Bayrell.Lang.OpCodes.OpString");
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			throw new _v0("String",caret_start,parser.file_name);
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var ch = _v1.charAt(content, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					throw new _v0("End of string",new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name);
				}
				var ch2 = _v1.charAt(content, pos);
				if (ch2 == "n")
				{
					value_str += use("Runtime.rtl").toString("\n");
				}
				else if (ch2 == "r")
				{
					value_str += use("Runtime.rtl").toString("\r");
				}
				else if (ch2 == "t")
				{
					value_str += use("Runtime.rtl").toString("\t");
				}
				else if (ch2 == "\\")
				{
					value_str += use("Runtime.rtl").toString("\\");
				}
				else if (ch2 == "'")
				{
					value_str += use("Runtime.rtl").toString("'");
				}
				else if (ch2 == "\"")
				{
					value_str += use("Runtime.rtl").toString("\"");
				}
				x = this.nextX(parser, ch2, x);
				y = this.nextY(parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += use("Runtime.rtl").toString(ch);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				throw new _v0("End of string",new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name);
			}
			ch = _v1.charAt(content, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			throw new _v0("End of string",new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name);
		}
		x = this.nextX(parser, ch, x);
		y = this.nextY(parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var caret_end = new _v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),new _v3(use("Runtime.Dict").create({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(parser)
	{
		var _v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var _v1 = use("Runtime.rs");
		var _v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v3 = use("Bayrell.Lang.Caret");
		var _v4 = use("Bayrell.Lang.OpCodes.OpComment");
		var start = parser;
		var token = null;
		var look = null;
		parser = parser.copy({ "skip_comments": false });
		var res = _v0.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		parser = parser.copy({ "skip_comments": true });
		if (token.content == "/")
		{
			parser = look;
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var ch = _v1.charAt(content, pos);
			var ch2 = _v1.substr(content, pos, 2);
			while (!this.isCommentClose(ch2) && pos < content_sz)
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				ch = _v1.charAt(content, pos);
				ch2 = _v1.substr(content, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				throw new _v2("End of comment",new _v3(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),start.file_name);
			}
			/* Return result */
			var value_str = _v1.substr(content, pos_start + 1, pos_end - pos_start - 1);
			var caret_end = new _v3(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
			return use("Runtime.Collection").create([start.copy(use("Runtime.Dict").create({"caret":caret_end})),new _v4(use("Runtime.Dict").create({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return use("Runtime.Collection").create([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(parser,find_ident)
	{
		var _v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (find_ident == undefined) find_ident = false;
		var start = parser;
		var token = null;
		var look = null;
		var name = "";
		var res = _v0.readToken(parser);
		parser = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new _v1("Identifier",token.caret_start,parser.file_name);
		}
		if (!this.isIdentifier(token.content))
		{
			throw new _v1("Identifier",token.caret_start,parser.file_name);
		}
		name = token.content;
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(parser, name, token.caret_start);
		}
		return use("Runtime.Collection").create([parser,new _v2(use("Runtime.Dict").create({"kind":kind,"value":name,"caret_start":token.caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(parser,find_ident)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpEntityName");
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var names = new _v0();
		var res = parser.parser_base.constructor.readIdentifier(parser, find_ident);
		parser = res[0];
		ident = res[1];
		var caret_start = ident.caret_start;
		var name = ident.value;
		names.push(name);
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(parser, ".");
			parser = res[0];
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			ident = res[1];
			name = ident.value;
			names.push(name);
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
		}
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"caret_start":caret_start,"caret_end":parser.caret,"names":names.toCollection()}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(parser,find_ident)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		if (find_ident == undefined) find_ident = true;
		var start = parser;
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(parser, find_ident);
		parser = res[0];
		entity_name = res[1];
		var caret_start = entity_name.caret_start;
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			template = new _v0();
			var res = this.matchToken(parser, "<");
			parser = res[0];
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(parser);
				parser = res[0];
				parser_value = res[1];
				template.push(parser_value);
				var res = this.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = this.matchToken(parser, ",");
					parser = res[0];
					var res = this.readToken(parser);
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(parser, ">");
			parser = res[0];
		}
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"entity_name":entity_name,"template":(template) ? template.toCollection() : null,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(parser)
	{
		var _v0 = use("Runtime.Vector");
		var _v1 = use("Bayrell.Lang.OpCodes.OpCollection");
		var start = parser;
		var look = null;
		var token = null;
		var values = new _v0();
		var res = this.matchToken(parser, "[");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "]")
		{
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			parser_value = res[1];
			values.push(parser_value);
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(parser, "]");
		parser = res[0];
		token = res[1];
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"values":values.toCollection(),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(parser)
	{
		var _v0 = use("Runtime.Dict");
		var _v1 = use("Bayrell.Lang.OpCodes.OpDict");
		var look = null;
		var token = null;
		var values = new _v0();
		var res = this.matchToken(parser, "{");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "}")
		{
			var parser_value = null;
			var res = this.readString(parser);
			parser = res[0];
			parser_value = res[1];
			var key = parser_value.value;
			var res = this.matchToken(parser, ":");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			parser_value = res[1];
			values.set(key, parser_value);
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(parser);
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(parser, "}");
		parser = res[0];
		token = res[1];
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"values":values.toDict(),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(parser,find_ident)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v1 = use("Bayrell.Lang.OpCodes.OpNumber");
		var _v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (find_ident == undefined) find_ident = false;
		var look = null;
		var token = null;
		var start = parser;
		var flag_negative = false;
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "")
		{
			throw new _v0("Identifier",token.caret_start,look.file_name);
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(look);
			look = res[0];
			token = res[1];
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(token.content))
		{
			return use("Runtime.Collection").create([look,new _v1(use("Runtime.Dict").create({"value":token.content,"caret_start":token.caret_start,"caret_end":look.caret,"negative":flag_negative}))]);
		}
		/* Read Identifier */
		if (!this.isIdentifier(token.content))
		{
			throw new _v0("Identifier",token.caret_start,look.file_name);
		}
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(parser, token.content, token.caret_start);
		}
		return use("Runtime.Collection").create([look,new _v2(use("Runtime.Dict").create({"kind":kind,"value":token.content,"caret_start":token.caret_start,"caret_end":look.caret}))]);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(parser)
	{
		var _v0 = use("Runtime.Vector");
		var look = null;
		var token = null;
		var items = new _v0();
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = this.readDict(parser);
			parser = res[0];
			var d = res[1];
			items = use("Runtime.Collection").create([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(parser, "(");
			parser = res[0];
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = res[0];
				parser_value = res[1];
				items.push(parser_value);
				var res = this.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look;
					var res = this.readToken(parser);
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(parser, ")");
			parser = res[0];
		}
		return use("Runtime.Collection").create([parser,items.toCollection()]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpNew");
		var look = null;
		var token = null;
		var op_code = null;
		var args = use("Runtime.Collection").create([]);
		var res = this.matchToken(parser, "new");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = this.readTypeIdentifier(parser);
		parser = res[0];
		op_code = res[1];
		var res = this.readToken(parser);
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(parser);
			parser = res[0];
			args = res[1];
		}
		else
		{
			this.matchToken(parser, "(");
		}
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(parser)
	{
		var _v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v1 = use("Bayrell.Lang.OpCodes.OpMethod");
		var look = null;
		var token = null;
		var parser_value = null;
		var value1 = null;
		var value2 = null;
		var res = this.matchToken(parser, "method");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = this.readTypeIdentifier(parser);
		parser = res[0];
		value2 = res[1];
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		var look_token = token.content;
		if (look_token != "." && look_token != "::")
		{
			throw new _v0("'.' or '::'",token.caret_start,look.file_name);
		}
		var res = this.readIdentifier(look);
		parser = res[0];
		value2 = res[1];
		return use("Runtime.Collection").create([parser,new _v1(use("Runtime.Dict").create({"value1":value1,"value2":value2,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(parser,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var _v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
		var _v2 = use("Bayrell.Lang.OpCodes.OpNew");
		var _v3 = use("Bayrell.Lang.OpCodes.OpCall");
		var _v4 = use("Bayrell.Lang.OpCodes.OpAttr");
		if (op_code == undefined) op_code = null;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code_first = null;
		var is_await = false;
		var caret_start = null;
		var f_next = (s) => 
		{
			return s == "." || s == "::" || s == "->" || s == "{" || s == "[" || s == "(";
		};
		if (op_code == null)
		{
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			if (token.content == "await")
			{
				caret_start = token.caret_start;
				is_await = true;
				parser = look;
			}
			var res = this.readFixed(parser, true);
			parser = res[0];
			op_code = res[1];
		}
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start;
		}
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		if (f_next(token.content))
		{
			if (op_code instanceof _v0)
			{
				if (op_code.kind != _v0.KIND_SYS_TYPE && op_code.kind != _v0.KIND_VARIABLE && op_code.kind != _v0.KIND_MODULE && op_code.kind != _v0.KIND_CLASSREF)
				{
					throw new _v1("Module or variable '" + use("Runtime.rtl").toString(op_code.value) + use("Runtime.rtl").toString("'"),op_code.caret_start,parser.file_name);
				}
			}
			else if (op_code instanceof _v2)
			{
			}
			else
			{
				throw new _v1("Module or variable",op_code.caret_start,parser.file_name);
			}
		}
		while (!token.eof && f_next(token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{")
			{
				var res = this.readCallArgs(parser);
				parser = res[0];
				parser_items = res[1];
				op_code = new _v3(use("Runtime.Dict").create({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret,"is_await":is_await}));
			}
			else
			{
				var kind = "";
				var look_value = null;
				if (token_content == ".")
				{
					kind = _v4.KIND_ATTR;
				}
				else if (token_content == "::")
				{
					kind = _v4.KIND_STATIC;
				}
				else if (token_content == "->")
				{
					kind = _v4.KIND_PIPE;
				}
				else if (token_content == "[")
				{
					kind = _v4.KIND_DYNAMIC;
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(look);
					look = res[0];
					look_value = res[1];
					var res = this.matchToken(look, "]");
					look = res[0];
				}
				else
				{
					var res = this.readIdentifier(look);
					look = res[0];
					look_value = res[1];
				}
				op_code = new _v4(use("Runtime.Dict").create({"kind":kind,"obj":op_code,"value":look_value,"caret_start":caret_start,"caret_end":look.caret}));
				parser = look;
			}
			var res = this.readToken(parser);
			look = res[0];
			token = res[1];
			if (op_code instanceof _v4 && op_code.kind == _v4.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				throw new _v1("Call",token.caret_start,parser.file_name);
			}
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var flag_dynamic = false;
		var res = this.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "new")
		{
			var res = this.readNew(parser);
			parser = res[0];
			op_code = res[1];
			flag_dynamic = true;
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(parser);
			parser = res[0];
			op_code = res[1];
		}
		else if (token.content == "(")
		{
			var res = parser.parser_expression.constructor.readExpression(look);
			parser = res[0];
			op_code = res[1];
			var res = this.matchToken(parser, ")");
			parser = res[0];
			flag_dynamic = true;
		}
		else
		{
			flag_dynamic = true;
		}
		if (flag_dynamic)
		{
			var res = this.readDynamic(parser, op_code);
			parser = res[0];
			op_code = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpClassOf");
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classof");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		op_code = res[1];
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(parser)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpClassRef");
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classref");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		op_code = res[1];
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayBase";
	},
	getParentClassName: function()
	{
		return "";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Bayrell.Lang.LangBay.ParserBayBase);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayBase = Bayrell.Lang.LangBay.ParserBayBase;