/*
!
Bayrell
https://github.com/bayrell/bayrell
Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/
var m__rtl = require('./rtl.js');
var translate = m__rtl.translate;
var getStaticConst = m__rtl.getStaticConst;
var explode = m__rtl.explode;
var count = m__rtl.count;
var is_array = m__rtl.is_array;
var isset = m__rtl.isset;
var m__BayrellTranslate = require('./BayrellTranslate.js');
var BayrellTranslate = m__BayrellTranslate.BayrellTranslate;
class BayrellError extends Error {
	
	static newInstance(name, params, file_name, line, pos){
		var arr = explode("", "", name);
		var s;
		var code = -1;
		s = BayrellTranslate.translate(name, params);
		if (is_array(name) && isset(name[2])) {
			code = name[2];
		}
		var e = new BayrellError();
		e.orig_message = s;
		e.code = code;
		e.file_name = file_name;
		e.line = line;
		e.pos = pos;
		e.message = e.buildMessage();
		/*
		#switch
		#case ifcode JAVASCRIPT then
		//e.stack = arguments.callee.caller;
		e.stack = new Error().stack;
		#endswitch
		*/
		return e;
	}
	
	constructor(message, code){
		super();
	}
	
	getMessage(){
		return this.message;
	}
	
	getCode(){
		return this.code;
	}
	
	getFile(){
		return this.file_name;
	}
	
	getLine(){
		return this.line;
	}
	
	getPos(){
		return this.pos;
	}
	
	buildMessage(){
		var s = this.orig_message;
		if (this.line != null && this.pos != null) {
			s = s + " at Ln:" + this.line + ", Pos:" + this.pos;
		}
		if (this.file_name != null) {
			s = s + " in file:'" + this.file_name + "'";
		}
		s = s + ".";
		return s;
	}
	
	getObject(){
		return {code : this.getCode(),
			file : this.getFile(),
			line : this.getLine(),
			pos : this.getPos(),
			message : this.toString(),
		};
	}
}
BayrellError.ERROR_OK = ["bayrell_rtl", "ERROR_OK", 1];
BayrellError.ERROR_REQUEST_SUCCESS = ["bayrell_rtl", "ERROR_REQUEST_SUCCESS", 1];
BayrellError.ERROR_REQUEST_IN_PROGRESS = ["bayrell_rtl", "ERROR_REQUEST_IN_PROGRESS", 2];
BayrellError.ERROR_UNKNOWN = ["bayrell_rtl", "ERROR_UNKNOWN", -1];
BayrellError.ERROR_ACCESS_DENY = ["bayrell_rtl", "ERROR_ACCESS_DENY", -2];
BayrellError.ERROR_WRONG_CAPTCHA = ["bayrell_rtl", "ERROR_WRONG_CAPTCHA", -3];
BayrellError.ERROR_WRONG_CSRF_TOKEN = ["bayrell_rtl", "ERROR_WRONG_CSRF_TOKEN", -4];
BayrellError.ERROR_TOO_MANY_REQUEST = ["bayrell_rtl", "ERROR_TOO_MANY_REQUEST", -5];
BayrellError.ERROR_CONNECTION_TIMEOUT = ["bayrell_rtl", "ERROR_CONNECTION_TIMEOUT", -6];
BayrellError.ERROR_FILE_NOT_FOUND = ["bayrell_rtl", "ERROR_FILE_NOT_FOUND", -10];
BayrellError.ERROR_URL_NOT_FOUND = ["bayrell_rtl", "ERROR_URL_NOT_FOUND", -11];
BayrellError.ERROR_OBJECT_NOT_FOUND = ["bayrell_rtl", "ERROR_OBJECT_NOT_FOUND", -12];
BayrellError.ERROR_METHOD_NOT_FOUND = ["bayrell_rtl", "ERROR_METHOD_NOT_FOUND", -14];
BayrellError.ERROR_HANDLE_IS_NULL = ["bayrell_rtl", "ERROR_HANDLE_IS_NULL", -15];
BayrellError.ERROR_FILE_NAME_NOT_FOUND = ["bayrell_rtl", "ERROR_FILE_NAME_NOT_FOUND", -10];
BayrellError.ERROR_URL_NAME_NOT_FOUND = ["bayrell_rtl", "ERROR_URL_NAME_NOT_FOUND", -11];
BayrellError.ERROR_OBJECT_NAME_NOT_FOUND = ["bayrell_rtl", "ERROR_OBJECT_NAME_NOT_FOUND", -12];
BayrellError.ERROR_METHOD_NAME_NOT_FOUND = ["bayrell_rtl", "ERROR_METHOD_NAME_NOT_FOUND", -14];
BayrellError.ERROR_HANDLE_NAME_IS_NULL = ["bayrell_rtl", "ERROR_HANDLE_NAME_IS_NULL", -15];
BayrellError.ERROR_FIELDS_VALIDATION = ["bayrell_rtl", "ERROR_FIELDS_VALIDATION", -20];
BayrellError.ERROR_VALID_FIELD_REQUIRED = ["bayrell_rtl", "ERROR_VALID_FIELD_REQUIRED", -21];
BayrellError.ERROR_VALID_FIELD_WRONG_FORMAT = ["bayrell_rtl", "ERROR_VALID_FIELD_WRONG_FORMAT", -22];
BayrellError.ERROR_USER_MUST_BE_LOGIN = ["bayrell_rtl", "ERROR_USER_MUST_BE_LOGIN", -23];
BayrellError.ERROR_USER_ALREADY_LOGIN = ["bayrell_rtl", "ERROR_USER_ALREADY_LOGIN", -24];
module.exports.BayrellError = BayrellError;
