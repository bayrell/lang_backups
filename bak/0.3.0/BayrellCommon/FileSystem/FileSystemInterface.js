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
var rtl = require('BayrellRtl').Lib.rtl;
var Map = require('BayrellRtl').Types.Map;
var Vector = require('BayrellRtl').Types.Vector;
class FileSystemInterface{
	/**
	 * Returns files and folders from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	getDirectoryListing(basedir, res){
		if (basedir == undefined) basedir="";
	}
	/**
	 * Returns recursive files and folders from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	readDirectoryRecursive(basedir, res){
		if (basedir == undefined) basedir="";
	}
	/**
	 * Returns recursive only files from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	getFilesRecursive(basedir, res){
		if (basedir == undefined) basedir="";
	}
	/**
	 * Returns files content
	 * @param string filepath
	 * @param string charset
	 * @return string
	 */
	loadFile(filepath, charset){
		if (filepath == undefined) filepath="";
		if (charset == undefined) charset="utf8";
	}
	/**
	 * Save file content
	 * @param string filepath
	 * @param string content
	 * @param string charset
	 */
	saveFile(filepath, content, charset){
		if (filepath == undefined) filepath="";
		if (content == undefined) content="";
		if (charset == undefined) charset="utf8";
	}
	/**
	 * Open file
	 * @param string filepath
	 * @param string mode
	 * @return FileInterface
	 */
	openFile(filepath, mode){
		if (filepath == undefined) filepath="";
		if (mode == undefined) mode="";
	}
	/**
	 * Make dir
	 * @param string dirpath
	 * @param boolean create_parent. Default is true
	 */
	makeDir(dirpath, create_parent){
		if (dirpath == undefined) dirpath="";
		if (create_parent == undefined) create_parent=false;
	}
}
module.exports = FileSystemInterface;