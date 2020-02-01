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
Runtime.ContextObject = function(context)
{
	use("Runtime.CoreObject").call(this);
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
	context: function()
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
	translate: function(message,params,locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		return this._context.translate(message, params, locale);
	},
	_init: function()
	{
		this._context = null;
		use("Runtime.CoreObject").prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.ContextObject";
	},
});
Object.assign(Runtime.ContextObject, use("Runtime.CoreObject"));
Object.assign(Runtime.ContextObject,
{
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
use.add(Runtime.ContextObject);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.ContextObject = Runtime.ContextObject;