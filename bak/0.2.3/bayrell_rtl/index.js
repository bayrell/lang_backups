/*!
* Bayrell
* https://github.com/bayrell/bayrell
* Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
* Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
*/


module.exports = {
	VERSION: '0.1.22',
};


Object.assign( module.exports, require("./re.js") );
Object.assign( module.exports, require("./rtl.js") );
Object.assign( module.exports, require("./rtls.js") );
Object.assign( module.exports, require("./BayrellAsset.js") );
Object.assign( module.exports, require("./BayrellAssetRtl.js") );
Object.assign( module.exports, require("./BayrellCommonParser.js") );
Object.assign( module.exports, require("./BayrellDataObject.js") );
Object.assign( module.exports, require("./BayrellError.js") );
Object.assign( module.exports, require("./BayrellList.js") );
Object.assign( module.exports, require("./BayrellListItem.js") );
Object.assign( module.exports, require("./BayrellModuleInfo.js") );
Object.assign( module.exports, require("./BayrellObject.js") );
//Object.assign( module.exports, require("./BayrellObservedObject.js") );
//Object.assign( module.exports, require("./BayrellObserver.js") );
Object.assign( module.exports, require("./BayrellStringList.js") );
Object.assign( module.exports, require("./BayrellTokenParser.js") );
Object.assign( module.exports, require("./BayrellTranslate.js") );
Object.assign( module.exports, require("./BayrellXML.js") );
Object.assign( module.exports, require("./ModuleInfo.js") );
