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
            ready: false
        },

        type: 'gallery',

        /**
         * 初始化gallery组件
         * @param {object} options 配置信息
         */
        init: function (options) {
            this.setGallery(options);
            this.render();
        },

        onNext: function (callback) {
            this.config.pre = '(' + callback.toString() + ')()';
        },

        onPre: function (callback) {
            this.config.pre = '(' + callback.toString() + ')()';
        },

        /**
         * 添加图片元数据
         * @param {Array} options 图片元数据数组
         * @return {Gallery} gallery gallery对象
         */
        setGallery: function (options) {
            this.config.gallery = options;
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
            var type = this.type;
            var config = JSON.stringify(this.config);
            if (!Gallery.ready) {
                setTimeout(function () {
                    native.widget(type, config);
                }, 0);
                Gallery.ready = true;
            }
        }
    });
    return Gallery;
});