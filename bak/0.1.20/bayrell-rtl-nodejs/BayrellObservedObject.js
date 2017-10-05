"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__BayrellDataObject = require('./BayrellDataObject.js');
var BayrellDataObject = m__BayrellDataObject.BayrellDataObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellObservedObject extends BayrellDataObject {
    /*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
    getClassName(){
        return "bayrell_rtl.BayrellObservedObject";
    }
    /*
	 * Возвращает название наблюдаемого класса объекта
	 * @return {string} 
	 */
    getObesrvedObjectClassName(){
        return "bayrell_rtl.BayrellObservedObject";
    }
    /*
	 * Конструктор
	 */
    constructor(){
        super();
        this._this_parent_name = "";
        this._this_type = "";
        this._this_length = 0;
        this._this_observer = null;
        this._this_data = null;
    }
    /*
	 * Установить наблюдателя
	 */
    setObserver(obj){
        this._this_observer = obj;
    }
    /*
	 * Получить наблюдателя
	 */
    getObserver(){
        return this._this_observer;
    }
    /*
	 * Возвращает полное имя переменной
	 */
    getFullName(var_name){
        if (this._this_parent_name == "") {
            return var_name;
        }
        if (this._this_type == "json") {
            return this._this_parent_name + "." + rtl.toString(var_name);
        }
        if (this._this_type == "array") {
            return this._this_parent_name + "[" + rtl.toString(var_name) + "]";
        }
        return var_name;
    }
    /*
	 * Устанавливает имя родителя, чтобы вычислять полное имя переменной
	 */
    setParentName(name){
        this._this_parent_name = name;
    }
    /*
	 * Возвращает тип переменной
	 */
    gettype(){
        return this._this_type;
    }
    /*
	 * Очищение объекта
	 */
    clear(){
        var keys = rtl.keys(this._this_data);
        var keys_sz = rtl.count(keys);
        for (var keys_i = 0; keys_i < keys_sz; keys_i++) {
            var key = keys[keys_i];
            if (rtl.key_exists(this._this_data[key], "_this_data")) {
                /*delete this._this_data[key];*/
                this._this_data[key]._del();
            }
        }
        this._this_data = {};
        this._this_length = {};
    }
    /*
	 * Установка данных без уведомления
	 * @param {string} var_name - Название переменной
	 * @return {var} значение
	 */
    setItem(var_name, value){
        var is_set = rtl.key_exists(this._this_data, var_name);
        var is_object = rtl.is_array_or_json(value);
        if (!is_set) {
            if (is_object) {
                var item = rtl.new_class(this.getObesrvedObjectClassName());
                item.setParentName(this.getFullName(var_name));
                item.setObserver(this._this_observer);
                item.setData(value);
                this._this_data[var_name] = item;
            }
            else {
                this._this_data[var_name] = value;
            }
        }
        else {
            var is_item = rtl.key_exists(this._this_data[var_name], "_this_data");
            if (is_item && is_object) {
                this._this_data[var_name].setData(value);
            }
            else if (is_item && !is_object) {
                /*delete this._this_data[var_name];*/
                this._this_data[var_name]._del();
                this._this_data[var_name] = value;
            }
            else if (!is_item && is_object) {
                var item = rtl.new_class(this.getObesrvedObjectClassName());
                item.setParentName(this.getFullName(var_name));
                item.setObserver(this._this_observer);
                item.setData(value);
                this._this_data[var_name] = item;
            }
            else if (!is_item && !is_object) {
                this._this_data[var_name] = value;
            }
        }
    }
    /*
	 * Установка данных
	 * @param {string} var_name - Название переменной
	 * @return {var} значение
	 */
    set(var_name, value){
        this.setItem(var_name, value);
        /* Отправляем уведомление об изменении переменной */
        if (this._this_observer != null) {
            this._this_observer.onChange(this.getFullName(var_name), value);
        }
    }
    /*
	 * Установка данных
	 * @param {var} data - Данные массив или json
	 */
    setData(data){
        this.clear();
        this._this_type = rtl.gettype(data);
        if (this._this_type == "array") {
            this._this_length = rtl.count(data);
        }
        var keys = rtl.keys(data);
        var keys_sz = rtl.count(keys);
        for (var keys_i = 0; keys_i < keys_sz; keys_i++) {
            var var_name = keys[keys_i];
            var val = data[var_name];
            this.setItem(var_name, val);
        }
    }
}
module.exports.BayrellObservedObject = BayrellObservedObject;
