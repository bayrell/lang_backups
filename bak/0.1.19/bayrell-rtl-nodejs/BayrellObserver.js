"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__BayrellObservedObject = require('./BayrellObservedObject.js');
var BayrellObservedObject = m__BayrellObservedObject.BayrellObservedObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellObserver extends BayrellObject {
    /*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
    getClassName(){
        return "bayrell_rtl.BayrellObserver";
    }
    /*
	 * Конструктор
	 */
    constructor(){
        super();
        this.data = null;
        this.data = new BayrellObservedObject();
        this.data.setObserver(this);
    }
    /*
	 * Установка данных
	 * @param {json} data - Данные
	 */
    setData(data){
        this.data.setData(data);
    }
    /*
	 * Событие возникает тогда, когда значение переменной было изменено
	 * @param {string} var_name - название переменной
	 * @param {var} newValue - новое значение
	 */
    onChange(var_name, newValue){
    }
}
