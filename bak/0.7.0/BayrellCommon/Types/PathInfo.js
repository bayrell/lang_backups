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
var Vector = require('bayrell-runtime-nodejs').Vector;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var StringInterface = require('bayrell-runtime-nodejs').Interfaces.StringInterface;
class PathInfo{
	/**
	 * Returns string
	 */
	toString(){
		return this.filepath;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellCommon.Types.PathInfo";}
	static getParentClassName(){return "";}
	_init(){
		this.filepath = "";
		this.dirname = "";
		this.basename = "";
		this.extension = "";
		this.filename = "";
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(StringInterface);
	}
}
PathInfo.__static_implements__ = [];
PathInfo.__static_implements__.push(StringInterface)
module.exports = PathInfo;