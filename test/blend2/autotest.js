if (navigator.userAgent.indexOf("iPhone") !== -1){
    require([
        'autotest/ios.js',
    ],function(){
        mocha.run();
    });
} else {
    require([
        'autotest/Component.js',
    ],function(){
        mocha.run();
    });
}