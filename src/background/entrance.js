/**
 * @file entrance.js
 * @desc uix native背景页环境,维护应用上下文环境,
 */
(function () {
    // 系统原生事件,新activity创建的时候触发webview_register事件, activity销毁的时候触发webview_unregister事件
    // var _events = ['webview_register', 'webview_unregister'];
    var bridge = window.lc_bridge;
    var webViews = {};
    var status = {
        ACTIVE: 1,
        PAUSED: 2,
        STOPPED: 3,
        KILLED: 0
    };
    // 监听activity webView创建事件
    document.addEventListener('webview_register', function (event) {
        if (!(event.origin in webViews)) {
            webViews[event.origin] = {
                origin: event.origin,
                status: status.ACTIVE,
                data: event.data
            };
        }
    });
    // 监听activity webView销毁事件
    document.addEventListener('webview_unregister', function (event) {
        if (event.origin in webViews) {
            delete webViews[event.origin];
        }
    });
    // 注册页面要监听的事件
    var events = {};
    document.addEventListener('event_register', function (event) {
        var data = JSON.parse(event.data);
        var type = data.type;
        var origin = event.origin;
        if (events[type]) {
            if (events[type].indexOf(origin) >= 0) {
                events[type].push(origin);
            }
        }
        else {
            events[type] = [origin];
        }
    }, false);
    // 移除要监听的事件
    document.addEventListener('event_unregister', function (event) {
        var data = JSON.parse(event.data);
        var type = data.type;
        var origin = event.origin;
        if (events[type]) {
            var index = events[type].indexOf(origin);
            events[type].splice(index, 1);
        }
    }, false);
    // 触发事件
    document.addEventListener('delegate', function (event) {
        var data = JSON.parse(event.data);
        var type = data.type;
        var message = JSON.stringify(data.message);
        if (events[type]) {
            for (var i = 0, len = events[type].length; i < len; i++) {
                bridge.postMessage(events[type][i], type, message);
            }
        }
    }, false);
})();
