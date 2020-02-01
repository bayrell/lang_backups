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
Runtime.ModuleDescription = function()
{
};
Object.assign(Runtime.ModuleDescription.prototype,
{
	getClassName: function()
	{
		return "Runtime.ModuleDescription";
	},
});
Object.assign(Runtime.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "Runtime";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.8.0-alpha.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return null;
	},
	/**
	 * Compatibility with older versions
	 */
	getRequiredModules: function()
	{
		return this.requiredModules();
	},
	/**
	 * Returns module files load order
	 * @return Collection<string>
	 */
	assets: function()
	{
		return use("Runtime.Collection").create(["Runtime/rtl","Runtime/rs","Runtime/re","Runtime/lib","Runtime/Collection","Runtime/Container","Runtime/CoreObject","Runtime/Dict","Runtime/Emitter","Runtime/RuntimeConstant","Runtime/RuntimeUtils","Runtime/Exceptions/RuntimeException","Runtime/Interfaces/CloneableInterface","Runtime/Interfaces/FactoryInterface","Runtime/Interfaces/LocalBusInterface","Runtime/Interfaces/ModuleDescriptionInterface","Runtime/Interfaces/RemoteBusInterface","Runtime/Interfaces/SerializeInterface","Runtime/Interfaces/StringInterface","Runtime/Interfaces/SubscribeInterface","Runtime/AsyncTask","Runtime/AsyncThread","Runtime/CoreStruct","Runtime/CoreProvider","Runtime/CoreEvent","Runtime/BusResult","Runtime/Map","Runtime/Message","Runtime/MessageRPC","Runtime/PathInfo","Runtime/ModuleDescription","Runtime/Reference","Runtime/Vector","Runtime/Exceptions/ApiException","Runtime/Exceptions/IndexOutOfRange","Runtime/Exceptions/KeyNotFound","Runtime/Exceptions/UnknownError","Runtime/DateTime","Runtime/Annotations/Entity","Runtime/Annotations/IntrospectionClass","Runtime/Annotations/IntrospectionInfo","Runtime/Annotations/LambdaChain","Runtime/Annotations/LambdaChainDeclare","Runtime/Annotations/Driver","Runtime/Annotations/Provider","Runtime/UIStruct","Runtime/Context","Runtime/ContextObject"]);
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		var _v0 = use("Runtime.Annotations.Provider");
		var _v1 = use("Runtime.Annotations.LambdaChainDeclare");
		return use("Runtime.Collection").create([new _v0(use("Runtime.Dict").create({"name":"Runtime.Interfaces.LocalBusInterface","kind":"interface"})),new _v0(use("Runtime.Dict").create({"name":"Runtime.Interfaces.RemoteBusInterface","kind":"interface"})),new _v1(use("Runtime.Dict").create({"name":"Runtime.Entities"}))]);
	},
	/**
	 * Returns enities
	 */
	resources: function()
	{
		return null;
	},
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.ModuleDescription";
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
	__implements__:
	[
		use("Runtime.Interfaces.ModuleDescriptionInterface"),
		use("Runtime.Interfaces.AssetsInterface"),
	],
});
use.add(Runtime.ModuleDescription);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.ModuleDescription = Runtime.ModuleDescription;