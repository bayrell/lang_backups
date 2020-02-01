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
Runtime.AsyncTask = function()
{
	use("Runtime.CoreObject").apply(this, arguments);
};
Runtime.AsyncTask.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.AsyncTask.prototype.constructor = Runtime.AsyncTask;
Object.assign(Runtime.AsyncTask.prototype,
{
	_init: function()
	{
		this.pos = null;
		this.f = null;
		this.catch_stack = null;
		use("Runtime.CoreObject").prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.AsyncTask";
	},
});
Object.assign(Runtime.AsyncTask, use("Runtime.CoreObject"));
Object.assign(Runtime.AsyncTask,
{
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.AsyncTask";
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
use.add(Runtime.AsyncTask);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.AsyncTask = Runtime.AsyncTask;