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


module.exports = {
	VERSION: '0.4.0',
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


