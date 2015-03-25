/**
 * @file 组件基类定义
 * @class TitleBar
 * @singleton
 */
define(['../core/Class', '../core/native', '../core/lib'], function (Class, nativeApi) {

    var Widget = Class( {

        init: function (options) {
            if (options) {
                this.setStyle(options);
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
         * 解析配置中的样式属性
         * @param data 样式 {backgroundColor:'#cccccc', color: '#ffffffff', opacity:1}
         * @private
         */
        _parseStyle: function (data) {

            var opacity = data.opacity || 1;
            opacity = Math.ceil(opacity * 0xff);
            prefix = opacity.toString(16);
            var backgroundColor = data.backgroundColor || '#000000';
            backgroundColor = '#' + prefix + backgroundColor.substr(1);
            var color = data.color || '#ffffffff';
            return {
                backgroundColor: backgroundColor,
                color: color
            };
        },

        /**
         * 解析配置对象中的Action属性
         * @private
         */
        _parseAction: function (action) {

            var code;
            var fn;

            if(typeof action === 'object'){
                if (action.hasOwnProperty('url')){
                    return 'loadurl(' + action.url + ')';
                }else if (action.hasOwnProperty('callback')){
                    //操作页面的js代码
                    fn = function(){
                        return action.callback;
                    };
                    code = '(' + fn().toString() + ')()';
                    return 'js(' + code + ')';
                }else if (action.hasOwnProperty('share')){
                    return 'share('+ action.share + ')';
                }else if (action.hasOwnProperty('operator')){
                    return 'action(' + action.operator + ')';
                }else {
                    return '';
                }
            }else {
                return '';
            }
        },

        /**
         * 解析配置对象中的item
         * @param item
         * @private
         */
        _parseItem: function (item) {
            var action = item.action || '';
            if (item.action) {
                item.action = this._parseAction(action);
            }
        },

        /**
         * 向items数组中添加item对象
         * @param {Array} items
         * @param {object} item
         */
        addItem: function (items, item, index){
            items = items || [];
            this._parseItem(item);
            var index = index || items.length;
            items.splice(index, 0, item);
        },

        /**
         * 设置组件样式
         * @param {object} options
         */
        setStyle: function(options){
            this.config.style = this._parseStyle(options);
            return this;
        },

        /**
         * 初始化配置
         * @param {object} options
         */
        setConfig: function (options) {
            var config = this.config,
                name, style;

            options.style = options.style || this._parseStyle(options);

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
        }
    });

    return Widget;
});
