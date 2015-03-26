/**
 * @file Class.js
 * @desc 类工厂方法;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Function} 工程类函数
 */

define([
    './lib'
], function (lib) {
    var noop = lib.noop;
    var extend = lib.extend;

    // Object.create
    if (!Object.create) {
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw new Error('Object.create implementation only accepts the first parameter.');
            }
            function F() {
            }
            F.prototype = o;
            return new F();
        };
    }

    /**
     * 类生成系统方法;
     * @param {Object} data 组件配置数据
     * {
        statics:{},生成系统静态属性或者方法
        events:{
            'type':callback
        },生成对象事件,
        attributes:{},动态属性
        method: function(){}, 系统的动态方法
     }
     * @return {Function}
     */
    var createClass = function (data) {
        var parent = data.extend || noop;
        var attributes = data.attributes || {};
        var events = data.events || {};
        var statics = data.statics || {};
        delete data.attributes;
        delete data.events;
        delete data.statics;
        delete data.extend;

        // 初始化函数
        function Constructor(options) {
            this._listener = [];
            // 把事件复制到实例中；
            for (var k in events) {
                if (events.hasOwnProperty(k)) {
                    this._listener[k] = [];
                    this._listener[k].push(events[k]);
                }
            }
            // 把基类的 attributes 复制到实例中；
            this.attributes = extend({}, attributes);
            this.id = (options && options.id) || lib.uniqueId('CLASSID');
            this.init && this.init.apply(this, arguments);
        }

        // 原型链继承
        var proto = Constructor.prototype = Object.create(parent.prototype);
        proto.constructor = Constructor;
        proto.Super = Constructor.Super = parent.prototype;
        Constructor.Parent = parent;
        // 添加类中公共方法
        extend(proto, {
            set: function (key, val) {
                if(this["_set"+lib.toPascal(key)]){
                    var opt ={};
                    opt[key] = val;
                    this["_set"+lib.toPascal(key)](opt);
                } else if (this.attributes[key] !== val) {
                    this._previousAttributes = extend({}, this.attributes);
                    if (typeof this.attributes[key] === 'object') {
                        extend(this.attributes[key], val);
                    }
                    this.attributes[key] = val;
                    this.fire('change:' + key, [
                        key
                    ]);
                    this.fire('change', [
                        key
                    ]);
                }
            },
            get: function (key) {
                return this.attributes[key];
            },
            on: function (type, callback) {
                var t = this;
                if (!t._listener[type]) {
                    t._listener[type] = [];
                }
                t._listener[type].push(callback);
            },
            fire: function (type, argAry, context) {
                var events = this._listener[type];
                var i;
                var len;
                if (!type) {
                    throw new Error('未指定事件名');
                }
                context = context || this;
                if (events) {
                    for (i = 0, len = events.length; i < len; i++) {
                        events[i].apply(context, argAry);
                    }
                }
            },
            off: function (type, callback) {
                var events = this._listener[type];
                // 如果 type=== all,删除类下面全部事件；
                if (type === 'all') {
                    this._listener = [];
                    return;
                }
                if (!events) {
                    return;
                }
                if (!callback) {
                    delete this._listener[type];
                    return;
                }
                events.splice(events.indexOf(callback), 1);
                if (!events.length) {
                    delete this._listener[type];
                }
            }

        });

        // 类的静态属性和方法;
        extend(Constructor, statics);
        // data中剩余属性或者方法
        extend(proto, data);

        return Constructor;
    };

    return createClass;
});