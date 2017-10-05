"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellDataObject extends BayrellObject {
    /*
	 * Конструктор
	 */
    constructor(){
        super();
        this._is_data_object = true;
        this._this_data = {};
    }
    /*
	 * Вызывается перед удалением объекта
	 */
    _before_delete(){
        rtl.bind(BayrellObject.prototype._before_delete, this)();
        this.clear();
    }
    /*
	 * Очищение объекта
	 */
    clear(){
        this._this_data = {};
    }
    /*
	 * Возвращает тип переменной
	 */
    getType(){
        return "json";
    }
    /*
	 * Возвращает тип переменной
	 */
    getData(){
        return this._this_data;
    }
    /*
	 * Возвращает данные
	 * @param {string} var_name - Название переменной
	 * @return {var} значение
	 */
    get(var_name){
        if (rtl.key_exists(this._this_data, var_name)) {
            return this._this_data[var_name];
        }
        return rtl.cNull;
    }
    /*
	 * Установка данных
	 * @param {string} var_name - Название переменной
	 * @return {var} значение
	 */
    set(var_name, value){
        this._this_data[var_name] = value;
    }
    /*
	 * Установка данных
	 * @param {var} data - Данные массив или json
	 */
    setData(data){
        this._this_data = data;
    }
}
module.exports.BayrellDataObject = BayrellDataObject;
