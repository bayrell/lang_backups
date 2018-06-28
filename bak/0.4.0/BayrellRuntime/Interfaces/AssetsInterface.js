"use strict;"
/*!
 *  Bayrell Runtime Library
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
var Map = require('../Map.js');
var Vector = require('../Vector.js');
class AssetsInterface{
	/**
	 * Returns assets name
	 * @return string
	 */
	static getName(){
	}
	/**
	 * Returns required assets
	 * @return Vector<string>
	 */
	static getRequiredAssets(){
	}
	/**
	 * Returns required modules
	 * @return Map<string, string>
	 */
	static getRequiredModules(){
	}
	/**
	 * Returns sync loaded files
	 */
	static assetsSyncLoad(){
	}
	/**
	 * Returns async loaded files
	 */
	static assetsAsyncLoad(){
	}
}
module.exports = AssetsInterface;