/**
* 背景页面入口引导,用来管理WebView,为应用页面间通讯做代理
*/

(function(window){
    //辅助类和方法
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };

    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    //系统管理器
    var Boost = function(config){
        return new Boost.prototype.init(config);
    }

    var webviews = {
        ids: [],
        table: {},
        register: function(id,state){
            state = state || {};
            if (!this.table[id]){
                this.ids.push(id);
            }
            this.table[id] = state;
        },
        unregister: function(id){
            delete this.table[id];
            this.ids.remove(id);
        }
    };

    var __event = {};

    Boost.prototype = {
        init: function(config){
            this.config = config;
            return this;
        }
    }

    Boost.prototype.init.prototype = Boost.prototype;

    Boost.prototype.load = function(id, data){
        lc_bridge.exeJsOnContentWebview(id, data);
    }

    //WebView管理机制
    Boost.prototype.register = function(){

        document.addEventListener("webview_register", function(event){
            var webview = JSON.parse(event.data);
            webviews.register(webview.id);
        });

        document.addEventListener("webview_unregister", function(event){
            var webview = JSON.parse(event.data);
            webviews.unregister(webview.id);
        });
    }

    //消息机制
    Boost.prototype.delegate = function(){
        var that = this;
        document.addEventListener("delegate", function(event){
            //业务页面通过背景页自我调用

            lc_bridge.postMessage(event.origin, "message", event.origin);

            var data = JSON.parse(event.data);

            if (__event[data.type]){
                for (var i in __event[data.type]){
                    console.log("页面消息转发:"+data.type);
                    lc_bridge.postMessage(__event[data.type][i], data.type, "页面ID"+event.origin+"|"+"内容:"+event.data);
                }                
            }

        }, false);

        document.addEventListener("event_register", function(event){
            if (__event[event.data]){
                __event[event.data].push(event.origin);
            } else {
                __event[event.data] = [event.origin];
            }
            console.log(event.origin);
        }, false);

        document.addEventListener("event_unregister", function(event){
            __event[event.data] && __event[event.data].remove(event.origin);
        }, false);
    }

    //用来测试的用例
    Boost.prototype.test = function(){
        document.addEventListener("test", function(event){
            var data = JSON.parse(event.data);
            console.log("test----");
            if (data.type == "not-exist&post"){
                console.log("not-exist&post");
                lc_bridge.postMessage(event.data, "testCallback", data.data);
                lc_bridge.postMessage(event.origin, "testCallback", data.data);
            }

            if (data.type == "not-exist&exec"){
                console.log("not-exist&exec");
                lc_bridge.exeJsRemote(event.data, "alert('exec')");
                lc_bridge.exeJsRemote(event.origin, "alert('不存在的页面执行exec')");
            }
            
        });
    }    

    Boost.prototype.run = function(){

        //必需模块
        this.register();

        //消息通讯
        this.delegate();

        //测试用例
        this.test();

    }

    Boost.webviews = webviews;

    window.$app = window.Boost = Boost;

    //模块化支持

    // define(function(){
    //     return Boost;
    // })

})(this);


//启动服务
var config = {
    version: 1.0,
    default: "http://www.baidu.com",
    background: {
        scripts: [""]
    },
    modules:[]
};

$app(config).run();
