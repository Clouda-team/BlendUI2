# Blend2

## blend2简介

Blend2提供快速接入Naitve组件的接口方法；


## Blend2 API

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

### create

创建组件

	Blend.ui.create(widgetName,options);

参数：

- widgetName： widget名字
- options: 组件配置


返回widget对象；

## Widget对象

用户调用Blend.ui.create('对象名字'，{配置项})；创建独立的widget对象；


### titlebar

顶部导航组件

方法：

 - setTitle：设置标题
 - addLeftItem：增加左部按钮
 - addRightItem：增加右部按钮
 - setOptions： 修改配置项
 - destory：销毁

### tabbar
底部Tab切换工具栏

方法：

- show：显示
- hide: 隐藏
- active: 激活相应项
- addItem： 增加按钮
- removeItem: 删除按钮
- destory： 销毁

### toolbar 

底部工具栏

方法：

- show：显示
- hide：隐藏
- addTip: 怎加tip标识
- destory：销毁 

###slider
局部幻灯片

方法：

- show: 显示
- hide: 隐藏
- slideTo：滚动到所指示的序列
- addItem: 增加项
- removeItem: 删除项
- next: 滚动到下一个项
- pre: 滚动到上一个序列
- destory：销毁

### 

### alert

弹出提示框

### confirm

弹出确认框

### toast

消息提示

