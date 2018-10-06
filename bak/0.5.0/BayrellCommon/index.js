/*!
 * Bayrell Common Library
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
		'AssertError': require("./Exceptions/AssertError.js"),
	},
	'FileSystem': {
		'FileInterface': require("./FileSystem/FileInterface.js"),
		'FileSystemInterface': require("./FileSystem/FileSystemInterface.js"),
	},
	'Providers': {
		'AssertInterface': require("./Providers/AssertInterface.js"),
		'LogInterface': require("./Providers/LogInterface.js"),
		'SerializeStringInterface': require("./Providers/SerializeStringInterface.js"),
		'TranslateInterface': require("./Providers/TranslateInterface.js"),
	},
	'System': {
		'StreamInterface': require("./System/StreamInterface.js"),
		'StreamReader': require("./System/StreamReader.js"),
	},
	'Types': {
		'PathInfo': require("./Types/PathInfo.js"),
		'Pipe': require("./Types/Pipe.js"),
	},
	'CommonConstant': require("./CommonConstant.js"),
	'Utils': require("./Utils.js"),
};


