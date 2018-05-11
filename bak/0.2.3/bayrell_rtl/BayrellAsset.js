"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016-2017 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
class BayrellAsset extends BayrellObject {
	/*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
	getClassName(){
		return "bayrell_rtl.BayrellAsset";
	}
	/*
	 * Получить значение флага
	 * @param {string} name - Название флага
	 * @return {string} 
	 */
	isFlag(name){
		return true;
	}
	/*
	 * Строит пути
	 * @param {string} root_path - Корневой путь к проекту
	 * @return {string} 
	 */
	makePath(root_path){
		this.vendor_path = root_path + "/vendor";
		this.assets_path = root_path + "/web/assets";
	}
	/*
	 * Возвращает название Asset
	 * @return {string} 
	 */
	getName(){
		return "asset";
	}
	/*
	 * Возвращает список репозиториев проекта
	 * @return {string} 
	 */
	getRepositories(){
		return [];
	}
	/*
	 * Возвращает список зависимостей ввиде других Asset
	 * @return {array} - массив строк с полными названиями других Asset
	 */
	getAssets(){
		return [];
	}
	/*
	 * Возвращает список имен зависимостей
	 * @param {string} prefix - добавляемая строка в начале имени
	 * @param {string} postfix - добавляемая строка в конце имени
	 * @return {array} - массив имен
	 */
	getAssetNames(prefix, postfix){
		if (!rtl.exists(prefix)){prefix = "";}
		if (!rtl.exists(postfix)){postfix = "";}
		var res = [];
		var arr = this.getAssets();
		var sz = rtl.count(arr);
		for (var i = 0; i < sz; i++) {
			var asset = arr[i];
			var obj = rtl.new_class(asset);
			var name = prefix + rtl.toString(obj.getName()) + rtl.toString(postfix);
			rtl.array_push(res, name);
			obj._del();
		}
		return res;
	}
	/*
	 * Возвращает правила сборки проекта в один файл
	 * @return {json} 
	 */
	getBundleRules(){
		return {};
	}
	/*
	 * Возвращает правила копирования файлов в папку /assets
	 * @return {array} 
	 */
	getCopyFilesRules(){
		return [];
	}
	/*
	 * Возвращает порядок загрузки css и js файлов.
	 * Массивы располагаются в порядке загрузки
	 * @return {array} 
	 */
	getLoadRules(){
		return [];
	}
}
module.exports.BayrellAsset = BayrellAsset;
