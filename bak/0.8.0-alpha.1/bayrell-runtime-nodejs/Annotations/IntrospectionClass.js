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
if (typeof Runtime.Annotations == 'undefined') Runtime.Annotations = {};
Runtime.Annotations.IntrospectionClass = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Annotations.IntrospectionClass.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Annotations.IntrospectionClass.prototype.constructor = Runtime.Annotations.IntrospectionClass;
Object.assign(Runtime.Annotations.IntrospectionClass.prototype,
{
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__class_name = "";
		if (a.indexOf("class_name") == -1)Object.defineProperty(this, "class_name",{get:function(){return this.__class_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("class_name");}});
		this.__info = null;
		if (a.indexOf("info") == -1)Object.defineProperty(this, "info",{get:function(){return this.__info;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("info");}});
		this.__fields = null;
		if (a.indexOf("fields") == -1)Object.defineProperty(this, "fields",{get:function(){return this.__fields;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("fields");}});
		this.__methods = null;
		if (a.indexOf("methods") == -1)Object.defineProperty(this, "methods",{get:function(){return this.__methods;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("methods");}});
		this.__interfaces = null;
		if (a.indexOf("interfaces") == -1)Object.defineProperty(this, "interfaces",{get:function(){return this.__interfaces;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("interfaces");}});
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Annotations.IntrospectionClass"))
		{
			this.__class_name = o.__class_name;
			this.__info = o.__info;
			this.__fields = o.__fields;
			this.__methods = o.__methods;
			this.__interfaces = o.__interfaces;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "class_name")this.__class_name = v;
		else if (k == "info")this.__info = v;
		else if (k == "fields")this.__fields = v;
		else if (k == "methods")this.__methods = v;
		else if (k == "interfaces")this.__interfaces = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.__class_name;
		else if (k == "info")return this.__info;
		else if (k == "fields")return this.__fields;
		else if (k == "methods")return this.__methods;
		else if (k == "interfaces")return this.__interfaces;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Annotations.IntrospectionClass";
	},
});
Object.assign(Runtime.Annotations.IntrospectionClass, use("Runtime.CoreStruct"));
Object.assign(Runtime.Annotations.IntrospectionClass,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.IntrospectionClass";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("info");
			a.push("fields");
			a.push("methods");
			a.push("interfaces");
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
use.add(Runtime.Annotations.IntrospectionClass);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.IntrospectionClass = Runtime.Annotations.IntrospectionClass;