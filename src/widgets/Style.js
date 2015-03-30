/**
 * @file Style.js
 * @desc 样式基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Function} Style 类
 */

define([
    '../core/Class',
    '../core/lib'
], function (Class, lib) {

    /**
     * 统一处理颜色值和透明度;
     * @param {string} 颜色值支持 rgb(),rgba(),#xxx,#xxxxxx，如果是 rgba设置的 opcity无效；
     * @param {number} 透明度0~1；
     * @return {string} Native 支持的颜色值:#+透明度(00~ff)+6位16进制颜色值(000000~ffffff)；
     */
    var _naitveColor = function (color, opacity) {
        var colors;
        opacity = opacity || 1;
        opacity = Math.ceil(opacity * 0xff).toString(16);
        color = color || '#000000';
        var toX = function ( str ){
            return ('00' + Number(str).toString(16)).substr(-2);
        };
        if (color.indexOf('#') === 0) {
            color = color.slice(1);
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
        }
        else if ((colors = color.match(/^[\s]*rgb[a]?\(([\,|\d]+)\)/i))) {
            colors = colors[1].split(',');
            if (colors[3]) {
                opacity = toX(colors[3]);
            }
            color = '';
            for (var i=0; i<3; i++ ) {
                color += toX(colors[i]);
            }
        }

        return '#' + opacity + color;
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
            this.config = {};
            this._setOptions(options);
            return this;
        },
        type: 'style',
        // 绑定事件
        events: {
            // data 属性改变会触发进行解析;
            change: function (key) {
                if (this['_parse' + lib.toPascal(key)]) {
                    this['_parse' + lib.toPascal(key)](key);
                }
                else {
                    this.config[key] = this.get(key);
                    console.log('还不支持此属性');
                }
                this.render();
            }
        },

        // 对用户设置的值初始化
        _setOptions: function (options) {
            options = options || {};
            var data = options.data;
            this.instance = options.instance;
            this.parentConfig = this.instance.config;
            this.parentConfig.style = this.config;
            data && this.update(data);
            return this;
        },

        /**
         * 解析配置中的opacity
         * @private
         */

        _parseOpacity: function () {
            this._parseColor();
            this._parseBackgroundColor();
            return this;
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
         * 更新 style的数据;
         */
        update:function (data) {
            data = data || {};
            for (var k in data){
                if (data.hasOwnProperty(k)) {
                    this.set(k, data[k]);
                }
            }
            return this;
        },

        /**
         * 渲染组件
         * @return {Class} 类实例;
         */
        render: function () {
            // 触发实例的 render;
            this.instance.render && this.instance.render();
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
