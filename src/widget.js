/**
 * @file widget.js
 * @desc 组件对象集合;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} widget组件对象
 */
define([
    "./widgets/Title",
    "./widgets/Tab",
    "./widgets/Navigation",
    "./widgets/Toolbar",
    "./widgets/Gallery"
], function(Title, Tab, Navigation, Toolbar, Gallery) {
    var widgets = {};

    widgets['title'] = Title;

    widgets['tab'] = Tab;

    widgets['navigation'] = Navigation;

    widgets['toolbar'] = Toolbar;

    widgets['gallery'] = Gallery;

    /* @method widgets.extend
     * @args object
     * @res You can extend Objects to widgets! 
    */
    widgets.extend = function() {
        var targets = arguments;
        var len = targets.length;
        var i = 0;
        var target;
        for (; i < len; i++) {
            target = targets[i];

            /*If the argument is a object, link the key to widgets*/
            if (typeof target == "object") {
                for (var o in target) {
                    widgets[o] = target[o];
                }
            }
        }
        // Return widgets 
        return widgets;
    };

    return widgets;
});
