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
        bridge.UIXShow(type, options);
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
        bridge.UIXSetProperty(id, options);
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
             bridge.postMessage(type, message);
         }
         else {
             bridge.postMessage(webViewId, type, message);
         }
     };

    /**
     * 在指定的页面中执行js代码
     * @param {string} webViewId 页面id
     * @param {string} script js脚本
     */
    nativeApi.execScript = function(webViewId, script){
        bridge.exeJsRemote(webviewid, script);
    };

    /**
     * 判断是否是uix native环境
     * @returns {boolean}
     */
    nativeApi.isEnv = function () {
        if (bridge) {
            return true;
        }
        return false;
    };

    return nativeApi;
});
