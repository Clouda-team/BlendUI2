/**
 * @file Dialog.js
 * @desc Dialog 基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return { Class } Dialog构造函数
 */
define([
    '../core/Class',
    './Widget',
    '../core/native'
], function (classFactory, Widget, nativeApi) {
    var title = classFactory.create({
        extend: Widget,
        type: 'dialog',
         /**
         * _init 是个别组件需要单独初始化的事项
         * @private
         * @param {Object} options Dialog自己的初始化
         */
        _init: function (options) {
            this.itemTypes = ['items'];
            this.filterConfig = ['title', 'description'];
        },

        /**
         * Dialog组件的title
         * @private
         * @param {string} key 设置标题这里固定是 'title'
         * @param {string} value 设置标题内容
         */
        _setTitle: function (key, value) {
            this.config.text = value;
        },

        /**
         * Dialog组件的show
         */
        show: function () {
            nativeApi.render('dialog', this.config);
        },

        /**
         * Dialog组件的show
         */
        hide: function () {
            nativeApi.render('dialog', {});
        }

    });
    return title;
});
