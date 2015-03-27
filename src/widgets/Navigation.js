/**
 * @class navigation
 * @singleton
 */
define(["../core/Class","./Widget"], function(Class,Widget){

    var Navigation = Class({

        extend: Widget,

        type: 'navi',

        /**
         * _init 是个别组件需要单独初始化的事项
         * @param {object} options
         */
        _init: function (options) {
            this.itemTypes = ['items'];
        }

    });

    return Navigation;
});
