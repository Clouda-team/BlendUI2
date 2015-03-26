/**
 * @file 组件基类定义
 * @class TitleBar
 * @singleton
 */
define(['../core/Class', '../core/native', '../core/lib','./Style',"./Item"], function (Class, nativeApi,lib,Style,Item) {
    
    var Widget = Class( {
        init: function (options) {
            this.itemList = {};
            this.config = {};
            this.styleInstance = new Style({
                instance:this,
                data:options.style?options.style:{}
            });
            if (options) {
                this._setConfig(options);
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

         // 暂时不支持set item
        events: {
            change: function (key) { 
                var item;
                if (typeof(this[key]) == 'function') {
                    this[key](this.get(key));
                }else if(this.itemTypes && this.itemTypes.indexOf(key)!=-1){
                    for(var i=0;i< this.get(key).length;i++) {
                        item = this.create(this.get(key)[i]);
                        this.append(item,key);
                    }
                }else if(this.attributesList && this.attributesList.indexOf(key)!=-1){
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },


        /**
         * 初始化配置
         * @param {object} options
         */
        _setConfig: function (options) {
            var config = this.config,
                name;
            for (name in options) {
                if(this.attributesList.indexOf(name)!=-1){
                    this.set(name,options[name]);
                }
            }
        },
        /**
         * 创建item
         * @param {object} options
         */
        create: function (options) {
            console.log(options);
            var opt = {
                 instance: this,
                 data:options
            };
            return new Item(opt);    
        },
        /**
         * 向items数组中添加item对象
         * @param {object} item
         * @param type item的类型
         */
        append: function (item,type){
            type = type?type:"items";
            var itemArr;
             if(!( this.config[type] instanceof Array)){
                this.config[type] = [];
            }
            itemArr = this.config[type];
            item.appendTo(itemArr);
            this.itemList[type] = this.itemList[type]?this.itemList[type]:[];
            this.itemList[type].push(item);
            return this;
        },

        /**
         * 删除widget里的item
         * @param index 整型
         */
        removeItem: function (type,index){
           if(this.itemList[type]){
              this.itemList[type].splice(index,1).remove();  
           }
           return this;
        },


        /**
         * 设置组件样式
         * @param {object} options
         */
        style: function(options){
            this.styleInstance.update(options);
            return this;
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
