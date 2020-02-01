"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
Runtime.rs = function()
{
};
Object.assign(Runtime.rs.prototype,
{
	getClassName: function()
	{
		return "Runtime.rs";
	},
});
Object.assign(Runtime.rs,
{
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	strlen: function(s)
	{
		return use("Runtime.rtl").toString(s).length;
		/*
		if (isBrowser())
			return Runtime.rtl.toString(s).length;
		return rtl.toString(s).length;
		*/
	},
	/**
	 * Search 'search' in s.
	 */
	search: function(s,search,offset)
	{
		if (offset == undefined) offset = 0;
		var _rtl = use("Runtime.rtl");
		/*
		if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		if (!_rtl.exists(offset)) offset = 0;
		*/
		var res = _rtl.toString(s).indexOf(search);
		return res;
	},
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	substr: function(s,start,length)
	{
		/*
		var _rtl = null; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _rs = null; if (isBrowser()) _rs = Runtime.rs; else _rs = rs;
		*/
		var _rtl = use("Runtime.rtl");
		var _rs = use("Runtime.rs");
		
		var end = start + length;
		if (length == undefined){
			return _rtl.toString(s).substring(start);
		}
		if (length < 0){
			var sz = _rs.strlen(s);
			end = sz + length;
		}
		return _rtl.toString(s).substring(start, end);
	},
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	charAt: function(s,pos)
	{
		var sz = this.strlen(s);
		if (pos >= 0 && pos < sz)
		{
			return this.substr(s, pos, 1);
		}
		return "";
	},
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	ord: function(ch)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toString(ch).charCodeAt(0);
		return rtl.toString(ch).charCodeAt(0);
		*/
		
		return use("Runtime.rtl").toString(ch).charCodeAt(0);
	},
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	strtolower: function(s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toString(s).toLowerCase();
		return rtl.toString(s).toLowerCase();
		*/
		
		return use("Runtime.rtl").toString(s).toLowerCase();
	},
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	strtoupper: function(s)
	{
		/*
		if (isBrowser())
			return Runtime.rtl.toString(s).toUpperCase();
		return rtl.toString(s).toUpperCase();
		*/
		
		return use("Runtime.rtl").toString(s).toUpperCase();
	},
	/**
	 * Заменяет одну строку на другую
	 */
	replace: function(search,item,s)
	{
		return s.replace(new RegExp(search, "g"), item);
	},
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	str_repeat: function(s,n)
	{
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - regular expression
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	split: function(delimiter,s,limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp(delimiter, "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.create(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Collection<string>
	 */
	splitArr: function(delimiters,s,limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		var delimiter = new RegExp("[" + delimiters.join("") + "]", "g");
		if (!_rtl.exists(limit))
		{
			arr = s.split(delimiter);
		}
		else
		{
			arr = s.split(delimiter, limit);
		}
		return _Collection.create(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	join: function(ch,arr)
	{
		if (arr == null) return "";
		return arr.join(ch);
	},
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	trim: function(s,ch)
	{
		if (ch == undefined) ch = "";
		if (ch == undefined) ch = "";
		
		/*
		if (isBrowser()) s = Runtime.rtl.toString(s);
		else s = rtl.toString(s);
		*/
		
		s = use("Runtime.rtl").toString(s);
		
		if (ch == ""){
			return s.trim();
		}
		return s.replace(new RegExp("^[" + ch + "]+", "g"),"").replace(new RegExp("[" + ch + "]+$", "g"),"");
	},
	/**
	 * json encode scalar values
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	json_encode: function(s,flags)
	{
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	},
	/**
	 * Escape HTML special chars
	 * @param string s
	 * @return string
	 */
	htmlEscape: function(s)
	{
		if (s instanceof Runtime.Collection) return s;
		if (s instanceof Runtime.UIStruct) return s;
		var obj = {
			"<":"&lt;",
			">": "&gt;", 
			"&": "&amp;",
			'"': '&quot;',
			"'": '&#39;',
			'`': '&#x60;',
			'=': '&#x3D;'
		};
		return (new String(s)).replace(/[<>&"'`=]/g, function(v){ return obj[v]; });
	},
	/**
	 * Разбивает путь файла на составляющие
	 * @param {string} filepath путь к файлу
	 * @return {json} Объект вида:
	 *         dirname    - папка, в которой находиться файл
	 *         basename   - полное имя файла
	 *         extension  - расширение файла
	 *         filename   - имя файла без расширения
	 */
	pathinfo: function(filepath)
	{
		var _v0 = use("Runtime.rs");
		var _v1 = use("Runtime.PathInfo");
		var arr1 = _v0.explode(".", filepath).toVector();
		var arr2 = _v0.explode("/", filepath).toVector();
		var ret = new _v1();
		ret.filepath = filepath;
		ret.extension = arr1.pop();
		ret.basename = arr2.pop();
		ret.dirname = _v0.implode("/", arr2);
		var ext_length = _v0.strlen(ret.extension);
		if (ext_length > 0)
		{
		}
		ret.filename = _v0.substr(ret.basename, 0, -1 * ext_length);
		return ret;
	},
	/**
	 * Возвращает имя файла без расширения
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	filename: function(filepath)
	{
		var _v0 = use("Runtime.rs");
		var ret = Runtime.rs.pathinfo(filepath);
		var res = ret.basename;
		var ext = ret.extension;
		if (ext != "")
		{
			var sz = 0 - _v0.strlen(ext) - 1;
			res = _v0.substr(res, 0, sz);
		}
		return res;
	},
	/**
	 * Возвращает полное имя файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} полное имя файла
	 */
	basename: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = ret.basename;
		return res;
	},
	/**
	 * Возвращает расширение файла
	 * @param {string} filepath - путь к файлу
	 * @return {string} расширение файла
	 */
	extname: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = ret.extension;
		return res;
	},
	/**
	 * Возвращает путь к папке, содержащий файл
	 * @param {string} filepath - путь к файлу
	 * @return {string} путь к папке, содержащий файл
	 */
	dirname: function(filepath)
	{
		var ret = Runtime.rs.pathinfo(filepath);
		var res = ret.dirname;
		return res;
	},
	/**
	 * Returns relative path of the filepath
	 * @param string filepath
	 * @param string basepath
	 * @param string ch - Directory separator
	 * @return string relative path
	 */
	relativePath: function(filepath,basepath,ch)
	{
		var _v0 = use("Runtime.rs");
		if (ch == undefined) ch = "/";
		var source = _v0.explode(ch, filepath);
		var base = _v0.explode(ch, basepath);
		source = source.filter((s) => 
		{
			return s != "";
		});
		base = base.filter((s) => 
		{
			return s != "";
		});
		var i = 0;
		while (source.count() > 0 && base.count() > 0 && source.item(0) == base.item(0))
		{
			source.shift();
			base.shift();
		}
		base.each((s) => 
		{
			source.unshift("..");
		});
		return _v0.implode(ch, source);
	},
	/**
	 * Return normalize path
	 * @param string filepath - File path
	 * @return string
	 */
	normalize: function(filepath)
	{
		return filepath;
	},
	/**
	 * New line to br
	 */
	nl2br: function(s)
	{
		return this.replace("\n", "<br/>", s);
	},
	/* =================== Deprecated =================== */
	/**
	 * Разбивает строку на подстроки
	 * @param string delimiter - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	explode: function(delimiter,s,limit)
	{
		if (limit == undefined) limit = -1;
		/*
		var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;
		var _Collection; if (isBrowser()) _Collection = Runtime.Collection; else _Collection = Collection;
		*/
		
		var _rtl = use("Runtime.rtl");
		var _Collection = use("Runtime.Collection");
		
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return _Collection.create(arr);
	},
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	implode: function(ch,arr)
	{
		return arr.join(ch);
	},
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	strpos: function(s,search,offset)
	{
		if (offset == undefined) offset = 0;
		/*var _rtl; if (isBrowser()) _rtl = Runtime.rtl; else _rtl = rtl;*/
		var _rtl = use("Runtime.rtl");
		
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toString(s).indexOf(search);
		return res;
	},
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.rs";
	},
	getParentClassName: function()
	{
		return "";
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Runtime.rs);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.rs = Runtime.rs;