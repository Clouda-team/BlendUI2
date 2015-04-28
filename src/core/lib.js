/**
 * @file lib.js
 * @desc 工具性类库;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} lib 工具类库
 */

define(function () {
    var lib = {};

    /**
     * 复制配置到指定的对象.
     * @param {Object} receiver 属性的继承者
     * @param {Object} supplier 属性的来源
     * @return {Object} returns obj
     */
    lib.extend = function (receiver, supplier) {

        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
        return receiver;

    };

    // 空函数
    lib.noop = function () {};

    /**
     * 对象类型数据循环
     * @param {Object} object,要循环的数据
     * @param {Function} fn,循环回调回调参数依次为 key, valye, object本身，如果回调返回值为空侧停止；
     * @param {Object} scope,函数命名空间，可为空
     */
    lib.each = function (object, fn, scope) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope || object, property, object[property], object) === false) {
                    return;
                }
            }
        }
    };

    /**
     * 判断函数是否是类结构体
     * @param {Function} fn,判断的函数
     * @return {boolean} 是否是函数结构体
     */
    lib.isClass = function (fn) {
        return typeof fn === 'function' && (fn.prototype && fn === fn.prototype.constructor);
    };

    /**
     * 中杠形式的字符串转化为驼峰形式;
     * @param {string} str 要转换的字符串
     * @return {string} 转化后的字符串值
     */
    lib.toCamel = function (str) {
        str = str || '';
        str = str.replace(/-([a-z])/gi, function (a, s) {
            return s.toUpperCase();
        });
        return str;
    };

    /**
     * 字符串转化为pascal形式;
     * @param {string} str 要转换的字符串
     * @return {string} 转化后的字符串值
     */
    lib.toPascal = function (str) {
        str = lib.toCamel(str);
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    };

    /**
     * 事件type中常用，去除前面on并把 on后首字母变为小写
     * @param {string} str,要处理的字符串
     * @return {string} 转化后的字符串
     */
    lib.cutOn = function (str) {
        if (str.indexOf('on') === 0) {
            str = str.slice(2);
            str = str.charAt(0).toLowerCase() + str.slice(1);
        }
        return str;
    };

    /**
     * 日期格式化
     * @param {Date} date 要格式化的日期
     * @param {string} fmt 格式化字符串
     * @return {string} 转化后的日期
     */
    lib.dateFormat = function (date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                if (RegExp.$1.length === 1) {
                    fmt = fmt.replace(RegExp.$1, o[k]);
                }
                else {
                    fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
        }
        return fmt;
    };

    /**
     * 生成唯一的id 标识;
     * @param {string} prefix 标识前缀
     * @return {string} 标识字符串值
     */
    var idCounter = 0;
    lib.uniqueId = function (prefix) {
        var id = '_' + (++idCounter);
        return (prefix || 'UNIQUEID') + id;
    };

    // webview ua
    var ua = navigator.userAgent.toLowerCase();

    // 是否是android
    lib.isAndroid = ua.indexOf('android') !== -1;

    // 是否是iphone
    lib.isIphone = ua.indexOf('iphone') !== -1;

    // 是否是uix环境，是的化返回uix的版本号
    var isUIX = lib.isUIX = (function () {
        var v = ua.match(/uix\/(\d+\.\d+\.\d+\.\d+)/);
        return v ? v[1] : '';
    })();

    /**
     * uix ready 事件, native环境的ready事件
     * @param {Function} fn,ready 后触发的函数
     */
    lib.ready = function (fn) {
        if (isUIX) {
            if (window.lc_bridge) {
                fn();
            }
            else {
                document.addEventListener('uixready', fn, false);
            }
        }
        else {
            fn();
            console && console.warn('非Naitve Uix环境');
        }
    };
    return lib;
});
