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
Bayrell.Lang.Exceptions.ParserError = function(__ctx, s, caret, file, code, context, prev)
{
	use("Bayrell.Lang.Exceptions.ParserUnknownError").call(this, __ctx, s, code, context, prev);
	this.error_line = caret.y + 1;
	this.error_pos = caret.x + 1;
	this.error_file = file;
	this.updateError(__ctx);
};
Bayrell.Lang.Exceptions.ParserError.prototype = Object.create(use("Bayrell.Lang.Exceptions.ParserUnknownError").prototype);
Bayrell.Lang.Exceptions.ParserError.prototype.constructor = Bayrell.Lang.Exceptions.ParserError;
Object.assign(Bayrell.Lang.Exceptions.ParserError.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.Exceptions.ParserError"))
		{
		}
		use("Bayrell.Lang.Exceptions.ParserUnknownError").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Bayrell.Lang.Exceptions.ParserUnknownError").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Bayrell.Lang.Exceptions.ParserUnknownError").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserError, use("Bayrell.Lang.Exceptions.ParserUnknownError"));
Object.assign(Bayrell.Lang.Exceptions.ParserError,
{
	/* ======================= Class Init Functions ======================= */
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Exceptions.ParserError",
			"name": "Bayrell.Lang.Exceptions.ParserError",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.Exceptions.ParserError);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.Exceptions == undefined) module.exports.Bayrell.Lang.Exceptions = {};
module.exports.Bayrell.Lang.Exceptions.ParserError = Bayrell.Lang.Exceptions.ParserError;