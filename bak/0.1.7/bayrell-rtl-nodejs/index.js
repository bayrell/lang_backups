/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.1.7-1',
	
	BayrellError: require("./src/BayrellError.js").BayrellError,
	BayrellObject: require("./src/BayrellError.js").BayrellObject,
	BayrellSimpleParser: require("./src/BayrellSimpleParser.js").BayrellSimpleParser,
	BayrellCommonParser: require("./src/BayrellCommonParser.js").BayrellCommonParser,
	BayrellTranslate: require("./src/BayrellTranslate.js").BayrellTranslate,
};

Object.assign( module.exports, require("./src/rtl.js") );
