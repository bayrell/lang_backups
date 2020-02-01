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
Runtime.AsyncThread = function(__ctx)
{
	use("Runtime.CoreObject").call(this, __ctx);
	this.reset(__ctx);
};
Runtime.AsyncThread.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.AsyncThread.prototype.constructor = Runtime.AsyncThread;
Object.assign(Runtime.AsyncThread.prototype,
{
	/**
	 * Reset AsyncThread
	 */
	reset: function(__ctx)
	{
		this.pos = "0";
		this.res = null;
		this.err = null;
		var __v0 = use("Runtime.Vector");
		this.run_stack = new __v0(__ctx);
		var __v0 = use("Runtime.Vector");
		this.catch_stack = new __v0(__ctx);
	},
	/**
	 * Returns current position
	 * @return string
	 */
	current: function(__ctx)
	{
		return this.pos;
	},
	/**
	 * Returns result of the prev function
	 * @return mixed
	 */
	result: function(__ctx)
	{
		return this.res;
	},
	/**
	 * Returns error of the prev function
	 * @return mixed
	 */
	getError: function(__ctx)
	{
		return this.err;
	},
	/**
	 * Clear error
	 */
	clearError: function(__ctx)
	{
		this.err = null;
	},
	/**
	 * Resolve thread with result
	 * @param mixed res
	 */
	resolve: function(__ctx, res)
	{
		this.res = res;
		this.next(__ctx);
		this.forward(__ctx);
		return "resolve";
	},
	/**
	 * Set position
	 * @param string pos
	 */
	jump: function(__ctx, pos)
	{
		this.pos = pos;
		return "jump";
	},
	/**
	 * Resolve Exception
	 * @param var res
	 */
	error: function(__ctx, err)
	{
		if (this.catch_stack.count(__ctx) == 0)
		{
			this.err = err;
			this.next(__ctx, true);
		}
		else
		{
			this.err = err;
			this.pos = this.catch_stack.pop(__ctx);
		}
		this.forward(__ctx);
		return "error";
	},
	/**
	 * Push catch
	 * @param string pos
	 */
	catchPush: function(__ctx, pos)
	{
		this.catch_stack.push(__ctx, pos);
	},
	/**
	 * Pop catch
	 */
	catchPop: function(__ctx)
	{
		this.catch_stack.pop(__ctx);
	},
	/**
	 * Call next
	 */
	next: function(__ctx, is_error)
	{
		if (is_error == undefined) is_error = false;
		if (this.run_stack.count(__ctx) == 0)
		{
			this.pos = "-1";
			return "";
		}
		var task = this.run_stack.pop(__ctx);
		/* Restore pos */
		this.f = task.f;
		this.pos = task.pos;
		this.catch_stack = task.catch_stack;
		if (is_error)
		{
			if (this.catch_stack.count(__ctx) == 0)
			{
				this.pos = "-1";
			}
			else
			{
				this.pos = this.catch_stack.pop(__ctx);
			}
		}
		return "next";
	},
	/**
	 * Forward call
	 */
	forward: function(__ctx)
	{
		var __v0 = use("Runtime.rtl");
		var is_browser = __v0.isBrowser(__ctx);
		var _rtl; if (is_browser) _rtl = Runtime.rtl; else _rtl = rtl;
		var _AsyncTask; if (is_browser) _AsyncTask = Runtime.AsyncTask; else _AsyncTask = AsyncTask;
		var _Vector; if (is_browser) _Vector = Runtime.Vector; else _Vector = Vector;
		setTimeout( 
			()=>{
				if (this.pos == "-1"){
					if (this.err != null){
						throw this.err;
					}
					return;
				}
				
				/* Call task function */
				var res = null;
				try{
					res = _rtl.apply(this.f, [this]);
				}
				catch (e){
					res = null;
					this.error(e);
				}
				
				/* If can forward */
				if (res != null){
				
					/* If return next async function */
					if (res instanceof Function){
						var task = new _AsyncTask();
						task.f = this.f;
						task.pos = this.pos;
						task.catch_stack = this.catch_stack;
						this.run_stack.push(task);
						this.catch_stack = new _Vector();
						this.pos = "0";
						this.f = res;
					}
					
					/* Call forward */
					if (res != "error" && res != "resolve"){
						this.forward();
					}
				}
			}, 1);
		return "forward";
	},
	/**
	 * Run async await
	 */
	run: function(__ctx, f)
	{
		this.pos = "0";
		this.f = f;
		this.forward(__ctx);
	},
	/**
	 * Call if thread is ended
	 */
	end: function(__ctx)
	{
		this.pos = "-1";
		return "end";
	},
	_init: function(__ctx)
	{
		this.f = null;
		this.pos = "0";
		this.res = null;
		this.err = null;
		this.run_stack = null;
		this.catch_stack = null;
		use("Runtime.CoreObject").prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.AsyncThread"))
		{
			this.f = o.f;
			this.pos = o.pos;
			this.res = o.res;
			this.err = o.err;
			this.run_stack = o.run_stack;
			this.catch_stack = o.catch_stack;
		}
		use("Runtime.CoreObject").prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "f")this.f = v;
		else if (k == "pos")this.pos = v;
		else if (k == "res")this.res = v;
		else if (k == "err")this.err = v;
		else if (k == "run_stack")this.run_stack = v;
		else if (k == "catch_stack")this.catch_stack = v;
		else use("Runtime.CoreObject").prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "f")return this.f;
		else if (k == "pos")return this.pos;
		else if (k == "res")return this.res;
		else if (k == "err")return this.err;
		else if (k == "run_stack")return this.run_stack;
		else if (k == "catch_stack")return this.catch_stack;
		return use("Runtime.CoreObject").prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.AsyncThread";
	},
});
Object.assign(Runtime.AsyncThread, use("Runtime.CoreObject"));
Object.assign(Runtime.AsyncThread,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.AsyncThread";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreObject";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.AsyncThread",
			"name": "Runtime.AsyncThread",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("f");
			a.push("pos");
			a.push("res");
			a.push("err");
			a.push("run_stack");
			a.push("catch_stack");
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
});use.add(Runtime.AsyncThread);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.AsyncThread = Runtime.AsyncThread;