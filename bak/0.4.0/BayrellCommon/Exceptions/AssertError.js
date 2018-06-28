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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var rtl = require('BayrellRuntime').rtl;
var Utils = require('BayrellRuntime').Utils;
var RuntimeConstant = require('BayrellRuntime').RuntimeConstant;
var RuntimeException = require('BayrellRuntime').Exceptions.RuntimeException;
var ContextInterface = require('BayrellRuntime').Interfaces.ContextInterface;
class AssertError extends RuntimeException{
	constructor(context, message, prev){
		if (prev == undefined) prev=null;
		if (message == ""){
			message = Utils.translate("ERROR_ASSERT", null, "", context);
		}
		super(context, message, RuntimeConstant.ERROR_ASSERT, prev);
	}
}
module.exports = AssertError;