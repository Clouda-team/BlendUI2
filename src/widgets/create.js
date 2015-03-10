/**
* 组件工厂方法
*/

define(function(){

    var cloneObject = function(object){
        var newObject = {};
        for(var i in object){
            newObject[i] = object[i];
        }
        return newObject;
    }

    /**
     * 组件创建方法
     *
     * @widget {string} 组件类型
     * @config {object} 组件参数
     */
    var create = function(widget, config){
        if(!(widget in Blend.ui)){
            throw new Error(widget+" is non-existent");
        }
        var component = new Blend.ui[widget]();
        if(typeof config === "object"){
            for(var i in component){
                if(config.hasOwnProperty(i)){
                    component[i] = config[i];
                }
            }
        }
        return component;
    }

    return create;
});