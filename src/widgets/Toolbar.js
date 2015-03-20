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

        addItem: function(item, index){
            this.Super.addItem(this.config.items, item, index);
            return this;
        },

        removeItem: function( index ){
            this.config.items.splice(index, 1);
            return this;
        },

        updateItem: function( index, options ){
            this.config.items.splice(index, 1);
            this.config.items.splice(index - 1, 0, options);
        }

    });

    return ToolBar;
});
