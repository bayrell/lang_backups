"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
if (typeof require == 'undefined')
	require = global.require;

var upath = require('upath');
/* Класс Runtime Library */
class rtl{
	static implements(class_name){
		if (obj == undefined) return false;
		if (obj.__implements__ == undefined) return false;
		return obj.__implements__.indexOf(interface_name) != -1;
	}
	static bind(func, context) {
		return function() {
			return func.apply(context, arguments);
		};
	}
	
	static await(f, val){
		var next = f.next(val);
		if (!next.done){
			next.value.then(
				rtl.bind(
					function(res){
						rtl.await(this.f, res);
					}, 
					{
						f:f
					}
				),
				rtl.bind(
					function(res){
						this.f.throw(err);
					}, 
					{
						f:f
					}
				)
			);
		}
		else{
			return next.value;
		}
	}
	/*
	 * Транслирует имена классов через точку, в имена, 
	 * которые используются в конкретном ЯП
	 * @param {string} name - Название класса через "."
	 * @return {string} Полное имя класса
	 */
	static getClassPathByName(name){
		return name.split(".").pop();
	}
	/*
	 * Возвращает путь к файлу, где объявлен класс
	 * @param {string} name - Название класса через "."
	 * @return {string} Полное имя класса
	 */
	static getFilePathByClassName(name){
		var arr = name.split(".");
		var name = arr.shift();
		
		var path1 = rtl.getModulePath(name);
		var path2 = arr.join("/");
		
		return path1 + "/" + path2 + ".js";
	}
	/*
	 * Возвращает путь к модулю
	 * @param {string} name - Название класса через "."
	 * @return {string} Полное имя класса
	 */
	static getModulePath(name){
		var path1 = "";
		if (name == 'root'){
			path1 = rtl.dirname(require.main.filename);
		}
		else{
			path1 = require.resolve(name);
			path1 = rtl.dirname(path1);
		}
		return path1;
	}
	/*
	 * Возвращает название модуля по имени класса или namespace
	 * @param {string} name - Название класса через "."
	 * @return {string} Полное имя класса
	 */
	static getModuleName(name){
		var arr = rtl.explode(".", name);
		return arr[0];
	}
	/*
	 * Возвращает название класса
	 * @param {string} name - Название класса через "."
	 * @return {string} Имя класса
	 */
	static getClassName(name){
		var arr = rtl.explode(".", name);
		return rtl.array_pop(arr);
	}
	/*
	 * Возвращает название пространства имен, в котором находится класс
	 * @param {string} name - Название класса через "."
	 * @return {string} Полное имя класса
	 */
	static getNamespace(name){
		var arr = rtl.explode(".", name);
		rtl.array_pop(arr);
		return rtl.implode(".", arr);
	}
	/*
	 * Возвращает ссылку на класс
	 * @param {string} name - Название класса через "."
	 * @return {var} Ссылка на класс
	 */
	static find_class(cls){
		if (rtl.is_string(cls)){
			var path = rtl.getFilePathByClassName(cls);
			var name = rtl.getClassName(cls);
			var m = require(path);
			
			if (typeof m == "undefined"){
				throw new Error(cls + 'not found');
			}
			
			return m[name];
		}
		return cls;
	}
	/*
	 * Возвращает ссылку на класс
	 * @param {string} name - Название класса через "."
	 * @return {var} Ссылка на класс
	 */
	static class_exists(class_name){
		var cls = rtl.getClassPathByName(class_name);
		try{
			var f = rtl.find_class(cls);
			if (rtl.exists(f))
				return true;
		}
		catch (e){
		}
		return false;
	}
	/*
	 * Создать класс по его имени или экземпляру класса
	 * @return {var} Возвращает объект класса
	 */
	static new_class(cls){
		if (cls instanceof Function)
			return cls();
		
		var f = rtl.find_class(cls);
		return new f;
	}
	/*
	 * Вызывает пользовательскую функцию с массивом параметров
	 * @param {var} callback - Вызываемая функция
	 * @param {array} params - Передаваемые в функцию параметры
	 * @return {var} результат
	 */
	static call_user_func_array(callback, args){
		if (!rtl.exists(args))
			args = [];
		
		var res = null;
		if (rtl.is_array(callback) && callback.length >= 2){
			var f = null;
			var ctx = {};
			
			var cls_s = callback[0];
			var method = callback[1];
			
			var cls = rtl.find_class(cls_s);
			ctx = cls;
			f = cls[method];
			
			if (!rtl.exists(f)){
				throw new Error('Method "' + method + '" not found in class ' + cls_s);
				return null;
			}
			
			res = f.apply(ctx, args);
		}
		
		return res;
	}
	/*
	 * Вызывает пользовательскую функцию с массивом параметров
	 * @param {var} callback - Вызываемая функция
	 * @param {array} params - Передаваемые в функцию параметры
	 * @return {var} результат
	 */
	static call_user_func(class_name, func_name, params){
		if (!rtl.exists(params)){params = [];}
		return rtl.call_user_func_array(
			[class_name, func_name],
			params
		);
	}
	/*
	 * Получить Trace
	 * @param {string} clrf - Перенос строки. По умолчанию \n. Для PHP <br/>\n
	 * @return {string} 
	 */
	/*
	 * Вызвать api функцию в локальном проекте
	 * @param {string} clrf - Перенос строки. По умолчанию \n. Для PHP <br/>\n
	 * @return {string} 
	 */
	/*
	 * Выводит строку в консоль
	 * @param {string} s - Строка
	 */
	static write(s){
		console.log(s);
	}
	/*
	 * Выводит строку в консоль и переводит каретку на новую строку
	 * @param {string} s - Строка
	 */
	static writeln(s){
		console.log(s);
	}
	/* ===================== Работа со строками ===================== */
	/*
	 * Дамп значения переменной
	 * @param {variable} value - Переменная
	 */
	static dump(value, is_br){
		if (!rtl.exists(is_br)){is_br = false;}
		
		return "";
	}
	/*
	 * Дамп значения переменной
	 * @param {variable} value - Переменная
	 */
	static var_dump(x){
		console.log(x);
	}
	/*
	 * Возвращает ASCII-код символа
	 * @param {char} ch - Символ
	 */
	static ord(s){
		return rtl.toString(s).charCodeAt(0);
	}
	/*
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	static trim(s){
		return rtl.toString(s).trim();
	}
	/*
	 * Возвращает длинну строки
	 * @param {string} s - Строка, для которой нужно вычислить длинну строки
	 * @return {integer} длинна строки
	 */
	static strlen(s){
		return rtl.toString(s).length;
	}
	/*
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	static str_repeat(s, n){
		var result = '';
		for (var i=0; i < n; i++){
			result += s;
		}
		return result;
	}
	/*
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	static strpos(s, search, offset){
		if (!rtl.exists(offset)) offset = 0;
		var res = rtl.toString(s).indexOf(search);
		return res;
	}
	/*
	 * Преобразование строки в нижний регистр
	 * @param {string} s - строка 
	 * @return {string} результат 
	 */
	static strtolower(s){
		return rtl.toString(s).toLowerCase();
	}
	/*
	 * Преобразование строки в верхний регистр
	 * @param {string} s - строка 
	 * @return {string} результат 
	 */
	static strtoupper(s){
		return rtl.toString(s).toUpperCase();
	}
	/*
	 * Возвращает подстроку
	 * @param {string} s - входная строка. Должна содержать хотя бы один символ. 
	 * @param {integer} start - стартовая позиция
	 * @param {integer} len - длина строки
	 * @return {string} подстрока 
	 */
	static substr(s, start, len){
		if (!rtl.exists(len)) len = null;
		s = rtl.toString(s);
		if (len === null) return s.substr(start);
		else if (len >= 0) return s.substr(start, len);
		else if (len < 0) return s.substr(start, s.length - start + len);
		return "";
	}
	/*
	 * Экранирует спецсимволы строки HTML
	 * @param {string} s - кодируемая строка
	 * @return {string} экранированная строка
	 */
	static html_escape(s){
		var obj = {
			"&" : "&amp;",
			"<" : "&lt;",
			">" : "&gt;",
			'"' : "&quot;",
			"'" : "&#039;",
		};
		
		for (var key in obj){
			s = s.replace(new RegExp(key, "g"), obj[key]);
		}
		
		return s;
	}
	/*
	 * Кодирует в base64
	 * @param {string} s - кодируемая строка
	 * @return {string} base64 строка
	 */
	static base64_encode(s){
		return btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
	}
	/*
	 * Декодирует из base64 в строку
	 * @param {string} s - декодируемая строка в base64
	 * @return {string} строка 
	 */
	static base64_decode(s){
		return decodeURIComponent(Array.prototype.map.call(atob(s), function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	}
	/*
	 * json decode
	 * @param {string} s - строка 
	 * @return {json} результат 
	 */
	static json_decode(s){
		return JSON.parse(s);
	}
	/*
	 * json encode
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	static json_encode(obj, flags = 0){
		if (flags & rtl.JSON_PRETTY_PRINT == rtl.JSON_PRETTY_PRINT) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	}
	/*
	 * Разбивает строку
	 * @param {string} delimiter - разделитель
	 * @param {string} s - строка 
	 * @param {integer} limit - ограничение 
	 * @return {array} массив
	 */
	static explode(delimiter, s, limit){
		if (!rtl.exists(limit)){
			return s.split(delimiter);
		}
		return s.split(delimiter, limit);
	}
	/*
	 * Объединяет строку
	 * @param {string} glue - регулярное выражение 
	 * @param {array} pieces - массив 
	 * @return {string} результат
	 */
	static implode(glue, pieces){
		return ((pieces instanceof Array) ? pieces.join(glue) : pieces.join());
	}
	/*
	 * Удаляет последний UNIX слэш из строки
	 * @param {string} s - строка
	 * @return {string} результат
	 */
	static remove_last_slash(s){     
		return s.replace(/\/$/, "");
	}
	/*
	 * Подставляет из params в строку s параметры, экранированные в '%'
	 * @param {string} s - строка 
	 * @param {json} params - параметры 
	 * @return {string} строка
	 */
	static format(s, params){
		s = new String(s);
		for (var key in params){
			var value = params[key];
			s = s.replace(new RegExp("%" + rtl.toString(key) + "%", "i"), value);
		}
		return s;
	}
	/* ===================== Работа со временем ===================== */
	/*
	 * Возвращает текущую метку времени Unix
	 * @return {int} результат
	 */
	static time(){
		return Math.floor(Date.now() / 1000);
	}
	/*
	 * Возвращает текущую метку времени Unix с микросекундами
	 * @return {var} результат
	 */
	static microtime(){
		return Date.now() / 1000;
	}
	/*
	 * Форматирует дату/время по Гринвичу
	 * @param {string} format Формат выводимой даты
	 * @param {int} timestamp  
	 * @return {int} результат
	 */
	static gmdate(format, timestamp){
		if (!rtl.exists(timestamp)) timestamp = rtl.time();
		return "";
	}
	/*
	 * Возвращает время по Гринвичу в формате YYYY-MM-DD HH:MM:SS
	 * @param {int} timestamp   
	 * @return {string} результат
	 */
	static gmtimedb(timestamp){
		if (!rtl.exists(timestamp)){timestamp = -1;}
		if (timestamp < 0) {
			timestamp = rtl.time();
		}
		return rtl.gmdate("Y-m-d H:i:s", timestamp);
	}
	/*
	mktime
	int mktime ([ int $hour = date("H") [, int $minute = date("i") [, int $second = date("s") [, int $month = date("n") [, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] )
	*/
	/* ===================== Работа со переменными ===================== */
	/**
	 * Рекурсивно клонирует переменную
	 * @param {var} val - Переменная, которую нужно скопировать
	 * @return {var} результат
	 */
	static clone(val){
		
		if (val == null)
			return null;
		
		else if (val instanceof Number){
			return new Number(val);
		}
		else if (val instanceof String){
			return new String(val);
		}
		else if (val instanceof Boolean){
			return new Boolean(val);
		}
		else if (val instanceof Date){
			return new Date(val);
		}
		else if (Array.isArray(val)){	
			var res = [];
			for (var i=0;i<val.length;i++){
				res[i] = rtl.clone(val[i]);
			}
			return res;
		}
		else if (typeof val == 'object'){
			var res = {};
			
			if (val.nodeType && typeof val.cloneNode == "function"){
				return val.cloneNode(true);
			}
			else if (typeof val._clone == "function"){
				return val._clone();
			}
			else if (val.prototype){
				res = new item.constructor();
			}
			
			for (var i in val){
				res[i] = rtl.clone(val[i]);
			}
			
			return res;
		}
		
		return val;
	}
	/*
	 * Инвертирует массив
	 * @param {array} arr - Объект
	 * @return {array} результат
	 */
	static array_reverse(arr){
		return arr.reverse();
	}
	/*
	 * Сортирует массив
	 * @param {array} arr - Объект
	 * @return {array} результат
	 */
	static array_sort(arr){
		return arr.sort();
	}
	/*
	 * Извлекает последний элемент массива
	 * @param {array} arr - массив
	 * @return {var} извлеченный элемент
	 */
	static array_pop(arr){
		return arr.pop();
	}
	/*
	 * Помещает в конец массива элемент
	 * @param {array} arr - массив
	 * @param {mixed} val - значение
	 */
	static array_push(arr, val){
		if (Array.isArray(arr)) arr.push(val);
		else arr = [val];
	}
	/*
	 * Извлекает элемент из начала массива
	 * @param {array} arr - массив
	 * @return {var} извлеченный элемент
	 */
	static array_shift(arr){
		return arr.shift();
	}
	/*
	 * Добавляет один или несколько элементов в начало массива
	 * @param {array} arr - массив
	 * @param {mixed} val - значение
	 */
	static array_unshift(arr, val){
		if (Array.isArray(arr)) arr.unshift(val);
		else arr = [val];
	}
	/*
	 * Cлияние двух массивов
	 * @param {array} arr1 - массив1
	 * @param {array} arr2 - массив2
	 * @return {array} Результат
	 */
	static array_merge (arr1, arr2){
		return arr1.concat(arr2);
	}
	static json_merge(j1, j2){
		return Object.assign(j1, j2);
	}
	/*
	 * Выбирает срез массива
	 * @param {array} arr - Входной массив
	 * @param {int} offset - смещение
	 * @param {int} length - длинна
	 * @return {array} Результат
	 */
	static array_slice (arr, offset, len){
		return arr.slice(offset, len);
	}
	/*
	 * Рекурсивное слияние двух или более массивов
	 *
	 * @param {array} arr1 - массив1
	 * @param {array} arr2 - массив2
	 * @return {array} Результат
	 */
	/*
	static array_merge_recursive (arr1, arr2){
		return Object.assign(arr1, arr2);
	}
	*/
	/*
	 * Возвращает количество объектов в val
	 * @param {var} val - массив, объект или строка
	 * @return {integer} Число
	 */
	static count(val){
		var t = typeof val;
		if (!rtl.exists(val)) return 0;
		
		if (Array.isArray(val) || t == 'string'){
			return val.length;
		}
		if (t == 'object'){
			
			if (rtl.exists(val._is_data_object)){
				if (val.gettype() == 'array'){
					return val._this_length;
				}
				return 0;
			}
			
			var res=0;
			for (var i in val) 
				if (val.hasOwnProperty(i))
					res++;
			return res;
		}
		return 0;
	}
	static length(val){
		return rtl.count(val);
	}
	/*
	 * Проверяет, является ли val строкой
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_string(val){
		if (typeof val == 'string') return true;
		return false;
	}
	/*
	 * Проверяет, является ли val переменной целочисленного типа
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_number(val){
		if (typeof val == 'number') return true;
		return false;
	}
	/*
	 * Проверяет, является ли переменная числом или строкой, содержащей число
	 * @param {mixed} val - переменная
	 * @return {boolean} результат
	 */
	static is_number_str(val){
		if (val=='') return false;
		return !isNaN(val);
	}
	/*
	 * Проверяет, является ли val переменной целочисленного типа
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_bool(val){
		if (typeof val == 'boolean') return true;
		return false;
	}
	/*
	 * Проверяет, является ли val массивом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_array(val){
		if (!rtl.exists(val)) return false;
		if ( (typeof val == 'object') && (rtl.exists(val._is_data_object)) ){
			return val.gettype() == 'array';
		}
		if (Array.isArray(val)) return true;
		return false;
	}
	/*
	 * Проверяет, является ли val объектом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_json(val){
		if (!rtl.exists(val)) return false;
		
		if ( (typeof val == 'object') && (rtl.exists(val._is_data_object)) ){
			return val.gettype() == 'json';
		}
		
		if (typeof val == 'object' && !Array.isArray(val)) return true;
		return false;
	}
	/*
	 * Проверяет, является ли val массивом или объектом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
	static is_json_or_array(val){
		if (!rtl.exists(val)) return false;
		if (typeof val == 'object' || Array.isArray(val)) return true;
		return false;
	}
	static is_array_or_json(val){
		if (!rtl.exists(val)) return false;
		if (typeof val == 'object' || Array.isArray(val)) return true;
		return false;
	}
	/*
	 * Возвращает тип переменной
	 * @param {mixed} val - переменная
	 * @return {string} название переменной
	 */
	static gettype(val){
		
		if (val == null) return "null";
		if (val instanceof Number) return "number";
		if (val instanceof String) return "string";
		if (val instanceof Boolean) return "boolean";
		if (val instanceof Date) return "date";
		if (Array.isArray(val)) return "array";
		
		if (typeof val == 'object'){
			var res = {};
			
			if (val.nodeType && typeof val.cloneNode == "function") return "node";
			if (val.prototype) return "object";
			
			return "json";
		}
		
		return "unknown";
	}
	/*
	 * Возвращает имя класса, к которому принадлежит объект
	 * @param {json} obj - Объект
	 * @return {string} название класса
	 */
	static get_class(obj) {
		if (obj instanceof Object && !(obj instanceof Array) &&	!(obj instanceof Function) && obj.constructor) {
			var arr = obj.constructor.toString().match(/function\s*(\w+)/);
			if (arr && arr.length == 2) {
				return arr[1];
			}
		}
		return false;
	}
	/*
	 * Проверяет определена ли переменная или нет
	 * @param {mixed} val - переменная
	 * @return {boolean} если Истина, то переменая определена
	 */
	/*
	static isset(a){ 
		return (a != null) && ((typeof a) != 'undefined');
	}*/
	static exists(a){ 
		return (a != null) && ((typeof a) != 'undefined');
	}
	static exist(val){
		return rtl.exists(val);
	}
	static is_exists(val){
		return rtl.exists(val);
	}
	static is_exist(val){
		return rtl.exists(val);
	}
	/*
	 * Проверяет переменная равна нулю или не существует
	 * @param {mixed} val - переменная
	 * @return {boolean} если Истина, то переменая не определена или равна 0
	 */
	static iszero(val){
		if (!rtl.exists(val)) {
			return true;
		}
		return val === null || val === false || val === 0 || val === "" || val === "false" || val === "0";
	}
	/*
	 * Проверяет существует ли переменная и не равна ли она нулю
	 * @param {mixed} val - переменная
	 * @return {boolean} если Истина, то переменая определена и не равна 0
	 */
	static nozero(val){
		return !rtl.iszero(val);
	}
	/*
	 * Проверяет, присутствует ли в объекте arr указанный ключ key или индекс
	 * @param {var} key - ключ
	 * @param {json} obj - Массив
	 * @return {boolean} Истина, если ключ есть
	 */
	static key_exists(arr, key){
		if (typeof arr == 'object' || Array.isArray(arr)){
			return rtl.exists(arr[key]);
		}
		return false;
	}
	/*
	 * Проверяет, arr[key] равен нулю или его вообще не существует
	 * @param {var} key - ключ
	 * @param {json} obj - Массив
	 * @return {boolean} Истина, если ключ есть
	 */
	static key_zero(obj, key){
		if (!rtl.key_exists(obj, key)) {
			return true;
		}
		if (rtl.iszero(obj[key])) {
			return true;
		}
		return false;
	}
	/*
	 * Проверяет, присутствует arr[key] существует и не равен нулю
	 * @param {var} key - ключ
	 * @param {json} obj - Массив
	 * @return {boolean} Истина, если ключ есть
	 */
	static key_nozero(obj, key){
		if (!rtl.key_exists(obj, key)) {
			return false;
		}
		if (rtl.iszero(obj[key])) {
			return false;
		}
		return true;
	}
	/*
	 * Проверяет вхождение значения val в массив arr
	 * @param {mixed} val - переменная
	 * @param {array} arr - массив, в котором нужно найти значение val
	 * @return {boolean} если Истина, то значение val входит в массив
	 */
	static in_array(val, arr) {
		var t = rtl.gettype(arr);
		if (t == 'array' || t == 'object'){
			for (var i in arr)
				if (arr.hasOwnProperty(i))
					if (arr[i] == val)
						return true;
		}
		return false;
	}
	/*
	 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
	 * @param {mixed} arr - переменная
	 * @param {mixed} key - ключ
	 * @param {mixed} def - значение по умолчанию
	 * @return {mixed} arr[key]
	 */
	static attr(val, key, defval){
		if (!rtl.exists(defval)){defval = null;}
		if (rtl.is_array_or_json(val)) {
			if (rtl.key_exists(val, key)) {
				return val[key];
			}
		}
		return defval;
	}
	/*
	 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
	 * ключ может быть составным, разделенным через точку. В этом случае значение будет 
	 * искаться в подмассивах
	 * @param {mixed} arr - переменная
	 * @param {array|string} keys - ключ
	 * @param {mixed} def - значение по умолчанию
	 * @return {mixed} arr[key]
	 */
	static attrj(arr, keys, defval){
		if (!rtl.exists(defval)){defval = null;}
		if (!rtl.is_array(keys)) {
			keys = rtl.explode(".", keys);
		}
		var val = arr;
		var sz = rtl.count(keys);
		for (var i = 0; i < sz; i++) {
			var s = keys[i];
			if (rtl.key_exists(val, s)) {
				val = val[s];
			}
			else {
				return defval;
			}
		}
		return val;
	}
	/*
	 * Удаляет значение arr[key]
	 * @param {mixed} arr - переменная
	 * @param {mixed} key - ключ
	 * @param {mixed} def - значение по умолчанию
	 * @return {mixed} arr[key]
	 */
	static remove(arr, key){
		if (!rtl.exists(arr)) return false;
		
		if (Array.isArray(arr)){
			if (rtl.exists(arr[key])){
				arr.splice(key, 1);
			}
		}
		
		else if (typeof arr == 'object'){
			if (rtl.exists(arr[key])){
				delete arr[key];
			}
		}
	}
	static array_remove(arr, key){
		rtl.remove(arr, key);
	}
	static key_delete(arr, key){
		rtl.remove(arr, key);
	}
	/*
	 * obj[key] = val
	 * @param {array|json} obj - переменная
	 * @param {mixed} key - ключ
	 * @param {mixed} val - значение по умолчанию
	 * @return {mixed} новый массив
	 */
	static add(obj, key, value){
		if (rtl.is_array(obj)) {
			if (key == null) {
				rtl.array_push(obj, value);
			}
			else {
				obj[key] = value;
			}
		}
		else if (rtl.is_json(obj)) {
			obj[key] = value;
		}
	}
	/*
	 * obj[key] = val
	 * @param {array|json} obj - переменная
	 * @param {array} key - ключ
	 * @param {mixed} val - значение по умолчанию
	 * @return {mixed} новый массив
	 */
	static addj(obj, keys, value){
		if (!rtl.is_array(keys)) {
			keys = rtl.explode(".", keys);
		}
		var sz = rtl.count(keys);
		for (var i = 0; i < sz; i++) {
			var key = keys[i];
			if (i == sz - 1) {
				obj[key] = value;
				return ;
			}
			if (!rtl.key_exists(obj, key)) {
				obj[key] = {};
			}
			obj = obj[key];
		}
	}
	/*
	 * Возвращает ключи объекта
	 * @param {array|json} obj - Объект
	 * @return {array} результат
	 */
	static keys(obj){
		if (!rtl.exists(obj)) return [];
		
		if (!rtl.is_array_or_json(obj))
			return [];
		
		if ( (typeof val == 'object') && (rtl.exists(val._is_data_object)) ){
			return Object.keys(obj.getdata());
		}
		
		return Object.keys(obj);
	}
	/*
	 * Возвращает значения объекта
	 * @param {array|json} obj - Объект
	 * @return {array} результат
	 */
	static values(obj){
		if (!rtl.exists(obj)) return [];
		
		if (!rtl.is_array_or_json(obj))
			return [];

		if ( (typeof val == 'object') && (rtl.exists(val._is_data_object)) ){
			return Object.values(obj.getdata());
		}
		
		return Object.values(obj);
	}
	/*
	 * Строит индекс по массиву
	 * @param {array} arr - Массив json объектов
	 * @param {string} field_name - По какому полю построить индекс
	 * @return {json} Индекс
	 */
	static buildIndex(arr, field_name){
		var index = {};
		var sz = rtl.count(arr);
		for (var i = 0; i < sz; i++) {
			index[arr[i][field_name]] = i;
		}
		return index;
	}
	/*
	 * Получить значение из массива, используя индекс
	 * @param {array} arr - Массив json объектов
	 * @param {json} index - Индекс этого массива
	 * @return {json} Результат
	 */
	static xindex(arr, index, key, defval){
		if (!rtl.exists(defval)){defval = null;}
		var pos = rtl.attr(index, key, -1);
		if (pos == -1) {
			return defval;
		}
		return rtl.attr(arr, pos, defval);
	}
	/* ===================== Математические функции ===================== */
	/*
	 * Возвращает случайное число от a до b включительно, a <= x <= b
	 * @param {integer} a - число 1
	 * @param {integer} b - число 2
	 * @return случайное число x
	 */
	static rand(a, b){
		return Math.floor(Math.random() * (b + 1 - a) + a);
	}
	/*
	 * Возвращает случайное число от a до b, a <= b
	 * @param {integer} a - число 1
	 * @param {integer} b - число 2
	 * @return случайное число
	 */
	static mt_rand(a, b){
		return Math.floor(Math.random() * (b - a) + a);
	}
	/*
	 * Округляет число
	 * @param {float} val - число 1
	 * @return результат
	 */
	static round(val){
		return Math.round(val);
	}
	/*
	 * Округляет дробь в меньшую сторону
	 * @param {float} val - число 1
	 * @return результат
	 */
	static floor(val){
		return Math.floor(val);
	}
	/*
	 * Округляет дробь в большую сторону
	 * @param {float} val - число 1
	 * @return результат
	 */
	static ceil(val){
		return Math.ceil(val);
	}
	/*
	 * Возвращает максимальное значение среди значений массива
	 * @param {array} arr - массив
	 * @return максимальное значение
	 */
	static maxA(arr){
		return Math.max(arr);
	}
	/*
	 * Возвращает минимальное значение среди значений массива
	 * @param {array} arr - массив
	 * @return минимальное значение
	 */
	static minA(arr){
		return Math.min(arr);
	}
	/*
	 * возвращает остаток от деления a на b
	 * @param {int} a
	 * @param {int} b
	 * @return Результат
	 */
	static mod(a, b){
		return Math.floor(a) % b;
	}
	/*
	 * Целочисленное деление a на b
	 * @param {int} a
	 * @param {int} b
	 * @return Результат
	 */
	static div(a, b){
		return Math.floor(a / b);
	}
	/* ===================== Функции по преобразованию типов ===================== */
	/*
	 * Преобразовывает s в строку, если она таковой не является
	 * @param {var} s - переменная
	 * @return {string} строка
	 */
	static toString(val){
		if (typeof val == 'string') return val;
		if (val instanceof String) return val;
		return new String(val);
	}
	/*
	 * Преобразовывает x в число
	 * @param {var} val - переменная
	 * @return {string} число 
	 */
	static toInt(val){
		return parseInt(val);
	}
	/*
	 * Преобразование из 16 системы счистления в 10
	 * @param {string} s - число в 16-й системе счистления
	 * @return {int} Результат
	 */
	static hexdec(s){
		return 0;
	}
	/*
	 * Преобразование из 10 системы счистления в 16
	 * @param {int} a - число в 10-й системе счистления
	 * @return {string} Результат
	 */
	static dechex(a){
		return 0;
	}
	/*
	 * Генерация UUID
	 * @return {string} строка вида xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
	 */
	static uuid(){
		var res = [];
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
		var arr_sz = rtl.count(arr);
		var step_arr = [8, 4, 4, 4, 12];
		var step_sz = rtl.count(step_arr);
		for (var step = 0; step < step_sz; step++) {
			var r = "";
			var c = step_arr[step];
			for (var i = 0; i < c; i++) {
				r += rtl.toString(arr[rtl.rand(0, arr_sz - 1)]);
			}
			rtl.array_push(res, r);
		}
		return rtl.implode("-", res);
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
	static mb_pathinfo(filepath) {
		var ret = [], m = [];
		
		var r = new RegExp('^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$', 'im');
		var m = filepath.match(r);
		
		ret['dirname'] = rtl.exists(m[1]) ? m[1] : '';
		ret['basename'] = rtl.exists(m[2]) ? m[2] : '';
		ret['extension'] = rtl.exists(m[5]) ? m[5] : '';
		ret['filename'] = rtl.exists(m[3]) ? m[3] : '';
		return ret;
	}
	/*
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	static basename(filepath){
		var ret = rtl.mb_pathinfo(filepath);
		return ret["basename"];
	}
	/*
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	static extname(filepath){
		var ret = rtl.mb_pathinfo(filepath);
		return ret["extension"];
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
	/* ===================== Функции работы с цветом ===================== */
	/*
	 * Преобразование из RGB в 16-й в RGB в 10-й
	 * @param {string} color - цвет формата #RRGGBB
	 * @return {array} Результат вида [red, green, blue]
	 */
	static hexToRgb(color){
		var len = rtl.strlen(color);
		var res = [0, 0, 0];
		if (len == 0) {
			return res;
		}
		if (color[0] == "#") {
			color = rtl.substr(color, 1);
			len = len - 1;
		}
		if (len == 3 || len == 6) {
			for (var i = 0; i < 3; i++) {
				if (len == 3) {
					res[i] = rtl.hexdec(color[i] + rtl.toString(color[i]));
				}
				else if (len == 6) {
					res[i] = rtl.hexdec(color[2 * i] + rtl.toString(color[(2 * i) + 1]));
				}
			}
		}
		return res;
	}
	/*
	 * Преобразование из RGB в 16-й в RGB в 10-й
	 * @param {array} color - массив вида [red, green, blue]
	 * @return {string} Цвет вида #RRGGBB
	 */
	static RgbToHex(res){
		var s = "#";
		var sz = rtl.count(res);
		for (var i = 0; i < sz; i++) {
			var color = rtl.round(res[i]);
			if (color < 0) {
				color = 0;
			}
			else if (color > 256) {
				color = 255;
			}
			var val = rtl.dechex(color);
			if (rtl.strlen(val) == 1) {
				val = "0" + rtl.toString(val);
			}
			s += rtl.toString(val);
		}
		return s;
	}
	/*
	 * Преобразование из RBG в HSB, где:
	 * - h in [0, 360]; 
	 * - r,g,b in [0, 255]; 
	 * - s,v in [0, 100];
	 * @param {array} color - массив вида [red, green, blue]
	 * @return {array} Цвет вида [hue, saturation, bright]
	 */
	static RgbToHsb(res){
		var r = res[0];
		var g = res[1];
		var b = res[2];
		if (r > 255) {
			r = 255;
		}
		if (r < 0) {
			r = 0;
		}
		if (g > 255) {
			g = 255;
		}
		if (g < 0) {
			g = 0;
		}
		if (b > 255) {
			b = 255;
		}
		if (b < 0) {
			b = 0;
		}
		r = r / 255;
		g = g / 255;
		b = b / 255;
		var max = rtl.maxA(
			[r, g, b]
		);
		var min = rtl.minA(
			[r, g, b]
		);
		var h = 0;
		var s = 0;
		var v = 0;
		if (max == min) {
			h = 0;
		}
		else if (max == r && g >= b) {
			h = (60 * (g - b) / (max - min)) + 0;
		}
		else if (max == r && g < b) {
			h = (60 * (g - b) / (max - min)) + 360;
		}
		else if (max == g) {
			h = (60 * (b - r) / (max - min)) + 120;
		}
		else if (max == b) {
			h = (60 * (r - g) / (max - min)) + 240;
		}
		if (max == 0) {
			s = 0;
		}
		else {
			s = 1 - (min / max);
		}
		v = max;
		return [h, s * 100, v * 100];
	}
	/*
	 * Преобразование из HSB в RBG, где:
	 * - h in [0, 360]; 
	 * - r,g,b in [0, 255]; 
	 * - s,v in [0, 100];
	 * @param {array} color - массив вида [hue, saturation, bright]
	 * @return {array} Цвет вида [red, green, blue]
	 */
	static HsbToRgb(res){
		var H = res[0];
		var S = res[1];
		var V = res[2];
		if (H > 360) {
			H = 360;
		}
		if (H < 0) {
			H = 0;
		}
		if (S > 100) {
			S = 100;
		}
		if (S < 0) {
			S = 0;
		}
		if (V > 100) {
			V = 100;
		}
		if (V < 0) {
			V = 0;
		}
		var Hi = rtl.mod(H / 60, 6);
		var Vmin = (100 - S) * V / 100;
		var a = (V - Vmin) * rtl.mod(H, 60) / 60;
		var Vinc = Vmin + a;
		var Vdec = V + a;
		Vmin = Vmin * 255 / 100;
		Vinc = Vinc * 255 / 100;
		Vdec = Vdec * 255 / 100;
		V = V * 255 / 100;
		if (Hi == 0) {
			return [V, Vinc, Vmin];
		}
		if (Hi == 1) {
			return [Vdec, V, Vmin];
		}
		if (Hi == 2) {
			return [Vmin, V, Vinc];
		}
		if (Hi == 3) {
			return [Vmin, Vdec, V];
		}
		if (Hi == 4) {
			return [Vinc, Vmin, V];
		}
		if (Hi == 5) {
			return [V, Vmin, Vdec];
		}
	}
	/*
	 * Увеличение яркости цвета rgb на b
	 * @param {string} color - Цвет вида #RRGGBB
	 * @param {float} b - Множитель яркости
	 * @return {string} Цвет вида #RRGGBB
	 */
	static bright(color, b){
		var rgb = rtl.hexToRgb(color);
		var hsb = rtl.rgbToHsb(rgb);
		hsb[2] = hsb[2] * b;
		rgb = rtl.HsbToRgb(hsb);
		return rtl.RgbToHex(rgb);
	}
}
rtl.INDENT = "  ";
rtl.CLR = "\n";
rtl.cNull = null;
rtl.JSON_PRETTY_PRINT = 128;
module.exports.rtl = rtl;
