/**
 * @class ToolBar
 * @singleton
 */
Blend.define("Blend.UI.TabBar", {
    extend: "Blend.UI.Widget",
    static: {
        items: []
    },

    addItem: function(item){
        this.items.push(item);
    }
});