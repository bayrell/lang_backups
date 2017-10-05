/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.1.6',
	BayrellCode: require("./src/BayrellCode.js").BayrellCode,
	BayrellParser: require("./src/BayrellParser.js").BayrellParser,
	BayrellParserBay: require("./src/BayrellParserBay.js").BayrellParserBay,
	BayrellTranslator: require("./src/BayrellTranslator.js").BayrellTranslator,
	BayrellTranslatorES6: require("./src/BayrellTranslatorES6.js").BayrellTranslatorES6,
	BayrellTranslatorNodeJS: require("./src/BayrellTranslatorNodeJS.js").BayrellTranslatorNodeJS,
};


require('./src/locale/core.en.js');