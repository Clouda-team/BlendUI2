/**
 * @class Navigation
 * @singleton
 */
Blend.define("Blend.UI.Navigation", {
    extend: "Blend.UI.Widget",
    static: {
        items: []
    },

    addItem: function(item){
        this.items.push(item);
    }
});
