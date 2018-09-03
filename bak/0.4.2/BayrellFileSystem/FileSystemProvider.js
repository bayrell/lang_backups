"use strict;"
/*!
 *  Bayrell File System Provider
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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var ContextObject = require('BayrellRuntime').ContextObject;
var FileSystemInterface = require('BayrellCommon').FileSystem.FileSystemInterface;

var fsModule = require('fs');
var shellModule = require('shelljs');
var upathModule = require('upath');
var pathModule = require('path');
class FileSystemProvider extends ContextObject{
	getClassName(){return "BayrellFileSystem.FileSystemProvider";}
	static getParentClassName(){return "ContextObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(FileSystemInterface);
	}
	/**
	 * Returns files and folders from directory
	 * @param string basedir
	 * @return Vector<string> res - Result
	 */
	getDirectoryListing(basedir){
		if (basedir == undefined) basedir="";
		
		var res = new Vector();
		var arr = fsModule.readdirSync(basedir);
		arr = arr.sort();
		arr.forEach(function(s){
			res.push( basedir + '/' + s );
		});
		return res;
	}
	/**
	 * Returns recursive files and folders from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	readDirectoryRecursive(basedir){
		if (basedir == undefined) basedir="";
		var res = new Vector();
		var arr = this.getDirectoryListing(basedir);
		arr.each((path) => {
			res.push(path);
			if (this.isDir(path)){
				res.appendVector(this.getDirectoryListing(path));
			}
		});
		return res;
	}
	/**
	 * Returns recursive only files from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	getFilesRecursive(basedir){
		if (basedir == undefined) basedir="";
		var res = new Vector();
		var arr = this.getDirectoryListing(basedir);
		arr.each((path) => {
			if (this.isDir(path)){
				res.appendVector(this.getFilesRecursive(path));
			}
			else {
				res.push(path);
			}
		});
		return res;
	}
	/**
	 * Returns content of the file
	 * @param string filepath
	 * @param string charset
	 * @return string
	 */
	readFile(filepath, charset){
		if (filepath == undefined) filepath="";
		if (charset == undefined) charset="utf8";
		
		return fsModule.readFileSync(filepath, {encoding : charset}).toString();
		return "";
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
		
		fsModule.writeFileSync(filepath, content, {encoding : 'utf8'});
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
		
		if (fsModule.existsSync(dirpath))
			return true;
		shellModule.mkdir('-p', dirpath);
	}
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean 
	 */
	isDir(path){
		
		return fsModule.lstatSync(path).isDirectory();
	}
	/**
	 * Return true if path is file
	 * @param string path
	 * @param boolean 
	 */
	isFile(path){
		return !this.isDir(path);
	}
	/**
	 * Make dir
	 * @param string dirpath
	 * @param boolean create_parent. Default is true
	 */
	makeDir(dirpath, create_parent){
		if (dirpath == undefined) dirpath="";
		if (create_parent == undefined) create_parent=false;
		
		if (fsModule.existsSync(dirpath))
			return true;
		shellModule.mkdir('-p', dirpath);
	}
}
FileSystemProvider.__static_implements__ = [];
FileSystemProvider.__static_implements__.push(FileSystemInterface)
module.exports = FileSystemProvider;