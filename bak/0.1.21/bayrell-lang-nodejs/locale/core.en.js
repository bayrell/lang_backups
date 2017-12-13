/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/

var m_bayrell_rtl = require('bayrell_rtl');
var BayrellTranslate = m_bayrell_rtl.BayrellTranslate;


BayrellTranslate.add('en', "bayrell_lang.BayrellParserBay", {
	
	'ERROR_RESERVED_WORD' : "Reserved word '%name%'",
	'ERROR_WRONG_INDENT' : "Wrong indent",
	'ERROR_VALUE_MUST_BE_STRING' : "Value must be string",
	'ERROR_OBJECT_CAN_NOT_LOCATED_HERE' : "'%object%' can not located here",
	'ERROR_OBJECT_CAN_NOT_BE_NESTED_IN_MAJOR_BLOCK' : "'%object%' can not be nested in the major block '%major_block%'",
	'ERROR_OBJECT_MUST_BE_NESTED_IN_MAJOR_BLOCK' : "'%object%' must be nested in the major block",
	'ERROR_EXPECTED': "'%what%' expected",
	
	'ERROR_IDENT_IS_RESERVER_WORD': "Identificator '%name%' is reserver word",
	'ERROR_UNKNOWN_IDENT': "Unknown identificator '%name%'",
	'ERROR_UNKNOWN_PREPROCESSOR_DIRECTIVE': "Unknown preprocessor directive %name%",
	
});

