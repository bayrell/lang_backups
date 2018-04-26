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
var rtl = require('./Lib/rtl.js');
var CoreObject = require('./CoreObject.js');
var ContextInterface = require('./Interfaces/ContextInterface.js');
var LogInterface = require('./Interfaces/LogInterface.js');
class ContextObject extends CoreObject{
	_init(){
		super._init();
		this._context = null;
	}
	/**
	 * Returns context provider
	 *
	 * @params string provider_name
	 * @return ContextObject
	 */
	getProvider(provider_name){
		return this._context.createProvider(provider_name);
	}
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params MapInterface params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate(message, params, locale){
		if (params == undefined) params=null;
		if (locale == undefined) locale="";
		return this._context.translate(message, params, locale);
	}
	/**
	 * Get context
	 *
	 * @return ContextInterface 
	 */
	context(){
		return this._context;
	}
	/** 
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super();
		this._context = context;
		if (!rtl.exists(this._context)){
			this._context = rtl.globalContext();
		}
	}
	/**
	 * Clone current object
	 * @return CoreObject
	 */
	clone(context){
		if (context == undefined) context=null;
		var res = rtl.newInstanceByObject(this);
		if (rtl.exists(context)){
			res._context = context;
		}
		else {
			res._context = this._context;
		}
		res.assign(this);
		return res;
	}
	/**
	 * Register log
	 */
	logRegister(object_name){
		var log = this.getProvider("default.log");
		if (log){
			return log.logRegister(this.getClassName(), object_name);
		}
		return -1;
	}
	/**
	 * Log message
	 */
	log(level, object_name, message){
		var log = this.getProvider("default.log");
		if (log){
			log.log(level, this.getClassName(), object_name, message);
		}
	}
	/**
	 * Log exception
	 */
	logException(level, object_name, exception){
		var log = this.getProvider("default.log");
		if (log){
			log.log(level, this.getClassName(), object_name, exception.toString());
		}
	}
}
module.exports = ContextObject;