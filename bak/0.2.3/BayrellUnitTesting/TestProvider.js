"use strict;"
/*!
 *  Bayrell Unit Test
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
var ContextObject = require('BayrellRtl').ContextObject;
class TestProvider extends ContextObject{
	_init(){
		super._init();
	}
	run(arr){
		for (var i = 0; i < arr.length; i++){
			/* Create test object */
			var obj = rtl.Instance(arr.item(i), (new Vector()).push(this.context()));
			var test_name = obj.getTestName();
			/* Run test object */
			obj.run();
		}
	}
}
module.exports = TestProvider;