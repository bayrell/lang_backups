"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var Utils = require('./Utils.js');
var PathInfo = require('../Types/PathInfo.js');

var fsModule = require('fs');
var shellModule = require('shelljs');
var upathModule = require('upath');
var pathModule = require('path');
class fs{
	_init(){
	}
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	static pathinfo(filepath){
		return Utils.pathinfo(filepath);
	}
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static basename(filepath){
		return Utils.basename(filepath);
	}
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static extname(filepath){
		return Utils.extname(filepath);
	}
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	static dirname(filepath){
		return Utils.dirname(filepath);
	}
	/**
	 * Нормализация пути
	 * @param {string} filepath - путь к файлу
	 * @return {string} Результат
	 */
	
	static pathNormalize(filepath){
		return upath.normalize(file_path);
	}
	/**
	 * Получить контент файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {string} Содержимое файла
	 */
	
	static fileGetContents(filepath){
		return fsModule.readFileSync(filepath, {encoding : 'utf8'}).toString();
	}
	/**
	 * Сохраняет контент файла
	 * @param {string} filepath - полный путь к файлу
	 */
	
	static filePutContents(filepath, content){
		fsModule.writeFileSync(filepath, content, {encoding : 'utf8'});
	}
	/**
	 * Проверяет существование файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {boolean} Истина, если файл существует
	 */
	
	static fileExists(filepath){
		return fsModule.existsSync(filepath);
	}
	/**
	 * Проверяет существование файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {boolean} Истина, если файл существует
	 */
	
	static isDir(filepath){
		return fsModule.lstatSync(filepath).isDirectory();
	}
	/**
	 * Рекурсивное создание папки
	 * @param {string} dir_name - полный путь к папке
	 */
	
	static mkdir(dir_name){
		if (fsModule.existsSync(dir_name))
			return true;
		shellModule.mkdir('-p', dir_name);
	}
}
module.exports = fs;