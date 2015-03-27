/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Tab = Class({

        extend: Widget,

        type: 'tab',

        _init:function(){ 
             this.itemTypes = ['items'];
        },
        /**
         * 目前暂无实现
         * @param index
        */   
        switchTo:function(index){

        }

    });

    return Tab;
});
