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
Runtime.Reference = function(ref)
{
	use("Runtime.CoreObject").call(this);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject: function(obj)
	{
		var __v0 = use("Runtime.Reference");
		if (obj instanceof __v0)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this, obj);
	},
	_init: function(/*__ctx*/)
	{
		var __v0 = use("Runtime.rtl");
		this.uq = __v0.unique();
		this.ref = null;
		use("Runtime.CoreObject").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Reference"))
		{
			this.uq = o.uq;
			this.ref = o.ref;
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "uq")this.uq = v;
		else if (k == "ref")this.ref = v;
		else use("Runtime.CoreObject").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "uq")return this.uq;
		else if (k == "ref")return this.ref;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Reference";
	},
});
Object.assign(Runtime.Reference, use("Runtime.CoreObject"));
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Reference";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Reference",
			"name": "Runtime.Reference",
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
			a.push("uq");
			a.push("ref");
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
});use.add(Runtime.Reference);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Reference = Runtime.Reference;