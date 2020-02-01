"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Interfaces == 'undefined') Runtime.Interfaces = {};
Runtime.Interfaces.LocalBusInterface = function()
{
};
Object.assign(Runtime.Interfaces.LocalBusInterface.prototype,
{
	getClassName: function()
	{
		return "Runtime.Interfaces.LocalBusInterface";
	},
});
Object.assign(Runtime.Interfaces.LocalBusInterface,
{
	/**
	 * Remote procedure call
	 */
	call: function(bus,context,api_name,space,method_name,data)
	{
	},
	/**
	 * Remote procedure call route
	 */
	callRoute: function(bus,context,url,data)
	{
	},
	getCurrentNamespace: function()
	{
		return "Runtime.Interfaces";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Interfaces.LocalBusInterface";
	},
	getParentClassName: function()
	{
		return "";
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
		var a = [];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
use.add(Runtime.Interfaces.LocalBusInterface);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
if (module.exports.Runtime.Interfaces == undefined) module.exports.Runtime.Interfaces = {};
module.exports.Runtime.Interfaces.LocalBusInterface = Runtime.Interfaces.LocalBusInterface;