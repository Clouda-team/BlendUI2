/**
 * @file Item.js
 * @desc Item 基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return { Class } Item构造函数
 */

define([
    '../core/Class',
    './Style',
    '../core/lib'
], function (Class, Style, lib) {

    // var listenerTap = {};

    // var listenerOn = function (item, fn) {
    //     listenerTap[item.id] = listenerTap[item.id] || [];
    //     listenerTap[item.id].push(fn);
    // };

    // var listenerOff = function (item, fn) {
    //     var events = listenerTap[item.id];
    //     if (!fn) {
    //         delete listenerTap[item.id];
    //     }
    //     else {
    //         events.splice(events.indexOf(fn), 1);
    //     }
    // };

    document.addEventListener('UIXClick', function (e) {
        var data = e.data;
        var id = data.id;
        //if(listenerTap[id]){
            // for(var i=0, len=listenerTap[id].length; i< len; i++){
            //     listenerTap[id][i].call(Item.get(id), e);
            // }
        //}
        Item.get(id).fire('ontap');
    });

    var Item = Class({

        // 添加 item 的静态方法和属性；
        statics: {
            instance: {},
            get: function (id) {
                return Item.instance[id];
            },
            set: function (obj) {
                Item.instance[obj.id] = obj;
            },
            remove: function (obj) {
                delete Item.instance[obj.id];
            }
        },

        /**
         * item对象 初始化方法
         * @param {Object} options 初始化设置
         * @param {Object} options.data 传人的初始化值；
         * @param {Object} options.instance item的附属实例；
         * {
               data:{
                    style:{},
                    text:'',
                    image:'xx',
                },
                instance: widget|item 实例
         * }
         * @return {Object} style实例；
         */

        init: function (options) {
            this.config = {};
            this.inited = false;
            this._setOptions(options);
            Item.set(this);
        },
        type : 'item',

        // 全局事件
        events: {
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

        // 序列号初始化参数;

        _setOptions: function (options) {
            options = options || {};
            var data = options.data || {};
            this.instance = options.instance;
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    if (typeof data[k] !== 'function') {
                        this.set(k, data[k]);
                    }
                    else if(k === 'ontap'){
                        this.bind(data[k]);
                    }
                    else {
                        this[k] = data[k];
                    }
                }
            }
        },

        // 创建 style 实例
        _parseStyle: function () {
            if (!this.styleObj) {
                this.styleObj = new Style({
                    instance: this
                });
            }
            this.style();
        },

        // 处理action
        _parseAction: function( key ){
            var action;
            if (key === 'href') {
                action = 'loadurl(' + this.get('href') + ')';
            }
            else if (key === 'tap') {
                action = 'UIEvent({"id":"' + this.id + '"})';
            }

            return action;
        },

        // 处理 href
        _parseHref: function () {
            this.config.action = this._parseAction('href');
        },

        // 修改item的索引
        _parseIndex: function () {
            var items = this.items;
            var index = this.get('index');
            if (this.inited) {
                this.remove();
            }
            items.splice(index, 0, this.config);
        },

        /**
         * 把 item放置于item容器中；
         * @param {Array} itemsAry 要放置的容器；
         * @param {number} index 要放置容器的索引；
         * @return {Class} item对象；
         */
        appendTo: function (itemsAry, index) {
            this.items = itemsAry;
            this.index = index || itemsAry.length;
            this.set('index', this.index);
            this.inited = true;
            return this;
        },

        /**
         * 修改样式
         * @param {Object} data 可为空
         * @return {Class} 对象本身；
         */
        style: function (data) {
            if (!this.get('style')) {
                this.set('style', {});
            }
            if (data) {
                lib.extend(this.get('style'), data);
            }
            this.styleObj.update(this.get('style'));
            return this;
        },

        // 绑定 action 事件;
        bind: function (fn) {
            fn = fn || lib.noop;
            this.on('ontap', fn);
            this.config.action = this._parseAction('tap');
            return this;
        },

        // 解绑事件
        unbind: function (fn) {
            this.off('tap', fn);
            return this;
        },

        // 从父链中删除，并没有销毁组件;
        remove: function (){
            this.items.splice(this.index, 1);
            this.fire('onremove');
            return this;
        },

        // 渲染组件
        render: function () {
            if (this.inited) {
                this.instance.render();
            }
            this.fire('render');
            return this;
        },

        /**
         * 销毁组件
         */
        destroy: function () {
            this.remove();
            Item.remove(this);
            this.fire('destroy');
            this.off('all');
        }
    });

    return Item;
});
