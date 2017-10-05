"use strict;"
/*
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
 */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellXML extends BayrellObject {
    getClassName(){
        return "bayrell_rtl.BayrellXML";
    }
    constructor(){
        super();
    }
    static xml2json(xml){
    }
    /*
	 * ������ xml
	 */
    static buildXml(xml_list, data, level){
        var childs = rtl.attr(
            data,
            "childs",
            []
        );
        var name = rtl.attr(data, "name", "");
        var value = rtl.attr(data, "value", "");
        var attrs = rtl.attr(
            data,
            "attrs",
            {}
        );
        /* ������ ���� */
        var s_tag = "<" + rtl.toString(name);
        /* ������ �������� */
        var s;
        var _res = [];
        for (var key in attrs){
            var val = attrs[key];
            /* ����������� �������� */
            s = rtl.html_escape(rtl.trim(val));
            rtl.array_push(_res, key + "='" + rtl.toString(s) + "'");
        }
        var s_attrs = rtl.implode(" ", _res);
        if (s_attrs != "") {
            s_tag += rtl.toString(" " + rtl.toString(s_attrs));
        }
        var sz = rtl.count(childs);
        if (sz > 0) {
            /* ��������� ��������� */
            s_tag += ">";
            /* ��������� ������ ���� */
            xml_list.addStringLast(s_tag, level);
            for (var i = 0; i < sz; i++) {
                BayrellXML.buildXml(xml_list, childs[i], level + 1);
            }
            /* ��������� ����� ���� */
            xml_list.addStringLast("</" + rtl.toString(name) + ">", level);
        }
        else if (value != "") {
            /* ��������� ��������� */
            s_tag += rtl.toString(">" + rtl.toString(value) + "</" + rtl.toString(name) + ">");
            /* ��������� ������ ���� */
            xml_list.addStringLast(s_tag, level);
        }
        else {
            /* ��������� ��������� */
            s_tag += "/>";
            /* ��������� ��� */
            xml_list.addStringLast(s_tag, level);
        }
    }
    /*
	 * ������������ data � xml
	 * @param {json} data - XML ������ � json ����
	 * @return {string} xml ������
	 */
    static json2xml(data, clr, indent){
        if (!rtl.exists(clr)){clr = null;}
        if (!rtl.exists(indent)){indent = null;}
        var xml_list = new BayrellStringList();
        if (!rtl.exists(clr)) {
            clr = rtl.CLR;
        }
        if (!rtl.exists(indent)) {
            indent = rtl.INDENT;
        }
        xml_list.setClr(clr);
        xml_list.setIndent(indent);
        xml_list.addStringLast("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
        BayrellXML.buildXml(xml_list, data, 0);
        return xml_list.getString();
    }
}
module.exports.BayrellXML = BayrellXML;
