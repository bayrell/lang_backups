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
class BayrellObserver extends BayrellObservedObject {
	/*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
	getClassName(){
		return "bayrell_rtl.BayrellObserver";
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
		this.data = null;
		this.data = rtl.new_class(this.getObesrvedObjectClassName());
		this.data.setObserver(this);
	}
	/*
	 * Событие возникает тогда, когда значение переменной было изменено
	 * @param {string} var_name - название переменной
	 * @param {var} newValue - новое значение
	 */
	onChange(var_name, newValue){
	}
}
