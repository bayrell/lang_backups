"use strict;"
/*!
 *  Bayrell Common Library
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
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
class Pipe extends CoreObject{
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.pipe = new Vector();
	}
	/**
	 * Constructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Add function to pipe
	 */
	then(f){
		this.pipe.push(f);
		return this;
	}
	/**
	 * Add function to pipe
	 */
	prepend(f){
		this.pipe.prepend(f);
		return this;
	}
	/**
	 * Prepend another pipe
	 */
	prependPipe(p){
		p.pipe.each((item) => {
			this.pipe.prepend(item);
		});
		return this;
	}
	/**
	 * Append another pipe
	 */
	appendPipe(p){
		p.pipe.each((item) => {
			this.pipe.append(item);
		});
		return this;
	}
	/**
	 * Run pipe of functions
	 * @param mixed obj - input value
	 * @return mixed - the result
	 */
	run(obj){
		return this.pipe.reduce((res, item) => {
			return item(res);
		}, obj);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellCommon.Types.Pipe";}
	static getCurrentClassName(){return "BayrellCommon.Types.Pipe";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.pipe = null;
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
module.exports = Pipe;