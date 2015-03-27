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
            gallery: []
        },

        statics: {
            ready: false,
            configs: {},
            render: function (type, configs) {
                var timer = setTimeout(function(){
                    native.widget(type, configs);
                    clearTimeout(timer);
                    Gallery.ready = false;
                });
                Gallery.ready = true;
            }
        },

        type: 'gallery',

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

        /**
         * 初始化gallery组件
         * @param {object} options 配置信息
         */
        init: function (options) {
            this.updateImages(options);
            this.render();
            return this;
        },

        /**
         * 添加图片元数据
         * @param {Array} options 图片元数据数组
         * @return {Gallery} gallery gallery对象
         */
        updateImages: function (options) {
            var images;
            if (typeof options === 'object' && options.constructor === Array) {
                images = options;
            }
            images = options.images || [];
            this.config.gallery = images;
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
