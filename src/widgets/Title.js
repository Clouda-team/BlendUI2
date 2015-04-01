/**
 * @file Title.js
 * @desc Title组件;
 * @author clouda-team(https://github.com/clouda-team)
 * @param {Object} classFactory 基类
 * @param {Object} Widget widget的基类
 * @return {Object} Title组件对象
 */
define(['../core/Class', './Widget'], function (classFactory, Widget) {
    var title = classFactory.create({
        extend: Widget,
        type: 'title',
         /**
         * _init 是个别组件需要单独初始化的事项
         * @private
         * @param {Object} options title自己的初始化
         */
        _init: function (options) {
            this.itemTypes = ['center', 'left', 'right'];
            this.filterConfig = ['id'];
            this._setImage = this._setTitleItem;
            this._setTitle = this._setTitleItem;
        },

        /**
         * title组件的title
         * @private
         * @param {string} key 设置标题 可以是image 可以是 text
         * @param {string} value 设置标题内容
         */
        _setTitleItem: function (key, value) {
            var opts = {};
            key = 'title' === key ? 'text' : key;
            opts[key] = value;
            if (!this.titleItem) {
                this.titleItem = this.create(opts);
                this.append(this.titleItem, 'center');
            }
            else {
                this.titleItem.set(key, value);
            }
        }
    });
    return title;
});
