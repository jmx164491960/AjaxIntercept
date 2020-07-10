// https://github.com/jmx164491960/AjaxIntercept
/* global require, module, window */
var Util = require('./ajaxIntercept/util')

var XHR
if (typeof window !== 'undefined') XHR = require('./ajaxIntercept/xhr')

/*!
    AjaxIntercept - 模拟请求
*/
var AjaxIntercept = {
    Util: Util,
    setup: function(settings) {
        return XHR.setup(settings)
    },
    _mocked: {}
}

AjaxIntercept.version = '1.0.0'

// 避免循环依赖
if (XHR) XHR.AjaxIntercept = AjaxIntercept

/*
    * AjaxIntercept.add( rurl, function(options) )
*/
AjaxIntercept.add = function(rurl, rtype, template) {
    if (arguments.length === 2) {
        template = rtype
        rtype = undefined
    }
    // 拦截 XHR
    if (XHR) window.XMLHttpRequest = XHR
    AjaxIntercept._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    }
    return AjaxIntercept
}

module.exports = AjaxIntercept