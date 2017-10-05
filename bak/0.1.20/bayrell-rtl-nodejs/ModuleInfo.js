"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellModuleInfo = require('./BayrellModuleInfo.js');
var BayrellModuleInfo = m__BayrellModuleInfo.BayrellModuleInfo;
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class ModuleInfo extends BayrellModuleInfo {
    /* Общая информация */
    getClassName(){
        return "bayrell_rtl.ModuleInfo";
    }
    static getName(){
        return "bayrell_rtl";
    }
    static getDescription(){
        return "Bayrell Runtime Library";
    }
    static getKeywords(){
        return ["bayrell", "rtl"];
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
        return ["bayrell_rtl.BayrellRtlAsset"];
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
        return "bayrell/rtl";
    }
    static getComposerRequire(){
        return {};
    }
}
module.exports.ModuleInfo = ModuleInfo;
