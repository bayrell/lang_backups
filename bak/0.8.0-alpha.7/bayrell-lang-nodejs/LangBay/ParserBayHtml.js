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
Bayrell.Lang.LangBay.ParserBayHtml = function(/*__ctx*/)
{
	use("Runtime.CoreObject").apply(this, arguments);
};
Bayrell.Lang.LangBay.ParserBayHtml.prototype = Object.create(use("Runtime.CoreObject").prototype);
Bayrell.Lang.LangBay.ParserBayHtml.prototype.constructor = Bayrell.Lang.LangBay.ParserBayHtml;
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangBay.ParserBayHtml"))
		{
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		use("Runtime.CoreObject").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml, use("Runtime.CoreObject"));
Object.assign(Bayrell.Lang.LangBay.ParserBayHtml,
{
	/**
	 * Read css selector
	 */
	readCssSelector: function(parser)
	{
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var class_name = parser.current_namespace_name + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(parser.current_class_name);
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(content.ref, pos, 1);
		if (ch == "(")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			var start_pos = pos;
			while (pos < content_sz && ch != ")")
			{
				pos = pos + 1;
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				var __v0 = use("Runtime.rs");
				ch = __v0.substr(content.ref, pos, 1);
			}
			var __v0 = use("Runtime.rs");
			class_name = __v0.substr(content.ref, start_pos, pos - start_pos);
			if (parser.uses.has(class_name))
			{
				class_name = parser.uses.item(class_name);
			}
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
		}
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		ch = __v0.substr(content.ref, pos, 1);
		while (pos < content_sz && ch != " " && ch != "," && ch != "." && ch != ":" && ch != "[" && ch != "{")
		{
			pos = pos + 1;
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(content.ref, pos, 1);
		}
		var __v0 = use("Runtime.rs");
		var postfix = __v0.substr(content.ref, start_pos, pos - start_pos);
		var __v0 = use("Runtime.RuntimeUtils");
		var selector = "." + use("Runtime.rtl").toString(postfix) + use("Runtime.rtl").toString("-") + use("Runtime.rtl").toString(__v0.getCssHash(class_name));
		var __v0 = use("Bayrell.Lang.Caret");
		var caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
		parser = parser.copy({ "caret": caret });
		return use("Runtime.Collection").create([parser,selector]);
	},
	/**
	 * Read css
	 */
	readCss: function(parser)
	{
		var caret_start = parser.caret.clone();
		var res = parser.parser_base.constructor.matchToken(parser, "@css");
		parser = res[0];
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = res[0];
		var css_str = "";
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var bracket_level = 0;
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(content.ref, pos, 1);
		while (pos < content_sz && (ch != "}" || ch == "}" && bracket_level > 0))
		{
			/* If html or  tag */
			if (ch == "%")
			{
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
				/* Add value */
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(content.ref, start_pos, pos - start_pos - 1);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toString(value);
				}
				/* Read CSS Selector */
				var __v0 = use("Bayrell.Lang.Caret");
				var caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
				parser = parser.copy({ "caret": caret });
				var res = this.readCssSelector(parser);
				parser = res[0];
				var s = res[1];
				css_str += use("Runtime.rtl").toString(s);
				/* Set pos, x, y */
				caret_start = parser.caret.clone();
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else if (ch == "{")
			{
				/* Add value */
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(content.ref, start_pos, pos - start_pos);
				if (value != "")
				{
					css_str += use("Runtime.rtl").toString(value);
				}
				/* Read CSS Block */
				var __v0 = use("Bayrell.Lang.Caret");
				var caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
				parser = parser.copy({ "caret": caret });
				var res = parser.parser_base.constructor.matchToken(parser, "{");
				parser = res[0];
				var res = parser.parser_base.constructor.readUntilStringArr(parser, use("Runtime.Collection").create(["}"]), false);
				parser = res[0];
				var s = res[1];
				var res = parser.parser_base.constructor.matchToken(parser, "}");
				parser = res[0];
				css_str += use("Runtime.rtl").toString("{" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString("}"));
				/* Set pos, x, y */
				caret_start = parser.caret.clone();
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(content.ref, pos, 1);
		}
		/* Push item */
		var __v0 = use("Runtime.rs");
		var value = __v0.substr(content.ref, start_pos, pos - start_pos);
		var __v0 = use("Bayrell.Lang.Caret");
		var caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			css_str += use("Runtime.rtl").toString(value);
		}
		parser = parser.copy({ "caret": caret });
		var res = parser.parser_base.constructor.matchToken(parser, "}");
		parser = res[0];
		var __v0 = use("Runtime.rs");
		css_str = __v0.replace("\t", "", css_str);
		var __v0 = use("Runtime.rs");
		css_str = __v0.replace("\n", "", css_str);
		var __v0 = use("Bayrell.Lang.OpCodes.OpString");
		var op_code = new __v0(use("Runtime.Dict").create({"caret_start":caret,"caret_end":parser.caret.clone(),"value":css_str}));
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read html value
	 */
	readHTMLValue: function(parser)
	{
		var item = null;
		var caret = parser.caret.clone();
		var content = parser.content;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(content.ref, pos, 1);
		if (ch == "<")
		{
			var res = this.readHTMLTag(parser);
			parser = res[0];
			item = res[1];
		}
		else if (ch == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			item = res[1];
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = res[0];
		}
		else if (ch == "@")
		{
			x = parser.parser_base.constructor.nextX(parser, ch, x);
			y = parser.parser_base.constructor.nextY(parser, ch, y);
			pos = pos + 1;
			var __v0 = use("Runtime.rs");
			var ch3 = __v0.substr(content.ref, pos, 3);
			var __v0 = use("Runtime.rs");
			var ch4 = __v0.substr(content.ref, pos, 4);
			if (ch3 == "raw" || ch4 == "json")
			{
				var res;
				if (ch3 == "raw")
				{
					res = parser.parser_base.constructor.next(parser, ch3, x, y, pos);
				}
				if (ch4 == "json")
				{
					res = parser.parser_base.constructor.next(parser, ch4, x, y, pos);
				}
				x = res[0];
				y = res[1];
				pos = res[2];
			}
			var __v0 = use("Bayrell.Lang.Caret");
			caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
			parser = parser.copy({ "caret": caret });
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			item = res[1];
			if (ch3 == "raw")
			{
				var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v0(use("Runtime.Dict").create({"kind":__v1.KIND_RAW,"value":item,"caret_start":caret,"caret_end":parser.caret.clone()}));
			}
			else if (ch4 == "json")
			{
				var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				item = new __v0(use("Runtime.Dict").create({"kind":__v1.KIND_JSON,"value":item,"caret_start":caret,"caret_end":parser.caret.clone()}));
			}
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = res[0];
		}
		return use("Runtime.Collection").create([parser,item]);
	},
	/**
	 * Read html attribute key
	 */
	readHTMLAttrKey: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var key = "";
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "@")
		{
			parser = look.clone();
			key = "@";
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = res[0];
		ident = res[1];
		key += use("Runtime.rtl").toString(ident.value);
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == ":")
		{
			parser = look.clone();
			key += use("Runtime.rtl").toString(":");
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			ident = res[1];
			key += use("Runtime.rtl").toString(ident.value);
		}
		return use("Runtime.Collection").create([parser,key]);
	},
	/**
	 * Read html attribute value
	 */
	readHTMLAttrValue: function(parser)
	{
		var token = null;
		var look = null;
		var op_code = null;
		var ident = null;
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			op_code = res[1];
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = res[0];
		}
		else if (token.content == "@")
		{
			var res = this.readHTMLValue(parser);
			parser = res[0];
			op_code = res[1];
		}
		else
		{
			var res = parser.parser_base.constructor.readString(parser);
			parser = res[0];
			op_code = res[1];
		}
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read html attributes
	 */
	readHTMLAttrs: function(parser)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0();
		var content = parser.content;
		var content_sz = parser.content_sz;
		var caret = parser.parser_base.constructor.skipChar(parser, content.ref, parser.caret.clone());
		var __v0 = use("Runtime.rs");
		var ch = __v0.substr(content.ref, caret.pos, 1);
		while (ch != ">" && caret.pos < content_sz)
		{
			var caret_start = caret;
			var res = this.readHTMLAttrKey(parser);
			parser = res[0];
			var key = res[1];
			var res = parser.parser_base.constructor.matchToken(parser, "=");
			parser = res[0];
			var res = this.readHTMLAttrValue(parser);
			parser = res[0];
			var value = res[1];
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlAttribute");
			items.push(new __v0(use("Runtime.Dict").create({"key":key,"value":value,"caret_start":caret_start,"caret_end":parser.caret.clone()})));
			caret = parser.parser_base.constructor.skipChar(parser, content.ref, parser.caret.clone());
			var __v0 = use("Runtime.rs");
			ch = __v0.substr(content.ref, caret.pos, 1);
			var __v0 = use("Runtime.rs");
			var ch2 = __v0.substr(content.ref, caret.pos, 2);
			if (ch2 == "/>")
			{
				break;
			}
		}
		return use("Runtime.Collection").create([parser,items.toCollection()]);
	},
	/**
	 * Read html template
	 */
	readHTMLContent: function(parser, end_tag)
	{
		var __v0 = use("Runtime.Vector");
		var items = new __v0();
		var item = null;
		var token = null;
		var look = null;
		var caret = null;
		var caret_start = parser.caret.clone();
		var content = parser.content;
		var content_sz = parser.content_sz;
		var pos = parser.caret.pos;
		var x = parser.caret.x;
		var y = parser.caret.y;
		var start_pos = pos;
		var __v0 = use("Runtime.rs");
		var end_tag_sz = __v0.strlen(end_tag);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(content.ref, pos, end_tag_sz);
		while (ch2 != end_tag && pos < content_sz)
		{
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(content.ref, pos, 1);
			/* If html or  tag */
			if (ch == "<" || ch == "{" || ch == "@")
			{
				var __v0 = use("Runtime.rs");
				var value = __v0.substr(content.ref, start_pos, pos - start_pos);
				var __v0 = use("Bayrell.Lang.Caret");
				caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
				var __v0 = use("Runtime.rs");
				value = __v0.trim(value, "\t\r\n");
				if (value != "")
				{
					var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
					item = new __v0(use("Runtime.Dict").create({"value":value,"caret_start":caret_start,"caret_end":caret}));
					items.push(item);
				}
				/* Read HTML Value */
				parser = parser.copy({ "caret": caret });
				var res = this.readHTMLValue(parser);
				parser = res[0];
				item = res[1];
				items.push(item);
				/* Set pos, x, y */
				caret_start = parser.caret.clone();
				pos = parser.caret.pos;
				x = parser.caret.x;
				y = parser.caret.y;
				start_pos = pos;
			}
			else
			{
				x = parser.parser_base.constructor.nextX(parser, ch, x);
				y = parser.parser_base.constructor.nextY(parser, ch, y);
				pos = pos + 1;
			}
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(content.ref, pos, end_tag_sz);
		}
		/* Push item */
		var __v0 = use("Runtime.rs");
		var value = __v0.substr(content.ref, start_pos, pos - start_pos);
		var __v0 = use("Runtime.rs");
		value = __v0.trim(value, "\t\r\n");
		var __v0 = use("Bayrell.Lang.Caret");
		caret = new __v0(use("Runtime.Dict").create({"x":x,"y":y,"pos":pos}));
		if (value != "")
		{
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			item = new __v0(use("Runtime.Dict").create({"value":value,"caret_start":caret_start,"caret_end":caret}));
			items.push(item);
		}
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"caret":caret})),items]);
	},
	/**
	 * Read html tag
	 */
	readHTMLTag: function(parser)
	{
		var token = null;
		var look = null;
		var ident = null;
		var caret_items_start = null;
		var caret_items_end = null;
		var caret_start = parser.caret.clone();
		var items = null;
		var op_code_name = null;
		var is_single_flag = false;
		var op_code_flag = false;
		var tag_name = "";
		/* Tag start */
		var res = parser.parser_base.constructor.matchToken(parser, "<");
		parser = res[0];
		/* Look token */
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "{")
		{
			op_code_flag = true;
			var caret1 = parser.caret.clone();
			var res = parser.parser_base.constructor.matchToken(parser, "{");
			parser = res[0];
			var res = parser.parser_expression.constructor.readExpression(parser);
			parser = res[0];
			op_code_name = res[1];
			var res = parser.parser_base.constructor.matchToken(parser, "}");
			parser = res[0];
			var caret2 = parser.caret.clone();
			var __v0 = use("Runtime.rs");
			tag_name = __v0.substr(parser.content.ref, caret1.pos, caret2.pos - caret1.pos);
		}
		else
		{
			var res = parser.parser_base.constructor.readIdentifier(parser, false);
			parser = res[0];
			ident = res[1];
			tag_name = ident.value;
		}
		var res = this.readHTMLAttrs(parser);
		parser = res[0];
		var attrs = res[1];
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		if (token.content == "/")
		{
			parser = look.clone();
			is_single_flag = true;
		}
		var res = parser.parser_base.constructor.matchToken(parser, ">");
		parser = res[0];
		if (!is_single_flag)
		{
			/* Read items */
			caret_items_start = parser.caret.clone();
			var res = this.readHTMLContent(parser, "</" + use("Runtime.rtl").toString(tag_name));
			parser = res[0];
			var items = res[1];
			caret_items_end = parser.caret.clone();
			/* Tag end */
			if (op_code_flag)
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = res[0];
				var res = parser.parser_base.constructor.matchString(parser, tag_name);
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = res[0];
			}
			else
			{
				var res = parser.parser_base.constructor.matchToken(parser, "<");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(parser, "/");
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(parser, ident.value);
				parser = res[0];
				var res = parser.parser_base.constructor.matchToken(parser, ">");
				parser = res[0];
			}
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
		var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(use("Runtime.Dict").create({"attrs":attrs,"tag_name":tag_name,"op_code_name":op_code_name,"caret_start":caret_start,"caret_end":parser.caret.clone(),"items":(items != null) ? new __v1(use("Runtime.Dict").create({"caret_start":caret_items_start,"caret_end":caret_items_end,"items":items.toCollection()})) : null}));
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/**
	 * Read html template
	 */
	readHTML: function(parser)
	{
		var look = null;
		var token = null;
		var __v0 = use("Runtime.Vector");
		var items = new __v0();
		var caret_start = parser.caret.clone();
		var res = parser.parser_base.constructor.readToken(parser.clone());
		look = res[0];
		token = res[1];
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.substr(parser.content.ref, parser.caret.pos, 2);
		while (!token.eof && token.content == "<" && ch2 != "</")
		{
			var res = this.readHTMLTag(parser);
			parser = res[0];
			var op_code = res[1];
			items.push(op_code);
			var res = parser.parser_base.constructor.readToken(parser.clone());
			look = res[0];
			token = res[1];
			var caret = parser.parser_base.constructor.skipChar(parser, parser.content, parser.caret.clone());
			var __v0 = use("Runtime.rs");
			ch2 = __v0.substr(parser.content.ref, caret.pos, 2);
		}
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlItems");
		var op_code = new __v0(use("Runtime.Dict").create({"caret_start":caret_start,"caret_end":parser.caret.clone(),"items":items.toCollection()}));
		return use("Runtime.Collection").create([parser,op_code]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayHtml";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangBay.ParserBayHtml",
			"name": "Bayrell.Lang.LangBay.ParserBayHtml",
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
});use.add(Bayrell.Lang.LangBay.ParserBayHtml);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayHtml = Bayrell.Lang.LangBay.ParserBayHtml;