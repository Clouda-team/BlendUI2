/**
 * @file Calendar.js
 * @desc Calendar 基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return { Class } Calendar构造函数
 */
define([
    '../core/Class',
    './Widget',
    '../core/native',
    '../core/lib'
], function (classFactory, Widget, nativeApi, lib) {

    // 事件触发
    document.addEventListener('UIXEvent', function (e) {
        var data = JSON.parse(e.data);
        if (data.type === 'calendar' && data.id) {
            var obj = classFactory.get(data.id);
            var date = lib.dateFormat(new Date(parseInt(data.date, 10)), obj.get('dateFormat'));
            data.date = date;
            obj.fire('selected', [e, date]);
        }
    });

    // Calendar显示隐藏封装
    var loadingShowHide = function (isshow, options) {
        nativeApi.dataHook('widget', {
            type: 'calendar',
            options: {
                display: isshow,
                options: options || {}
            }
        });
    };

    /**
     * @class
     * @alias module:Calendar
     */
    var Calendar = classFactory.create({
        type: 'calendar',
        /**
         * Calendar对象 初始化方法
         * @param {Object} options 初始化设置
         * @param {string} options.date 处于焦点的日期,默认为当前日期；
         * @param {string} options.from 显示日期最大范围,默认为null
         * @param {string} options.to 显示日期最小范围,默认为null
         * @param {sring} options.maxDate 可选日期最大范围,默认为null
         * @param {string} options.dateFormat 返回日期格式, 默认为'yyyy-MM-dd'
         * @param {string} options.minDate 可选日期最小范围,默认为null
         * @param {Function} options.onselect 选之后触发函数
         * @return {Item} Item实例；
         */
        init: function (options) {
            var _default = {
                date: new Date() * 1,
                dateFormat: 'yyyy-MM-dd',
                from: null,
                to: null,
                maxDate: null,
                minDate: null
            };
            options = lib.extend(_default, options);
            this._setOptions(options);
            return this;
        },
        /**
         * 对用户初始化输入格式;
         * @private
         * @param {Object} options 用户输入的初始值；
         * @return {Class} 原对象
         */
        _setOptions: function (options) {
            options = options || {};
            for (var k in options) {
                if (options.hasOwnProperty(k)) {
                    if (k.indexOf('on') === 0) {
                        this.bind(lib.cutOn(k), options[k]);
                    }
                    else if (typeof options[k] !== 'function') {
                        var v =  options[k];
                        if(['date', 'from', 'to', 'maxDate', 'minDate'].indexOf(k) > 0 && typeof(v) === 'string' ){
                            //alert(new Date(k) * 1);
                            v = (new Date(v) * 1) || null;
                        }
                        this.set(k, v);
                    }
                    else {
                        this[k] = options[k];
                    }
                }
            }
            return this;
        },

        /**
         * 绑定 action 点击事件函数;
         * @param {string} type 事件类型;
         * @param {Function} fn 绑定的函数或者固定常量；
         * @return {Item} Item 对象
         */
        bind: function (type, fn) {
            this.on(type, fn);
            return this;
        },

        /**
         * 解绑选择事件;
         * @param {string} type 事件类型
         * @param {Function} fn 绑定的函数；
         * @return {Item} Item 对象
         */
        unbind: function (type, fn) {
            this.off(type, fn);
            return this;
        },

        /**
         * 显示组件
         */
        show: function () {
            var t = this;
            var options = {
                date: t.get('date'),
                from: t.get('from'),
                to: t.get('to'),
                minDate: t.get('minDate'),
                maxDate: t.get('maxDate'),
                id: t.id
            };
            loadingShowHide(true, options);
        },

        /**
         * 隐藏loading组件
         */
        hide: function () {
            loadingShowHide(false);
        }
    });
    return Calendar;
});
