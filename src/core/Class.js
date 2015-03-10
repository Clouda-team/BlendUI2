define(["./Lib"], function(Lib){
    var BlendClass;

    /**
     * @method 构造函数
     * 创建新的匿名类.
     *
     * @param {Function}
     * @param {Object} data 描述类属性的对象
     * @param {Function} onCreated 可选, 类创建完成后的回调函数.
     * 提示: 使用了依赖的前置处理器时，类创建过程是异步的.
     *
     * @return {Blend.Class} 创建的新类
     */
    BlendClass = function(Class, data, onCreated) {
        if (typeof Class != 'function') {
            onCreated = data;
            data = Class;
            Class = function() {
                if(!this instanceof Class){
                    return this.constructor.apply(this, arguments);
                }
            };
        }

        if (!data) {
            data = {};
        }

        BlendClass.process(Class, data, onCreated);

        return Class;
    };

    Lib.apply(BlendClass, {
        onBeforeCreated: function(Class, data, hooks) {
            var prototype = Class.prototype,
                names = [],
                i, ln, member;
            for (name in data) {
                names.push(name);
            }
            for (i = 0,ln = names.length; i < ln; i++) {
                name = names[i];
                if (data.hasOwnProperty(name)) {
                    member = data[name];
                    prototype[name] = member;
                }
            }
            hooks.onCreated.call(Class, Class);
        },

        defaultPreprocessors: [],

        preprocessors: {},

        registerPreprocessor: function(name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.preprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPreprocessorPosition(name, position, relativeTo);

            return this;
        },

        /**
         * 通过不同的处理器实现类的扩展
         * @private
         * @static
         */
        process: function(Class, data, onCreated) {
            var preprocessorStack = data.preprocessors || BlendClass.defaultPreprocessors,
                preprocessors = this.preprocessors,
                hooks = {
                    onBeforeCreated: this.onBeforeCreated,    //前置处理器
                    onCreated: onCreated || Lib.emptyFn     //后置处理器
                },
                index = 0,
                name, preprocessor, properties,
                i, ln, fn, property, process;

            delete data.preprocessors;

            process = function(Class, data, hooks) {
                fn = null;

                while (fn === null) {
                    //解析前置处理器
                    name = preprocessorStack[index++];

                    if (name) {
                        preprocessor = preprocessors[name];
                        properties = preprocessor.properties;

                        if (properties === true) {
                            fn = preprocessor.fn;
                        }
                        else {
                            for (i = 0,ln = properties.length; i < ln; i++) {
                                property = properties[i];

                                if (data.hasOwnProperty(property)) {
                                    fn = preprocessor.fn;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        hooks.onBeforeCreated.apply(this, arguments);
                        return;
                    }
                }

                if (fn.call(this, Class, data, hooks, process) !== false) {
                    process.apply(this, arguments);
                }
            };

            process.call(this, Class, data, hooks);
        },

        /**
         * 设置已注册默认处理器的位置
         * @param name
         * @param offset
         * @param relativeName
         * @returns {*}
         */
        setDefaultPreprocessorPosition: function(name, offset, relativeName) {
            var defaultPreprocessors = this.defaultPreprocessors,
                index;

            if (typeof offset === 'string') {
                if (offset === 'first') {
                    defaultPreprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPreprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Array.prototype.indexOf(defaultPreprocessors, relativeName);

            if (index !== -1) {
                Array.prototype.splice(defaultPreprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        }
    });
    
    
    BlendClass.registerPreprocessor('extend', function(cls, data) {
        var extend = data.extend,
            prototype = function() {},
            parent, i, k, ln, staticName, parentStatics,
            parentPrototype, clsPrototype;

        if (extend && extend !== Object) {
            parent = extend;
        } else {
            return ;
        }

        parentPrototype = parent.prototype;

        prototype.prototype = parentPrototype;
        clsPrototype = cls.prototype = new prototype();

        clsPrototype.self = cls;

        cls.superclass = clsPrototype.superclass = parentPrototype;
        //删除data中的extend属性
        delete data.extend;

        // 继承父类中可被继承的属性或方法
        parentStatics = parentPrototype.$inheritableStatics;

        if (parentStatics) {
            for (k = 0, ln = parentStatics.length; k < ln; k++) {
                staticName = parentStatics[k];

                if (!cls.hasOwnProperty(staticName)) {
                    cls[staticName] = parent[staticName];
                }
            }
        }

        // 继承父类中的config信息
        if (parentPrototype.config) {
            clsPrototype.config = Ext.Object.merge({}, parentPrototype.config);
        }else {
            clsPrototype.config = {};
        }
        //父类被继承后的回调函数
        if (clsPrototype.$onExtended) {
            clsPrototype.$onExtended.call(cls, cls, data);
        }
        //为当前类注册被继承后的回调函数
        if (data.onClassExtended) {
            clsPrototype.$onExtended = data.onClassExtended;
            delete data.onClassExtended;
        }

    }, true);

    BlendClass.setDefaultPreprocessorPosition('extend', 'first');

    BlendClass.registerPreprocessor('statics', function(cls, data) {
        var statics = data.statics,
            name;

        for (name in statics) {
            if (statics.hasOwnProperty(name)) {
                cls[name] = statics[name];
            }
        }

        delete data.statics;
    });

    BlendClass.setDefaultPreprocessorPosition('static', 'after', 'extend');
    
    BlendClass.registerPreprocessor('config', function(cls, data) {
        var config = data.config,
            prototype = cls.prototype,
            name;

        delete data.config;

        for(name in config){
            var cName = name.charAt(0).toUpperCase() + name.substr(1),
                pName = name,
                apply = 'apply' + cName,
                setter = 'set' + cName,
                getter = 'get' + cName;
            //添加setter方法
            if (!(apply in prototype) && !data.hasOwnProperty(apply)) {
                data[apply] = function(val) {
                    return val;
                };
            }

            if (!(setter in prototype) && !data.hasOwnProperty(setter)) {
                data[setter] = function(val) {
                    //调用相应的apply方法
                    var ret = this[apply].call(this, val, this[pName]);

                    if (ret !== undefined) {
                        this[pName] = ret;
                    }

                    return this;
                };
            }
            //添加getter方法
            if (!(getter in prototype) && !data.hasOwnProperty(getter)) {
                data[getter] = function() {
                    return this[pName];
                };
            }
        }
    });

    BlendClass.setDefaultPreprocessorPosition('config', 'after', 'static');


    //Blend.apply(Blend, {
    //
    //    onReady: function(callback){
    //        document.addEventListener("uixready", function(event){
    //            callback.apply(this, arguments);
    //        });
    //    },
    //
    //    createClass: function(){
    //        return new BlendClass();
    //    },
    //
    //    create: function(){
    //
    //    },
    //
    //    widget: function(){
    //
    //    }
    //});

    return BlendClass;
});
