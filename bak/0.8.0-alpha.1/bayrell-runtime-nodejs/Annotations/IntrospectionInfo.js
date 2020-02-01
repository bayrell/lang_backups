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
Runtime.Annotations.IntrospectionInfo = function()
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Annotations.IntrospectionInfo.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Annotations.IntrospectionInfo.prototype.constructor = Runtime.Annotations.IntrospectionInfo;
Object.assign(Runtime.Annotations.IntrospectionInfo.prototype,
{
	/**
	 * Returns true if has annotations by class_name
	 * @string class_name
	 * @return bool
	 */
	filterAnnotations: function(class_name)
	{
		var _v0 = use("Runtime.lib");
		if (this.annotations == null)
		{
			return null;
		}
		return this.annotations.filter(_v0.isInstance(class_name)).toCollection();
	},
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__class_name = "";
		if (a.indexOf("class_name") == -1)Object.defineProperty(this, "class_name",{get:function(){return this.__class_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("class_name");}});
		this.__kind = "";
		if (a.indexOf("kind") == -1)Object.defineProperty(this, "kind",{get:function(){return this.__kind;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("kind");}});
		this.__name = "";
		if (a.indexOf("name") == -1)Object.defineProperty(this, "name",{get:function(){return this.__name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("name");}});
		this.__annotations = null;
		if (a.indexOf("annotations") == -1)Object.defineProperty(this, "annotations",{get:function(){return this.__annotations;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("annotations");}});
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Annotations.IntrospectionInfo"))
		{
			this.__class_name = o.__class_name;
			this.__kind = o.__kind;
			this.__name = o.__name;
			this.__annotations = o.__annotations;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "class_name")this.__class_name = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "name")this.__name = v;
		else if (k == "annotations")this.__annotations = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.__class_name;
		else if (k == "kind")return this.__kind;
		else if (k == "name")return this.__name;
		else if (k == "annotations")return this.__annotations;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Annotations.IntrospectionInfo";
	},
});
Object.assign(Runtime.Annotations.IntrospectionInfo, use("Runtime.CoreStruct"));
Object.assign(Runtime.Annotations.IntrospectionInfo,
{
	ITEM_CLASS: "class",
	ITEM_FIELD: "field",
	ITEM_METHOD: "method",
	getCurrentNamespace: function()
	{
		return "Runtime.Annotations";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Annotations.IntrospectionInfo";
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
			a.push("kind");
			a.push("name");
			a.push("annotations");
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
use.add(Runtime.Annotations.IntrospectionInfo);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Annotations == undefined) module.exports.Runtime.Annotations = {};
module.exports.Runtime.Annotations.IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;