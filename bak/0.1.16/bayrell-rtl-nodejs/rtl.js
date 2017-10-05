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
    static bind(func, context) {
		return function() {
			return func.apply(context, arguments);
		};
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
	 * Создать класс по его имени или экземпляру класса
	 * @return {var} Возвращает объект класса
	 */
    static new_class(cls){
		if (cls instanceof Function)
			return cls();
			
		return null;
	}
    /*
	 * Вызывает пользовательскую функцию с массивом параметров
	 * @param {var} callback - Вызываемая функция
	 * @param {array} params - Передаваемые в функцию параметры
	 * @return {var} результат
	 */
    static call_user_func_array(callback, args){
		if (!rtl.isset(args))
			args = [];
		
		var res = null;
		if (rtl.is_array(callback)){
			var f = null;
			var ctx = {};
			
			for (var i=0;i<callback.length;i++){
					
				if (f == null){
					
					if (rtl.is_string(callback[i])){
						var r = this.explode(".", callback[i]);
						var cls = r[ r.length - 1 ];
						f = eval(cls);
					}
					else{
						ctx = callback[i];
						f = callback[i];
					}
				}
				else{
					var cls = callback[i];
					f = f[cls];
				}
				
				if (!rtl.exists(f))
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
    static call_user_func(callback, params){
        if (!rtl.exists(params)){params = [];}
        return rtl.call_user_func_array(callback, params);
    }
    /*
	 * Получить Trace
	 * @param {string} clrf - Перенос строки. По умолчанию \n. Для PHP <br/>\n
	 * @return {string} 
	 */
    /* ===================== Работа со строками ===================== */
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
		if (!rtl.isset(limit)){
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
		return Date.now() / 1000
	}
    /*
	 * Форматирует дату/время по Гринвичу
	 * @param {string} format Формат выводимой даты
	 * @param {int} timestamp  
	 * @return {int} результат
	 */
    static gmdate(format, timestamp){
		if (!rtl.isset(timestamp)) timestamp = rtl.time();
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
		if (t == 'undefined' || val == null){
			return 0;
		}
		if (Array.isArray(val) || t == 'string'){
			return val.length;
		}
		if (t == 'object'){
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
	 * Проверяет, является ли val массивом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
    static is_array(val){
		if (Array.isArray(val)) return true;
		return false;
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
    static is_numeric(val){
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
	 * Проверяет, является ли val объектом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
    static is_json(val){
		if (!rtl.exists(val)) return false;
		if (typeof val == 'object' && !Array.isArray(val)) return true;
		return false;
	}
    /*
	 * Проверяет, является ли val массивом или объектом
	 * @param {mixed} переменная
	 * @return {boolean} результат
	 */
    static is_json_or_array(val){
		if (typeof val == 'object' || Array.isArray(val)) return true;
		return false;
	}
	static is_array_or_json(val){
		if (typeof val == 'object' || Array.isArray(val)) return true;
		return false;
	}
    /*
	 * Возвращает тип переменной
	 * @param {mixed} val - переменная
	 * @return {string} название переменной
	 */
    static gettype(val){
		if (Array.isArray(val)) return "array";
		return typeof val;
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
    static isset(a){ 
		return (a != null) && ((typeof a) != 'undefined');
	}
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
			return rtl.isset(arr[key]);
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
    static attr(arr, key, defval){
        if (!rtl.exists(defval)){defval = null;}
        if (rtl.is_array_or_json(arr)) {
            if (rtl.key_exists(arr, key)) {
                return arr[key];
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
    static remove(arr, key, defval, type){
		if (Array.isArray(arr)){
			if (rtl.isset(arr[key])){
				arr.splice(key, 1);
			}
		}
		
		else if (typeof arr == 'object'){
			if (rtl.isset(arr[key])){
				delete arr[key];
			}
		}
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
		return Object.keys(obj);
	}
    /*
	 * Возвращает значения объекта
	 * @param {array|json} obj - Объект
	 * @return {array} результат
	 */
    static values(obj){
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
	 * Возвращает случайное число от a до b, a <= b
	 * @param {integer} a - число 1
	 * @param {integer} b - число 2
	 * @return случайное число
	 */
    static rand(a, b){
		return Math.floor(Math.random() * (b - a) + a);
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
}
rtl.INDENT = "  ";
rtl.CLR = "\n";
rtl.JSON_PRETTY_PRINT = 128;
module.exports.rtl = rtl;
