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
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellList extends BayrellObject {
    getClassName(){
        return "bayrell_rtl.BayrellList";
    }
    constructor(){
        super();
        this._first = null;
        this._last = null;
    }
    _clone(){
        var new_list = new BayrellList();
        var next = this._first;
        while (next != null) {
            new_list.addLast(rtl.clone(next._data));
            next = next._next;
        }
        return new_list;
    }
    first(){
        return this._first;
    }
    last(){
        return this._last;
    }
    _before_delete(){
        var cur = this._first;
        var next = this._first;
        while (next != null) {
            next = next._next;
            cur._del();
            cur = next;
        }
    }
    addFirst(data){
        var item = new BayrellListItem();
        item._data = data;
        item._next = this._first;
        if (this._first != null) {
            this._first._prev = item;
        }
        this._first = item;
        if (this._last == null) {
            this._last = item;
        }
    }
    addLast(data){
        var item = new BayrellListItem();
        item._data = data;
        item._prev = this._last;
        if (this._last != null) {
            this._last._next = item;
        }
        this._last = item;
        if (this._first == null) {
            this._first = item;
        }
    }
    addListFirst(list){
        if (this._first != null) {
            this._first._prev = list._last;
        }
        list._last._next = this._first;
        this._first = list._first;
        if (this._last == null) {
            this._last = list._last;
        }
    }
    addListLast(list){
        if (this._last != null) {
            this._last._next = list._first;
        }
        list._first._prev = this._last;
        this._last = list._last;
        if (this._first == null) {
            this._first = list._first;
        }
    }
    getData(){
        var arr = [];
        var next = this._first;
        while (next != null) {
            rtl.array_push(arr, next._data);
            next = next._next;
        }
        return arr;
    }
}
module.exports.BayrellList = BayrellList;
