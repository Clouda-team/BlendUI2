define(function(){

    var Lib = {};

    /**
     * 复制配置到指定的对象.
     * @param {Object} object 属性的继承者
     * @param {Object} config 属性的来源
     * @return {Object} returns obj
     */
    Lib.apply = function(object, config) {

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }
        }
        return object;

    };

    Lib.apply(Lib, {
        emptyFn: function(){}
    });

    return Lib;
});
