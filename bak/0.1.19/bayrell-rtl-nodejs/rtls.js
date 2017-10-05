"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
if (typeof require == 'undefined')
	require = global.require;

var fs = require('fs');
var shell = require('shelljs');
var upath = require('upath');
var path = require('path');
/* Класс Runtime System Library */
class rtls{
    static initargs(){
		rtls.ARGV = rtl.clone(process.argv);
		rtls.ARGV.shift();
		rtls.ARGC = rtls.ARGV.length;
	}
    /*
	 * Получить параметры, передаваемые через коммандную строку
	 * @param {int} pos - Позиция параметра
	 * @param {string} def - Значение по умолчанию
	 * @return {string} 
	 */
    static argv(pos, def){
		if (rtls.ARGV == null)
			rtls.initargs();
		
		return rtl.attr(rtls.ARGV, pos, def);
	}
    /*
	 * Получить параметры, количество параметров коммандной строки
	 * @return {int} 
	 */
    static argc(pos, def){
		if (rtls.ARGV == null)
			rtls.initargs();
		
		return rtls.ARGC;
	}
    /*
	 * Выводит строку в консоль
	 * @param {string} s - Строка
	 */
    static write(s){
        rtl.write(s);
    }
    /*
	 * Выводит строку в консоль и переводит каретку на новую строку
	 * @param {string} s - Строка
	 */
    static writeln(s){
        rtl.writeln(s);
    }
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
    static mb_pathinfo(filepath){
        return rtl.mb_pathinfo(filepath);
    }
    /*
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
    static basename(filepath){
        var ret = rtl.mb_pathinfo(filepath);
        return ret["basename"];
    }
    /*
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
    static dirname(filepath){
        return rtl.dirname(filepath);
    }
    /*
	 * Нормализация пути
	 * @param {string} filepath - путь к файлу
	 * @return {string} Результат
	 */
    static path_normalize(filepath){
        return rtl.path_normalize(filepath);
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
		if (rtls.file_exists(dir_name))
			return true;
		shell.mkdir('-p', dir_name);
	}
    /*
	 * Получить список файлов
	 * @param {string} filepath - Путь к папке
	 * @param {array} arr - массив с файлами
	 */
    static scandir(filepath){
		return fs.readdirSync(filepath);
	}
    /*
	 * Копирование файла
	 * @param {string} src - откуда копировать
	 * @param {string} dest - куда копировать
	 */
    static copyFile(src, dest){
		fs.createReadStream(src).pipe(fs.createWriteStream(dest));
	}
    /*
	 * Рекурсивное копирование файлов и папок
	 * @param {string} src - откуда копировать
	 * @param {string} dest - куда копировать
	 */
    static copy(src, dest, flag_create_parent){
        if (!rtl.exists(flag_create_parent)){flag_create_parent = true;}
        if (!rtls.file_exists(src)) {
            return ;
        }
        if (flag_create_parent) {
            var dirname = rtls.dirname(dest);
            if (!rtls.file_exists(dirname)) {
                rtls.mkdir(dirname);
            }
        }
        if (rtls.is_dir(src)) {
            /* Создаем папку получатель */
            if (!rtls.file_exists(dest)) {
                rtls.mkdir(dest);
            }
            var files = rtls.scandir(src);
            for (var key in files){
                var file = files[key];
                if (file == "." || file == "..") {
                    continue;
                }
                rtls.copy(src + "/" + rtl.toString(file), dest + "/" + rtl.toString(file), false);
            }
        }
        else {
            rtls.copyFile(src, dest);
        }
    }
}
module.exports.rtls = rtls;
rtls.ARGV=null;
rtls.ARGC=0;
