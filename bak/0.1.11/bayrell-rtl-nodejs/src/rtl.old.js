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
 * ���������� ASCII-��� �������
 */
function ord(str){
	return toString(str).charCodeAt(0);
}


/**
 * ������� ������ ������� ����� � ������
 */
function trim(str){
	return toString(str).trim();
}

/**
 * ��������� ����������
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
 * ���������� ������� timestamp
 */
function time(){
	return Math.floor(Date.now() / 1000);
}


/**
 * ���������� timestamp � ms
 */
function microtime(){
	return Date.now() / 1000;
}


/**
 * ���������� ��������� ����� �� a �� b, a <= b
 *
 * @param {integer} a - ����� 1
 * @param {integer} b - ����� 2
 * @return ��������� �����
 */
function rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}


/**
 * ���������� ��������� ����� �� a �� b, a <= b
 *
 * @param {integer} a - ����� 1
 * @param {integer} b - ����� 2
 * @return ��������� �����
 */
function mt_rand(a, b){
	return Math.floor(Math.random() * (b - a) + a);
}


/**
 * ��������������� str � ������, ���� ��� ������� �� ��������
 */
function toString(str){
	if (typeof str == 'string') return str;
	if (str instanceof String) return str;
	return new String(str);
}


/**
 * ��������������� x � �����
 */
function toInt(x){
	return parseInt(x);
}


/**
 * ���������� ������ ������
 */
function strlen(str){
	return toString(str).length;
}


/**
 * ���������� ������������� ������
 * @param {string} s - ����������� ������
 * @param {integer} n - ���������� ���, ������� ����� ��������� ������ s
 * @return {string} ������
 */
function str_repeat(s, n){
	var str = '';
	for (var i=0; i < n; i++){
		str += s;
	}

	return str;
}


/**
 * ���� ������� ������� ��������� ��������� search � ������ str.
 *
 * @param {string} str - ������, � ������� ������������ ����� 
 * @param {string} search - ������, ������� ���� 
 * @param {string} offset - ���� ���� �������� ������, 
 *                 �� ����� ����� ����� � ���������� ���������� �������� � ������ ������.  
 * @return {object} ��������� 
 */
function strpos(str, search, offset){
	var res = toString(str).indexOf(search);
	if (res == -1)
		return false;
	return res;
}


/**
 * ���� ������� ������� ��������� ��������� search � ������ str.
 *
 * @param {string} str - ������, � ������� ������������ ����� 
 * @param {string} search - ������, ������� ���� 
 * @param {string} offset - ���� ���� �������� ������, 
 *                 �� ����� ����� ����� � ���������� ���������� �������� � ������ ������.  
 * @return {object} ��������� 
 */
function strfind(str, search, offset){
	var res = toString(str).indexOf(search);
	return res;
}


/**
 * �������������� ������ � ������ �������
 *
 * @param {string} str - ������ 
 * @return {object} ��������� 
 */
function strtolower(str){
	return toString(str).toLowerCase();
}


/**
 * �������������� ������ � ������� �������
 *
 * @param {string} str - ������ 
 * @return {object} ��������� 
 */
function strtoupper(str){
	return toString(str).toUpperCase();
}


/**
 * ���������� ���������
 *
 * @param {string} str - ������� ������. ������ ��������� ���� �� ���� ������. 
 * @param {integer} start - ��������� �������
 * @param {integer} len - ����� ������
 * @return {string} ��������� 
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
 * �������� � base64
 *
 * @param {string} str - ���������� ������
 * @return {string} base64 ������
 */
function base64_encode(str){
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}


/**
 * ���������� �� base64 � ������
 *
 * @param {string} str - ������������ ������ � base64
 * @return {string} ������ 
 */
