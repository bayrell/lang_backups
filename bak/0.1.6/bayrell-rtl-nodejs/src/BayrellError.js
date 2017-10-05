/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/

var rtl = require("./rtl.js");
var BayrellTranslate = require("./BayrellTranslate.js").BayrellTranslate;
var isset = rtl.isset;

function BayrellError(error, message=null, params=null, file=null, line=null, col=null){
	this.code = isset(BayrellError.errors[error]) ? BayrellError.errors[error] : -1; 
		
	if (message == null){
		this.message = BayrellTranslate.translate(error, params);
	}
	else
		this.message = message;
	
	this.file = file;
	this.line = line;
	this.col = col;
	this.stack = new Error().stack;
}

Object.assign( BayrellError.prototype, {
	setError(error_code, error_str=null){
	},
	
	setFieldError(field_name, error_code, error_str){
	},
	
	getFieldError(field_name){
	},
	
	setData(arr){
	},
	
	getData(){
	},
	
	getCode(){
		return this.code;
	},
	
	getMessage(){
		return this.message;
	},
	
	getLine(){
		return this.line;
	},

	getPos(){
		return this.pos;
	},

	getFile(){
		return this.file;
	},
	
	toString(){
		var str = this.message;
		
		if (this.line != null && this.col != null){
			str += " at Ln:" + this.line + ", Pos:" + this.col;
		}
		
		if (this.file != null){
			str += " in file:'" + this.file + "'";
		}
		
		str += ".";
		return str;
	},
	
	getObject(){
		return {
			message : this.toString(),
		};
	},
	
});

BayrellError.errors = {};
BayrellError.codes = {};

BayrellError.register = function(error, code){
	BayrellError.errors[error] = code;
	BayrellError.codes[code] = error;
}	

BayrellError.register('ERROR_OBJECT_CAN_NOT_BE_NESTED_IN_MAJOR_BLOCK', -1000);
BayrellError.register('ERROR_VALUE_MUST_BE_STRING', -1001);
BayrellError.register('ERROR_OBJECT_CAN_NOT_LOCATED_HERE', -1002);
BayrellError.register('ERROR_OBJECT_CAN_NOT_BE_NESTED_IN_MAJOR_BLOCK', -1003);
BayrellError.register('ERROR_OBJECT_MUST_BE_NESTED_IN_MAJOR_BLOCK', -1005);
BayrellError.register('ERROR_EXPECTED', -1006);

BayrellError.register('ERROR_IDENT_IS_RESERVER_WORD', -2001);
BayrellError.register('ERROR_UNKNOWN_IDENT', -2002);


module.exports.BayrellError = BayrellError;
