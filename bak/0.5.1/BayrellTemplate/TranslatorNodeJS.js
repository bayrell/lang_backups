"use strict;"
/*!
 *  Bayrell Template Engine
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
var rtl = require('bayrell-runtime-nodejs').rtl;
var Map = require('bayrell-runtime-nodejs').Map;
var Vector = require('bayrell-runtime-nodejs').Vector;
var re = require('bayrell-runtime-nodejs').re;
var rs = require('bayrell-runtime-nodejs').rs;
var TranslatorES6 = require('./TranslatorES6.js');
class TranslatorNodeJS extends TranslatorES6{
	getClassName(){return "BayrellTemplate.TranslatorNodeJS";}
	static getParentClassName(){return "TranslatorES6";}
	/**
	 * Get name
	 */
	getName(name){
		if (name == "parent"){
			return "super";
		}
		else if (name == "self"){
			return this.current_class_name;
		}
		return name;
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		this.current_namespace = op_code.value;
		var arr = rs.explode(".", this.current_namespace);
		this.current_module_name = arr.item(0);
		this.modules.clear();
		if (this.current_module_name != "Runtime"){
			return "var rs = require('bayrell-runtime-nodejs').rs;"+rtl.toString(this.s("var rtl = require('bayrell-runtime-nodejs').rtl;"))+rtl.toString(this.s("var Vector = require('bayrell-runtime-nodejs').Vector;"))+rtl.toString(this.s("var Map = require('bayrell-runtime-nodejs').Map;"));
		}
		return "";
	}
	/**
	 * Use
	 */
	OpUse(op_code){
		var res = "";
		var lib_name = op_code.value;
		var var_name = "m_"+rtl.toString(re.replace("\\.", "_", lib_name));
		var arr1 = rs.explode(".", lib_name);
		var arr2 = rs.explode(".", this.current_namespace);
		var sz_arr1 = arr1.count();
		var sz_arr2 = arr2.count();
		if (sz_arr1 < 2){
			return "";
		}
		var class_name = arr1.getLastItem();
		if (op_code.alias_name != ""){
			class_name = op_code.alias_name;
		}
		if (arr1.item(0) == arr2.item(0)){
			var pos = 0;
			while (pos < sz_arr1 && pos < sz_arr2 && arr1.item(pos) == arr2.item(pos)){
				pos++;
			}
			var js_path = "";
			if (pos == arr2.count()){
				js_path = "./";
			}
			else {
				for (var j = pos; j < sz_arr2; j++){
					js_path = rtl.toString(js_path)+"../";
				}
			}
			var ch = "";
			for (var j = pos; j < sz_arr1; j++){
				js_path = rtl.toString(js_path)+rtl.toString(ch)+rtl.toString(arr1.item(j));
				ch = "/";
			}
			var module_name = arr1.shift();
			var module_path = rs.implode(".", arr1);
			js_path = rtl.toString(js_path)+".js";
			res = "var "+rtl.toString(class_name)+" = require('"+rtl.toString(js_path)+"');";
		}
		else {
			var module_name = arr1.shift();
			var module_path = rs.implode(".", arr1);
			if (module_name == "Runtime"){
				module_name = "BayrellRuntime";
			}
			if (module_name == "RuntimeWeb"){
				module_name = "BayrellRuntimeWeb";
			}
			module_name = this.convertModuleName(module_name);
			res = "var "+rtl.toString(class_name)+" = require('"+rtl.toString(module_name)+"')."+rtl.toString(module_path)+";";
		}
		return res;
	}
	/**
	 * Class declare header
	 */
	OpClassDeclareHeader(op_code){
		var res = "";
		this.beginOperation();
		res += "class "+rtl.toString(op_code.class_name);
		if (op_code.class_extends != ""){
			res += " extends "+rtl.toString(this.translateRun(op_code.class_extends));
		}
		res += "{";
		this.endOperation();
		this.levelInc();
		return res;
	}
	/**
	 * Class declare footer
	 */
	OpClassDeclareFooter(op_code){
		var res = "";
		for (var i = 0; i < op_code.class_variables.count(); i++){
			var variable = op_code.class_variables.item(i);
			if (variable.flags != null && variable.flags.p_static == true){
				this.beginOperation();
				var s = rtl.toString(op_code.class_name)+"."+rtl.toString(variable.name)+" = "+rtl.toString(this.translateRun(variable.value))+";";
				this.endOperation();
				res += this.s(s);
			}
		}
		res += this.s("module.exports = "+rtl.toString(op_code.class_name)+";");
		return res;
	}
}
module.exports = TranslatorNodeJS;