"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
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
Bayrell.Lang.LangBay.ParserBayBase = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayBase.prototype,
{
	getClassName: function(ctx)
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
	isChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	isNumber: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "0123456789", ch) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isNumber", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "0123456789abcdef", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isHexChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	isStringOfNumbers: function(ctx, s)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isStringOfNumbers", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var __v1 = use("Runtime.rs");
			if (!this.isNumber(ctx, __v1.charAt(ctx, s, i)))
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
	isSystemType: function(ctx, name)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		if (name == "var")
		{
			var __memorize_value = true;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isSystemType", arguments, __memorize_value);
			return __memorize_value;
		}
		if (name == "fn")
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
	isIdentifier: function(ctx, name)
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
		if (this.isNumber(ctx, __v0.charAt(ctx, name, 0)))
		{
			var __memorize_value = false;
			use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isIdentifier", arguments, __memorize_value);
			return __memorize_value;
		}
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, name);
		for (var i = 0;i < sz;i++)
		{
			var __v1 = use("Runtime.rs");
			var ch = __v1.charAt(ctx, name, i);
			if (this.isChar(ctx, ch) || this.isNumber(ctx, ch) || ch == "_")
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
	isReserved: function(ctx, name)
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
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		var __v0 = use("Runtime.rs");
		if (__v0.substr(ctx, name, 0, 3) == "__v")
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
	findIdentifier: function(ctx, parser, name, caret)
	{
		var kind = "";
		if (name == "this")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v0.KIND_THIS;
		}
		else if (name == "static" || name == "parent")
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v1.KIND_CLASSREF;
		}
		else if (name == "null" || name == "true" || name == "false")
		{
			var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v2.KIND_CONSTANT;
		}
		else if (name == "fn")
		{
			var __v3 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v3.KIND_FUNCTION;
		}
		else if (name == "@" || name == "_")
		{
			var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v4.KIND_CONTEXT;
		}
		else if (parser.vars.has(ctx, name))
		{
			var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v5.KIND_VARIABLE;
		}
		else if (parser.uses.has(ctx, name))
		{
			var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v6.KIND_CLASS;
		}
		else if (this.isSystemType(ctx, name))
		{
			var __v7 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v7.KIND_SYS_TYPE;
		}
		else if (name == "log")
		{
			var __v8 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v8.KIND_SYS_FUNCTION;
		}
		else if (name == "window" || name == "document")
		{
			var __v9 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			kind = __v9.KIND_VARIABLE;
		}
		return kind;
	},
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	isTokenChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		var __v1 = use("Runtime.rs");
		var __memorize_value = __v0.strpos(ctx, "qazwsxedcrfvtgbyhnujmikolp0123456789_", __v1.strtolower(ctx, ch)) !== -1;
		use("Runtime.rtl")._memorizeSave("Bayrell.Lang.LangBay.ParserBayBase.isTokenChar", arguments, __memorize_value);
		return __memorize_value;
	},
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	isSkipChar: function(ctx, ch)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Bayrell.Lang.LangBay.ParserBayBase.isSkipChar", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var __v0 = use("Runtime.rs");
		if (__v0.ord(ctx, ch) <= 32)
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
	nextX: function(ctx, parser, ch, x, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\t")
		{
			return x + parser.tab_size * direction;
		}
		if (ch == "\n")
		{
			return 0;
		}
		return x + direction;
	},
	/**
	 * Returns next Y
	 */
	nextY: function(ctx, parser, ch, y, direction)
	{
		if (direction == undefined) direction = 1;
		if (ch == "\n")
		{
			return y + direction;
		}
		return y;
	},
	/**
	 * Returns next
	 */
	next: function(ctx, parser, s, x, y, pos)
	{
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, s);
		for (var i = 0;i < sz;i++)
		{
			var __v1 = use("Runtime.rs");
			var ch = __v1.substr(ctx, s, i, 1);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		return use("Runtime.Collection").from([x,y,pos]);
	},
	/**
	 * Open comment
	 */
	isCommentOpen: function(ctx, parser, str)
	{
		return parser.skip_comments && ((parser.is_html) ? (str == "<!--") : (str == "/*"));
	},
	/**
	 * Close comment
	 */
	isCommentClose: function(ctx, parser, str)
	{
		return (parser.is_html) ? (str == "-->") : (str == "*/");
	},
	/**
	 * Skip char
	 */
	skipChar: function(ctx, parser, content, start_pos)
	{
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		var skip_comments = parser.skip_comments;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0(ctx)
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		var __v1 = use("Runtime.rs");
		var ch2 = __v1.substr(ctx, content.ref, pos, 2);
		var __v2 = use("Runtime.rs");
		var ch4 = __v2.substr(ctx, content.ref, pos, 4);
		while ((this.isSkipChar(ctx, ch) || this.isCommentOpen(ctx, parser, ch2) || this.isCommentOpen(ctx, parser, ch4)) && pos < parser.content_sz)
		{
			if (this.isCommentOpen(ctx, parser, ch2))
			{
				var __v3 = use("Runtime.rs");
				ch2 = __v3.substr(ctx, content.ref, pos, 2);
				while (!this.isCommentClose(ctx, parser, ch2) && pos < parser.content_sz)
				{
					x = this.nextX(ctx, parser, ch, x);
					y = this.nextY(ctx, parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					var __v4 = use("Runtime.rs");
					ch = __v4.charAt(ctx, content.ref, pos);
					var __v5 = use("Runtime.rs");
					ch2 = __v5.substr(ctx, content.ref, pos, 2);
				}
				if (this.isCommentClose(ctx, parser, ch2))
				{
					x = x + 2;
					pos = pos + 2;
				}
			}
			else if (this.isCommentOpen(ctx, parser, ch4))
			{
				var __v4 = use("Runtime.rs");
				var ch3 = __v4.substr(ctx, content.ref, pos, 3);
				while (!this.isCommentClose(ctx, parser, ch3) && pos < parser.content_sz)
				{
					x = this.nextX(ctx, parser, ch, x);
					y = this.nextY(ctx, parser, ch, y);
					pos = pos + 1;
					if (pos >= parser.content_sz)
					{
						break;
					}
					var __v5 = use("Runtime.rs");
					ch = __v5.charAt(ctx, content.ref, pos);
					var __v6 = use("Runtime.rs");
					ch3 = __v6.substr(ctx, content.ref, pos, 3);
				}
				if (this.isCommentClose(ctx, parser, ch3))
				{
					x = x + 3;
					pos = pos + 3;
				}
			}
			else
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= parser.content_sz)
			{
				break;
			}
			var __v3 = use("Runtime.rs");
			ch = __v3.charAt(ctx, content.ref, pos);
			var __v4 = use("Runtime.rs");
			ch2 = __v4.substr(ctx, content.ref, pos, 2);
			var __v5 = use("Runtime.rs");
			ch4 = __v5.substr(ctx, content.ref, pos, 4);
		}
		var __v3 = use("Bayrell.Lang.Caret");
		return new __v3(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read special token
	 */
	readSpecialToken: function(ctx, parser, content, start_pos)
	{
		var pos = start_pos.pos;
		var s = "";
		var __v0 = use("Runtime.rs");
		s = __v0.substr(ctx, content.ref, pos, 10);
		if (s == "#endswitch")
		{
			return s;
		}
		var __v1 = use("Runtime.rs");
		s = __v1.substr(ctx, content.ref, pos, 7);
		if (s == "#ifcode" || s == "#switch" || s == "#elseif" || s == "%render")
		{
			return s;
		}
		var __v2 = use("Runtime.rs");
		s = __v2.substr(ctx, content.ref, pos, 6);
		if (s == "#endif" || s == "#ifdef" || s == "%while")
		{
			return s;
		}
		var __v3 = use("Runtime.rs");
		s = __v3.substr(ctx, content.ref, pos, 5);
		if (s == "#case" || s == "%else")
		{
			return s;
		}
		var __v4 = use("Runtime.rs");
		s = __v4.substr(ctx, content.ref, pos, 4);
		if (s == "@css" || s == "%for" || s == "%var" || s == "%set")
		{
			return s;
		}
		var __v5 = use("Runtime.rs");
		s = __v5.substr(ctx, content.ref, pos, 3);
		if (s == "!--" || s == "!==" || s == "===" || s == "..." || s == "#if" || s == "%if")
		{
			return s;
		}
		var __v6 = use("Runtime.rs");
		s = __v6.substr(ctx, content.ref, pos, 2);
		if (s == "==" || s == "!=" || s == "<=" || s == ">=" || s == "=>" || s == "->" || s == "|>" || s == "::" || s == "+=" || s == "-=" || s == "~=" || s == "**" || s == "<<" || s == ">>" || s == "++" || s == "--")
		{
			return s;
		}
		return "";
	},
	/**
	 * Read next token and return caret end
	 */
	nextToken: function(ctx, parser, content, start_pos)
	{
		var is_first = true;
		var x = start_pos.x;
		var y = start_pos.y;
		var pos = start_pos.pos;
		/* Check boundaries */
		if (pos >= parser.content_sz)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
			throw new __v0(ctx)
		}
		var s = this.readSpecialToken(ctx, parser, content, start_pos);
		if (s != "")
		{
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(ctx, s);
			for (var i = 0;i < sz;i++)
			{
				var __v1 = use("Runtime.rs");
				var ch = __v1.charAt(ctx, s, i);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			var __v1 = use("Bayrell.Lang.Caret");
			return new __v1(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
		}
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		if (!this.isTokenChar(ctx, ch))
		{
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
		}
		else
		{
			while (this.isTokenChar(ctx, ch))
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				var __v1 = use("Runtime.rs");
				ch = __v1.charAt(ctx, content.ref, pos);
			}
		}
		var __v1 = use("Bayrell.Lang.Caret");
		return new __v1(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
	},
	/**
	 * Read back
	 */
	readBack: function(ctx, parser, search)
	{
		if (search == undefined) search = "";
		var content = parser.content;
		var caret = parser.caret;
		var x = caret.x;
		var y = caret.y;
		var pos = caret.pos;
		var __v0 = use("Runtime.rs");
		var search_sz = __v0.strlen(ctx, search);
		var s = "";
		while (pos >= 0)
		{
			var __v1 = use("Runtime.rs");
			var ch = __v1.charAt(ctx, content.ref, pos);
			x = this.nextX(ctx, parser, ch, x, -1);
			y = this.nextY(ctx, parser, ch, y, -1);
			pos--;
			var __v2 = use("Runtime.rs");
			s = __v2.substr(ctx, content.ref, pos, search_sz);
			if (s == search)
			{
				break;
			}
		}
		var __v1 = use("Bayrell.Lang.Caret");
		return parser.copy(ctx, use("Runtime.Dict").from({"caret":new __v1(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}))}));
	},
	/**
	 * Read next token
	 */
	readToken: function(ctx, parser)
	{
		var caret_start = null;
		var caret_end = null;
		var eof = false;
		var __v0 = use("Bayrell.Lang.Exceptions.ParserEOF");
		try
		{
			caret_start = this.skipChar(ctx, parser, parser.content, parser.caret);
			caret_end = this.nextToken(ctx, parser, parser.content, caret_start);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
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
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v0(ctx, use("Runtime.Dict").from({"content":__v1.substr(ctx, parser.content.ref, caret_start.pos, caret_end.pos - caret_start.pos),"caret_start":caret_start,"caret_end":caret_end,"eof":eof}))]);
	},
	/**
	 * Look next token
	 */
	lookToken: function(ctx, parser, token)
	{
		var token_content = "";
		var content = parser.content;
		var caret_start = null;
		var caret_end = null;
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, token);
		var eof = false;
		var find = false;
		var __v3 = use("Bayrell.Lang.Exceptions.ParserEOF");
		try
		{
			caret_start = this.skipChar(ctx, parser, content, parser.caret);
			var pos = caret_start.pos;
			var x = caret_start.x;
			var y = caret_start.y;
			var __v1 = use("Runtime.rs");
			token_content = __v1.substr(ctx, content.ref, pos, sz);
			if (token_content == token)
			{
				find = true;
			}
			var res = this.next(ctx, parser, token_content, x, y, pos);
			x = Runtime.rtl.get(ctx, res, 0);
			y = Runtime.rtl.get(ctx, res, 1);
			pos = Runtime.rtl.get(ctx, res, 2);
			var __v2 = use("Bayrell.Lang.Caret");
			caret_end = new __v2(ctx, use("Runtime.Dict").from({"pos":pos,"x":x,"y":y}));
		}
		catch (_ex)
		{
			if (_ex instanceof __v3)
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
		var __v1 = use("Bayrell.Lang.CoreToken");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v1(ctx, use("Runtime.Dict").from({"content":token_content,"caret_start":caret_start,"caret_end":caret_end,"eof":eof})),find]);
	},
	/**
	 * Match next token
	 */
	matchToken: function(ctx, parser, next_token)
	{
		var token = null;
		/* Look token */
		var res = this.lookToken(ctx, parser, next_token);
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var find = Runtime.rtl.get(ctx, res, 2);
		if (!find)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, next_token, token.caret_start, parser.file_name)
		}
		return use("Runtime.Collection").from([parser,token]);
	},
	/**
	 * Match next string
	 */
	matchString: function(ctx, parser, str1)
	{
		var caret = parser.caret;
		var __v0 = use("Runtime.rs");
		var sz = __v0.strlen(ctx, str1);
		var __v1 = use("Runtime.rs");
		var str2 = __v1.substr(ctx, parser.content.ref, caret.pos, sz);
		if (str1 != str2)
		{
			var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v2(ctx, str1, caret, parser.file_name)
		}
		var res = this.next(ctx, parser, str1, caret.x, caret.y, caret.pos);
		var __v2 = use("Bayrell.Lang.Caret");
		caret = new __v2(ctx, use("Runtime.Dict").from({"x":Runtime.rtl.get(ctx, res, 0),"y":Runtime.rtl.get(ctx, res, 1),"pos":Runtime.rtl.get(ctx, res, 2)}));
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["caret"]), caret);
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read number
	 */
	readNumber: function(ctx, parser)
	{
		var token = null;
		var start = parser;
		/* Read token */
		var res = this.readToken(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Number", caret_start, parser.file_name)
		}
		if (!this.isStringOfNumbers(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Number", caret_start, parser.file_name)
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value":token.content,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read string
	 */
	readUntilStringArr: function(ctx, parser, arr, flag_include)
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
		var search = (ctx, pos) => 
		{
			for (var i = 0;i < arr.count(ctx);i++)
			{
				var item = arr.item(ctx, i);
				var __v0 = use("Runtime.rs");
				var sz = __v0.strlen(ctx, item);
				var __v1 = use("Runtime.rs");
				var str = __v1.substr(ctx, content.ref, pos, sz);
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
		var arr_pos = search(ctx, pos);
		while (pos < content_sz && arr_pos == -1)
		{
			var __v0 = use("Runtime.rs");
			ch = __v0.charAt(ctx, content.ref, pos);
			x = this.nextX(ctx, parser, ch, x);
			y = this.nextY(ctx, parser, ch, y);
			pos = pos + 1;
			if (pos >= content_sz)
			{
				var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v2 = use("Runtime.rs");
				var __v3 = use("Bayrell.Lang.Caret");
				throw new __v1(ctx, __v2.join(ctx, ",", arr), new __v3(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			arr_pos = search(ctx, pos);
		}
		if (arr_pos == -1)
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v1 = use("Bayrell.Lang.Caret");
			throw new __v0(ctx, "End of string", new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		if (!flag_include)
		{
			end_pos = pos;
		}
		else
		{
			var item = arr.item(ctx, arr_pos);
			var __v0 = use("Runtime.rs");
			var sz = __v0.strlen(ctx, item);
			for (var i = 0;i < sz;i++)
			{
				var __v1 = use("Runtime.rs");
				ch = __v1.charAt(ctx, content.ref, pos);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			end_pos = pos;
		}
		/* Return result */
		var __v0 = use("Bayrell.Lang.Caret");
		var caret_end = new __v0(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":end_pos}));
		var __v1 = use("Runtime.rs");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),__v1.substr(ctx, content.ref, start_pos, end_pos - start_pos)]);
	},
	/**
	 * Read string
	 */
	readString: function(ctx, parser)
	{
		var token = null;
		var look = null;
		/* Read token */
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		var str_char = token.content;
		/* Read begin string char */
		if (str_char != "'" && str_char != "\"")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "String", caret_start, parser.file_name)
		}
		var content = look.content;
		var content_sz = look.content_sz;
		var pos = look.caret.pos;
		var x = look.caret.x;
		var y = look.caret.y;
		/* Read string value */
		var value_str = "";
		var __v0 = use("Runtime.rs");
		var ch = __v0.charAt(ctx, content.ref, pos);
		while (pos < content_sz && ch != str_char)
		{
			if (ch == "\\")
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= content_sz)
				{
					var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
					var __v2 = use("Bayrell.Lang.Caret");
					throw new __v1(ctx, "End of string", new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
				}
				var __v1 = use("Runtime.rs");
				var ch2 = __v1.charAt(ctx, content.ref, pos);
				if (ch2 == "n")
				{
					value_str += use("Runtime.rtl").toStr("\n");
				}
				else if (ch2 == "r")
				{
					value_str += use("Runtime.rtl").toStr("\r");
				}
				else if (ch2 == "t")
				{
					value_str += use("Runtime.rtl").toStr("\t");
				}
				else if (ch2 == "s")
				{
					value_str += use("Runtime.rtl").toStr(" ");
				}
				else if (ch2 == "\\")
				{
					value_str += use("Runtime.rtl").toStr("\\");
				}
				else if (ch2 == "'")
				{
					value_str += use("Runtime.rtl").toStr("'");
				}
				else if (ch2 == "\"")
				{
					value_str += use("Runtime.rtl").toStr("\"");
				}
				x = this.nextX(ctx, parser, ch2, x);
				y = this.nextY(ctx, parser, ch2, y);
				pos = pos + 1;
			}
			else
			{
				value_str += use("Runtime.rtl").toStr(ch);
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
			}
			if (pos >= content_sz)
			{
				var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v2 = use("Bayrell.Lang.Caret");
				throw new __v1(ctx, "End of string", new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
			}
			var __v1 = use("Runtime.rs");
			ch = __v1.charAt(ctx, content.ref, pos);
		}
		/* Read end string char */
		if (ch != "'" && ch != "\"")
		{
			var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
			var __v2 = use("Bayrell.Lang.Caret");
			throw new __v1(ctx, "End of string", new __v2(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), parser.file_name)
		}
		x = this.nextX(ctx, parser, ch, x);
		y = this.nextY(ctx, parser, ch, y);
		pos = pos + 1;
		/* Return result */
		var __v1 = use("Bayrell.Lang.Caret");
		var caret_end = new __v1(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
		var __v2 = use("Bayrell.Lang.OpCodes.OpString");
		return use("Runtime.Collection").from([parser.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v2(ctx, use("Runtime.Dict").from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
	},
	/**
	 * Read comment
	 */
	readComment: function(ctx, parser)
	{
		var start = parser;
		var token = null;
		var look = null;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), false);
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["skip_comments"]), true);
		if (token.content == "/")
		{
			parser = look;
			var content = look.content;
			var content_sz = look.content_sz;
			var pos = look.caret.pos;
			var x = look.caret.x;
			var y = look.caret.y;
			var pos_start = pos;
			var __v1 = use("Runtime.rs");
			var ch = __v1.charAt(ctx, content.ref, pos);
			var __v2 = use("Runtime.rs");
			var ch2 = __v2.substr(ctx, content.ref, pos, 2);
			while (!this.isCommentClose(ctx, parser, ch2) && pos < content_sz)
			{
				x = this.nextX(ctx, parser, ch, x);
				y = this.nextY(ctx, parser, ch, y);
				pos = pos + 1;
				if (pos >= parser.content_sz)
				{
					break;
				}
				var __v3 = use("Runtime.rs");
				ch = __v3.charAt(ctx, content.ref, pos);
				var __v4 = use("Runtime.rs");
				ch2 = __v4.substr(ctx, content.ref, pos, 2);
			}
			var pos_end = pos;
			if (this.isCommentClose(ctx, parser, ch2))
			{
				x = x + 2;
				pos = pos + 2;
			}
			else
			{
				var __v3 = use("Bayrell.Lang.Exceptions.ParserExpected");
				var __v4 = use("Bayrell.Lang.Caret");
				throw new __v3(ctx, "End of comment", new __v4(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos})), start.file_name)
			}
			/* Return result */
			var __v3 = use("Runtime.rs");
			var value_str = __v3.substr(ctx, content.ref, pos_start + 1, pos_end - pos_start - 1);
			var __v4 = use("Bayrell.Lang.Caret");
			var caret_end = new __v4(ctx, use("Runtime.Dict").from({"x":x,"y":y,"pos":pos}));
			var __v5 = use("Bayrell.Lang.OpCodes.OpComment");
			return use("Runtime.Collection").from([start.copy(ctx, use("Runtime.Dict").from({"caret":caret_end})),new __v5(ctx, use("Runtime.Dict").from({"value":value_str,"caret_start":caret_start,"caret_end":caret_end}))]);
		}
		return use("Runtime.Collection").from([parser,null]);
	},
	/**
	 * Read identifier
	 */
	readIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = false;
		var start = parser;
		var token = null;
		var look = null;
		var name = "";
		var __v0 = use("Bayrell.Lang.LangBay.ParserBayBase");
		var res = __v0.readToken(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "")
		{
			var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v1(ctx, "Identifier", token.caret_start, parser.file_name)
		}
		if (!this.isIdentifier(ctx, token.content))
		{
			var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v1(ctx, "Identifier", token.caret_start, parser.file_name)
		}
		if (this.isReserved(ctx, token.content))
		{
			var __v1 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v1(ctx, "Identifier " + use("Runtime.rtl").toStr(token.content) + use("Runtime.rtl").toStr(" is reserverd"), token.caret_start, parser.file_name)
		}
		name = token.content;
		var kind = this.findIdentifier(ctx, parser, name, token.caret_start);
		if (parser.find_ident && find_ident && kind == "")
		{
			var __v1 = use("Bayrell.Lang.Exceptions.ParserError");
			throw new __v1(ctx, "Unknown identifier '" + use("Runtime.rtl").toStr(name) + use("Runtime.rtl").toStr("'"), token.caret_start, parser.file_name)
		}
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		return use("Runtime.Collection").from([parser,new __v1(ctx, use("Runtime.Dict").from({"kind":kind,"value":name,"caret_start":token.caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read entity name
	 */
	readEntityName: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var look = null;
		var token = null;
		var ident = null;
		var __v0 = use("Runtime.Vector");
		var names = new __v0(ctx);
		var res = parser.parser_base.constructor.readIdentifier(ctx, parser, find_ident);
		parser = Runtime.rtl.get(ctx, res, 0);
		ident = Runtime.rtl.get(ctx, res, 1);
		var caret_start = ident.caret_start;
		var name = ident.value;
		names.push(ctx, name);
		var res = parser.parser_base.constructor.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content == ".")
		{
			var res = parser.parser_base.constructor.matchToken(ctx, parser, ".");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_base.constructor.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			ident = Runtime.rtl.get(ctx, res, 1);
			name = ident.value;
			names.push(ctx, name);
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var __v1 = use("Bayrell.Lang.OpCodes.OpEntityName");
		return use("Runtime.Collection").from([parser,new __v1(ctx, use("Runtime.Dict").from({"caret_start":caret_start,"caret_end":parser.caret,"names":names.toCollection(ctx)}))]);
	},
	/**
	 * Read type identifier
	 */
	readTypeIdentifier: function(ctx, parser, find_ident)
	{
		if (find_ident == undefined) find_ident = true;
		var start = parser;
		var look = null;
		var token = null;
		var op_code = null;
		var entity_name = null;
		var template = null;
		var res = this.readEntityName(ctx, parser, find_ident);
		parser = Runtime.rtl.get(ctx, res, 0);
		entity_name = Runtime.rtl.get(ctx, res, 1);
		var caret_start = entity_name.caret_start;
		var flag_open_caret = false;
		var flag_end_caret = false;
		var res = this.lookToken(ctx, parser, "<");
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		flag_open_caret = Runtime.rtl.get(ctx, res, 2);
		if (flag_open_caret)
		{
			var __v0 = use("Runtime.Vector");
			template = new __v0(ctx);
			var res = this.matchToken(ctx, parser, "<");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.lookToken(ctx, parser, ">");
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			flag_end_caret = Runtime.rtl.get(ctx, res, 2);
			while (!token.eof && !flag_end_caret)
			{
				var parser_value = null;
				var res = this.readTypeIdentifier(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				parser_value = Runtime.rtl.get(ctx, res, 1);
				template.push(ctx, parser_value);
				var res = this.lookToken(ctx, parser, ">");
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				flag_end_caret = Runtime.rtl.get(ctx, res, 2);
				if (!flag_end_caret)
				{
					var res = this.matchToken(ctx, parser, ",");
					parser = Runtime.rtl.get(ctx, res, 0);
					var res = this.lookToken(ctx, parser, ">");
					look = Runtime.rtl.get(ctx, res, 0);
					token = Runtime.rtl.get(ctx, res, 1);
					flag_end_caret = Runtime.rtl.get(ctx, res, 2);
				}
			}
			var res = this.matchToken(ctx, parser, ">");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpTypeIdentifier");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"entity_name":entity_name,"template":(template) ? (template.toCollection(ctx)) : (null),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read collection
	 */
	readCollection: function(ctx, parser)
	{
		var start = parser;
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var values = new __v0(ctx);
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(ctx, parser, "[");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content != "]")
		{
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				ifdef_condition = Runtime.rtl.get(ctx, res, 1);
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "then");
				parser = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(ctx, parser);
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
			}
			if (flag_ifdef)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfDef");
				parser_value = new __v1(ctx, use("Runtime.Dict").from({"items":parser_value,"condition":ifdef_condition}));
			}
			values.push(ctx, parser_value);
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var res = this.matchToken(ctx, parser, "]");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var __v1 = use("Bayrell.Lang.OpCodes.OpCollection");
		return use("Runtime.Collection").from([parser,new __v1(ctx, use("Runtime.Dict").from({"values":values.toCollection(ctx),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read collection
	 */
	readDict: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var values = new __v0(ctx);
		var ifdef_condition = null;
		var flag_ifdef = false;
		var res = this.matchToken(ctx, parser, "{");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content != "}")
		{
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "#ifdef")
			{
				parser = look;
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), false);
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				ifdef_condition = Runtime.rtl.get(ctx, res, 1);
				parser = Runtime.rtl.setAttr(ctx, parser, Runtime.Collection.from(["find_ident"]), true);
				var res = parser.parser_base.constructor.matchToken(ctx, parser, "then");
				parser = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				flag_ifdef = true;
			}
			var parser_value = null;
			var res = this.readString(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			var key = parser_value.value;
			var res = this.matchToken(ctx, parser, ":");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			parser_value = Runtime.rtl.get(ctx, res, 1);
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ",")
			{
				parser = look;
			}
			var __v1 = use("Bayrell.Lang.OpCodes.OpDictPair");
			values.push(ctx, new __v1(ctx, use("Runtime.Dict").from({"key":key,"value":parser_value,"condition":ifdef_condition})));
			var res = parser.parser_base.constructor.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == "#endif")
			{
				parser = look;
				flag_ifdef = false;
				ifdef_condition = null;
			}
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var res = this.matchToken(ctx, parser, "}");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var __v1 = use("Bayrell.Lang.OpCodes.OpDict");
		return use("Runtime.Collection").from([parser,new __v1(ctx, use("Runtime.Dict").from({"values":values.toCollection(ctx),"caret_start":caret_start,"caret_end":token.caret_end}))]);
	},
	/**
	 * Read fixed
	 */
	readFixed: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var start = parser;
		var flag_negative = false;
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "Identifier", token.caret_start, look.file_name)
		}
		/* Negative number */
		if (token.content == "-")
		{
			flag_negative = true;
			var res = this.readToken(ctx, look);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		/* Read string */
		if (!flag_negative && (token.content == "'" || token.content == "\""))
		{
			return this.readString(ctx, parser);
		}
		/* Read Collection */
		if (!flag_negative && token.content == "[")
		{
			return this.readCollection(ctx, parser);
		}
		/* Read Dict */
		if (!flag_negative && token.content == "{")
		{
			return this.readDict(ctx, parser);
		}
		/* Read Number */
		if (this.isStringOfNumbers(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpNumber");
			return use("Runtime.Collection").from([look,new __v0(ctx, use("Runtime.Dict").from({"value":token.content,"caret_start":token.caret_start,"caret_end":look.caret,"negative":flag_negative}))]);
		}
		return this.readIdentifier(ctx, parser, true);
	},
	/**
	 * Read call args
	 */
	readCallArgs: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0(ctx);
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "{")
		{
			var res = this.readDict(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			var d = Runtime.rtl.get(ctx, res, 1);
			items = use("Runtime.Collection").from([d]);
		}
		else if (token.content == "(")
		{
			var res = this.matchToken(ctx, parser, "(");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			while (!token.eof && token.content != ")")
			{
				var parser_value = null;
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				parser_value = Runtime.rtl.get(ctx, res, 1);
				items.push(ctx, parser_value);
				var res = this.readToken(ctx, parser);
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (token.content == ",")
				{
					parser = look;
					var res = this.readToken(ctx, parser);
					look = Runtime.rtl.get(ctx, res, 0);
					token = Runtime.rtl.get(ctx, res, 1);
				}
			}
			var res = this.matchToken(ctx, parser, ")");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		return use("Runtime.Collection").from([parser,items.toCollection(ctx)]);
	},
	/**
	 * Read new instance
	 */
	readNew: function(ctx, parser, match_new)
	{
		if (match_new == undefined) match_new = true;
		var look = null;
		var token = null;
		var op_code = null;
		var caret_start = parser.caret;
		var args = use("Runtime.Collection").from([]);
		if (match_new)
		{
			var res = this.matchToken(ctx, parser, "new");
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			caret_start = token.caret_start;
		}
		var res = this.readTypeIdentifier(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var res = this.readToken(ctx, parser);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "(" || token.content == "{")
		{
			var res = this.readCallArgs(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			args = Runtime.rtl.get(ctx, res, 1);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpNew");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"args":args,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read method
	 */
	readMethod: function(ctx, parser, match)
	{
		if (match == undefined) match = true;
		var look = null;
		var token = null;
		var parser_value = null;
		var op_code = null;
		var value1 = "";
		var value2 = "";
		var kind = "";
		var caret_start = parser.caret;
		if (match)
		{
			var res = this.matchToken(ctx, parser, "method");
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
		}
		var save = parser;
		/* Read static method */
		var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
		try
		{
			var res = this.readIdentifier(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = this.matchToken(ctx, parser, "::");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = this.readToken(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			if (op_code.kind == __v0.KIND_VARIABLE)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpMethod");
				kind = __v1.KIND_STATIC;
			}
			else
			{
				var __v2 = use("Bayrell.Lang.OpCodes.OpMethod");
				kind = __v2.KIND_CLASS;
			}
			value1 = op_code;
			value2 = token.content;
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
		/* Read instance method */
		if (kind == "")
		{
			parser = save;
			var __v1 = use("Bayrell.Lang.Exceptions.ParserError");
			try
			{
				var res = this.readIdentifier(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				op_code = Runtime.rtl.get(ctx, res, 1);
				var res = this.matchToken(ctx, parser, ".");
				parser = Runtime.rtl.get(ctx, res, 0);
				var res = this.readToken(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				var __v0 = use("Bayrell.Lang.OpCodes.OpMethod");
				kind = __v0.KIND_ATTR;
				value1 = op_code;
				value2 = token.content;
			}
			catch (_ex)
			{
				if (_ex instanceof __v1)
				{
					var e = _ex;
				}
				else
				{
					throw _ex;
				}
			}
		}
		/* Error */
		if (kind == "")
		{
			var __v0 = use("Bayrell.Lang.Exceptions.ParserExpected");
			throw new __v0(ctx, "'.' or '::'", parser.caret, parser.file_name)
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpMethod");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value1":value1,"value2":value2,"kind":kind,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read curry
	 */
	readCurry: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var obj = null;
		var __v0 = use("Runtime.Vector");
		var args = new __v0(ctx);
		var res = this.matchToken(ctx, parser, "curry");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var res = this.readDynamic(ctx, parser, 14);
		parser = Runtime.rtl.get(ctx, res, 0);
		obj = Runtime.rtl.get(ctx, res, 1);
		var res = this.matchToken(ctx, parser, "(");
		parser = Runtime.rtl.get(ctx, res, 0);
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		while (!token.eof && token.content != ")")
		{
			var arg = null;
			if (token.content == "?")
			{
				var pos = 0;
				parser = look;
				var res = this.readToken(ctx, look);
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (this.isStringOfNumbers(ctx, token.content))
				{
					pos = use("Runtime.rtl").to(token.content, {"e":"int"});
					parser = look;
				}
				var __v1 = use("Bayrell.Lang.OpCodes.OpCurryArg");
				arg = new __v1(ctx, use("Runtime.Dict").from({"pos":pos}));
				args.push(ctx, arg);
			}
			else
			{
				var res = parser.parser_expression.constructor.readExpression(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				arg = Runtime.rtl.get(ctx, res, 1);
				args.push(ctx, arg);
			}
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			if (token.content == ",")
			{
				parser = look;
				var res = this.readToken(ctx, parser);
				look = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
			}
		}
		var res = this.matchToken(ctx, parser, ")");
		parser = Runtime.rtl.get(ctx, res, 0);
		var __v1 = use("Bayrell.Lang.OpCodes.OpCurry");
		return use("Runtime.Collection").from([parser,new __v1(ctx, use("Runtime.Dict").from({"obj":obj,"args":args}))]);
	},
	/**
	 * Read base item
	 */
	readBaseItem: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = look.caret;
		if (token.content == "new")
		{
			var res = this.readNew(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == "method")
		{
			var res = this.readMethod(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == "classof")
		{
			var res = this.readClassOf(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == "classref")
		{
			var res = this.readClassRef(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		else if (token.content == "(")
		{
			var save_parser = parser;
			parser = look;
			/* Try to read OpTypeConvert */
			var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
			try
			{
				var res = this.readTypeIdentifier(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				var op_type = Runtime.rtl.get(ctx, res, 1);
				var res = this.readToken(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				token = Runtime.rtl.get(ctx, res, 1);
				if (token.content == ")")
				{
					var res = this.readDynamic(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					op_code = Runtime.rtl.get(ctx, res, 1);
					var __v0 = use("Bayrell.Lang.OpCodes.OpTypeConvert");
					return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"pattern":op_type,"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
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
			var res = this.matchToken(ctx, save_parser, "(");
			parser = Runtime.rtl.get(ctx, res, 0);
			var res = parser.parser_expression.constructor.readExpression(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
			var res = this.matchToken(ctx, parser, ")");
			parser = Runtime.rtl.get(ctx, res, 0);
		}
		else
		{
			var res = this.readFixed(ctx, parser);
			parser = Runtime.rtl.get(ctx, res, 0);
			op_code = Runtime.rtl.get(ctx, res, 1);
		}
		return use("Runtime.Collection").from([parser,op_code]);
	},
	/**
	 * Read classof
	 */
	readClassOf: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classof");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		var res = this.readEntityName(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassOf");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"entity_name":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read classref
	 */
	readClassRef: function(ctx, parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var res = this.matchToken(ctx, parser, "classref");
		parser = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		var caret_start = token.caret_start;
		var res = parser.parser_expression.constructor.readExpression(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		var __v0 = use("Bayrell.Lang.OpCodes.OpClassRef");
		return use("Runtime.Collection").from([parser,new __v0(ctx, use("Runtime.Dict").from({"value":op_code,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read dynamic
	 */
	readDynamic: function(ctx, parser, dynamic_flags)
	{
		if (dynamic_flags == undefined) dynamic_flags = -1;
		var look = null;
		var token = null;
		var parser_items = null;
		var op_code = null;
		var op_code_first = null;
		var is_await = false;
		var is_context_call = true;
		var caret_start = null;
		/* Dynamic flags */
		var flag_call = 1;
		var flag_attr = 2;
		var flag_static = 4;
		var flag_dynamic = 8;
		var f_next = (ctx, s) => 
		{
			if ((dynamic_flags & 1) == 1)
			{
				if (s == "{" || s == "(" || s == "@")
				{
					return true;
				}
			}
			if ((dynamic_flags & 2) == 2)
			{
				if (s == ".")
				{
					return true;
				}
			}
			if ((dynamic_flags & 4) == 4)
			{
				if (s == "::")
				{
					return true;
				}
			}
			if ((dynamic_flags & 8) == 8)
			{
				if (s == "[")
				{
					return true;
				}
			}
			return false;
		};
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "await")
		{
			caret_start = token.caret_start;
			is_await = true;
			parser = look;
		}
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (token.content == "@")
		{
			var res = this.readToken(ctx, look);
			var look2 = Runtime.rtl.get(ctx, res, 0);
			var token2 = Runtime.rtl.get(ctx, res, 1);
			if (!f_next(ctx, token2.content))
			{
				if (this.isIdentifier(ctx, token2.content))
				{
					parser = look;
					is_context_call = false;
				}
			}
		}
		var res = this.readBaseItem(ctx, parser);
		parser = Runtime.rtl.get(ctx, res, 0);
		op_code = Runtime.rtl.get(ctx, res, 1);
		op_code_first = op_code;
		if (caret_start == null)
		{
			caret_start = op_code.caret_start;
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (op_code.kind == __v0.KIND_CONTEXT || op_code.kind == __v1.KIND_SYS_FUNCTION)
		{
			is_context_call = false;
		}
		var res = this.readToken(ctx, parser);
		look = Runtime.rtl.get(ctx, res, 0);
		token = Runtime.rtl.get(ctx, res, 1);
		if (f_next(ctx, token.content))
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var __v1 = use("Bayrell.Lang.OpCodes.OpNew");
			var __v2 = use("Bayrell.Lang.OpCodes.OpCollection");
			var __v3 = use("Bayrell.Lang.OpCodes.OpDict");
			if (op_code instanceof __v0)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v3 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v4 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v5 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v6 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				var __v7 = use("Bayrell.Lang.OpCodes.OpIdentifier");
				if (parser.find_ident && op_code.kind != __v1.KIND_SYS_TYPE && op_code.kind != __v2.KIND_SYS_FUNCTION && op_code.kind != __v3.KIND_VARIABLE && op_code.kind != __v4.KIND_CLASS && op_code.kind != __v5.KIND_CLASSREF && op_code.kind != __v6.KIND_CONTEXT && op_code.kind != __v7.KIND_THIS)
				{
					var __v8 = use("Bayrell.Lang.Exceptions.ParserExpected");
					throw new __v8(ctx, "Module or variable '" + use("Runtime.rtl").toStr(op_code.value) + use("Runtime.rtl").toStr("'"), op_code.caret_start, parser.file_name)
				}
			}
			else if (op_code instanceof __v1 || op_code instanceof __v2 || op_code instanceof __v3)
			{
			}
			else
			{
				var __v4 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v4(ctx, "Module or variable", op_code.caret_start, parser.file_name)
			}
		}
		/* If is pipe */
		var __v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (parser.is_pipe && op_code instanceof __v0)
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
			var __v2 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			var __v3 = use("Bayrell.Lang.OpCodes.OpIdentifier");
			op_code = new __v1(ctx, use("Runtime.Dict").from({"kind":parser.pipe_kind,"obj":new __v2(ctx, use("Runtime.Dict").from({"kind":__v3.KIND_PIPE,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end})),"value":op_code,"caret_start":op_code.caret_start,"caret_end":op_code.caret_end}));
		}
		while (!token.eof && f_next(ctx, token.content))
		{
			var token_content = token.content;
			/* Static call */
			if (token_content == "(" || token_content == "{" || token_content == "@")
			{
				if ((dynamic_flags & flag_call) != flag_call)
				{
					var __v0 = use("Bayrell.Lang.Exceptions.ParserError");
					throw new __v0(ctx, "Call are not allowed", token.caret_start, parser.file_name)
				}
				if (token_content == "@")
				{
					parser = look;
					is_context_call = false;
				}
				var res = this.readCallArgs(ctx, parser);
				parser = Runtime.rtl.get(ctx, res, 0);
				parser_items = Runtime.rtl.get(ctx, res, 1);
				var __v0 = use("Bayrell.Lang.OpCodes.OpCall");
				op_code = new __v0(ctx, use("Runtime.Dict").from({"obj":op_code,"args":parser_items,"caret_start":caret_start,"caret_end":parser.caret,"is_await":is_await,"is_context":is_context_call}));
				is_context_call = true;
			}
			else if (token_content == "." || token_content == "::" || token_content == "[")
			{
				var kind = "";
				var look_values = null;
				var look_value = null;
				parser = look;
				is_context_call = true;
				if (token_content == ".")
				{
					var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v1.KIND_ATTR;
					if ((dynamic_flags & flag_attr) != flag_attr)
					{
						var __v2 = use("Bayrell.Lang.Exceptions.ParserError");
						throw new __v2(ctx, "Attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "::")
				{
					var __v2 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v2.KIND_STATIC;
					if ((dynamic_flags & flag_static) != flag_static)
					{
						var __v3 = use("Bayrell.Lang.Exceptions.ParserError");
						throw new __v3(ctx, "Static attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				else if (token_content == "[")
				{
					var __v3 = use("Bayrell.Lang.OpCodes.OpAttr");
					kind = __v3.KIND_DYNAMIC;
					if ((dynamic_flags & flag_dynamic) != flag_dynamic)
					{
						var __v4 = use("Bayrell.Lang.Exceptions.ParserError");
						throw new __v4(ctx, "Dynamic attr are not allowed", token.caret_start, parser.file_name)
					}
				}
				if (token_content == "[")
				{
					var res = parser.parser_expression.constructor.readExpression(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					look_value = Runtime.rtl.get(ctx, res, 1);
					var res = this.readToken(ctx, parser);
					look = Runtime.rtl.get(ctx, res, 0);
					token = Runtime.rtl.get(ctx, res, 1);
					if (token.content == ",")
					{
						var __v1 = use("Runtime.Vector");
						look_values = new __v1(ctx);
						look_values.push(ctx, look_value);
					}
					while (token.content == ",")
					{
						parser = look;
						var res = parser.parser_expression.constructor.readExpression(ctx, parser);
						parser = Runtime.rtl.get(ctx, res, 0);
						look_value = Runtime.rtl.get(ctx, res, 1);
						look_values.push(ctx, look_value);
						var res = this.readToken(ctx, parser);
						look = Runtime.rtl.get(ctx, res, 0);
						token = Runtime.rtl.get(ctx, res, 1);
					}
					var res = this.matchToken(ctx, parser, "]");
					parser = Runtime.rtl.get(ctx, res, 0);
					if (look_values != null)
					{
						var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
						kind = __v1.KIND_DYNAMIC_ATTRS;
					}
				}
				else
				{
					var res = this.readToken(ctx, parser);
					look = Runtime.rtl.get(ctx, res, 0);
					token = Runtime.rtl.get(ctx, res, 1);
					if (token.content == "@")
					{
						parser = look;
						is_context_call = false;
					}
					var res = this.readIdentifier(ctx, parser);
					parser = Runtime.rtl.get(ctx, res, 0);
					look_value = Runtime.rtl.get(ctx, res, 1);
				}
				var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
				op_code = new __v1(ctx, use("Runtime.Dict").from({"kind":kind,"obj":op_code,"attrs":(look_values != null) ? (look_values.toCollection(ctx)) : (null),"value":(look_values == null) ? (look_value) : (null),"caret_start":caret_start,"caret_end":parser.caret}));
			}
			else
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2(ctx, "Next attr", token.caret_start, parser.file_name)
			}
			var res = this.readToken(ctx, parser);
			look = Runtime.rtl.get(ctx, res, 0);
			token = Runtime.rtl.get(ctx, res, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpAttr");
			var __v1 = use("Bayrell.Lang.OpCodes.OpAttr");
			if (op_code instanceof __v0 && op_code.kind == __v1.KIND_PIPE && token.content != "(" && token.content != "{")
			{
				var __v2 = use("Bayrell.Lang.Exceptions.ParserExpected");
				throw new __v2(ctx, "Call", token.caret_start, parser.file_name)
			}
		}
		return use("Runtime.Collection").from([parser,op_code]);
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayBase",
			"name": "Bayrell.Lang.LangBay.ParserBayBase",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangBay.ParserBayBase);
module.exports = Bayrell.Lang.LangBay.ParserBayBase;