define(["./Lib", "./Class"], function(Lib, Class){

    var global = this,
        i = 0;

    if(typeof Blend === 'undefined'){
        global.Blend = {};
    }

    Blend.global = global;

    Lib.apply(Blend, {

        classes: {},

        createClass: function (className, data, onCreated) {
            return new BlendClass(data, onCreated);
        },

        create: function(){
            var name = arguments[0],
                args = arraySlice.call(arguments, 1),
                classes = this.classes;

            if(typeof cls !== 'function'){
                cls = classes[name];
            }else{
                cls = name;
            }

            return new cls(args);
        }
    });

    return Blend;
});
