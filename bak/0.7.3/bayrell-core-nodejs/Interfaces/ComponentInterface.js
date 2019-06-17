"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var RenderContainer = require('../UI/Render/RenderContainer.js');
class ComponentInterface{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
	}
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	static requiredModules(){
	}
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	static getModuleFiles(){
	}
	/**
	 * Returns manager name
	 */
	static componentManagerName(){
	}
	/**
	 * Returns model name
	 */
	static componentModelName(){
	}
	/**
	 * Returns model name
	 */
	static componentViewName(){
	}
	/**
	 * Returns required assets
	 * @return Collection<string>
	 */
	static assets(container){
	}
	/**
	 * Returns sync loaded files
	 */
	static resources(container){
	}
	/**
	 * Init render container
	 */
	static initContainer(container){
	}
}
module.exports = ComponentInterface;