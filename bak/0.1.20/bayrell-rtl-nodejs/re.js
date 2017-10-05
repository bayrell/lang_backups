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
class re{
    static compile(r){
		if (!Array.isArray(r))
			r = [r];
		if (r.length == 1)
			r.push("g");
		
		return new RegExp(r[0], r[1]);
	}
    /*
	 * Поиск через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} s - строка, в которой происходит поиск
	 * @return {array} результат
	 */
    static match(r, s){
        return s.match(re.compile(r));
        return [];
    }
    /*
	 * Поиск через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} s - строка, в которой происходит поиск
	 * @return {array} результат
	 */
    static matchAll(r, s){
        return [];
    }
    /*
	 * Замена через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} replace - новое значение, на которое нужно заменить
	 * @param {string} s - строка, в которой происходит замена
	 * @return {string} результат
	 */
    static replace(r, replace, s){
        return s.replace(re.compile(r), replace);
    }
    static replaceArr(arr, s){
        if (Array.isArray(arr)){
			for (var i = 0; i < arr.length; i++){
				var r = arr[i];
				s = s.replace(re.compile(r[0]), r[1]);
			}
		}
		return s;
    }
}
module.exports.re = re;
