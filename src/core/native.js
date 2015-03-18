/**
 * 底层NativeApi,UIX环境下的内部API
 * @class NativeApi
 * @singleton
 */

define(function(){
    var nativeApi = {};
    var bridge = window.lc_bridge;

    /**
     * 渲染组件方法
     * @param options
     */
    nativeApi.render = function(options) {
        if(options.debug){
            console.log(JSON.stringify(options));
        }
        if(typeof options !== 'string'){
            options = JSON.stringify(options);
        }
        bridge.UIXSetDecoration(options);
    };

    /**
     * 调用组件
     * @param {string} type 组件类型 [gallery |dialog | finished]
     * @param {object | string} options
     */
    nativeApi.widget = function(type, options){
        if(typeof options !== 'string'){
            options = JSON.stringify(options);
        }
        Bridge.UIXShow(type, options);
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
        Bridge.UIXSetProperty(id, options);
    };

    /**
     * 向指定的页面发送消息
     * @param {string} webViewId
     * @param {string} type
     * @param {object | string} message
     */
     nativeApi.postMessage = function(webViewId, type, message){
        if(typeof message !== 'string'){
            message = JSON.stringify(message);
        }
        Bridge.postMessage(webViewId, type, message);
     };

    /**
     * 在指定的页面中执行js代码
     * @param {string} webViewId 页面id
     * @param {string} script js脚本
     */
    nativeApi.execScript = function(webViewId, script){
        Bridge.exeJsRemote(webviewid, script);
    };

    
    /**
     * @ method nativeApi.getWidgetList
     * @param   no parameter
     */
    nativeApi.getWidgetList = function(){
        var widgetList = ["title","tab","navigation","toolbar"];
        return Bridge.UIXGetWidgetList?Bridge.UIXGetWidgetList():widgetList;  
    };
    return nativeApi;
});
