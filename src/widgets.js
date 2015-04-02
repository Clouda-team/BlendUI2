/**
 * @file widgets.js
 * @desc 组件对象集合,对外抛出接口;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} widget组件对象
 */
define([
    './widgets/Title',
    './widgets/Tab',
    './widgets/Navigation',
    './widgets/Toolbar',
    './widgets/Gallery',
    './widgets/Dialog'
], function (Title, Tab, Navigation, Toolbar, Gallery, Dialog) {
    var widgets = {};

    widgets.title = Title;

    widgets.tab = Tab;

    widgets.navigation = Navigation;

    widgets.toolbar = Toolbar;

    widgets.gallery = Gallery;

    widgets.dialog = Dialog;

    /* @method widgets.extend
     * @args object
     * @res You can extend Objects to widgets!
    */
    widgets.extend = function () {
        var targets = arguments;
        var len = targets.length;
        var i = 0;
        var target;
        for (; i < len; i++) {
            target = targets[i];

            /*If the argument is a object, link the key to widgets*/
            if (typeof target === 'object') {
                for (var o in target) {
                    if (target.hasOwnProperty(o)) {
                        widgets[o] = target[o];
                    }
                }
            }
        }
        // Return widgets
        return widgets;
    };

    return widgets;
});
