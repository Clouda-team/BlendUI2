require.config({
    baseUrl: "/~gaotianyi/blend2/BlendUI2/",
    paths: {
        'event': "src/event"
    },
    waitSeconds: 15
});
console.log("test-----------------");
require(['event'],function(event){

    console.log("test-----------------");

    event.on("test", function(e){
        alert("test");
        alert(JSON.stringify(e));
    });

    event.fire("on","data");
});