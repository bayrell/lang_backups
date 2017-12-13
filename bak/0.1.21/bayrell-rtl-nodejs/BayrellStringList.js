"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__BayrellListItem = require('./BayrellListItem.js');
var BayrellListItem = m__BayrellListItem.BayrellListItem;
var m__BayrellList = require('./BayrellList.js');
var BayrellList = m__BayrellList.BayrellList;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellStringList extends BayrellList {
    getClassName(){
        return "bayrell_rtl.BayrellStringList";
    }
    constructor(){
        super();
        this._indent = "";
        this._clr = "";
        this._indent = rtl.INDENT;
        this._clr = rtl.CLR;
    }
    setIndent(val){
        this._indent = val;
    }
    getIndent(){
        return this._indent;
    }
    setClr(val){
        this._clr = val;
    }
    getClr(){
        return this._clr;
    }
    /*
	 * ��������� Indent
	 */
    addIndent(s, level){
        if (!rtl.exists(level)){level = 0;}
        if (level > 0) {
            return rtl.str_repeat(this._indent, level) + rtl.toString(s);
        }
        return s;
    }
    addStringFirst(data, level){
        if (!rtl.exists(level)){level = 0;}
        this.addFirst(this.addIndent(data, level));
    }
    addStringLast(data, level){
        if (!rtl.exists(level)){level = 0;}
        this.addLast(this.addIndent(data, level));
    }
    getString(clr){
        if (!rtl.exists(clr)){clr = null;}
        if (!rtl.exists(clr)) {
            return rtl.implode(this.getClr(), this.getData());
        }
        return rtl.implode(clr, this.getData());
    }
}
module.exports.BayrellStringList = BayrellStringList;
