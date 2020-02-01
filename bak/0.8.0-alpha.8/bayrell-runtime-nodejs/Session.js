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
Runtime.Session = function(__ctx)
{
	use("Runtime.CoreProvider").apply(this, arguments);
};
Runtime.Session.prototype = Object.create(use("Runtime.CoreProvider").prototype);
Runtime.Session.prototype.constructor = Runtime.Session;
Object.assign(Runtime.Session.prototype,
{
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__user_id = 0;
		if (a.indexOf("user_id") == -1) defProp(this, "user_id");
		this.__session_key = "";
		if (a.indexOf("session_key") == -1) defProp(this, "session_key");
		use("Runtime.CoreProvider").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.Session"))
		{
			this.__user_id = o.__user_id;
			this.__session_key = o.__session_key;
		}
		use("Runtime.CoreProvider").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "user_id")this.__user_id = v;
		else if (k == "session_key")this.__session_key = v;
		else use("Runtime.CoreProvider").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "user_id")return this.__user_id;
		else if (k == "session_key")return this.__session_key;
		return use("Runtime.CoreProvider").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Session";
	},
});
Object.assign(Runtime.Session, use("Runtime.CoreProvider"));
Object.assign(Runtime.Session,
{
	isApp: function(__ctx, s)
	{
		return s.user_id < 0;
	},
	isUser: function(__ctx, s)
	{
		return s.user_id > 0;
	},
	isValid: function(__ctx, s)
	{
		return s.user_id != 0 && s.session_key != 0;
	},
	/* ======================= Class Init Functions ======================= */
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
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Session",
			"name": "Runtime.Session",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("user_id");
			a.push("session_key");
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
});use.add(Runtime.Session);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Session = Runtime.Session;