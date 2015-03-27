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
        statics: {
            ready: false,
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
                this.config[key] = this.get(key);
            }
        },
        /**
         * 初始化gallery组件
         * @param {object} options 配置信息
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
         * @param {object} options
         */
        _setConfig: function (options) {
            var name;
            for (name in options) {
                this.set(name, options[name]);
            }
        },

        /**
         * 添加图片元数据
         * @param {Array} options 图片元数据数组
         * @return {Gallery} gallery gallery对象
         */
        _setImages: function (key, value) {
            var options = value;
            if (typeof options === 'object' && options.constructor === Array) {
                images = options;
            }
            for(var i = 0,len = images.length;i<len;i++){
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
            console.log(config);
            if(!Gallery.ready){
                Gallery.render(type, config);
            }
        },
        
        destroy: function () {
            delete this.config;
        }
    });
    return Gallery;
});
