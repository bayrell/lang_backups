"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Session = function()
{
	use("Runtime.CoreProvider").apply(this, arguments);
};
Runtime.Session.prototype = Object.create(use("Runtime.CoreProvider").prototype);
Runtime.Session.prototype.constructor = Runtime.Session;
Object.assign(Runtime.Session.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__user_id = 0;
		if (a.indexOf("user_id") == -1)Object.defineProperty(this, "user_id",{get:function(){return this.__user_id;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("user_id");}});
		this.__session_key = "";
		if (a.indexOf("session_key") == -1)Object.defineProperty(this, "session_key",{get:function(){return this.__session_key;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("session_key");}});
		use("Runtime.CoreProvider").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Session"))
		{
			this.__user_id = o.__user_id;
			this.__session_key = o.__session_key;
		}
		use("Runtime.CoreProvider").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "user_id")this.__user_id = v;
		else if (k == "session_key")this.__session_key = v;
		else use("Runtime.CoreProvider").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "user_id")return this.__user_id;
		else if (k == "session_key")return this.__session_key;
		return use("Runtime.CoreProvider").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Session";
	},
});
Object.assign(Runtime.Session, use("Runtime.CoreProvider"));
Object.assign(Runtime.Session,
{
	isApp: function(s)
	{
		return s.user_id < 0;
	},
	isUser: function(s)
	{
		return s.user_id > 0;
	},
	isValid: function(s)
	{
		return s.user_id != 0 && s.session_key != 0;
	},
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Session";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreProvider";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("user_id");
			a.push("session_key");
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
use.add(Runtime.Session);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Session = Runtime.Session;