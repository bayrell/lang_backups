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
class re{
	getClassName(){return "Runtime.re";}
	
	static compile(r){
		if (!Array.isArray(r))
			r = [r];
		if (r.length == 1)
			r.push("g");
		
		return new RegExp(r[0], r[1]);
	}
	/**
	 * Поиск через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} s - строка, в которой происходит поиск
	 * @return {array} результат
	 */
	static match(r, s){
		
		return s.match(re.compile(r));
	}
	/**
	 * Поиск через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} s - строка, в которой происходит поиск
	 * @return {array} результат
	 */
	static matchAll(r, s){
	}
	/**
	 * Замена через регулярные выражения
	 * @param {var} r - регулярное выражение
	 * @param {string} replace - новое значение, на которое нужно заменить
	 * @param {string} s - строка, в которой происходит замена
	 * @return {string} результат
	 */
	static replace(r, replace, s){
		
		return s.replace(re.compile(r), replace);
	}
	static replaceArr(arr, s){
		
		if (Array.isArray(arr)){
			for (var i = 0; i < arr.length; i++){
				var r = arr[i];
				s = s.replace(re.compile(r[0]), r[1]);
			}
		}
		return s;
	}
}
module.exports = re;