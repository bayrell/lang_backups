/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
/* 
var JSON_PRETTY_PRINT = 128; */
if (typeof require == 'undefined')
	require = global.require;

var fs = require('fs');
var shell = require('shelljs');
var upath = require('upath');
var path = require('path');
function bind(func, context) {
	return function() {
		return func.apply(context, arguments);
	};
}
module.exports.bind = bind;
/* 
 * Создать класс по его имени или экземпляру класса
 * @return {var} Возвращает объект класса
 */
function new_class(cls){
	if (cls instanceof Function)
		return cls();	
	return new window[cls];
}
module.exports.new_class = new_class;
/* 
 * Вызывает пользовательскую функцию с массивом параметров
 * @param {var} callback - Вызываемая функция
 * @param {array} params - Передаваемые в функцию параметры
 * @return {string} 
 */
/*  declare export var call_user_func_array(var callback, array params); */
/*  declare export var call_user_func(var callback); */
/*  ===================== Работа со строками ===================== */
/* 
 * Дамп значения переменной
 * @param {variable} value - Переменная
 */
function var_dump(x){
	console.log(x);
}
module.exports.var_dump = var_dump;
/* 
 * Возвращает ASCII-код символа
 * @param {char} ch - Символ
 */
function ord(s){
	return toString(s).charCodeAt(0);
}
module.exports.ord = ord;
/* 
 * Удаляет лишние символы слева и справа
 * @param {string} s - входная строка
 * @return {integer} новая строка
 */
function trim(s){
	return toString(s).trim();
}
module.exports.trim = trim;
/* 
 * Возвращает длинну строки
 * @param {string} s - Строка, для которой нужно вычислить длинну строки
 * @return {integer} длинна строки
 */
function strlen(s){
	return toString(s).length;
}
module.exports.strlen = strlen;
/* 
 * Возвращает повторяющуюся строку
 * @param {string} s - повторяемая строка
 * @param {integer} n - количество раз, которые нужно повторить строку s
 * @return {string} строка
 */
function str_repeat(s, n){
	var result = '';
	for (var i=0; i < n; i++){
		result += s;
	}
	return result;
}
module.exports.str_repeat = str_repeat;
/* 
 * Ищет позицию первого вхождения подстроки search в строке s.
 * @param {string} s - строка, в которой производится поиск 
 * @param {string} search - строка, которую ищем 
 * @param {string} offset - если этот параметр указан, 
 *                 то поиск будет начат с указанного количества символов с начала строки.  
 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
 *                    Если строка не найдена, то вернет false
 */
function strpos(s, search, offset){
	var res = toString(s).indexOf(search);
	if (res == -1)
		return false;
	return res;
}
module.exports.strpos = strpos;
/* 
 * Ищет позицию первого вхождения подстроки search в строке s.
 * @param {string} s - строка, в которой производится поиск 
 * @param {string} search - строка, которую ищем 
 * @param {string} offset - если этот параметр указан, 
 *                 то поиск будет начат с указанного количества символов с начала строки.  
 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
 *                    Если строка не найдена, то вернет -1
 */
function strfind(s, search, offset){
	var res = toString(s).indexOf(search);
	return res;
}
module.exports.strfind = strfind;
/* 
 * Преобразование строки в нижний регистр
 * @param {string} s - строка 
 * @return {string} результат 
 */
function strtolower(s){
	return toString(s).toLowerCase();
}
module.exports.strtolower = strtolower;
/* 
 * Преобразование строки в верхний регистр
 * @param {string} s - строка 
 * @return {string} результат 
 */
function strtoupper(s){
	return toString(s).toUpperCase();
}
module.exports.strtoupper = strtoupper;
/* 
 * Возвращает подстроку
 * @param {string} s - входная строка. Должна содержать хотя бы один символ. 
 * @param {integer} start - стартовая позиция
 * @param {integer} len - длина строки
 * @return {string} подстрока 
 */
function substr(s, start, len = null){
	s = toString(s);
	if (len === null) return s.substr(start);
	else if (len >= 0) return s.substr(start, len);
	else if (len < 0) return s.substr(start, s.length - start + len);
	return "";
}
module.exports.substr = substr;
/* 
 * Кодирует в base64
 * @param {string} s - кодируемая строка
 * @return {string} base64 строка
 */
