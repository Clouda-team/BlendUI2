/**
* @file main.js;@todo
* @desc requirejs合并头文件;
* @author clouda-team(https://github.com/clouda-team)
*/
require([
    'src/blend'
], function (blend) {
    window.Blend = window.blend = blend;
}, null, true);
