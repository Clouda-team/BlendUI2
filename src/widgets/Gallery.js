/**
 * @file gallery.js
 * @desc gallery组件;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} Class 基类
 * @param {Object} Widget widget的基类
 * @return {Object} gallery组件对象
 */
define(['../core/Class', '../core/lib', '../core/native'],
    function (classFactory, lib, native) {
        var renderConfig;
        var gallery;
        /**
         * @desc 渲染uix组件
         * @param {Object} configs uix配置
         * @return {} 没有
        */
        renderConfig = function (type, configs) {
            var timer = setTimeout(function () {
                native.show(type, configs);
                clearTimeout(timer);
                gallery.ready = false;
            });
            gallery.ready = true;
        };
        /**
         * @des 创建一个类
         * @param {Object} options 配置信息
         * {
         *  id: 'xxx',
         *  title: 'title',
         *  images: [
         *      {
         *          text: 'xxxx',
         *          image: 'imageurl',
         *
         *      }
         *  ]
         * }
         * @return {gallery} gallery
         */
        var gallery = classFactory.create({
            statics: {
                ready: false
            },

            type: 'gallery',

            events: {
                change: function (key) {
                    this.config[key] = this.get(key);
                }
            },
            /**
             * 初始化gallery组件
             * @param {Object} options 配置信息
             * {
             *  id: 'xxx',
             *  title: 'title',
             *  images: [
             *      {
             *          text: 'xxxx',
             *          image: 'imageurl',
             *
             *      }
             *  ]
             * }
             * @return {Gallery} gallery
             */
            init: function (options) {
                this.config = {};
                this._setConfig(options);
                return this;
            },

            /**
             * 显示图集
             */
            show: function () {
                this.render();
            },

            /**
             * 初始化配置
             * @private
             * @param {Object} options 初始化配置选项
             */
            _setConfig: function (options) {
                var name;
                for (name in options) {
                    if (name) {
                        this.set(name, options[name]);
                    }
                }
            },

            /**
             * 添加图片元数据
             * @private
             * @param {string} key 图片元数据数组
             * @param {Object} value 值
             * @return {Object} gallery gallery对象
             */
            _setImages: function (key, value) {
                var options = value;
                var images;
                if (typeof options === 'object' && options.constructor === Array) {
                    images = options;
                }
                for (var i = 0, len = images.length; i < len; i++) {
                    images[i].text = images[i].title;
                    delete images[i].title;
                }
                this.set('gallery', images);
                return this;
            },

            /**
             * 渲染gallery组件
             */
            render: function () {
                var config = this.config;
                var type = this.type;
                if (!gallery.ready) {
                    renderConfig(type, config);
                }
            },
            destroy: function () {
                delete this.config;
            }
        });
        return gallery;
    });
