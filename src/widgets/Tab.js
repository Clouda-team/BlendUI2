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
        // 增加某项
        addItem: function(item){
            this.Super.addItem(this.config.items, item);
            return this;
        },

        // @todo删除某项
        removeItem: function(index) {

        },

        // @todo激活某项
        active: function(item){

        }

    });

    return Tab;
});
