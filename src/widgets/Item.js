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
], function (classFactory, Style, lib) {
    // action触发的事件
    document.addEventListener('UIXClick', function (e) {
        var data = JSON.parse(e.data);
        var id = data.id;
        classFactory.get(id).fire('tap');
    });

     /**
     * @class
     * @alias module:Item
     */
    var item = classFactory.create({
        /**
         * item对象 初始化方法
         * @param {Object} options 初始化设置
         * @param {Object} options.data 传人的初始化值；
         * @param {Object} options.superId item的附属实例的id；
         * {
               data:{
                    style:{},
                    text:'',
                    image:'xx',
                },
                superId: widget实例id
         * }
         * @return {Item} Item实例；
         */
        init: function (options) {
            this.config = {};
            this._inited = false;
            this._setOptions(options);
            classFactory.register(this);
            return this;
        },
        // 类型标识
        type: 'item',

        // 类绑定的事件
        events: {
            /**
             * 设置属性值时触发;
             * @event Item set#change
             * @param {key}  key 改变的属性；
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
            var data = options.data || {};
            this.superId = options.superId;
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    if (k.indexOf('on') === 0) {
                        this.bind(lib.cutOn(k), data[k]);
                    }
                    else if (typeof data[k] !== 'function') {
                        this.set(k, data[k]);
                    }
                    else {
                        this[k] = data[k];
                    }
                }
            }
            return this;
        },

        /**
         * 解析style属性;
         * @private
         * @return {Class} 原对象
         */
        _parseStyle: function () {
            if (!this.styleObj) {
                this.styleObj = new Style({
                    superId: this.id
                });
            }
            this.style();
            return this;
        },

        /**
         * 解析action属性;
         * @private
         * @param {string} key,要解析的action标识 href|tap|back；
         * @param {string|null} nativeString, 显示native组件@todo remove
         * @return {string} 解析后的 action 字符串
         */
        _parseAction: function (key, nativeString) {
            var action;
            if (key === 'href') {
                action = 'loadurl(' + this.get('href') + ')';
            }
            else if (key === 'tap') {
                action = 'uievent({"id":"' + this.id + '"})';
            }
            else if (key === 'native') {
                action = 'action(' + nativeString + ')';
            }

            return action;
        },

        /**
         * 解析href属性;
         * @private
         * @return {Item} Item 对象
         */
        _parseHref: function () {
            this.config.action = this._parseAction('href');
            return this;
        },

        /**
         * 解析index属性;
         * @private
         * @return {Item} Item 对象
         */
        _parseIndex: function () {
            var items = this._items;
            var index = this.get('index');
            if (this._inited) {
                this.remove();
            }
            items.splice(index, 0, this.config);
            return this;
        },

        /**
         * 把 item放置于item容器中；
         * @param {Array} itemsAry 要放置的容器；
         * @param {number} index 要放置容器的索引；
         * @return {Class} item对象；
         */
        appendTo: function (itemsAry, index) {
            this._inited = true;
            this._items = itemsAry;
            this.index = index || itemsAry.length;
            this.set('index', this.index);
            return this;
        },

        /**
         * 修改样式
         * @param {Object | string} data, 如 data为字符串侧获取样式;
         * @return {string| Item} 对象本身或样式值；
         */
        style: function (data) {
            if (arguments.length === 1 && typeof data === 'string') {
                return this.styleObj.get(data);
            }
            else if (!this.get('style')) {
                this.set('style', {});
            }
            if (arguments.length === 1 && typeof data === 'Object') {
                lib.extend(this.get('style'), data);
            }
            else if (arguments.length === 2) {
                var objData = {};
                objData[arguments[0]] = arguments[1];
                this.style(objData);
            }
            this.styleObj.update(this.get('style'));
            return this;
        },

        /**
         * 绑定 action 点击事件函数;
         * @param {string} type 事件类型;
         * @param {Function|string} fn 绑定的函数或者固定常量；
         * @return {Item} Item 对象
         */
        bind: function (type, fn) {
            if (typeof fn === 'string') {
                this.config.action = this._parseAction('native', fn);
            }
            else {
                this.on(type, fn);
                this.config.action = this._parseAction('tap');
            }
            return this;
        },

        /**
         * 解绑 action 点击事件函数;
         * @param {Function} fn 绑定的函数；
         * @return {Item} Item 对象
         */
        unbind: function (fn) {
            this.off('tap', fn);
            return this;
        },

        /**
         * 删除 Item 对象从组件中;
         * @return {Item} Item 对象
         */
        remove: function () {
            this._items.splice(this.index, 1);
            this.fire('onremove');
            return this;
        },

        /**
         * 重新渲染Item组件;
         * @return {Item} Item 对象
         */
        render: function () {
            if (this._inited) {
                classFactory.get(this.superId).render();
            }
            return this;
        },

        /**
         * 销毁组件
         */
        destroy: function () {
            this.remove();
            classFactory.cancel(this);
            this.fire('destroy');
            this.off('all');
        }
    });

    return item;
});
