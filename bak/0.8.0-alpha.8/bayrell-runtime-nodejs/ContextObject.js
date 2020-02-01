"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime == 'undefined') Runtime = {};
/**
 * Deprecated
 */
Runtime.ContextObject = function(__ctx, context)
{
	use("Runtime.CoreObject").call(this, __ctx);
	this._context = context;
};
Runtime.ContextObject.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.ContextObject.prototype.constructor = Runtime.ContextObject;
Object.assign(Runtime.ContextObject.prototype,
{
	/**
	 * Returns context
	 *
	 * @return ContextInterface 
	 */
	context: function(__ctx)
	{
		return this._context;
	},
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(__ctx, message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		return this._context.translate(__ctx, message, params, locale);
	},
	_init: function(__ctx)
	{
		this._context = null;
		use("Runtime.CoreObject").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.ContextObject"))
		{
			this._context = o._context;
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "_context")this._context = v;
		else use("Runtime.CoreObject").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "_context")return this._context;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.ContextObject";
	},
});
Object.assign(Runtime.ContextObject, use("Runtime.CoreObject"));
Object.assign(Runtime.ContextObject,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.ContextObject";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.ContextObject",
			"name": "Runtime.ContextObject",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("_context");
		}
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
});use.add(Runtime.ContextObject);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.ContextObject = Runtime.ContextObject;