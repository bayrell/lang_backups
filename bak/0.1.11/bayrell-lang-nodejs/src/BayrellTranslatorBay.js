"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
  */
var m__BayrellCode = require('./BayrellCode.js');
var BayrellCode = m__BayrellCode.BayrellCode;
var m__BayrellTranslator = require('./BayrellTranslator.js');
var BayrellTranslator = m__BayrellTranslator.BayrellTranslator;
var m_bayrell_rtl = require('bayrell_rtl');
var rtl = m_bayrell_rtl.rtl;
class BayrellTranslatorBay extends BayrellTranslator {
	static newInstance(){
		return new BayrellTranslatorBay();
	}
}
module.exports.BayrellTranslatorBay = BayrellTranslatorBay;
