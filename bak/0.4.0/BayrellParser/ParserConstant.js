"use strict;"
/*!
 *  Bayrell Parser Library.  
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var RuntimeConstant = require('BayrellRuntime').RuntimeConstant;
class ParserConstant{
	_init(){
	}
}
ParserConstant.ERROR_PARSER = RuntimeConstant.ERROR_MODULE_PARSER;
ParserConstant.ERROR_PARSER_EOF = RuntimeConstant.ERROR_MODULE_PARSER - 1;
ParserConstant.ERROR_PARSER_EXPECTED = RuntimeConstant.ERROR_MODULE_PARSER - 2;
module.exports = ParserConstant;