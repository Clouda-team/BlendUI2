##UIX数据描述

**基本元素**

基本元素我们称为一个item, 数据格式如下：

    {
        style:{}
        "text":"xxx",
        "image":"xxxx",
        "action":"行为()"
    }

text和image同时存在，image优先；
action如存表示操作此元素所产生的行为,如下：

- loadurl(URL地址)：载入URL地址；
- action('xxxx'),naitve组件操作，暂时支持back, search, share;
- uievent：向webview注入js数据，通过UIXClick事件接收；
- js(js数据): 向webview注入原生js数据
- share(分享项):weixin\_friend weixin_timeline qqfriend qqweibo sinaweibo qqdenglu baiduhi others


**样式style数据格式：**

    style:{
        backgroundColor:"xxxx", //背景颜色，格式"#xxxxxxxx" 8(前两位是alpha透明度)或6位16进制值；
        color:"xxxx" //字体颜色，格式同上
    }

item+样式组合成了一个widget,一个widget可以有多个item,widget可以设置整体样式;

现在支持的widget如下：

###title

title分三部分，左、中和右，每一部分都是一个item组合；


    {
        id:"xxxx", //id标识, 非必需；
        style:{
        },
        left:[    //title的靠左元素
            {
                "text":"",
                "image":"",
                "action":"",
            }
        ],
        right:[  //title的靠左元素
            {
                "text":"",
                "image":"",
                "action":"",
            }
        ],
        center:[
            {
                "text":"",
                "image":"",
                "action":"",
            }
        ]
    }

###toolbar

    {
        id:"xxxx",
        style:{

        },
        items:[
            {
                style:{
                },
                "text":"",
                "image":"",
                "action":"",
            },
            {
                 style:{}
                "text":"",
                "image":"",
                "action":"",
            }
        ]
    }

### navi

    {
        id:"xxxx",
        items:[
            {
                "text":"",
                "image":"",
                "action":"",
            },
            {
                style:{}
                "text":"",
                "image":"",
                "action":"",
            },
            ......
        ]
    }

### menu

    {
        id:"xxxx",
        items:[
            {
                "text":"微信好友",
                "image":"local_bdsocialshare_weixin_friend",
                "action":"share(weixin_friend)",
            },
            {
                "text":"微信朋友圈",
                "image":"local_bdsocialshare_weixin_timeline",
                "action":"share(weixin_timeline)",
            },
            ......
        ]
    }

### tab

    {
        id:"xxxx",
        items:[
            {
                "text":"",
                "image":"",
                "action":"",
            },
            {
                style:{}
                "text":"",
                "image":"",
                "action":"",
            },
            ......
        ]
    }


###tabbar

    {
        id:"xxxx",
        items:[
            {
                "text":"",
                "image":"",
                "action":"",
            },
            {
                style:{}
                "text":"",
                "image":"",
                "action":"",
            },
            ......
        ]
    }

###gallery

    {
        id:'xxxx',
        index:1,
        gallery:[
            {
                text:'xxxx',
                description:'xxxxx',
                image:'xxxxxx',
            },
            {
                text:'xxxx',
                description:'xxxxx',
                image:'xxxxxx',
            },
            {
                text:'xxxx',
                description:'xxxxx',
                image:'xxxxxx',
            },
            {
                text:'xxxx',
                description:'xxxxx',
                image:'xxxxxx',
            }
        ]
    }

----------
by修改： zhangjianguang@baidu.com  2/2/2015 9:32:12 AM

