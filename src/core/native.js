/**
 * 底层NativeApi,UIX环境下的内部API
 * @class NativeApi
 * @singleton
 */

define(function(){
    var nativeApi = {};

    var _initApi = function(method, args){
        try {
            var api = window.lc_bridge;
            return api[method].apply(api, args);
        }
        catch (e) {
            console.log('Api_Error:' + method);
            console.log(e);
        }
    }

    /**
     * 渲染组件方法
     * @param options
     */
    nativeApi.render = function(options) {
        if(options.debug) {
            console.log(JSON.stringify(options));
        }
        if(typeof options !== 'string'){
            options = JSON.stringify(options);
        }
        _initApi('UIXSetDecoration',[options,false]);
    };

    /**
     * 调用组件
     * @param {string} type 组件类型 [gallery |dialog | finished]
     * @param {object | string} options
     */
    nativeApi.widget = function(type, options){
        if (typeof options !== 'string') {
            options = JSON.stringify(options);
        }
        _initApi('UIXShow',[type, options]);
    };

    /**
     * 通过id局部修改组件
     * @param {string} id
     * @param {object | string} option
     */
    nativeApi.setPropertyById = function(id, options){
        if(typeof options !== 'string'){
            options = JSON.stringify(options);
        }
        _initApi('UIXSetProperty',[id, options]);
    };

    /**
     * 向指定的页面发送消息
     * @param {string} webViewId 页面应用id
     * @param {string} type 事件类型
     * @param {object | string} message 消息数据
     */
    nativeApi.postMessage = function (webViewId, type, message) {
         if (!message) {
             message = type;
             type = webViewId;
             webViewId = null;
             _initApi('postMessage',[type, message]);
         }
         else {
            _initApi('postMessage',[webViewId, type, message]);
         }
     };

    /**
     * 在指定的页面中执行js代码
     * @param {string} webViewId 页面id
     * @param {string} script js脚本
     */
    nativeApi.execScript = function(webViewId, script){
        _initApi('exeJsRemote',[webviewid, script]);
    };


    /**
     * @method nativeApi.getWidgetList
     * @param   no parameter
     */
    nativeApi.getWidgetList = function(){
        var widgetList = ["title","tab","navigation","toolbar"],
            api = window.lc_bridge;
        return api.getWidgetList?api.getWidgetList():widgetList;
    };
    
    return nativeApi;
});
