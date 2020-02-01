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
Runtime.AsyncThread = function()
{
	use("Runtime.CoreObject").call(this);
	this.reset();
};
Runtime.AsyncThread.prototype = Object.create(use("Runtime.CoreObject").prototype);
Runtime.AsyncThread.prototype.constructor = Runtime.AsyncThread;
Object.assign(Runtime.AsyncThread.prototype,
{
	/**
	 * Reset AsyncThread
	 */
	reset: function()
	{
		var _v0 = use("Runtime.Vector");
		this.pos = "0";
		this.res = null;
		this.err = null;
		this.run_stack = new _v0();
		this.catch_stack = new _v0();
	},
	/**
	 * Returns current position
	 * @return string
	 */
	current: function()
	{
		return this.pos;
	},
	/**
	 * Returns result of the prev function
	 * @return mixed
	 */
	result: function()
	{
		return this.res;
	},
	/**
	 * Returns error of the prev function
	 * @return mixed
	 */
	getError: function()
	{
		return this.err;
	},
	/**
	 * Clear error
	 */
	clearError: function()
	{
		this.err = null;
	},
	/**
	 * Resolve thread with result
	 * @param mixed res
	 */
	resolve: function(res)
	{
		this.res = res;
		this.next();
		this.forward();
		return "resolve";
	},
	/**
	 * Set position
	 * @param string pos
	 */
	jump: function(pos)
	{
		this.pos = pos;
		return "jump";
	},
	/**
	 * Resolve Exception
	 * @param var res
	 */
	error: function(err)
	{
		if (this.catch_stack.count() == 0)
		{
			this.err = err;
			this.next(true);
		}
		else
		{
			this.err = err;
			this.pos = this.catch_stack.pop();
		}
		this.forward();
		return "error";
	},
	/**
	 * Push catch
	 * @param string pos
	 */
	catchPush: function(pos)
	{
		this.catch_stack.push(pos);
	},
	/**
	 * Pop catch
	 */
	catchPop: function()
	{
		this.catch_stack.pop();
	},
	/**
	 * Call next
	 */
	next: function(is_error)
	{
		if (is_error == undefined) is_error = false;
		if (this.run_stack.count() == 0)
		{
			this.pos = "-1";
			return "";
		}
		var task = this.run_stack.pop();
		/* Restore pos */
		this.f = task.f;
		this.pos = task.pos;
		this.catch_stack = task.catch_stack;
		if (is_error)
		{
			if (this.catch_stack.count() == 0)
			{
				this.pos = "-1";
			}
			else
			{
				this.pos = this.catch_stack.pop();
			}
		}
		return "next";
	},
	/**
	 * Forward call
	 */
	forward: function()
	{
		var _v0 = use("Runtime.rtl");
		var is_browser = _v0.isBrowser();
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
	run: function(f)
	{
		this.pos = "0";
		this.f = f;
		this.forward();
	},
	/**
	 * Call if thread is ended
	 */
	end: function()
	{
		this.pos = "-1";
		return "end";
	},
	_init: function()
	{
		this.f = null;
		this.pos = "0";
		this.res = null;
		this.err = null;
		this.run_stack = null;
		this.catch_stack = null;
		use("Runtime.CoreObject").prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.AsyncThread";
	},
});
Object.assign(Runtime.AsyncThread, use("Runtime.CoreObject"));
Object.assign(Runtime.AsyncThread,
{
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
use.add(Runtime.AsyncThread);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.AsyncThread = Runtime.AsyncThread;