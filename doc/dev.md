#Native文档

##UIX概要

UIX主要提供的组件包括：
	Widget组件: Btn, Title, Tab, Toolbar, Menu

Component组件: 
	Search, Dialog, Gallery, Navi

##接口命名空间

lc_bridge

##接口方法：

###1. UIXSetDecoration (String option)
	
	描述：渲染widget组件

	参数说明：
	option string json字符串，描述widget的结构
	
	option参数描述：

	UIX组件的基本元素的数据格式：
	{
		"id": "base"
	    "text": "文本", // 文本、标题等
	    "image": "图片URL", // 图标（本地内置图片或网络图片）
		"action": "loadurl(URL地址) | action(动作名) | uievent(js响应clickEvent 数据)|js(js数据)|menu(菜单id)"  
	}

###2. UIXShow (String component, String option)

	描述：调用component组件
	
	参数说明：
	
	component string 组件类型,可选值 [gallery | dialog | finished]
	
	option string 同上

###3. UIXSetProperty(String id, String option)

	描述：重绘widget组件
	
	参数说明：
	
	id string json字符串中基本元素索引id
	
	option string 同上

###4. postMessage(String webviewid, String type, String message)

	描述:向指定的页面发送消息
	
	参数说明：
	
	webviewid string webviewid页面索引id
	
	type string 发送的消息类型

	message string 发送的消息

###5. exeJsRemote(String webviewid, String jscode)

	描述：向指定的页面注入js代码
	
	参数说明：
	
	webviewid string webviewid页面索引id
	
	jscode string js代码字符串

##系统事件

###1. webview_register

系统在webview onPageFinished的时候触发

###2. webview_unregister

系统在activity onDestory的时候触发

## 组件JSON描述示例

	{
	    "style": {
	        "bgcolor": "#ff82bac9",
	        "fontcolor": "#ffffffff"
	    },
	    "title": {
	        "id": "title",
	        "style": {
	            "bgcolor": "#ff82bac9",
	            "fontcolor": "#ffffffff"
	        },	        
			"text": [
	            {
	                "text": "峨眉山"
	            }
	        ],

	        "right": [
	            {
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/top_user.png",
	                "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/profile.html)"
	            }
	        ]
	    },
	    "toolbar": {
	        "id": "toolbar",
	        "style": {
	            "bgcolor": "#ff82bac9",
	            "fontcolor": "#ffffffff"
	        },
	        "button": [
	            {
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_zx.png",
	                "text": "咨询",
	                "action": "loadurl(http://openapi.baidu.com/widget/social/comment/list?app_id=3481507&third_source_id=92c037d3809b30be9d7cbfbb28e589e4&url=http%3A%2F%2Ffedev.baidu.com%2F~gaotianyi%2Femshan%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&return_url=http%3A%2F%2Ffedev.baidu.com%2F~gaotianyi%2Femshan%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&state=list)"
	            },
	            {
	                "style": {
	                    "bgcolor": "#ff33cde7",
	                    "fontcolor": "#ffffffff"
	                },
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_home.png",
	                "action": "action(navi)"
	            },
	            {
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_pj.png",
	                "text": "评价",
	                "badge": 99,
	                "action": "loadurl(http://openapi.baidu.com/widget/social/comment/list?app_id=3481507&third_source_id=d714ecb4bd52aa8f15f2e586f732b584&url=http%3A%2F%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&return_url=http%3A%2F%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&state=list)"
	            },
				...
	        ]
	    },
	    "navi": {
	        "id": "navi",
	        "button": [
	            {
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/map.png",
	                "text": "地图导航",
	                "action": "loadurl(geo:29.569034,103.383377?z=15)"
	            },
	            {
	                "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/profile.png",
	                "text": "个人中心",
	                "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/profile.html)"
	            },
				...
	        ]
	    },
	    "menu": {
	        "type": "list",
	        "button": [
	            {
	                "text": "微信好友",
	                "image": "local_bdsocialshare_weixin_friend",
	                "action": "share(weixin_friend)"
	            },
	            {
	                "text": "微信朋友圈",
	                "image": "local_bdsocialshare_weixin_timeline",
	                "action": "share(weixin_timeline)"
	            },
	            {
	                "text": "QQ好友",
	                "image": "local_bdsocialshare_qqfriend",
	                "action": "share(qqfriend)"
	            },
	            {
	                "text": "新浪微博",
	                "image": "local_bdsocialshare_sinaweibo",
	                "action": "share(sinaweibo)"
	            },
				...
	        ]
	    }
	}