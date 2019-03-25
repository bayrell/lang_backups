/*!
 *  Bayrell Common Languages Transcompiler
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

if (false){

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.7.1',
};

/* Exceptions */
ObjectAssign(module.exports, require("./Exceptions/ParserEOF.js"));
ObjectAssign(module.exports, require("./Exceptions/ParserError.js"));
ObjectAssign(module.exports, require("./Exceptions/ParserExpected.js"));

/* Interfaces */
ObjectAssign(module.exports, require("./Interfaces/ParserInterface.js"));

/* Root */
ObjectAssign(module.exports, require("./CoreParser.js"));
ObjectAssign(module.exports, require("./ModuleDescription.js"));
ObjectAssign(module.exports, require("./ParserConstant.js"));
ObjectAssign(module.exports, require("./ParserCursorPos.js"));
ObjectAssign(module.exports, require("./ParserReader.js"));
ObjectAssign(module.exports, require("./ParserToken.js"));
ObjectAssign(module.exports, require("./TokenPair.js"));

}
else{

module.exports = {
	VERSION: '0.7.1',
	'Exceptions': {
		'ParserEOF': require("./Exceptions/ParserEOF.js"),
		'ParserError': require("./Exceptions/ParserError.js"),
		'ParserExpected': require("./Exceptions/ParserExpected.js"),
	},
	'Interfaces': {
		'ParserInterface': require("./Interfaces/ParserInterface.js"),
	},
	'CoreParser': require("./CoreParser.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	'ParserConstant': require("./ParserConstant.js"),
	'ParserCursorPos': require("./ParserCursorPos.js"),
	'ParserReader': require("./ParserReader.js"),
	'ParserToken': require("./ParserToken.js"),
	'TokenPair': require("./TokenPair.js"),
};

}

