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
if (typeof Bayrell.Lang.LangES6 == 'undefined') Bayrell.Lang.LangES6 = {};
Bayrell.Lang.LangES6.TranslatorES6Html = function(/*__ctx*/)
{
};
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html.prototype,
{
	assignObject: function(o)
	{
		if (o instanceof use("Bayrell.Lang.LangES6.TranslatorES6Html"))
		{
		}
	},
	assignValue: function(k,v)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
	},
});
Object.assign(Bayrell.Lang.LangES6.TranslatorES6Html,
{
	/**
	 * Is component
	 */
	isComponent: function(tag_name)
	{
		var __v0 = use("Runtime.rs");
		var ch1 = __v0.substr(tag_name, 0, 1);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.strtoupper(ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Translator html template
	 */
	OpHtmlAttrs: function(t, attrs)
	{
		var attr_s = "null";
		var attrs = attrs.map((attr) => 
		{
			var attr_key = attr.key;
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(attr_key, 0, 1);
			var __v0 = use("Bayrell.Lang.OpCodes.OpString");
			if (attr_key == "@class" && attr.value instanceof __v0)
			{
				return "\"class\":" + use("Runtime.rtl").toString("this.getCssName(") + use("Runtime.rtl").toString(t.expression.constructor.toString(attr.value.value)) + use("Runtime.rtl").toString(")");
			}
			var __v0 = use("Runtime.rs");
			if (__v0.substr(attr_key, 0, 7) == "@event:")
			{
				var __v1 = use("Runtime.rs");
				var event_name = __v1.substr(attr_key, 7);
				event_name = t.expression.constructor.findModuleName(t, event_name);
				attr_key = "@event:" + use("Runtime.rtl").toString(event_name);
			}
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (attr.value instanceof __v0)
			{
				var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (attr.value.kind == __v1.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(t, attr.value.value);
					t = res[0];
					return t.expression.constructor.toString(attr_key) + use("Runtime.rtl").toString(":") + use("Runtime.rtl").toString(res[1]);
				}
				else if (attr.value.kind == __v2.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(t, attr.value.value);
					t = res[0];
					var value = res[1];
					value = "static::json_encode(" + use("Runtime.rtl").toString(value) + use("Runtime.rtl").toString(")");
					return t.expression.constructor.toString(attr_key) + use("Runtime.rtl").toString(":") + use("Runtime.rtl").toString(value);
				}
			}
			var res = t.expression.constructor.Expression(t, attr.value);
			t = res[0];
			var value = res[1];
			return t.expression.constructor.toString(attr_key) + use("Runtime.rtl").toString(":") + use("Runtime.rtl").toString(res[1]);
		});
		attrs = attrs.filter((s) => 
		{
			return s != "";
		});
		if (attrs.count() > 0)
		{
			var __v0 = use("Runtime.rs");
			attr_s = "{" + use("Runtime.rtl").toString(__v0.join(",", attrs)) + use("Runtime.rtl").toString("}");
		}
		return use("Runtime.Collection").create([t,attr_s]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(t, op_code, item_pos)
	{
		var is_component = this.isComponent(op_code.tag_name);
		var content = "";
		if (is_component)
		{
			content = t.s("/* Component '" + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString("' */"));
		}
		else
		{
			content = t.s("/* Element '" + use("Runtime.rtl").toString(op_code.tag_name) + use("Runtime.rtl").toString("' */"));
		}
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = res[1];
		var tag_name = t.expression.constructor.toString(op_code.tag_name);
		var res = this.OpHtmlAttrs(t, op_code.attrs);
		t = res[0];
		var attrs = res[1];
		var var_name_content = var_name + use("Runtime.rtl").toString("_content");
		if (op_code.items != null && op_code.items.items.count() > 0)
		{
			content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(var_name_content) + use("Runtime.rtl").toString(" = (control) =>")));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(this.getCurrentClassName(), "OpHtmlItems");
			var res = t.constructor.saveOpCodeCall(t, f, use("Runtime.Collection").create([op_code.items]));
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
			content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(res[2]) + use("Runtime.rtl").toString(";")));
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("};"));
		}
		else
		{
			var_name_content = "null";
		}
		if (is_component)
		{
			if (op_code.op_code_name)
			{
				var res = t.expression.constructor.Expression(t, op_code.op_code_name);
				t = res[0];
				tag_name = res[1];
			}
			content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_elem = Runtime.UI.Drivers.RenderDriver.component(") + use("Runtime.rtl").toString("layout,") + use("Runtime.rtl").toString(tag_name) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(attrs) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(var_name_content) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString("control,") + use("Runtime.rtl").toString(item_pos) + use("Runtime.rtl").toString(");")));
		}
		else
		{
			content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString("_elem = Runtime.UI.Drivers.RenderDriver.elem(") + use("Runtime.rtl").toString("layout,") + use("Runtime.rtl").toString(tag_name) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(attrs) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString(var_name_content) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString("control,") + use("Runtime.rtl").toString(item_pos) + use("Runtime.rtl").toString(");")));
		}
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").create([t,var_name + use("Runtime.rtl").toString("_elem")]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(t, op_code)
	{
		if (op_code.items.count() == 0)
		{
			return use("Runtime.Collection").create([t,""]);
		}
		var res = t.constructor.incSaveOpCode(t);
		t = res[0];
		var var_name = res[1];
		var content = t.s("/* Items */");
		content += use("Runtime.rtl").toString(t.s("var " + use("Runtime.rtl").toString(var_name) + use("Runtime.rtl").toString(" = [];")));
		for (var i = 0;i < op_code.items.count();i++)
		{
			var item = op_code.items.item(i);
			var item_value = "";
			var is_text = false;
			var is_raw = false;
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (item instanceof __v0)
			{
				item_value = t.expression.constructor.toString(item.value);
				is_text = true;
			}
			else if (item instanceof __v1)
			{
				var res = this.OpHtmlTag(t, item, i);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof __v2)
			{
				var __v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (item.kind == __v3.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = res[0];
					item_value = res[1];
					is_raw = true;
				}
				else if (item.kind == __v4.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "this.json_encode(" + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(")");
					is_text = true;
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(t, item);
				t = res[0];
				item_value = res[1];
				is_text = true;
			}
			if (item_value == "")
			{
				continue;
			}
			if (is_text)
			{
				item_value = "Runtime.UI.Drivers.RenderDriver.text(" + use("Runtime.rtl").toString("layout,") + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString("control,") + use("Runtime.rtl").toString(i) + use("Runtime.rtl").toString(")");
			}
			else if (is_raw)
			{
				item_value = "Runtime.UI.Drivers.RenderDriver.raw(" + use("Runtime.rtl").toString("layout,") + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(",") + use("Runtime.rtl").toString("control,") + use("Runtime.rtl").toString(i) + use("Runtime.rtl").toString(")");
			}
			content += use("Runtime.rtl").toString(t.s(var_name + use("Runtime.rtl").toString(".push(") + use("Runtime.rtl").toString(item_value) + use("Runtime.rtl").toString(");")));
		}
		var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").create([t,var_name]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangES6";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Html";
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
			"class_name": "Bayrell.Lang.LangES6.TranslatorES6Html",
			"name": "Bayrell.Lang.LangES6.TranslatorES6Html",
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
});use.add(Bayrell.Lang.LangES6.TranslatorES6Html);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangES6 == undefined) module.exports.Bayrell.Lang.LangES6 = {};
module.exports.Bayrell.Lang.LangES6.TranslatorES6Html = Bayrell.Lang.LangES6.TranslatorES6Html;