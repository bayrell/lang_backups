"use strict;"
/*!
 *  Bayrell Core Library
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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var AssertError = require('BayrellRtl').Exceptions.AssertError;
var AssertInterface = require('BayrellRtl').Providers.AssertInterface;
var ContextObject = require('BayrellRtl').ContextObject;
class AssertProvider extends ContextObject{
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(AssertInterface);
	}
	/**
	 * Throw exception with message
	 * @param string message
	 * @param Object prev - Previous error
	 */
	error(message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		throw new AssertError(this.context(), message, prev);
	}
	/**
	 * Throw exception with message if value is true
	 * @param boolean value
	 * @param string message
	 * @param Object prev - Previous error
	 */
	assert(value, message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		if (!value){
			throw new AssertError(this.context(), message, prev);
		}
	}
	/**
	 * Equals value1 and value2. Throw exception if value1 != value2
	 * @param var value1
	 * @param var value2
	 * @param string message
	 * @param Object prev - Previous error
	 */
	equals(value1, value2, message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		if (value1 !== value2){
			throw new AssertError(this.context(), message, prev);
		}
	}
	/**
	 * Check if value is boolean and equals True
	 * @param var value
	 * @param string message
	 * @param Object prev - Previous error
	 */
	checkTrue(value, message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		if (value !== true){
			throw new AssertError(this.context(), message, prev);
		}
	}
	/**
	 * Check if value is boolean and equals False
	 * @param var value
	 * @param string message
	 * @param Object prev - Previous error
	 */
	checkFalse(value, message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		if (value !== false){
			throw new AssertError(this.context(), message, prev);
		}
	}
	/**
	 * Check if value is not null 
	 * @param var value
	 * @param string message
	 * @param Object prev - Previous error
	 */
	checkExists(value, message, prev){
		if (message == undefined) message="";
		if (prev == undefined) prev=null;
		if (!rtl.exists(value)){
			throw new AssertError(this.context(), message, prev);
		}
	}
}
module.exports = AssertProvider;