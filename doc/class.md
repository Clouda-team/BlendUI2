# Class类工厂


## 目的
按照配置生成js的系统类，实现类的继承及其事件触发机制；

## 实例

    Class({
		// 继承
		extend:父类，

        // 结构函数的静态属性
        static:{
        },

        // 函数的动态属性统一通过config管理，属性的改变和获取统一set和get;
        config:{

        },

        // 事件 key为事件类型，value为触发函数
        event:{
            'type':callback,
        },

        // 结构体函数的方法
        // init会创建对象的时候自动调用
        init:function(){},
        method1:function(){},
        method2:function(){}
    });

此上面的类函数Class就是创建的类的工厂方法，通过option简单配置生成所需要的类， 需要有下面功能：

1. 创建的是JS类；
2. 方便继承
3. 方便属性生成,类的静态属性，动态属性和各种扩展方法；
4. 可灵活实现类中事件的触发，比如类生成的对象在销毁的时候要触发类的classObj.destory调用的时候会触发
    
    class.on('destory',callback);

5. 类对象属性的增加、删除和修改会触发相应事件，属性获取和设置统一走set和get；

## 测试

参考：test/autotest/Class.js