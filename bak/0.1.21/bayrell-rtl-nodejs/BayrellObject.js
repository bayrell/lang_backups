"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellTranslate = require('./BayrellTranslate.js');
var BayrellTranslate = m__BayrellTranslate.BayrellTranslate;
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellObject{
	getClassName(){
		return "bayrell_rtl.BayrellObject";
	}
	constructor(){
		this._is_deleted = false;
	}
	_before_delete(){
	}
	_del(){
		this._before_delete();
		this._is_deleted = true;
	}
	_newInstance(){
		var res = rtl.new_class(this.getClassName());
		return res;
	}
	_clone(){
		var res = rtl.new_class(this.getClassName());
		return res;
	}
	toString(){
		return "";
	}
	callStatic(name, params){
		if (!rtl.exists(params)){params = [];}
		var class_name = this.getClassName();
		return rtl.call_user_func_array(
			[class_name, name],
			params
		);
	}
}
module.exports.BayrellObject = BayrellObject;
