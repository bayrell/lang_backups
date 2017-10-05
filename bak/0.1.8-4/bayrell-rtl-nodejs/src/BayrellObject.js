/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__rtl = require('./rtl.js');
var translate = m__rtl.translate;
var getStaticConst = m__rtl.getStaticConst;
var m__BayrellTranslate = require('./BayrellTranslate.js');
var BayrellTranslate = m__BayrellTranslate.BayrellTranslate;
class BayrellObject{
	newInstance(){
		return new BayrellObject();
	}
	createInstance(){
		return this.newInstance();
	}
	createError(error, params, line, col, file_name){
		return BayrellError.Instance(error, params, file_name, line, col);
	}
}
module.exports.BayrellObject = BayrellObject;