function base64_decode(str){
	return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


/**
 * json decode
 *
 * @param {string} str - ������ 
 * @return {object} ��������� 
 */
function json_decode_ex(str){
	//return json_decode(str, true);
	return JSON.parse(str);
}


/**
 * json encode
 *
 * @param {mixed} obj - ������
 * @param {int} flag - �����
 * @return {string} json ������
 */
function json_encode_ex(obj, flag){
	if (typeof flag == 'undefined')
		flag = 0;
	
	if (flag & JSON_PRETTY_PRINT == JSON_PRETTY_PRINT) 
		return JSON.stringify(obj, null, 2);
	
	return JSON.stringify(obj);
}


/**
 * ��������� ������
 *
 * @param {string} delimiter - �����������
 * @param {string} str - ������ 
 * @param {integer} limit - ����������� 
 * @return {array} ������
 */
function explode(delimiter, str, limit){
	if (typeof limit == 'undefined'){
		return str.split(delimiter);
	}
	return str.split(delimiter, limit);
}


/**
 * ���������� ������
 *
 * @param {string} glue - ���������� ��������� 
 * @param {array} pieces - ������ 
 * @return {string} ���������
 */
function implode(glue, pieces){
	return ((pieces instanceof Array) ? pieces.join(glue) : pieces.join());
}


/**
 * ���������� ����� �������
 *
 * @param {object} obj - ������
 * @return {array} ���������
 */
function array_keys(obj){
	return Object.keys(obj);
}


/**
 * ����������� ������
 *
 * @param {array} arr - ������
 * @return {array} ���������
 */
function array_reverse(arr){
	return arr.reverse();
}


/**
 * ��������� ������
 *
 * @param {array} arr - ������
 * @return {array} ���������
 */
function array_sort(arr){
	return arr.sort();
}


/**
 * ��������� ��������� ������� �������
 *
 * @param {array} arr - ������
 * @return {mixed} ����������� �������
 */
function array_pop(arr){
	return arr.pop();
}


/**
 * �������� � ����� ������� �������
 *
 * @param {array} arr - ������
 * @param {mixed} val - ��������
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
 * ���������, ������������ �� � ������� arr ��������� ���� key ��� ������
 *
 * @param {array} key - ����
 * @param {object} arr - ������
 * @return {boolean} ������, ���� ���� ����
 */
function array_key_exists(key, arr){
	if (is_object(arr)){
		return ((typeof arr[key]) != 'undefined');
	}
	return false;
}


/**
 * C������ ���� ��������
 *
 * @param {array} arr1 - ������1
 * @param {array} arr2 - ������2
 * @return {array} ���������
 */
function array_merge (arr1, arr2){
	return arr1.concat(arr2);
}


/**
 * ����������� ������� ���� ��� ����� ��������
 *
 * @param {array} arr1 - ������1
 * @param {array} arr2 - ������2
 * @return {array} ���������
 */
function array_merge_recursive (arr1, arr2){
	return Object.assign(arr1, arr2);
}


/**
 * ���������� ���������� �������� � val
 *
 * @param {mixed} val - ������, ������ ��� ������
 * @return {integer} �����
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
 * ����� �������� ���������� ���������
 *
 * @param {string} regex - ���������� ��������� 
 * @param {string} str - ������ 
 * @param {object} res - ��������� 
 * @return {boolean} ������, ���� ����� �������
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
 * ���������� ���������� replace � str �� ������ ����������� ��������� regex
 *
 * @param {string|array} regex - ���������� ��������� 
 * @param {string|array} replace - ���������� ��������� 
 * @param {string} str - ������ 
 * @return {boolean} ������, ���� ����� �������
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
 * ���������, �������� �� val �������� ��� ��������
 *
 * @param {mixed} ����������
 * @return {boolean} ���������
 */
function is_array(val){
	if (Array.isArray(val)) return true;
	return false;
}


/**
 * ���������, �������� �� val �������
 *
 * @param {mixed} ����������
 * @return {boolean} ���������
 */
function is_string(val){
	if (typeof val == 'string') return true;
	return false;
}


/**
 * ���������, �������� �� val �������� ��� ��������
 *
 * @param {mixed} ����������
 * @return {boolean} ���������
 */
function is_object(val){
	if (typeof val == 'object' && !Array.isArray(val)) return true;
	return false;
}


/**
 * ���������, �������� �� val �������� ��� ��������
 *
 * @param {mixed} ����������
 * @return {boolean} ���������
 */
function isArray(val){
	if (typeof val == 'object' || Array.isArray(val)) return true;
	return false;
}


/**
 * ���������, �������� �� val ������
 *
 * @param {mixed} val - ����������
 * @return {boolean} ���������
 */
function is_numeric(val){
	return !isNaN(val);
}

/**
 * ���������� ��� ����������
 *
 * @param {mixed} ����������
 * @return {string} �������� ����������
 */
function gettype(val){
	if (Array.isArray(val)) return "array";
	return typeof val;
}


/**
 * ��������� ���������� �� ���������� ��� ���
 *
 * @param {mixed} ����������
 * @return {boolean} ���� ������, �� ��������� ����������
 */
function isset(a){ 
	return (a != null) && ((typeof a) != 'undefined'); 
}


/**
 * ��������� ��������� �������� val � ������ arr
 *
 * @param {mixed} val - ����������
 * @param {array} arr - ������, � ������� ����� ����� �������� val
 * @return {boolean} ���� ������, �� �������� val ������ � ������
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
# ���������� ���� ����->�������� � ����������� �� ���� Dict ��� List
def xitems(arr):
	t = type(arr)
	if t is list or t is tuple:
		return enumerate(arr)
	elif t is dict or t is OrderedDict:
		return arr.items()
	return []
	
# ���������� ����� � ����������� �� ���� Dict ��� List
def xkeys(arr):
	t = type(arr)
	if t is list or t is tuple:
		return range(len(arr))
	elif type(arr) is dict or t is OrderedDict:
		return arr.keys()
	return []
	
# ���������� �������� � ����������� �� ���� Dict ��� List
def xvalues(arr):
	t = type(arr)
	if t is list or t is tuple:
		return arr
	elif t is dict or t is OrderedDict:
		return arr.values()
	return []
*/


/**
 * ���������� �������� arr[key], ���� ����� ���, �� ���������� �������� �� ���������
 *
 * @param {mixed} arr - ����������
 * @param {mixed} key - ����
 * @param {mixed} def - �������� �� ���������
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
 * ���������� �������� arr[key], ���� ����� ���, �� ���������� �������� �� ���������
 * ���� ����� ���� ���������, ����������� ����� �����. � ���� ������ �������� ����� 
 * �������� � �����������
 *
 * @param {mixed} arr - ����������
 * @param {mixed} keyArr - ����
 * @param {mixed} def - �������� �� ���������
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
 * @param {mixed} arr - ����������
 * @param {mixed} key - ����
 * @param {mixed} val - �������� �� ���������
 * @return {mixed} ����� ������
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
 * @param {mixed} arr - ����������
 * @param {mixed} keyArr - ����. ���� ����� �������� ��������, ���� ����������� �������
 * @param {mixed} def - �������� �� ���������
 * @return {mixed} ����� ������
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
 * ���������� ������ arr1 � arr2 
 *
 * @return {mixed} ����� ������
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
 * ��������� ���� ����� �� ������������
 *
 * @param {string} filepath ���� � �����
 * @return {array} ������
 *         dirname    - �����, � ������� ���������� ����
 *         basename   - ������ ��� �����
 *         extension  - ���������� �����
 *         filename   - ��� ����� ��� ����������
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
 * ���������� ���� � �����, ���������� ����
 *
 * @param {string} filepath - ���� � �����
 * @return {string} ���� � �����, ���������� ����
 */
function dirname(filepath){
	ret = mb_pathinfo(filepath);
	return ret['dirname'];
}


/**
 * ����������� �� params � ������ str ���������, �������������� � '%'
 *
 * @param {string} str - ������ 
 * @param {object} params - ��������� 
 * @return {string} ������
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
 * ����������� ���� �������� ��� ������� xaddj � xarrj
 *
 * @param {object} style1 �����1
 * @param {object} style2 �����2
 * @return {object} �������� �����
 */
function j_concat (index1, index2){
	if (isset(index1) && index1 != "")
		index1 +=  "."  + "" +  index2;
	else
		index1 +=  index2;
	return index1;
}


/**
 * ������������ ����
 * 
 * @param {string} path - ���� � �����
 * @return {string} ���������
 */
function path_normalize(file_path){
	return upath.normalize(file_path);
}


/**
 * �������� ������� �����
 * 
 * @param {string} file_name - ������ ���� � �����
 * @return {string} ���������� �����
 */
function file_get_contents(file_name){
	return fs.readFileSync(file_name, {encoding : 'utf8'}).toString();
}


/**
 * ��������� ������� �����
 * 
 * @param {string} file_name - ������ ���� � �����
 */
function file_put_contents(file_name, content){
	fs.writeFileSync(file_name, content, {encoding : 'utf8'});
}


/**
 * ��������� ������������� �����
 * 
 * @param {string} file_name - ������ ���� � �����
 * @return {boolean} ������, ���� ���� ����������
 */
function file_exists(file_name){
	return fs.existsSync(file_name);
}


/**
 * �������� ����� ���������� �������������� �����
 * 
 * @param {string} file_name - ������ ���� � �����
 * @return {string} ����� ���������� �������������� �����
 */
function filemtime (file_name){
	var fd = fs.openSync(file_name, 'r');
	var stat = fs.fstatSync(fd);
	return stat.mtime.toISOString();
}


/**
 * ����������� �������� �����
 * 
 * @param {string} dir_name - ������ ���� � �����
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