/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/

var rtl = require("./rtl.js");
var isset = rtl.isset;
var format = rtl.format;

class BayrellTranslate {
	
	static setLang(lang){
		BayrellTranslate.lang = lang;
	}
	
	static translate(str, params){
		if (isset(BayrellTranslate.dictionary[BayrellTranslate.lang]) && isset(BayrellTranslate.dictionary[BayrellTranslate.lang][str])){
			return format(BayrellTranslate.dictionary[BayrellTranslate.lang][str], params);
		}
		
		else if (isset(BayrellTranslate.dictionary[BayrellTranslate.lang_default]) && isset(BayrellTranslate.dictionary[BayrellTranslate.lang_default][str])){
			return format(BayrellTranslate.dictionary[BayrellTranslate.lang_default][str], params);
		}
		
		return str;
	}
	
	static addDictionary(lang, dict){
		if (!isset(BayrellTranslate.dictionary[lang]))
			BayrellTranslate.dictionary[lang] = {};
		
		for (var key in dict){
			BayrellTranslate.dictionary[lang][key] = dict[key];
		}
	}
}


BayrellTranslate.lang = null;
BayrellTranslate.lang_default = null;
BayrellTranslate.dictionary = {};


module.exports.BayrellTranslate = BayrellTranslate;