"use strict;"
/*!
 *  Bayrell Bundler
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
var CloneableInterface = require('bayrell-runtime-nodejs').Interfaces.CloneableInterface;
class BundleFile extends CoreObject{
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		if (obj instanceof BundleFile){
			this.path = obj.path;
			this.content = obj.content;
		}
		super.assignObject(obj);
	}
	/**
	 * Constructor
	 */
	constructor(path, content){
		if (path == undefined) path="";
		if (content == undefined) content="";
		super();
		this.path = path;
		this.content = content;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellBundler.BundleFile";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		this.path = "";
		this.content = "";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(CloneableInterface);
	}
}
BundleFile.__static_implements__ = [];
BundleFile.__static_implements__.push(CloneableInterface)
module.exports = BundleFile;