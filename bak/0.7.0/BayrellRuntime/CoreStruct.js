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
var CoreObject = require('./CoreObject.js');
var Dict = require('./Dict.js');
var rtl = require('./rtl.js');
var SerializeInterface = require('./Interfaces/SerializeInterface.js');
class CoreStruct extends CoreObject{
	/** 
	 * Constructor
	 */
	constructor(obj){
		if (obj == undefined) obj=null;
		super();
		this.assignMap(obj);
	}
	/**
	 * Copy this struct with new values
	 * @param Dict obj = null
	 * @return CoreStruct
	 */
	copy(obj){
		if (obj == undefined) obj=null;
		var instance = rtl.newInstance(this.getClassName(), (new Vector()).push(null).push(false));
		/* copy values without clone */
		var names = new Vector();
		this.getVariablesNames(names, 2);
		for (var i = 0; i < names.count(); i++){
			var name = names.item(i);
			instance.assignValue(name, this.takeValue(name));
		}
		/* Assign new values */
		if (obj != null){
			instance.setMap(obj);
		}
		return instance;
	}
	/**
	 * Create new struct with new value
	 * @param string field_name
	 * @param fun f
	 * @return CoreStruct
	 */
	map(field_name, f){
		return this.copy((new Map()).set(field_name, f(this.takeValue(field_name))));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.CoreStruct";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(SerializeInterface);
	}
}
CoreStruct.__static_implements__ = [];
CoreStruct.__static_implements__.push(SerializeInterface)
module.exports = CoreStruct;