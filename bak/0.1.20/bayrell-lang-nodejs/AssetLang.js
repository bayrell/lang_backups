"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016-2017 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m_bayrell_rtl = require('bayrell_rtl');
var BayrellAsset = m_bayrell_rtl.BayrellAsset;
class AssetLang extends BayrellAsset {
    /*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
    getClassName(){
        return "bayrell_lang.AssetLang";
    }
    /*
	 * Возвращает название Asset
	 * @return {string} 
	 */
    getName(){
        return "bayrell_lang";
    }
    /*
	 * Возвращает список репозиториев проекта
	 * @return {string} 
	 */
    getRepositories(){
        return [
            {
                "type": "git",
                "href": "https://github.com/bayrell/bayrell_lang",
                "main": true,
            }
        ];
    }
    /*
	 * Возвращает список зависимостей ввиде других Asset
	 * @return {array} - массив строк с полными названиями других Asset
	 */
    getAssets(){
        return ["bayrell_rtl.AssetRtl"];
    }
    /*
	 * Возвращает правила сборки проекта в один js файл
	 * @return {json} 
	 */
    getBundleRules(){
        var path = this.vendor_path + "/bayrell/bayrell_lang_src";
        return [
            {
                "type": "js",
                "src": [path + "/es6/rtl.js", path + "/es6/re.js", path + "/es6/BayrellError.js", path + "/es6/BayrellObject.js", path + "/es6/BayrellTranslate.js", path + "/es6/BayrellCommonParser.js", path + "/es6/BayrellListItem.js", path + "/es6/BayrellList.js", path + "/es6/BayrellTokenParser.js", path + "/es6/BayrellStringList.js", path + "/es6/locale/en.js"],
                "dest": path + "/es6/dist/lang.min.js",
                "minify": true,
            }
        ];
    }
    /*
	 * Возвращает правила копирования файлов в папку /assets
	 * @return {array} 
	 */
    getCopyFilesRules(){
        if (this.isFlag("debug_rtl")) {
            return [
                {
                    "vendor_path": "/bayrell/bayrell_lang_src/es6/**/*",
                    "assets_path": "/bayrell_lang_src/",
                }
            ];
        }
        return [
            {
                "vendor_path": "/bayrell/bayrell_lang_es6/lang.min.js",
                "assets_path": "/bayrell_lang_es6/lang.min.js",
            }
        ];
    }
    /*
	 * Возвращает порядок загрузки css и js файлов.
	 * Массивы располагаются в порядке загрузки
	 * @return {array} 
	 */
    getLoadRules(){
        if (this.isFlag("debug_rtl")) {
            return [
                ["/assets/bayrell_lang_src/BayrellCode.js", "/assets/bayrell_lang_src/BayrellTranslator.js", "/assets/bayrell_lang_src/BayrellInterpreter.js", "/assets/bayrell_lang_src/BayrellAssetLang.js"],
                ["/assets/bayrell_lang_src/BayrellParserBay.js", "/assets/bayrell_lang_src/BayrellTranslatorBay.js", "/assets/bayrell_lang_src/BayrellTranslatorES6.js", "/assets/bayrell_lang_src/BayrellParserES6.js", "/assets/bayrell_lang_src/BayrellTranslatorPHP.js"],
                ["/assets/bayrell_lang_src/BayrellTranslatorNodeJS.js"],
                ["/assets/bayrell_lang_src/locale/core.en.js"]
            ];
        }
        return [
            ["/assets/bayrell_lang_es6/lang.min.js"]
        ];
    }
}
module.exports.AssetLang = AssetLang;
