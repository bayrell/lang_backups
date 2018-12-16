"use strict;"
/*!
 *  Bayrell File System Provider
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
var Vector = require('bayrell-runtime-nodejs').Vector;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var ContextObject = require('bayrell-runtime-nodejs').ContextObject;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var FactoryInterface = require('bayrell-runtime-nodejs').Interfaces.FactoryInterface;
var FileSystemProvider = require('./FileSystemProvider.js');
class FileSystemProviderFactory extends ContextObject{
	/**
	 * Returns new Instance
	 */
	newInstance(context){
		var obj = new FileSystemProvider(context);
		return obj;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellFileSystem.FileSystemProviderFactory";}
	static getParentClassName(){return "ContextObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FactoryInterface);
	}
}
FileSystemProviderFactory.__static_implements__ = [];
FileSystemProviderFactory.__static_implements__.push(FactoryInterface)
module.exports = FileSystemProviderFactory;