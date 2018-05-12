"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellModuleInfo = m_bayrell_rtl.BayrellModuleInfo;
var BayrellObject = m_bayrell_rtl.BayrellObject;
var rlt = m_bayrell_rtl.rlt;
class ModuleInfo extends BayrellModuleInfo {
	/* Общая информация */
	getClassName(){
		return "bayrell_lang.ModuleInfo";
	}
	static getName(){
		return "bayrell_lang";
	}
	static getDescription(){
		return "Bayrell Language Translator and Interpretator";
	}
	static getKeywords(){
		return ["bayrell", "lang"];
	}
	static getVersion(){
		return "0.1.18";
	}
	static getAuthors(){
		return [
			{
				"name": "Ildar Bikmamatov",
				"email": "ildar@bayrell.org",
			}
		];
	}
	static getLicense(){
		return "Bayrell Framework License";
	}
	static getHomepage(){
		return "http://bayrell.org/";
	}
	static getRepositories(){
		return {
			"type": "git",
			"url": "https://github.com/bayrell/",
		};
	}
	static getSupport(){
		return {
			"email": "framework@bayrell.org",
		};
	}
	/* Информация для Bayrell Web App */
	static getAssets(){
		return [];
	}
	static getTemplates(){
		return [];
	}
	static getApiList(){
		return [];
	}
	static getRoutes(){
		return [];
	}
	/* Информация для Bower */
	static getBowerRequire(){
		return {};
	}
	/* Информация для Composer */
	static getComposerName(){
		return "bayrell/lang";
	}
	static getComposerRequire(){
		return {};
	}
}
module.exports.ModuleInfo = ModuleInfo;
