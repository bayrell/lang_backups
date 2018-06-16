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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
var re = require('BayrellRtl').Lib.re;
var BayrellRtlUtils = require('BayrellRtl').Lib.Utils;
var ContextInterface = require('BayrellRtl').Interfaces.ContextInterface;
var PathInfo = require('BayrellRtl').Types.PathInfo;
var ParserBayFactory = require('BayrellLang').LangBay.ParserBayFactory;
var LangTranslatorES6Factory = require('BayrellLang').LangES6.TranslatorES6Factory;
var LangTranslatorNodeJSFactory = require('BayrellLang').LangNodeJS.TranslatorNodeJSFactory;
var LangTranslatorPHPFactory = require('BayrellLang').LangPHP.TranslatorPHPFactory;
var BayrellLangUtils = require('BayrellLang').Utils;
var TemplateParserFactory = require('BayrellTemplate').TemplateParserFactory;
var TemplateTranslatorES6Factory = require('BayrellTemplate').TranslatorES6Factory;
var TemplateTranslatorNodeJSFactory = require('BayrellTemplate').TranslatorNodeJSFactory;
var TemplateTranslatorPHPFactory = require('BayrellTemplate').TranslatorPHPFactory;
var BundleFile = require('./BundleFile.js');
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
			var arr = fs.getFilesRecursive(path);
			var res = arr.map((s) => {
				var file = new BundleFile();
				file.path = s;
				file.content = "";
				return file;
			});
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
		return (context, arr) => {
			return arr.filter((item) => {
				for (var i = 0; i < rules.count(); i++){
					var rule = rules.item(i);
					if (re.match(rule, item.path)){
						return true;
					}
				}
				return false;
			});
		}
	}
	/**
	 * Read files from list
	 * @params string path
	 * @return func
	 */
	static readFiles(path){
		return (context, arr) => {
			var fs = context.createProvider("default:fs");
			var res = arr.map((item) => {
				var file = new BundleFile();
				file.path = item.path;
				file.content = fs.readFile(item.path);
				return file;
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
		return (context, arr) => {
			return arr.map((file) => {
				var parser_bay_factory = new ParserBayFactory();
				var translator_es6_factory = new LangTranslatorES6Factory();
				var translator_nodejs_factory = new LangTranslatorNodeJSFactory();
				var translator_php_factory = new LangTranslatorPHPFactory();
				var template_parser_factory = new TemplateParserFactory();
				var template_translator_es6_factory = new TemplateTranslatorES6Factory();
				var template_translator_nodejs_factory = new TemplateTranslatorNodeJSFactory();
				var template_translator_php_factory = new TemplateTranslatorPHPFactory();
				var path_info = BayrellRtlUtils.pathinfo(file.path);
				var extname = path_info.extension;
				var filename = path_info.filename;
				var dirname = path_info.dirname;
				if (callback != null){
					callback(file);
				}
				var parser_factory = null;
				var translator_factory = null;
				var path = "";
				if (extname == "bay" && lang == "es6"){
					parser_factory = parser_bay_factory;
					translator_factory = translator_es6_factory;
					path = dirname + "/" + filename + ".js";
				}
				else if (extname == "bay" && lang == "nodejs"){
					parser_factory = parser_bay_factory;
					translator_factory = translator_nodejs_factory;
					path = dirname + "/" + filename + ".js";
				}
				else if (extname == "bay" && lang == "php"){
					parser_factory = parser_bay_factory;
					translator_factory = translator_php_factory;
					path = dirname + "/" + filename + ".php";
				}
				else if (extname == "template" && lang == "es6"){
					parser_factory = template_parser_factory;
					translator_factory = template_translator_es6_factory;
					path = dirname + "/" + filename + ".js";
				}
				else if (extname == "template" && lang == "nodejs"){
					parser_factory = template_parser_factory;
					translator_factory = template_translator_nodejs_factory;
					path = dirname + "/" + filename + ".js";
				}
				else if (extname == "template" && lang == "php"){
					parser_factory = template_parser_factory;
					translator_factory = template_translator_php_factory;
					path = dirname + "/" + filename + ".php";
				}
				if (parser_factory != null && translator_factory != null && path != ""){
					var res = new BundleFile();
					res.path = path;
					res.content = BayrellLangUtils.translate(context, parser_factory, translator_factory, file.content);
					return res;
				}
				return file;
			});
		}
	}
	/**
	 * Make relative path
	 * @params string base_path
	 * @return func
	 */
	static makeRelativePath(base_path){
		return (context, arr) => {
			return arr.map((file) => {
				var res = new BundleFile();
				res.path = BayrellRtlUtils.relativePath(file.path, base_path);
				res.content = file.content;
				return res;
			});
		}
	}
	/**
	 * Concat files
	 * @return func
	 */
	static concat(result_path){
		return (context, arr) => {
			var res = new BundleFile();
			res.path = result_path;
			res.content = "";
			res = arr.reduce((res, file) => {
				res.content += file.content;
				return res;
			}, res);
			return (new Vector()).push(res);
		}
	}
	/**
	 * Save files from list
	 * @params string path
	 * @return func
	 */
	static saveFiles(path){
		return (context, arr) => {
			var fs = context.createProvider("default:fs");
			arr.each((file) => {
				var s = path + "/" + file.path;
				fs.makeDir(BayrellRtlUtils.dirname(s));
				fs.saveFile(path + "/" + file.path, file.content);
			});
			return arr;
		}
	}
}
module.exports = Bundler;