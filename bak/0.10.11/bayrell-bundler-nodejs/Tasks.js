"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Bundler
 *
 *  (c) Copyright 2020 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Bundler == 'undefined') Bayrell.Bundler = {};
Bayrell.Bundler.Tasks = function(ctx)
{
};
Object.assign(Bayrell.Bundler.Tasks.prototype,
{
	getClassName: function(ctx)
	{
		return "Bayrell.Bundler.Tasks";
	},
});
Object.assign(Bayrell.Bundler.Tasks,
{
	/**
	 * Change File
	 */
	onChangeFile: async function(ctx, inotify, file_name)
	{
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		var __v1 = use("Runtime.rs");
		if (__v1.strpos(ctx, file_name, ctx.base_path) != 0)
		{
			return Promise.resolve();
		}
		var __v1 = use("Runtime.rs");
		var __v2 = use("Runtime.rs");
		var file_path = __v1.substr(ctx, file_name, __v2.strlen(ctx, ctx.base_path));
		var __v3 = use("Bayrell.Bundler.BundlerController");
		var module = __v3.findModule(ctx, control.modules, file_path);
		/* Create build container */
		var __v4 = use("Bayrell.Bundler.ChainFile");
		var __v5 = use("Runtime.rs");
		var file = new __v4(ctx, use("Runtime.Dict").from({"module":module,"file_path":file_path,"ext":__v5.extname(ctx, file_path)}));
		/* Build file */
		file = control.chainBuildCheckFile(ctx, file);
		if (!file.stop)
		{
			var __v6 = use("Runtime.fs");
			control.writeln(ctx, __v6.concat(ctx, ctx.base_path, file_path));
			await control.chainBuildFile(ctx, file);
			/* Bundle */
			await control.bundleByModule(ctx, module.module_name);
		}
	},
	/**
	 * Watch changes
	 */
	task_watch: async function(ctx)
	{
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		control.log_files = true;
		/* Get notify driver */
		var __v1 = use("Bayrell.Bundler.Inotify");
		var inotify = new __v1(ctx, "bundler-inotify");
		await inotify.createNotify(ctx);
		inotify.onChangeFile = this.onChangeFile.bind(this);
		inotify.changeTimeout = 500;
		ctx.addObject(ctx, inotify);
		var __v2 = use("Runtime.Monad");
		var __v3 = new __v2(ctx, control.config);
		__v3 = __v3.attr(ctx, "modules");
		var __v4 = use("Runtime.rtl");
		__v3 = __v3.monad(ctx, __v4.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var modules_dir = __v3.value(ctx);
		for (var i = 0;i < modules_dir.count(ctx);i++)
		{
			var dir = modules_dir.item(ctx, i);
			var __v5 = use("Runtime.fs");
			var dir_path = __v5.concat(ctx, ctx.base_path, dir);
			await inotify.addFolder(ctx, dir_path);
		}
		control.writeln(ctx, "Start watch");
		while (true)
		{
			var __v5 = use("Runtime.rtl");
			await __v5.sleep(ctx, 100);
		}
	},
	/**
	 * Build project
	 */
	task_build: async function(ctx)
	{
		var __v0 = use("Runtime.Map");
		var builded_modules = new __v0(ctx);
		var __v1 = use("Bayrell.Bundler.BundlerController");
		var control = await __v1.getController(ctx);
		var bundle_name = ctx.cli_args.get(ctx, 2, "");
		var __v2 = use("Runtime.Monad");
		var __v3 = new __v2(ctx, control.config);
		__v3 = __v3.attr(ctx, "bundles");
		var __v4 = use("Runtime.rtl");
		__v3 = __v3.monad(ctx, __v4.m_def(ctx, use("Runtime.Collection").from([])));
		var bundles = __v3.value(ctx);
		var find_bundle = null;
		if (bundle_name == "")
		{
			control.writeln(ctx, "Type bundle name:");
			bundles.each(ctx, (ctx, item) => 
			{
				if (item.has(ctx, "name"))
				{
					control.writeln(ctx, "  " + use("Runtime.rtl").toStr(Runtime.rtl.get(ctx, item, "name")));
				}
			});
		}
		/* Find bundle by name */
		var __v5 = use("Runtime.lib");
		find_bundle = bundles.findItem(ctx, __v5.equalAttr(ctx, "name", bundle_name));
		if (find_bundle == null)
		{
			control.writeln(ctx, "Wrong bundle name " + use("Runtime.rtl").toStr(bundle_name));
			return Promise.resolve();
		}
		/* Get bundle modules */
		var __v6 = use("Runtime.Monad");
		var __v7 = new __v6(ctx, find_bundle);
		__v7 = __v7.attr(ctx, "modules");
		var __v8 = use("Runtime.rtl");
		__v7 = __v7.monad(ctx, __v8.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
		var bundle_modules = __v7.value(ctx);
		/* Make bundle modules */
		for (var i = 0;i < control.modules.count(ctx);i++)
		{
			var module = control.modules.item(ctx, i);
			/* Find module name */
			var pos = bundle_modules.indexOf(ctx, module.module_name);
			if (pos == -1)
			{
				continue;
			}
			await control.chainBuildModuleByName(ctx, module.module_name);
			builded_modules.set(ctx, module.module_name, true);
		}
		/* Build modules */
		for (var j = 0;j < bundle_modules.count(ctx);j++)
		{
			var module_name = bundle_modules.item(ctx, j);
			if (builded_modules.has(ctx, module_name))
			{
				continue;
			}
			if (Runtime.rtl.get(ctx, module_name, 0) == "@")
			{
				continue;
			}
			await control.chainBuildModuleByName(ctx, module_name);
			builded_modules.set(ctx, module_name, true);
		}
		/* Make bundle */
		await control.chainBundle(ctx, find_bundle);
	},
	/**
	 * Build project
	 */
	task_build_all: async function(ctx)
	{
		var __v0 = use("Runtime.Map");
		var builded_modules = new __v0(ctx);
		var __v1 = use("Bayrell.Bundler.BundlerController");
		var control = await __v1.getController(ctx);
		var __v2 = use("Runtime.Monad");
		var __v3 = new __v2(ctx, control.config);
		__v3 = __v3.attr(ctx, "bundles");
		var __v4 = use("Runtime.rtl");
		__v3 = __v3.monad(ctx, __v4.m_def(ctx, use("Runtime.Collection").from([])));
		var bundles = __v3.value(ctx);
		/* Make all modules */
		for (var i = 0;i < control.modules.count(ctx);i++)
		{
			var module = control.modules.item(ctx, i);
			await control.chainBuildModuleByName(ctx, module.module_name);
			builded_modules.set(ctx, module.module_name, true);
		}
		/* Build all bundles */
		for (var i = 0;i < bundles.count(ctx);i++)
		{
			var bundle_conf = bundles.item(ctx, i);
			/* Get modules */
			var __v5 = use("Runtime.Monad");
			var __v6 = new __v5(ctx, bundle_conf);
			__v6 = __v6.attr(ctx, "modules");
			var __v7 = use("Runtime.rtl");
			__v6 = __v6.monad(ctx, __v7.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var bundle_modules = __v6.value(ctx);
			/* Build modules */
			for (var j = 0;j < bundle_modules.count(ctx);j++)
			{
				var module_name = bundle_modules.item(ctx, j);
				if (builded_modules.has(ctx, module_name))
				{
					continue;
				}
				if (Runtime.rtl.get(ctx, module_name, 0) == "@")
				{
					continue;
				}
				await control.chainBuildModuleByName(ctx, module_name);
				builded_modules.set(ctx, module_name, true);
			}
			/* Make bundle */
			await control.chainBundle(ctx, bundle_conf);
		}
	},
	/**
	 * Make module
	 */
	task_make: async function(ctx)
	{
		var sz = ctx.cli_args.count(ctx);
		var module_name = ctx.cli_args.get(ctx, 2, "");
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		var module = control.findModuleByName(ctx, module_name);
		if (module_name == "")
		{
			control.writeln(ctx, "Type module name:");
			control.modules.each(ctx, (ctx, item) => 
			{
				control.writeln(ctx, "  " + use("Runtime.rtl").toStr(item.module_name));
			});
			return Promise.resolve();
		}
		else if (module == null)
		{
			control.writeln(ctx, "Wrong module name " + use("Runtime.rtl").toStr(module_name));
			return Promise.resolve();
		}
		/* Run module build chain */
		await control.chainBuildModuleByName(ctx, module_name);
		/* Build bundles */
		var __v1 = use("Runtime.Monad");
		var __v2 = new __v1(ctx, control.config);
		__v2 = __v2.attr(ctx, "bundles");
		var __v3 = use("Runtime.rtl");
		__v2 = __v2.monad(ctx, __v3.m_def(ctx, use("Runtime.Collection").from([])));
		var build_items = __v2.value(ctx);
		for (var i = 0;i < build_items.count(ctx);i++)
		{
			var bundle_conf = build_items.item(ctx, i);
			/* Get modules */
			var __v4 = use("Runtime.Monad");
			var __v5 = new __v4(ctx, bundle_conf);
			__v5 = __v5.attr(ctx, "modules");
			var __v6 = use("Runtime.rtl");
			__v5 = __v5.monad(ctx, __v6.m_to(ctx, "Runtime.Collection", use("Runtime.Collection").from([])));
			var build_modules = __v5.value(ctx);
			/* Find module name */
			var pos = build_modules.indexOf(ctx, module_name);
			if (pos != -1)
			{
				/* Make bundle */
				await control.chainBundle(ctx, bundle_conf);
			}
		}
	},
	/**
	 * Show modules
	 */
	task_modules: async function(ctx)
	{
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		/* Output list of modules */
		control.output.writeln(ctx, "Modules:");
		control.modules.each(ctx, (ctx, item) => 
		{
			control.output.writeln(ctx, "  " + use("Runtime.rtl").toStr(item.module_name));
		});
	},
	/**
	 * Make symlink
	 */
	make_link: async function(ctx, module_path, assets_path, kind)
	{
		var __v0 = use("Runtime.fs");
		module_path = __v0.addFirstSlash(ctx, module_path);
		var __v1 = use("Runtime.fs");
		assets_path = __v1.addFirstSlash(ctx, assets_path);
		var __v2 = use("Runtime.fs");
		var src = __v2.concat(ctx, module_path, kind);
		var __v3 = use("Runtime.fs");
		var dest = __v3.concat(ctx, assets_path, kind);
		var __v4 = use("Runtime.fs");
		var rel = __v4.relative(ctx, assets_path, src);
		var __v5 = use("Runtime.fs");
		if (await __v5.exists(ctx, src, ctx.base_path))
		{
			var __v6 = use("Runtime.fs");
			await __v6.mkdir(ctx, assets_path, ctx.base_path);
			var __v7 = use("Runtime.fs");
			if (await __v7.exists(ctx, src, ctx.base_path))
			{
				var __v8 = use("Runtime.fs");
				await __v8.unlink(ctx, dest, ctx.base_path);
				var __v9 = use("Runtime.fs");
				await __v9.symlink(ctx, rel, dest, ctx.base_path);
				var output = ctx.getDriver(ctx, "Runtime.Task.TaskDriver");
				var __v10 = use("Runtime.fs");
				output.writeln(ctx, __v10.concat(ctx, ctx.base_path, dest) + use("Runtime.rtl").toStr(" -> ") + use("Runtime.rtl").toStr(rel));
			}
		}
	},
	/**
	 * Make symlinks
	 */
	task_make_symlinks: async function(ctx)
	{
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		var __v1 = use("Runtime.Monad");
		var __v2 = new __v1(ctx, control.config);
		__v2 = __v2.attr(ctx, "assets");
		var __v3 = use("Runtime.rtl");
		__v2 = __v2.monad(ctx, __v3.m_to(ctx, "string", "assets/"));
		var assets_dir = __v2.value(ctx);
		for (var i = 0;i < control.modules.count(ctx);i++)
		{
			var module = control.modules.item(ctx, i);
			var __v4 = use("Runtime.fs");
			var module_path = __v4.concat(ctx, module.lib_path, module.module_name);
			var __v5 = use("Runtime.fs");
			var assets_path = __v5.concat(ctx, assets_dir, module.module_name);
			/* Resources folder */
			await this.make_link(ctx, module_path, assets_path, "resources");
			/* ES6 folder */
			/*static::make_link(module_path, assets_path, "es6");*/
		}
	},
	/**
	 * Version
	 */
	version: async function(ctx)
	{
		var __v0 = use("Bayrell.Bundler.BundlerController");
		var control = await __v0.getController(ctx);
		var __v1 = use("Bayrell.Lang.ModuleDescription");
		control.writeln(ctx, "Lang version: " + use("Runtime.rtl").toStr(__v1.getModuleVersion(ctx)));
		var __v2 = use("Bayrell.Bundler.ModuleDescription");
		control.writeln(ctx, "Bundler version: " + use("Runtime.rtl").toStr(__v2.getModuleVersion(ctx)));
		var __v3 = use("Runtime.ModuleDescription");
		control.writeln(ctx, "Runtime version: " + use("Runtime.rtl").toStr(__v3.getModuleVersion(ctx)));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Bundler";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Bundler.Tasks";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var __v0 = use("Runtime.Task.TaskList");
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Bundler.Tasks",
			"name": "Bayrell.Bundler.Tasks",
			"annotations": Collection.from([
				new __v0(ctx, use("Runtime.Dict").from({})),
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return null;
	},
	getMethodsList: function(ctx,f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
			"task_watch",
			"task_build",
			"task_build_all",
			"task_make",
			"task_modules",
			"task_make_symlinks",
			"version",
		];
		return use("Runtime.Collection").from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		if (field_name == "task_watch")
		{
		
		var __v0 = use("Runtime.Task.TaskMethod");
			var Collection = use("Runtime.Collection");
			var Dict = use("Runtime.Dict");
			var IntrospectionInfo = use("Runtime.IntrospectionInfo");
			return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_METHOD,
			"class_name": "Bayrell.Bundler.Tasks",
			"name": "task_watch",
			"async": true,
			"annotations": Collection.from([
				new __v0(ctx, use("Runtime.Dict").from({"alias":"watch"})),
			]),
		});
	}
	if (field_name == "task_build")
	{
	
	var __v0 = use("Runtime.Task.TaskMethod");
	var __v1 = use("Runtime.Task.TaskMethod");
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.IntrospectionInfo");
		return new IntrospectionInfo(ctx, {
		"kind": IntrospectionInfo.ITEM_METHOD,
		"class_name": "Bayrell.Bundler.Tasks",
		"name": "task_build",
		"async": true,
		"annotations": Collection.from([
			new __v1(ctx, use("Runtime.Dict").from({"alias":"build"})),
		]),
	});
}
if (field_name == "task_build_all")
{

var __v0 = use("Runtime.Task.TaskMethod");
var __v1 = use("Runtime.Task.TaskMethod");
var __v2 = use("Runtime.Task.TaskMethod");
	var Collection = use("Runtime.Collection");
	var Dict = use("Runtime.Dict");
	var IntrospectionInfo = use("Runtime.IntrospectionInfo");
	return new IntrospectionInfo(ctx, {
	"kind": IntrospectionInfo.ITEM_METHOD,
	"class_name": "Bayrell.Bundler.Tasks",
	"name": "task_build_all",
	"async": true,
	"annotations": Collection.from([
		new __v2(ctx, use("Runtime.Dict").from({"alias":"build_all"})),
	]),
});
}
if (field_name == "task_make")
{

var __v0 = use("Runtime.Task.TaskMethod");
var __v1 = use("Runtime.Task.TaskMethod");
var __v2 = use("Runtime.Task.TaskMethod");
var __v3 = use("Runtime.Task.TaskMethod");
var Collection = use("Runtime.Collection");
var Dict = use("Runtime.Dict");
var IntrospectionInfo = use("Runtime.IntrospectionInfo");
return new IntrospectionInfo(ctx, {
"kind": IntrospectionInfo.ITEM_METHOD,
"class_name": "Bayrell.Bundler.Tasks",
"name": "task_make",
"async": true,
"annotations": Collection.from([
	new __v3(ctx, use("Runtime.Dict").from({"alias":"make"})),
]),
});
}
if (field_name == "task_modules")
{

var __v0 = use("Runtime.Task.TaskMethod");
var __v1 = use("Runtime.Task.TaskMethod");
var __v2 = use("Runtime.Task.TaskMethod");
var __v3 = use("Runtime.Task.TaskMethod");
var __v4 = use("Runtime.Task.TaskMethod");
var Collection = use("Runtime.Collection");
var Dict = use("Runtime.Dict");
var IntrospectionInfo = use("Runtime.IntrospectionInfo");
return new IntrospectionInfo(ctx, {
"kind": IntrospectionInfo.ITEM_METHOD,
"class_name": "Bayrell.Bundler.Tasks",
"name": "task_modules",
"async": true,
"annotations": Collection.from([
new __v4(ctx, use("Runtime.Dict").from({"alias":"modules"})),
]),
});
}
if (field_name == "task_make_symlinks")
{

var __v0 = use("Runtime.Task.TaskMethod");
var __v1 = use("Runtime.Task.TaskMethod");
var __v2 = use("Runtime.Task.TaskMethod");
var __v3 = use("Runtime.Task.TaskMethod");
var __v4 = use("Runtime.Task.TaskMethod");
var __v5 = use("Runtime.Task.TaskMethod");
var Collection = use("Runtime.Collection");
var Dict = use("Runtime.Dict");
var IntrospectionInfo = use("Runtime.IntrospectionInfo");
return new IntrospectionInfo(ctx, {
"kind": IntrospectionInfo.ITEM_METHOD,
"class_name": "Bayrell.Bundler.Tasks",
"name": "task_make_symlinks",
"async": true,
"annotations": Collection.from([
new __v5(ctx, use("Runtime.Dict").from({"alias":"make_symlinks"})),
]),
});
}
if (field_name == "version")
{

var __v0 = use("Runtime.Task.TaskMethod");
var __v1 = use("Runtime.Task.TaskMethod");
var __v2 = use("Runtime.Task.TaskMethod");
var __v3 = use("Runtime.Task.TaskMethod");
var __v4 = use("Runtime.Task.TaskMethod");
var __v5 = use("Runtime.Task.TaskMethod");
var __v6 = use("Runtime.Task.TaskMethod");
var Collection = use("Runtime.Collection");
var Dict = use("Runtime.Dict");
var IntrospectionInfo = use("Runtime.IntrospectionInfo");
return new IntrospectionInfo(ctx, {
"kind": IntrospectionInfo.ITEM_METHOD,
"class_name": "Bayrell.Bundler.Tasks",
"name": "version",
"async": true,
"annotations": Collection.from([
new __v6(ctx, use("Runtime.Dict").from({"alias":"version"})),
]),
});
}
return null;
},
});use.add(Bayrell.Bundler.Tasks);
module.exports = Bayrell.Bundler.Tasks;