##UIX接口


###UIXSetDecoration

	UIXSetDecoration (String option)

向UIX传输整体数据，即UIX数据，需把JSON转化为字符串；


###UIXShow

	UIXShow (String component, String option)

显示相应组件；

参数：

- component： 组件名字，目前支持gallery和dialog；
- option：组件数据项；

###UIXSetProperty

	UIXSetProperty(String id, String option)
更新相应组件信息

参数：

- id: 数据中描述的组件id;
- option: 更新的组件数据


###UIXHandleEvent

	UIXHandleEvent(String action, String option)

调用Nativie Activity功能，比如关闭；

参数：

- action: 功能key, 目前仅支持finish；
- option: 传输数据；


###postMessage

	postMessage(String webviewid, String type, String message)

向指定的页面发送消息
	
参数：
	
webviewid：string webviewid页面索引id
	
type：string 发送的消息类型

message：string 发送的消息

###exeJsRemote

	exeJsRemote(String webviewid, String jscode)

向指定的页面注入js代码
	
参数：
	
webviewid：string webviewid页面索引id
	
jscode：string js代码字符串


##UIX数据
UIX的渲染和绘制按照数据来定义，如下数据格式：

	{
		"style": {
        	"bgcolor": "#ff82bac9",
        	"fontcolor": "#ffffffff"
    	},
		"title":{
			"id": "title",
        	"center": [{
                "text": "峨眉山"
            }],
	        "style": {
	            "bgcolor": "#ff82bac9",
	            "fontcolor": "#ffffffff"
	        },
	        "right": [{
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/top_user.png",
	                "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/profile.html)"
	         }]
		},
		.....
	}

数据中除总体样式style外，其余按照组件来组织；

主要包括：

- Widget组件:  title, tab, toolbar, menu
- Component组件: search, dialog, gallery, navi

##组件数据描述
见文档: uix-widget


