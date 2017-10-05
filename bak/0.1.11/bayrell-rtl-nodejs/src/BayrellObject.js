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
	constructor(){
		this._ptr_count = 1;
	}
	_before_delete(){
	}
	_cp(){
		this._ptr_count++;
		return this;
	}
	_del(){
		this._ptr_count--;
		if (this._ptr_count == 0) {
			this._before_delete();
		}
	}
	static newInstance(){
		return rtl.new_class(this);
	}
	toString(){
		return "";
	}
}
module.exports.BayrellObject = BayrellObject;
