"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2021 "Ildar Bikmamatov" <support@bayrell.org>
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
	use("Runtime.BaseStruct").apply(this, arguments);
};
Runtime.Context.prototype = Object.create(use("Runtime.BaseStruct").prototype);
Runtime.Context.prototype.constructor = Runtime.Context;
Object.assign(Runtime.Context.prototype,
{
	/**
	 * Returns enviroment by eky
	 */
	env: function(ctx, key, def_value)
	{
		if (def_value == undefined) def_value = "";
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, this);
		__v1 = __v1.attr(ctx, "enviroments");
		var __v2 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v2.get(ctx, key, def_value));
		return __v1.value(ctx);
	},
	/**
	 * Returns settings
	 * @return Dict<string>
	 */
	config: function(ctx, items, d)
	{
		if (d == undefined) d = null;
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, this);
		__v1 = __v1.attr(ctx, "settings");
		var __v2 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v2.get(ctx, "config", null));
		var __v3 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v3.attr(ctx, items, d));
		return __v1.value(ctx);
	},
	/**
	 * Returns docker secret key
	 */
	secret: function(ctx, key)
	{
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, this);
		__v1 = __v1.attr(ctx, "settings");
		var __v2 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v2.get(ctx, "secrets", null));
		var __v3 = use("Runtime.lib");
		__v1 = __v1.call(ctx, __v3.get(ctx, key, ""));
		return __v1.value(ctx);
	},
	/**
	 * Add driver
	 */
	addDriver: function(ctx, obj)
	{
		this.drivers.setValue(ctx, obj.getObjectName(ctx), obj);
		return this;
	},
	/**
	 * Add driver
	 */
	getDriver: function(ctx, name)
	{
		return this.drivers.get(ctx, name, null);
	},
	/* ---------------------- Chain --------------------- */
	/**
	 * Apply Lambda Chain
	 */
	chain: function(ctx, chain_name, args)
	{
		var entities = this.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.LambdaChain");
			return item instanceof __v0 && item.name == chain_name && item.is_async == false;
		});
		entities = entities.sortIm(ctx, (ctx, a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = this.chain(ctx, item_chain_name, args);
			}
			else
			{
				var __v0 = use("Runtime.rs");
				var arr = __v0.split(ctx, "::", item.value);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				var __v1 = use("Runtime.rtl");
				var f = __v1.method(ctx, class_name, method_name);
				var __v2 = use("Runtime.rtl");
				args = __v2.apply(ctx, f, args);
			}
		}
		return args;
	},
	/**
	 * Apply Lambda Chain Await
	 */
	chainAsync: async function(ctx, chain_name, args)
	{
		var entities = this.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.LambdaChain");
			return item instanceof __v0 && item.name == chain_name;
		});
		entities = entities.sortIm(ctx, (ctx, a, b) => 
		{
			return a.pos > b.pos;
		});
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item = entities.item(ctx, i);
			var item_chain_name = item.chain;
			if (item_chain_name != "")
			{
				args = await this.chainAsync(ctx, item_chain_name, args);
			}
			else
			{
				var __v0 = use("Runtime.rs");
				var arr = __v0.split(ctx, "::", item.value);
				var class_name = arr.get(ctx, 0, "");
				var method_name = arr.get(ctx, 1, "");
				var __v1 = use("Runtime.rtl");
				var f = __v1.method(ctx, class_name, method_name);
				if (item.is_async)
				{
					var __v2 = use("Runtime.rtl");
					args = await __v2.applyAsync(ctx, f, args);
				}
				else
				{
					var __v3 = use("Runtime.rtl");
					args = __v3.apply(ctx, f, args);
				}
			}
		}
		return Promise.resolve(args);
	},
	/**
	 * Translate message
	 * @params string space - message space
	 * @params string message - message need to be translated
	 * @params Map params - Messages params. Default null.
	 * @params string locale - Different locale. Default "".
	 * @return string - translated string
	 */
	translate: function(ctx, space, message, params, locale)
	{
		if (params == undefined) params = null;
		if (locale == undefined) locale = "";
		message = (params == null) ? (message) : (params.reduce(ctx, (ctx, message, value, key) => 
		{
			var __v0 = use("Runtime.rs");
			return __v0.replace(ctx, "%" + use("Runtime.rtl").toStr(key) + use("Runtime.rtl").toStr("%"), value, message);
		}, message));
		return message;
	},
	_init: function(ctx)
	{
		use("Runtime.BaseStruct").prototype._init.call(this,ctx);
		var __v0 = use("Runtime.Map");
		this.base_path = null;
		this.enviroments = null;
		this.settings = null;
		this.modules = null;
		this.entities = null;
		this.cli_args = use("Runtime.Collection").from([]);
		this.drivers = new __v0(ctx);
		this.initialized = false;
		this.started = false;
		this.start_time = 0;
		this.tz = "UTC";
		this.app_name = "self";
		this.main_module = "";
		this.main_class = "";
		this.entry_point = "";
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof use("Runtime.Context"))
		{
			this.base_path = o.base_path;
			this.enviroments = o.enviroments;
			this.settings = o.settings;
			this.modules = o.modules;
			this.entities = o.entities;
			this.cli_args = o.cli_args;
			this.drivers = o.drivers;
			this.initialized = o.initialized;
			this.started = o.started;
			this.start_time = o.start_time;
			this.tz = o.tz;
			this.app_name = o.app_name;
			this.main_module = o.main_module;
			this.main_class = o.main_class;
			this.entry_point = o.entry_point;
		}
		use("Runtime.BaseStruct").prototype.assignObject.call(this,ctx,o);
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "base_path")this.base_path = v;
		else if (k == "enviroments")this.enviroments = v;
		else if (k == "settings")this.settings = v;
		else if (k == "modules")this.modules = v;
		else if (k == "entities")this.entities = v;
		else if (k == "cli_args")this.cli_args = v;
		else if (k == "drivers")this.drivers = v;
		else if (k == "initialized")this.initialized = v;
		else if (k == "started")this.started = v;
		else if (k == "start_time")this.start_time = v;
		else if (k == "tz")this.tz = v;
		else if (k == "app_name")this.app_name = v;
		else if (k == "main_module")this.main_module = v;
		else if (k == "main_class")this.main_class = v;
		else if (k == "entry_point")this.entry_point = v;
		else use("Runtime.BaseStruct").prototype.assignValue.call(this,ctx,k,v);
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "base_path")return this.base_path;
		else if (k == "enviroments")return this.enviroments;
		else if (k == "settings")return this.settings;
		else if (k == "modules")return this.modules;
		else if (k == "entities")return this.entities;
		else if (k == "cli_args")return this.cli_args;
		else if (k == "drivers")return this.drivers;
		else if (k == "initialized")return this.initialized;
		else if (k == "started")return this.started;
		else if (k == "start_time")return this.start_time;
		else if (k == "tz")return this.tz;
		else if (k == "app_name")return this.app_name;
		else if (k == "main_module")return this.main_module;
		else if (k == "main_class")return this.main_class;
		else if (k == "entry_point")return this.entry_point;
		return use("Runtime.BaseStruct").prototype.takeValue.call(this,ctx,k,d);
	},
	getClassName: function(ctx)
	{
		return "Runtime.Context";
	},
});
Object.assign(Runtime.Context, use("Runtime.BaseStruct"));
Object.assign(Runtime.Context,
{
	/**
	 * Returns context settings
	 * @return Dict<string>
	 */
	getSettings: function(ctx, env)
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
	create: function(ctx, env)
	{
		if (env == undefined) env = null;
		var settings = use("Runtime.Dict").from({});
		/* Context data */
		var obj = use("Runtime.Dict").from({"enviroments":env,"settings":settings,"modules":use("Runtime.Collection").from([])});
		/* Create context */
		var ctx = this.newInstance(ctx, obj);
		return ctx;
	},
	/**
	 * Set main module
	 */
	setMainModule: function(ctx, c, main_module)
	{
		var settings = use("Runtime.Dict").from({});
		var main_module_class_name = "";
		/* Get settings */
		if (main_module)
		{
			main_module_class_name = main_module + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v0 = use("Runtime.rtl");
			if (__v0.method_exists(ctx, main_module_class_name, "appSettings"))
			{
				var __v1 = use("Runtime.rtl");
				var f = __v1.method(ctx, main_module_class_name, "appSettings");
				settings = f(ctx, c.enviroments);
			}
		}
		/* Setup app name */
		var __v0 = use("Runtime.rtl");
		if (__v0.method_exists(ctx, main_module_class_name, "appName"))
		{
			var __v1 = use("Runtime.rtl");
			c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["app_name"]), __v1.methodApply(ctx, main_module_class_name, "appName"));
		}
		/* Add main module */
		if (main_module)
		{
			c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["modules"]), c.modules.pushIm(ctx, main_module));
		}
		/* Set main module */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["main_module"]), main_module);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["main_class"]), main_module_class_name);
		/* Set entry point */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entry_point"]), main_module_class_name);
		/* Set new settings */
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["settings"]), settings);
		/* Extends modules */
		var modules = this.getRequiredModules(ctx, c.modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["modules"]), modules);
		return c;
	},
	/**
	 * Set main class
	 */
	setMainClass: function(ctx, c, main_class)
	{
		return c.copy(ctx, use("Runtime.Dict").from({"main_class":main_class,"entry_point":main_class}));
	},
	/**
	 * Set entry point
	 */
	setEntryPoint: function(ctx, c, entry_point)
	{
		return c.copy(ctx, use("Runtime.Dict").from({"entry_point":entry_point}));
	},
	/**
	 * Init
	 */
	init: async function(ctx, c)
	{
		ctx = c;
		if (c.initialized)
		{
			return Promise.resolve(c);
		}
		/* Base path */
		var __v0 = use("Runtime.rtl");
		var base_path = (c.base_path != "") ? (c.base_path) : (__v0.attr(ctx, c.env, use("Runtime.Collection").from(["BASE_PATH"]), "", "string"));
		/* Get modules entities */
		var entities = this.getEntitiesFromModules(ctx, c.modules);
		c = Runtime.rtl.setAttr(ctx, c, Runtime.Collection.from(["entities"]), entities);
		/* Extend entities */
		entities = this.getRequiredEntities(ctx, entities);
		/* Add lambda chains */
		entities = entities.concat(ctx, this.getSubEntities(ctx, entities, "Runtime.LambdaChainClass", "Runtime.LambdaChain"));
		/* Add Entities */
		var __v1 = use("Runtime.Monad");
		var __v2 = new __v1(ctx, c.chain(ctx, "addEntities", use("Runtime.Collection").from([c,entities])));
		__v2 = __v2.attr(ctx, 1);
		entities = __v2.value(ctx);
		/* Setup context */
		c = c.copy(ctx, use("Runtime.Dict").from({"entities":entities,"base_path":base_path,"initialized":true}));
		/* Context init */
		var main_class = c.main_class;
		var __v3 = use("Runtime.rtl");
		if (main_class != "" && __v3.method_exists(ctx, main_class, "contextInit"))
		{
			var __v4 = use("Runtime.rtl");
			var contextInit = __v4.method(ctx, main_class, "contextInit");
			c = await contextInit(ctx, c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Start
	 */
	start: async function(ctx, c)
	{
		ctx = c;
		if (c.started)
		{
			return Promise.resolve(c);
		}
		/* Get drivers from entity */
		var drivers = c.entities.filter(ctx, (ctx, item) => 
		{
			var __v0 = use("Runtime.Driver");
			return item instanceof __v0;
		});
		/* Create drivers */
		for (var i = 0;i < drivers.count(ctx);i++)
		{
			var driver_entity = drivers.item(ctx, i);
			var driver_name = driver_entity.name;
			var class_name = driver_entity.value;
			if (class_name == "")
			{
				class_name = driver_entity.name;
			}
			var __v0 = use("Runtime.rtl");
			var driver = __v0.newInstance(ctx, class_name, use("Runtime.Collection").from([driver_name,driver_entity]));
			var __v1 = use("Runtime.Monad");
			var __v2 = new __v1(ctx, ctx.chain(ctx, class_name, use("Runtime.Collection").from([driver])));
			__v2 = __v2.attr(ctx, 0);
			driver = __v2.value(ctx);
			if (class_name != driver_name)
			{
				var __v3 = use("Runtime.Monad");
				var __v4 = new __v3(ctx, ctx.chain(ctx, driver_name, use("Runtime.Collection").from([driver])));
				__v4 = __v4.attr(ctx, 0);
				driver = __v4.value(ctx);
			}
			if (driver == null)
			{
				var __v3 = use("Runtime.Exceptions.RuntimeException");
				throw new __v3(ctx, "Driver '" + use("Runtime.rtl").toStr(class_name) + use("Runtime.rtl").toStr("' not found"))
			}
			c.drivers.setValue(ctx, driver_name, driver);
		}
		/* Start drivers */
		var keys = c.drivers.keys(ctx);
		for (var i = 0;i < keys.count(ctx);i++)
		{
			var driver_name = Runtime.rtl.get(ctx, keys, i);
			var driver = Runtime.rtl.get(ctx, c.drivers, driver_name);
			await driver.startDriver(ctx);
			if (driver.entity.global)
			{
				window[driver_name] = driver;
			}
		}
		/* Setup started */
		c = c.copy(ctx, use("Runtime.Dict").from({"started":true}));
		/* Start app */
		var main_class = c.main_class;
		var __v0 = use("Runtime.rtl");
		if (main_class != "" && __v0.method_exists(ctx, main_class, "contextStart"))
		{
			var __v1 = use("Runtime.rtl");
			var contextStart = __v1.method(ctx, main_class, "contextStart");
			c = await contextStart(ctx, c);
		}
		return Promise.resolve(c);
	},
	/**
	 * Run entry point
	 */
	run: async function(ctx, c)
	{
		ctx = c;
		var entry_point = c.entry_point;
		/* Run entrypoint */
		if (entry_point != "")
		{
			var __v0 = use("Runtime.rtl");
			var appRun = __v0.method(ctx, entry_point, "appRun");
			await appRun(c);
		}
		return Promise.resolve(c);
	},
	/* -------------------- Functions ------------------- */
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredModules: function(ctx, res, cache, modules, filter)
	{
		if (filter == undefined) filter = null;
		if (modules == null)
		{
			return ;
		}
		if (filter)
		{
			modules = modules.filter(ctx, filter);
		}
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_name = modules.item(ctx, i);
			if (cache.get(ctx, module_name, false) == false)
			{
				cache.setValue(ctx, module_name, true);
				var __v0 = use("Runtime.rtl");
				var f = __v0.method(ctx, module_name + use("Runtime.rtl").toStr(".ModuleDescription"), "requiredModules");
				var sub_modules = f(ctx);
				if (sub_modules != null)
				{
					var sub_modules = sub_modules.keys(ctx);
					this._getRequiredModules(ctx, res, cache, sub_modules);
				}
				res.pushValue(ctx, module_name);
			}
		}
	},
	/**
	 * Returns all modules
	 * @param Collection<string> modules
	 * @return Collection<string>
	 */
	getRequiredModules: function(ctx, modules)
	{
		var __v0 = use("Runtime.Vector");
		var res = new __v0(ctx);
		var __v1 = use("Runtime.Map");
		var cache = new __v1(ctx);
		this._getRequiredModules(ctx, res, cache, modules);
		res = res.removeDuplicates(ctx);
		return res.toCollection(ctx);
	},
	/**
	 * Returns modules entities
	 */
	getEntitiesFromModules: function(ctx, modules)
	{
		var __v0 = use("Runtime.Vector");
		var entities = new __v0(ctx);
		for (var i = 0;i < modules.count(ctx);i++)
		{
			var module_class_name = modules.item(ctx, i) + use("Runtime.rtl").toStr(".ModuleDescription");
			var __v1 = use("Runtime.rtl");
			if (__v1.method_exists(ctx, module_class_name, "entities"))
			{
				var __v2 = use("Runtime.rtl");
				var f = __v2.method(ctx, module_class_name, "entities");
				var arr = f(ctx);
				entities.appendVector(ctx, arr);
			}
		}
		return entities.toCollection(ctx);
	},
	/**
	 * Extend entities
	 */
	getRequiredEntities: function(ctx, entities)
	{
		var e = entities.toVector(ctx);
		for (var i = 0;i < entities.count(ctx);i++)
		{
			var item1 = entities.item(ctx, i);
			var item1_class_name = item1.getClassName(ctx);
			if (item1_class_name == "Runtime.Entity")
			{
				var class_name = (item1.value != "") ? (item1.value) : (item1.name);
				var __v0 = use("Runtime.rtl");
				var annotations = __v0.getClassAnnotations(ctx, class_name);
				for (var j = 0;j < annotations.count(ctx);j++)
				{
					var item2 = annotations.item(ctx, j);
					var item2_class_name = item2.getClassName(ctx);
					var __v1 = use("Runtime.Entity");
					if (item2 instanceof __v1 && item2_class_name != "Runtime.Entity")
					{
						item2 = item2.addClassInfo(ctx, class_name);
						e.pushValue(ctx, item2);
						e = item2.extendEntities(ctx, e).toVector(ctx);
					}
				}
			}
		}
		return e.toCollection(ctx);
	},
	/**
	 * Returns sub entities from classes
	 */
	getSubEntities: function(ctx, entitites, entity_class_name, entity_class_method)
	{
		var __v0 = use("Runtime.lib");
		var class_names = entitites.filter(ctx, __v0.isInstance(ctx, entity_class_name));
		var __v1 = use("Runtime.Vector");
		var methods = new __v1(ctx);
		var __v2 = use("Runtime.lib");
		methods.appendVector(ctx, entitites.filter(ctx, __v2.isInstance(ctx, entity_class_method)));
		for (var class_names_inc = 0;class_names_inc < class_names.count(ctx);class_names_inc++)
		{
			var class_item = Runtime.rtl.get(ctx, class_names, class_names_inc);
			var class_name = class_item.name;
			if (class_name == "")
			{
				continue;
			}
			var __v3 = use("Runtime.rtl");
			var annotations = __v3.getMethodsAnnotations(ctx, class_name);
			annotations.each(ctx, (ctx, annotations, class_method_name) => 
			{
				var __v4 = use("Runtime.rtl");
				var method_info = __v4.methodApply(ctx, class_name, "getMethodInfoByName", use("Runtime.Collection").from([class_method_name]));
				for (var annotations_inc = 0;annotations_inc < annotations.count(ctx);annotations_inc++)
				{
					var annotation = Runtime.rtl.get(ctx, annotations, annotations_inc);
					if (annotation)
					{
						var __v5 = use("Runtime.rtl");
						if (__v5.is_instanceof(ctx, annotation, entity_class_method))
						{
							annotation = annotation.addMethodInfo(ctx, class_name, class_method_name, class_item, method_info);
							methods.pushValue(ctx, annotation);
						}
					}
				}
			});
		}
		return methods;
	},
	/**
	 * Start App
	 */
	startApp: async function(ctx, env, main_module, main_class, options)
	{
		if (options == undefined) options = null;
		var __v0 = use("Runtime.Monad");
		var __v1 = new __v0(ctx, Runtime.rtl.get(ctx, options, "entry_point"));
		var __v2 = use("Runtime.rtl");
		__v1 = __v1.monad(ctx, __v2.m_to(ctx, "string", ""));
		var entry_point = __v1.value(ctx);
		var __v3 = use("Runtime.Monad");
		var __v4 = new __v3(ctx, Runtime.rtl.get(ctx, options, "cli_args"));
		var __v5 = use("Runtime.rtl");
		__v4 = __v4.monad(ctx, __v5.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var cli_args = __v4.value(ctx);
		var context = this.create(ctx, env);
		/* Set cli args */
		context = Runtime.rtl.setAttr(ctx, context, Runtime.Collection.from(["cli_args"]), cli_args);
		/* Set global context */
		var __v6 = use("Runtime.rtl");
		__v6.setContext(context);
		ctx = context;
		window["globalContext"] = context;
		context = context.constructor.setMainModule(ctx, context, main_module);
		context = context.constructor.setMainClass(ctx, context, main_class);
		if (entry_point == "")
		{
			context = context.constructor.setEntryPoint(ctx, context, main_class);
		}
		else
		{
			context = context.constructor.setEntryPoint(ctx, context, entry_point);
		}
		/* Call create */
		if (options != null && options.has(ctx, "create"))
		{
			var f = options.has(ctx, "init");
			context = await f(ctx, context);
		}
		/* Init context */
		context = await context.constructor.init(ctx, context);
		/* Call init chain */
		var __v7 = use("Runtime.Monad");
		var __v8 = new __v7(ctx, await context.chainAsync(ctx, "init", use("Runtime.Collection").from([context])));
		__v8 = __v8.attr(ctx, 0);
		context = __v8.value(ctx);
		/* Call init */
		if (options != null && options.has(ctx, "init"))
		{
			var f = options.has(ctx, "init");
			context = await f(ctx, context);
		}
		/* Start context */
		context = await context.constructor.start(ctx, context);
		/* Set global context */
		var __v9 = use("Runtime.rtl");
		__v9.setContext(context);
		ctx = context;
		/* Call start chain */
		var __v10 = use("Runtime.Monad");
		var __v11 = new __v10(ctx, await context.chainAsync(ctx, "start", use("Runtime.Collection").from([context])));
		__v11 = __v11.attr(ctx, 0);
		context = __v11.value(ctx);
		/* Call start */
		if (options != null && options.has(ctx, "start"))
		{
			var f = options.has(ctx, "start");
			context = await f(ctx, context);
		}
		window["globalContext"] = context;
		try
		{
			/* Run app */
			await context.constructor.run(ctx, context);
		}
		catch (_ex)
		{
			if (true)
			{
				var e = _ex;
				
				console.log( e.stack );
			}
			else
			{
				throw _ex;
			}
		}
		return Promise.resolve(context);
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
		return "Runtime.BaseStruct";
	},
	getClassInfo: function(ctx)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
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
		if ((f&3)==3)
		{
			a.push("base_path");
			a.push("enviroments");
			a.push("settings");
			a.push("modules");
			a.push("entities");
			a.push("cli_args");
			a.push("drivers");
			a.push("initialized");
			a.push("started");
			a.push("start_time");
			a.push("tz");
			a.push("app_name");
			a.push("main_module");
			a.push("main_class");
			a.push("entry_point");
		}
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		if (field_name == "base_path") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "enviroments") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Dict",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "settings") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Dict",
			"s": ["var"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "modules") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entities") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Collection",
			"s": ["Runtime.BaseStruct"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "cli_args") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Collection",
			"s": ["string"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "drivers") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "Runtime.Map",
			"s": ["Runtime.BaseDriver"],
			"annotations": Collection.from([
			]),
		});
		if (field_name == "initialized") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "started") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "bool",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "start_time") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "int",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "tz") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "app_name") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_module") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "main_class") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "entry_point") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Context",
			"name": field_name,
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});use.add(Runtime.Context);
module.exports = Runtime.Context;