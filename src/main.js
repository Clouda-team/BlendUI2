require.config({
    baseUrl: "../../src/"
});

require(["core/Class"], function(BlendClass){
    //测试类系统
    var A = new BlendClass({
        statics: {
            s: 1,
            sf: function(){
                console.log(this.s);
            }
        },
        config: {
            a: 1,
            name: "hi"
        },
        name: "this is name",
        showName: function(){
            console.log(this.name);
        }
    });

    var a = new A();

    var a1 = new A();

    console.log(a1.setName("a1's name"), a.setName("a's name"));

    console.log(a1.showName(), a1.getName(), a.showName(), a.getName());

    console.log(a instanceof A);

});


//function Class(Class, data){
//    if(typeof Class !== "function"){
//        Class = function(){
//            return this.constructor.apply(this, arguments);
//        }
//    }
//    return Class;
//}
//
//var classes = {};
//
//function create(className, data){
//    if(className in classes){
//        return classes[className];
//    }
//    classes[className] = new Class(data);
//    return classes[className];
//}
//
//create("A", {});
//
//console.log(classes);






