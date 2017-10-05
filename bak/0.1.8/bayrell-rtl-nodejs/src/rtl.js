/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/

var JSON_PRETTY_PRINT = 128;

if (typeof require == 'undefined')
	require = global.require;

var fs = require('fs');
var shell = require('shelljs');
var upath = require('upath');
var path = require('path');




/**
 * console.log(x)
 */
function var_dump(x){
	console.log(x);
}


/**
 * Возвращает ASCII-код символа
 */
function ord(str){
	return toString(str).charCodeAt(0);
}


/**
 * Удаляет лишние символы слева и справа
 */
function trim(str){
	return toString(str).trim();
}

/**
 * Клонирует переменную
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


/**
 * Возвращает текущий timestamp
 */
function time(){
	return Math.floor(Date.now() / 1000);
}


/**
 * Возвращает timestamp в ms
 */
function microtime(){
	return Date.now() / 1000;
}


/**
 * Возвращает случайное число от a до b, a <= b
 *
 * @param {integer} a - число 1
 * @param {integer} b - число 2
 * @return случайное число
 */
function rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}


/**
 * Возвращает случайное число от a до b, a <= b
 *
 * @param {integer} a - число 1
 * @param {integer} b - число 2
 * @return случайное число
 */
function mt_rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}


/**
 * Преобразовывает str в строку, если она таковой не является
 */
function toString(str){
	if (typeof str == 'string') return str;
	if (str instanceof String) return str;
	return new String(str);
}


/**
 * Преобразовывает x в число
 */
function toInt(x){
	return parseInt(x);
}


/**
 * Возвращает длинну строки
 */
function strlen(str){
	return toString(str).length;
}


/**
 * Возвращает повторяющуюся строку
 * @param {string} s - повторяемая строка
 * @param {integer} n - количество раз, которые нужно повторить строку s
 * @return {string} строка
 */
function str_repeat(s, n){
	var str = '';
	for (var i=0; i < n; i++){
		str += s;
	}

	return str;
}


/**
 * Ищет позицию первого вхождения подстроки search в строке str.
 *
 * @param {string} str - строка, в которой производится поиск 
 * @param {string} search - строка, которую ищем 
 * @param {string} offset - если этот параметр указан, 
 *                 то поиск будет начат с указанного количества символов с начала строки.  
 * @return {object} результат 
 */
function strpos(str, search, offset){
	var res = toString(str).indexOf(search);
	if (res == -1)
		return false;
	return res;
}


/**
 * Ищет позицию первого вхождения подстроки search в строке str.
 *
 * @param {string} str - строка, в которой производится поиск 
 * @param {string} search - строка, которую ищем 
 * @param {string} offset - если этот параметр указан, 
 *                 то поиск будет начат с указанного количества символов с начала строки.  
 * @return {object} результат 
 */
function strfind(str, search, offset){
	var res = toString(str).indexOf(search);
	return res;
}


/**
 * Преобразование строки в нижний регистр
 *
 * @param {string} str - строка 
 * @return {object} результат 
 */
function strtolower(str){
	return toString(str).toLowerCase();
}


/**
 * Преобразование строки в верхний регистр
 *
 * @param {string} str - строка 
 * @return {object} результат 
 */
function strtoupper(str){
	return toString(str).toUpperCase();
}


/**
 * Возвращает подстроку
 *
 * @param {string} str - входная строка. Должна содержать хотя бы один символ. 
 * @param {integer} start - стартовая позиция
 * @param {integer} len - длина строки
 * @return {string} подстрока 
 */
function substr(str, start, len){
	str = toString(str);
	if (len >= 0){
		return str.substr(start, len);
	}
	else if (len < 0){
		return str.substr(start, str.length - start + len);
	}
	else 
		return str.substr(start);
}


/**
 * Кодирует в base64
 *
 * @param {string} str - кодируемая строка
 * @return {string} base64 строка
 */
