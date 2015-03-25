/**
 * @file Style.js
 * @desc 样式基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Function} Style 类
 */

define([
    '../core/Class',
    '../core/lib'
], function (Class, nativeApi, lib) {

    // 统一处理颜色值;
    var _naitveColor = function (color, opacity) {
        var opacity = opacity || 1;
        var color = color || '#000000';
        var color = color.indexOf('#')===0? color.slice(1) : color;
        opacity = Math.ceil(opacity * 0xff).toString(16);
        if(color.length === 3){
            color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
        }
        return  '#'+ opacity + color;
    };


    var Style = Class({
        /**
         * style对象 初始化方法
         * @param {Object} options 初始化设置
         * @param {Object} options.data 用户传人的值；
         * @param {Object} options.instance style的附属实例；
         * {
         *      data:{
                    color:'#xxxx',
                    opacity:0~1,背景透明度
                    background-color:'#xxxxxx'
                },
                instance: widget|item 实例
         * }
         * @return {Object} style实例；
         */
        init: function (options) {
            var t = this;
            this.config = {};
            this._setOptions(options);
            return this;
        },

        // 绑定事件
        events:{
            // data 属性改变会触发进行解析极其触发render
            'change': function (key) {
                if (this['_parse' + lib.toPascal(key)]) {
                    this['_parse' + lib.toPascal(key)]( key );
                }
                else {
                    this.config[k] = this.get(k);
                    console.log('还不支持此属性');
                }
                this.render();
            }
        },

        _setOptions: function (options) {
            var data = options.data || {};
            this.instance = options.instance;
            this.parentConfig = this.instance.config;
            this.parentConfig.style = this.config;
            for(var k in data){
                if (data.hasOwnProperty(k)) {
                    this.set(k, data[k]);
                }
            }
        },

        /**
         * 解析配置中的字体颜色
         * @private
         */
        _parseColor: function () {
            var color = this.get('color');
            var opacity = this.get('opacity');
            this.config.color = _naitveColor(color, opacity);
            return this;
        },

        /**
         * 解析配置中的背景颜色
         * @private
         */
        _parseBackgroundColor: function () {
            var color = this.get('background-color');
            var opacity = this.get('opacity');
            this.config.backgroundColor = _naitveColor(color, opacity);
            return this;
        },


        /**
         * 渲染组件
         * @return {Class} 类实例;
         */
        render: function () {
            // 触发实例的 render;
            this.instance.render();
            this.fire('render');
            return this;
        },

        /**
         * 销毁实例
         * @return {Class} 类实例;
         */
        destroy: function () {
            // 把节点从主链上去除;
            delete this.parentConfig.style;
            this.fire('destroy');
            return this;
        }
    });

    return Style;
});
