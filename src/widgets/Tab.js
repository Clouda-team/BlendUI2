/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Tab = Class({

        extend: Widget,

        type: 'tab',
        
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

    return Tab;
});
