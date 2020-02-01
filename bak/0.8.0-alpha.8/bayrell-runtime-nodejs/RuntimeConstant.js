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
Runtime.RuntimeConstant = function(__ctx)
{
};
Object.assign(Runtime.RuntimeConstant.prototype,
{
	assignObject: function(__ctx,o)
	{
		if (o instanceof use("Runtime.RuntimeConstant"))
		{
		}
	},
	assignValue: function(__ctx,k,v)
	{
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
	},
	getClassName: function(__ctx)
	{
		return "Runtime.RuntimeConstant";
	},
});
Object.assign(Runtime.RuntimeConstant,
{
	CHAIN_ENTITIES: "Runtime.Entities",
	LOCAL_BUS: "Runtime.Interfaces.LocalBusInterface",
	REMOTE_BUS: "Runtime.Interfaces.RemoteBusInterface",
	LOG_FATAL: 0,
	LOG_CRITICAL: 2,
	LOG_ERROR: 4,
	LOG_WARNING: 6,
	LOG_INFO: 8,
	LOG_DEBUG: 10,
	LOG_DEBUG2: 12,
	STATUS_PLAN: 0,
	STATUS_DONE: 1,
	STATUS_PROCESS: 100,
	STATUS_FAIL: -1,
	ERROR_NULL: 0,
	ERROR_OK: 1,
	ERROR_PROCCESS: 100,
	ERROR_FALSE: -100,
	ERROR_UNKNOWN: -1,
	ERROR_INDEX_OUT_OF_RANGE: -2,
	ERROR_KEY_NOT_FOUND: -3,
	ERROR_STOP_ITERATION: -4,
	ERROR_FILE_NOT_FOUND: -5,
	ERROR_OBJECT_DOES_NOT_EXISTS: -5,
	ERROR_OBJECT_ALLREADY_EXISTS: -6,
	ERROR_ASSERT: -7,
	ERROR_REQUEST: -8,
	ERROR_RESPONSE: -9,
	ERROR_CSRF_TOKEN: -10,
	ERROR_RUNTIME: -11,
	ERROR_VALIDATION: -12,
	ERROR_PARSE_SERIALIZATION_ERROR: -14,
	ERROR_ASSIGN_DATA_STRUCT_VALUE: -15,
	ERROR_AUTH: -16,
	ERROR_DUPLICATE: -17,
	ERROR_FATAL: -99,
	ERROR_HTTP_CONTINUE: -100,
	ERROR_HTTP_SWITCH: -101,
	ERROR_HTTP_PROCESSING: -102,
	ERROR_HTTP_OK: -200,
	ERROR_HTTP_BAD_GATEWAY: -502,
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.RuntimeConstant";
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
			"class_name": "Runtime.RuntimeConstant",
			"name": "Runtime.RuntimeConstant",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
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
});use.add(Runtime.RuntimeConstant);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.RuntimeConstant = Runtime.RuntimeConstant;