function base64_encode(str){
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


/**
 * Декодирует из base64 в строку
 *
 * @param {string} str - декодируемая строка в base64
 * @return {string} строка 
 */
function base64_decode(str){
	return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


/**
 * json decode
 *
 * @param {string} str - строка 
 * @return {object} результат 
 */
function json_decode_ex(str){
	//return json_decode(str, true);
	return JSON.parse(str);
}


/**
 * json encode
 *
 * @param {mixed} obj - объект
 * @param {int} flag - флаги
 * @return {string} json строка
 */
function json_encode_ex(obj, flag){
	if (typeof flag == 'undefined')
		flag = 0;
	
	if (flag & JSON_PRETTY_PRINT == JSON_PRETTY_PRINT) 
		return JSON.stringify(obj, null, 2);
	
	return JSON.stringify(obj);
}


/**
 * Разбивает строку
 *
 * @param {string} delimiter - разделитель
 * @param {string} str - строка 
 * @param {integer} limit - ограничение 
 * @return {array} массив
 */
function explode(delimiter, str, limit){
	if (typeof limit == 'undefined'){
		return str.split(delimiter);
	}
	return str.split(delimiter, limit);
}


/**
 * Объединяет строку
 *
 * @param {string} glue - регулярное выражение 
 * @param {array} pieces - массив 
 * @return {string} результат
 */
function implode(glue, pieces){
	return ((pieces instanceof Array) ? pieces.join(glue) : pieces.join());
}


/**
 * Возвращает ключи объекта
 *
 * @param {object} obj - Объект
 * @return {array} результат
 */
function array_keys(obj){
	return Object.keys(obj);
}


/**
 * Инвертирует массив
 *
 * @param {array} arr - Объект
 * @return {array} результат
 */
function array_reverse(arr){
	return arr.reverse();
}


/**
 * Сортирует массив
 *
 * @param {array} arr - Объект
 * @return {array} результат
 */
function array_sort(arr){
	return arr.sort();
}


/**
 * Извлекает последний элемент массива
 *
 * @param {array} arr - массив
 * @return {mixed} извлеченный элемент
 */
function array_pop(arr){
	return arr.pop();
}


/**
 * Помещает в конец массива элемент
 *
 * @param {array} arr - массив
 * @param {mixed} val - значение
 */
function array_push(arr, val){
	if (Array.isArray(arr)){
		arr.push(val);
	}
	else{
		arr = [val];
	}
}


/**
 * Проверяет, присутствует ли в объекте arr указанный ключ key или индекс
 *
 * @param {array} key - ключ
 * @param {object} arr - Объект
 * @return {boolean} Истина, если ключ есть
 */
function array_key_exists(key, arr){
	if (is_object(arr)){
		return ((typeof arr[key]) != 'undefined');
	}
	return false;
}


/**
 * Cлияние двух массивов
 *
 * @param {array} arr1 - массив1
 * @param {array} arr2 - массив2
 * @return {array} Результат
 */
function array_merge (arr1, arr2){
	return arr1.concat(arr2);
}


/**
 * Рекурсивное слияние двух или более массивов
 *
 * @param {array} arr1 - массив1
 * @param {array} arr2 - массив2
 * @return {array} Результат
 */
function array_merge_recursive (arr1, arr2){
	return Object.assign(arr1, arr2);
}


/**
 * Возвращает количество объектов в val
 *
 * @param {mixed} val - массив, объект или строка
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
	return 1;
}


/**
 * Поиск спомощью регулярных выражений
 *
 * @param {string} regex - регулярное выражение 
 * @param {string} str - строка 
 * @param {object} res - результат 
 * @return {boolean} Истина, если поиск успешен
 */
function preg_match(regex, str, res){
	if (!(regex instanceof RegExp))	regex = new RegExp(regex);
	r = str.match(regex);
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


/**
 * Производит постановку replace в str на основе регулярного выражения regex
 *
 * @param {string|array} regex - регулярное выражение 
 * @param {string|array} replace - заменяемое выражение 
 * @param {string} str - строка 
 * @return {boolean} Истина, если поиск успешен
 */
function preg_replace(regex, replace, str){
	var str = toString(str);
	if (Array.isArray(regex) && Array.isArray(replace) && regex.length == replace.length){
		for (var i = 0; i < regex.length; i++){
			var r = regex[i];
			var s = replace[i];
			if (!(r instanceof RegExp))	r = new RegExp(r, 'g');
			str = str.replace(r, s);
		}
	}
	else if ((typeof regex == 'string' || regex instanceof RegExp) && typeof replace == 'string'){
		if (!(regex instanceof RegExp))	regex = new RegExp(regex, 'g');
		return str.replace(regex, replace);
	}
	return str;
}


/**
 * Проверяет, является ли val массивом или объектом
 *
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_array(val){
	if (Array.isArray(val)) return true;
	return false;
}


/**
 * Проверяет, является ли val строкой
 *
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_string(val){
	if (typeof val == 'string') return true;
	return false;
}


/**
 * Проверяет, является ли val массивом или объектом
 *
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function is_object(val){
	if (typeof val == 'object' && !Array.isArray(val)) return true;
	return false;
}


/**
 * Проверяет, является ли val массивом или объектом
 *
 * @param {mixed} переменная
 * @return {boolean} результат
 */
function isArray(val){
	if (typeof val == 'object' || Array.isArray(val)) return true;
	return false;
}


/**
 * Проверяет, является ли val числом
 *
 * @param {mixed} val - переменная
 * @return {boolean} результат
 */
function is_numeric(val){
	return !isNaN(val);
}

/**
 * Возвращает тип переменной
 *
 * @param {mixed} переменная
 * @return {string} название переменной
 */
function gettype(val){
	if (Array.isArray(val)) return "array";
	return typeof val;
}


/**
 * Проверяет определена ли переменная или нет
 *
 * @param {mixed} переменная
 * @return {boolean} если Истина, то переменая определена
 */
function isset(a){ 
	return (a != null) && ((typeof a) != 'undefined'); 
}


/**
 * Проверяет вхождение значения val в массив arr
 *
 * @param {mixed} val - переменная
 * @param {array} arr - массив, в котором нужно найти значение val
 * @return {boolean} если Истина, то значение val входит в массив
 */
function in_array(val, arr) {
	var t = gettype(arr);
	if (t == 'array' || t == 'object'){
		for (var i in arr){
			if (arr.hasOwnProperty(i)){ 
				if (arr[i] == val) return true; 
			}
		}
	}
	return false;
}


/*
# Возвращает пару ключ->значение в зависимости от типа Dict или List
def xitems(arr):
	t = type(arr)
	if t is list or t is tuple:
		return enumerate(arr)
	elif t is dict or t is OrderedDict:
		return arr.items()
	return []
	
# Возвращает ключи в зависимости от типа Dict или List
def xkeys(arr):
	t = type(arr)
	if t is list or t is tuple:
		return range(len(arr))
	elif type(arr) is dict or t is OrderedDict:
		return arr.keys()
	return []
	
# Возвращает значения в зависимости от типа Dict или List
def xvalues(arr):
	t = type(arr)
	if t is list or t is tuple:
		return arr
	elif t is dict or t is OrderedDict:
		return arr.values()
	return []
*/


/**
 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
 *
 * @param {mixed} arr - переменная
 * @param {mixed} key - ключ
 * @param {mixed} def - значение по умолчанию
 * @return {mixed} arr[key]
 */
function xarr(arr, key, def){
	if (isset(arr[key])){
		return arr[key];
	}
	if(typeof def === "undefined"){
		def = null;
	}
	return def;
}


/**
 * Возвращает значение arr[key], если ключа нет, то возвращает значение по умолчанию
 * ключ может быть составным, разделенным через точку. В этом случае значение будет 
 * искаться в подмассивах
 *
 * @param {mixed} arr - переменная
 * @param {mixed} keyArr - ключ
 * @param {mixed} def - значение по умолчанию
 * @return {mixed} arr[key]
 */
function xarrj(arr, keyArr, def){
	if (typeof def === "undefined"){
		def = null;
	}
	if (!is_array(keyArr)){
		keyArr = explode('.', keyArr);
	}

	for (var i=0; i<count(keyArr); i++){
		var key = keyArr[i];
		if (isset(arr[key])){
			arr = arr[key];
		}
		else{
			arr = def;
			break;
		}
	}
	
	return arr;
}


/**
 * arr[key] = val
 *
 * @param {mixed} arr - переменная
 * @param {mixed} key - ключ
 * @param {mixed} val - значение по умолчанию
 * @return {mixed} новый массив
 */
function xadd(arr, key, val){
	var t = gettype(arr);
	if (t == 'array'){
		arr.push(val);
		return;
	}
	if (t != 'object'){
		arr = {};
	}
	arr[key] = val;
	return arr;
}


/**
 * arr[key] = val
 *
 * @param {mixed} arr - переменная
 * @param {mixed} keyArr - ключ. Ключ может являться массивом, либо разделяться точками
 * @param {mixed} def - значение по умолчанию
 * @return {mixed} новый массив
 */
function xaddj(arr, keyArr, val){
	if (!is_array(keyArr)){
		keyArr = explode('.', keyArr);
	}
	
	var sz = count(keyArr);
	for (var i=0; i<sz; i++){
		
		var key = keyArr[i];
		if (i == sz - 1){
			arr[key] = val;
		}
		else{
			if (!isset(arr[key])){
				arr[key] = {};
			}
			arr = arr[key];
		}
		
	}
	return arr;
}


/**
 * Объединяет массив arr1 и arr2 
 *
 * @return {mixed} новый массив
 */
function xarr_concat(arr1, arr2){
	
	if (Array.isArray(arr1)){
		var result = [];
		for (var i = 0; i < arguments.length; i++) {
			if (Array.isArray(arguments[i])){
				for (var j in arguments[i]){
					result.push(clone(arguments[i][j]));
				}
			}
		}
		return result;
	}
	
	else if (gettype(arr1) == 'object'){
		var result = {};
		for (var i = 0; i < arguments.length; i++) {
			if (gettype(arguments[i]) == 'object'){
				for (var j in arguments[i]){
					result[j] = clone(arguments[i][j]);
				}
			}
		}
		return result;
	}
	
	return null;
}


/**
 * Разбивает путь файла на составляющие
 *
 * @param {string} filepath путь к файлу
 * @return {array} массив
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


/**
 * Возвращает путь к папке, содержащий файл
 *
 * @param {string} filepath - путь к файлу
 * @return {string} путь к папке, содержащий файл
 */
function dirname(filepath){
	ret = mb_pathinfo(filepath);
	return ret['dirname'];
}


/**
 * Подставляет из params в строку str параметры, экранированные в '%'
 *
 * @param {string} str - строка 
 * @param {object} params - параметры 
 * @return {string} строка
 */
function format(str, params){
	var keys = [];
	var values = [];
	for (var key in params){
		var value = params[key];
		xadd(keys, null, new RegExp("%" + toString(key) + "%"));
		xadd(values, null, value);
	}
	str = preg_replace(keys, values, str);
	return str;
}


/**
 * Объединение двух индексов для функция xaddj и xarrj
 *
 * @param {object} style1 стиль1
 * @param {object} style2 стиль2
 * @return {object} Итоговый стиль
 */
function j_concat (index1, index2){
	if (isset(index1) && index1 != "")
		index1 +=  "."  + "" +  index2;
	else
		index1 +=  index2;
	return index1;
}


/**
 * Нормализация пути
 * 
 * @param {string} path - путь к файлу
 * @return {string} Результат
 */
function path_normalize(file_path){
	return upath.normalize(file_path);
}


/**
 * Получить контент файла
 * 
 * @param {string} file_name - полный путь к файлу
 * @return {string} Содержимое файла
 */
function file_get_contents(file_name){
	return fs.readFileSync(file_name, {encoding : 'utf8'}).toString();
}


/**
 * Сохраняет контент файла
 * 
 * @param {string} file_name - полный путь к файлу
 */
function file_put_contents(file_name, content){
	fs.writeFileSync(file_name, content, {encoding : 'utf8'});
}


/**
 * Проверяет существование файла
 * 
 * @param {string} file_name - полный путь к файлу
 * @return {boolean} Истина, если файл существует
 */
function file_exists(file_name){
	return fs.existsSync(file_name);
}


/**
 * Получает метку последнего редактирования файла
 * 
 * @param {string} file_name - полный путь к файлу
 * @return {string} метка последнего редактирования файла
 */
function filemtime (file_name){
	var fd = fs.openSync(file_name, 'r');
	var stat = fs.fstatSync(fd);
	return stat.mtime.toISOString();
}


/**
 * Рекурсивное создание папки
 * 
 * @param {string} dir_name - полный путь к папке
 */
function mkdir(dir_name){
	shell.mkdir('-p', dir_name);
}


function remove_last_slash(str){     
    return str.replace(/\/$/, "");
} 

module.exports = {
	isArray: isArray,
	var_dump: var_dump,
	ord: ord,
	trim: trim,
	clone: clone,
	time: time,
	microtime: microtime,
	rand: rand,
	mt_rand: mt_rand,
	toString: toString,
	toInt: toInt,
	strlen: strlen,
	str_repeat: str_repeat,
	strpos: strpos,
	strfind: strfind,
	strtolower: strtolower,
	strtoupper: strtoupper,
	substr: substr,
	base64_encode: base64_encode,
	base64_decode: base64_decode,
	json_decode_ex: json_decode_ex,
	json_encode_ex: json_encode_ex,
	explode: explode,
	implode: implode,
	array_keys: array_keys,
	array_reverse: array_reverse,
	array_sort: array_sort,
	array_pop: array_pop,
	array_push: array_push,
	array_key_exists: array_key_exists,
	array_merge: array_merge,
	array_merge_recursive: array_merge_recursive,
	count: count,
	preg_match: preg_match,
	preg_replace: preg_replace,
	is_array: is_array,
	is_numeric: is_numeric,
	is_object: is_object,
	gettype: gettype,
	isset: isset,
	in_array: in_array,
	xarr: xarr,
	xarrj: xarrj,
	xadd: xadd,
	xaddj: xaddj,
	xarr_concat: xarr_concat,
	mb_pathinfo: mb_pathinfo,
	dirname: dirname,
	format: format,
	j_concat: j_concat,
	is_string: is_string,
	
	
	path_normalize: path_normalize,
	file_get_contents: file_get_contents,
	file_put_contents: file_put_contents,
	file_exists: file_exists,
	filemtime: filemtime,
	mkdir: mkdir,
	remove_last_slash: remove_last_slash,
};