/**
 * @file blend.js
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
        var widget = widgets[name];
        if (widget) {
            if (lib.isClass(widget)) {
                return new widget(options);
            }
            else {
                widget(options);
            }
        }
        else {
            console.log("要创建widget不存在");
        }
    };

    // uix ready事件
    
    var startTime = 1* new Date();
    var _readyFn = [];
    lib.ready(function(){
        blend.readyState = true;
        blend.initTime = (1* new Date())-startTime;
        _readyFn.forEach(function(v,k){
            v();
        });
        _readyFn = [];
    });
    /**
     * runtime ready事件,是对native ready事件的封装
     * @param {Function} callback ready之后触发函数
     */
    blend.ready = function (callback) {
        if(blend.readyState){
            callback();
        }else{
            _readyFn.push(callback);
        }
    };
    // 判断是否是naitve环境
    blend.isUix = lib.isUix;

    lib.extend(blend, event);

    // 如果文件后加载uixready可能触发不了, 检测变量形式触发
    // @todo需要向naitve接口同学确认是否window.lc_bridge如果为真侧naitve接口就可以用了;
    
    return blend;
});
