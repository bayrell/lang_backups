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
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.KeyNotFound = function(key,context,prev)
{
	var _v0 = use("Runtime.RuntimeConstant");
	/* RuntimeUtils::translate("ERROR_KEY_NOT_FOUND", null, "", context),  */
	use("Runtime.Exceptions.RuntimeException").call(this, "Key '" + use("Runtime.rtl").toString(key) + use("Runtime.rtl").toString("' not found"), _v0.ERROR_KEY_NOT_FOUND, context, prev);
};
Runtime.Exceptions.KeyNotFound.prototype = Object.create(use("Runtime.Exceptions.RuntimeException").prototype);
Runtime.Exceptions.KeyNotFound.prototype.constructor = Runtime.Exceptions.KeyNotFound;
Object.assign(Runtime.Exceptions.KeyNotFound.prototype,
{
	getClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
});
Object.assign(Runtime.Exceptions.KeyNotFound, use("Runtime.Exceptions.RuntimeException"));
Object.assign(Runtime.Exceptions.KeyNotFound,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.KeyNotFound";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
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
use.add(Runtime.Exceptions.KeyNotFound);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.KeyNotFound = Runtime.Exceptions.KeyNotFound;