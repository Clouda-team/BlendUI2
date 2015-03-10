/**
 * 底层NativeApi,UIX环境下的内部API
 * @class NativeApi
 * @singleton
 */

define(function(){
    var NativeApi, Bridge;

    if(!Blend.global.lc_bridge){
        throw new Error("lc_bridge不存在");
    }else{
        Bridge = lc_bridge;
    }

    NativeApi = {};

    Blend.apply(NativeApi,{
        /**
         * 渲染widget组件
         * @param options
         */
        render : function(options){
            if(typeof options !== 'string'){
                options = JSON.stringify(options);
            }
            Bridge.UIXSetDecoration.call(this, options);
        },

        /**
         * 调用组件
         * @param {string} type 组件类型 [gallery |dialog | finished]
         * @param {object | string} options
         */
        widget : function(type, options){
            if(typeof options !== 'string'){
                options = JSON.stringify(options);
            }
            Bridge.UIXShow(type, options);
        },

        /**
         * 通过id局部修改组件
         * @param {string} id
         * @param {object | string} option
         */
        setPropertyById : function(id, option){
            if(typeof options !== 'string'){
                options = JSON.stringify(options);
            }
            Bridge.UIXSetProperty(id, options);
        },

        /**
         * 向指定的页面发送消息
         * @param {string} webViewId
         * @param {string} type
         * @param {object | string} message
         */
        postMessage: function(webViewId, type, message){
            if(typeof message !== 'string'){
                message = JSON.stringify(message);
            }
            Bridge.postMessage(webViewId, type, message);
        },

        /**
         * 在指定的页面中执行js代码
         * @param {string} webViewId 页面id
         * @param {string} script js脚本
         */
        execScript: function(webViewId, script){
            Bridge.exeJsRemote(webviewid, script);
        }
    });

    return NativeApi;
});
