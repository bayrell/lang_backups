"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Core == 'undefined') Runtime.Core = {};
Runtime.Core.BusDriverInterface = function(ctx)
{
};
Object.assign(Runtime.Core.BusDriverInterface.prototype,
{
	/**
	 * Send message
	 * @return string
	 */
	sendMessage: async function(ctx, msg)
	{
	},
	/**
	 * Send message
	 * @return string
	 */
	remoteBusCall: async function(ctx, request)
	{
	},
	getClassName: function(ctx)
	{
		return "Runtime.Core.BusDriverInterface";
	},
});
Object.assign(Runtime.Core.BusDriverInterface,
{
	getCurrentNamespace: function()
	{
		return "Runtime.Core";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Core.BusDriverInterface";
	},
});use.add(Runtime.Core.BusDriverInterface);
module.exports = Runtime.Core.BusDriverInterface;