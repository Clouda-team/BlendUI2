/**
 * @class TitleBar
 * @singleton
 */
define(["Blend.ui.Widget"], function(Widget){

    Blend.createClass("Blend.ui.TitleBar", {

        extend: ["Blend.ui.Widget"],

        static: {
            leftItems: [],
            centerItems: [],
            rightItems: [],
            titleItems: []
        },

        /**
         * 在指定为位置添加Item对象
         * @param {string} position
         * @param {object} item
         */
        addItem: function(position, item){
            if(typeof position === "object"){
                item = position;
                position = "title"
            }
            if(position === "title"){
                this.titleItems.push(item);
            }else if(position === "left"){
                this.leftItems.push(item);
            }else if(position === "center"){
                this.leftItems.push(item);
            }else if(position === "right"){
                this.leftItems.push(item);
            }
        },

        addLeftItem: function(item){
            this.addItem('left', item);
        },

        addCenterItem: function(item){
            this.addItem('center', item);
        },

        addRightItem: function(item){
            this.addItem('right', item);
        },

        addTitleItem: function(item){
            this.addItem('title', item);
        }

    });
});
