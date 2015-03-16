/**
 * @class TitleBar
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Title = Class({

        extend: Widget,

        type: 'title',
        
        config: {
            "style": {},
            "center": [],
            "left": [],
            "right": []
        },

        setConfig: function(options){
            var title = options.text || '',
                leftItem = options.left || {},
                rightItem = options.right || {};
            this.setTitle(title);
            this.addLeftItem(leftItem);
            this.addRightItem(rightItem);
        },

        setTitle: function(title){
            this.config.center = [{
                text: title
            }];
            return this;
        },

        addLeftItem: function(item){
            this.addItem(this.config.left, item);
            return this;
        },

        addRightItem: function(item){
            this.addItem(this.config.right, item);
            return this;
        }
    });

    return Title;
});
