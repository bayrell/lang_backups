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
class StreamInterface{
	/**
	 * Returns if can read from stream
	 * @return bool
	 */
	canRead(){
	}
	/**
	 * Returns if can write to stream
	 * @return bool
	 */
	canWrite(){
	}
	/**
	 * Returns if can move cursor
	 * @return bool
	 */
	canSeek(){
	}
	/**
	 * Returns current cursor position
	 */
	getCurrentPos(){
	}
	/**
	 * Move cursor position
	 */
	seek(offset, origin){
	}
	/**
	 * Returns available bytes to read
	 * @param int length
	 * @return int
	 */
	getAvailableBytes(length){
	}
	/**
	 * Is file EOF
	 * @return bool
	 */
	isEOF(){
	}
	/**
	 * Read bytes from stream
	 */
	readBytes(length){
	}
	/**
	 * Write bytes to stream
	 * @return int count bytes of successfully written
	 */
	writeBytes(data){
	}
}
module.exports = StreamInterface;