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
Bayrell.Lang.CoreParser = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.CoreParser.prototype = Object.create(use("Runtime.CoreStruct").prototype);
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
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__tab_size = 4;
		if (a.indexOf("tab_size") == -1)Object.defineProperty(this, "tab_size",{get:function(){return this.__tab_size;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("tab_size");}});
		this.__file_name = "";
		if (a.indexOf("file_name") == -1)Object.defineProperty(this, "file_name",{get:function(){return this.__file_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("file_name");}});
		this.__content = "";
		if (a.indexOf("content") == -1)Object.defineProperty(this, "content",{get:function(){return this.__content;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("content");}});
		this.__content_sz = 0;
		if (a.indexOf("content_sz") == -1)Object.defineProperty(this, "content_sz",{get:function(){return this.__content_sz;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("content_sz");}});
		this.__caret = null;
		if (a.indexOf("caret") == -1)Object.defineProperty(this, "caret",{get:function(){return this.__caret;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("caret");}});
		this.__find_ident = true;
		if (a.indexOf("find_ident") == -1)Object.defineProperty(this, "find_ident",{get:function(){return this.__find_ident;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("find_ident");}});
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.CoreParser"))
		{
			this.__tab_size = o.__tab_size;
			this.__file_name = o.__file_name;
			this.__content = o.__content;
			this.__content_sz = o.__content_sz;
			this.__caret = o.__caret;
			this.__find_ident = o.__find_ident;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "tab_size")this.__tab_size = v;
		else if (k == "file_name")this.__file_name = v;
		else if (k == "content")this.__content = v;
		else if (k == "content_sz")this.__content_sz = v;
		else if (k == "caret")this.__caret = v;
		else if (k == "find_ident")this.__find_ident = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "tab_size")return this.__tab_size;
		else if (k == "file_name")return this.__file_name;
		else if (k == "content")return this.__content;
		else if (k == "content_sz")return this.__content_sz;
		else if (k == "caret")return this.__caret;
		else if (k == "find_ident")return this.__find_ident;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Bayrell.Lang.CoreParser";
	},
});
Object.assign(Bayrell.Lang.CoreParser, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.CoreParser,
{
	/**
	 * Reset parser
	 */
	reset: function(parser)
	{
		var _v0 = use("Bayrell.Lang.Caret");
		return parser.copy(use("Runtime.Dict").create({"caret":new _v0(use("Runtime.Dict").create({})),"token":null}));
	},
	/**
	 * Set content
	 */
	setContent: function(parser,content)
	{
		var _v0 = use("Runtime.rs");
		return parser.copy(use("Runtime.Dict").create({"content":content,"content_sz":_v0.strlen(content)}));
	},
	/**
	 * Parse file and convert to BaseOpCode
	 */
	parse: function(parser,content)
	{
		parser = this.reset(parser);
		parser = this.setContent(parser, content);
		while (parser.caret.pos < parser.content_sz)
		{
			parser = parser.constructor.nextToken(parser);
		}
		return parser;
	},
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
		return "Runtime.CoreStruct";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
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
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Bayrell.Lang.CoreParser);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.CoreParser = Bayrell.Lang.CoreParser;