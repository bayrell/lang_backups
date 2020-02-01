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
Bayrell.Lang.LangBay.ParserBayProgram = function()
{
};
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayProgram";
	},
});
Object.assign(Bayrell.Lang.LangBay.ParserBayProgram,
{
	/**
	 * Read namespace
	 */
	readNamespace: function(parser)
	{
		var token = null;
		var name = null;
		var res = parser.parser_base.constructor.matchToken(parser, "namespace");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = res[0];
		name = res[1];
		var _v0 = use("Runtime.rs");
		var current_namespace_name = _v0.join(".", name.names);
		var _v0 = use("Bayrell.Lang.OpCodes.OpNamespace");
		var current_namespace = new _v0(use("Runtime.Dict").create({"name":current_namespace_name,"caret_start":caret_start,"caret_end":parser.caret}));
		parser = parser.copy({ "current_namespace": current_namespace });
		parser = parser.copy({ "current_namespace_name": current_namespace_name });
		return use("Runtime.Collection").create([parser,current_namespace]);
	},
	/**
	 * Read use
	 */
	readUse: function(parser)
	{
		var look = null;
		var token = null;
		var name = null;
		var alias = "";
		var res = parser.parser_base.constructor.matchToken(parser, "use");
		parser = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		var res = parser.parser_base.constructor.readEntityName(parser, false);
		parser = res[0];
		name = res[1];
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "as")
		{
			var parser_value = null;
			parser = look;
			var res = parser.parser_base.constructor.readIdentifier(parser);
			parser = res[0];
			parser_value = res[1];
			alias = parser_value.value;
		}
		var _v0 = use("Bayrell.Lang.OpCodes.OpUse");
		var _v1 = use("Runtime.rs");
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"name":_v1.join(".", name.names),"alias":alias,"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/**
	 * Read class body
	 */
	readClassBody: function(parser)
	{
		var look = null;
		var token = null;
		var _v0 = use("Runtime.Vector");
		var items = new _v0();
		parser = parser.copy({ "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		parser = parser.copy({ "skip_comments": true });
		while (!token.eof && token.content != "}")
		{
			var item = null;
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(item);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = res[0];
				item = res[1];
				items.push(item);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = res[0];
				item = res[1];
				if (item != null)
				{
					items.push(item);
				}
			}
			else
			{
				var flags = null;
				var res = parser.parser_operator.constructor.readFlags(parser);
				parser = res[0];
				flags = res[1];
				if (parser.parser_operator.constructor.tryReadFunction(parser, true, flags))
				{
					var res = parser.parser_operator.constructor.readDeclareFunction(parser, true);
					parser = res[0];
					item = res[1];
					if (item.expression != null)
					{
						var res = parser.parser_base.constructor.matchToken(parser, ";");
						parser = res[0];
					}
				}
				else
				{
					var res = parser.parser_operator.constructor.readAssign(parser);
					parser = res[0];
					item = res[1];
					var res = parser.parser_base.constructor.matchToken(parser, ";");
					parser = res[0];
				}
				item = item.copy({ "flags": flags });
				if (item != null)
				{
					items.push(item);
				}
			}
			parser = parser.copy({ "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			parser = parser.copy({ "skip_comments": true });
		}
		return use("Runtime.Collection").create([parser,items.toCollection()]);
	},
	/**
	 * Read class
	 */
	readClass: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var template = null;
		var is_declare = false;
		var is_static = false;
		var is_struct = false;
		var class_kind = "";
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		if (token.content == "static")
		{
			parser = look;
			is_static = true;
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "declare")
		{
			parser = look;
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			is_declare = true;
		}
		if (token.content == "class")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
			parser = res[0];
			var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			class_kind = _v0.KIND_CLASS;
		}
		else if (token.content == "struct")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "struct");
			parser = res[0];
			var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			class_kind = _v0.KIND_STRUCT;
		}
		else if (token.content == "interface")
		{
			var res = parser.parser_base.constructor.matchToken(parser, "interface");
			parser = res[0];
			var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
			class_kind = _v0.KIND_INTERFACE;
		}
		else
		{
			var res = parser.parser_base.constructor.matchToken(parser, "class");
		}
		var res = parser.parser_base.constructor.readIdentifier(parser);
		parser = res[0];
		op_code = res[1];
		var class_name = op_code.value;
		/* Set class name */
		parser = parser.copy({ "current_class_name": class_name });
		parser = parser.copy({ "current_class_kind": class_kind });
		/* Register module in parser */
		parser = parser.copy({ "uses": parser.uses.setIm(class_name, parser.current_namespace_name + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(class_name)) });
		var save_uses = parser.uses;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "<")
		{
			var _v0 = use("Runtime.Vector");
			template = new _v0();
			var res = parser.parser_base.constructor.matchToken(parser, "<");
			parser = res[0];
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content != ">")
			{
				var parser_value = null;
				var res = parser.parser_base.constructor.readIdentifier(parser);
				parser = res[0];
				parser_value = res[1];
				template.push(parser_value);
				parser = parser.copy({ "uses": parser.uses.setIm(parser_value.value, parser_value.value) });
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
				if (token.content != ">")
				{
					var res = parser.parser_base.constructor.matchToken(parser, ",");
					parser = res[0];
					var res = parser.parser_base.constructor.readToken(parser);
					look = res[0];
					token = res[1];
				}
			}
			var res = parser.parser_base.constructor.matchToken(parser, ">");
			parser = res[0];
		}
		var class_extends = null;
		var class_implements = null;
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "extends")
		{
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = res[0];
			class_extends = res[1];
		}
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		if (token.content == "implements")
		{
			var _v0 = use("Runtime.Vector");
			class_implements = new _v0();
			var res = parser.parser_base.constructor.readTypeIdentifier(look);
			parser = res[0];
			op_code = res[1];
			class_implements.push(op_code);
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			while (!token.eof && token.content == ",")
			{
				parser = look;
				var res = parser.parser_base.constructor.readTypeIdentifier(look);
				parser = res[0];
				op_code = res[1];
				class_implements.push(op_code);
				var res = parser.parser_base.constructor.readToken(parser);
				look = res[0];
				token = res[1];
			}
		}
		var arr = null;
		var res = parser.parser_base.constructor.matchToken(parser, "{");
		parser = res[0];
		var res = this.readClassBody(parser);
		parser = res[0];
		arr = res[1];
		var _v0 = use("Runtime.Map");
		var names = new _v0();
		var _v0 = use("Runtime.Vector");
		var vars = new _v0();
		var _v0 = use("Runtime.Vector");
		var functions = new _v0();
		var _v0 = use("Runtime.Vector");
		var items = new _v0();
		var _v0 = use("Runtime.Vector");
		var annotations = new _v0();
		var _v0 = use("Runtime.Vector");
		var comments = new _v0();
		var fn_create = null;
		var fn_destroy = null;
		for (var i = 0;i < arr.count();i++)
		{
			var item = arr.item(i);
			var _v0 = use("Bayrell.Lang.OpCodes.OpAnnotation");
			var _v1 = use("Bayrell.Lang.OpCodes.OpComment");
			var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
			var _v3 = use("Bayrell.Lang.OpCodes.OpDeclareFunction");
			if (item instanceof _v0)
			{
				annotations.push(item);
			}
			else if (item instanceof _v1)
			{
				comments.push(item);
			}
			else if (item instanceof _v2)
			{
				for (var j = 0;j < item.values.count();j++)
				{
					var assign_value = item.values.item(j);
					var value_name = assign_value.var_name;
					if (names.has(value_name))
					{
						var _v3 = use("Bayrell.Lang.Exceptions.ParserError");
						throw new _v3("Dublicate identifier " + use("Runtime.rtl").toString(value_name),assign_value.caret_start,parser.file_name)
					}
					names.set(assign_value.name, true);
				}
				item = item.copy(use("Runtime.Dict").create({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				vars.push(item);
				annotations.clear();
				comments.clear();
			}
			else if (item instanceof _v3)
			{
				item = item.copy(use("Runtime.Dict").create({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				if (names.has(item.name))
				{
					var _v4 = use("Bayrell.Lang.Exceptions.ParserError");
					throw new _v4("Dublicate identifier " + use("Runtime.rtl").toString(item.name),item.caret_start,parser.file_name)
				}
				names.set(item.name, true);
				if (item.name == "constructor")
				{
					fn_create = item;
				}
				else if (item.name == "destructor")
				{
					fn_destroy = item;
				}
				else
				{
					functions.push(item);
				}
				annotations.clear();
				comments.clear();
			}
			else
			{
				items.push(item);
			}
		}
		items.appendVector(comments);
		var res = parser.parser_base.constructor.matchToken(parser, "}");
		parser = res[0];
		var _v0 = use("Bayrell.Lang.OpCodes.OpDeclareClass");
		var current_class = new _v0(use("Runtime.Dict").create({"kind":class_kind,"name":class_name,"is_static":is_static,"is_declare":is_declare,"class_extends":class_extends,"class_implements":(class_implements != null) ? class_implements.toCollection() : null,"template":(template != null) ? template.toCollection() : null,"vars":vars.toCollection(),"functions":functions.toCollection(),"fn_create":fn_create,"fn_destroy":fn_destroy,"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}));
		/* Restore uses */
		parser = parser.copy({ "uses": save_uses });
		return use("Runtime.Collection").create([parser.copy(use("Runtime.Dict").create({"current_class":current_class})),current_class]);
	},
	/**
	 * Read program
	 */
	readProgram: function(parser)
	{
		var look = null;
		var token = null;
		var op_code = null;
		var _v0 = use("Runtime.Vector");
		var annotations = new _v0();
		var _v0 = use("Runtime.Vector");
		var comments = new _v0();
		var _v0 = use("Runtime.Vector");
		var items = new _v0();
		parser = parser.copy({ "skip_comments": false });
		var res = parser.parser_base.constructor.readToken(parser);
		look = res[0];
		token = res[1];
		var caret_start = token.caret_start;
		parser = parser.copy({ "skip_comments": true });
		if (token.eof)
		{
			return use("Runtime.Collection").create([parser,null]);
		}
		while (!token.eof)
		{
			if (token.content == "/")
			{
				var res = parser.parser_base.constructor.readComment(parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					comments.push(op_code);
				}
			}
			else if (token.content == "@")
			{
				var res = parser.parser_operator.constructor.readAnnotation(parser);
				parser = res[0];
				op_code = res[1];
				annotations.push(op_code);
			}
			else if (token.content == "#switch" || token.content == "#ifcode")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = parser.parser_preprocessor.constructor.readPreprocessor(parser);
				parser = res[0];
				op_code = res[1];
				if (op_code != null)
				{
					items.appendVector(comments);
					items.push(op_code);
				}
			}
			else if (token.content == "namespace")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = this.readNamespace(parser);
				parser = res[0];
				op_code = res[1];
				items.push(op_code);
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = res[0];
			}
			else if (token.content == "use")
			{
				/* Append comments */
				items.appendVector(comments);
				comments.clear();
				var res = this.readUse(parser);
				parser = res[0];
				op_code = res[1];
				var full_name = op_code.name;
				var short_name = "";
				if (op_code.alias == "")
				{
					var _v0 = use("Runtime.rs");
					short_name = _v0.explode(".", full_name).last();
				}
				else
				{
					short_name = op_code.alias;
				}
				/* Register module in parser */
				parser = parser.copy({ "uses": parser.uses.setIm(short_name, full_name) });
				var res = parser.parser_base.constructor.matchToken(parser, ";");
				parser = res[0];
			}
			else if (token.content == "class" || token.content == "struct" || token.content == "static" || token.content == "declare" || token.content == "interface")
			{
				var item = null;
				var res = this.readClass(parser);
				parser = res[0];
				item = res[1];
				item = item.copy(use("Runtime.Dict").create({"annotations":annotations.toCollection(),"comments":comments.toCollection()}));
				items.push(item);
				annotations.clear();
				comments.clear();
			}
			else
			{
				break;
			}
			parser = parser.copy({ "skip_comments": false });
			var res = parser.parser_base.constructor.readToken(parser);
			look = res[0];
			token = res[1];
			parser = parser.copy({ "skip_comments": true });
		}
		items.appendVector(comments);
		var _v0 = use("Bayrell.Lang.OpCodes.OpModule");
		return use("Runtime.Collection").create([parser,new _v0(use("Runtime.Dict").create({"uses":parser.uses.toDict(),"items":items.toCollection(),"caret_start":caret_start,"caret_end":parser.caret}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangBay";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangBay.ParserBayProgram";
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
			"class_name": "Bayrell.Lang.LangBay.ParserBayProgram",
			"name": "Bayrell.Lang.LangBay.ParserBayProgram",
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
});use.add(Bayrell.Lang.LangBay.ParserBayProgram);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangBay == undefined) module.exports.Bayrell.Lang.LangBay = {};
module.exports.Bayrell.Lang.LangBay.ParserBayProgram = Bayrell.Lang.LangBay.ParserBayProgram;