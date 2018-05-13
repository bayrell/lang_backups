"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellModuleInfo extends BayrellObject {
	/* Общая информация */
	getClassName(){
		return "bayrell_rtl.BayrellModuleInfo";
	}
	static getName(){
		return "";
	}
	static getDescription(){
		return "";
	}
	static getKeywords(){
		return [];
	}
	static getVersion(){
		return "0.0.1";
	}
	static getAuthors(){
		return [];
	}
	static getLicense(){
		return "";
	}
	static getHomepage(){
		return "";
	}
	static getRepositories(){
		return {};
	}
	static getSupport(){
		return {};
	}
	/* Информация для Bayrell Web App */
	static getApiList(){
		return [];
	}
	static getAssets(){
		return [];
	}
	static getLocales(){
		return [];
	}
	static getModules(){
		return [];
	}
	static getOtherFiles(){
		return [];
	}
	static getRoutes(){
		return [];
	}
	static getTemplates(){
		return [];
	}
	/* Информация для Bower */
	static getBowerRequire(){
		return {};
	}
	/* Информация для Composer */
	static getComposerName(){
		return "";
	}
	static getComposerRequire(){
		return {};
	}
}
module.exports.BayrellModuleInfo = BayrellModuleInfo;
