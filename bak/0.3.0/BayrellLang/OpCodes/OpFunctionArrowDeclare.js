"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var BaseOpCode = require('./BaseOpCode.js');
var OpFunctionDeclare = require('./OpFunctionDeclare.js');
var OpFlags = require('./OpFlags.js');
class OpFunctionArrowDeclare extends OpFunctionDeclare{
	_init(){
		super._init();
		this.op = "op_arrow_function";
		this.return_function = null;
	}
	assign(obj){
		if (obj instanceof OpFunctionArrowDeclare){
			this.op = rtl._clone(obj.op);
			this.return_function = rtl._clone(obj.return_function);
		}
		super.assign(obj);
	}
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
		return "BayrellLang.OpCodes.OpFunctionArrowDeclare";
	}
}
module.exports = OpFunctionArrowDeclare;