/*!
 *  Bayrell Bundler
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
	VERSION: '0.7.2',
};

/* Root */
ObjectAssign(module.exports, require("./Build.js"));
ObjectAssign(module.exports, require("./BundleFile.js"));
ObjectAssign(module.exports, require("./Bundler.js"));
ObjectAssign(module.exports, require("./BundlerPipe.js"));
ObjectAssign(module.exports, require("./Lib.js"));

}
else{

module.exports = {
	VERSION: '0.7.2',
	'Build': require("./Build.js"),
	'BundleFile': require("./BundleFile.js"),
	'Bundler': require("./Bundler.js"),
	'BundlerPipe': require("./BundlerPipe.js"),
	'Lib': require("./Lib.js"),
};

}