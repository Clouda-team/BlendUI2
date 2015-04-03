/**
 * @file Widget.js
 * @desc 基础类库
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} classFactory 基础类
 * @param {Object} nativeApi 操作native的类
 * @param {Object} lib 一些方法封装
 * @param {Object} Style 对样式操作的基础类
 * @param {Object} Item  基本单元的类
 * @return {Object} widget对象
 */
define([
    '../core/Class',
    '../core/native',
    '../core/lib',
    './Style',
    './Item'
], function (classFactory, nativeApi, lib, Style, Item) {

    /**
     * @class
     * @alias module:Widget
     */
    var Widget = classFactory.create({
        init: function (options) {
            options = options || {};
            this.itemList = {};
            this.config = {};
            /*当上层业务逻辑有需要初始化的业务时候帮其调用*/
            if (typeof this._init === 'function') {
                this._init.apply(this, arguments);
            }

            this.styleInstance = new Style({
                superId: this.id,
                data: options.style ? options.style : {}
            });
            if (options) {
                this._setConfig(options);
            }
            this.render();
        },

         // 暂时不支持set item
        events: {
            /**
             * 属性改变时触发;
             * @event Widget set#change
             * @param {key}  key 改变的属性；
             */
            change: function (key) {
                var item;
                var filterConfig = this.filterConfig;
                if (this.itemTypes && this.itemTypes.indexOf(key) !== -1) {
                    for (var i = 0; i < this.get(key).length; i++) {
                        item = this.create(this.get(key)[i]);
                        this.append(item, key);
                    }
                }
                else if (filterConfig && filterConfig.indexOf(key) !== -1) {
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },

        /**
         * 初始化配置
         * @private
         * @param {Object} options  是入参
         */
        _setConfig: function (options) {
            var name;
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    this.set(name, options[name]);
                }
            }
        },

        /**
         * 创建item
         * @param {Object} options item的参数
         * @return {Object} Item 返回item实例
         */
        create: function (options) {
            var opt = {
                superId: this.id,
                data: options
            };
            return new Item(opt);
        },
        /**
         * 向items数组中添加item对象
         * @param {Object} item item的实例对象
         * @param {string} type item的类型
         * @return {Object} this 将自身返回
         */
        append: function (item, type) {
            type = type ? type : 'items';
            var itemArr;
            if (!(this.config[type] instanceof Array)) {
                this.config[type] = [];
            }
            itemArr = this.config[type];
            item.appendTo(itemArr);
            this.itemList[type] = this.itemList[type] ? this.itemList[type] : [];
            this.itemList[type].push(item);
            return this;
        },

        /**
         * 删除widget里的item
         * @param {string} type 类型
         * @param {number} index 序号
         * @return {Object} this 自身实例
         */
        removeItem: function (type, index) {
            if (this.itemList[type]) {
                this.itemList[type].splice(index, 1).remove();
            }
            return this;
        },

        /**
         * 设置组件样式
         * @param {Object|string} options 样式的对象，如为单字符串侧是获取样式;
         * @return {Object} this自身或样式值
         */
        style: function (options) {
            if (arguments.length === 1 && typeof options === 'string') {
                return this.styleInstance.get(options);
            }
            if (arguments.length === 2 && typeof options === 'string') {
                var objData = {};
                objData[arguments[0]] = arguments[1];
                this.style(objData);
            }
            this._setStyle('style', options);
            return this;
        },

        /**
         * 内部设置组件样式，支持set(style,{})
         * @private
         * @param {string} key "style"
         * @param {Object} options 传入的style对象
         * @return {Object} this 自身实例
         */
        _setStyle: function (key, options) {
            this.styleInstance.update(options);
            return this;
        },

        /**
         * 显示 show
         */
        show: function () {
            this.config = this.configCache ? this.configCache : this.config;
            delete this.configCache;
            this.render();
        },

        /**
         * 隐藏 hide
         */
        hide: function () {
            this.configCache = this.config;
            delete this.config;
            this.render();
        },

        /**
         * 渲染组件
         */
        render: function () {
            this.fire('beforeRender');
            nativeApi.render(this.type, this.config);
            this.fire('render');
        },

        /**
         * 销毁组件
         */
        destroy: function () {
            delete this.config;
            this.render();
            this.off('all');
        }
    });

    return Widget;
});
