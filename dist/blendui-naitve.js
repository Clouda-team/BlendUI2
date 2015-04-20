/*! blendui-naitve v0.1 - 2015-04-20 - http://clouda.com */
;(function(){var defineObj = {};
defineObj['src/core/lib'] = (function(){
    var lib = {};
    lib.extend = function (receiver, supplier) {
        for (var property in supplier) {
            if (supplier.hasOwnProperty(property)) {
                receiver[property] = supplier[property];
            }
        }
        return receiver;
    };
    lib.noop = function () {
    };
    lib.each = function (object, fn, scope) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (fn.call(scope || object, property, object[property], object) === false) {
                    return;
                }
            }
        }
    };
    lib.isClass = function (fn) {
        return typeof fn === 'function' && (fn.prototype && fn === fn.prototype.constructor);
    };
    lib.toCamel = function (str) {
        str = str || '';
        str = str.replace(/-([a-z])/gi, function (a, s) {
            return s.toUpperCase();
        });
        return str;
    };
    lib.toPascal = function (str) {
        str = lib.toCamel(str);
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    };
    lib.cutOn = function (str) {
        if (str.indexOf('on') === 0) {
            str = str.slice(2);
            str = str.charAt(0).toLowerCase() + str.slice(1);
        }
        return str;
    };
    var idCounter = 0;
    lib.uniqueId = function (prefix) {
        var id = '_' + ++idCounter;
        return (prefix || 'UNIQUEID') + id;
    };
    var ua = navigator.userAgent.toLowerCase();
    lib.isAndroid = ua.indexOf('android') !== -1;
    lib.isIphone = ua.indexOf('iphone') !== -1;
    var isUIX = lib.isUIX = function () {
        var v = ua.match(/uix\/(\d+\.\d+\.\d+\.\d+)/);
        return v ? v[1] : '';
    }();
    lib.ready = function (fn) {
        if (isUIX) {
            if (window.lc_bridge) {
                fn();
            } else {
                document.addEventListener('uixready', fn, false);
            }
        } else {
            fn();
            console && console.warn('\u975ENaitve Uix\u73AF\u5883');
        }
    };
    return lib;
})();
defineObj['src/core/Class'] = (function(){
    var lib = defineObj['src/core/lib'];
    var noop = lib.noop;
    var extend = lib.extend;
    var cutOn = lib.cutOn;
    var classFactory = {};
    if (!Object.create) {
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw new Error('Object.create implementation only accepts the first parameter.');
            }
            function F() {
            }
            F.prototype = o;
            return new F();
        };
    }
    classFactory.create = function (data) {
        var parent = data.extend || noop;
        var attributes = data.attributes || {};
        var events = data.events || {};
        var statics = data.statics || {};
        delete data.attributes;
        delete data.events;
        delete data.statics;
        delete data.extend;
        function Constructor(options) {
            this._listener = [];
            for (var k in this._events) {
                if (this._events.hasOwnProperty(k)) {
                    this._listener[k] = [];
                    this._listener[k].push(this._events[k]);
                }
            }
            this.attributes = extend({}, attributes);
            this.id = options && options.id || lib.uniqueId('CLASSID');
            classFactory.register(this);
            this.init && this.init.apply(this, arguments);
        }
        var proto = Constructor.prototype = Object.create(parent.prototype);
        proto.constructor = Constructor;
        proto.Super = Constructor.Super = parent.prototype;
        Constructor.Parent = parent;
        proto._events = extend(proto._events || {}, events);
        extend(proto, {
            set: function (key, val) {
                if (this.attributes[key] !== val) {
                    this._previousAttributes = extend({}, this.attributes);
                    if (typeof this.attributes[key] === 'object') {
                        extend(this.attributes[key], val);
                    }
                    this.attributes[key] = val;
                    if (this['_set' + lib.toPascal(key)]) {
                        this['_set' + lib.toPascal(key)](key, val);
                    }
                    this.fire('change:' + key, [
                        key,
                        val
                    ]);
                    this.fire('change', [
                        key,
                        val
                    ]);
                }
            },
            get: function (key) {
                return this.attributes[key];
            },
            on: function (type, callback) {
                var t = this;
                type = cutOn(type);
                if (!t._listener[type]) {
                    t._listener[type] = [];
                }
                t._listener[type].push(callback);
            },
            fire: function (type, argAry, context) {
                type = cutOn(type);
                var events = this._listener[type];
                var i;
                var len;
                if (!type) {
                    throw new Error('\u672A\u6307\u5B9A\u4E8B\u4EF6\u540D');
                }
                context = context || this;
                if (events) {
                    for (i = 0, len = events.length; i < len; i++) {
                        events[i].apply(context, argAry);
                    }
                }
            },
            off: function (type, callback) {
                type = cutOn(type);
                var events = this._listener[type];
                if (type === 'all') {
                    this._listener = [];
                    return;
                }
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
        extend(Constructor, statics);
        extend(proto, data);
        return Constructor;
    };
    var classInstances = {};
    classFactory.get = function (id) {
        return classInstances[id];
    };
    classFactory.register = function (instance) {
        classInstances[instance.id] = instance;
    };
    classFactory.cancel = function (instance) {
        delete classInstances[instance.id];
    };
    return classFactory;
})();
defineObj['src/core/config'] = (function(){
    var config = {
        debug: true,
        widgetList: {
            title: {
                nativeName: 'title',
                type: 1
            },
            tab: {
                nativeName: 'tab',
                type: 1
            },
            navigation: {
                nativeName: 'navi',
                type: 1
            },
            toolbar: {
                nativeName: 'toolbar',
                type: 1
            },
            gallery: {
                nativeName: 'gallery',
                type: 2
            },
            dialog: {
                nativeName: 'dialog',
                type: 2
            }
        }
    };
    return config;
})();
defineObj['src/core/native'] = (function(){
    var config = defineObj['src/core/config'];
    var debug = config.debug;
    var widgetList = config.widgetList;
    var nativeApi = {};
    var _execute = function (method, args) {
        try {
            var api = window.lc_bridge;
            return api[method].apply(api, args);
        } catch (e) {
            console && console.log('Api_Error:' + method);
            console && console.log(e);
        }
    };
    var nativeData = {};
    var timeVal = null;
    var setDecoration = function (name, options) {
        if (options) {
            nativeData[name] = options;
        } else {
            delete nativeData[name];
        }
        if (timeVal) {
            clearTimeout(timeVal);
        }
        timeVal = setTimeout(function () {
            if (debug) {
                console.log(nativeData);
            }
            _execute('UIXSetDecorationNoCache', [JSON.stringify(nativeData)]);
        });
    };
    var showComponent = function (name, options) {
        if (timeVal) {
            clearTimeout(timeVal);
        }
        timeVal = setTimeout(function () {
            if (debug) {
                console.log(options);
            }
            _execute('UIXShow', [
                name,
                JSON.stringify(options)
            ]);
        });
    };
    nativeApi.render = function (name, options) {
        if (!widgetList[name]) {
            console.log('\u4E0D\u652F\u6301:' + name + '\u7EC4\u4EF6');
            return;
        }
        var widgetType = widgetList[name].type;
        var nativeName = widgetList[name].nativeName;
        if (widgetType === 1) {
            setDecoration(nativeName, options);
        } else if (widgetType === 2) {
            showComponent(nativeName, options);
        }
    };
    nativeApi.setPropertyById = function (id, options) {
        if (typeof options !== 'string') {
            options = JSON.stringify(options);
        }
        return _execute('UIXSetProperty', [
            id,
            options
        ]);
    };
    nativeApi.postMessage = function (webViewId, type, message) {
        if (!message) {
            message = type;
            type = webViewId;
            webViewId = null;
            _execute('postMessage', [
                type,
                message
            ]);
        } else {
            _execute('postMessage', [
                webViewId,
                type,
                message
            ]);
        }
    };
    nativeApi.execScript = function (webViewId, script) {
        _execute('exeJsRemote', [
            webViewId,
            script
        ]);
    };
    nativeApi.getWidgetList = function () {
        var api = window.lc_bridge;
        var widgets = api.getWidgetList ? api.getWidgetList() : Object.keys(widgetList);
        return widgets;
    };
    nativeApi.dataHook = function (type, options) {
        if (debug) {
            console.log(type, options);
        }
        _execute('UIXEvent', [
            type,
            JSON.stringify(options)
        ]);
    };
    nativeApi.execAction = function (ac) {
        nativeApi.dataHook('button_action', { option: 'action(' + ac + ')' });
    };
    nativeApi.open = function (url) {
        nativeApi.dataHook('button_action', { option: 'loadurl(' + url + ')' });
    };
    return nativeApi;
})();
defineObj['src/widgets/Style'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var lib = defineObj['src/core/lib'];
    var _naitveColor = function (color, opacity) {
        var colors;
        opacity = opacity || 1;
        opacity = Math.ceil(opacity * 255).toString(16);
        color = color || '#000000';
        var toX = function (str) {
            return ('00' + Number(str).toString(16)).substr(-2);
        };
        if (color.indexOf('#') === 0) {
            color = color.slice(1);
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
        } else if (colors = color.match(/^[\s]*rgb[a]?[\s]*\(([\,\d\s]+)\)/i)) {
            colors = colors[1].split(',');
            if (colors[3]) {
                opacity = toX(colors[3]);
            }
            color = '';
            for (var i = 0; i < 3; i++) {
                color += toX(colors[i]);
            }
        }
        return '#' + opacity + color;
    };
    var style = classFactory.create({
        init: function (options) {
            this.config = {};
            this._setOptions(options);
            return this;
        },
        type: 'style',
        events: {
            change: function (key) {
                if (this['_parse' + lib.toPascal(key)]) {
                    this['_parse' + lib.toPascal(key)](key);
                } else {
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },
        _setOptions: function (options) {
            options = options || {};
            var data = options.data;
            this.superId = options.superId;
            if (classFactory.get(options.superId)) {
                this.parentConfig = classFactory.get(options.superId).config;
                this.parentConfig.style = this.config;
            }
            data && this.update(data);
            return this;
        },
        _parseOpacity: function () {
            this._parseColor();
            this._parseBackgroundColor();
            return this;
        },
        _parseColor: function () {
            var color = this.get('color');
            var opacity = this.get('opacity');
            this.config.color = _naitveColor(color, opacity);
            return this;
        },
        _parseBackgroundColor: function () {
            var color = this.get('backgroundColor');
            var opacity = this.get('opacity');
            this.config.backgroundColor = _naitveColor(color, opacity);
            return this;
        },
        update: function (data) {
            data = data || {};
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    this.set(lib.toCamel(k), data[k]);
                }
            }
            return this;
        },
        render: function () {
            if (classFactory.get(this.superId)) {
                classFactory.get(this.superId).render();
            }
            return this;
        },
        destroy: function () {
            delete this.parentConfig.style;
            this.fire('destroy');
            this.off('all');
            return this;
        }
    });
    return style;
})();
defineObj['src/widgets/Item'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Style = defineObj['src/widgets/Style'];
    var lib = defineObj['src/core/lib'];
    document.addEventListener('UIXClick', function (e) {
        var data = JSON.parse(e.data);
        var id = data.id;
        classFactory.get(id).fire('tap');
    });
    var item = classFactory.create({
        init: function (options) {
            this.config = {};
            this._inited = false;
            this._setOptions(options);
            classFactory.register(this);
            return this;
        },
        type: 'item',
        events: {
            change: function (key) {
                if (this['_parse' + lib.toPascal(key)]) {
                    this['_parse' + lib.toPascal(key)](key);
                } else {
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },
        _setOptions: function (options) {
            options = options || {};
            var data = options.data || {};
            this.superId = options.superId;
            for (var k in data) {
                if (data.hasOwnProperty(k)) {
                    if (k.indexOf('on') === 0) {
                        this.bind(lib.cutOn(k), data[k]);
                    } else if (typeof data[k] !== 'function') {
                        this.set(k, data[k]);
                    } else {
                        this[k] = data[k];
                    }
                }
            }
            return this;
        },
        _parseStyle: function () {
            if (!this.styleObj) {
                this.styleObj = new Style({ superId: this.id });
            }
            this.style();
            return this;
        },
        _parseAction: function (key, nativeString) {
            var action;
            if (key === 'href') {
                action = 'loadurl(' + this.get('href') + ')';
            } else if (key === 'tap') {
                action = 'uievent({"id":"' + this.id + '"})';
            } else if (key === 'native') {
                action = 'action(' + nativeString + ')';
            }
            return action;
        },
        _parseHref: function () {
            this.config.action = this._parseAction('href');
            return this;
        },
        _parseIndex: function () {
            var items = this._items;
            var index = this.get('index');
            if (this._inited) {
                this.remove();
            }
            items.splice(index, 0, this.config);
            return this;
        },
        appendTo: function (itemsAry, index) {
            this._inited = true;
            this._items = itemsAry;
            this.index = index || itemsAry.length;
            this.set('index', this.index);
            return this;
        },
        style: function (data) {
            if (arguments.length === 1 && typeof data === 'string') {
                return this.styleObj.get(data);
            } else if (!this.get('style')) {
                this.set('style', {});
            }
            if (arguments.length === 1 && typeof data === 'Object') {
                lib.extend(this.get('style'), data);
            } else if (arguments.length === 2) {
                var objData = {};
                objData[arguments[0]] = arguments[1];
                this.style(objData);
            }
            this.styleObj.update(this.get('style'));
            return this;
        },
        bind: function (type, fn) {
            if (typeof fn === 'string') {
                this.config.action = this._parseAction('native', fn);
            } else {
                this.on(type, fn);
                this.config.action = this._parseAction('tap');
            }
            return this;
        },
        unbind: function (fn) {
            this.off('tap', fn);
            return this;
        },
        remove: function () {
            this._items.splice(this.index, 1);
            this.fire('onremove');
            return this;
        },
        render: function () {
            if (this._inited) {
                classFactory.get(this.superId).render();
            }
            return this;
        },
        destroy: function () {
            this.remove();
            classFactory.cancel(this);
            this.fire('destroy');
            this.off('all');
        }
    });
    return item;
})();
defineObj['src/widgets/Widget'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var nativeApi = defineObj['src/core/native'];
    var lib = defineObj['src/core/lib'];
    var Style = defineObj['src/widgets/Style'];
    var Item = defineObj['src/widgets/Item'];
    var Widget = classFactory.create({
        init: function (options) {
            options = options || {};
            this.itemList = {};
            this.config = {};
            if (typeof this._init === 'function') {
                this._init.apply(this, arguments);
            }
            this.styleInstance = new Style({
                superId: this.id,
                data: options.style ? options.style : {}
            });
            if (options) {
                this._setConfig(options);
            }
            this.render();
        },
        events: {
            change: function (key) {
                var item;
                var filterConfig = this.filterConfig;
                if (this.itemTypes && this.itemTypes.indexOf(key) !== -1) {
                    for (var i = 0; i < this.get(key).length; i++) {
                        item = this.create(this.get(key)[i]);
                        this.append(item, key);
                    }
                } else if (filterConfig && filterConfig.indexOf(key) !== -1) {
                    this.config[key] = this.get(key);
                }
                this.render();
            }
        },
        _setConfig: function (options) {
            var name;
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    this.set(name, options[name]);
                }
            }
        },
        create: function (options) {
            var opt = {
                superId: this.id,
                data: options
            };
            return new Item(opt);
        },
        append: function (item, type) {
            type = type ? type : 'items';
            var itemArr;
            if (!(this.config[type] instanceof Array)) {
                this.config[type] = [];
            }
            itemArr = this.config[type];
            item.appendTo(itemArr);
            this.itemList[type] = this.itemList[type] ? this.itemList[type] : [];
            this.itemList[type].push(item);
            return this;
        },
        removeItem: function (type, index) {
            if (this.itemList[type]) {
                this.itemList[type].splice(index, 1).remove();
            }
            return this;
        },
        style: function (options) {
            if (arguments.length === 1 && typeof options === 'string') {
                return this.styleInstance.get(options);
            }
            if (arguments.length === 2 && typeof options === 'string') {
                var objData = {};
                objData[arguments[0]] = arguments[1];
                this.style(objData);
            }
            this._setStyle('style', options);
            return this;
        },
        _setStyle: function (key, options) {
            this.styleInstance.update(options);
            return this;
        },
        show: function () {
            this.config = this.configCache ? this.configCache : this.config;
            delete this.configCache;
            this.render();
        },
        hide: function () {
            this.configCache = this.config;
            delete this.config;
            this.render();
        },
        render: function () {
            this.fire('beforeRender');
            nativeApi.render(this.type, this.config);
            this.fire('render');
        },
        destroy: function () {
            delete this.config;
            this.render();
            this.off('all');
        }
    });
    return Widget;
})();
defineObj['src/widgets/Title'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var title = classFactory.create({
        extend: Widget,
        type: 'title',
        _init: function (options) {
            this.itemTypes = [
                'center',
                'left',
                'right'
            ];
            this.filterConfig = ['id'];
            this._setImage = this._setTitleItem;
            this._setTitle = this._setTitleItem;
        },
        _setTitleItem: function (key, value) {
            var opts = {};
            key = 'title' === key ? 'text' : key;
            opts[key] = value;
            if (!this.titleItem) {
                this.titleItem = this.create(opts);
                this.append(this.titleItem, 'center');
            } else {
                this.titleItem.set(key, value);
            }
        }
    });
    return title;
})();
defineObj['src/widgets/Tab'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var tab = classFactory.create({
        extend: Widget,
        type: 'tab',
        _init: function (options) {
            this.itemTypes = ['items'];
            this.filterConfig = ['id'];
        }
    });
    return tab;
})();
defineObj['src/widgets/Navigation'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var nativeApi = defineObj['src/core/native'];
    var navigation = classFactory.create({
        extend: Widget,
        type: 'navigation',
        _init: function (options) {
            this.itemTypes = ['items'];
            this.filterConfig = [
                'id',
                'type'
            ];
        },
        show: function () {
            nativeApi.execAction('navi');
        }
    });
    return navigation;
})();
defineObj['src/widgets/Toolbar'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var toolBar = classFactory.create({
        extend: Widget,
        type: 'toolbar',
        _init: function () {
            this.itemTypes = ['items'];
            this.filterConfig = ['id'];
        }
    });
    return toolBar;
})();
defineObj['src/widgets/Gallery'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var gallery = classFactory.create({
        extend: Widget,
        type: 'gallery',
        _init: function (options) {
            this.itemTypes = [
                'center',
                'left',
                'right'
            ];
            this.filterConfig = [
                'id',
                'gallery',
                'index'
            ];
            return this;
        },
        show: function () {
            this.render();
        },
        _setImages: function (key, value) {
            var options = value;
            var images;
            if (typeof options === 'object' && options.constructor === Array) {
                images = options;
            }
            for (var i = 0, len = images.length; i < len; i++) {
                images[i].text = images[i].title;
                delete images[i].title;
            }
            this.set('gallery', images);
            return this;
        }
    });
    return gallery;
})();
defineObj['src/widgets/Dialog'] = (function(){
    var classFactory = defineObj['src/core/Class'];
    var Widget = defineObj['src/widgets/Widget'];
    var nativeApi = defineObj['src/core/native'];
    var title = classFactory.create({
        extend: Widget,
        type: 'dialog',
        _init: function (options) {
            this.itemTypes = ['items'];
            this.filterConfig = [
                'title',
                'description'
            ];
        },
        _setTitle: function (key, value) {
            this.config.text = value;
        },
        show: function () {
            nativeApi.render('dialog', this.config);
        },
        hide: function () {
            nativeApi.render('dialog', {});
        }
    });
    return title;
})();
defineObj['src/widgets'] = (function(){
    var Title = defineObj['src/widgets/Title'];
    var Tab = defineObj['src/widgets/Tab'];
    var Navigation = defineObj['src/widgets/Navigation'];
    var Toolbar = defineObj['src/widgets/Toolbar'];
    var Gallery = defineObj['src/widgets/Gallery'];
    var Dialog = defineObj['src/widgets/Dialog'];
    var widgets = {};
    widgets.title = Title;
    widgets.tab = Tab;
    widgets.navigation = Navigation;
    widgets.toolbar = Toolbar;
    widgets.gallery = Gallery;
    widgets.dialog = Dialog;
    return widgets;
})();
defineObj['src/core/event'] = (function(){
    var lib = defineObj['src/core/lib'];
    var native = defineObj['src/core/native'];
    var event = {};
    var handlers = {};
    var addEventListener = function () {
        if (lib.isUIX) {
            return function (type, callback, useCapture) {
                var data = { type: type };
                native.postMessage('event_register', data);
                document.addEventListener(type, callback, useCapture);
            };
        }
        return function (type, callback, useCapture) {
            document.addEventListener(type, callback, useCapture);
        };
    }();
    var removeEventListener = function () {
        if (lib.isUIX) {
            return function (type, callback, useCapture) {
                var data = { type: type };
                native.postMessage('event_unregister', data);
                document.removeEventListener(type, callback, useCapture);
            };
        }
        return function (type, callback, useCapture) {
            document.removeEventListener(type, callback, useCapture);
        };
    }();
    var fire = function () {
        if (lib.isUIX) {
            return function (type, message) {
                var data = {
                    type: type,
                    message: message
                };
                native.postMessage('delegate', data);
            };
        }
        return function (type, message) {
            var event = document.createEvent('Event');
            event.initEvent(type, true, true);
            event.data = message;
            document.dispatchEvent(event, message);
        };
    }();
    event.on = function (type, handler) {
        if (handlers[type]) {
            handlers[type].listener.push({
                callback: handler,
                context: null
            });
            if (!handlers[type].listened) {
                addEventListener(type, handlers[type].callback, false);
                handlers[type].listened = true;
            }
        } else {
            handlers[type] = {};
            handlers[type].listener = [];
            handlers[type].callback = function (event) {
                var listeners = handlers[type].listener;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].callback.call(listeners[i].context, event);
                }
            };
            this.on(type, handler);
        }
    };
    event.off = function (type, handler, context) {
        context = context || this;
        if (handlers[type]) {
            if (!handler) {
                removeEventListener(type, handlers[type].callback, false);
                handlers[type].listened = false;
                handlers[type].listener.length = 0;
            } else {
                var listeners = handlers[type].listener;
                var index;
                index = listeners.indexOf(handler);
                listeners.splice(index, 1);
                if (listeners.length === 0 && handlers[type].listened) {
                    removeEventListener(type, handlers[type].callback);
                    handlers[type].listened = false;
                }
            }
        }
    };
    event.fire = function (type, data) {
        fire(type, data);
    };
    return event;
})();
defineObj['src/blend'] = (function(){
    var lib = defineObj['src/core/lib'];
    var widgets = defineObj['src/widgets'];
    var event = defineObj['src/core/event'];
    var nativeApi = defineObj['src/core/native'];
    var blend = {};
    blend.ACTIVEBACK = 'back';
    blend.WIDGETNAVI = 'navi';
    blend.WIDGETSHARE = 'share';
    blend.create = function (name, options) {
        var Widget = widgets[name];
        if (Widget && lib.isClass(Widget)) {
            return new Widget(options);
        }
        return null;
    };
    var startTime = 1 * new Date();
    blend.readyState = false;
    var _readyFn = [];
    lib.ready(function () {
        blend.readyState = true;
        blend.initTime = 1 * new Date() - startTime;
        _readyFn.forEach(function (v, k) {
            v();
        });
        _readyFn = [];
    });
    blend.ready = function (callback) {
        if (blend.readyState) {
            callback();
        } else {
            _readyFn.push(callback);
        }
    };
    blend.isUIX = lib.isUIX;
    blend.back = function () {
        nativeApi.execAction('back');
    };
    blend.open = function (url) {
        nativeApi.open(url);
    };
    lib.extend(blend, event);
    return blend;
})();
;(function(){var blend = defineObj['src/blend'];
    window.Blend = blend;
})()
defineObj['src/main'] = (function(){
    return;
})();;})()