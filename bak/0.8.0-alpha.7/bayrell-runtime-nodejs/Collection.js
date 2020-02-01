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
var use = require('bayrell').use; use.platform = "nodejs";
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
if (typeof Runtime == 'undefined') Runtime = {};
Runtime._Collection = function()
{
	Array.call(this);
	for (var i=0; i<arguments.length; i++) Array.prototype.push.call(this, arguments[i]);
	this.__uq__ = Symbol();
}
Runtime._Collection.prototype = Object.create(Array.prototype);
Runtime._Collection.prototype.constructor = Runtime._Collection;
Object.assign(Runtime._Collection.prototype,
{
	toString: function(value){ return use("Runtime.rtl").toString(value); },
	getClassName: function(){ return "Runtime._Collection"; },
});
Object.assign(Runtime._Collection,
{
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Collection"; },
	getParentClassName: function(){ return ""; },
});
use.add(Runtime._Collection);
Runtime.Collection = function(/*__ctx*/)
{
	use("Runtime._Collection").apply(this, arguments);
};
Runtime.Collection.prototype = Object.create(use("Runtime._Collection").prototype);
Runtime.Collection.prototype.constructor = Runtime.Collection;
Object.assign(Runtime.Collection.prototype,
{
	/**
	 * Returns copy of Collectiom
	 * @param int pos - position
	 */
	copy: function()
	{
		var arr = Array.prototype.slice.call(this);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Convert to collection
	 */
	toCollection: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, Runtime.Collection.prototype);
		return obj;
	},
	/**
	 * Convert to vector
	 */
	toVector: function()
	{
		var obj = Array.prototype.slice.call(this);
		Object.setPrototypeOf(obj, use("Runtime.Vector").prototype);
		return obj;
	},
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get: function(pos, default_value)
	{
		if (pos < 0 || pos >= this.length) return default_value;
		var val = this[pos];
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item: function(pos)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange();
		}
		return this[pos];
	},
	/**
	 * Returns count items in vector
	 */
	count: function()
	{
		return this.length;
	},
	/**
	 * Find value in array. Returns -1 if value not found.
	 * @param T value
	 * @return  int
	 */
	indexOf: function(value)
	{
		for (var i=0; i<this.count(); i++)
		{
			if (this[i] == value)
				return i;
		}
		return -1;
	},
	/**
	 * Find value in array, and returns position. Returns -1 if value not found.
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return  int
	 */
	indexOfRange: function(value, pos_begin, pos_end)
	{
		var pos = Array.prototype.indexOf.call(this, value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	},
	/**
	 * Get first item
	 */
	first: function(default_value)
	{
		if (default_value == undefined) default_value = null;
		if (this.length == 0) return default_value;	
		return this[0];
	},
	/**
	 * Get last item
	 */
	last: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		if (pos == undefined) pos = -1;
		if (this.length == 0) return default_value;
		if (this.length + pos + 1 == 0) return default_value;	
		return this[this.length + pos];
	},
	/**
	 * Get last item
	 */
	getLastItem: function(default_value, pos)
	{
		if (default_value == undefined) default_value = null;
		if (pos == undefined) pos = -1;
		return this.last(default_value, pos);
	},
	/**
	 * Append value to the end of the Collection and return new Collection
	 * @param T value
	 */
	pushIm: function(value)
	{
		var arr = this.copy();
		arr.push(value);
		return arr;
	},
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshiftIm: function(value)
	{
		var arr = this.copy();
		arr.unshift(value);
		return arr;
	},
	/**
	 * Extract last value from array
	 * @return T value
	 */
	removeLastIm: function()
	{
		return this.slice(0, -1);
	},
	/**
	 * Extract first value from array
	 * @return T value
	 */
	removeFirstIm: function()
	{
		return this.slice(1);
	},
	/**
	 * Insert value to position
	 * @param T value
	 * @param int pos - position
	 */
	insertIm: function(pos, value)
	{
		var arr = this.copy();
		arr.splice(pos, 0, value);
		return arr;
	},
	/**
	 * Remove value from position
	 * @param int pos - position
	 * @param int count - count remove items
	 */
	removeIm: function(pos, count)
	{
		if (count == undefined) count = 1;
		if (count == undefined) count = 1;
		var arr = this.copy();
		arr.splice(pos, count);
		return arr;
	},
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRangeIm: function(pos_begin, pos_end)
	{
		var arr = this.copy();
		arr.splice(pos_begin, pos_end - pos_begin + 1);
		return arr;
	},
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	setIm: function(pos, value)
	{
		if (pos < 0 || pos >= this.length)
		{
			var _IndexOutOfRange = use("Runtime.Exceptions.IndexOutOfRange");
			throw new _IndexOutOfRange();
		}
		var arr = this.copy();
		arr[pos] = value;
		return arr;
	},
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	appendIm: function(value)
	{
		return this.pushIm(value);
	},
	/**
	 * Insert first value to begin of the vector
	 * @return T value
	 */
	prependIm: function(value)
	{
		return this.unshiftIm(value);
	},
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendCollectionIm: function(arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.copy();
		for (var i=0; i<arr.length; i++)
		{
			res.push(arr[i]);
		}
		return res;
	},
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependCollectionIm: function(arr)
	{
		if (arr == null) return this;
		if (arr.length == 0) return this;
		var res = this.copy();
		for (var i=arr.length-1; i>=0; i--)
		{
			res.unshift(arr[i]);
		}
		return res;
	},
	/**
	 * Remove value
	 */
	removeValueIm: function(value)
	{
		var index = this.indexOf(value);
		if (index != -1)
		{
			return this.removeIm(index);
		}
		return this;
	},
	/**
	 * Remove value
	 */
	removeItemIm: function(value)
	{
		return this.removeValueIm(value);
	},
	/**
	 * Remove value
	 */
	removeItemsIm: function(values)
	{
		var res = this;
		for (var i=0; i<values.count(); i++)
		{
			res = res.removeItem( values.item(i) );
		}
		return res;
	},
	/**
	 * Map
	 * @param fn f
	 * @return Collection
	 */
	map: function(f)
	{
		var arr = this.copy();
		for (var i=0; i<arr.length; i++)
		{
			arr[i] = f(/*__ctx,*/ arr[i], i);
		}
		return arr;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(f)
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			if ( f(/*__ctx,*/ item, i) )
			{
				res.push(item);
			}
		}
		return res;
	},
	/**
	 * Transition Collection to Dict
	 * @param fn f
	 * @return Dict
	 */
	transition: function(f)
	{
		var Dict = use("Runtime.Dict");
		var d = new Dict();
		for (var i=0; i<this.length; i++)
		{
			var value = this[i];
			var p = f(/*__ctx,*/ value, i);
			d[p[1]] = p[0];
		}
		return d;
	},
	/**
	 * Reduce
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(f, init_value)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			init_value = f(/*__ctx,*/ init_value, item, i)
		}
		return init_value;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			var item = this[i];
			f(/*__ctx,*/ item, i)
		}
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat: function(arr)
	{
		if (arr == undefined) arr = null;
		if (arr == null && arr == undefined)
		{
			return this;
		}
		var new_arr = Array.prototype.slice.call(this).concat(arr);
		Object.setPrototypeOf(new_arr, this.constructor.prototype);
		return new_arr;
	},
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	intersect: function(arr)
	{
		return this.filter((item) => 
		{
			return arr.indexOf(item) >= 0;
		});
	},
	/**
	 * Returns new Collection
	 * @param int offset
	 * @param int lenght
	 * @return Collection<T>
	 */
	slice: function(offset, length)
	{
		if (length == undefined) length = null;
		if (offset == undefined) offset = 0;
		if (length == undefined)
		{
			if (offset == 0) return this;
			var arr = Array.prototype.slice.call(this, offset);
			Object.setPrototypeOf(arr, this.constructor.prototype);
			return arr;
		}
		if (offset == 0 && length == this.length) return this;
		if (length >= 0)
		{
			length = offset + length;
		}
		var arr = Array.prototype.slice.call(this, offset, length);
		Object.setPrototypeOf(arr, this.constructor.prototype);
		return arr;
	},
	/**
	 * Reverse array
	 */
	reverseIm: function()
	{
		var arr = this.copy();
		arr.reverse();
		return arr;
	},
	/**
	 * Sort vector
	 * @param fn f - Sort user function
	 */
	sortIm: function(f)
	{
		if (f == undefined) f = null;
		var arr = this.copy();
		if (f == undefined) arr.sort();
		arr.sort(f);
		return arr;
	},
	/**
	 * Remove dublicate values
	 */
	removeDublicatesIm: function()
	{
		var res = this.constructor.Instance();
		for (var i=0; i<this.length; i++)
		{
			if (res.indexOf(this[i]) == -1)
			{
				res.push( this[i] );
			}
		}
		return res;
	},
	/**
	 * Find item pos
	 * @param fn f - Find function
	 * @return int - position
	 */
	find: function(f)
	{
		for (var i=0; i<this.length; i++)
		{
			if ( f(/*__ctx,*/ this[i]) )
			{
				return i;
			}
		}
		return -1;
	},
	/**
	 * Find item
	 * @param var item - Find function
	 * @param fn f - Find function
	 * @param T def_value - Find function
	 * @return item
	 */
	findItem: function(f, def_value)
	{
		if (def_value == undefined) def_value = null;
		var pos = this.find(f);
		return this.get(pos, def_value);
	},
	assignObject: function(o)
	{
		if (o instanceof use("Runtime.Collection"))
		{
		}
		use("Runtime._Collection").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		use("Runtime._Collection").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return use("Runtime._Collection").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
	{
		return "Runtime.Collection";
	},
});
Object.assign(Runtime.Collection, use("Runtime._Collection"));
Object.assign(Runtime.Collection,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function()
	{
		var __v0 = use("Runtime.Collection");
		return new __v0();
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(arr)
	{
		var res = this.Instance();
		if (arr == undefined && arr == null) return this.Instance();
		
		if (arr instanceof Array)
		{
			var new_arr = arr.slice();
			Object.setPrototypeOf(new_arr, this.prototype);
			return new_arr;
		}
		
		var res = this.Instance();
		if (
			arr instanceof Int8Array ||
			arr instanceof Uint8Array ||
			arr instanceof Int16Array ||
			arr instanceof Uint16Array ||
			arr instanceof Int32Array ||
			arr instanceof Uint32Array ||
			arr instanceof Float32Array ||
			arr instanceof Float64Array
		)
		{
			for (var i=0; i<arr.length; i++)
			{
				Array.prototype.push.call(res, arr[i]);
			}
		}
		
		return res;
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Collection";
	},
	getParentClassName: function()
	{
		return "Runtime._Collection";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Collection",
			"name": "Runtime.Collection",
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
});use.add(Runtime.Collection);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Collection = Runtime.Collection;