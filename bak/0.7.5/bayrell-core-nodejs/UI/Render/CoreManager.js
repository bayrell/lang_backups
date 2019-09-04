"use strict;"
/*!
 *  Bayrell Core Library
 *
 *  (c) Copyright 2018-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
var ContextObject = require('bayrell-runtime-nodejs').ContextObject;
var Emitter = require('bayrell-runtime-nodejs').Emitter;
var Reference = require('bayrell-runtime-nodejs').Reference;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var AnnotationEvent = require('../Annotations/AnnotationEvent.js');
var BindModel = require('../Annotations/BindModel.js');
var ModelChange = require('../Events/ModelChange.js');
class CoreManager extends ContextObject{
	/**
	 * Returns parent controller name
	 */
	getParentControllerName(){
		return this.ui.controller;
	}
	/**
	 * Constructor
	 */
	constructor(context){
		if (context == undefined) context=null;
		super(context);
		/* Analyze controllers annotaions */
		var introspection = RuntimeUtils.getIntrospection(this.getClassName());
		introspection.each((info) => {
			var annotations = (rtl.method(info.getClassName(), "filterAnnotations"))("", info);
			annotations.each((annotation) => {
				this.initAnnotation(info, annotation);
			});
		});
		/* Init manager */
		this.initManager();
	}
	/**
	 * Init manager
	 */
	initManager(){
		this.signal_in.addMethod(this.signalInModelChange.bind(this), (new Vector()).push("Core.UI.Events.ModelChange"));
	}
	/**
	 * Destroy manager
	 */
	destroyManager(){
	}
	/**
	 * Model changed by input signal
	 */
	signalInModelChange(event){
	}
	/**
	 * Driver start manager
	 */
	onStartManager(){
	}
	/**
	 * Model changed by driver or self
	 */
	onModelChange(old_model, new_model){
	}
	/**
	 * Driver update manager
	 */
	onUpdateManager(old_model, new_model){
	}
	/**
	 * Set parent manager
	 */
	setParentManager(parent_manager, ui){
		/* Remove old annotations */
		if (this.annotations_emitter != null){
			this.signal_out.removeEmitter(this.annotations_emitter);
			this.annotations_emitter = null;
		}
		this.ui = ui;
		this.parent_manager = parent_manager;
		/*
		if (parent_manager != null and parent_controller_name != "")
		{
			UIControl parent_controller = parent_manager.takeValue(parent_controller_name, null);
			if (parent_controller != null)
			{
				parent_controller.signal_in.addEmitter( this.signal_in );
				this.signal_out.addEmitter( parent_controller.signal_out );
			}
		}
		*/
		/* Build annotations */
		var annotations = new Vector();
		if (ui.annotations != null){
			annotations = ui.annotations.toVector();
		}
		if (ui.bind != ""){
			annotations.push(new BindModel((new Map()).set("model", ui.bind)));
		}
		if (annotations != null && annotations.count() > 0){
			this.annotations_emitter = new Emitter();
			for (var i = 0; i < annotations.count(); i++){
				var annotation = annotations.item(i);
				(rtl.method(annotation.getClassName(), "addEmitter"))(this.parent_manager, this.annotations_emitter, ui, annotation);
			}
			this.signal_out.addEmitter(this.annotations_emitter);
		}
	}
	/**
	 * Init Annotation
	 */
	initAnnotation(info, annotation){
		if (info.kind != IntrospectionInfo.ITEM_FIELD){
			return ;
		}
		var field_name = info.name;
		var controller = this.takeValue(field_name);
		controller.manager = this;
		(rtl.method(annotation.getClassName(), "initController"))(controller, this, annotation, field_name);
	}
	/**
	 * Update current model
	 * @param Dict map
	 */
	updateModel(map){
		this.setModel(this.model.copy(map));
	}
	/**
	 * Set new manager's model and dispatch signal out ModelChange
	 * @param CoreModel model
	 */
	setModel(model){
		if (this.model != model){
			var old_model = this.model;
			this.model = model;
			this._model_updated_by_self = true;
			this.signal_out.dispatch(new ModelChange((new Map()).set("model", this.model)));
			this.onModelChange(old_model, model);
		}
	}
	/**
	 * Send output signals
	 * @param CoreEvent event
	 */
	signalOut(event){
		this.signal_out.dispatch(event);
	}
	/**
	 * Returns true if model is updated
	 * @return bool
	 */
	isModelUpdated(){
		return this._model_updated_by_self || this._model_updated_by_driver;
	}
	/**
	 * Returns true if model is update by Driver
	 * @return bool
	 */
	isModelUpdatedByDriver(){
		return this._model_updated_by_driver;
	}
	/**
	 * Returns true if model is update by self manager
	 * @return bool
	 */
	isModelUpdatedBySelf(){
		return this._model_updated_by_self;
	}
	/**
	 * Set new manager's model
	 */
	driverSetNewModel(model){
		var old_model = this.model;
		if (this.model != model){
			this.model = model;
			this._model_updated_by_driver = true;
			this.onModelChange(old_model, model);
		}
	}
	/**
	 * Update DOM by manager. Return true if manager should update, or false if update should by driver
	 * @return bool
	 */
	shouldUpdateElem(elem, ui){
		return this.isModelUpdated();
	}
	/**
	 * Overload driver render
	 * @return bool
	 */
	driverRenderOverload(elem, ui){
		return false;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Render.CoreManager";}
	static getCurrentNamespace(){return "Core.UI.Render";}
	static getCurrentClassName(){return "Core.UI.Render.CoreManager";}
	static getParentClassName(){return "Runtime.ContextObject";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this._key = "";
		this.model = null;
		this._model_updated_by_self = true;
		this._model_updated_by_driver = true;
		this.signal_in = new Emitter();
		this.signal_out = new Emitter();
		this.annotations_emitter = null;
		this.parent_manager = null;
		this.ui = null;
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
module.exports = CoreManager;