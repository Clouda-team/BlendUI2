define(["./core/lib", "./widget"], function(lib, widgets){

    var Blend = {};

    Blend.create = function(name,options){
        if(widgets[name]){
            return new widgets[name](options);
        }else{
            console.log('error')
        }
    };

    return Blend;
});
