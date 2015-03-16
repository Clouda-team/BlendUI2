/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var ToolBar = Class({

        extend: Widget,

        type: 'toolbar',
        
        config: {
            "style": {},
            "items": []
        },

        setConfig: function(options){
            var items = options.items || [],
                i;
            for(i in items){
                this.addItem(items[i]);
            }
        },

        addItem: function(item){
            this.Super.addItem(this.config.items, item);
            return this;
        }

    });

    return ToolBar;
});
