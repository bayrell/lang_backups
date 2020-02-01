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
Bayrell.Lang.CoreParser = function(/*__ctx*/)
{
	use("Runtime.FakeStruct").apply(this, arguments);
};
Bayrell.Lang.CoreParser.prototype = Object.create(use("Runtime.FakeStruct").prototype);
Bayrell.Lang.CoreParser.prototype.constructor = Bayrell.Lang.CoreParser;
Object.assign(Bayrell.Lang.CoreParser.prototype,
{
	/**
	 * Returns true if eof
	 */
	isEof: function()
	{
		return this.caret.pos >= this.content_sz;
	},
	_init: function(/*__ctx*/)
	{
		this.tab_size = 4;
		this.file_name = "";
		this.content = null;
		this.content_sz = 0;
		this.caret = null;
		this.find_ident = true;
		use("Runtime.FakeStruct").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.CoreParser"))
		{
			this.tab_size = o.tab_size;
			this.file_name = o.file_name;
			this.content = o.content;
			this.content_sz = o.content_sz;
			this.caret = o.caret;
			this.find_ident = o.find_ident;
		}
		use("Runtime.FakeStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "tab_size")this.tab_size = v;
		else if (k == "file_name")this.file_name = v;
		else if (k == "content")this.content = v;
		else if (k == "content_sz")this.content_sz = v;
		else if (k == "caret")this.caret = v;
		else if (k == "find_ident")this.find_ident = v;
		else use("Runtime.FakeStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "tab_size")return this.tab_size;
		else if (k == "file_name")return this.file_name;
		else if (k == "content")return this.content;
		else if (k == "content_sz")return this.content_sz;
		else if (k == "caret")return this.caret;
		else if (k == "find_ident")return this.find_ident;
		return use("Runtime.FakeStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
});
Object.assign(Bayrell.Lang.CoreParser, use("Runtime.FakeStruct"));
Object.assign(Bayrell.Lang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		var __v0 = use("Bayrell.Lang.Caret");
		return parser.copy(use("Runtime.Dict").create({"caret":new __v0(use("Runtime.Dict").create({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(parser, content)
	{
		var __v0 = use("Runtime.Reference");
		var __v1 = use("Runtime.rs");
		return parser.copy(use("Runtime.Dict").create({"content":new __v0(content),"content_sz":__v1.strlen(content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser, content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(parser);
		}
		return parser;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
	getParentClassName: function()
	{
		return "Runtime.FakeStruct";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.CoreParser",
			"name": "Bayrell.Lang.CoreParser",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("tab_size");
			a.push("file_name");
			a.push("content");
			a.push("content_sz");
			a.push("caret");
			a.push("find_ident");
		}
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
});use.add(Bayrell.Lang.CoreParser);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.CoreParser = Bayrell.Lang.CoreParser;