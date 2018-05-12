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
var rs = require('./rs.js');
var rtl = require('./rtl.js');
var AssertError = require('../Exceptions/AssertError.js');
var ContextInterface = require('../Interfaces/ContextInterface.js');
var FactoryInterface = require('../Interfaces/FactoryInterface.js');
var MapInterface = require('../Interfaces/MapInterface.js');
var PathInfo = require('../Types/PathInfo.js');
var Vector = require('../Types/Vector.js');
var Map = require('../Types/Map.js');
var ContextObject = require('../ContextObject.js');
var CoreObject = require('../CoreObject.js');
class Utils{
	_init(){
	}
	/**
	 * Create object by factory
	 * @param string factory_name
	 * @param ContextInterface context
	 * @return CoreObject
	 */
	static factory(factory_name, context){
		if (context == undefined) context=null;
		var obj = null;
		var args = new Vector();
		args.push(context);
		var factory_obj = rtl.newInstance(factory_name, args);
		if (rtl.implements(factory_obj, FactoryInterface)){
			obj = factory_obj.newInstance();
		}
		return obj;
	}
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
	 * Returns true if value is primitive value
	 * @return boolean 
	 */
	static isPrimitiveValue(value){
		if (rtl.isScalarValue(value)){
			return true;
		}
		if (value instanceof Vector){
			return true;
		}
		if (value instanceof Map){
			return true;
		}
		return false;
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	static translate(message, params, locale, context){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		if (context == undefined) context=null;
		if (context == null){
			context = rtl.globalContext();
		}
		if (context != null){
			var args = (new Vector()).push(message).push(params).push(locale);
			return rtl.callMethod(context, "translate", args);
		}
		return message;
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
			ext_length++
		}
		ret.filename = rs.substr(basename, 0, -1 * ext_lenght);
		return ret;
	}
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static basename(filepath){
		var ret = rtl.mb_pathinfo(filepath);
		var res = ret.basename;
		return res;
	}
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static extname(filepath){
		var ret = rtl.mb_pathinfo(filepath);
		var res = ret.extension;
		return res;
	}
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	static dirname(filepath){
		var ret = rtl.mb_pathinfo(filepath);
		var res = ret.dirname;
		return res;
	}
}
module.exports = Utils;