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
var CoreStruct = require('bayrell-runtime-nodejs').CoreStruct;
var RuntimeUtils = require('bayrell-runtime-nodejs').RuntimeUtils;
var Assets = require('../Assets.js');
var LayoutModel = require('./LayoutModel.js');
var CoreView = require('./CoreView.js');
var RenderHelper = require('./RenderHelper.js');
class CoreLayout extends CoreView{
	/**
	 * Returns module name
	 */
	static moduleName(){
		return "Core.UI";
	}
	/**
	 * Required Assets
	 */
	static assets(){
		return (new Vector()).push("Core.UI.Assets");
	}
	/**
	 * Required components
	 */
	static components(){
		return (new Vector());
	}
	/**
	 * Component css
	 */
	static css(vars){
		return "*{box-sizing: border-box;}body{margin:0;padding:0;}";
	}
	/**
	 * Render head
	 */
	static head(data){
		return rtl.normalizeUIVector((new Vector())
		.push(new UIStruct(new Map({
		"space":"bdb8",
		"class_name":this.getCurrentClassName(),
		"name":"meta",
		"props": (new Map())
			.set("name", "Content-Type")
			.set("content", "text/html; charset=utf-8")
		,
		})))
		.push(new UIStruct(new Map({
		"space":"bdb8",
		"class_name":this.getCurrentClassName(),
		"name":"title",
		"children": rtl.normalizeUIVector(new Vector(
			rs.htmlEscape(data.title)
		))
		}))));
	}
	/**
	 * Patch modules
	 */
	static patchAssets(data, arr){
		arr = arr.map((name) => {
			if (name[0] == "@"){
				var pos = rs.strpos(name, "/");
				var module_name = rs.substr(name, 1, pos - 1);
				var path = rs.substr(name, pos);
				name = "/assets/"+rtl.toString(module_name)+rtl.toString(path);
			}
			return name;
		});
		return arr;
	}
	/**
	 * Render assets in header
	 */
	static assetsHeader(data){
		var resources = RenderHelper.loadResources(data.assets);
		var css_arr = resources.filter((name) => {
			return rs.extname(name) == "css";
		});
		css_arr = this.patchAssets(data, css_arr);
		css_arr = css_arr.map((css) => {
			return rtl.normalizeUIVector((new Vector())
			.push(new UIStruct(new Map({
			"space":"bdb8",
			"class_name":this.getCurrentClassName(),
			"name":"link",
			"props": (new Map())
				.set("rel", "stylesheet")
				.set("href", css)
			,
			}))));
		});
		var css = this.css(data.css_vars);
		css += RenderHelper.getCSSFromComponents(data.components, data.css_vars);
		return rtl.normalizeUIVector((new Vector())
		.push(rtl.normalizeUIVector((new Vector())
		.push(rs.htmlEscape(css_arr))
		.push(new UIStruct(new Map({
		"space":"bdb8",
		"class_name":this.getCurrentClassName(),
		"name":"style",
		"props": (new Map())
			.set("type", "text/css")
		,
		"children": rtl.normalizeUIVector(new Vector(
			css
		))
		})))
		)));
	}
	/**
	 * Render assets in body
	 */
	static assetsBody(data){
		var resources = RenderHelper.loadResources(data.assets);
		var js_arr = resources.filter((name) => {
			return rs.extname(name) == "js";
		});
		js_arr = js_arr.pushIm("@Core.UI/es6/Drivers/RenderDriver.js");
		js_arr = js_arr.pushIm("@Core.UI/es6/Drivers/ApiBusDriver.js");
		js_arr = this.patchAssets(data, js_arr);
		js_arr = js_arr.map((js) => {
			return rtl.normalizeUIVector((new Vector())
			.push(new UIStruct(new Map({
			"space":"bdb8",
			"class_name":this.getCurrentClassName(),
			"name":"script",
			"props": (new Map())
				.set("src", js)
			,
			}))));
		});
		return js_arr;
	}
	/**
	 * Content render
	 */
	static content(data){
		return data.content;
	}
	/**
	 * Component render
	 */
	static render(data){
		return rtl.normalizeUIVector((new Vector())
		.push("<!DOCTYPE html>")
		.push(new UIStruct(new Map({
		"space":"bdb8",
		"class_name":this.getCurrentClassName(),
		"name":"html",
		"children": rtl.normalizeUIVector(new Vector(
			new UIStruct(new Map({
			"space":"bdb8",
			"class_name":this.getCurrentClassName(),
			"name":"head",
			"children": rtl.normalizeUIVector(new Vector(
				rs.htmlEscape(this.head(data)),
				rs.htmlEscape(this.assetsHeader(data))
			))
			})),
			new UIStruct(new Map({
			"space":"bdb8",
			"class_name":this.getCurrentClassName(),
			"name":"body",
			"children": rtl.normalizeUIVector(new Vector(
				new UIStruct(new Map({
				"space":"bdb8",
				"class_name":this.getCurrentClassName(),
				"name":"div",
				"props": (new Map())
					.set("id", "root")
				,
				"children": rtl.normalizeUIVector(new Vector(
					this.content(data)
				))
				})),
				new UIStruct(new Map({
				"space":"bdb8",
				"class_name":this.getCurrentClassName(),
				"name":"input",
				"props": (new Map())
					.set("id", "view")
					.set("value", data.view)
					.set("style", "display: none;")
				,
				})),
				new UIStruct(new Map({
				"space":"bdb8",
				"class_name":this.getCurrentClassName(),
				"name":"input",
				"props": (new Map())
					.set("id", "model")
					.set("value", RuntimeUtils.base64_encode(rtl.json_encode(data.model)))
					.set("style", "display: none;")
				,
				})),
				new UIStruct(new Map({
				"space":"bdb8",
				"class_name":this.getCurrentClassName(),
				"name":"div",
				"props": (new Map())
					.set("id", "scripts")
				,
				"children": rtl.normalizeUIVector(new Vector(
					rs.htmlEscape(this.assetsBody(data))
				))
				}))
			))
			}))
		))
		}))));
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Core.UI.Render.CoreLayout";}
	static getCurrentNamespace(){return "Core.UI.Render";}
	static getCurrentClassName(){return "Core.UI.Render.CoreLayout";}
	static getParentClassName(){return "Core.UI.Render.CoreView";}
	assignObject(obj){
		if (obj instanceof CoreLayout){
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value, sender){if(sender==undefined)sender=null;
		super.assignValue(variable_name, value, sender);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		return super.takeValue(variable_name, default_value);
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
module.exports = CoreLayout;