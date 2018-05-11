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
var Vector = require('BayrellRtl').Types.Vector;
var Map = require('BayrellRtl').Types.Map;
var ContextObject = require('BayrellRtl').ContextObject;
class TestClass extends ContextObject{
	_init(){
		super._init();
	}
	/**
	 * Returns test name
	 * @return string
	 */
	getTestName(){
		return "";
	}
	/**
	 * Returns assert message
	 * @params string test_name
	 * @params string description
	 * @return string
	 */
	message(test_name, description){
		if (description == undefined) description="";
		if (description != ""){
			return "The test '"+rtl.toString(test_name)+"' failed in "+rtl.toString(this.getTestName())+" with message: "+rtl.toString(description);
		}
		return "The test '"+rtl.toString(test_name)+"' failed in "+rtl.toString(this.getTestName());
	}
	/**
	 * Throw exception with message
	 * @params string test_name
	 * @params string description
	 */
	error(test_name, description, prev){
		if (test_name == undefined) test_name="";
		if (description == undefined) description="";
		if (prev == undefined) prev=null;
		this.getContextProvider("default.assert");.error(this.message(test_name, description), prev);
	}
	/**
	 * Equals value1 and value2. Throw exception if value1 != value2
	 * @param var value1
	 * @param var value2
	 * @params string test_name
	 * @params string description	 
	 */
	equals(value1, value2, test_name, description){
		if (test_name == undefined) test_name="";
		if (description == undefined) description="";
		if (value1 !== value2){
			if (description == ""){
				description = "Value != "+rtl.toString(rtl.toString(value2));
			}
			this.getContextProvider("default.assert");.error(this.message(test_name, description));
		}
	}
	/**
	 * Return list of the tests
	 * @return Vector<string>
	 */
	tests(){
		return null;
	}
	/**
	 * Run local tests
	 */
	run(){
		var arr = this.tests();
		for (var i = 0; i < arr.length; i++){
			var method_name = arr[i];
			rtl.callMethod(this, method_name);
		}
	}
}
module.exports = TestClass;