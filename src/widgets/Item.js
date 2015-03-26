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
        Item.get(id).fire('tap');
    });

    var Item = Class({
        statics : {
            instance : {},
            get: function (id) {
                return Item.instance[id]
            },
            set: function (obj) {
                Item.instance[obj.id] = obj;
            }
        }
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
            this._setOptions(options);
            this.inited = true;
            Item.set(this);
            this.render();
        },
        events:{
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

        // 序列号初始化参数;
        _setOptions: function (options) {
            options = options || {};
            var data = options.data || {};
            this.instance = options.instance;
            this.config.action = 'UIEvent('+  +')';
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

        _parseStyle: function () {
            if (this.styleObj){
                this.styleObj = new Style({
                    instance: this
                });
            }
            this.style();
        },
        _parseAction: function( key ){
            var action;
            if ( key==='href') {
                action = 'loadurl('+ this.get('href') +')';
            }
            else if (key==='tab') {
                action = 'UIEvent({id:'+ this.id +'})';
            }

            return action;
        },
        _parseHref: function () {
            var href = this.get('href');
            this.config.action = this._parseAction('href');
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
            this.on('tap', fn);
            this.config.action = this._parseAction('tap');
        },

        // 解绑事件
        unbind: function (fn) {
            this.off('tap', fn);
        },

        /**
         * 删除
         */
        remove: function (){
            this.instance.remove(this);
        },

        /**
         * 渲染组件
         */
        render: function () {
            if(this.inited ){
                this.instance.render();
            }
            this.fire('render');
            return this;
        },

        /**
         * 销毁组件
         */
        destroy: function () {
            this.instance.remove(this);
            this.fire('destroy');
        }
    });

    return Item;
});
