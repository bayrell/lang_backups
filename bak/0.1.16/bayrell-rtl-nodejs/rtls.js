"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
if (typeof require == 'undefined')
	require = global.require;

var fs = require('fs');
var shell = require('shelljs');
var upath = require('upath');
var path = require('path');
/* Класс Runtime System Library */
class rtls{
    /* ===================== Функции по работе с ФС ===================== */
    /*
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
    static mb_pathinfo(filepath) {
		var ret = [], m = [];
		
		var r = new RegExp('^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$', 'im');
		var m = filepath.match(r);
		
		ret['dirname'] = rtl.isset(m[1]) ? m[1] : '';
		ret['basename'] = rtl.isset(m[2]) ? m[2] : '';
		ret['extension'] = rtl.isset(m[5]) ? m[5] : '';
		ret['filename'] = rtl.isset(m[3]) ? m[3] : '';
		return ret;
	}
    /*
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
    static dirname(filepath){
        var ret = rtl.mb_pathinfo(filepath);
        return ret["dirname"];
    }
    /*
	 * Нормализация пути
	 * @param {string} filepath - путь к файлу
	 * @return {string} Результат
	 */
    static path_normalize(filepath){
		return upath.normalize(file_path);
	}
    /*
	 * Получить контент файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {string} Содержимое файла
	 */
    static file_get_contents(filepath){
		return fs.readFileSync(filepath, {encoding : 'utf8'}).toString();
	}
    /*
	 * Сохраняет контент файла
	 * @param {string} filepath - полный путь к файлу
	 */
    static file_put_contents(filepath, content){
		fs.writeFileSync(filepath, content, {encoding : 'utf8'});
	}
    /*
	 * Проверяет существование файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {boolean} Истина, если файл существует
	 */
    static file_exists(filepath){
		return fs.existsSync(filepath);
	}
    /*
	 * Проверяет существование файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {boolean} Истина, если файл существует
	 */
    static is_dir(filepath){
		return fs.lstatSync(filepath).isDirectory();
	}
    /*
	 * Получает метку последнего редактирования файла
	 * @param {string} filepath - полный путь к файлу
	 * @return {string} метка последнего редактирования файла
	 */
    static filemtime (filepath){
		var fd = fs.openSync(filepath, 'r');
		var stat = fs.fstatSync(fd);
		return stat.mtime.toISOString();
	}
    /*
	 * Рекурсивное создание папки
	 * @param {string} dir_name - полный путь к папке
	 */
    static mkdir(dir_name){
		shell.mkdir('-p', dir_name);
	}
}
module.exports.rtls = rtls;
