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

    // widgetList里的组件；
    var widgetList = config.widgetList;

    var nativeApi = {};
    /**
     * 调用native入口封装 @inner;
     * @private
     * @param {string} method,实例 id
     * @param {Array} args 接口参数
     * @return {object|null} 接口调用返回值
     */
    var _execute = function (method, args) {
        try {
            var api = window.uix_bridge;
            return api[method].apply(api, args);
        }
        catch (e) {
            // 接口异常
            console && console.log('Api_Error:' + method);
            console && console.log(e);
        }
    };

    // 记录全局config数据传输给native
    var nativeData = {};
    // 截流
    var timeVal = null;
    /**
     * 创建布局组件方法 @inner
     *
     * @param {string} name 组件类型，此接口支持widgetList里的组件
     * @param {Object} options 组件数据;
     * {
     *    style:{},
     *    items:{},
     * }
     */
    var setDecoration = function (name, options) {
        if (options) {
            nativeData[name] = options;
        }
        else {
            delete nativeData[name];
        }
        if (timeVal) {
            clearTimeout(timeVal);
        }
        timeVal = setTimeout(function () {
            if (debug) {
                console.log(nativeData);
            }
            _execute('UIXSetDecorationNoCache', [
                JSON.stringify(nativeData)
            ]);
        });
    };

    /**
     * 调用组件进行显示 @inner
     * @param {string} name 组件类型,此接口支持componentList里的组件
     * @param {Object} options 组件支持数据，详细见 doc/ui-widget.md文档
     */
    var showComponent = function (name, options) {
        if (timeVal) {
            clearTimeout(timeVal);
        }
        timeVal = setTimeout(function () {
            if (debug) {
                console.log(options);
            }
            _execute('UIXShow', [
                name,
                JSON.stringify(options)
            ]);
        });
    };

    // 组件调用接口的封装
    nativeApi.render = function (name, options) {
        if (!widgetList[name]) {
            console.log('不支持:' + name + '组件');
            return;
        }
        var widgetType = widgetList[name].type;
        var nativeName = widgetList[name].nativeName;
        if (widgetType === 1) {
            setDecoration(nativeName, options);
        }
        else if (widgetType === 2) {
            showComponent(nativeName, options);
        }
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
        return _execute('UIXSetProperty', [
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
            _execute('postMessage', [
                type,
                message
            ]);
        }
        else {
            _execute('postMessage', [
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
        _execute('exeJsRemote', [
            webViewId,
            script
        ]);
    };


    /**
     * @todo 需增加返回naitve 支持的list列表
     * @return {Array} 支持列表数组;
     */
    nativeApi.getWidgetList = function () {
        var api = window.uix_bridge;
        var widgets = api.getWidgetList ? api.getWidgetList() : Object.keys(widgetList);
        return widgets;
    };

    /**
     * 操作native接口如 action api, 数据修改等等；
     * @param {string} type,要执行的操作类型，如button_action,widget;
     * @param {Object} options 操作传递的数据
     */
    nativeApi.dataHook = function (type, options) {
        if (debug) {
            console.log(type, options);
        }
        _execute('UIXEvent', [
            type,
            JSON.stringify(options)
        ]);
    };

    /**
     * 调用action接口UIXActionHub('navi')
     * @param {string} ac,执行的动作暂仅仅支持 back:返回，navi:调起navigation,share:调起分享组件
     */
    nativeApi.execAction = function (ac) {
        nativeApi.dataHook('button_action', {
            option: 'action(' + ac + ')'
        });
    };



    /**
     * 调用接口用新 active 打开
     * @param {string} url,要打开的新url地址
     */
    nativeApi.open = function (url) {
        nativeApi.dataHook('button_action', {
            option: 'loadurl(' + url + ')'
        });
    };

    return nativeApi;
});
