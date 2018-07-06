"use strict;"
/*!
 *  Bayrell Runtime Library
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
var CoreObject = require('../CoreObject.js');
var Map = require('../Map.js');
var Vector = require('../Vector.js');
var ContextInterface = require('./ContextInterface.js');
var SerializeContainer = require('../SerializeContainer.js');
class SerializeInterface{
	/**
	 * Returns classname of the object
	 * @return string
	 */
	getClassName(){
	}
	/**
	 * Returns new Instance
	 * @param ContextInterface context
	 * @param Map<string, mixed> values
	 * @return CoreObject
	 */
	static createNewInstanceFromValues(context, values){
	}
	/**
	 * Returns name of variables to serialization
	 * @return Vector<string>
	 */
	getVariablesNames(names){
	}
	/**
	 * Returns instance of the value by variable name
	 * @param string variable_name
	 * @return var
	 */
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value=null;
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
	}
}
module.exports = SerializeInterface;