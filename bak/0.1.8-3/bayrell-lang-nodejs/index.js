/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.1.8-3',
	
	BayrellCode: require("./src/BayrellCode.js").BayrellCode,
	BayrellParserBay: require("./src/BayrellParserBay.js").BayrellParserBay,
	BayrellParserES6: require("./src/BayrellParserES6.js").BayrellParserES6,
	BayrellTranslator: require("./src/BayrellTranslator.js").BayrellTranslator,
	BayrellTranslatorBay: require("./src/BayrellTranslatorBay.js").BayrellTranslatorBay,
	BayrellTranslatorES6: require("./src/BayrellTranslatorES6.js").BayrellTranslatorES6,
	BayrellTranslatorNodeJS: require("./src/BayrellTranslatorNodeJS.js").BayrellTranslatorNodeJS,
	BayrellTranslatorPHP: require("./src/BayrellTranslatorPHP.js").BayrellTranslatorPHP,
	BayrellInterpreter: require("./src/BayrellInterpreter.js").BayrellInterpreter,
};


require('./src/locale/core.en.js');