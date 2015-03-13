/**
 * @file event.js
 * @author clouda-team
 */
define(['./native'], function (native) {

    /**
     * 事件机制
     * @module event
     */
    var event = {};
    var handlers = {};
    var _types = ['uixready', 'webview_register', 'webview_unregister', 'UIXClick'];

    /**
     * 事件绑定
     * @param {string} type 事件类型
     * @param {Function} handler 事件监听处理器
     */
    event.on = function (type, handler) {
        if (handlers[type]) {
            native.postMessage('event_register', type);
            handlers[type].listener.push({
                callback: handler,
                context: null
            });
            if (!handlers[type].listened) {
                document.addEventListener(type, handlers[type].callback, false);
                handlers[type].listened = true;
            }
        }
        else {
            handlers[type] = {};
            handlers[type].listener = [];
            handlers[type].callback = function (event) {
                var listeners = handlers[type].listener;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].callback.call(listeners[i].context, event);
                }
            };
            this.on(type, handler);
        }
    };

    /**
     * 事件解绑
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理器
     * @param {Object} context 事件上下文环境
     */
    event.off = function (type, handler, context) {
        context = context || this;
        if (handlers[type]) {
            if (!handler) {
                document.removeEventListener(type, handlers[type].callback);
                handlers[type].listened = false;
                handlers[type].listener.length = 0;
            }
            else {
                var listeners = handlers[type].listener;
                var index;
                index = listeners.indexOf(handler);
                listeners.splice(index, 1);
                if (listeners.length === 0 && handlers[type].listened) {
                    document.removeEventListener(type, handlers[type].callback);
                    native.postMessage('event_unregister', type);
                    handlers[type].listened = false;
                }
            }
        }
    };

    /**
     * 触发事件
     * @param {string} type 事件类型
     * @param {Object} data 触发事件传递的data数据
     */
    event.fire = function (type, data) {
        if (typeof data !== 'object') {
            data = {data: data};
        }
        if (handlers[type] || _types.indexOf(type) > 0) {
            data.type = type;
            setTimeout(function () {
                native.postMessage('delegate', data);
            });
        }
    };

    return event;
});
