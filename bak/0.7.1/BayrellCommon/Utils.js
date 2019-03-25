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
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var rs = require('bayrell-runtime-nodejs').rs;
var ContextObject = require('bayrell-runtime-nodejs').ContextObject;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var FactoryInterface = require('bayrell-runtime-nodejs').Interfaces.FactoryInterface;
var AssertError = require('./Exceptions/AssertError.js');
var PathInfo = require('./Types/PathInfo.js');
class Utils{
	/**
	 * Equals value1 and value2. Throw exception if value1 != value2
	 * @param var value1
	 * @param var value2
	 */
	static assert(value, message){
		if (message == undefined) message="";
		if (!value){
			throw new AssertError(null, message);
		}
	}
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	static pathinfo(filepath){
		var arr1 = rs.explode(".", filepath);
		var arr2 = rs.explode("/", filepath);
		var ret = new PathInfo();
		ret.filepath = filepath;
		ret.extension = arr1.pop();
		ret.basename = arr2.pop();
		ret.dirname = rs.implode("/", arr2);
		var ext_length = rs.strlen(ret.extension);
		if (ext_length > 0){
			ext_length++;
		}
		ret.filename = rs.substr(ret.basename, 0, -1 * ext_length);
		return ret;
	}
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static basename(filepath){
		var ret = Utils.pathinfo(filepath);
		var res = ret.basename;
		return res;
	}
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static extname(filepath){
		var ret = Utils.pathinfo(filepath);
		var res = ret.extension;
		return res;
	}
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	static dirname(filepath){
		var ret = Utils.pathinfo(filepath);
		var res = ret.dirname;
		return res;
	}
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	static relativePath(filepath, basepath, ch){
		if (ch == undefined) ch="/";
		var source = rs.explode(ch, filepath);
		var base = rs.explode(ch, basepath);
		source = source.filter((s) => {
			return s != "";
		});
		base = base.filter((s) => {
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0)){
			source.shift();
			base.shift();
		}
		base.each((s) => {
			source.unshift("..");
		});
		return rs.implode(ch, source);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellCommon.Utils";}
	static getCurrentClassName(){return "BayrellCommon.Utils";}
	static getParentClassName(){return "";}
}
module.exports = Utils;