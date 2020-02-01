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
Bayrell.Lang.LangBay.ParserBayBase = function(/*__ctx*/)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayBase"))
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
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
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos("qazwsxedcrfvtgbyhnujmikolp", __v1.strtolower(ch)) !== -1;
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
		var __v0 = use("Runtime.rs");
		var __memorize_value = __v0.strpos("0123456789", ch) !== -1;
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
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos("0123456789abcdef", __v1.strtolower(ch)) !== -1;
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
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(s);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			if (!this.isNumber(__v0.charAt(s, i)))
			{
				var __memorize_value = false;
				use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
				return __memorize_value;
			}
		}
		var __memorize_value = true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments, __memorize_value);
		return __memorize_value;
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
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "void")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "bool")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "byte")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "int")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "double")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "float")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "char")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "string")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "list")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "scalar")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "primitive")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "html")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Error")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Object")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "DateTime")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Collection")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Dict")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Vector")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "Map")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rs")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "rtl")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "ArrayInterface")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if name is identifier
	 */
	isIdentifier: function(name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "")
		{
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "@")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		if (this.isNumber(__v0.charAt(name, 0)))
		{
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(name);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.charAt(name, i);
			if (this.isChar(ch) || this.isNumber(ch) || ch == "_")
			{
				continue;
			}
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = true;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns true if reserved words
	 */
	isReserved: function(name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "__async_t")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__async_var")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "__ctx")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		if (__v0.substr(name, 0, 3) == "__v")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isReserved", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns kind of identifier or thrown Error
	 */
	findIdentifier: function(parser, name, caret)
	{
		var kind = "";
		if (parser.vars.has(name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_VARIABLE;
		}
		else if (parser.uses.has(name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_MODULE;
		}
		else if (this.isSystemType(name))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_SYS_TYPE;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_FUNCTION;
		}
		else if (name == "@")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CONTEXT;
		}
		else if (name == "static" || name == "self" || name == "this" || name == "parent")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_CLASSREF;
		}
		else if (parser.find_ident)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
			throw new __v0("Unknown identifier '" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("'"),caret,parser.file_name)
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
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos("qazwsxedcrfvtgbyhnujmikolp0123456789_", __v1.strtolower(ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
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
		var __v0 = use("Runtime.rs");
		if (__v0.ord(ch) <= 32)
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
			return __memorize_value;
		}
		var __memorize_value = false;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Returns next X
	 */
	nextX: function(parser, ch, pos)
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
	nextY: function(parser, ch, pos)
	{
		if (ch == "\n")
		{
			return pos + 1;
		}
		return pos;
	},
	/**
	 * Returns next X
	 */
	next: function(parser, s, x, y, pos)
	{
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(s);
		for (var i = 0;i < sz;i++)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(s, i, 1);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
		}
		return use("Runtime.Collection").create([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(str, skip_comments)
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
	skipChar: function(parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0()
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(content.ref, pos);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(content.ref, pos, 2);
		while ((this.isSkipChar(ch) || this.isCommentOpen(ch2, skip_comments)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(ch2, skip_comments))
			{
				var __v0 = use("Runtime.rs");
				ch2 = __v0.substr(content.ref, pos, 2);
				while (!this.isCommentClose(ch2) && pos < parser.content_sz)
				{
					x = this.nextX(parser, ch, x);
					y = this.nextY(parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					var __v0 = use("Runtime.rs");
					ch2 = __v0.substr(content.ref, pos, 2);
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
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(content.ref, pos);
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(content.ref, pos, 2);
		}
		var __v0 = use("Bayrell.Lang.Caret");
		return new __v0(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 6);
		if (s == "#endif")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 5);
		if (s == "#case")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 4);
		if (s == "@css")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 3);
		if (s == "!==" || s == "===" || s == "#if")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		s = __v0.substr(content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "|>" || s == "->" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0()
		}
		var s = this.readSpecialToken(parser, content, start_pos);
		if (s != "")
		{
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(s);
			for (var i = 0;i < sz;i++)
			{
				var __v0 = use("Runtime.rs");
				var ch = __v0.charAt(s, i);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Bayrell.Lang.Caret");
			return new __v0(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(content.ref, pos);
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
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(content.ref, pos);
			}
		}
		var __v0 = use("Bayrell.Lang.Caret");
		return new __v0(use("Runtime.Dict").create({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read next token
	 */
	readToken: function(parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		try
		{
			caret_start = this.skipChar(parser, parser.content, parser.caret.clone());
			caret_end = this.nextToken(parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				if (caret_start == null)
				{
					caret_start = parser.caret.clone();
				}
				if (caret_end == null)
				{
					caret_end = caret_start;
				}
				eof = true;
			}
			else if (true)
			{
				var e = _ex;
				
				throw e
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Bayrell.Lang.CoreToken");
		var __v1 = use("Runtime.rs");
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),new __v0(use("Runtime.Dict").create({"content":__v1.substr(parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(parser, next_token)
	{
		var token = null;
		/* Read token */
		var res = this.readToken(parser);
		parser = res[0];
		token = res[1];
		if (next_token != token.content)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(next_token,token.caret_start.clone(),parser.file_name)
		}
		return use("Runtime.Collection").create([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(parser, str1)
	{
		var caret = parser.caret.clone();
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(str1);
		var __v0 = use("Runtime.rs");
		var str2 = __v0.substr(parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(str1,caret,parser.file_name)
		}
		var res = this.next(parser, str1, caret.x, caret.y, caret.pos);
		var __v0 = use("Bayrell.Lang.Caret");
		caret = new __v0(use("Runtime.Dict").create({"x":res[0],"y":res[1],"pos":res[2]}));
		parser = parser.copy({ "caret": caret });
		return use("Runtime.Collection").create([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(parser)
	{
		var token = null;
		var start = parser.clone();
		/* Read token */
		var res = this.readToken(parser);
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Number",caret_start,parser.file_name)
		}
		if (!this.isStringOfNumbers(token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Number",caret_start,parser.file_name)
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(parser, arr, flag_include)
	{
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
			for (var i = 0;i < arr.count();i++)
			{
				var item = arr.item(i);
				var __v0 = use("Runtime.rs");
				var sz = __v0.strlen(item);
				var __v0 = use("Runtime.rs");
				var str = __v0.substr(content.ref, pos, sz);
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
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(content.ref, pos);
			x = this.nextX(parser, ch, x);
			y = this.nextY(parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Runtime.rs");
				var __v2 = use("Bayrell.Lang.Caret");
				throw new __v0(__v1.join(",", arr),new __v2(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name)
			}
			arr_pos = search(pos);
		}
		if (arr_pos == -1)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v1 = use("Bayrell.Lang.Caret");
			throw new __v0("End of string",new __v1(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(arr_pos);
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(item);
			for (var i = 0;i < sz;i++)
			{
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(content.ref, pos);
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var __v0 = use("Bayrell.Lang.Caret");
		var caret_end = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":end_pos}));
		var __v0 = use("Runtime.rs");
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),__v0.substr(content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("String",caret_start,parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
					var __v1 = use("Bayrell.Lang.Caret");
					throw new __v0("End of string",new __v1(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name)
				}
				var __v0 = use("Runtime.rs");
				var ch2 = __v0.charAt(content.ref, pos);
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
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Bayrell.Lang.Caret");
				throw new __v0("End of string",new __v1(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name)
			}
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v1 = use("Bayrell.Lang.Caret");
			throw new __v0("End of string",new __v1(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),parser.file_name)
		}
		x = this.nextX(parser, ch, x);
		y = this.nextY(parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var __v0 = use("Bayrell.Lang.Caret");
		var caret_end = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret_end})),new __v0(use("Runtime.Dict").create({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(parser)
	{
		var start = parser.clone();
		var token = null;
		var look = null;
		parser = parser.copy({ "skip_comments": false });
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		parser = parser.copy({ "skip_comments": true });
		if (token.content == "/")
		{
			parser = look.clone();
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var __v0 = use("Runtime.rs");
			var ch = __v0.charAt(content.ref, pos);
			var __v0 = use("Runtime.rs");
			var ch2 = __v0.substr(content.ref, pos, 2);
			while (!this.isCommentClose(ch2) && pos < content_sz)
			{
				x = this.nextX(parser, ch, x);
				y = this.nextY(parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				var __v0 = use("Runtime.rs");
				ch = __v0.charAt(content.ref, pos);
				var __v0 = use("Runtime.rs");
				ch2 = __v0.substr(content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v1 = use("Bayrell.Lang.Caret");
				throw new __v0("End of comment",new __v1(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos})),start.file_name)
			}
			/* Return result */
			var __v0 = use("Runtime.rs");
			var value_str = __v0.substr(content.ref, pos_start + 1, pos_end - pos_start - 1);
			var __v0 = use("Bayrell.Lang.Caret");
			var caret_end = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
			var __v0 = use("Bayrell.Lang.OpCodes.OpComment");
			return use("Runtime.Collection").create([start.copy(use("Runtime.Dict").create({"caret":caret_end})),new __v0(use("Runtime.Dict").create({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return use("Runtime.Collection").create([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser.clone();
		var token = null;
		var look = null;
		var name = "";
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(parser);
		parser = res[0];
		token = res[1];
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Identifier",token.caret_start.clone(),parser.file_name)
		}
		if (!this.isIdentifier(token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Identifier",token.caret_start.clone(),parser.file_name)
		}
		if (this.isReserved(token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Identifier " + use("Runtime.rtl").toString(token.content) + use("Runtime.rtl").toString(" is reserverd"),token.caret_start.clone(),parser.file_name)
		}
		name = token.content;
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(parser, name, token.caret_start.clone());
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"kind":kind,"value":name,"caret_start":token.caret_start.clone(),"caret_end":token.caret_end.clone()}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var __v0 = use("Runtime.Vector");
		var names = new __v0();
		var res = parser.parser_base.constructor.readIdentifier(parser, find_ident);
		parser = res[0];
		ident = res[1];
		var caret_start = ident.caret_start.clone();
		var name = ident.value;
		names.push(name);
		var res = parser.parser_base.constructor.readToken(parser.clone());
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
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpEntityName");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"caret_start":caret_start,"caret_end":parser.caret.clone(),"names":names.toCollection()}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser.clone();
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(parser, find_ident);
		parser = res[0];
		entity_name = res[1];
		var caret_start = entity_name.caret_start.clone();
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			var __v0 = use("Runtime.Vector");
			template = new __v0();
			var res = this.matchToken(parser, "<");
			parser = res[0];
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(parser);
				parser = res[0];
				parser_value = res[1];
				template.push(parser_value);
				var res = this.readToken(parser.clone());
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = this.matchToken(parser, ",");
					parser = res[0];
					var res = this.readToken(parser.clone());
					look = res[0];
					token = res[1];
				}
			}
			var res = this.matchToken(parser, ">");
			parser = res[0];
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"entity_name":entity_name,"template":(template) ? template.toCollection() : null,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(parser)
	{
		var start = parser.clone();
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var values = new __v0();
		var res = this.matchToken(parser, "[");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		while (!token.eof && token.content != "]")
		{
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			parser_value = res[1];
			values.push(parser_value);
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone();
				var res = this.readToken(parser.clone());
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(parser, "]");
		parser = res[0];
		token = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpCollection");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"values":values.toCollection(),"caret_start":caret_start,"caret_end":token.caret_end.clone()}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Map");
		var values = new __v0();
		var res = this.matchToken(parser, "{");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = this.readToken(parser.clone());
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
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			if (token.content == ",")
			{
				parser = look.clone();
				var res = this.readToken(parser.clone());
				look = res[0];
				token = res[1];
			}
		}
		var res = this.matchToken(parser, "}");
		parser = res[0];
		token = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpDict");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"values":values.toDict(),"caret_start":caret_start,"caret_end":token.caret_end.clone()}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var look = null;
		var token = null;
		var start = parser.clone();
		var flag_negative = false;
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Identifier",token.caret_start.clone(),look.file_name)
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
			var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
			return use("Runtime.Collection").create([look,new __v0(use("Runtime.Dict").create({"value":token.content,"caret_start":token.caret_start.clone(),"caret_end":look.caret.clone(),"negative":flag_negative}))]);
		}
		/* Read Identifier */
		if (!this.isIdentifier(token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("Identifier",token.caret_start.clone(),look.file_name)
		}
		var kind = "";
		if (find_ident)
		{
			kind = this.findIdentifier(parser, token.content, token.caret_start.clone());
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		return use("Runtime.Collection").create([look,new __v0(use("Runtime.Dict").create({"kind":kind,"value":token.content,"caret_start":token.caret_start.clone(),"caret_end":look.caret.clone()}))]);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0();
		var res = this.readToken(parser.clone());
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
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(parser);
				parser = res[0];
				parser_value = res[1].clone();
				items.push(parser_value);
				var res = this.readToken(parser.clone());
				look = res[0];
				token = res[1];
				if (token.content == ",")
				{
					parser = look.clone();
					var res = this.readToken(parser.clone());
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
		var look = null;
		var token = null;
		var op_code = null;
		var args = use("Runtime.Collection").create([]);
		var res = this.matchToken(parser, "new");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = this.readTypeIdentifier(parser);
		parser = res[0];
		op_code = res[1];
		var res = this.readToken(parser.clone());
		token = res[1];
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(parser);
			parser = res[0];
			args = res[1];
		}
		else
		{
			this.matchToken(parser.clone(), "(");
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNew");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(parser)
	{
		var look = null;
		var token = null;
		var parser_value = null;
		var value1 = null;
		var value2 = null;
		var res = this.matchToken(parser, "method");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = this.readTypeIdentifier(parser);
		parser = res[0];
		value2 = res[1];
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var look_token = token.content;
		if (look_token != "." && look_token != "::")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0("'.' or '::'",token.caret_start.clone(),look.file_name)
		}
		var res = this.readIdentifier(look.clone());
		parser = res[0];
		value2 = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpMethod");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"value1":value1,"value2":value2,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(parser, op_code)
	{
		if (op_code == undefined) op_code = null;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code_first = null;
		var is_await = false;
		var caret_start = null;
		var f_next = (s) => 
		{
			return s == "." || s == "::" || s == "->" || s == "|>" || s == "{" || s == "[" || s == "(" || s == "@";
		};
		if (op_code == null)
		{
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			if (token.content == "await")
			{
				caret_start = token.caret_start.clone();
				is_await = true;
				parser = look.clone();
			}
			var res = this.readFixed(parser, true);
			parser = res[0];
			op_code = res[1];
		}
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start.clone();
		}
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (f_next(token.content))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var __v1 = use("Bayrell.Lang.OpCodes.OpNew");
			if (op_code instanceof __v0)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v3 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (op_code.kind != __v1.KIND_SYS_TYPE && op_code.kind != __v2.KIND_VARIABLE && op_code.kind != __v3.KIND_MODULE && op_code.kind != __v4.KIND_CLASSREF)
				{
					var __v5 = use("Bayrell.Lang.Exceptions.ParserExpected");
					throw new __v5("Module or variable '" + use("Runtime.rtl").toString(op_code.value) + use("Runtime.rtl").toString("'"),op_code.caret_start.clone(),parser.file_name)
				}
			}
			else if (op_code instanceof __v1)
			{
			}
			else
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2("Module or variable",op_code.caret_start.clone(),parser.file_name)
			}
		}
		var is_context_call = true;
		while (!token.eof && f_next(token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if (token_content == "@")
				{
					parser = look.clone();
					is_context_call = false;
				}
				var res = this.readCallArgs(parser);
				parser = res[0];
				parser_items = res[1];
				var __v0 = use("Bayrell.Lang.OpCodes.OpCall");
				op_code = new __v0(use("Runtime.Dict").create({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret.clone(),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "->" || token_content == "|>")
			{
				var kind = "";
				var class_name = null;
				var method_name = null;
				parser = look.clone();
				if (token_content == "->")
				{
					var res = this.readToken(parser.clone());
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone();
						is_context_call = false;
					}
					var res = this.readIdentifier(parser);
					parser = res[0];
					method_name = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v0.KIND_METHOD;
				}
				else if (token_content == "|>")
				{
					var res = this.readTypeIdentifier(parser);
					parser = res[0];
					class_name = res[1];
					var res = this.matchToken(parser, "::");
					parser = res[0];
					var res = this.readToken(parser.clone());
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone();
						is_context_call = false;
					}
					var res = this.readIdentifier(parser);
					parser = res[0];
					method_name = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
					kind = __v0.KIND_LAMBDA;
				}
				var res = this.readCallArgs(parser);
				parser = res[0];
				var args = res[1];
				var __v0 = use("Bayrell.Lang.OpCodes.OpPipe");
				op_code = new __v0(use("Runtime.Dict").create({"kind":kind,"obj":op_code,"args":args,"class_name":class_name,"method_name":method_name,"caret_start":caret_start,"caret_end":parser.caret.clone(),"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_value = null;
				parser = look.clone();
				if (token_content == ".")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_ATTR;
				}
				else if (token_content == "::")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_STATIC;
				}
				else if (token_content == "[")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v0.KIND_DYNAMIC;
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(parser);
					parser = res[0];
					look_value = res[1];
					var res = this.matchToken(parser, "]");
					parser = res[0];
				}
				else
				{
					var res = this.readToken(parser.clone());
					look = res[0];
					token = res[1];
					if (token.content == "@")
					{
						parser = look.clone();
						is_context_call = false;
					}
					var res = this.readIdentifier(parser);
					parser = res[0];
					look_value = res[1];
				}
				var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
				op_code = new __v0(use("Runtime.Dict").create({"kind":kind,"obj":op_code,"value":look_value,"caret_start":caret_start,"caret_end":parser.caret.clone()}));
			}
			else
			{
				var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v0("Next attr",token.caret_start.clone(),parser.file_name)
			}
			var res = this.readToken(parser.clone());
			look = res[0];
			token = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
			var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
			if (op_code instanceof __v0 && op_code.kind == __v1.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2("Call",token.caret_start.clone(),parser.file_name)
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
		var res = this.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var caret_start = look.caret.clone();
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
			var save_parser = look.clone();
			parser = look.clone();
			/* Try to read OpTypeConvert */
			var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
			try
			{
				var res = this.readTypeIdentifier(parser);
				parser = res[0];
				var op_type = res[1];
				var res = this.readToken(parser);
				parser = res[0];
				token = res[1];
				if (token.content == ")")
				{
					var res = this.readBaseItem(parser);
					parser = res[0];
					op_code = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpTypeConvert");
					return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
				}
			}
			catch (_ex)
			{
				if (_ex instanceof __v0)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
			/* Read Expression */
			parser = save_parser.clone();
			var res = parser.parser_expression.constructor.readExpression(parser);
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
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classof");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = this.readEntityName(parser);
		parser = res[0];
		op_code = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassOf");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(parser, "classref");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start.clone();
		var res = parser.parser_expression.constructor.readExpression(parser);
		parser = res[0];
		op_code = res[1];
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassRef");
		return use("Runtime.Collection").create([parser,new __v0(use("Runtime.Dict").create({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret.clone()}))]);
	},
	/* ======================= Class Init Functions ======================= */
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
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": "Bayrell.Lang.LangBay.ParserBayBase",
			"annotations": Collection.create([
			]),
		});
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
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayBase);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayBase = Bayrell.Lang.LangBay.ParserBayBase;