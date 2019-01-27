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
class SerializeStringInterface{
	/**
	 * Convert object to string
	 * @return string
	 */
	convertToString(obj){
	}
	/**
	 * Restore object from string
	 * @param string s
	 */
	restoreFromString(s){
	}
	/**
	 * Set display class name
	 * @param boolean value
	 */
	setDisplayClassName(value){
	}
	/**
	 * Set indent
	 * @param string value
	 */
	setIndent(value){
	}
	/**
	 * Set space
	 * @param string value
	 */
	setSpace(value){
	}
	/**
	 * Set crlf
	 * @param string value
	 */
	setCRLF(value){
	}
	/**
	 * Returns display class name
	 * @return string
	 */
	getDisplayClassName(){
	}
	/**
	 * Returns indent
	 * @return string
	 */
	getIndent(){
	}
	/**
	 * Set space
	 * @param string value
	 */
	getSpace(){
	}
	/**
	 * Returns crlf
	 * @return string
	 */
	getCRLF(){
	}
	/* ======================= Class Init Functions ======================= */
}
module.exports = SerializeStringInterface;