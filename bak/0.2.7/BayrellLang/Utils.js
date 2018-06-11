"use strict;"
/*!
 *  Bayrell Common Languages Transcompiler
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
var fs = require('BayrellRtl').Lib.fs;
var RtlUtils = require('BayrellRtl').Lib.Utils;
var CoreObject = require('BayrellRtl').CoreObject;
var ContextObject = require('BayrellRtl').ContextObject;
var FactoryInterface = require('BayrellRtl').Interfaces.FactoryInterface;
var ParserBay = require('./LangBay/ParserBay.js');
var TranslatorES6 = require('./LangES6/TranslatorES6.js');
var CommonParser = require('./CommonParser.js');
var CommonTranslator = require('./CommonTranslator.js');
class Utils extends ContextObject{
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static getAST(parser_factory, source){
		var parser = parser_factory.newInstance();
		parser.parseString(source);
		var code_tree = parser.getAST();
		return code_tree;
	}
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translateAST(translator_factory, code_tree){
		var translator = translator_factory.newInstance();
		var res = translator.translate(code_tree);
		return res;
	}
	/**
	 * Transcompile one language to other
	 * @string string parser_factory_name
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translate(parser_factory, translator_factory, source){
		var parser = parser_factory.newInstance();
		var translator = translator_factory.newInstance();
		parser.parseString(source);
		var code_tree = parser.getAST();
		var res = translator.translate(code_tree);
		return res;
	}
	/**
	 * Transcompile Bayrell language to other
	 * @string string translator_factory_name
	 * @string string source
	 * @return string
	 */
	static translateBay(translator_factory, source){
		var translator = translator_factory.newInstance();
		var parser = new ParserBay(translator.context());
		parser.parseString(source);
		var code_tree = parser.getAST();
		var res = translator.translate(code_tree);
		return res;
	}
	/**
	 * Transcompile Bayrell language to other
	 * @string FactoryInterface parser_factory
	 * @string FactoryInterface translator_factory
	 * @string string src_file_name
	 * @string string dest_file_name
	 */
	static translateFile(parser_factory, translator_factory, src_file_name, dest_file_name){
		
		var fsModule = require('fs');
		var shellModule = require('shelljs');
		var content = fsModule.readFileSync(src_file_name, {encoding : 'utf8'}).toString();
		/*
		ContextObject context = parser_factory.context();
		FileSystemInterface file_system = context.getProvider("default:fs");
		string content = file_system.loadFile(src_file_name);
		*/
		var res = Utils.translate(parser_factory, translator_factory, content);
		var dir = RtlUtils.dirname(dest_file_name);
		/*
		file_system.makeDir(dir);
		file_system.saveFile(dest_file_name, res);
		*/
		
		if (!fsModule.existsSync(dir)){
			shellModule.mkdir('-p', dirpath);
		}
		fsModule.writeFileSync(dest_file_name, res, {encoding : 'utf8'});
	}
}
module.exports = Utils;