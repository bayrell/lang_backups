"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('./rtl.js');
var AsyncTask = require('./AsyncTask.js');
var CoreObject = require('./CoreObject.js');
var Vector = require('./Vector.js');
class AsyncThread extends CoreObject{
	getClassName(){return "Runtime.AsyncThread";}
	static getParentClassName(){return "CoreObject";}
	_init(){
		super._init();
		this._jump = 0;
		this._res = null;
		this._err = null;
		this._f = null;
		this._catch_stack = null;
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.reset();
	}
	/**
	 * Reset AsyncThread
	 */
	reset(){
		this._jump = 0;
		this._res = null;
		this._err = null;
		this._f = new Vector();
		this._catch_stack = new Vector();
	}
	/**
	 * Set jump position
	 * @param int jump
	 */
	jump(pos){
		this._jump = pos;
		return "forward";
	}
	/**
	 * Returns current jump position
	 * @return int
	 */
	current(){
		return this._jump;
	}
	/**
	 * Returns result of the prev function
	 * @return mixed
	 */
	getResult(){
		return this._res;
	}
	/**
	 * Returns error of the prev function
	 * @return mixed
	 */
	getError(){
		return this._err;
	}
	/**
	 * Resolve thread with result
	 * @param mixed res
	 */
	resolve(res){
		this._res = res;
		this.next();
		return "resolve";
	}
	/**
	 * Resolve Exception
	 * @param mixed res
	 */
	error(err){
		if (this._catch_stack.count() == 0){
			this._err = err;
			this.next(true);
		}
		else {
			this._err = err;
			this._jump = this._catch_stack.pop();
			this.forward();
		}
		return "error";
	}
	/**
	 * Push catch
	 * @param string jump
	 */
	catchPush(jump){
		this._catch_stack.push(jump);
	}
	/**
	 * Pop catch
	 */
	catchPop(){
		this._catch_stack.pop();
	}
	/**
	 * Call next
	 */
	next(is_error){
		if (is_error == undefined) is_error=false;
		if (this._f.count() == 0){
			return ;
		}
		this._catch_stack.clear();
		var task = this._f.pop();
		/* Restore jump */
		this._jump = task.jump;
		if (is_error){
			this._jump = -1;
		}
		this.forward();
	}
	/**
	 * Forward call
	 */
	forward(){
		
		setTimeout( ()=>{ this.call(); }, 1);
	}
	/**
	 * Call current
	 */
	call(){
		if (this._f.count() == 0){
			this.end();
			return ;
		}
		var task = this._f.last();
		/* Call task function */
		var res = null;
		try{
			res = rtl.call(task.f, (new Vector()).push(this));
		}catch(_the_exception){
			if (_the_exception instanceof Error){
				var e = _the_exception;
				res = null;
				this.error(e);
			}
			else { throw _the_exception; }
		}
		/* If return next async function */
		if (res instanceof Function){
			var task2 = new AsyncTask();
			task2.jump = this._jump;
			task2.f = res;
			this.forward();
		}
		else if (res == "forward"){
			this.forward();
		}
	}
	/**
	 * Run async await
	 */
	run(f){
		this.reset();
		var task = new AsyncTask();
		task.jump = 0;
		task.f = f;
		this.forward();
	}
	/**
	 * Call if thread is ended
	 */
	end(){
	}
}
module.exports = AsyncThread;