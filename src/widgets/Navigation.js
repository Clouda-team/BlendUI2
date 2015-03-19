/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Navigation = Class({

        extend: Widget,

        type: 'navi',
        
        config: {
            "id": {},
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
        },

        // @todo
        removeItem: function(index) {

        },

        // @todo
        show: function(){

        },

        // @todo
        hide: function(){

        }

    });

    return Navigation;
});
