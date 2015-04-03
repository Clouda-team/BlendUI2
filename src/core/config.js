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

        /**
         * widgetList列表
         * nativeName: 对应native的类型
         * type:widget 类型，1代表布局,2组件主要用来区分调用naitve接口不一样
         */
        widgetList: {
            title: {
                nativeName: 'title',
                type: 1
            },
            tab: {
                nativeName: 'tab',
                type: 1
            },
            navigation: {
                nativeName: 'navi',
                type: 1
            },
            toolbar: {
                nativeName: 'toolbar',
                type: 1
            },
            gallery: {
                nativeName: 'gallery',
                type: 2
            },
            dialog: {
                nativeName: 'dialog',
                type: 2
            }
        }
    };

    return config;
});
