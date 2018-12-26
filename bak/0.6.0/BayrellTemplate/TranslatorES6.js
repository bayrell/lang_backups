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
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var rs = require('bayrell-runtime-nodejs').rs;
var BayrellLangTranslatorES6 = require('bayrell-lang-nodejs').LangES6.TranslatorES6;
var BaseOpCode = require('bayrell-lang-nodejs').OpCodes.BaseOpCode;
var OpComment = require('bayrell-lang-nodejs').OpCodes.OpComment;
var OpConcat = require('bayrell-lang-nodejs').OpCodes.OpConcat;
var OpString = require('bayrell-lang-nodejs').OpCodes.OpString;
var OpComponent = require('./OpCodes/OpComponent.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlEscape = require('./OpCodes/OpHtmlEscape.js');
var OpHtmlJson = require('./OpCodes/OpHtmlJson.js');
var OpHtmlRaw = require('./OpCodes/OpHtmlRaw.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
class TranslatorES6 extends BayrellLangTranslatorES6{
	/**
	 * Check if name is component
	 * @param string name
	 * @return bool
	 */
	isComponent(name){
		var ch = rs.charAt(name, 0);
		return rs.strtoupper(ch) == ch && ch != "";
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		super.OpNamespace(op_code);
		this.modules.set("rs", "Runtime.rs");
		this.modules.set("UIStruct", "Runtime.UIStruct");
		return "";
	}
	/**
	 * OpHtmlJson
	 */
	OpHtmlJson(op_code){
		var value = rtl.toString(this.getName("rs"))+".json_encode("+rtl.toString(this.translateRun(op_code.value))+")";
		var res = "";
		res = "new "+rtl.toString(this.getName("UIStruct"))+"(";
		res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
		res += this.s(".set(\"name\", \"span\")");
		res += this.s(".set(\"props\", (new "+rtl.toString(this.getName("Map"))+"())");
		res += this.s(".set("+rtl.toString(this.convertString("dangerouslySetInnerHTML"))+", RuntimeWeb.Lib.html("+rtl.toString(value)+")"+")");
		res += this.s(")");
		return res;
	}
	/**
	 * OpHtmlRaw
	 */
	OpHtmlRaw(op_code){
		var value = this.translateRun(op_code.value);
		var res = "";
		res = "new "+rtl.toString(this.getName("UIStruct"))+"(";
		res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
		res += this.s(".set(\"name\", \"span\")");
		res += this.s(".set(\"props\", (new "+rtl.toString(this.getName("Map"))+"())");
		res += this.s(".set("+rtl.toString(this.convertString("dangerouslySetInnerHTML"))+", RuntimeWeb.Lib.html("+rtl.toString(value)+")"+")");
		res += this.s(")");
		return res;
	}
	/**
	 * Html tag
	 */
	OpHtmlTag(op_code){
		var is_component = false;
		var res = "";
		this.pushOneLine(false);
		this.levelInc();
		/* isComponent */
		if (this.modules.has(op_code.tag_name)){
			res = "new "+rtl.toString(this.getName("UIStruct"))+"(";
			res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
			res += this.s(".set(\"kind\", \"component\")");
			res += this.s(".set(\"name\", "+rtl.toString(this.convertString(this.modules.item(op_code.tag_name)))+")");
			is_component = true;
		}
		else {
			res = "new "+rtl.toString(this.getName("UIStruct"))+"(";
			res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
			res += this.s(".set(\"name\", "+rtl.toString(this.convertString(op_code.tag_name))+")");
		}
		var raw_item = null;
		if (!op_code.is_plain && op_code.childs != null && op_code.childs.count() == 1){
			var item = op_code.childs.item(0);
			if (item instanceof OpHtmlJson){
				raw_item = item;
			}
			else if (item instanceof OpHtmlRaw){
				raw_item = item;
			}
		}
		if (is_component){
			res += this.s(".set(\"props\", this.getElementAttrs()");
		}
		else {
			res += this.s(".set(\"props\", (new "+rtl.toString(this.getName("Map"))+"())");
		}
		if (op_code.attributes != null && op_code.attributes.count() > 0){
			op_code.attributes.each((item) => {
				this.pushOneLine(true);
				var value = this.translateRun(item.value);
				this.popOneLine();
				res += this.s(".set("+rtl.toString(this.convertString(item.key))+", "+rtl.toString(value)+")");
			});
		}
		if (op_code.spreads != null && op_code.spreads.count() > 0){
			op_code.spreads.each((item) => {
				res += this.s(".addMap("+rtl.toString(item)+")");
			});
		}
		if (op_code.is_plain){
			if (op_code.childs != null){
				var value = op_code.childs.reduce((res, item) => {
					var value = "";
					if (item instanceof OpHtmlJson){
						value = rtl.toString(this.getName("rs"))+".json_encode("+rtl.toString(this.translateRun(item.value))+")";
						value = rtl.toString(this.getName("rtl"))+".toString("+rtl.toString(value)+")";
					}
					else if (item instanceof OpHtmlRaw){
						value = this.translateRun(item.value);
						value = rtl.toString(this.getName("rtl"))+".toString("+rtl.toString(value)+")";
					}
					else if (item instanceof OpConcat || item instanceof OpString || item instanceof OpHtmlText){
						value = this.translateRun(item);
					}
					else if (item instanceof OpHtmlEscape){
						value = this.translateRun(item);
						value = rtl.toString(this.getName("rs"))+".htmlEscape("+rtl.toString(value)+")";
					}
					else {
						value = this.translateRun(item);
						value = rtl.toString(this.getName("rtl"))+".toString("+rtl.toString(value)+")";
					}
					if (res == ""){
						return value;
					}
					return rtl.toString(res)+"+"+rtl.toString(value);
				}, "");
				res += this.s(".set("+rtl.toString(this.convertString("dangerouslySetInnerHTML"))+", "+rtl.toString(value)+")");
			}
		}
		else if (raw_item != null){
			if (raw_item instanceof OpHtmlJson){
				var value = rtl.toString(this.getName("rs"))+".json_encode("+rtl.toString(this.translateRun(raw_item.value))+")";
				res += this.s(".set("+rtl.toString(this.convertString("dangerouslySetInnerHTML"))+", RuntimeWeb.Lib.html("+rtl.toString(value)+")"+")");
			}
			else if (raw_item instanceof OpHtmlRaw){
				var value = this.translateRun(raw_item.value);
				res += this.s(".set("+rtl.toString(this.convertString("dangerouslySetInnerHTML"))+", RuntimeWeb.Lib.html("+rtl.toString(value)+")"+")");
			}
		}
		res += this.s(")");
		/* Childs */
		if (raw_item == null && !op_code.is_plain){
			if (op_code.childs == null || op_code.childs.count() == 0){
			}
			else {
				res += this.s(".set(\"children\", (new "+rtl.toString(this.getName("Vector"))+"())");
				op_code.childs.each((item) => {
					if (item instanceof OpComment){
						return ;
					}
					res += this.s(".push("+rtl.toString(this.translateRun(item))+")");
				});
				res += this.s(")");
			}
		}
		this.levelDec();
		res += this.s(")");
		this.popOneLine();
		return res;
	}
	/**
	 * Html tag
	 */
	OpHtmlView(op_code){
		this.pushOneLine(false);
		var res = "(new "+rtl.toString(this.getName("Vector"))+"())";
		op_code.childs.each((item) => {
			res += this.s(".push("+rtl.toString(this.translateRun(item))+")");
		});
		this.popOneLine();
		return res;
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateRun(op_code){
		if (op_code instanceof OpHtmlEscape){
			return super.translateRun(op_code.value);
		}
		else if (op_code instanceof OpHtmlJson){
			return this.OpHtmlJson(op_code);
		}
		else if (op_code instanceof OpHtmlRaw){
			return this.OpHtmlRaw(op_code);
		}
		else if (op_code instanceof OpHtmlTag){
			return this.OpHtmlTag(op_code);
		}
		else if (op_code instanceof OpHtmlText){
			return this.OpString(op_code);
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpHtmlView(op_code);
		}
		return super.translateRun(op_code);
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellTemplate.TranslatorES6";}
	static getParentClassName(){return "BayrellLangTranslatorES6";}
}
module.exports = TranslatorES6;