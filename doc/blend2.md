# Blend2

## blend2简介

Blend2是提供给web开发人员，快速接入Naitve组件的接口方法;

## blend2目标

### 一期目标
参考文档uix-api.md和uix-widget.md；前期封装一个完整的框架系统，对齐Naitve现有功能组件；

- 布局组件: title，toolbar，tab，navigation
- 展示组件： share, gallery, dialog

为了更好的组件扩充和系统集成，框架需包含：

- 创建组件的核心类系统，
- 组件和web的通信机制；

现有Native是通过传输json数据，自动绘制ui许多操作等都是naitve自动完成；
希望设计接口组件之间是独立个体，用户可以自由选择naitve组件调用，调用形式对web开发者友好；

### 二期目标
衔接boostui组件, 分类增加boostui到naitve组件的替换;

## Blend2计划API
只是初步计划API接口和形式, 后面每个组件还要详细出输入和输出文档;

### create

创建组件

    Blend.ui.create(widgetName,options);

参数：

- widgetName： widget名字
- options: 组件配置


返回widget对象；

### on

	Blend.ui.on(customEvent, handler);

添加事件监听

参数：

- customEvent: 自定义事件类型;
- handler: 事件监听器

### fire

	Blend.ui.fire(customEvent);

触发事件

参数：

- customEvent: 自定义事件类型;


### off

取消事件监听

	Blend.ui.off(customEvent, handler);

参数：

- customEvent: 自定义事件类型;
- handler: 事件监听器

### ready

对Naitve ready的监听封装，调用组件必须在此回调中才能正确执行;
    
    Blend.ui.ready(callback);

参数：

- callback: 监听触发函数;



## Widget对象

用户调用Blend.ui.create('对象名字'，{配置项})；创建独立的widget对象；


### title

顶部标题组件

方法：

 - setTitle：设置标题
 - addLeftItem：增加左部按钮
 - addRightItem：增加右部按钮
 - setStyle： 设置样式
 - destory：销毁

调用形式：

	var title = Blend.ui.create('title',{
		color:"#ffffff",
		text:'百度一下'
	});
	title.addLeftItem({
		'text':'菜单'
	});

    title.setStyle({
        backgroundColor:"#cccccc",
        opacity:0.8,
        color:"#ff0000"
    });

### toolbar 

底部工具栏

方法：

- show：显示
- hide：隐藏
- addTip: 怎加tip标识
- addItem: 增加按钮
- destory：销毁

### tab 

多个页面组成的naitve tab组件

方法：

- active: tab切换
- addItem: 增加某项
- removeItem: 删除某项
- destory：销毁 

### navigation
全局组件

方法:

- show: 显示
- hide: 隐藏
- addItem: 增加项
- removeItem: 删除项
- destory: 销毁

### alert

弹出提示框

### confirm

弹出确认框

### toast

消息提示



