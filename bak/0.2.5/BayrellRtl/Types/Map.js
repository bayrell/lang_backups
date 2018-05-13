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
var Vector = require('./Vector.js');
var MapInterface = require('../Interfaces/MapInterface.js');
var KeyNotFound = require('../Exceptions/KeyNotFound.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof BayrellRtl == "undefined") BayrellRtl = {};
if (typeof BayrellRtl.Types == "undefined") BayrellRtl.Types = {};

BayrellRtl.Types.Map = class extends Map{
	
	
	/**
	 * Returns value from position
	 * @param T1 key
	 * @param T2 default_value
	 * @return T2
	 */
	get(key, default_value){
		var val = super.get(key);
		if (val == undefined)
			return default_value;
		return val;
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param T1 key - position
	 * @return T2
	 */
	item(key){
		var val = super.get(key);
		if (val === null) return null;
		if (val == undefined){
			if (isBrowser()) throw new BayrellRtl.Exceptions.KeyNotFound(null, key);
			throw new KeyNotFound(null, key);
		}
		return val;
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param T1 pos - position
	 * @param T2 value 
	 */
	set(key, value){
		super.set(key, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param T1 key
	 */
	remove(key){
		if (super.has(key)){
			super.delete(key);
		}
		return this;
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T1 key
	 * @return bool var
	 */
	contains(key){
		return super.has(key);
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T1 key
	 * @return bool var
	 */
	has(key){
		return super.has(key);
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear(){
		super.clear();
		return this;
	}

	
	
	/**
	 * Returns count items in vector
	 */
	count(){
		return this.size;
	}
	
	
	
	/**
	 * Returns vector of the keys
	 * @return Vector<T1>
	 */
	keys(){
		var it = super.keys();
		var res = new BayrellRtl.Types.Vector();
		var next = it.next();
		while (!next.done){
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
	
	
	/**
	 * Returns vector of the values
	 * @return Vector<T2>
	 */
	values(){
		var it = super.values();
		var res = new BayrellRtl.Types.Vector();
		var next = it.next();
		while (!next.done){
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
}
module.exports = BayrellRtl.Types.Map;