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
var rtl = require('./rtl.js');
var Map = require('./Map.js');
var Vector = require('./Vector.js');
class CoreObject{
	getClassName(){return "Runtime.CoreObject";}
	static getParentClassName(){return "";}
	/** 
	 * Constructor
	 */
	constructor(){
		
		this._init();
	}
	
	_init(){
		this.__implements__ = new Array();
	}
	
	_del(){
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
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObject(obj){
		this.assignObjectAfter(obj);
	}
	/**
	 * Assign and clone data from other object
	 * @param CoreObject obj
	 */
	assignObjectAfter(obj){
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValue(variable_name, value){
		this.assignValueAfter(variable_name, value);
	}
	/**
	 * Calls after assign new value
	 * @param string variable_name
	 * @param var value
	 */
	assignValueAfter(variable_name, value){
	}
	/**
	 * Calls after assign new value
	 * @param string variable_name
	 */
	assignAfter(variable_name){
		this.assignValueAfter(variable_name, this.takeValue(variable_name));
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	assignValues(values){
		if (values == undefined) values=null;
		if (values == null){
			return ;
		}
		var names = new Vector();
		this.getVariablesNames(names);
		names.each((name) => {
			var value = values.get(name, null);
			this.assignValue(name, value);
		});
	}
	/**
	 * Set new value instance by variable name
	 * @param string variable_name
	 * @param var value
	 */
	takeValues(){
		var values = new Map();
		var names = new Vector();
		this.getVariablesNames(names);
		names.each((name) => {
			var value = this.takeValue(name, null);
			values.set(name, value);
		});
		return values;
	}
	/**
	 * Assign all data from other object
	 * @param CoreObject obj
	 */
	assign(obj){
	}
	/**
	 * Call static method of the current class
	 * @param string method_name
	 * @param Vector args
	 * @return mixed
	 */
	callStaticMethod(method_name, args){
		if (args == undefined) args=null;
		var class_name = this.getClassName();
		return rtl.callStaticMethod(class_name, method_name, args);
	}
}
module.exports = CoreObject;