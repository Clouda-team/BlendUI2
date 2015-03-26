require([
    'autotest/lib.js',
    'autotest/Class.js',
    'autotest/Style.js',
    'autotest/Item.js'
],function(){
    if(window.lc_bridge){
        mocha.run();
    }else if(navigator.userAgent.match(/BaiduLightAppRuntime/)){
        document.addEventListener('runtimeready', function(){
            mocha.run();
        }, false);
    }else if(window.mochaPhantomJS){
        mochaPhantomJS.run();
    }else{
         mocha.run();
    }
});