function base64_encode(s){
	return btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
module.exports.base64_encode = base64_encode;
/* 
 * Декодирует из base64 в строку
 * @param {string} s - декодируемая строка в base64
 * @return {string} строка 
 */
function base64_decode(s){
	return decodeURIComponent(Array.prototype.map.call(atob(s), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
module.exports.base64_decode = base64_decode;
/* 
 * json decode
 * @param {string} s - строка 
 * @return {object} результат 
 */
function json_decode_ex(s){
	return JSON.parse(s);
}
module.exports.json_decode_ex = json_decode_ex;
/* 
 * json encode
 * @param {mixed} obj - объект
 * @param {int} flags - Флаги
 * @return {string} json строка
 */
function json_encode_ex(obj, flags = 0){
	var JSON_PRETTY_PRINT = 128;
	if (flags & JSON_PRETTY_PRINT == JSON_PRETTY_PRINT) 
		return JSON.stringify(obj, null, 2);
	
	return JSON.stringify(obj);
}
module.exports.json_encode_ex = json_encode_ex;
/* 
 * Разбивает строку
 * @param {string} delimiter - разделитель
 * @param {string} s - строка 
 * @param {integer} limit - ограничение 
 * @return {array} массив
 */
function explode(delimiter, s, limit){
	if (!isset(limit)){
		return s.split(delimiter);
	}
	return s.split(delimiter, limit);
}
module.exports.explode = explode;
/* 
 * Объединяет строку
 * @param {string} glue - регулярное выражение 
 * @param {array} pieces - массив 
 * @return {string} результат
 */
function implode(glue, pieces){
	return ((pieces instanceof Array) ? pieces.join(glue) : pieces.join());
}
module.exports.implode = implode;
/* 
 * Поиск спомощью регулярных выражений
 * @param {string} regex - регулярное выражение 
 * @param {string} s - строка 
 * @param {object} res - результат 
 * @return {boolean} Истина, если поиск успешен
 */
function preg_match(regex, s, res){
	if (!(regex instanceof RegExp))	regex = new RegExp(regex);
	r = s.match(regex);
	if (r){
		if (typeof res != 'undefined' && Array.isArray(res)){
			for (var i = 0; i < r.length; i++){
				res.push(r[i]);
			}
		}
		return true;
	}
	return false;
}
module.exports.preg_match = preg_match;
/* 
 * Производит постановку replace в s на основе регулярного выражения regex
 * @param {string|array} pattern - Искомый шаблон. Может быть как строкой, так и массивом строк.
 * @param {string|array} replace - заменяемое выражение 
 * @param {string|array} subject - Строка или массив строк для поиска и замены 
 * @param {int} limit - Максимально возможное количество замен каждого шаблона
 * @return {string|array} возвращает массив, если параметр subject является массивом, иначе возвращается строка
 */
function preg_replace(pattern, replace, subject, limit){
	if (!isset(limit)) limit = -1;

	if ((typeof pattern == 'string' || pattern instanceof RegExp) && typeof replace == 'string'){
		if (!(pattern instanceof RegExp)) pattern = new RegExp(pattern, 'g');
		return subject.replace(pattern, replace);
	}
	if (Array.isArray(pattern) && Array.isArray(replace) && pattern.length == replace.length){
		for (var i = 0; i < pattern.length; i++){
			var r = pattern[i];
			if (!(r instanceof RegExp))	r = new RegExp(r, 'g');
			subject = subject.replace(r, replace[i]);
		}
		return subject;
	}
	
	return null;
	
	/*
	var s = toString(s);
	if (Array.isArray(regex) && Array.isArray(replace) && regex.length == replace.length){
		for (var i = 0; i < regex.length; i++){
			var r = regex[i];
			var s = replace[i];
			if (!(r instanceof RegExp))	r = new RegExp(r, 'g');
			s = s.replace(r, s);
		}
	}
	else if ((typeof regex == 'string' || regex instanceof RegExp) && typeof replace == 'string'){
		if (!(regex instanceof RegExp))	regex = new RegExp(regex, 'g');
		return s.replace(regex, replace);
	}
	return s;
	*/
}
module.exports.preg_replace = preg_replace;
/* 
 * Удаляет последний UNIX слэш из строки
 * @param {string} s - строка
 * @return {string} результат
 */
function remove_last_slash(s){     
    return s.replace(/\/$/, "");
}
module.exports.remove_last_slash = remove_last_slash;
/* 
 * Подставляет из params в строку s параметры, экранированные в '%'
 * @param {string} s - строка 
 * @param {object} params - параметры 
 * @return {string} строка
 */
function format(s, params){
	var keys = [];
	var values = [];
	for (var key in params){
		var value = params[key];
		array_push(keys, "%" + toString(key) + "%");
		array_push(values, value);
	}
	s = preg_replace(keys, values, s);
	return s;
}
module.exports.remove_last_slash = remove_last_slash;
/*  ===================== Работа со временем ===================== */
/* 
 * Возвращает текущую метку времени Unix
 * @return {int} результат
 */
function time(){
	return Math.floor(Date.now() / 1000);
}
module.exports.time = time;
/* 
 * Возвращает текущую метку времени Unix с микросекундами
 * @param {bol} get_as_float - Если указано и установлено в TRUE, microtime() возвратит float вместо string, 
 *                             как описано в разделе возвращаемых значений ниже
 * @return {var} результат
 */
function microtime(get_as_float){
	if (!isset(get_as_float)) get_as_float = false;
	if (get_as_float == true) return Date.now() / 1000;
	
	return "";
}
module.exports.microtime = microtime;
/* 
mktime
int mktime ([ int $hour = date("H") [, int $minute = date("i") [, int $second = date("s") [, int $month = date("n") [, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] ) */
/*  ===================== Работа со переменными ===================== */
/* 
 * Клонирует переменную
 * @param {var} val - Переменная, которую нужно скопировать
 * @return {var} результат
 */
function clone(val){
	if (val == null)
		return null;
	
	if (Array.isArray(val))
		return val.slice(0);
	
	if (typeof val == 'object') 
		return Object.assign({}, val);
	
	return val;
}
module.exports.clone = clone;
/* 
 * Инвертирует массив
 * @param {array} arr - Объект
 * @return {array} результат
 */
function array_reverse(arr){
	return arr.reverse();
}
module.exports.array_reverse = array_reverse;
/* 
 * Сортирует массив
 * @param {array} arr - Объект
 * @return {array} результат
 */
function array_sort(arr){
	return arr.sort();
}
module.exports.array_sort = array_sort;
/* 
 * Извлекает последний элемент массива
 * @param {array} arr - массив
 * @return {var} извлеченный элемент
 */
function array_pop(arr){
	return arr.pop();
}
module.exports.array_pop = array_pop;
/* 
 * Помещает в конец массива элемент
 * @param {array} arr - массив
 * @param {mixed} val - значение
 */
function array_push(arr, val){
	if (Array.isArray(arr)) arr.push(val);
	else arr = [val];
}
module.exports.array_push = array_push;
/* 
 * Cлияние двух массивов
 * @param {array} arr1 - массив1
 * @param {array} arr2 - массив2
 * @return {array} Результат
 */
function array_merge (arr1, arr2){
	return arr1.concat(arr2);
}
module.exports.array_merge = array_merge;
/* 
 * Рекурсивное слияние двух или более массивов
 *
 * @param {array} arr1 - массив1
 * @param {array} arr2 - массив2
 * @return {array} Результат
 */
/* 
function array_merge_recursive (arr1, arr2){
	return Object.assign(arr1, arr2);
} */
/* 
 * Возвращает количество объектов в val
 * @param {var} val - массив, объект или строка
 * @return {integer} Число
 */
function count(val){
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
module.exports.count = count;
/* 
 * Проверяет, является ли val массивом
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_array(val){
	if (Array.isArray(val)) return true;
	return false;
}
module.exports.is_array = is_array;
/* 
 * Проверяет, является ли val строкой
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_string(val){
	if (typeof val == 'string') return true;
	return false;
}
module.exports.is_string = is_string;
/* 
 * Проверяет, является ли val объектом
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_object(val){
	if (typeof val == 'object' && !Array.isArray(val)) return true;
	return false;
}
module.exports.is_object = is_object;
/* 
 * Проверяет, является ли val массивом или объектом
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_object_or_array(val){
	if (typeof val == 'object' || Array.isArray(val)) return true;
	return false;
}
function is_array_or_object(val){
	if (typeof val == 'object' || Array.isArray(val)) return true;
	return false;
}
module.exports.is_object_or_array = is_object_or_array;
module.exports.is_array_or_object = is_array_or_object;
/* 
 * Проверяет, является ли val числом
 * @param {mixed} val - переменная
 * @return {boolean} результат
 */
function is_numeric(val){
	return !isNaN(val);
}
module.exports.is_numeric = is_numeric;
/* 
 * Возвращает тип переменной
 * @param {mixed} val - переменная
 * @return {string} название переменной
 */
function gettype(val){
	if (Array.isArray(val)) return "array";
	return typeof val;
}
module.exports.gettype = gettype;
/* 
 * Возвращает имя класса, к которому принадлежит объект
 * @param {object} obj - Объект
 * @return {string} название класса
 */
function get_class(obj) {
	if (obj instanceof Object && !(obj instanceof Array) &&	!(obj instanceof Function) && obj.constructor) {
		var arr = obj.constructor.toString().match(/function\s*(\w+)/);
		if (arr && arr.length == 2) {
			return arr[1];
		}
	}
	return false;
}
module.exports.gettype = gettype;
/* 
 * Проверяет определена ли переменная или нет
 * @param {mixed} val - переменная
 * @return {boolean} если Истина, то переменая определена
 */
function isset(a){ 
	return (a != null) && ((typeof a) != 'undefined') || (a == false);
}
module.exports.isset = isset;
/* 
 * Проверяет вхождение значения val в массив arr
 * @param {mixed} val - переменная
 * @param {array} arr - массив, в котором нужно найти значение val
 * @return {boolean} если Истина, то значение val входит в массив
 */
function in_array(val, arr) {
	var t = gettype(arr);
	if (t == 'array' || t == 'object'){
		for (var i in arr)
			if (arr.hasOwnProperty(i))
				if (arr[i] == val)
					return true;
	}
	return false;
}
module.exports.in_array = in_array;
/* 
 * Проверяет, присутствует ли в объекте arr указанный ключ key или индекс
 * @param {var} key - ключ
 * @param {object} obj - Массив
 * @return {boolean} Истина, если ключ есть
 */
function key_exists(key, arr){
	if (is_object(arr)){
		return ((typeof arr[key]) != 'undefined');
	}
	return false;
}
module.exports.key_exists = key_exists;
/* 
 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
 * @param {mixed} arr - переменная
 * @param {mixed} key - ключ
 * @param {mixed} def - значение по умолчанию
 * @return {mixed} arr[key]
 */
function xarr(arr, key, defval){
	if (isset(arr[key])){
		return arr[key];
	}
	if (typeof defval === "undefined"){
		defval = null;
	}
	return defval;
}
module.exports.xarr = xarr;
/* 
 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
 * ключ может быть составным, разделенным через точку. В этом случае значение будет 
 * искаться в подмассивах
 * @param {mixed} arr - переменная
 * @param {array|string} keyArr - ключ
 * @param {mixed} def - значение по умолчанию
 * @return {mixed} arr[key]
 */
/*  declare var xarrj(var arr, *args, var defval = null); */
function xarrj(arr, args, kwargs){
	defval = isset(kwargs['defval'])?kwargs['defval']:null;
	for (var i=0; i<count(args); i++){
		var key = args[i];
		if (isset(arr[key])){
			arr = arr[key];
		}
		else{
			arr = defval;
			break;
		}
	}
	return arr;
}
module.exports.xarrj = xarrj;
/* 
 * obj[key] = val
 * @param {array|object} obj - переменная
 * @param {mixed} key - ключ
 * @param {mixed} val - значение по умолчанию
 * @return {mixed} новый массив
 */
function xadd(obj, key, value){
	var t = gettype(obj);
	if (t == 'array'){
		if (key == null){
			array_push(obj, value);
		}
		else{
			obj[key] = value;
		}
		return obj;
	}
	if (t != 'object'){
		obj = {};
	}
	obj[key] = value;
	return obj;
}
module.exports.xadd = xadd;
/* 
 * Возвращает ключи объекта
 * @param {array|object} obj - Объект
 * @return {array} результат
 */
function xkeys(obj){
	return Object.keys(obj);
}
module.exports.xkeys = xkeys;
/* 
 * Возвращает значения объекта
 * @param {array|object} obj - Объект
 * @return {array} результат
 */
function xvalues(obj){
	return Object.values(obj);
}
module.exports.xvalues = xvalues;
/*  ===================== Математические функции ===================== */
/* 
 * Возвращает случайное число от a до b, a <= b
 * @param {integer} a - число 1
 * @param {integer} b - число 2
 * @return случайное число
 */
function rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}
module.exports.rand = rand;
/* 
 * Возвращает случайное число от a до b, a <= b
 * @param {integer} a - число 1
 * @param {integer} b - число 2
 * @return случайное число
 */
function mt_rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}
module.exports.mt_rand = mt_rand;
/*  ===================== Функции по преобразованию типов ===================== */
/* 
 * Преобразовывает s в строку, если она таковой не является
 * @param {var} s - переменная
 * @return {string} строка
 */
function toString(val){
	if (typeof val == 'string') return val;
	if (val instanceof String) return val;
	return new String(val);
}
module.exports.toString = toString;
/* 
 * Преобразовывает x в число
 * @param {var} val - переменная
 * @return {string} число 
 */
function toInt(val){
	return parseInt(val);
}
module.exports.toInt = toInt;
/*  ===================== Функции по работе с ФС ===================== */
/* 
 * Разбивает путь файла на составляющие
 * @param {string} filepath путь к файлу
 * @return {object} Объект вида:
 *         dirname    - папка, в которой находиться файл
 *         basename   - полное имя файла
 *         extension  - расширение файла
 *         filename   - имя файла без расширения
 */
function mb_pathinfo(filepath) {
	var ret = [], m = [];
    preg_match(new RegExp('^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$', 'im'), filepath, m);
    ret['dirname'] = isset(m[1]) ? m[1] : '';
    ret['basename'] = isset(m[2]) ? m[2] : '';
    ret['extension'] = isset(m[5]) ? m[5] : '';
    ret['filename'] = isset(m[3]) ? m[3] : '';
    return ret;
}
module.exports.mb_pathinfo = mb_pathinfo;
/* 
 * Возвращает путь к папке, содержащий файл
 * @param {string} filepath - путь к файлу
 * @return {string} путь к папке, содержащий файл
 */
function dirname(filepath){
	ret = mb_pathinfo(filepath);
	return ret['dirname'];
}
module.exports.dirname = dirname;
/* 
 * Нормализация пути
 * @param {string} filepath - путь к файлу
 * @return {string} Результат
 */
function path_normalize(filepath){
	return null;
}
function path_normalize(filepath){
	return upath.normalize(file_path);
}
module.exports.path_normalize = path_normalize;
/* 
 * Получить контент файла
 * @param {string} filepath - полный путь к файлу
 * @return {string} Содержимое файла
 */
function file_get_contents(filepath){
	return fs.readFileSync(filepath, {encoding : 'utf8'}).toString();
}
module.exports.file_get_contents = file_get_contents;
/* 
 * Сохраняет контент файла
 * @param {string} filepath - полный путь к файлу
 */
function file_put_contents(filepath, content){
	fs.writeFileSync(filepath, content, {encoding : 'utf8'});
}
module.exports.file_put_contents = file_put_contents;
/* 
 * Проверяет существование файла
 * @param {string} filepath - полный путь к файлу
 * @return {boolean} Истина, если файл существует
 */
function file_exists(filepath){
	return fs.existsSync(filepath);
}
module.exports.file_exists = file_exists;
/* 
 * Получает метку последнего редактирования файла
 * @param {string} filepath - полный путь к файлу
 * @return {string} метка последнего редактирования файла
 */
function filemtime (filepath){
	var fd = fs.openSync(filepath, 'r');
	var stat = fs.fstatSync(fd);
	return stat.mtime.toISOString();
}
module.exports.filemtime = filemtime;
/* 
 * Рекурсивное создание папки
 * @param {string} dir_name - полный путь к папке
 */
function mkdir(dir_name){
	shell.mkdir('-p', dir_name);
}
module.exports.mkdir = mkdir;
