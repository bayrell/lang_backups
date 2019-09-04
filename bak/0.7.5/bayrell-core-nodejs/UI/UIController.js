"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var CoreObject = require('bayrell-runtime-nodejs').CoreObject;
var Emitter = require('bayrell-runtime-nodejs').Emitter;
var Reference = require('bayrell-runtime-nodejs').Reference;
var CoreManager = require('./Render/CoreManager.js');
class UIController extends CoreObject{
	/**
	 * Add supported events to controller
	 * @param Collection<string> events
	 */
	addEvents(events){
		if (this.events == null){
			this.events = new Vector();
		}
		for (var i = 0; i < events.count(); i++){
			var event = events.item(i);
			if (this.events.indexOf(event) == -1){
				this.events.push(event);
			}
		}
	}
	/**
	 * Add output signals
	 * @param fun f
	 * @param Collection<string> events
	 */
	addSignalOut(f, events){
		if (this.signal_out == null){
			this.signal_out = new Emitter();
		}
		this.signal_out.addMethod(f, events);
		this.addEvents(events);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.UIController";}
	static getCurrentNamespace(){return "Core.UI";}
	static getCurrentClassName(){return "Core.UI.UIController";}
	static getParentClassName(){return "Runtime.CoreObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this.ref = null;
		this.signal_in = new Emitter();
		this.signal_out = new Emitter();
		this.events = new Vector();
		this.manager = null;
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = UIController;