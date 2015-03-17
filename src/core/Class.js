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

    /**
     * 类生成系统方法;
     * @param {object} data 组件配置数据
     * {
        statics:{},生成系统静态属性或者方法
        events:{
            'type':callback
        },生成系统的事件,
        config:{},系统的动态属性
        ......, 系统的动态方法
     }
     * @returns {function}
     */
    var createClass = function( data ){
        var parent = data.extend || noop,
            config = data.config || {},
            events = data.events || [],
            statics = data.statics || {};
        delete data.config;
        delete data.events;
        delete data.statics;
        
        // 初始化函数
        function Constructor() {
            this.id = this.get('id')||lib.uniqueId('CLASSID');
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

        // 处理events参数
        if(events.length){
            for(var k in events){
                proto._listener[k] = events[k];
            }
        }
        // 处理config动态属性
        proto.config = extend({}, config);

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