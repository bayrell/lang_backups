"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Parser Library.
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell.Lang.Exceptions == 'undefined') Bayrell.Lang.Exceptions = {};
Bayrell.Lang.Exceptions.ParserError = function(s,caret,file,code,context,prev)
{
	use("Bayrell.Lang.Exceptions.ParserUnknownError").call(this, s, code, context, prev);
	this.error_line = caret.y + 1;
	this.error_pos = caret.x + 1;
	this.error_file = file;
	this.updateError();
};
Bayrell.Lang.Exceptions.ParserError.prototype = Object.create(use("Bayrell.Lang.Exceptions.ParserUnknownError").prototype);
Bayrell.Lang.Exceptions.ParserError.prototype.constructor = Bayrell.Lang.Exceptions.ParserError;
Object.assign(Bayrell.Lang.Exceptions.ParserError.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserError, use("Bayrell.Lang.Exceptions.ParserUnknownError"));
Object.assign(Bayrell.Lang.Exceptions.ParserError,
{
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserUnknownError";
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
use.add(Bayrell.Lang.Exceptions.ParserError);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.Exceptions == undefined) module.exports.Bayrell.Lang.Exceptions = {};
module.exports.Bayrell.Lang.Exceptions.ParserError = Bayrell.Lang.Exceptions.ParserError;