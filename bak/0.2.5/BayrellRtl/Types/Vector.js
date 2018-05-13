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
var IndexOutOfRange = require('../Exceptions/IndexOutOfRange.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof BayrellRtl == "undefined") BayrellRtl = {};
if (typeof BayrellRtl.Types == "undefined") BayrellRtl.Types = {};

BayrellRtl.Types.Vector = class extends Array{
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	push(value){
		/*Array.prototype.push.call(this, value);*/
		super.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshift(value){
		super.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop(){
		return super.pop();
	}
	
	
	
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift(){
		return super.shift();
	}
	
	
	
	/**
	 * Find value in array
	 * @param T value
	 * @return  int
	 */
	indexOf(value){
		return super.indexOf(value);
	}
	
	
	
	/**
	 * Find value in array in range pos_begin <= pos <= pos_end, and returns position. 
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return int - position
	 */
	indexOfRange(value, pos_begin, pos_end){
		var pos = super.indexOf(value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	}
	
	
	
	/**
	 * Insert value size_to position
	 * @param T value
	 * @param int pos - position
	 */
	insert(pos, value){
		super.splice(pos, 0, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 */
	remove(pos, count){
		if (count == undefined) count = 1;
		super.splice(pos, count);
		return this;
	}
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRange(pos_begin, pos_end){
		super.splice(pos_begin, pos_end - pos_begin + 1);
		return this;
	}
	
	
	
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get(pos, default_value){
		if (pos < 0 || pos >= this.length)
			return default_value;
		return this[pos];
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item(pos){
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new BayrellRtl.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		return this[pos];
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set(pos, value){
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new BayrellRtl.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		this[pos] = value;
		return this;
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear(){
		super.splice(0, this.length);
		return this;
	}
	
	
	
	/**
	 * Returns count items in vector
	 */
	count(){
		return this.length;
	}
	
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	append(value){
		this.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	prepend(value){
		this.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Get last item
	 */
	getLastItem(default_value){
		if (this.length == 0)
			return default_value;
		return this[this.length - 1];
	}
}
module.exports = BayrellRtl.Types.Vector;