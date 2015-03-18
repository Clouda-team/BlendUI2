define(['./lib'], function (lib) {

    var noop    = lib.noop,
        extend   = lib.extend;

    // Object.create
    if (!Object.create) {
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw new Error('Object.create implementation only accepts the first parameter.');
            }
            function F() {}
            F.prototype = o;
            return new F();
        };
    }


    var createClass = function( data ){
        var parent = data.extend || noop,
            config = data.config || {},
            statics = data.statics || {};
        delete data.config;
        delete data.statics;
        
        // 初始化函数
        function Constructor() {
            var target = arguments[0];
            this.config = extend({},config);
            if(typeof target == "object" && typeof target.fn == "object"){
                extend(this,target.fn);
            }
            this.init&&this.init.apply(this, arguments);
        }

        // 原型链继承
        var proto = Constructor.prototype = Object.create(parent.prototype);
        proto.constructor = Constructor;
        proto.Super = Constructor.Super = parent.prototype;
        Constructor.Parent = parent;
        proto._listener = [];

        // 处理静态属性
        extend(Constructor, statics);

        // data中剩余属性或者方法
        extend(proto, data);

        // 添加类中公共方法
        extend(proto, {
            set : function(key,val){
                if(this.config[key]!==val){
                    this._previousConfig = extend({},this.config);
                    this.config[key] = val;
                    this.fire('change:'+key,[key]);
                    this.fire('changeConfig',[key]);
                }
            },
            get : function(key){
                return this.config[key]
            },
            on : function(type, callback){
                var t = this;
                if (!t._listener[type]) {
                    t._listener[type] = [];
                }
                t._listener[type].push(callback);
            },
            fire : function(type, argAry, context){
                var events = this._listener[type];
                var i;
                var len;
                if (!type) {
                    throw new Error('未指定事件名');
                }
                context = context || this;
                if (events) {
                    for (i = 0, len = events.length; i < len; i++) {
                        events[i].apply(context, argAry);
                    }
                }
            },
            off : function(type, callback){
                var events = this._listener[type];
                if (!events) {
                    return;
                }
                if (!callback) {
                    delete this._listener[type];
                    return;
                }
                events.splice(events.indexOf(callback), 1);
                if (!events.length) {
                    delete this._listener[type];
                }
            }
        });
        return Constructor;
    }

    return createClass;
});