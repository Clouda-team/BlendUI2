/**
 * @file Loading.js
 * @desc Loading 基类;
 * @author clouda-team(https://github.com/clouda-team)
 * @return { Class } Loading构造函数
 */
define([
    '../core/Class',
    './Widget',
    '../core/native'
], function (classFactory, Widget, nativeApi) {

    // loading显示隐藏封装
    var loadingShowHide = function (isshow) {
        nativeApi.dataHook('widget', {
            type: 'loading',
            options: {
                display: isshow
            }
        });
    };

    var Loading = classFactory.create({
        extend: Widget,
        type: 'loading',
        /**
         * 显示Loading组件
         */
        show: function () {
            loadingShowHide(true);
        },

        /**
         * 隐藏loading组件
         */
        hide: function () {
            loadingShowHide(false);
        }
    });
    return Loading;
});
