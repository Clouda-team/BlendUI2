/**
 * @file gallery.js
 * @desc gallery组件;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} Class 基类
 * @param {Object} Widget widget的基类
 * @return {Object} gallery组件对象
 */
define([
    '../core/Class',
    './Widget'
], function (classFactory, Widget) {
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
            extend: Widget,
            type: 'gallery',
            /**
             * 初始化gallery组件
             * @private
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
            _init: function (options) {
                this.itemTypes = ['center', 'left', 'right'];
                this.filterConfig = ['id', 'gallery', 'index'];
                return this;
            },

            /**
             * 显示图集
             */
            show: function () {
                this.render();
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
            }
        });
        return gallery;
    });
