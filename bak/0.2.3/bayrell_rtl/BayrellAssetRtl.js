"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016-2017 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellAsset = require('./BayrellAsset.js');
var BayrellAsset = m__BayrellAsset.BayrellAsset;
class BayrellAssetRtl extends BayrellAsset {
    /*
	 * Возвращает название текущего класса
	 * @return {string} 
	 */
    getClassName(){
        return "bayrell_rtl.AssetRtl";
    }
    /*
	 * Возвращает название Asset
	 * @return {string} 
	 */
    getName(){
        return "bayrell_rtl";
    }
    /*
	 * Возвращает список репозиториев проекта
	 * @return {string} 
	 */
    getRepositories(){
        return [
            {
                "repo": "git",
                "href": "https://github.com/bayrell/bayrell_rtl_es6",
                "type": "main",
            },
            {
                "repo": "git",
                "href": "https://github.com/bayrell/bayrell_rtl_src",
                "type": "source",
            }
        ];
    }
    /*
	 * Возвращает список зависимостей ввиде других Asset
	 * @return {array} - массив строк с полными названиями других Asset
	 */
    getAssets(){
        return [];
    }
    /*
	 * Возвращает правила сборки проекта в один файл
	 * @return {json} 
	 */
    getBundleRules(){
        var path = this.vendor_path + "/bayrell/bayrell_rtl_src";
        return [
            {
                "type": "js",
                "src": [path + "/es6/rtl.js", path + "/es6/re.js", path + "/es6/BayrellError.js", path + "/es6/BayrellObject.js", path + "/es6/BayrellTranslate.js", path + "/es6/BayrellCommonParser.js", path + "/es6/BayrellListItem.js", path + "/es6/BayrellList.js", path + "/es6/BayrellTokenParser.js", path + "/es6/BayrellStringList.js", path + "/es6/locale/en.js"],
                "dest": path + "/es6/dist/rtl.min.js",
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
                    "vendor_path": "/bayrell/bayrell_rtl_src/es6/**/*",
                    "assets_path": "/bayrell_rtl_src/",
                }
            ];
        }
        return [
            {
                "vendor_path": "/bayrell/bayrell_rtl_es6/rtl.min.js",
                "assets_path": "/bayrell_rtl_es6/rtl.min.js",
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
                ["/assets/bayrell_rtl_src/rtl.js", "/assets/bayrell_rtl_src/re.js"],
                ["/assets/bayrell_rtl_src/BayrellError.js", "/assets/bayrell_rtl_src/BayrellObject.js", "/assets/bayrell_rtl_src/BayrellTranslate.js"],
                ["/assets/bayrell_rtl_src/BayrellAsset.js", "/assets/bayrell_rtl_src/BayrellCommonParser.js", "/assets/bayrell_rtl_src/BayrellDataObject.js", "/assets/bayrell_rtl_src/BayrellModuleInfo.js", "/assets/bayrell_rtl_src/BayrellListItem.js", "/assets/bayrell_rtl_src/BayrellList.js"],
                ["/assets/bayrell_rtl_src/BayrellObservedObject.js", "/assets/bayrell_rtl_src/BayrellAssetRtl.js", "/assets/bayrell_rtl_src/BayrellTokenParser.js", "/assets/bayrell_rtl_src/BayrellStringList.js"],
                ["/assets/bayrell_rtl_src/BayrellObserver.js", "/assets/bayrell_rtl_src/locale/en.js"]
            ];
        }
        return [
            ["/assets/bayrell_rtl_es6/rtl.min.js"]
        ];
    }
}
module.exports.BayrellAssetRtl = BayrellAssetRtl;
