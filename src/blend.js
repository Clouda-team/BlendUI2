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
    var Blend = {};

    /**
     * widget组件创建
     * @param {string} name 组件名称
     * @param {Object} options 组件初始化参数
     * @return {Object} 组件对象
     */
    Blend.create = function (name, options) {
        if (widgets[name]) {
            return new widgets[name](options);
        }
    };

    lib.extend(Blend, event);

    return Blend;
});
