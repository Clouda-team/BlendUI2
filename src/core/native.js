/**
 * @file native.js
 * @desc 对native接口进行封装;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} native对象
 */

define([
    './config'
], function (config) {

    // debug 开关
    var debug = config.debug;

    // widgetList里的组件,调用UIXSetDecorationNoCache接口；
    var widgetList = config.widgetList;

    // componentList里的组件,调用UIXShow接口；
    var componentList = config.componentList;

    var nativeApi = {};
    /**
     * 调用native入口封装 @inner;
     * @private
     * @param {string} method,实例 id
     * @param {Array} args 接口参数
     * @return {object|null} 接口调用返回值
     */
    var _callApi = function (method, args) {
        try {
            var api = window.lc_bridge;
            return api[method].apply(api, args);
        }
        catch (e) {
            // 接口异常
            console && console.log('Api_Error:' + method);
            console && console.log(e);
        }
    };

    // 记录全局
    var config = {};
    var timeVal = null;
    /**
     * 创建布局组件方法 @inner
     *
     * @param {string} type 组件类型，此接口支持widgetList里的组件
     * @param {Object} options 组件数据;
     * {
     *    style:{},
     *    items:{},
     * }
     * @return {null} 接口返回值
     */
    var setDecoration = function (type, options) {
        var config = {};
        if (options) {
            type = type === 'navigation' ? 'navi' : type;
            config[type] = options;
        }
        else {
            delete config[type];
        }

        if (debug) {
            console.log(config);
        }
        return _callApi('UIXSetDecorationNoCache', [
            JSON.stringify(config)
        ]);
    };

    /**
     * 调用组件进行显示 @inner
     * @param {string} type 组件类型,此接口支持componentList里的组件
     * @param {Object} options 组件支持数据，详细见 doc/ui-widget.md文档
     * @return {Object} 接口返回数据
     */
    var showComponent = function (type, options) {
        if (debug) {
            console.log(options);
        }
        return _callApi('UIXShow', [
            type,
            JSON.stringify(options)
        ]);
    };

    // 组件调用接口的封装
    nativeApi.render = function (type, options) {
        if (timeVal) {
            clearTimeout(timeVal);
        }
        timeVal = setTimeout(function () {
            if (widgetList.indexOf(type) > -1) {
                setDecoration(type, options);
            }
            else if (componentList.indexOf(type) > -1) {
                showComponent(type, options);
            }
        });
    };

    /**
     * 通过id修改组件 item项内容；
     * @param {string} id，item的id;
     * @param {Object} options，item的数据项，详见 doc/ui-widget.md item项描述
     * @return {Object} 修改后naitve 返回的内容;
     */
    nativeApi.setPropertyById = function (id, options) {
        if (typeof options !== 'string') {
            options = JSON.stringify(options);
        }
        return _callApi('UIXSetProperty', [
            id,
            options
        ]);
    };

    /**
     * 向指定的页面发送消息
     * @param {string} webViewId 页面应用id
     * @param {string} type 事件类型
     * @param {Object | string} message 消息数据
     */
    nativeApi.postMessage = function (webViewId, type, message) {
        if (!message) {
            message = type;
            type = webViewId;
            webViewId = null;
            _callApi('postMessage', [
                type,
                message
            ]);
        }
        else {
            _callApi('postMessage', [
                webViewId,
                type,
                message
            ]);
        }
    };

    /**
     * 在指定的页面中执行js代码
     * @param {string} webViewId 页面id
     * @param {string} script js脚本
     */
    nativeApi.execScript = function (webViewId, script) {
        _callApi('exeJsRemote', [
            webViewId,
            script
        ]);
    };


    /**
     * @todo 需增加返回naitve 支持的list列表
     * @return {Array} 支持列表数组;
     */
    nativeApi.getWidgetList = function () {
        var api = window.lc_bridge;
        var widgets = api.getWidgetList ? api.getWidgetList() : widgetList.concat(componentList);
        return widgets;
    };

    return nativeApi;
});
