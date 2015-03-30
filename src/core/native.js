/**
 * @file Item.js
 * @desc Item 基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} native对象
 */

define(function () {
    var nativeApi = {};

    /**
     * 调用native入口封装 @inner;
     * @param {string} method,实例 id
     * @param {Array} args 接口参数
     * @return {object|null} 接口调用返回值
     */
    var _initApi = function (method, args) {
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

    /**
     * naitve渲染组件方法
     *
     * @param {Object} options，uix widget所需要的配置文件，文件格式见doc/uix-widget.md
     * @return {null} 接口返回值
     */
    nativeApi.render = function (options) {
        // debug 打开增加控制台日志
        if (options.debug) {
            console.log(options);
        }
        if (typeof options !== 'string') {
            options = JSON.stringify(options);
        }
        return _initApi('UIXSetDecoration', [
            options,
            false
        ]);
    };

    /**
     * 调用组件
     * @param {string} type 组件类型, 现在仅支持gallery |dialog | finished
     * @param {Object} options 组件支持数据，详细见 doc/ui-widget.md文档
     * @return {Object} 接口返回数据
     */
    nativeApi.show = function (type, options) {
        if (typeof options !== 'string') {
            options = JSON.stringify(options);
        }
        return _initApi('UIXShow', [
            type,
            options
        ]);
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
        return _initApi('UIXSetProperty', [
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
            _initApi('postMessage', [
                type,
                message
            ]);
        }
        else {
            _initApi('postMessage', [
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
        _initApi('exeJsRemote', [
            webViewId,
            script
        ]);
    };


    /**
     * @todo 需增加返回naitve 支持的list列表
     * @return {Array} 支持列表数组;
     */
    nativeApi.getWidgetList = function () {
        var widgetList = [
            'title',
            'tab',
            'navigation',
            'toolbar'
        ];
        var api = window.lc_bridge;
        return api.getWidgetList ? api.getWidgetList() : widgetList;
    };

    return nativeApi;
});
