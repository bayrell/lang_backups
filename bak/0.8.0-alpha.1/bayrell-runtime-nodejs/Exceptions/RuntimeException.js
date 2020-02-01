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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Exceptions == 'undefined') Runtime.Exceptions = {};
Runtime.Exceptions.ClassException = class extends Error
{ 
	_init(){}
	static getCurrentClassName(){ return "Runtime.Exceptions.ClassException"; }
}
const ClassException = Runtime.Exceptions.ClassException;
use.add(Runtime.Exceptions.ClassException);
Runtime.Exceptions.RuntimeException = function(message,code,context,prev)
{
	use("Error").call(this, message, code, prev);
	Error.captureStackTrace(this, this.constructor);
	this.error_str = message;
	this.error_code = code;
	this.context = context;
	this.prev = prev;
	this.updateError();
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(use("Error").prototype);
Runtime.Exceptions.RuntimeException.prototype.constructor = Runtime.Exceptions.RuntimeException;
Object.assign(Runtime.Exceptions.RuntimeException.prototype,
{
	getPreviousException: function()
	{
		return this.prev;
	},
	getErrorMessage: function()
	{
		return this.error_message;
	},
	getErrorString: function()
	{
		return this.error_str;
	},
	getErrorCode: function()
	{
		return this.error_code;
	},
	getFileName: function()
	{
		
		return this.error_file;
	},
	getErrorLine: function()
	{
		
		return this.error_line;
	},
	getErrorPos: function()
	{
		return this.error_pos;
	},
	toString: function()
	{
		return this.buildMessage();
	},
	buildMessage: function()
	{
		var error_str = this.error_str;
		var file = this.getFileName();
		var line = this.getErrorLine();
		var pos = this.getErrorPos();
		if (line != -1)
		{
			error_str += use("Runtime.rtl").toString(" at Ln:" + use("Runtime.rtl").toString(line) + use("Runtime.rtl").toString(((pos != "") ? ", Pos:" + use("Runtime.rtl").toString(pos) : "")));
		}
		if (file != "")
		{
			error_str += use("Runtime.rtl").toString(" in file:'" + use("Runtime.rtl").toString(file) + use("Runtime.rtl").toString("'"));
		}
		return error_str;
	},
	updateError: function()
	{
		this.error_message = this.buildMessage();
	},
	/**
	 * Returns trace
	 */
	getTraceStr: function()
	{
	},
	_init: function()
	{
		this.context = null;
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = -1;
		this.error_pos = -1;
		use("Error").prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, use("Error"));
Object.assign(Runtime.Exceptions.RuntimeException,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Exceptions";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
	getParentClassName: function()
	{
		return "Error";
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
use.add(Runtime.Exceptions.RuntimeException);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.RuntimeException = Runtime.Exceptions.RuntimeException;