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
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var Lib = require('./Lib.js');
var Bundler = require('./Bundler.js');
var BundlerPipe = require('./BundlerPipe.js');
class Build{
	/**
	 * Get files from library
	 */
	static taskLibTranslate(lib_path, lang, callback){
		if (callback == undefined) callback=null;
		return (new BundlerPipe()).appendPipe(Build.taskLibGetFiles(lib_path)).appendPipe(Build.taskLibTranslateFiles(lib_path, lang, callback));
	}
	/**
	 * Translate Library
	 */
	static taskLibGetFiles(lib_path){
		var source = lib_path + "/bay";
		return (new BundlerPipe()).then(Bundler.getFiles(source)).then(Bundler.filter());
	}
	/**
	 * Translate Library Files
	 */
	static taskLibTranslateFiles(lib_path, lang, callback){
		if (callback == undefined) callback=null;
		var source = lib_path + "/bay";
		var dest = lib_path + "/" + lang;
		return (new BundlerPipe()).then(Bundler.readFiles()).then(Bundler.transform(lang, callback)).then(Bundler.makeNewPath(source, dest)).then(Bundler.saveFiles());
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellBundler.Build";}
	static getParentClassName(){return "";}
}
module.exports = Build;