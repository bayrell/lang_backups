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
var AssetsInterface = require('../UI/Interfaces/AssetsInterface.js');
var RenderContainer = require('../UI/Render/RenderContainer.js');
class Assets{
	/**
	 * Returns required assets
	 * @return Map<string, string>
	 */
	static getRequiredAssets(context){
		return (new Vector());
	}
	/**
	 * Returns sync loaded files
	 */
	static assetsSyncLoad(context){
		return (new Vector());
	}
	/**
	 * Returns async loaded files
	 */
	static assetsAsyncLoad(context){
		return (new Vector()).push((new Vector()).push("@Core/Http/ApiRequest.js").push("@Core/Http/ApiResult.js").push("@Core/Http/Cookie.js").push("@Core/Http/Request.js").push("@Core/Http/Response.js")).push((new Vector()).push("@Core/Http/JsonResponse.js"));
	}
	/**
	 * Init render container
	 */
	static initContainer(container){
		return container;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.Http.Assets";}
	static getCurrentNamespace(){return "Core.Http";}
	static getCurrentClassName(){return "Core.Http.Assets";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(AssetsInterface);
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
Assets.__static_implements__ = [];
Assets.__static_implements__.push(AssetsInterface)
module.exports = Assets;