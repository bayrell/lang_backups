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
Bayrell.Lang.Exceptions.ParserExpected = function(__ctx, s, caret, file, context, prev)
{
	var __v0 = use("Bayrell.Lang.LangConstant");
	use("Bayrell.Lang.Exceptions.ParserError").call(this, __ctx, s + use("Runtime.rtl").toString(" expected"), caret, file, __v0.ERROR_PARSER_EXPECTED, context, prev);
};
Bayrell.Lang.Exceptions.ParserExpected.prototype = Object.create(use("Bayrell.Lang.Exceptions.ParserError").prototype);
Bayrell.Lang.Exceptions.ParserExpected.prototype.constructor = Bayrell.Lang.Exceptions.ParserExpected;
Object.assign(Bayrell.Lang.Exceptions.ParserExpected.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.Exceptions.ParserExpected"))
		{
		}
		use("Bayrell.Lang.Exceptions.ParserError").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		use("Bayrell.Lang.Exceptions.ParserError").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return use("Bayrell.Lang.Exceptions.ParserError").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Bayrell.Lang.Exceptions.ParserExpected";
	},
});
Object.assign(Bayrell.Lang.Exceptions.ParserExpected, use("Bayrell.Lang.Exceptions.ParserError"));
Object.assign(Bayrell.Lang.Exceptions.ParserExpected,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserExpected";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.Exceptions.ParserError";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.Exceptions.ParserExpected",
			"name": "Bayrell.Lang.Exceptions.ParserExpected",
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
});use.add(Bayrell.Lang.Exceptions.ParserExpected);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.Exceptions == undefined) module.exports.Bayrell.Lang.Exceptions = {};
module.exports.Bayrell.Lang.Exceptions.ParserExpected = Bayrell.Lang.Exceptions.ParserExpected;