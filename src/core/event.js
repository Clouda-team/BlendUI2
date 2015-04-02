/**
 * @file event.js
 * @desc native通信事件封装
 * @author gaotianyi
 */
define([
    './lib',
    './native'
], function (lib, native) {

    /**
     * 事件机制
     * @module event
     */
    var event = {};

    // 缓存事件
    var handlers = {};
    /**
     * blend添加事件监听的方法
     * @param {string} type 事件类型
     * @param {Function} callback 事件监听器
     * @param {boolean} useCapture 是否捕获类型
     */
    var addEventListener = (function () {
        if (lib.isUIX) {
            return function (type, callback, useCapture) {
                var data = {
                    type: type
                };
                native.postMessage('event_register', data);
                document.addEventListener(type, callback, useCapture);
            };
        }
        return function (type, callback, useCapture) {
            document.addEventListener(type, callback, useCapture);
        };
    })();

    var removeEventListener = (function () {
        if (lib.isUIX) {
            return function (type, callback, useCapture) {
                var data = {
                    type: type
                };
                native.postMessage('event_unregister', data);
                document.removeEventListener(type, callback, useCapture);
            };
        }
        return function (type, callback, useCapture) {
            document.removeEventListener(type, callback, useCapture);
        };
    })();

    var fire = (function () {
        if (lib.isUIX) {
            return function (type, message) {
                var data = {
                    type: type,
                    message: message
                };
                native.postMessage('delegate', data);
            };
        }
        return function (type, message) {
            var event = document.createEvent('Event');
            event.initEvent(type, true, true);
            event.data = message;
            document.dispatchEvent(event, message);
        };
    })();

    /**
     * 事件绑定
     * @param {string} type 事件类型
     * @param {Function} handler 事件监听处理器
     */
    event.on = function (type, handler) {
        if (handlers[type]) {
            handlers[type].listener.push({
                callback: handler,
                context: null
            });
            if (!handlers[type].listened) {
                addEventListener(type, handlers[type].callback, false);
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
                removeEventListener(type, handlers[type].callback, false);
                handlers[type].listened = false;
                handlers[type].listener.length = 0;
            }
            else {
                var listeners = handlers[type].listener;
                var index;
                index = listeners.indexOf(handler);
                listeners.splice(index, 1);
                if (listeners.length === 0 && handlers[type].listened) {
                    removeEventListener(type, handlers[type].callback);
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
        fire(type, data);
    };

    return event;
});
