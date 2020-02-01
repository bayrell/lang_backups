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
Bayrell.Lang.CoreTranslator = function()
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
	findSaveOpCode: function(op_code)
	{
		var _v0 = use("Runtime.lib");
		return this.save_op_codes.findItem(_v0.equalAttr("op_code", op_code));
	},
	/**
	 * Increment indent level
	 */
	levelInc: function()
	{
		return this.copy(use("Runtime.Dict").create({"indent_level":this.indent_level + 1}));
	},
	/**
	 * Decrease indent level
	 */
	levelDec: function()
	{
		return this.copy(use("Runtime.Dict").create({"indent_level":this.indent_level - 1}));
	},
	/**
	 * Output content with indent
	 */
	s: function(s,content)
	{
		var _v0 = use("Runtime.rs");
		if (content == undefined) content = null;
		if (s == "")
		{
			return "";
		}
		if (content === "")
		{
			return s;
		}
		return this.crlf + use("Runtime.rtl").toString(_v0.str_repeat(this.indent, this.indent_level)) + use("Runtime.rtl").toString(s);
	},
	/**
	 * Output content with opcode level
	 */
	o: function(s,opcode_level_in,opcode_level_out)
	{
		if (opcode_level_in < opcode_level_out)
		{
			return "(" + use("Runtime.rtl").toString(s) + use("Runtime.rtl").toString(")");
		}
		return s;
	},
	_init: function()
	{
		var a = Object.getOwnPropertyNames(this);
		this.__current_namespace_name = "";
		if (a.indexOf("current_namespace_name") == -1)Object.defineProperty(this, "current_namespace_name",{get:function(){return this.__current_namespace_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_namespace_name");}});
		this.__current_class_name = "";
		if (a.indexOf("current_class_name") == -1)Object.defineProperty(this, "current_class_name",{get:function(){return this.__current_class_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class_name");}});
		this.__current_class_full_name = "";
		if (a.indexOf("current_class_full_name") == -1)Object.defineProperty(this, "current_class_full_name",{get:function(){return this.__current_class_full_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class_full_name");}});
		this.__current_class_extends_name = "";
		if (a.indexOf("current_class_extends_name") == -1)Object.defineProperty(this, "current_class_extends_name",{get:function(){return this.__current_class_extends_name;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_class_extends_name");}});
		this.__current_function = null;
		if (a.indexOf("current_function") == -1)Object.defineProperty(this, "current_function",{get:function(){return this.__current_function;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("current_function");}});
		this.__modules = null;
		if (a.indexOf("modules") == -1)Object.defineProperty(this, "modules",{get:function(){return this.__modules;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("modules");}});
		this.__vars = null;
		if (a.indexOf("vars") == -1)Object.defineProperty(this, "vars",{get:function(){return this.__vars;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("vars");}});
		this.__save_op_codes = null;
		if (a.indexOf("save_op_codes") == -1)Object.defineProperty(this, "save_op_codes",{get:function(){return this.__save_op_codes;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("save_op_codes");}});
		this.__save_op_code_inc = 0;
		if (a.indexOf("save_op_code_inc") == -1)Object.defineProperty(this, "save_op_code_inc",{get:function(){return this.__save_op_code_inc;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("save_op_code_inc");}});
		this.__is_static_function = false;
		if (a.indexOf("is_static_function") == -1)Object.defineProperty(this, "is_static_function",{get:function(){return this.__is_static_function;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("is_static_function");}});
		this.__is_operation = false;
		if (a.indexOf("is_operation") == -1)Object.defineProperty(this, "is_operation",{get:function(){return this.__is_operation;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("is_operation");}});
		this.__opcode_level = 0;
		if (a.indexOf("opcode_level") == -1)Object.defineProperty(this, "opcode_level",{get:function(){return this.__opcode_level;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("opcode_level");}});
		this.__indent_level = 0;
		if (a.indexOf("indent_level") == -1)Object.defineProperty(this, "indent_level",{get:function(){return this.__indent_level;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("indent_level");}});
		this.__indent = "\t";
		if (a.indexOf("indent") == -1)Object.defineProperty(this, "indent",{get:function(){return this.__indent;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("indent");}});
		this.__crlf = "\n";
		if (a.indexOf("crlf") == -1)Object.defineProperty(this, "crlf",{get:function(){return this.__crlf;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("crlf");}});
		this.__flag_struct_check_types = false;
		if (a.indexOf("flag_struct_check_types") == -1)Object.defineProperty(this, "flag_struct_check_types",{get:function(){return this.__flag_struct_check_types;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("flag_struct_check_types");}});
		this.__preprocessor_flags = null;
		if (a.indexOf("preprocessor_flags") == -1)Object.defineProperty(this, "preprocessor_flags",{get:function(){return this.__preprocessor_flags;},set:function(value){throw new Runtime.Exceptions.AssignStructValueError("preprocessor_flags");}});
		use("Runtime.CoreStruct").prototype._init.call(this);
	},
	assignObject: function(o)
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
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
	{
		if (k == "current_namespace_name")this.__current_namespace_name = v;
		else if (k == "current_class_name")this.__current_class_name = v;
		else if (k == "current_class_full_name")this.__current_class_full_name = v;
		else if (k == "current_class_extends_name")this.__current_class_extends_name = v;
		else if (k == "current_function")this.__current_function = v;
		else if (k == "modules")this.__modules = v;
		else if (k == "vars")this.__vars = v;
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
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "current_namespace_name")return this.__current_namespace_name;
		else if (k == "current_class_name")return this.__current_class_name;
		else if (k == "current_class_full_name")return this.__current_class_full_name;
		else if (k == "current_class_extends_name")return this.__current_class_extends_name;
		else if (k == "current_function")return this.__current_function;
		else if (k == "modules")return this.__modules;
		else if (k == "vars")return this.__vars;
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
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
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
	translate: function(t,op_code)
	{
		return "";
	},
	/**
	 * Add save op code
	 */
	addSaveOpCode: function(t,data)
	{
		var _v0 = use("Bayrell.Lang.SaveOpCode");
		var var_content = data.get("var_content", "");
		var s = t.save_op_codes.findItem((s) => 
		{
			return s.var_content == var_content;
		});
		if (s != null)
		{
			return use("Runtime.Collection").create([t,s.var_name]);
		}
		var var_name = "_v" + use("Runtime.rtl").toString(t.save_op_code_inc);
		data = data.setIm("var_name", var_name);
		s = new _v0(data);
		t = t.copy(use("Runtime.Dict").create({"save_op_codes":t.save_op_codes.pushIm(s),"save_op_code_inc":t.save_op_code_inc + 1}));
		return use("Runtime.Collection").create([t,var_name]);
	},
	/**
	 * Clear save op code
	 */
	clearSaveOpCode: function(t,data)
	{
		var _v0 = use("Runtime.Collection");
		t = t.copy({ "save_op_codes": new _v0() });
		t = t.copy({ "save_op_code_inc": 0 });
		return t;
	},
	/**
	 * Output save op code content
	 */
	outputSaveOpCode: function(t)
	{
		var content = "";
		for (var i = 0;i < t.save_op_codes.count();i++)
		{
			var save = t.save_op_codes.item(i);
			var s = "var " + use("Runtime.rtl").toString(save.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(save.var_content) + use("Runtime.rtl").toString(";");
			content += use("Runtime.rtl").toString((i == 0) ? s : t.s(s));
		}
		return content;
	},
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
	getFieldsList: function(f)
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
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Bayrell.Lang.CoreTranslator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
module.exports.Bayrell.Lang.CoreTranslator = Bayrell.Lang.CoreTranslator;