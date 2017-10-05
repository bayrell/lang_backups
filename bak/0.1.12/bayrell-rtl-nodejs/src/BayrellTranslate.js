"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
  */
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellTranslate{
	static setLang(lang){
		BayrellTranslate.LANG = lang;
	}
	static translate(name, params){
		var lang = BayrellTranslate.LANG;
		var lang_default = BayrellTranslate.LANG_DEFAULT;
		var a = null;
		var b = null;
		var result = "";
		if (rtl.is_array(name)) {
			var cls = name[0];
			var s = name[1];
			if (rtl.key_nozero(BayrellTranslate.DICTIONARY, lang)) {
				a = BayrellTranslate.DICTIONARY[lang];
				if (rtl.key_nozero(a, cls)) {
					b = a[cls];
					if (rtl.key_nozero(b, s)) {
						return rtl.format(b[s], params);
					}
				}
			}
			else if (rtl.key_nozero(BayrellTranslate.DICTIONARY, lang_default)) {
				a = BayrellTranslate.DICTIONARY[lang_default];
				if (rtl.key_nozero(a, cls)) {
					b = a[cls];
					if (rtl.key_nozero(b, s)) {
						return rtl.format(b[s], params);
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
		if (rtl.key_zero(BayrellTranslate.DICTIONARY, lang)) {
			BayrellTranslate.DICTIONARY[lang] = {};
		}
		BayrellTranslate.DICTIONARY[lang][cls] = obj;
		/* 
		dictionary[lang][cls] = obj;
		for (var key in dict){
			dictionary[lang][cls][key] = dict[key];
		} */
	}
}
BayrellTranslate.LANG = "en";
BayrellTranslate.LANG_DEFAULT = "en";
BayrellTranslate.DICTIONARY = {};
module.exports.BayrellTranslate = BayrellTranslate;
