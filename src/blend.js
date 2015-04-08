/**
 * @file blend.js
 * @desc Blend api;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} lib 系统静态方法
 * @param {Object} widgets 组件类型列表
 * @param {Object} event 事件对象
 * @return {Object} Blend对象
 */
define([
    './core/lib',
    './widgets',
    './core/event',
    './core/native'
], function (lib, widgets, event, nativeApi) {
    /**
     * Blend模块声明
     * @module blend
     */
    var blend = {};

    // action常量 @todo remove
    blend.ACTIVEBACK = 'back';
    blend.WIDGETNAVI = 'navi';
    blend.WIDGETSHARE = 'share';

    /**
     * widget组件创建
     * @param {string} name 组件名称
     * @param {Object} options 组件初始化参数
     * @return {Object|null} 组件对象如异常返回 null
     */
    blend.create = function (name, options) {
        var Widget = widgets[name];
        if (Widget && lib.isClass(Widget)) {
            return new Widget(options);
        }
        return null;
    };

    // 计算ready触发时间blend.initTime;
    var startTime = 1 * new Date();
    // 记录ready事件是否已经触发true||false;
    blend.readyState = false;
    var _readyFn = [];
    lib.ready(function () {
        blend.readyState = true;
        blend.initTime = (1 * new Date()) - startTime;
        _readyFn.forEach(function (v, k) {
            v();
        });
        _readyFn = [];
    });

    /**
     * runtime ready事件,是对native ready事件的封装
     * @param {Function} callback ready之后触发函数
     */
    blend.ready = function (callback) {
        if (blend.readyState) {
            callback();
        }
        else {
            _readyFn.push(callback);
        }
    };

    // 判断是否是native uix环境;
    blend.isUIX = lib.isUIX;

    // active返回
    blend.back = function () {
        nativeApi.execAction('back');
    };

    /**
     * 在新的active打开页面
     * @param {string} url,打开页面的url
     */
    blend.open = function (url) {
        nativeApi.open(url);
    };

    // webview的通信暴露到blend空间下
    lib.extend(blend, event);

    return blend;
});
