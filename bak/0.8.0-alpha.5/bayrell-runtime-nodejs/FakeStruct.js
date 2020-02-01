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
Runtime.FakeStruct = function(obj,__ctx)
{
	use("Runtime.CoreObject").call(this, __ctx);
	var __v0 = use("Runtime.Dict");
	if (!(obj instanceof __v0))
	{
		var _Dict = use("Runtime.Dict");
			if (typeof obj == "object") obj = _Dict.create(obj);
	}
	if (obj != null)
	{
		var __v0 = use("Runtime.rtl");
		obj.each(__v0.method(this, "assignValue", __ctx), __ctx);
		this.initData(null, obj, __ctx);
	}
	if (this.__uq__ == undefined || this.__uq__ == null) this.__uq__ = Symbol();
};
Runtime.FakeStruct.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.FakeStruct.prototype.constructor = Runtime.FakeStruct;
Object.assign(Runtime.FakeStruct.prototype,
{
	/**
	 * Init struct data
	 */
	initData: function(old,changed,__ctx)
	{
		if (changed == undefined) changed = null;
	},
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return FakeStruct
	 */
	copy: function(obj,__ctx)
	{
		if (obj == undefined) obj = null;
		var _Dict = use("Runtime.Dict");
		if (obj == null){}
		else if (obj instanceof _Dict)
		{
			obj.forEach
			(
				(value, key, m) =>
				{
					this[key] = value;
				}
			);
		}
		else
		{
			for (var key in obj) this[key] = obj[key];
		}
		
		this.initData(this, obj);
		
		return this;
		return this;
	},
	/**
	 * Clone this struct with same values
	 * @param Map obj = null
	 * @return FakeStruct
	 */
	clone: function(fields,__ctx)
	{
		if (fields == undefined) fields = null;
		var __v0 = use("Runtime.Map");
		var obj = new __v0();
		if (fields != null)
		{
			fields.each((field_name,__ctx) => 
			{
				var __v0 = use("Runtime.rtl");
				obj.set(field_name, __v0.clone(this.takeValue(field_name, __ctx), __ctx), __ctx);
			}, __ctx);
		}
		else
		{
			var __v0 = use("Runtime.RuntimeUtils");
			var names = __v0.getVariablesNames(this.getClassName(__ctx), __ctx);
			for (var i = 0;i < names.count(__ctx);i++)
			{
				var field_name = names.item(i, __ctx);
				var __v0 = use("Runtime.rtl");
				obj.set(field_name, __v0.clone(this.takeValue(field_name, __ctx), __ctx), __ctx);
			}
		}
		/* Return object */
		var __v0 = use("Runtime.rtl");
		var res = __v0.newInstance(this.getClassName(__ctx), use("Runtime.Collection").create([obj.toDict(__ctx)]), __ctx);
		return res;
	},
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fn f
	 * @return FakeStruct
	 */
	map: function(field_name,f,__ctx)
	{
		var __v0 = use("Runtime.Map");
		return this.copy((new __v0()).set(field_name, f(this.takeValue(field_name, __ctx), __ctx), __ctx).toDict(__ctx), __ctx);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.FakeStruct"))
		{
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		use("Runtime.CoreObject").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.FakeStruct";
	},
});
Object.assign(Runtime.FakeStruct, use("Runtime.CoreObject"));
Object.assign(Runtime.FakeStruct,
{
	/**
	 * Returns new instance
	 */
	newInstance: function(items,__ctx)
	{
		var __v0 = use("Runtime.rtl");
		return __v0.newInstance(this.getCurrentClassName(__ctx), use("Runtime.Collection").create([items]), __ctx);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.FakeStruct";
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
			"class_name": "Runtime.FakeStruct",
			"name": "Runtime.FakeStruct",
			"annotations": Collection.create([
			]),
		});
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
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
	__implements__:
	[
		use(""),
		use("Runtime.Interfaces.SerializeInterface"),
	],
});use.add(Runtime.FakeStruct);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.FakeStruct = Runtime.FakeStruct;