/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__rtl = require('./rtl.js');
var isset = m__rtl.isset;
var format = m__rtl.format;
var is_array = m__rtl.is_array;
class BayrellTranslate{
	static setLang(lang){
		lang = lang;
	}
	static translate(name, params){
		var lang = BayrellTranslate.lang;
		var lang_default = BayrellTranslate.lang_default;
		var a = null;
		var b = null;
		var result = "";
		if (is_array(name)) {
			var cls = name[0];
			var s = name[1];
			if (isset(BayrellTranslate.dictionary[lang])) {
				a = BayrellTranslate.dictionary[lang];
				if (isset(a[cls])) {
					b = a[cls];
					if (isset(b[s])) {
						return format(b[s], params);
					}
				}
			}
			else if (isset(BayrellTranslate.dictionary[lang_default])) {
				a = BayrellTranslate.dictionary[lang_default];
				if (isset(a[cls])) {
					b = a[cls];
					if (isset(b[s])) {
						return format(b[s], params);
					}
				}
			}
		}
		else {
			return name;
		}
		return result;
	}
	static add(lang, cls, obj){
		var a = null;
		var b = null;
		var c = null;
		var dictionary = BayrellTranslate.dictionary;
		if (!isset(BayrellTranslate.dictionary[lang])) {
			dictionary[lang] = {};
		}
		c = dictionary[lang];
		c[cls] = obj;
		dictionary[lang] = c;
		/* 
		dictionary[lang][cls] = obj;
		for (var key in dict){
			dictionary[lang][cls][key] = dict[key];
		 */
	}
}
BayrellTranslate.lang = "en";
BayrellTranslate.lang_default = "en";
BayrellTranslate.dictionary = {};
module.exports.BayrellTranslate = BayrellTranslate;
