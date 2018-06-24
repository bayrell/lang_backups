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
var rtl = require('../Lib/rtl.js');
var ContextInterface = require('../Interfaces/ContextInterface.js');

class ClassException extends Error { _init(){} }
class RuntimeException extends ClassException{
	constructor(context, message, code, prev){
		if (context == undefined) context=null;
		if (message == undefined) message="";
		if (code == undefined) code=0;
		if (prev == undefined) prev=null;
		super(message, code, prev);
		if (context == null){
			context = rtl.globalContext();
		}
		this.context = context;
		this.message = message;
		this.code = code;
		this.prev = prev;
		this.file = "";
		this.line = -1;
		this.pos = -1;
	}
	getPreviousException(){
		return this.prev;
	}
	getErrorMessage(){
		return this.message;
	}
	getErrorCode(){
		return this.code;
	}
	getFileName(){
		return this.file;
	}
	setFileName(file){
		this.file = file;
	}
	getErrorLine(){
		return this.line;
	}
	setErrorLine(line){
		this.line = line;
	}
	getErrorPos(){
		return this.pos;
	}
	setErrorPos(pos){
		this.pos = pos;
	}
	toString(){
		var s = this.message;
		if (this.line != -1 && this.pos != -1){
			s = rtl.toString(s)+" at Ln:"+rtl.toString(this.line)+", Pos:"+rtl.toString(this.pos);
		}
		if (this.file != ""){
			s = rtl.toString(s)+" in file:'"+rtl.toString(this.file)+"'";
		}
		return s;
	}
}
module.exports = RuntimeException;