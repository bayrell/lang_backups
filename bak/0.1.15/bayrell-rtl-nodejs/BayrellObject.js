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
    static getClassName(){
        return "bayrell_rtl.BayrellObject";
    }
    constructor(){
        this._ptr_count = 1;
    }
    _before_delete(){
    }
    _cp(){
        this._ptr_count++;
        return this;
    }
    _clone(){
        res = rtl.new_class(this);
        for (var i in this){
			res[i] = rtl.clone(this[i]);
		}
        return res;
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
    static getModuleName(){
        var class_full_name = BayrellObject.callMe("getClassName");
        var arr = rtl.explode(".", class_full_name);
        return arr[0];
    }
    static getNamespace(){
        var class_full_name = BayrellObject.callMe("getClassName");
        var arr = rtl.explode(".", class_full_name);
        rtl.array_pop(arr);
        return rtl.implode(".", arr);
    }
    static callMe(func_name, params){
        if (!rtl.exists(params)){params = [];}
        var class_name = this;
        return rtl.call_user_func(
            [class_name, func_name],
            params
            );
    }
    toString(){
        return "";
    }
}
module.exports.BayrellObject = BayrellObject;
