"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
var FileIOResult = require('../FileIOResult.js');
var FileNode = require('../FileNode.js');
var FileSystemInterface = require('../FileSystemInterface.js');

var fsModule = require('fs');
var shellModule = require('shelljs');
var upathModule = require('upath');
var pathModule = require('path');
class FileSystemProvider extends CoreStruct{
	/**
	 * Init FileSystemProvider
	 */
	static init(context, provider){
		return provider;
	}
	/**
	 * Returns files and folders from directory
	 * @param string basedir
	 * @return Vector<string> res - Result
	 */
	static getDirectoryListing(context, fs, basedir){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (basedir == undefined) basedir="";
				
				var res = new Vector();
		var arr = fsModule.readdirSync(basedir);
		arr = arr.sort();
		arr.forEach(function(s){
			res.push( s );
		});
		return res;
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns recursive files and folders from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	static readDirectoryRecursive(context, fs, basedir){
		var res, arr;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (basedir == undefined) basedir="";
				res = new Vector();
				arr = this.getDirectoryListing(basedir);
				arr.each((path) => {
					var path = rtl.toString(basedir)+"/"+rtl.toString(path);
					res.push(path);
					if (this.isDir(path)){
						res.appendVector(this.getDirectoryListing(path));
					}
				});
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns recursive only files from directory
	 * @param string basedir
	 * @param Vector<string> res - Result
	 */
	static getFilesRecursive(context, fs, basedir){
		var res, arr;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (basedir == undefined) basedir="";
				res = new Vector();
				arr = this.getDirectoryListing(basedir);
				arr.each((path) => {
					var path = rtl.toString(basedir)+"/"+rtl.toString(path);
					if (this.isDir(path)){
						res.appendVector(this.getFilesRecursive(path));
					}
					else {
						res.push(path);
					}
				});
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Returns content of the file
	 * @param string filepath
	 * @param string charset
	 * @return string
	 */
	static readFile(context, fs, filepath, charset){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (filepath == undefined) filepath="";
				if (charset == undefined) charset="utf8";
				
				return fsModule.readFileSync(filepath, {encoding : charset}).toString();
				return async_ctx_0.resolve("");
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Save file content
	 * @param string filepath
	 * @param string content
	 * @param string charset
	 */
	static saveFile(context, fs, filepath, content, charset){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (filepath == undefined) filepath="";
				if (content == undefined) content="";
				if (charset == undefined) charset="utf8";
				
				fsModule.writeFileSync(filepath, content, {encoding : 'utf8'});
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Open file
	 * @param string filepath
	 * @param string mode
	 * @return FileInterface
	 */
	static openFile(context, fs, filepath, mode){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (filepath == undefined) filepath="";
				if (mode == undefined) mode="";
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Make dir
	 * @param string dirpath
	 * @param boolean create_parent. Default is true
	 */
	static fileExists(context, fs, filepath){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (filepath == undefined) filepath="";
				
				if (fsModule.existsSync(filepath))
			return true;
		return false;
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Make dir
	 * @param string dirpath
	 * @param boolean create_parent. Default is true
	 */
	static makeDir(context, fs, dirpath, create_parent){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (dirpath == undefined) dirpath="";
				if (create_parent == undefined) create_parent=false;
				
				if (fsModule.existsSync(dirpath))
			return true;
		shellModule.mkdir('-p', dirpath);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Return true if path is folder
	 * @param string path
	 * @param boolean 
	 */
	static isDir(context, fs, path){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				
				return fsModule.lstatSync(path).isDirectory();
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Return true if path is file
	 * @param string path
	 * @param boolean 
	 */
	static isFile(context, fs, path){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (!this.fileExists(path)){
					return async_ctx_0.resolve(false);
				}
				return async_ctx_0.resolve(!this.isDir(path));
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Create new node
	 * @param string filepath
	 * @param string kind
	 * @param Dict options
	 * @return bool
	 */
	static createNode(context, fs, filepath, kind, options){
		var res, clear;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (options == undefined) options=null;
				res = false;
				clear = false;
				if (options){
					clear = options.get("clear", false, "bool");
				}
				if (kind == FileNode.KIND_FILE){
				}
				if (kind == FileNode.KIND_FOLDER){
				}
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Rename node
	 * @param string folderpath
	 * @param string old_name
	 * @param string new_name
	 * @return bool
	 */
	static renameNode(context, fs, folderpath, old_name, new_nam){
		var res;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				res = false;
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Delete node
	 * @param string path
	 * @return bool
	 */
	static deleteNode(context, fs, path){
		var res;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				res = false;
				return async_ctx_0.resolve(res);
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Read string from file
	 * @param string filepath
	 * @param int offset
	 * @param int count
	 * @return FileIOResult
	 */
	static readBlock(context, fs, filepath, offset, count){
		var content, bytes, size, eof;
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (count == undefined) count=-1;
				content = "";
				bytes = null;
				size = 0;
				eof = true;
				if (count == -1){
					count = 1048576;
				}
				return async_ctx_0.resolve(new FileIOResult((new Map()).set("kind", FileIOResult.KIND_READ_BINARY).set("name", filepath).set("offset", offset).set("bytes", bytes).set("count", count).set("size", size).set("eof", eof)));
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/**
	 * Read string from file
	 * @param string filepath
	 * @param int offset
	 * @param int count
	 * @return FileIOResult
	 */
	static writeBlock(context, fs, filepath, bytes, offset, count){
		return (async_ctx_0) => {
			var async_jump_0 = async_ctx_0.current();
			if (async_jump_0 == "0"){
				if (count == undefined) count=-1;
				if (count == -1){
					count = 1048576;
				}
				return async_ctx_0.resolve(new FileIOResult((new Map()).set("kind", FileIOResult.KIND_WRITE_BINARY).set("name", filepath).set("offset", offset).set("bytes", bytes).set("count", count).set("size", 0).set("eof", false)));
			}
			else if (async_jump_0 == "-1"){
				return async_ctx_0.error( async_ctx_0.getError() )
			}
			else{
				return async_ctx_0.next();
			}
			return async_ctx_0.end();
		}
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.FileSystem.Provider.FileSystemProvider";}
	static getCurrentNamespace(){return "Core.FileSystem.Provider";}
	static getCurrentClassName(){return "Core.FileSystem.Provider.FileSystemProvider";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	assignObject(obj){
		if (obj instanceof FileSystemProvider){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		return super.takeValue(variable_name, default_value);
	}
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
module.exports = FileSystemProvider;