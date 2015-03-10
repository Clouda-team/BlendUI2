/**
 * @class ToolBar
 * @singleton
 */
Blend.define("Blend.UI.ToolBar", {
    extend: "Blend.UI.Widget",
    static: {
        items: []
    },

    addItem: function(item){
        this.items.push(item);
    }
});
