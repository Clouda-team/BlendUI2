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

    return lib;
});
