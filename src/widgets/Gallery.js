/**
 * 图片gallery组件
 * @file gallery.js
 * @return {Function} Gallery 图像浏览组件类
 */
define(['../core/Class',
    '../core/lib',
    '../core/native'
], function (Class, lib, native) {
    var Gallery;
    Gallery = Class({
        config: {
            index: 0,
            pre: '',
            next: '',
            gallery: []
        },

        statics: {
            ready: false,
            configs: {},
            render: function (type, configs) {
                var timer = setTimeout(function(){
                    native.widget(type, configs);
                    clearTimeout(timer);
                    this.ready = false;
                });
                this.ready = true;
            }
        },

        type: 'gallery',

        /**
         * 初始化gallery组件
         * @param {object} options 配置信息
         */
        init: function (options) {
            this.setImages(options);
            this.render();
            return this;
        },

        onNext: function (callback) {
            this.config.next = 'js(' + callback.toString() + ')()';
            return this;
        },

        onPre: function (callback) {
            this.config.pre = 'js(' + callback.toString() + ')()';
            return this;
        },

        /**
         * 添加图片元数据
         * @param {Array} options 图片元数据数组
         * @return {Gallery} gallery gallery对象
         */
        addImages: function (options) {
            var images;
            if (typeof options === 'object' && options.constructor === Array) {
                images = options;
            }
            images = options.images || [];
            this.config.gallery = images;
            return this;
        },

        /**
         * 设置显示当前的图片位置信息
         * @param {number} index
         * @return {Gallery} gallery gallery对象
         */
        setIndex: function (index) {
            this.config.index = index;
            return this;
        },

        /**
         * 渲染gallery组件
         */
        render: function () {
            var configs = Gallery.configs;
            var config = this.config;
            var type = this.type;
            configs[this.id] = config;
            if(!Gallery.ready){
                Gallery.render(type, config);
            }
        }
    });
    return Gallery;
});
