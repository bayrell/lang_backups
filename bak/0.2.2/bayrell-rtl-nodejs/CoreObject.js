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
var rtl = require('./Lib/rtl.js');
class CoreObject{
	/**
	 * Get module name
	 */
	getModuleName(){
		return "BayrellRtl";
	}
	/**
	 * Get class name
	 */
	getClassName(){
		return "BayrellRtl.CoreObject";
	}
	/** 
	 * Constructor
	 */
	constructor(){
		
		this._init();
	}
	
	_init(){
		this.__implements__ = new Array();
	}
	/**
	 * Destructor
	 */
	destructor(){
		this._is_destroyed = true;
	}
	
	_del(){
		if (!this._is_destroyed)
			this.destructor();
	}
	/**
	 * Clone current object
	 * @return CoreObject
	 */
	clone(){
		var res = rtl.newInstanceByObject(this);
		/* Assign all values */
		res.assign(this);
		return res;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
		this.assignAfter(obj);
	}
	/**
	 * Call after assign data
	 * @param CoreObject obj
	 */
	assignAfter(obj){
	}
}
module.exports = CoreObject;