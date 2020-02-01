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
if (typeof Bayrell.Lang.LangNode == 'undefined') Bayrell.Lang.LangNode = {};
Bayrell.Lang.LangNode.TranslatorNodeExpression = function()
{
	use("Bayrell.Lang.LangES6.TranslatorES6Expression").apply(this, arguments);
};
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype = Object.create(use("Bayrell.Lang.LangES6.TranslatorES6Expression").prototype);
Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype.constructor = Bayrell.Lang.LangNode.TranslatorNodeExpression;
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
});
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression, use("Bayrell.Lang.LangES6.TranslatorES6Expression"));
Object.assign(Bayrell.Lang.LangNode.TranslatorNodeExpression,
{
	/**
	 * Returns string
	 */
	rtlToStr: function(t,s)
	{
		return "use(\"Runtime.rtl\").toString(" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(")");
	},
	/**
	 * Use module name
	 */
	useModuleName: function(t,module_name)
	{
		module_name = this.findModuleName(t, module_name);
		return "use(" + use("Runtime.rtl").toString(this.toString(module_name)) + use("Runtime.rtl").toString(")");
	},
	/**
	 * OpIdentifier
	 */
	OpIdentifier: function(t,op_code)
	{
		var _v0 = use("Bayrell.Lang.OpCodes.OpIdentifier");
		if (t.modules.has(op_code.value) || op_code.kind == _v0.KIND_SYS_TYPE)
		{
			var module_name = op_code.value;
			var new_module_name = this.findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"op_code":op_code,"var_content":this.useModuleName(t, module_name)}));
				t = res[0];
				var var_name = res[1];
				return use("Runtime.Collection").create([t,var_name]);
			}
		}
		return use("Runtime.Collection").create([t,op_code.value]);
	},
	/**
	 * OpTypeIdentifier
	 */
	OpTypeIdentifier: function(t,op_code)
	{
		var var_name = "";
		if (op_code.entity_name.names.count() > 0)
		{
			var module_name = op_code.entity_name.names.first();
			var new_module_name = this.findModuleName(t, module_name);
			if (module_name != new_module_name)
			{
				var res = t.constructor.addSaveOpCode(t, use("Runtime.Dict").create({"var_content":this.useModuleName(t, module_name)}));
				t = res[0];
				var_name = res[1];
			}
		}
		if (var_name == "")
		{
			var _v0 = use("Runtime.rs");
			var_name = _v0.join(".", op_code.entity_name.names);
		}
		return use("Runtime.Collection").create([t,var_name]);
	},
	/**
	 * OpCollection
	 */
	OpCollection: function(t,op_code)
	{
		var content = "";
		var values = op_code.values.map((op_code) => 
		{
			var res = this.Expression(t, op_code);
			t = res[0];
			var s = res[1];
			return s;
		});
		var _v0 = use("Runtime.rs");
		content = this.useModuleName(t, "Runtime.Collection") + use("Runtime.rtl").toString(".create([") + use("Runtime.rtl").toString(_v0.join(",", values)) + use("Runtime.rtl").toString("])");
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDict
	 */
	OpDict: function(t,op_code)
	{
		var content = "";
		var values = op_code.values.transition((key,op_code) => 
		{
			var res = this.Expression(t, op_code);
			t = res[0];
			var s = res[1];
			return this.toString(key) + use("Runtime.rtl").toString(":") + use("Runtime.rtl").toString(s);
		});
		var _v0 = use("Runtime.rs");
		content = this.useModuleName(t, "Runtime.Dict") + use("Runtime.rtl").toString(".create({") + use("Runtime.rtl").toString(_v0.join(",", values)) + use("Runtime.rtl").toString("})");
		return use("Runtime.Collection").create([t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangNode";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangNode.TranslatorNodeExpression";
	},
	getParentClassName: function()
	{
		return "Bayrell.Lang.LangES6.TranslatorES6Expression";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
			"name": "Bayrell.Lang.LangNode.TranslatorNodeExpression",
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
});use.add(Bayrell.Lang.LangNode.TranslatorNodeExpression);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangNode == undefined) module.exports.Bayrell.Lang.LangNode = {};
module.exports.Bayrell.Lang.LangNode.TranslatorNodeExpression = Bayrell.Lang.LangNode.TranslatorNodeExpression;