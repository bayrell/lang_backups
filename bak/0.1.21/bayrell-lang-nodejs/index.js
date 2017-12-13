/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.1.21',
};


Object.assign( module.exports, require("./AssetLang.js") );
Object.assign( module.exports, require("./BayrellCode.js") );
Object.assign( module.exports, require("./BayrellParserBay.js") );
Object.assign( module.exports, require("./BayrellParserES6.js") );
Object.assign( module.exports, require("./BayrellTranslator.js") );
Object.assign( module.exports, require("./BayrellTranslatorBay.js") );
Object.assign( module.exports, require("./BayrellTranslatorES6.js") );
Object.assign( module.exports, require("./BayrellTranslatorNodeJS.js") );
Object.assign( module.exports, require("./BayrellTranslatorPHP.js") );
Object.assign( module.exports, require("./BayrellInterpreter.js") );


require('./locale/core.en.js');