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
var Vector = require('bayrell-runtime-nodejs').Vector;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var re = require('bayrell-runtime-nodejs').re;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var BayrellCommonUtils = require('bayrell-common-nodejs').Utils;
var PathInfo = require('bayrell-common-nodejs').Types.PathInfo;
var ParserBayFactory = require('bayrell-lang-nodejs').LangBay.ParserBayFactory;
var LangTranslatorES6Factory = require('bayrell-lang-nodejs').LangES6.TranslatorES6Factory;
var LangTranslatorNodeJSFactory = require('bayrell-lang-nodejs').LangNodeJS.TranslatorNodeJSFactory;
var LangTranslatorPHPFactory = require('bayrell-lang-nodejs').LangPHP.TranslatorPHPFactory;
var BayrellLangUtils = require('bayrell-lang-nodejs').Utils;
var TemplateParserFactory = require('bayrell-template-nodejs').TemplateParserFactory;
var TemplateTranslatorES6Factory = require('bayrell-template-nodejs').TranslatorES6Factory;
var TemplateTranslatorNodeJSFactory = require('bayrell-template-nodejs').TranslatorNodeJSFactory;
var TemplateTranslatorPHPFactory = require('bayrell-template-nodejs').TranslatorPHPFactory;
var BundleFile = require('./BundleFile.js');
class Lib{
	/**
	 * Returns files from directory
	 * @params FileSystemInterface fs
	 * @params string path
	 * @return Vector<BundleFile>
	 */
	static getFiles(fs, path){
		var arr = fs.getFilesRecursive(path);
		var res = arr.map((s) => {
			var file = new BundleFile();
			file.path = s;
			file.content = "";
			return file;
		});
		return res;
	}
	/**
	 * Filter files path by rules
	 * @params Vector<string> rules
	 * @params BundleFile file
	 * @return bool
	 */
	static filter(rules, file){
		for (var i = 0; i < rules.count(); i++){
			var rule = rules.item(i);
			if (re.match(rule, file.path)){
				return true;
			}
		}
		return false;
	}
	/**
	 * Read files from list
	 * @params FileSystemInterface fs
	 * @params BundleFile file
	 * @return BundleFile
	 */
	static readFile(fs, file){
		file = rtl._clone(file);
		file.content = fs.readFile(file.path);
		return file;
	}
	/**
	 * Translate
	 * @params ContextInterface context
	 * @params string lang
	 * @params BundleFile file
	 * @return BundleFile
	 */
	static translate(context, lang, file){
		/* Clone file */
		file = rtl._clone(file);
		/* Create factory */
		var parser_bay_factory = new ParserBayFactory(context);
		var translator_es6_factory = new LangTranslatorES6Factory(context);
		var translator_nodejs_factory = new LangTranslatorNodeJSFactory(context);
		var translator_php_factory = new LangTranslatorPHPFactory(context);
		var template_parser_factory = new TemplateParserFactory(context);
		var template_translator_es6_factory = new TemplateTranslatorES6Factory(context);
		var template_translator_nodejs_factory = new TemplateTranslatorNodeJSFactory(context);
		var template_translator_php_factory = new TemplateTranslatorPHPFactory(context);
		/* Get PathInfo ofthe file */
		var path_info = BayrellCommonUtils.pathinfo(file.path);
		var extname = path_info.extension;
		var filename = path_info.filename;
		var dirname = path_info.dirname;
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
		else if (extname == "component" && lang == "es6"){
			parser_factory = template_parser_factory;
			translator_factory = template_translator_es6_factory;
			path = dirname + "/" + filename + ".js";
		}
		else if (extname == "component" && lang == "nodejs"){
			parser_factory = template_parser_factory;
			translator_factory = template_translator_nodejs_factory;
			path = dirname + "/" + filename + ".js";
		}
		else if (extname == "component" && lang == "php"){
			parser_factory = template_parser_factory;
			translator_factory = template_translator_php_factory;
			path = dirname + "/" + filename + ".php";
		}
		if (parser_factory != null && translator_factory != null && path != ""){
			file.path = path;
			file.content = BayrellLangUtils.translate(context, parser_factory, translator_factory, file.content);
		}
		return file;
	}
	/**
	 * Translate sass
	 * @params ContextInterface context
	 * @params string lang
	 * @params BundleFile file
	 * @return BundleFile
	 */
	static translateSass(context, lang, file){
		/* Get PathInfo ofthe file */
		var path_info = BayrellCommonUtils.pathinfo(file.path);
		var extname = path_info.extension;
		var filename = path_info.filename;
		var dirname = path_info.dirname;
		var content = file.content;
		file = rtl._clone(file);
		file.path = dirname + "/" + filename + ".css";
		file.content = "";
		
		var sass = require('node-sass');
		var res = sass.renderSync({
			data: content,
			outputStyle: 'compressed',
			includePaths: [ dirname ],
		});
		file.content = res.css.toString();
		return file;
	}
	/**
	 * Make relative path
	 * @params string base_path
	 * @params BundleFile file
	 * @return BundleFile
	 */
	static makeNewPath(old_path, new_path, file){
		file = rtl._clone(file);
		file.path = BayrellCommonUtils.relativePath(file.path, old_path);
		file.path = rtl.toString(new_path)+"/"+rtl.toString(file.path);
		return file;
	}
	/**
	 * Concat files
	 * @params Vector<BundleFile> arr
	 * @return BundleFile
	 */
	static concatFiles(arr){
		var res = new BundleFile();
		res.content = "";
		res = arr.reduce((res, file) => {
			res.content += file.content;
			return res;
		}, res);
		return res;
	}
	/**
	 * Save files from list
	 * @params FileSystemInterface fs
	 * @params BundleFile file
	 * @return BundleFile
	 */
	static saveFile(fs, file){
		fs.makeDir(BayrellCommonUtils.dirname(file.path));
		fs.saveFile(file.path, file.content);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellBundler.Lib";}
	static getParentClassName(){return "";}
}
module.exports = Lib;