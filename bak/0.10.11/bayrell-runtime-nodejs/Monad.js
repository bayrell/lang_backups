"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Monad = function(ctx, value, err)
{
	if (err == undefined) err = null;
	this.val = value;
	this.err = err;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(ctx, attr_name)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var __v0 = use("Runtime.Monad");
		var __v1 = use("Runtime.rtl");
		return new __v0(ctx, __v1.attr(ctx, this.val, use("Runtime.Collection").from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(ctx, f)
	{
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		var __v0 = use("Runtime.Exceptions.RuntimeException");
		try
		{
			res = f(ctx, this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Runtime.Monad");
		return new __v0(ctx, res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: async function(ctx, f)
	{
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		var __v0 = use("Runtime.Exceptions.RuntimeException");
		try
		{
			res = await f(ctx, this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof __v0)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Runtime.Monad");
		return Promise.resolve(new __v0(ctx, res, err));
	},
	/**
	 * Call method on value
	 */
	callMethod: function(ctx, f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		var __v1 = use("Runtime.Exceptions.RuntimeException");
		try
		{
			var __v0 = use("Runtime.rtl");
			res = __v0.apply(ctx, f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof __v1)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Runtime.Monad");
		return new __v0(ctx, res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: async function(ctx, f, args)
	{
		if (args == undefined) args = null;
		if (this.val === null || this.err != null)
		{
			return Promise.resolve(this);
		}
		var res = null;
		var err = null;
		var __v1 = use("Runtime.Exceptions.RuntimeException");
		try
		{
			var __v0 = use("Runtime.rtl");
			res = await __v0.applyAsync(ctx, f, args);
		}
		catch (_ex)
		{
			if (_ex instanceof __v1)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		var __v0 = use("Runtime.Monad");
		return Promise.resolve(new __v0(ctx, res, err));
	},
	/**
	 * Call function on monad
	 */
	monad: function(ctx, f)
	{
		return f(ctx, this);
	},
	/**
	 * Returns value
	 */
	value: function(ctx)
	{
		if (this.err != null)
		{
			throw this.err
		}
		if (this.val === null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function(ctx)
	{
		this.val = null;
		this.err = null;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Monad";
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Monad",
			"name": "Runtime.Monad",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("val");
			a.push("err");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "val") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "err") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"t": "var",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Monad);
module.exports = Runtime.Monad;