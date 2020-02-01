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
Runtime.Context = function(/*__ctx*/)
{
	use("Runtime.CoreStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.CoreStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Translate message
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		return message;
	},
	/* ----------------------- Bus ---------------------- */
	/**
	 * Local bus call
	 * @param string class_name
	 * @param string method_name
	 * @param ApiRequest request
	 * @return var The result of the api
	 */
	busCall: function(class_name, interface_name, method_name, data)
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				/*BusInterface provider = static::getProvider(this, "Runtime.Interfaces.LocalBusInterface");
		BusResult res = await provider::call(provider, this, class_name, interface_name, method_name, data);
		return res;*/
			}
			return __async_t.ret_void();
		};
	},
	/**
	 * Local bus call
	 * @param string class_name
	 * @param string method_name
	 * @param ApiRequest request
	 * @return var The result of the api
	 */
	busCallRoute: function(url, data)
	{
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				/*BusInterface provider = this.getProvider("Runtime.Interfaces.LocalBusInterface");
		BusResult res = await provider::callRoute(provider, this, url, data);
		return res;*/
			}
			return __async_t.ret_void();
		};
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
		return use("Runtime.Collection").create([]);
	},
	/* ---------------------- Tags ---------------------- */
	/**
	 * Set tag
	 */
	setTagIm: function(tag_name, value)
	{
		return this.copy(use("Runtime.Dict").create({"tags":this._tags.setIm(tag_name, value)}));
	},
	/**
	 * Returns tag
	 */
	getTag: function(tag_name)
	{
		return this._tags.get(tag_name, null);
	},
	/* ---------------------- Other --------------------- */
	/**
	 * Returns unix timestamp
	 */
	time: function()
	{
	},
	_init: function(/*__ctx*/)
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
		use("Runtime.CoreStruct").prototype._init.call(this/*,__ctx*/);
	},
	assignObject: function(o)
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
		use("Runtime.CoreStruct").prototype.assignObject.call(this,o);
	},
	assignValue: function(k,v)
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
		else use("Runtime.CoreStruct").prototype.assignValue.call(this,k,v);
	},
	takeValue: function(k,d)
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
		return use("Runtime.CoreStruct").prototype.takeValue.call(this,k,d);
	},
	getClassName: function()
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
			modules = (m != null) ? m.keys() : use("Runtime.Collection").create([]);
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
		entities = entities.prependCollectionIm(this.getEntities(env));
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = __v0.attr(settings, use("Runtime.Collection").create(["base_path"]), "", "string");
		if (base_path == "")
		{
			var __v0 = use("Runtime.rtl");
			base_path = __v0.attr(env, use("Runtime.Collection").create(["BASE_PATH"]), "", "string");
		}
		/* Context data */
		var obj = use("Runtime.Dict").create({"env":env,"settings":settings,"modules":modules,"entities":entities,"base_path":base_path});
		/* Create context */
		var context = this.newInstance(obj);
		return context;
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
			modules = modules.filter(filter);
		}
		for (var i = 0;i < modules.count();i++)
		{
			var module_name = modules.item(i);
			if (cache.get(module_name, false) == false)
			{
				cache.set(module_name, true);
				var __v0 = use("Runtime.rtl");
				var requiredModules = __v0.method(module_name + use("Runtime.rtl").toString(".ModuleDescription"), "requiredModules");
				var sub_modules = requiredModules();
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys();
					this._getRequiredModules(res, cache, sub_modules);
				}
				res.push(module_name);
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
		var res = new __v0();
		var __v0 = use("Runtime.Map");
		var cache = new __v0();
		this._getRequiredModules(res, cache, modules);
		res = res.removeDublicatesIm();
		return res.toCollection();
	},
	/**
	 * Returns modules entities
	 */
	getModulesEntities: function(modules)
	{
		var __v0 = use("Runtime.Vector");
		var entities = new __v0();
		for (var i = 0;i < modules.count();i++)
		{
			var module_class_name = modules.item(i) + use("Runtime.rtl").toString(".ModuleDescription");
			var __v0 = use("Runtime.rtl");
			var f = __v0.method(module_class_name, "entities");
			var arr = f();
			entities.appendVector(arr);
		}
		return entities.toCollection();
	},
	/**
	 * Extend entities
	 */
	extendEntities: function(entities)
	{
		var e = entities.toVector();
		for (var i = 0;i < entities.count();i++)
		{
			var item1 = entities.item(i);
			var item1_class_name = item1.getClassName();
			if (item1_class_name == "Runtime.Annotations.Entity")
			{
				var class_name = (item1.value != "") ? item1.value : item1.name;
				var __v0 = use("Runtime.RuntimeUtils");
				var info = __v0.getClassIntrospection(class_name);
				for (var j = 0;j < info.class_info.count();j++)
				{
					var item2 = info.class_info.item(j);
					var item2_class_name = item2.getClassName();
					var __v0 = use("Runtime.Annotations.Entity");
					if (item2 instanceof __v0 && item2_class_name != "Runtime.Annotations.Entity")
					{
						item2 = item2.copy({ "name": class_name });
						e.push(item2);
					}
				}
			}
		}
		return e.toCollection();
	},
	/**
	 * Init context
	 */
	init: function(context)
	{
		if (context.initialized)
		{
			return context;
		}
		var entities = context.entities;
		/* Extend entities */
		entities = this.extendEntities(entities);
		entities = this.chain(context, "Runtime.Entities", use("Runtime.Collection").create([context,entities]));
		/* Get providers */
		var providers = this.getProvidersFromEntities(context);
		/* Register drivers */
		var drivers = this.getDriversFromEntities(context);
		return context.copy(use("Runtime.Dict").create({"entities":entities,"providers":providers,"drivers":drivers,"initialized":true}));
	},
	/**
	 * Start context
	 */
	start: function(context)
	{
		var i,drivers,driver_name,driver;
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				if (context.started)
				{
					return __async_t.ret(__async_t, context);
				}
				drivers = context.drivers.keys();
				return __async_t.jump(__async_t, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos() == "1.0")
			{
				i = 0;
				return __async_t.jump(__async_t, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos() == "1.1")
			{
				var __async_var = i < drivers.count();
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.2");
				}
				return __async_t.jump(__async_t, "2");
			}
			/* Loop */
			else if (__async_t.pos() == "1.2")
			{
				i++;
				driver_name = drivers.item(i);
				driver = context.drivers.item(driver_name);
				return __async_t.jump(__async_t,"1.3").call(__async_t,driver.startDriver(),"__v0");
			}
			else if (__async_t.pos() == "1.3")
			{
				return __async_t.jump(__async_t, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos() == "2")
			{
				return __async_t.ret(__async_t, context.copy(use("Runtime.Dict").create({"started":true})));
			}
			return __async_t.ret_void();
		};
	},
	/**
	 * Returns providers from entities
	 */
	getProvidersFromEntities: function(context)
	{
		var arr = context.entities.filter((item) => 
		{
			var __v0 = use("Runtime.Annotations.Provider");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var providers = new __v0();
		for (var i = 0;i < arr.count();i++)
		{
			var item = arr.item(i);
			providers.set(item.name, item);
		}
		return providers.toDict();
	},
	/**
	 * Register drivers
	 */
	getDriversFromEntities: function(context)
	{
		var arr = context.entities.filter((item) => 
		{
			var __v0 = use("Runtime.Annotations.Driver");
			return item instanceof __v0;
		});
		var __v0 = use("Runtime.Map");
		var drivers = new __v0();
		for (var i = 0;i < arr.count();i++)
		{
			var item = arr.item(i);
			var driver_name = item.name;
			var class_name = item.value;
			if (class_name == "")
			{
				class_name = item.name;
			}
			var __v0 = use("Runtime.rtl");
			var driver = __v0.newInstance(class_name, use("Runtime.Collection").create([context]));
			driver = this.chain(context, class_name, use("Runtime.Collection").create([context,driver]));
			if (class_name != driver_name)
			{
				driver = this.chain(context, driver_name, use("Runtime.Collection").create([context,driver]));
			}
			drivers.set(item.name, driver);
		}
		return drivers.toDict();
	},
	/* ---------------------- Driver -------------------- */
	/**
	 * Get driver
	 *
	 * @params string driver_name
	 * @return Runtime.anager
	 */
	getDriver: function(context, driver_name)
	{
		if (context.drivers.has(driver_name))
		{
			return context.drivers.item(driver_name);
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
	createProvider: function(context, provider_name, params)
	{
		if (params == undefined) params = null;
		if (params == null)
		{
			params = use("Runtime.Dict").create({});
		}
		var provider = null;
		if (context.providers.has(provider_name))
		{
			var info = context.providers.item(provider_name);
			if (info.kind == "interface")
			{
				var __v0 = use("Runtime.Exceptions.RuntimeException");
				throw new __v0("Provider " + use("Runtime.rtl").toString(provider_name) + use("Runtime.rtl").toString(" does not declared"))
			}
			var class_name = info.value;
			if (class_name == "")
			{
				class_name = info.name;
			}
			var __v0 = use("Runtime.rtl");
			provider = __v0.newInstance(class_name, use("Runtime.Collection").create([params]));
			provider = this.chain(context, class_name, use("Runtime.Collection").create([context,provider]));
			if (provider_name != class_name)
			{
				provider = this.chain(context, provider_name, use("Runtime.Collection").create([context,provider]));
			}
		}
		else
		{
			var __v0 = use("Runtime.Exceptions.RuntimeException");
			throw new __v0("Provider " + use("Runtime.rtl").toString(provider_name) + use("Runtime.rtl").toString(" not found"))
		}
		return provider;
	},
	/**
	 * Returns provider
	 *
	 * @params string provider_name
	 * @return CoreProvider
	 */
	getProvider: function(context, provider_name, settings_name)
	{
		if (settings_name == undefined) settings_name = "default";
		var __v0 = use("Runtime.rtl");
		var params = __v0.attr(context.settings, use("Runtime.Collection").create(["providers",provider_name,settings_name]));
		var provider = this.createProvider(context, provider_name, params);
		return provider;
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(context, chain_name, args)
	{
		var entities = context.entities.filter((item) => 
		{
			var __v0 = use("Runtime.Annotations.LambdaChain");
			return item instanceof __v0 && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm((a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count();i++)
		{
			var item = entities.item(i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				var res = this.chain(context, item_chain_name, args);
				args = args.setIm(args.count() - 1, res);
			}
			else
			{
				var __v0 = use("Runtime.rs");
				var arr = __v0.split("::", item.value);
				var class_name = arr.get(0, "");
				var method_name = arr.get(1, "");
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(class_name, method_name);
				var __v0 = use("Runtime.rtl");
				var res = __v0.apply(f, args);
				args = args.setIm(args.count() - 1, res);
			}
		}
		var res = args.last();
		return res;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAwait: function(context, chain_name, args)
	{
		var entities,obj,i,item,item_chain_name,res,arr,class_name,method_name,f;
		return (__async_t) =>
		{
			if (__async_t.pos() == "0")
			{
				entities = context.entities.filter((item) => 
				{
					var __v0 = use("Runtime.Annotations.LambdaChain");
					return item instanceof __v0 && item.name == chain_name;
				});
				entities = entities.sortIm((a, b) => 
				{
					return a.pos > b.pos;
				});
				obj = args.last();
				return __async_t.jump(__async_t, "1.0");
			}
			/* Start Loop */
			else if (__async_t.pos() == "1.0")
			{
				i = 0;
				return __async_t.jump(__async_t, "1.1");
			}
			/* Loop Expression */
			else if (__async_t.pos() == "1.1")
			{
				var __async_var = i < entities.count();
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.2");
				}
				return __async_t.jump(__async_t, "2");
			}
			/* Loop */
			else if (__async_t.pos() == "1.2")
			{
				i++;
				item = entities.item(i);
				item_chain_name = item.chain;
				return __async_t.jump(__async_t, "1.3.0");
			}
			/* Start if */
			else if (__async_t.pos() == "1.3.0")
			{
				var __async_var = item_chain_name != "";
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.3.1");
				}
				return __async_t.jump(__async_t, "1.3.2");
			}
			/* If true */
			else if (__async_t.pos() == "1.3.1")
			{
				return __async_t.jump(__async_t,"1.3.3").call(__async_t,this.chainAwait(context, item_chain_name, args),"__v0");
			}
			else if (__async_t.pos() == "1.3.3")
			{
				res = __async_t.getVar("__v0");
				args = args.setIm(args.count() - 1, res);
				return __async_t.jump(__async_t, "1.4");
			}
			/* Next If */
			else if (__async_t.pos() == "1.3.2")
			{
				/* If false */
				var __v0 = use("Runtime.rs");
				arr = __v0.split("::", item.value);
				class_name = arr.get(0, "");
				method_name = arr.get(1, "");
				var __v0 = use("Runtime.rtl");
				f = __v0.method(class_name, method_name);
				return __async_t.jump(__async_t, "1.3.4.0");
			}
			/* Start if */
			else if (__async_t.pos() == "1.3.4.0")
			{
				var __async_var = item.is_async;
				if (async_var)
				{
					return __async_t.jump(__async_t, "1.3.4.1");
				}
				return __async_t.jump(__async_t, "1.3.4.2");
			}
			/* If true */
			else if (__async_t.pos() == "1.3.4.1")
			{
				var __v0 = use("Runtime.rtl");
				return __async_t.jump(__async_t,"1.3.4.3").call(__async_t,__v0.apply(f, args),"__v1");
			}
			else if (__async_t.pos() == "1.3.4.3")
			{
				res = __async_t.getVar("__v1");
				args = args.setIm(args.count() - 1, res);
				return __async_t.jump(__async_t, "1.3.5");
			}
			/* Next If */
			else if (__async_t.pos() == "1.3.4.2")
			{
				/* If false */
				var __v0 = use("Runtime.rtl");
				res = __v0.apply(f, args);
				args = args.setIm(args.count() - 1, res);
				return __async_t.jump(__async_t, "1.3.5");
			}
			/* End if */
			else if (__async_t.pos() == "1.3.5")
			{
				/*
				rtl::dump(item.value);
				rtl::dump(res == null);*/
				return __async_t.jump(__async_t, "1.4");
			}
			/* End if */
			else if (__async_t.pos() == "1.4")
			{
				return __async_t.jump(__async_t, "1.1");
			}
			/* End Loop */
			else if (__async_t.pos() == "2")
			{
				res = args.last();
				return __async_t.ret(__async_t, res);
			}
			return __async_t.ret_void();
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
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Context",
			"name": "Runtime.Context",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
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
});use.add(Runtime.Context);
if (module.exports == undefined) module.exports = {};
if (module.exports.Runtime == undefined) module.exports.Runtime = {};
module.exports.Runtime.Context = Runtime.Context;