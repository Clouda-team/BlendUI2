/**
 * @file Style.js
 * @desc 样式基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Function} Style 类
 */

define([
    '../core/Class',
    '../core/lib'
], function (classFactory, lib) {

    /**
     * 统一处理颜色值和透明度,@inner;
     * @param {string} color 颜色值支持 rgb(),rgba(),#xxx,#xxxxxx，如果是 rgba设置的 opcity无效；
     * @param {number} opacity 透明度0~1；
     * @return {string} Native 支持的颜色值:#+透明度(00~ff)+6位16进制颜色值(000000~ffffff)；
     */
    var _naitveColor = function (color, opacity) {
        var colors;
        opacity = opacity || 1;
        opacity = Math.ceil(opacity * 0xff).toString(16);
        color = color || '#000000';
        var toX = function (str) {
            return ('00' + Number(str).toString(16)).substr(-2);
        };
        if (color.indexOf('#') === 0) {
            color = color.slice(1);
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
        }
        else if ((colors = color.match(/^[\s]*rgb[a]?[\s]*\(([\,\d\s]+)\)/i))) {
            colors = colors[1].split(',');
            if (colors[3]) {
                opacity = toX(colors[3]);
            }
            color = '';
            for (var i = 0; i < 3; i++) {
                color += toX(colors[i]);
            }
        }

        return '#' + opacity + color;
    };

    /**
     * Style结构函数
     * @class
     */
    var style = classFactory.create({

        /**
         * style对象 初始化方法
         * @param {Object} options 初始化设置
         * @param {Object} options.data 用户传人的值；
         * @param {Object} options.superId style的附属实例的id；
         * {
         *      data:{
                    color:'#xxxx',
                    opacity:0~1,背景透明度
                    background-color:'#xxxxxx'
                },
                superId: widget|item 实例
         * }
         * @return {Class} style实例；
         */
        init: function (options) {
            this.config = {};
            this._setOptions(options);
            return this;
        },

        // 类型标识
        type: 'style',

        // 类绑定的事件
        events: {
            /**
             * 设置属性值时触发;
             * @event Style set#change
             * @param {string} key 改变的属性；
             */
            change: function (key) {
                if (this['_parse' + lib.toPascal(key)]) {
                    this['_parse' + lib.toPascal(key)](key);
                }
                else {
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },

        /**
         * 对用户初始化输入格式;
         * @private
         * @param {Object} options 用户输入的初始值；
         * @return {Class} 原对象
         */
        _setOptions: function (options) {
            options = options || {};
            var data = options.data;
            this.superId = options.superId;
            if (classFactory.get(options.superId)) {
                this.parentConfig = classFactory.get(options.superId).config;
                this.parentConfig.style = this.config;
            }
            data && this.update(data);
            return this;
        },

        /**
         * 解析用户输入的透明度;
         * @private
         * @return {Class} 原对象
         */
        _parseOpacity: function () {
            this._parseColor();
            this._parseBackgroundColor();
            return this;
        },

        /**
         * 解析用户输入的颜色值;
         * @private
         * @return {Class} 原对象
         */
        _parseColor: function () {
            var color = this.get('color');
            var opacity = this.get('opacity');
            this.config.color = _naitveColor(color, opacity);
            return this;
        },

        /**
         * 解析用户输入的背景颜色
         * @private
         * @return {Class} 原对象
         */
        _parseBackgroundColor: function () {
            var color = this.get('backgroundColor');
            var opacity = this.get('opacity');
            this.config.backgroundColor = _naitveColor(color, opacity);
            return this;
        },

        /**
         * 更新style对象的数据;
         * @param {Object} data 样式数据
         * @return {Style} style原对象
         */
        update: function (data) {
            data = data || {};
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    this.set(lib.toCamel(k), data[k]);
                }
            }
            return this;
        },

        /**
         * 对象进行绑定到父层进行渲染;
         * @return {Style} 原对象
         */
        render: function () {
            // 触发实例的 render;
            if (classFactory.get(this.superId)) {
                classFactory.get(this.superId).render();
            }
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
            this.off('all');
            return this;
        }

    });

    return style;
});
