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
Runtime.Exceptions.ClassException = function()
{
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);
}
Runtime.Exceptions.ClassException.prototype = Object.create(Error.prototype);
Runtime.Exceptions.ClassException.prototype.constructor = Runtime.Exceptions.ClassException;
Object.assign(Runtime.Exceptions.ClassException.prototype,
{
	_init: function(){},
	getClassName: function(){ return "Runtime.Exceptions.ClassException"; },
});
Object.assign(Runtime.Exceptions.ClassException,
{
	getCurrentNamespace: function(){ return "Runtime.Exceptions"; },
	getCurrentClassName: function(){ return "Runtime.Exceptions.ClassException"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime.Exceptions.ClassException);
Runtime.Exceptions.RuntimeException = function(message, code, context, prev)
{
	use("Runtime.Exceptions.ClassException").call(this, message, code, prev);
	this._init();
	this.error_str = message;
	this.error_code = code;
	this.context = context;
	this.prev = prev;
	this.updateError();
};
Runtime.Exceptions.RuntimeException.prototype = Object.create(use("Runtime.Exceptions.ClassException").prototype);
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
	_init: function(/*__ctx*/)
	{
		this.context = null;
		this.prev = null;
		this.error_message = "";
		this.error_str = "";
		this.error_code = 0;
		this.error_file = "";
		this.error_line = -1;
		this.error_pos = -1;
		use("Runtime.Exceptions.ClassException").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Exceptions.RuntimeException"))
		{
			this.context = o.context;
			this.prev = o.prev;
			this.error_message = o.error_message;
			this.error_str = o.error_str;
			this.error_code = o.error_code;
			this.error_file = o.error_file;
			this.error_line = o.error_line;
			this.error_pos = o.error_pos;
		}
		use("Runtime.Exceptions.ClassException").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "context")this.context = v;
		else if (k == "prev")this.prev = v;
		else if (k == "error_message")this.error_message = v;
		else if (k == "error_str")this.error_str = v;
		else if (k == "error_code")this.error_code = v;
		else if (k == "error_file")this.error_file = v;
		else if (k == "error_line")this.error_line = v;
		else if (k == "error_pos")this.error_pos = v;
		else use("Runtime.Exceptions.ClassException").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "context")return this.context;
		else if (k == "prev")return this.prev;
		else if (k == "error_message")return this.error_message;
		else if (k == "error_str")return this.error_str;
		else if (k == "error_code")return this.error_code;
		else if (k == "error_file")return this.error_file;
		else if (k == "error_line")return this.error_line;
		else if (k == "error_pos")return this.error_pos;
		return use("Runtime.Exceptions.ClassException").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Exceptions.RuntimeException";
	},
});
Object.assign(Runtime.Exceptions.RuntimeException, use("Runtime.Exceptions.ClassException"));
Object.assign(Runtime.Exceptions.RuntimeException,
{
	/* ======================= Class Init Functions ======================= */
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
		return "Runtime.Exceptions.ClassException";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Exceptions.RuntimeException",
			"name": "Runtime.Exceptions.RuntimeException",
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
			a.push("context");
			a.push("prev");
			a.push("error_message");
			a.push("error_str");
			a.push("error_code");
			a.push("error_file");
			a.push("error_line");
			a.push("error_pos");
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
});use.add(Runtime.Exceptions.RuntimeException);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Exceptions == undefined) module.exports.Runtime.Exceptions = {};
module.exports.Runtime.Exceptions.RuntimeException = Runtime.Exceptions.RuntimeException;