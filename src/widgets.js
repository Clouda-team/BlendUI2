/**
 * @file widgets.js
 * @desc 组件对象集合,对外抛出接口进行调用, 主要用来把所有组件依次引人;
 * @author clouda-team(https://github.com/clouda-team)
 * @return {Object} widgets组件对象
 */
define([
    './widgets/Title',
    './widgets/Tab',
    './widgets/Navigation',
    './widgets/Toolbar',
    './widgets/Gallery',
    './widgets/Dialog',
    './widgets/Loading',
    './widgets/Calendar'
], function (Title, Tab, Navigation, Toolbar, Gallery, Dialog, Loading, Calendar) {
    var widgets = {};

    widgets.title = Title;

    widgets.tab = Tab;

    widgets.navigation = Navigation;

    widgets.toolbar = Toolbar;

    widgets.gallery = Gallery;

    widgets.dialog = Dialog;

    widgets.loading = Loading;

    widgets.calendar = Calendar;

    return widgets;
});
