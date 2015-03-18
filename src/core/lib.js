define(function(){

    var lib = {};

    /**
     * 复制配置到指定的对象.
     * @param {Object} receiver 属性的继承者
     * @param {Object} supplier 属性的来源
     * @return {Object} returns obj
     */
    lib.extend = function(receiver, supplier) {

        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
        return receiver;

    };

    // 空函数
    lib.noop = function(){};

    // each方法
    lib.each = function(object, fn, scope) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope || object, property, object[property], object) === false) {
                    return;
                }
            }
        }
    };

    // 判断是不是类函数
    lib.isClass = function(o) {
        return typeof o === 'function' && (o.prototype && o === o.prototype.constructor);
    };

    // 生成唯一的id
    var idCounter = 0;
    lib.uniqueId = function(prefix) {
         var id = '_' + (++idCounter);
        return (prefix||'UNIQUEID') + id;
    };

    // 环境判断
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") !== -1;
    var isIphone = ua.indexOf("iphone")!== -1;
    var isUix = function(){
        var v = ua.match(/uix\/(\d+\.\d+\.\d+\.\d+)/);
        return v?v[1] : "";
    }();

    lib.ready = function(fn) {
        if (isUix) {
            if(window.lc_bridge){
                fn();
            }else{
                document.addEventListener('uixready', fn, false);
            }
        }
        else {
            fn();
            console.log('非Naitve Uix环境');
        }
    };
    lib.isUix = isUix;

    return lib;
});
