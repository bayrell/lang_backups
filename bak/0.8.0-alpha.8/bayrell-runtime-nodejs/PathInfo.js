"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.PathInfo = function(__ctx)
{
};
Object.assign(Runtime.PathInfo.prototype,
{
	/**
	 * Returns string
	 */
	toString: function(__ctx)
	{
		return this.filepath;
	},
	_init: function(__ctx)
	{
		this.filepath = "";
		this.dirname = "";
		this.basename = "";
		this.extension = "";
		this.filename = "";
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.PathInfo"))
		{
			this.filepath = o.filepath;
			this.dirname = o.dirname;
			this.basename = o.basename;
			this.extension = o.extension;
			this.filename = o.filename;
		}
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "filepath")this.filepath = v;
		else if (k == "dirname")this.dirname = v;
		else if (k == "basename")this.basename = v;
		else if (k == "extension")this.extension = v;
		else if (k == "filename")this.filename = v;
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "filepath")return this.filepath;
		else if (k == "dirname")return this.dirname;
		else if (k == "basename")return this.basename;
		else if (k == "extension")return this.extension;
		else if (k == "filename")return this.filename;
	},
	getClassName: function(__ctx)
	{
		return "Runtime.PathInfo";
	},
});
Object.assign(Runtime.PathInfo,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.PathInfo";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.PathInfo",
			"name": "Runtime.PathInfo",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("filepath");
			a.push("dirname");
			a.push("basename");
			a.push("extension");
			a.push("filename");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	__implements__:
	[
		use("Runtime.Interfaces.StringInterface"),
	],
});use.add(Runtime.PathInfo);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.PathInfo = Runtime.PathInfo;