/**
 * EasyUI for Angular 0.7
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var DateHelper=function(){function DateHelper(){}return DateHelper.prototype.parseSelections=function(format){for(var selections=[],start=0,end=0,_i=0,formatTokens_1=format.split(/[^A-Za-z]/);_i<formatTokens_1.length;_i++){var token=formatTokens_1[_i];token?(end+=token.length,selections.push([start,end]),end=start=end+1):(start++,end++)}return selections},DateHelper.prototype.parseDate=function(value,format){if(!value)return null;var formatTokens=format.split(/[^A-Za-z]/).filter(function(t){return t}),dateTokens=value.split(/[^A-Za-z0-9]/).filter(function(t){return t}),date=new Date;date.setHours(0),date.setMinutes(0),date.setSeconds(0),date.setMilliseconds(0);for(var parser={dd:function(value){return date.setDate(value)},d:function(value){return date.setDate(value)},MM:function(value){return date.setMonth(+value-1)},M:function(value){return date.setMonth(+value-1)},yyyy:function(value){return date.setFullYear(value)},yy:function(value){value=+value,value+=value+2e3-(new Date).getFullYear()<20?2e3:1900,date.setFullYear(value)},HH:function(value){return date.setHours(value)},H:function(value){return date.setHours(value)},mm:function(value){return date.setMinutes(value)},ss:function(value){return date.setSeconds(value)},SSS:function(value){return date.setMilliseconds(value)},SS:function(value){return date.setMilliseconds(value)},S:function(value){return date.setMilliseconds(value)}},i=0;i<formatTokens.length;i++){var formatToken=formatTokens[i],dateToken=dateTokens[i],f=parser[formatToken];f&&f(dateToken||0)}return date},DateHelper.prototype.formatDate=function(date,format){if(!date)return"";var formatN=function(value){return value<10?"0"+value:value},formatter={dd:function(){return formatN(date.getDate())},d:function(){return date.getDate()},MM:function(){return formatN(date.getMonth()+1)},M:function(){return date.getMonth()+1},yyyy:function(){return date.getFullYear()},yy:function(){return String(date.getFullYear()).substr(2,2)},HH:function(){return formatN(date.getHours())},mm:function(){return formatN(date.getMinutes())},ss:function(){return formatN(date.getSeconds())},SSS:function(){return formatN(date.getMilliseconds())},SS:function(){return formatN(date.getMilliseconds())},S:function(){return date.getMilliseconds()}};return format.replace(/dd|d|M{1,4}|yyyy|yy|HH|mm|ss|S{1,3}|E{3,4}/g,function(match,index){var f=formatter[match];return f?f():match})},DateHelper}();export{DateHelper};export var dateHelper=new DateHelper;