/**
 * @file 组件基类定义
 * @class TitleBar
 * @singleton
 */
define(['../core/Class', '../core/native', '../core/lib','./Style',"./Item"], function (Class, nativeApi,lib,Style,Item) {
    
    var Widget = Class( {
        init: function (options) {
            this.styleInstance = new Style(this,options);
            if (options) {
                this.setConfig(options);
            }
            this.render();
        },

        type: '',

        statics: {
            //全局组件配置文件
            configs: {
                debug: true
            },
            //初始化组件渲染状态,保证所有组件一次性完成渲染
            renderReady: false,

            /**
             * 渲染uix组件
             * @param {object} configs uix配置
             */
            render: function (configs) {
                var timer = setTimeout(function(){
                    nativeApi.render(configs);
                    clearTimeout(timer);
                    Widget.renderReady = false;
                });
                Widget.renderReady = true;
            }
        },


        /**
         * 向items数组中添加item对象
         * @param {Array} items
         * @param {object} item
         */
        append: function (item){
           
        },

        /**
         * 设置组件样式
         * @param {object} options
         */
        style: function(options){
            this.styleInstance.updte(this,options);
            return this;
        },

        /**
         * 初始化配置
         * @param {object} options
         */
        setConfig: function (options) {
            var config = this.config,
                name, style;
            this.style(options);

            for (name in options) {
                if(config.hasOwnProperty(name)){
                    config[name] = options[name];
                }
            }
        },

        /**
         * 渲染组件
         */
        render: function () {
            var configs = Widget.configs,
                config = this.config;
            configs[this.type] = config;
            if(!Widget.renderReady){
                Widget.render(configs);
            }
        },

        /**
         * 销毁组件
         */
        destroy: function () {
            var configs = Widget.configs;

            delete this.config;
            delete configs[this.type];

            if(!Widget.renderReady){
                Widget.render(configs);
            }
        },
        /**
         * 创建item
         * @param {object} options
         */
        create:function(options){
            return new Item(this);    
        }
    });

    return Widget;
});
