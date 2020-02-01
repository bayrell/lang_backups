"use strict;"
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
var Collection = require('./Collection.js');
var Context = require('./Context.js');
var CoreStruct = require('./CoreStruct.js');
var Dict = require('./Dict.js');
var Map = require('./Map.js');
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var UIStruct = require('./UIStruct.js');
var Vector = require('./Vector.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var FactoryInterface = require('./Interfaces/FactoryInterface.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
/* Lambda Functions */
class lib{
	static isInstance(class_name){
		return (item) => {
			return rtl.is_instanceof(item, class_name);
		}
	}
	/**
	 * Equal two struct by key
	 */
	static equal(value){
		return (item) => {
			return item == value;
		}
	}
	/**
	 * Equal two struct by key
	 */
	static equalNot(value){
		return (item) => {
			return item != value;
		}
	}
	/**
	 * Returns attr of item
	 */
	static attr(key, def_value){
		return (item1) => {
			return item1.takeValue(key, def_value);
		}
	}
	/**
	 * Equal two struct by key
	 */
	static equalAttr(key, value){
		return (item1) => {
			return item1.takeValue(key) == value;
		}
	}
	/**
	 * Returns max id from items
	 */
	static getMaxIdFromItems(items, start){
		if (start == undefined) start=0;
		return items.reduce((value, item) => {
			return (item.id > value) ? (item.id) : (value);
		}, start);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.lib";}
	static getCurrentNamespace(){return "Runtime";}
	static getCurrentClassName(){return "Runtime.lib";}
	static getParentClassName(){return "";}
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
module.exports = lib;