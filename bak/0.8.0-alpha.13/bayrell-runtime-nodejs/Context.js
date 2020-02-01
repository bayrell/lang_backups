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
Runtime.Context = function(ctx)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	config: function(items, d)
	{
		if (d == undefined) d = null;
		var __v0 = use("Runtime.rtl");
		return (this.settings != null) ? __v0.attr(this, this.settings, items, d) : null;
	},
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params string space - message space
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(message, space, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		return message;
	},
	/* ---------------------- Logs ---------------------- */
	/**
	 * Log message
	 * @param string message
	 * @param int loglevel
	 */
	log: function(message, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
		/*this.logs.push(message ~ "\n");*/
	},
	/**
	 * Dump var to log
	 * @param var v
	 * @param int loglevel
	 */
	dump: function(v, loglevel)
	{
		if (loglevel == undefined) loglevel = 0;
	},
	/**
	 * Append logs message
	 * @param Collection<string> logs
	 */
	logAppend: function(logs)
	{
		/*this.logs.appendVector(logs);*/
	},
	/**
	 * Return logs
	 */
	getLogs: function()
	{
		/*return this.logs.toCollection();*/
		return use("Runtime.Collection").from([]);
	},
	/* ---------------------- Tags ---------------------- */
	/**
	 * Set tag
	 */
	setTagIm: function(tag_name, value)
	{
		return this.copy(use("Runtime.Dict").from({"tags":this._tags.setIm(this, tag_name, value)}));
	},
	/**
	 * Returns tag
	 */
	getTag: function(tag_name)
	{
		return this._tags.get(this, tag_name, null);
	},
	/* ---------------------- Other --------------------- */
	/**
	 * Returns unix timestamp
	 */
	time: function()
	{
	},
	_init: function(ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__base_path = null;
		if (a.indexOf("base_path") == -1) defProp(this, "base_path");
		this.__env = null;
		if (a.indexOf("env") == -1) defProp(this, "env");
		this.__settings = null;
		if (a.indexOf("settings") == -1) defProp(this, "settings");
		this.__modules = null;
		if (a.indexOf("modules") == -1) defProp(this, "modules");
		this.__entities = null;
		if (a.indexOf("entities") == -1) defProp(this, "entities");
		this.__drivers = null;
		if (a.indexOf("drivers") == -1) defProp(this, "drivers");
		this.__providers = null;
		if (a.indexOf("providers") == -1) defProp(this, "providers");
		this.__tags = null;
		if (a.indexOf("tags") == -1) defProp(this, "tags");
		this.__initialized = false;
		if (a.indexOf("initialized") == -1) defProp(this, "initialized");
		this.__started = false;
		if (a.indexOf("started") == -1) defProp(this, "started");
		use("Runtime.CoreStruct").prototype._init.call(this,ctx);
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.__base_path = o.__base_path;
			this.__env = o.__env;
			this.__settings = o.__settings;
			this.__modules = o.__modules;
			this.__entities = o.__entities;
			this.__drivers = o.__drivers;
			this.__providers = o.__providers;
			this.__tags = o.__tags;
			this.__initialized = o.__initialized;
			this.__started = o.__started;
		}
		use("Runtime.CoreStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "base_path")this.__base_path = v;
		else if (k == "env")this.__env = v;
		else if (k == "settings")this.__settings = v;
		else if (k == "modules")this.__modules = v;
		else if (k == "entities")this.__entities = v;
		else if (k == "drivers")this.__drivers = v;
		else if (k == "providers")this.__providers = v;
		else if (k == "tags")this.__tags = v;
		else if (k == "initialized")this.__initialized = v;
		else if (k == "started")this.__started = v;
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.__base_path;
		else if (k == "env")return this.__env;
		else if (k == "settings")return this.__settings;
		else if (k == "modules")return this.__modules;
		else if (k == "entities")return this.__entities;
		else if (k == "drivers")return this.__drivers;
		else if (k == "providers")return this.__providers;
		else if (k == "tags")return this.__tags;
		else if (k == "initialized")return this.__initialized;
		else if (k == "started")return this.__started;
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Context";
	},
});
Object.assign(Runtime.Context, use("Runtime.CoreStruct"));
Object.assign(Runtime.Context,
{
	/**
	 * Returns app name
	 * @return string
	 */
	appName: function()
	{
		return "";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	getModules: function(env)
	{
		return null;
	},
	/**
	 * Extend entities
	 */
	getEntities: function(env)
	{
		return null;
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	getSettings: function(env)
	{
		return null;
	},
	/**
	 * Create context
	 *
	 * @params Dict env
	 * @params Collection<string> modules
	 * @params Dict settings
	 * @return Context
	 */
	create: function(env, modules, settings)
	{
		if (modules == undefined) modules = null;
		if (settings == undefined) settings = null;
		/* Get modules */
		if (modules == null)
		{
			var m = this.getModules(env);
			modules = (m != null) ? m.keys(null) : use("Runtime.Collection").from([]);
		}
		/* Get settings */
		if (settings == null)
		{
			settings = this.getSettings(env);
		}
		/* Extends modules */
		modules = this.getRequiredModules(modules);
		/* Get modules entities */
		var entities = this.getModulesEntities(modules);
		entities = entities.prependCollectionIm(null, this.getEntities(env));
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = __v0.attr(null, settings, use("Runtime.Collection").from(["base_path"]), "", "string");
		if (base_path == "")
		{
			var __v0 = use("Runtime.rtl");
			base_path = __v0.attr(null, env, use("Runtime.Collection").from(["BASE_PATH"]), "", "string");
		}
		/* Context data */
		var obj = use("Runtime.Dict").from({"env":env,"settings":settings,"modules":modules,"entities":entities,"base_path":base_path});
		/* Create context */
		var ctx = this.newInstance(null, obj);
		return ctx;
	},
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(null, filter);
		}
		for (var i = 0;i < modules.count(null);i++)
		{
			var module_name = modules.item(null, i);
			if (cache.get(null, module_name, false) == false)
			{
				cache.set(null, module_name, true);
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(null, module_name + use("Runtime.rtl").toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(null);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(null);
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.push(null, module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(modules)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(null);
		var __v0 = use("Runtime.Map");
		var cache = new __v0(null);
		this._getRequiredModules(res, cache, modules);
		res = res.removeDublicatesIm(null);
		return res.toCollection(null);
	},
	/**
	 * Returns modules entities
	 */
	getModulesEntities: function(modules)
	{
		var __v0 = use("Runtime.Vector");
		var entities = new __v0(null);
		for (var i = 0;i < modules.count(null);i++)
		{
			var module_class_name = modules.item(null, i) + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(null, module_class_name, "entities");
			var arr = f(null);
			entities.appendVector(null, arr);
		}
		return entities.toCollection(null);
	},
	/**
	 * Extend entities
	 */
	extendEntities: function(entities, ctx)
	{
		var e = entities.toVector(ctx);
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item1 = entities.item(ctx, i);
			var item1_class_name = item1.getClassName();
			if (item1_class_name == "Runtime.Annotations.Entity")
			{
				var class_name = (item1.value != "") ? item1.value : item1.name;
				var __v0 = use("Runtime.RuntimeUtils");
				var info = __v0.getClassIntrospection(ctx, class_name);
				if (info != null && info.class_info)
				{
					for (var j = 0;j < info.class_info.count(ctx);j++)
					{
						var item2 = info.class_info.item(ctx, j);
						var item2_class_name = item2.getClassName();
						var __v0 = use("Runtime.Annotations.Entity");
						if (item2 instanceof __v0 && item2_class_name != "Runtime.Annotations.Entity")
						{
							item2 = item2.copy(ctx, use("Runtime.Dict").from({"name":class_name}));
							e.push(ctx, item2);
						}
					}
				}
			}
		}
		return e.toCollection(ctx);
	},
	/**
	 * Init context
	 */
	init: function(ctx)
	{
		if (ctx.initialized)
		{
			return ctx;
		}
		var entities = ctx.entities;
		/* Extend entities */
		entities = this.extendEntities(entities, ctx);
		entities = this.chain("Runtime.Entities", use("Runtime.Collection").from([ctx,entities]), ctx);
		/* Get providers */
		var providers = this.getProvidersFromEntities(ctx);
		/* Register drivers */
		var drivers = this.getDriversFromEntities(ctx);
		return ctx.copy(ctx, use("Runtime.Dict").from({"entities":entities,"providers":providers,"drivers":drivers,"initialized":true}));
	},
	/**
	 * Start context
	 */
	start: function(ctx)
	{
		var drivers,i,driver_name,driver;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				if (ctx.started)
				{
					return __async_t.ret(ctx, ctx);
				}
				drivers = ctx.drivers.keys(ctx);
				return __async_t.jump(ctx, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos(ctx) == "1.0")
			{
				i = 0;
				return __async_t.jump(ctx, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos(ctx) == "1.1")
			{
				var __async_var = i < drivers.count(ctx);
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.2");
				}
				return __async_t.jump(ctx, "2");
			}
			/* Loop */
			else if (__async_t.pos(ctx) == "1.2")
			{
				i++;
				driver_name = drivers.item(ctx, i);
				driver = ctx.drivers.item(ctx, driver_name);
				return __async_t.jump(ctx, "1.3").call(ctx, driver.startDriver(ctx),"__v0");
			}
			else if (__async_t.pos(ctx) == "1.3")
			{
				return __async_t.jump(ctx, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos(ctx) == "2")
			{
				return __async_t.ret(ctx, ctx.copy(ctx, use("Runtime.Dict").from({"started":true})));
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Returns providers from entities
	 */
	getProvidersFromEntities: function(ctx)
	{
		var arr = ctx.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Provider");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var providers = new __v0(ctx);
		for (var i = 0;i < arr.count(ctx);i++)
		{
			var item = arr.item(ctx, i);
			providers.set(ctx, item.name, item);
		}
		return providers.toDict(ctx);
	},
	/**
	 * Register drivers
	 */
	getDriversFromEntities: function(ctx)
	{
		var arr = ctx.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.Driver");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var drivers = new __v0(ctx);
		for (var i = 0;i < arr.count(ctx);i++)
		{
			var item = arr.item(ctx, i);
			var driver_name = item.name;
			var class_name = item.value;
			if (class_name == "")
			{
				class_name = item.name;
			}
			var __v0 = use("Runtime.rtl");
			var driver = __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([]));
			driver = this.chain(class_name, use("Runtime.Collection").from([driver]), ctx);
			if (class_name != driver_name)
			{
				driver = this.chain(driver_name, use("Runtime.Collection").from([driver]), ctx);
			}
			drivers.set(ctx, item.name, driver);
		}
		return drivers.toDict(ctx);
	},
	/* ---------------------- Driver -------------------- */
	/**
	 * Get driver
	 *
	 * @params string driver_name
	 * @return Runtime.anager
	 */
	getDriver: function(driver_name, ctx)
	{
		if (ctx.drivers.has(ctx, driver_name))
		{
			return ctx.drivers.item(ctx, driver_name);
		}
		return null;
	},
	/* --------------------- Provider ------------------- */
	/**
	 * Create provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	createProvider: function(provider_name, params, settings_name, ctx)
	{
		var provider = null;
		if (ctx.providers.has(ctx, provider_name))
		{
			var info = ctx.providers.item(ctx, provider_name);
			if (info.kind == "interface")
			{
				var __v0 = use("Runtime.Exceptions.RuntimeException");
				throw new __v0(ctx, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" does not declared"))
			}
			var class_name = info.value;
			if (class_name == "")
			{
				class_name = info.name;
			}
			/* Set default params */
			if (params == null)
			{
				var __v0 = use("Runtime.rtl");
				params = __v0.attr(ctx, ctx.settings, use("Runtime.Collection").from(["providers",class_name,settings_name]));
			}
			if (params == null)
			{
				params = use("Runtime.Dict").from({});
			}
			var __v0 = use("Runtime.rtl");
			provider = __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([params]));
			provider = this.chain(class_name, use("Runtime.Collection").from([provider]), ctx);
			if (provider_name != class_name)
			{
				provider = this.chain(provider_name, use("Runtime.Collection").from([provider]), ctx);
			}
		}
		else
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0(ctx, "Provider " + use("Runtime.rtl").toStr(provider_name) + use("Runtime.rtl").toStr(" not found"))
		}
		return provider;
	},
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	getProvider: function(provider_name, settings_name, ctx)
	{
		var __memorize_value = use("Runtime.rtl")._memorizeValue("Runtime.Context.getProvider", arguments);
		if (__memorize_value != use("Runtime.rtl")._memorize_not_found) return __memorize_value;
		var provider = this.createProvider(provider_name, null, settings_name, ctx);
		var __memorize_value = provider;
		use("Runtime.rtl")._memorizeSave("Runtime.Context.getProvider", arguments, __memorize_value);
		return __memorize_value;
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(chain_name, args, ctx)
	{
		var entities = ctx.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Annotations.LambdaChain");
			return item instanceof __v0 && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm(ctx, (a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				var res = this.chain(item_chain_name, args, ctx);
				args = args.setIm(ctx, args.count(ctx) - 1, res);
			}
			else
			{
				var __v0 = use("Runtime.rs");
				var arr = __v0.split(ctx, "::", item.value);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, class_name, method_name);
				var __v0 = use("Runtime.rtl");
				var res = __v0.apply(ctx, f, args);
				args = args.setIm(ctx, args.count(ctx) - 1, res);
			}
		}
		var res = args.last(ctx);
		return res;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAwait: function(chain_name, args, ctx)
	{
		var entities,i,item,item_chain_name,res,arr,class_name,method_name,f;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				entities = ctx.entities.filter(ctx, (ctx, item) => 
				{
					var __v0 = use("Runtime.Annotations.LambdaChain");
					return item instanceof __v0 && item.name == chain_name;
				});
				entities = entities.sortIm(ctx, (a, b) => 
				{
					return a.pos > b.pos;
				});
				return __async_t.jump(ctx, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos(ctx) == "1.0")
			{
				i = 0;
				return __async_t.jump(ctx, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos(ctx) == "1.1")
			{
				var __async_var = i < entities.count(ctx);
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.2");
				}
				return __async_t.jump(ctx, "2");
			}
			/* Loop */
			else if (__async_t.pos(ctx) == "1.2")
			{
				i++;
				item = entities.item(ctx, i);
				item_chain_name = item.chain;
				return __async_t.jump(ctx, "1.3.0");
			}
			/* Start if */
			else if (__async_t.pos(ctx) == "1.3.0")
			{
				var __async_var = item_chain_name != "";
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.3.1");
				}
				return __async_t.jump(ctx, "1.3.2");
			}
			/* If true */
			else if (__async_t.pos(ctx) == "1.3.1")
			{
				return __async_t.jump(ctx, "1.3.3").call(ctx, this.chainAwait(item_chain_name, args, ctx),"__v0");
			}
			else if (__async_t.pos(ctx) == "1.3.3")
			{
				res = __async_t.getVar(ctx, "__v0");
				args = args.setIm(ctx, args.count(ctx) - 1, res);
				return __async_t.jump(ctx, "1.4");
			}
			/* Next If */
			else if (__async_t.pos(ctx) == "1.3.2")
			{
				/* If false */
				var __v0 = use("Runtime.rs");
				arr = __v0.split(ctx, "::", item.value);
				class_name = arr.get(ctx, 0, "");
				method_name = arr.get(ctx, 1, "");
				var __v0 = use("Runtime.rtl");
				f = __v0.method(ctx, class_name, method_name);
				return __async_t.jump(ctx, "1.3.4.0");
			}
			/* Start if */
			else if (__async_t.pos(ctx) == "1.3.4.0")
			{
				var __async_var = item.is_async;
				if (__async_var)
				{
					return __async_t.jump(ctx, "1.3.4.1");
				}
				return __async_t.jump(ctx, "1.3.4.2");
			}
			/* If true */
			else if (__async_t.pos(ctx) == "1.3.4.1")
			{
				var __v0 = use("Runtime.rtl");
				return __async_t.jump(ctx, "1.3.4.3").call(ctx, __v0.apply(ctx, f, args),"__v1");
			}
			else if (__async_t.pos(ctx) == "1.3.4.3")
			{
				res = __async_t.getVar(ctx, "__v1");
				args = args.setIm(ctx, args.count(ctx) - 1, res);
				return __async_t.jump(ctx, "1.3.5");
			}
			/* Next If */
			else if (__async_t.pos(ctx) == "1.3.4.2")
			{
				/* If false */
				var __v0 = use("Runtime.rtl");
				res = __v0.apply(ctx, f, args);
				args = args.setIm(ctx, args.count(ctx) - 1, res);
				return __async_t.jump(ctx, "1.3.5");
			}
			/* End if */
			else if (__async_t.pos(ctx) == "1.3.5")
			{
				return __async_t.jump(ctx, "1.4");
			}
			/* End if */
			else if (__async_t.pos(ctx) == "1.4")
			{
				return __async_t.jump(ctx, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos(ctx) == "2")
			{
				res = args.last(ctx);
				return __async_t.ret(ctx, res);
			}
			return __async_t.ret_void(ctx);
		};
	},
	/* ----------------------- Bus ---------------------- */
	/**
	 * Send message
	 * @param Message msg
	 * @param Context ctx
	 * @return Message
	 */
	sendMessage: function(msg, ctx)
	{
		var provider;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				var __v0 = use("Runtime.RuntimeConstant");
				provider = this.getProvider(__v0.BUS_INTERFACE, "default", ctx);
				return __async_t.jump(ctx, "1").call(ctx, provider.constructor.sendMessage(provider, ctx, msg),"__v0");
			}
			else if (__async_t.pos(ctx) == "1")
			{
				msg = __async_t.getVar(ctx, "__v0");
				return __async_t.ret(ctx, msg);
			}
			return __async_t.ret_void(ctx);
		};
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Context";
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
			"class_name": "Runtime.Context",
			"name": "Runtime.Context",
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
			a.push("base_path");
			a.push("env");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("drivers");
			a.push("providers");
			a.push("tags");
			a.push("initialized");
			a.push("started");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		if (field_name == "base_path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "env") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "drivers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "providers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tags") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "started") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
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
});use.add(Runtime.Context);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Context = Runtime.Context;