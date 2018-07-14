"use strict;"
/*!
 *  Bayrell Runtime Library
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
class RuntimeConstant{
	getClassName(){return "Runtime.RuntimeConstant";}
	static getParentClassName(){return "";}
	/* Log level */
	/**
	 * Fatal error. Application stoped
	 */
	/**
	 * Critical error. Application damaged, but works
	 */
	/**
	 * Any Application error or exception
	 */
	/**
	 * Log warning. Developer should attention to this
	 */
	/**
	 * Information about any event
	 */
	/**
	 * Debug level 1
	 */
	/**
	 * Debug level 2
	 */
	/* Status codes */
	/* Errors */
}
RuntimeConstant.LOG_FATAL = 0;
RuntimeConstant.LOG_CRITICAL = 2;
RuntimeConstant.LOG_ERROR = 4;
RuntimeConstant.LOG_WARNING = 6;
RuntimeConstant.LOG_INFO = 8;
RuntimeConstant.LOG_DEBUG = 10;
RuntimeConstant.LOG_DEBUG2 = 12;
RuntimeConstant.STATUS_DONE = 0;
RuntimeConstant.STATUS_PLAN = 1;
RuntimeConstant.STATUS_PROCESS = 2;
RuntimeConstant.STATUS_FAIL = -1;
RuntimeConstant.ERROR_OK = 0;
RuntimeConstant.ERROR_UNKNOWN = -1;
RuntimeConstant.ERROR_INDEX_OUT_OF_RANGE = -2;
RuntimeConstant.ERROR_KEY_NOT_FOUND = -3;
RuntimeConstant.ERROR_STOP_ITERATION = -4;
RuntimeConstant.ERROR_ASSERT = -5;
module.exports = RuntimeConstant;