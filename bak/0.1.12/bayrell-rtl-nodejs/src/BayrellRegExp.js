"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016-2017 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
  */
var m__BayrellError = require('./BayrellError.js');
var BayrellError = m__BayrellError.BayrellError;
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellRegExp{
	constructor(p, f){
		this._pattern = "";
		this._flags = "";
		if (!rtl.exists(f)){f = "i";}
		this._pattern = p;
		this._flags = f;
	}
	compile(){
		return new RegExp(this._pattern, this._flags);
	}
	match(r, s){
	}
	static replace(r, replace, s){
		return s.replace(r.compile(), replace);
	}
	static replaceArr(arr, s){
		if (Array.isArray(arr)){
			for (var i = 0; i < arr.length; i++){
				var r = arr[i];
				s = s.replace(r[0].compile(), r[1]);
			}
		}
		return s;
	}
}
module.exports.BayrellRegExp = BayrellRegExp;
