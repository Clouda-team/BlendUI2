/**
 * @file event.js
 * @desc Blend api;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} lib 系统静态方法
 * @param {Object} widgets 组件类型列表
 * @param {Object} event 事件对象
 * @return {Object} Blend对象
 */
define(['./core/lib', './widget', './core/event'], function (lib, widgets, event) {

    /**
     * Blend模块声明
     * @module blend
     */
    var blend = {};

    /**
     * widget组件创建
     * @param {string} name 组件名称
     * @param {Object} options 组件初始化参数
     * @return {Object} 组件对象
     */
    blend.create = function (name, options) {
        if (widgets[name]) {
            return new widgets[name](options);
        }
    };

    /**
     * runtime ready事件,是对native ready事件的封装
     * @param {Function} callback ready之后触发函数
     */
    blend.ready = function(callback) {
        var outTimeFun;
        var handler = function() {
            outTimeFun && clearTimeout(outTimeFun);
            if (/complete|loaded|interactive/i.test(document.readyState)) {
                callback(blend);
            }
            else {
                document.addEventListener('DOMContentLoaded', function() {
                    callback(blend);
                }, false);
            }
            document.removeEventListener('uixready', handler);
            blend.readyState = true;
        };
        if (blend.readyState ||  window.lc_bridge) {
            handler();
        }
        else {
            // 有的手机无法触发
            outTimeFun = setTimeout(handler, 200000);
            document.addEventListener('uixready', handler, false);
        }
    };

    // 如果文件后加载uixready可能触发不了, 检测变量形式触发
    // @todo需要向naitve接口同学确认是否window.lc_bridge如果为真侧naitve接口就可以用了;
    if(window.lc_bridge){
        blend.readyState = true;
    }

    return blend;
});
