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

        setConfig: function (options) {
            var title = options.text || '',
                leftItem = options.left || {},
                rightItem = options.right || {};
            this.setTitle(title);
            this.addLeftItem(leftItem);
            this.addRightItem(rightItem);
        },

        setTitle: function (title) {
            this.config.center = [{
                text: title
            }];
            return this;
        },

        addLeftItem: function (item, index) {
            this.addItem(this.config.left, item, index);
            return this;
        },

        removeLeftItem: function(index) {
            this.config.left.splice(index, 1);
            return this;
        },

        
        addRightItem: function (item, index) {
            this.addItem(this.config.right, item, index);
            return this;
        },

        removeRightItem: function() {
            this.config.left.splice(index, 1);
            return this;
        }
    });

    return Title;
});
