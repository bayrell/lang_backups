"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(tag_name)
	{
		var _v0 = use("Runtime.rs");
		var ch1 = _v0.substr(tag_name, 0, 1);
		var _v0 = use("Runtime.rs");
		var ch2 = _v0.strtoupper(ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(tag_name)
	{
		var tokens = use("Runtime.Collection").create(["img","meta","input","link","br"]);
		if (tokens.indexOf(tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(t,attr)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
		if (attr.value instanceof _v0)
		{
			var _v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var _v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (attr.value.kind == _v1.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(t, attr.value.value);
				t = res[0];
				return use("Runtime.Collection").create([t,res[1]]);
			}
			else if (attr.value.kind == _v2.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(t, attr.value.value);
				t = res[0];
				var value = res[1];
				value = "static::json_encode(" + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(")");
				return use("Runtime.Collection").create([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(t, attr.value);
		t = res[0];
		var value = res[1];
		return use("Runtime.Collection").create([t,value]);
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(t,op_code)
	{
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = "$" + use("Runtime.rtl").toString(res[1]);
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(t, op_code.op_code_name);
			t = res[0];
			module_name = res[1];
		}
		else
		{
			module_name = t.expression.constructor.toString(t.expression.constructor.findModuleName(t, op_code.tag_name));
		}
		var _v0 = use("Runtime.lib");
		var model = op_code.attrs.findItem(_v0.equalAttr("key", "@model"));
		if (model)
		{
			var res = t.expression.constructor.Expression(t, model.value);
			t = res[0];
			v_model = res[1];
		}
		else
		{
			var _v0 = use("Runtime.lib");
			var bind = op_code.attrs.findItem(_v0.equalAttr("key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(t, bind.value);
				t = res[0];
				v_model = "$model[" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("]");
			}
		}
		content += use("Runtime.rtl").toString("/* Component '" + use("Runtime.rtl").toString(tag_name) + use("Runtime.rtl").toString("' */"));
		content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString("_params = [];")));
		for (var i = 0;i < op_code.attrs.count();i++)
		{
			var attr = op_code.attrs.item(i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			var res = this.OpHtmlAttr(t, attr);
			t = res[0];
			var attr_value = res[1];
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString("_params[") + use("Runtime.rtl").toString(t.expression.constructor.toString(attr.key)) + use("Runtime.rtl").toString("] = ") + use("Runtime.rtl").toString(attr_value) + use("Runtime.rtl").toString(";")));
		}
		content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString("_content = \"\";")));
		var _v0 = use("Runtime.rtl");
		var f = _v0.method(this.getCurrentClassName(), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(t, f, use("Runtime.Collection").create([op_code.items,var_name + use("Runtime.rtl").toString("_content")]));
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		/*content ~= t.s(var_name~"_content .= " ~ res[2] ~ ";");*/
		if (op_code.op_code_name)
		{
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toString(module_name) + use("Runtime.rtl").toString(");")));
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_name::render($layout,") + use("Runtime.rtl").toString(v_model) + use("Runtime.rtl").toString(",\\Runtime\\Dict::create(") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_params),") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_content,$control);")));
		}
		else
		{
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toString(module_name) + use("Runtime.rtl").toString(");")));
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_name::render($layout,") + use("Runtime.rtl").toString(v_model) + use("Runtime.rtl").toString(",\\Runtime\\Dict::create(") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_params),") + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_content,$control);")));
		}
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").create([t,var_name]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(t,op_code)
	{
		if (this.isComponent(op_code.tag_name))
		{
			return this.OpHtmlComponent(t, op_code);
		}
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = "$" + use("Runtime.rtl").toString(res[1]);
		var attr_s = "";
		var attrs = op_code.attrs.map((attr) => 
		{
			var attr_value = "";
			var key = attr.key;
			var _v0 = use("Bayrell.Lang.OpCodes.OpString");
			if (key == "@class" && attr.value instanceof _v0)
			{
				return "class=" + use("Runtime.rtl").toString("\"'.static::getCssName(") + use("Runtime.rtl").toString(t.expression.constructor.toString(attr.value.value)) + use("Runtime.rtl").toString(").'\"");
			}
			if (key == "@model" && op_code.tag_name == "input")
			{
				key = "value";
			}
			if (key == "@bind" && op_code.tag_name == "input")
			{
				var res = t.expression.constructor.Expression(t, attr.value);
				t = res[0];
				attr_value = "$model[" + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("]");
				key = "value";
			}
			var _v0 = use("Runtime.rs");
			var ch = _v0.substr(key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(t, attr);
				t = res[0];
				attr_value = res[1];
			}
			return key + use("Runtime.rtl").toString("=\"'.static::escapeAttr(") + use("Runtime.rtl").toString(attr_value) + use("Runtime.rtl").toString(").'\"");
		});
		attrs = attrs.filter((s) => 
		{
			return s != "";
		});
		if (attrs.count() > 0)
		{
			var _v0 = use("Runtime.rs");
			attr_s = " " + use("Runtime.rtl").toString(_v0.join(" ", attrs));
		}
		var content = "/* Element '" + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString("' */");
		if (this.isSingleTag(op_code.tag_name))
		{
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" = '<") + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString(attr_s) + use("Runtime.rtl").toString(" />';")));
		}
		else
		{
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" = '<") + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString(attr_s) + use("Runtime.rtl").toString(">';")));
			var flag_value = false;
			if (op_code.tag_name == "textarea")
			{
				var _v0 = use("Runtime.lib");
				var model_attr = op_code.attrs.findItem(_v0.equalAttr("key", "@model"));
				if (model_attr != null)
				{
					var res = this.OpHtmlAttr(t, model_attr);
					t = res[0];
					var attr_value = res[1];
					var _v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
					if (model_attr instanceof _v0)
					{
						content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" .= ") + use("Runtime.rtl").toString(attr_value) + use("Runtime.rtl").toString(";")));
					}
					else
					{
						content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" .= static::escapeHtml(") + use("Runtime.rtl").toString(attr_value) + use("Runtime.rtl").toString(");")));
					}
					flag_value = true;
				}
			}
			if (!flag_value)
			{
				var _v0 = use("Runtime.rtl");
				var f = _v0.method(this.getCurrentClassName(), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(t, f, use("Runtime.Collection").create([op_code.items,var_name]));
				t = res[0];
				content += use("Runtime.rtl").toString(res[1]);
			}
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" .= '</") + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString(">';")));
		}
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").create([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(t,op_code,var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code.items.count() == 0)
		{
			return use("Runtime.Collection").create([t,""]);
		}
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(t);
			t = res[0];
			var var_name = "$" + use("Runtime.rtl").toString(res[1]);
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" = \"\";")));
		}
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			var item_value = "";
			var _v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			var _v1 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
			var _v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (item instanceof _v0)
			{
				item_value = t.expression.constructor.toString(item.value);
			}
			else if (item instanceof _v1)
			{
				var res = this.OpHtmlTag(t, item);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof _v2)
			{
				var _v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var _v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (item.kind == _v3.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = res[0];
					item_value = res[1];
				}
				else if (item.kind == _v4.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "static::json_encode(" + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(")");
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(t, item);
				t = res[0];
				item_value = res[1];
				item_value = "static::escapeHtml(" + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(")");
			}
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(" .= ") + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(";")));
		}
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").create([t,var_name]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPHtml);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPHtml = Bayrell.Lang.LangPHP.TranslatorPHPHtml;