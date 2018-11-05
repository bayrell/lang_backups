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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Utils = require('bayrell-runtime-nodejs').Utils;
var RuntimeConstant = require('bayrell-runtime-nodejs').RuntimeConstant;
var RuntimeException = require('bayrell-runtime-nodejs').Exceptions.RuntimeException;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
class AssertError extends RuntimeException{
	getClassName(){return "BayrellCommon.Exceptions.AssertError";}
	static getParentClassName(){return "RuntimeException";}
	constructor(context, message, prev){
		if (prev == undefined) prev=null;
		if (message == ""){
			message = Utils.translate("ERROR_ASSERT", null, "", context);
		}
		super(context, message, RuntimeConstant.ERROR_ASSERT, prev);
	}
}
module.exports = AssertError;