/**
 * @file Toolbar.js
 * @desc Toolbar组件;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} classFactory 基类
 * @param {Object} Widget widget的基类
 * @return {Object} tab组件对象
 */
define(['../core/Class', './Widget'], function (classFactory, Widget) {
    var toolBar = classFactory.create({
        extend: Widget,
        type: 'toolbar',
        /**
         * _init 是个别组件需要单独初始化的事项
         * @private
         * @param {Object} options toolBar自己的初始化
         */
        _init: function () {
            this.itemTypes = ['items'];
            this.filterConfig = ['id'];
        }
    });
    return toolBar;
});
