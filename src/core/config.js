/**
 * @file config.js
 * @desc 配置文件;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} 配置数据集
 */

define(function () {
    var config = {
        // debug开关
        debug: true,

        // 布局性widget列表，
        widgetList: [
            'title',
            'tab',
            'navigation',
            'toolbar'
        ],
        // 展现性widget列表
        componentList: [
            'gallery',
            'dialog'
        ]
    };

    return config;
});
