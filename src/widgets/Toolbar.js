/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var ToolBar = Class({

        extend: Widget,

        type: 'toolbar',
        
        _init:function(){
            this.itemTypes = ['items']; 
            this.filterConfig = ['id'];
        }
        

    });

    return ToolBar;
});
