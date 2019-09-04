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
var ContextInterface = require('bayrell-runtime-nodejs').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('bayrell-runtime-nodejs').Interfaces.ModuleDescriptionInterface;
var AssetsInterface = require('../Interfaces/AssetsInterface.js');
var RenderContainer = require('./Render/RenderContainer.js');
class ModuleDescription{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){
		return "Core.UI";
	}
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){
		return "0.7.3";
	}
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	static requiredModules(){
		return (new Map()).set("Runtime", ">=0.3").set("Core.Interfaces", "*").set("Core.Http", "*");
	}
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	static getModuleFiles(){
		return (new Vector()).push("Core.UI.UIEvent").push("Core.UI.Annotations.AnnotationEvent").push("Core.UI.Annotations.ApiInstance").push("Core.UI.Annotations.RouteInfo").push("Core.UI.Annotations.RoutesInstance").push("Core.UI.Events.CommandEvent").push("Core.UI.Events.ComponentEvent").push("Core.UI.Events.ModelChange").push("Core.UI.Events.MountEvent").push("Core.UI.Events.UpdateStateEvent").push("Core.UI.Events.UserEvent.UserEvent").push("Core.UI.Render.CoreManager").push("Core.UI.Render.CoreRoute").push("Core.UI.Render.CoreView").push("Core.UI.Render.RenderContainer").push("Core.UI.Render.RenderHelper").push("Core.UI.Render.WebContainer").push("Core.UI.Assets").push("Core.UI.Annotations.BindModel").push("Core.UI.Annotations.Event").push("Core.UI.Annotations.EventAsync").push("Core.UI.Events.KeyboardEvent.KeyboardEvent").push("Core.UI.Events.MouseEvent.MouseEvent").push("Core.UI.Events.UserEvent.BlurEvent").push("Core.UI.Events.UserEvent.ChangeEvent").push("Core.UI.Events.UserEvent.FocusEvent").push("Core.UI.Render.CoreLayout").push("Core.UI.Events.KeyboardEvent.KeyDownEvent").push("Core.UI.Events.KeyboardEvent.KeyPressEvent").push("Core.UI.Events.KeyboardEvent.KeyUpEvent").push("Core.UI.Events.MouseEvent.MouseClickEvent").push("Core.UI.Events.MouseEvent.MouseContextMenuEvent").push("Core.UI.Events.MouseEvent.MouseDoubleClickEvent").push("Core.UI.Events.MouseEvent.MouseDownEvent").push("Core.UI.Events.MouseEvent.MouseEnterEvent").push("Core.UI.Events.MouseEvent.MouseLeaveEvent").push("Core.UI.Events.MouseEvent.MouseMoveEvent").push("Core.UI.Events.MouseEvent.MouseOutEvent").push("Core.UI.Events.MouseEvent.MouseOverEvent").push("Core.UI.Events.MouseEvent.MouseUpEvent");
	}
	/**
	 * Returns enities
	 */
	static entities(){
		return null;
	}
	/**
	 * Returns required assets
	 * @return Collection<string>
	 */
	static assets(context){
		return null;
	}
	/**
	 * Returns sync loaded files
	 */
	static resources(context){
		return null;
	}
	/**
	 * Init render container
	 */
	static initContainer(container){
		return container;
	}
	/**
	 * Get lambda filters
	 */
	static lambdaFilters(){
		return null;
	}
	/**
	 * Called then module registed in context
	 * @param ContextInterface context
	 */
	static onRegister(context){
	}
	/**
	 * Called then context read config
	 * @param Map<mixed> config
	 */
	static onReadConfig(context, config){
	}
	/**
	 * Init context
	 * @param ContextInterface context
	 */
	static onInitContext(context){
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.ModuleDescription";}
	static getCurrentNamespace(){return "Core.UI";}
	static getCurrentClassName(){return "Core.UI.ModuleDescription";}
	static getParentClassName(){return "";}
	_init(){
		if (this.__implements__ == undefined){this.__implements__ = [];}
		this.__implements__.push(ModuleDescriptionInterface);
		this.__implements__.push(AssetsInterface);
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
ModuleDescription.__static_implements__ = [];
ModuleDescription.__static_implements__.push(ModuleDescriptionInterface)
ModuleDescription.__static_implements__.push(AssetsInterface)
module.exports = ModuleDescription;