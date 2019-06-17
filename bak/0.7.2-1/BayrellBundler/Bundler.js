"use strict;"
/*!
 *  Bayrell Bundler
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
var Lib = require('./Lib.js');
var BayrellCommonUtils = require('bayrell-common-nodejs').Utils;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
class Bundler{
	/**
	 * Returns files from directory
	 * @params string path
	 * @return func
	 */
	static getFiles(path){
		return (context, source) => {
			if (source == undefined) source=null;
			var fs = context.createProvider("default:fs");
			var res = Lib.getFiles(fs, path);
			if (source == null){
				return res;
			}
			return source.concat(res);
		}
	}
	/**
	 * Filter string by rules
	 * @params Vector<string> arr
	 * @return func
	 */
	static filter(rules){
		if (rules == undefined) rules=null;
		return (context, arr) => {
			if (rules == null){
				rules = (new Vector()).push("\\.bay$").push("\\.component$").push("\\.css$").push("\\.es6$").push("\\.scss$");
			}
			return arr.filter((file) => {
				var res = Lib.filter(rules, file);
				if (!res){
					return false;
				}
				var basename = BayrellCommonUtils.basename(file.path);
				var extname = BayrellCommonUtils.extname(file.path);
				if (extname == "scss" && basename[0] == "_"){
					return false;
				}
				return true;
			});
		}
	}
	/**
	 * Read files from list
	 * @return func
	 */
	static readFiles(){
		return (context, arr) => {
			var fs = context.createProvider("default:fs");
			var res = arr.map((file) => {
				return Lib.readFile(fs, file);
			});
			return res;
		}
	}
	/**
	 * Translate
	 * @params string lang
	 * @return func
	 */
	static translate(lang, callback){
		if (callback == undefined) callback=null;
		return (context, arr) => {
			return arr.map((file) => {
				return Lib.translate(context, lang, file, callback);
			});
		}
	}
	/**
	 * Transform files from list
	 * @params string path
	 * @return func
	 */
	static transform(lang, callback){
		if (callback == undefined) callback=null;
		return (context, arr) => {
			arr = arr.map((file) => {
				var res = null;
				var path_info = BayrellCommonUtils.pathinfo(file.path);
				var filename = path_info.filename;
				var dirname = path_info.dirname;
				var extension = path_info.extension;
				if (extension == "bay" || extension == "component"){
					if (callback != null){
						callback(file);
					}
					res = Lib.translate(context, lang, file);
				}
				else if (extension == "css" && lang == "es6"){
					if (callback != null){
						callback(file);
					}
					res = rtl._clone(file);
				}
				else if (extension == "es6" && lang == "es6"){
					if (callback != null){
						callback(file);
					}
					res = rtl._clone(file);
					res.path = dirname + "/" + filename + ".js";
				}
				else if (extension == "scss" && lang == "es6"){
					if (callback != null){
						callback(file);
					}
					res = Lib.translateSass(context, lang, file);
				}
				else if (extension == "php" && lang == "php"){
					if (callback != null){
						callback(file);
					}
					res = rtl._clone(file);
				}
				return res;
			});
			arr = arr.filter((file) => {
				return file != null;
			});
			return arr;
		}
	}
	/**
	 * Make relative path
	 * @params string base_path
	 * @return func
	 */
	static makeNewPath(old_path, new_path){
		return (context, arr) => {
			return arr.map((file) => {
				return Lib.makeNewPath(old_path, new_path, file);
			});
		}
	}
	/**
	 * Concat files
	 * @return func
	 */
	static concat(result_path){
		return (context, arr) => {
			var res = Lib.concatFiles(arr);
			res.path = result_path;
			return (new Vector()).push(res);
		}
	}
	/**
	 * Save files from list
	 * @params string path
	 * @return func
	 */
	static saveFiles(){
		return (context, arr) => {
			var fs = context.createProvider("default:fs");
			arr.each((file) => {
				Lib.saveFile(fs, file);
			});
			return arr;
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellBundler.Bundler";}
	static getCurrentClassName(){return "BayrellBundler.Bundler";}
	static getParentClassName(){return "";}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = Bundler;