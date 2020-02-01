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
Bayrell.Lang.CoreTranslator = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Bayrell.Lang.CoreTranslator.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Bayrell.Lang.CoreTranslator.prototype.constructor = Bayrell.Lang.CoreTranslator;
Object.assign(Bayrell.Lang.CoreTranslator.prototype,
{
	/**
	 * Find save op code
	 */
	findSaveOpCode: function(ctx, op_code)
	{
		var __v0 = use("Runtime.lib");
		return this.save_op_codes.findItem(ctx, __v0.equalAttr(ctx, "op_code", op_code));
	},
	/**
	 * Increment indent level
	 */
	levelInc: function(ctx)
	{
		return this.copy(ctx, use("Runtime.Dict").from({"indent_level":this.indent_level + 1}));
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function(ctx)
	{
		return this.copy(ctx, use("Runtime.Dict").from({"indent_level":this.indent_level - 1}));
	},
	/**
	 * Output content with indent
	 */
	s: function(ctx, s, content)
	{
		if (content == undefined) content = null;
		if (s == "")
		{
			return "";
		}
		if (content === "")
		{
			return s;
		}
		var __v0 = use("Runtime.rs");
		return this.crlf + use("Runtime.rtl").toStr(__v0.str_repeat(ctx, this.indent, this.indent_level)) + use("Runtime.rtl").toStr(s);
	},
	/**
	 * Output content with opcode level
	 */
	o: function(ctx, s, opcode_level_in, opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out)
		{
			return "(" + use("Runtime.rtl").toStr(s) + use("Runtime.rtl").toStr(")");
		}
		return s;
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__current_namespace_name = "";
		if (a.indexOf("current_namespace_name") == -1) defProp(this, "current_namespace_name");
		this.__current_class_name = "";
		if (a.indexOf("current_class_name") == -1) defProp(this, "current_class_name");
		this.__current_class_full_name = "";
		if (a.indexOf("current_class_full_name") == -1) defProp(this, "current_class_full_name");
		this.__current_class_extends_name = "";
		if (a.indexOf("current_class_extends_name") == -1) defProp(this, "current_class_extends_name");
		this.__current_function = null;
		if (a.indexOf("current_function") == -1) defProp(this, "current_function");
		this.__modules = null;
		if (a.indexOf("modules") == -1) defProp(this, "modules");
		this.__vars = null;
		if (a.indexOf("vars") == -1) defProp(this, "vars");
		this.__save_vars = null;
		if (a.indexOf("save_vars") == -1) defProp(this, "save_vars");
		this.__save_op_codes = null;
		if (a.indexOf("save_op_codes") == -1) defProp(this, "save_op_codes");
		this.__save_op_code_inc = 0;
		if (a.indexOf("save_op_code_inc") == -1) defProp(this, "save_op_code_inc");
		this.__is_static_function = false;
		if (a.indexOf("is_static_function") == -1) defProp(this, "is_static_function");
		this.__is_operation = false;
		if (a.indexOf("is_operation") == -1) defProp(this, "is_operation");
		this.__opcode_level = 0;
		if (a.indexOf("opcode_level") == -1) defProp(this, "opcode_level");
		this.__indent_level = 0;
		if (a.indexOf("indent_level") == -1) defProp(this, "indent_level");
		this.__indent = "\t";
		if (a.indexOf("indent") == -1) defProp(this, "indent");
		this.__crlf = "\n";
		if (a.indexOf("crlf") == -1) defProp(this, "crlf");
		this.__flag_struct_check_types = false;
		if (a.indexOf("flag_struct_check_types") == -1) defProp(this, "flag_struct_check_types");
		this.__preprocessor_flags = null;
		if (a.indexOf("preprocessor_flags") == -1) defProp(this, "preprocessor_flags");
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Bayrell.Lang.CoreTranslator"))
		{
			this.__current_namespace_name = o.__current_namespace_name;
			this.__current_class_name = o.__current_class_name;
			this.__current_class_full_name = o.__current_class_full_name;
			this.__current_class_extends_name = o.__current_class_extends_name;
			this.__current_function = o.__current_function;
			this.__modules = o.__modules;
			this.__vars = o.__vars;
			this.__save_vars = o.__save_vars;
			this.__save_op_codes = o.__save_op_codes;
			this.__save_op_code_inc = o.__save_op_code_inc;
			this.__is_static_function = o.__is_static_function;
			this.__is_operation = o.__is_operation;
			this.__opcode_level = o.__opcode_level;
			this.__indent_level = o.__indent_level;
			this.__indent = o.__indent;
			this.__crlf = o.__crlf;
			this.__flag_struct_check_types = o.__flag_struct_check_types;
			this.__preprocessor_flags = o.__preprocessor_flags;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "current_namespace_name")this.__current_namespace_name = v;
		else if (k == "current_class_name")this.__current_class_name = v;
		else if (k == "current_class_full_name")this.__current_class_full_name = v;
		else if (k == "current_class_extends_name")this.__current_class_extends_name = v;
		else if (k == "current_function")this.__current_function = v;
		else if (k == "modules")this.__modules = v;
		else if (k == "vars")this.__vars = v;
		else if (k == "save_vars")this.__save_vars = v;
		else if (k == "save_op_codes")this.__save_op_codes = v;
		else if (k == "save_op_code_inc")this.__save_op_code_inc = v;
		else if (k == "is_static_function")this.__is_static_function = v;
		else if (k == "is_operation")this.__is_operation = v;
		else if (k == "opcode_level")this.__opcode_level = v;
		else if (k == "indent_level")this.__indent_level = v;
		else if (k == "indent")this.__indent = v;
		else if (k == "crlf")this.__crlf = v;
		else if (k == "flag_struct_check_types")this.__flag_struct_check_types = v;
		else if (k == "preprocessor_flags")this.__preprocessor_flags = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "current_namespace_name")return this.__current_namespace_name;
		else if (k == "current_class_name")return this.__current_class_name;
		else if (k == "current_class_full_name")return this.__current_class_full_name;
		else if (k == "current_class_extends_name")return this.__current_class_extends_name;
		else if (k == "current_function")return this.__current_function;
		else if (k == "modules")return this.__modules;
		else if (k == "vars")return this.__vars;
		else if (k == "save_vars")return this.__save_vars;
		else if (k == "save_op_codes")return this.__save_op_codes;
		else if (k == "save_op_code_inc")return this.__save_op_code_inc;
		else if (k == "is_static_function")return this.__is_static_function;
		else if (k == "is_operation")return this.__is_operation;
		else if (k == "opcode_level")return this.__opcode_level;
		else if (k == "indent_level")return this.__indent_level;
		else if (k == "indent")return this.__indent;
		else if (k == "crlf")return this.__crlf;
		else if (k == "flag_struct_check_types")return this.__flag_struct_check_types;
		else if (k == "preprocessor_flags")return this.__preprocessor_flags;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Bayrell.Lang.CoreTranslator";
	},
});
Object.assign(Bayrell.Lang.CoreTranslator, use("Runtime.CoreStruct"));
Object.assign(Bayrell.Lang.CoreTranslator,
{
	/**
	 * Translate BaseOpCode
	 */
	translate: function(ctx, t, op_code)
	{
		return "";
	},
	/**
	 * Inc save op code
	 */
	nextSaveOpCode: function(ctx, t)
	{
		return "__v" + use("Runtime.rtl").toStr(t.save_op_code_inc);
	},
	/**
	 * Inc save op code
	 */
	incSaveOpCode: function(ctx, t)
	{
		var var_name = this.nextSaveOpCode(ctx, t);
		var save_op_code_inc = t.save_op_code_inc + 1;
		t = t.copy(ctx, use("Runtime.Dict").from({"save_op_code_inc":save_op_code_inc}));
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Add save op code
	 */
	addSaveOpCode: function(ctx, t, data)
	{
		var var_name = data.get(ctx, "var_name", "");
		var content = data.get(ctx, "content", "");
		var var_content = data.get(ctx, "var_content", "");
		var save_op_code_inc = t.save_op_code_inc;
		if (var_name == "")
		{
			var_name = this.nextSaveOpCode(ctx, t);
			save_op_code_inc += 1;
		}
		data = data.setIm(ctx, "var_name", var_name);
		var __v0 = use("Bayrell.Lang.SaveOpCode");
		var s = new __v0(ctx, data);
		t = t.copy(ctx, use("Runtime.Dict").from({"save_op_codes":t.save_op_codes.pushIm(ctx, s),"save_op_code_inc":save_op_code_inc}));
		return use("Runtime.Collection").from([t,var_name]);
	},
	/**
	 * Clear save op code
	 */
	clearSaveOpCode: function(ctx, t)
	{
		var __v0 = use("Runtime.Collection");
		t = t.copy(ctx, { "save_op_codes": new __v0(ctx) });
		t = t.copy(ctx, { "save_op_code_inc": 0 });
		return t;
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(ctx, t, save_op_code_value)
	{
		if (save_op_code_value == undefined) save_op_code_value = 0;
		var content = "";
		for (var i = 0;i < t.save_op_codes.count(ctx);i++)
		{
			if (i < save_op_code_value)
			{
				continue;
			}
			var save = t.save_op_codes.item(ctx, i);
			var s = (save.content == "") ? t.s(ctx, "var " + use("Runtime.rtl").toStr(save.var_name) + use("Runtime.rtl").toStr(" = ") + use("Runtime.rtl").toStr(save.var_content) + use("Runtime.rtl").toStr(";")) : save.content;
			content += use("Runtime.rtl").toStr(s);
		}
		return content;
	},
	/**
	 * Call f and return result with save op codes
	 */
	saveOpCodeCall: function(ctx, t, f, args)
	{
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var __v0 = use("Runtime.rtl");
		var res = __v0.apply(ctx, f, args.unshiftIm(ctx, t));
		t = res[0];
		var value = res[1];
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(ctx, t, save_op_codes.count(ctx));
		/* Restore save op codes */
		t = t.copy(ctx, { "save_op_codes": save_op_codes });
		t = t.copy(ctx, { "save_op_code_inc": save_op_code_inc });
		return use("Runtime.Collection").from([t,save,value]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.CoreTranslator";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": "Bayrell.Lang.CoreTranslator",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("current_namespace_name");
			a.push("current_class_name");
			a.push("current_class_full_name");
			a.push("current_class_extends_name");
			a.push("current_function");
			a.push("modules");
			a.push("vars");
			a.push("save_vars");
			a.push("save_op_codes");
			a.push("save_op_code_inc");
			a.push("is_static_function");
			a.push("is_operation");
			a.push("opcode_level");
			a.push("indent_level");
			a.push("indent");
			a.push("crlf");
			a.push("flag_struct_check_types");
			a.push("preprocessor_flags");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "current_namespace_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_full_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_class_extends_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "current_function") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_vars") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_codes") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "save_op_code_inc") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_static_function") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "is_operation") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "opcode_level") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent_level") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "indent") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "crlf") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "flag_struct_check_types") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "preprocessor_flags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Bayrell.Lang.CoreTranslator",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
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
});use.add(Bayrell.Lang.CoreTranslator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.CoreTranslator = Bayrell.Lang.CoreTranslator;