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
    var Loading = classFactory.create({
        extend: Widget,
        type: 'loading',
        /**
         * 显示Loading组件
         */
        show: function () {
            nativeApi.dataHook('loading_status', {
                loading: true
            });
        },

        /**
         * 隐藏loading组件
         */
        hide: function () {
            nativeApi.dataHook('loading_status', {
                loading: false
            });
        }
    });
    return Loading;
});
