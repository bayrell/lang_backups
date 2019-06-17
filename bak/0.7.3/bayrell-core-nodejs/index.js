/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
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

if (false){

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.7.2',
};

}
else{

module.exports = {
	VERSION: '0.7.3',
	
	'FileSystem': {
		'Provider': {
			'FileSystemProvider': require("./FileSystem/Provider/FileSystemProvider.js"),
			'ModuleDescription': require("./FileSystem/Provider/ModuleDescription.js"),
		},
		'FileIOResult': require("./FileSystem/FileIOResult.js"),
		'FileNode': require("./FileSystem/FileNode.js"),
		'FileStat': require("./FileSystem/FileStat.js"),
		'FileSystemInterface': require("./FileSystem/FileSystemInterface.js"),
		'FileTransferInterface': require("./FileSystem/FileTransferInterface.js"),
		'ModuleDescription': require("./FileSystem/ModuleDescription.js"),
	},
	
	'Http': {
		'ApiRequest': require("./Http/ApiRequest.js"),
		'ApiResult': require("./Http/ApiResult.js"),
		'Assets': require("./Http/Assets.js"),
		'Cookie': require("./Http/Cookie.js"),
		'JsonResponse': require("./Http/JsonResponse.js"),
		'ModuleDescription': require("./Http/ModuleDescription.js"),
		'Request': require("./Http/Request.js"),
		'Response': require("./Http/Response.js"),
	},
	
	'Http': {
		'ApiDeclaringInterface': require("./Http/ApiDeclaringInterface.js"),
		'AssetsInterface': require("./Http/AssetsInterface.js"),
		'ComponentInterface': require("./Http/ComponentInterface.js"),
		'FrontendInterface': require("./Http/FrontendInterface.js"),
		'ModuleDescription': require("./Http/ModuleDescription.js"),
		'RoutesDeclaringInterface': require("./Http/RoutesDeclaringInterface.js"),
		'RoutesInterface': require("./Http/RoutesInterface.js"),
	},
	
	'UI': {
		'Animations': {
			'FadeIn': require("./UI/Animations/FadeIn.js"),
			'FadeOut': require("./UI/Animations/FadeOut.js"),
		},
		'Annotations': {
			'ApiInstance': require("./UI/Annotations/ApiInstance.js"),
			'ApiMethod': require("./UI/Annotations/ApiMethod.js"),
			'BindModel': require("./UI/Annotations/BindModel.js"),
			'BindValue': require("./UI/Annotations/BindValue.js"),
			'ControllerAnnotation': require("./UI/Annotations/ControllerAnnotation.js"),
			'Event': require("./UI/Annotations/Event.js"),
			'EventAsync': require("./UI/Annotations/EventAsync.js"),
			'RouteInfo': require("./UI/Annotations/RouteInfo.js"),
			'RoutesInstance': require("./UI/Annotations/RoutesInstance.js"),
			'SignalOut': require("./UI/Annotations/SignalOut.js"),
		},
		'Events': {
			'KeyboardEvent': {
				'KeyboardEvent': require("./UI/Events/KeyboardEvent/KeyboardEvent.js"),
			},
			'MouseEvent': {
				'MouseEvent': require("./UI/Events/MouseEvent/MouseEvent.js"),
			},
			'UserEvent': {
				'UserEvent': require("./UI/Events/UserEvent/UserEvent.js"),
			},
			'CommandEvent': require("./UI/Events/CommandEvent.js"),
			'ComponentEvent': require("./UI/Events/ComponentEvent.js"),
			'ModelChange': require("./UI/Events/ModelChange.js"),
			'MountEvent': require("./UI/Events/MountEvent.js"),
			'UpdateStateEvent': require("./UI/Events/UpdateStateEvent.js"),
		},
		'Render': {
			'CoreLayout': require("./UI/Render/CoreLayout.js"),
			'CoreManager': require("./UI/Render/CoreManager.js"),
			'CoreRoute': require("./UI/Render/CoreRoute.js"),
			'CoreView': require("./UI/Render/CoreView.js"),
			'LayoutModel': require("./UI/Render/LayoutModel.js"),
			'RenderHelper': require("./UI/Render/RenderHelper.js"),
			'RenderResult': require("./UI/Render/RenderResult.js"),
			'WebContainer': require("./UI/Render/WebContainer.js"),
		},
		'Assets': require("./UI/Assets.js"),
		'ModuleDescription': require("./UI/ModuleDescription.js"),
		'UIController': require("./UI/UIController.js"),
	},
	
};

}