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
Bayrell.Lang.LangPHP.TranslatorPHPHtml = function(ctx)
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml.prototype,
{
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.LangPHP.TranslatorPHPHtml"))
		{
		}
	},
	assignValue: function(ctx,k,v)
	{
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPHtml";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPHtml,
{
	/**
	 * Is component
	 */
	isComponent: function(ctx, tag_name)
	{
		var __v0 = use("Runtime.rs");
		var ch1 = __v0.substr(ctx, tag_name, 0, 1);
		var __v0 = use("Runtime.rs");
		var ch2 = __v0.strtoupper(ctx, ch1);
		return ch1 == "{" || ch1 == ch2;
	},
	/**
	 * Is single tag
	 */
	isSingleTag: function(ctx, tag_name)
	{
		var tokens = use("Runtime.Collection").from(["img","meta","input","link","br"]);
		if (tokens.indexOf(ctx, tag_name) == -1)
		{
			return false;
		}
		return true;
	},
	/**
	 * Translator html attr
	 */
	OpHtmlAttr: function(ctx, t, attr)
	{
		var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
		if (attr.value instanceof __v0)
		{
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (attr.value.kind == __v1.KIND_RAW)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = res[0];
				return use("Runtime.Collection").from([t,res[1]]);
			}
			else if (attr.value.kind == __v2.KIND_JSON)
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value.value);
				t = res[0];
				var value = res[1];
				value = "\\Runtime\\Web\\UI\\RenderHelper::json_encode($ctx, " + use("Runtime.rtl").toStr(value) + use("Runtime.rtl").toStr(")");
				return use("Runtime.Collection").from([t,value]);
			}
		}
		var res = t.expression.constructor.Expression(ctx, t, attr.value);
		t = res[0];
		var value = res[1];
		return use("Runtime.Collection").from([t,value]);
	},
	/**
	 * Translator html component
	 */
	OpHtmlComponent: function(ctx, t, op_code)
	{
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var content = "";
		var v_model = "null";
		var tag_name = op_code.tag_name;
		var module_name = "";
		if (op_code.op_code_name)
		{
			var res = t.expression.constructor.Expression(ctx, t, op_code.op_code_name);
			t = res[0];
			module_name = res[1];
		}
		else
		{
			module_name = t.expression.constructor.toString(ctx, t.expression.constructor.findModuleName(ctx, t, op_code.tag_name));
		}
		var __v0 = use("Runtime.lib");
		var model = op_code.attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@model"));
		if (model)
		{
			var res = t.expression.constructor.Expression(ctx, t, model.value);
			t = res[0];
			v_model = res[1];
		}
		else
		{
			var __v0 = use("Runtime.lib");
			var bind = op_code.attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@bind"));
			if (bind)
			{
				var res = t.expression.constructor.Expression(ctx, t, bind.value);
				t = res[0];
				v_model = "$model[" + use("Runtime.rtl").toStr(res[1]) + use("Runtime.rtl").toStr("]");
			}
		}
		content += use("Runtime.rtl").toStr(t.s(ctx, "/* Component '" + use("Runtime.rtl").toStr(tag_name) + use("Runtime.rtl").toStr("' */")));
		content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_params = [];")));
		for (var i = 0;i < op_code.attrs.count(ctx);i++)
		{
			var attr = op_code.attrs.item(ctx, i);
			if (attr.key == "@bind")
			{
				continue;
			}
			if (attr.key == "@model")
			{
				continue;
			}
			var res = this.OpHtmlAttr(ctx, t, attr);
			t = res[0];
			var attr_value = res[1];
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_params[") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, attr.key)) + use("Runtime.rtl").toStr("] = ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(";")));
		}
		content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_content = \"\";")));
		var __v0 = use("Runtime.rtl");
		var f = __v0.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
		var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items,var_name + use("Runtime.rtl").toStr("_content")]));
		t = res[0];
		content += use("Runtime.rtl").toStr(res[1]);
		/*content ~= t.s(var_name~"_content .= " ~ res[2] ~ ";");*/
		if (op_code.op_code_name)
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toStr(module_name) + use("Runtime.rtl").toStr(");")));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_name::render($ctx, $layout,") + use("Runtime.rtl").toStr(v_model) + use("Runtime.rtl").toStr(",\\Runtime\\Dict::from(") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params),") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_content,$control);")));
		}
		else
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr("_name = \\Runtime\\rtl::find_class(") + use("Runtime.rtl").toStr(module_name) + use("Runtime.rtl").toStr(");")));
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_name::render($ctx, $layout,") + use("Runtime.rtl").toStr(v_model) + use("Runtime.rtl").toStr(",\\Runtime\\Dict::from(") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_params),") + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr("_content,$control);")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Translator html template
	 */
	OpHtmlTag: function(ctx, t, op_code)
	{
		if (this.isComponent(ctx, op_code.tag_name))
		{
			return this.OpHtmlComponent(ctx, t, op_code);
		}
		var res = t.constructor.incSaveOpCode(ctx, t);
		t = res[0];
		var var_name = res[1];
		var attr_s = "";
		var attrs = op_code.attrs.map(ctx, (ctx, attr) => 
		{
			var attr_value = "";
			var key = attr.key;
			var __v0 = use("Bayrell.Lang.OpCodes.OpString");
			if (key == "@class" && attr.value instanceof __v0)
			{
				return "class=" + use("Runtime.rtl").toStr("\"'.static::getCssName($ctx, ") + use("Runtime.rtl").toStr(t.expression.constructor.toString(ctx, attr.value.value)) + use("Runtime.rtl").toStr(").'\"");
			}
			if (key == "@model" && op_code.tag_name == "input")
			{
				key = "value";
			}
			if (key == "@bind" && op_code.tag_name == "input")
			{
				var res = t.expression.constructor.Expression(ctx, t, attr.value);
				t = res[0];
				attr_value = "$model[" + use("Runtime.rtl").toStr(res[1]) + use("Runtime.rtl").toStr("]");
				key = "value";
			}
			var __v0 = use("Runtime.rs");
			var ch = __v0.substr(ctx, key, 0, 1);
			if (ch == "@")
			{
				return "";
			}
			if (attr_value == "")
			{
				var res = this.OpHtmlAttr(ctx, t, attr);
				t = res[0];
				attr_value = res[1];
			}
			return key + use("Runtime.rtl").toStr("=\"'.\\Runtime\\Web\\UI\\RenderHelper::escapeAttr($ctx, ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(").'\"");
		});
		attrs = attrs.filter(ctx, (ctx, s) => 
		{
			return s != "";
		});
		if (attrs.count(ctx) > 0)
		{
			var __v0 = use("Runtime.rs");
			attr_s = " " + use("Runtime.rtl").toStr(__v0.join(ctx, " ", attrs));
		}
		var content = "/* Element '" + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr("' */");
		if (this.isSingleTag(ctx, op_code.tag_name))
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = '<") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(attr_s) + use("Runtime.rtl").toStr(" />';")));
		}
		else
		{
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = '<") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(attr_s) + use("Runtime.rtl").toStr(">';")));
			var flag_value = false;
			if (op_code.tag_name == "textarea")
			{
				var __v0 = use("Runtime.lib");
				var model_attr = op_code.attrs.findItem(ctx, __v0.equalAttr(ctx, "key", "@model"));
				if (model_attr != null)
				{
					var res = this.OpHtmlAttr(ctx, t, model_attr);
					t = res[0];
					var attr_value = res[1];
					var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
					if (model_attr instanceof __v0)
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" .= ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(";")));
					}
					else
					{
						content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" .= \\Runtime\\Web\\UI\\RenderHelper::escapeHtml($ctx, ") + use("Runtime.rtl").toStr(attr_value) + use("Runtime.rtl").toStr(");")));
					}
					flag_value = true;
				}
			}
			if (!flag_value)
			{
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, this.getCurrentClassName(ctx), "OpHtmlItems");
				var res = t.constructor.saveOpCodeCall(ctx, t, f, use("Runtime.Collection").from([op_code.items,var_name]));
				t = res[0];
				content += use("Runtime.rtl").toStr(res[1]);
			}
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" .= '</") + use("Runtime.rtl").toStr(op_code.tag_name) + use("Runtime.rtl").toStr(">';")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Translator html items
	 */
	OpHtmlItems: function(ctx, t, op_code, var_name)
	{
		if (var_name == undefined) var_name = "";
		if (op_code.items.count(ctx) == 0)
		{
			return use("Runtime.Collection").from([t,""]);
		}
		var content = "";
		if (var_name == "")
		{
			var res = t.constructor.incSaveOpCode(ctx, t);
			t = res[0];
			var var_name = res[1];
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" = \"\";")));
		}
		for (var i = 0;i < op_code.items.count(ctx);i++)
		{
			var item = op_code.items.item(ctx, i);
			var item_value = "";
			var __v0 = use("Bayrell.Lang.OpCodes.OpHtmlContent");
			var __v1 = use("Bayrell.Lang.OpCodes.OpHtmlTag");
			var __v2 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
			if (item instanceof __v0)
			{
				item_value = t.expression.constructor.toString(ctx, item.value);
			}
			else if (item instanceof __v1)
			{
				var res = this.OpHtmlTag(ctx, t, item);
				t = res[0];
				item_value = res[1];
			}
			else if (item instanceof __v2)
			{
				var __v3 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v4 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				var __v5 = use("Bayrell.Lang.OpCodes.OpHtmlValue");
				if (item.kind == __v3.KIND_RAW)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
				}
				else if (item.kind == __v4.KIND_HTML)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "\\Runtime\\Web\\UI\\RenderHelper::toHtml($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
				}
				else if (item.kind == __v5.KIND_JSON)
				{
					var res = t.expression.constructor.Expression(ctx, t, item.value);
					t = res[0];
					item_value = res[1];
					item_value = "\\Runtime\\Web\\UI\\RenderHelper::json_encode($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
				}
			}
			else
			{
				var res = t.expression.constructor.Expression(ctx, t, item);
				t = res[0];
				item_value = res[1];
				item_value = "\\Runtime\\Web\\UI\\RenderHelper::escapeHtml($ctx, " + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(")");
			}
			content += use("Runtime.rtl").toStr(t.s(ctx, var_name + use("Runtime.rtl").toStr(" .= ") + use("Runtime.rtl").toStr(item_value) + use("Runtime.rtl").toStr(";")));
		}
		var res = t.constructor.addSaveOpCode(ctx, t, use("Runtime.Dict").from({"op_code":op_code,"var_name":var_name,"content":content}));
		t = res[0];
		return use("Runtime.Collection").from([t,"new \\Runtime\\RawString(" + use("Runtime.rtl").toStr(var_name) + use("Runtime.rtl").toStr(")")]);
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
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPHtml",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPHtml);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPHtml = Bayrell.Lang.LangPHP.TranslatorPHPHtml;