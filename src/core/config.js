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
         * type:widget 类型,主要用来区分调用接口不一致
         * 1: 布局组件, UIXSetDecorationNoCache,
         * 2: 全局显示组件, UIXShow,
         * 3: 触发事件类组件,UIXEvent
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
            },
            loading: {
                nativeName: 'loading',
                type: 3
            },
            calendar: {
                nativeName: 'calendar',
                type: 3
            }

        }
    };

    return config;
});
