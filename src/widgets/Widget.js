/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","../core/native","../core/lib"], function(Class, nativeApi,lib) {

    var Widget = Class({

        init: function(options) {
            this.setStyle(options);
            this.setConfig(options);
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

            //异步渲染组件方法
            render: function(configs){
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
        _parseStyle: function(data) {
            var opacity = data.opacity || 1,
                backgroundColor = data.backgroundColor || '#000000',
                color = data.color || '#ffffffff';

            //alert("style");
            opacity = Math.ceil(opacity * 0xff);
            prefix = opacity.toString(16);
            backgroundColor = '#' + prefix + backgroundColor.substr(1);
            return {
                backgroundColor: backgroundColor,
                color: color
            };
        },

        /**
         * 解析配置中的Action属性
         * @private
         */
        _parseAction: function(action){
            var loadUrl = /^https:\/\/|^http:\/\/|^geo:|^tel:/,
                actions = /^back$|^search$|^share$|^navi$/,
                share = /^share\(.*\)/;

            if(typeof action === "string"){
                if(loadUrl.test(action)){
                    return "loadurl(" + action + ")";
                } else if(actions.test(action)){
                    return "action(" + action + ")";
                } else if(share.test(action)){
                    return "share("+ action + ")";
                } else {
                    return action;
                }
            }else{
                //操作页面的js代码
                var scope = function(){
                    return action;
                }, code;
                code = "(" + scope.toString() + ")()";
                return "js(" + code + ")";
            }
        },

        _parseItem: function(item){
            var action = item.action || '';
            if(item.action){
                item.action = this._parseAction(action);
            }
        },

        addItem: function(items, item){
            items = items || [];
            this._parseItem(item);
            items.push(item);
        },

        setStyle: function(options){
            this.config.style = this._parseStyle(options);
        },

        /**
         * 初始化配置
         * @param {object} options
         */
        setConfig: function(options){
            var config = this.config,
                name, style;

            options.style = options.style || this._parseStyle(options);

            for(name in options){
                if(config.hasOwnProperty(name)){
                    config[name] = options[name];
                }
            }
        },

        /**
         * 渲染组件
         */
        render: function() {
            var configs = Widget.configs,
                config = this.config;

            configs[this.type] = config;

            if(!Widget.renderReady){
                Widget.render(configs);
            }
        }
    });

    return Widget;
});
