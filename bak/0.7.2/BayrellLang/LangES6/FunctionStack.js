"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var rs = require('bayrell-runtime-nodejs').rs;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
class FunctionStack extends CoreObject{
	/**
	 * Returns jump string from arr
	 * @param Vector<int> arr
	 * @return string
	 */
	static getJumpString(arr1){
		var arr2 = arr1.map((item) => {
			return rtl.toString(item);
		});
		return rs.implode(".", arr2);
	}
	/**
	 * Returns jump position
	 * @return string
	 */
	getJumpPos(){
		return FunctionStack.getJumpString(this.async_jump_pos);
	}
	/**
	 * Returns next jump position
	 * @return string
	 */
	getJumpNext(){
		var arr = this.async_jump_pos.copy();
		var sz = arr.count();
		var item = arr.item(sz - 1);
		arr.set(sz - 1, item + 1);
		return FunctionStack.getJumpString(arr);
	}
	/**
	 * Increments jump position
	 */
	jumpAdd(){
		var sz = this.async_jump_pos.count();
		if (sz == 0){
			return ;
		}
		var item = this.async_jump_pos.item(sz - 1);
		this.async_jump_pos.set(sz - 1, item + 1);
	}
	/**
	 * Increment jump position's level
	 */
	jumpPush(){
		this.async_jump_pos.push(0);
	}
	/**
	 * Decrement jump position's level
	 */
	jumpPop(){
		this.async_jump_pos.pop();
	}
	/**
	 * Push stop
	 */
	stopPush(begin_pos, end_pos){
		this.async_stop_pos.push((new Map()).set("begin", begin_pos).set("end", end_pos));
	}
	/**
	 * Pop stop
	 */
	stopPop(){
		this.async_stop_pos.pop();
	}
	/**
	 * Returns begin async position
	 * @return string
	 */
	getAsyncBeginPos(){
		var sz = this.async_stop_pos.count();
		if (sz == 0){
			return "";
		}
		var obj = this.async_stop_pos.item(sz - 1);
		return obj.get("begin", "", "string");
	}
	/**
	 * Returns end async position
	 * @return string
	 */
	getAsyncEndPos(){
		var sz = this.async_stop_pos.count();
		if (sz == 0){
			return "";
		}
		var obj = this.async_stop_pos.item(sz - 1);
		return obj.get("end", "", "string");
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.LangES6.FunctionStack";}
	static getCurrentClassName(){return "BayrellLang.LangES6.FunctionStack";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.name = "";
		this.is_async = false;
		this.async_ctx = "";
		this.async_jump = "";
		this.async_jump_pos = new Vector();
		this.async_stop_pos = new Vector();
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = FunctionStack;