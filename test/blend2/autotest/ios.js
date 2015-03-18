define(['../../src/hybrid/Component'],function(Component){
    var expect = chai.expect;
    
    var config = {
        "style": {
            "bgcolor": "#ff82bac9",
            "fontcolor": "#ffffffff"
        },
        "title": {
            "id": "title",
            "text": [
                {
                    "text": "测试标题"
                }
            ],
            "style": {
                "bgcolor": "#ff82bac9",
                "fontcolor": "#ffffffff"
            },
            "right": [
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/top_user.png",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/profile.html)"
                }
            ]
        },
        "toolbar": {
            "id": "toolbar",
            "orientation": "horizontal",
            "gravity": "right",          
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
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_dy.png",
                    "text": "门票",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/ticket.html)"
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
                    "id": "comment",
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_pj.png",
                    "text": "评价",
                    "badge": 1,
                    "action": "loadurl(http://openapi.baidu.com/widget/social/comment/list?app_id=3481507&third_source_id=d714ecb4bd52aa8f15f2e586f732b584&url=http%3A%2F%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&return_url=http%3A%2F%2F51youhui.baidu.com%2Femeishan%2F%3Fappid%3D0&state=list)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/b_share.png",
                    "text": "分享",
                    "action": "action(share)"
                }
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
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/intro.png",
                    "text": "景区概况",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/intro.html)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/line.png",
                    "text": "如何到达",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/line.html)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/ticket.png",
                    "text": "景区门票",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/ticket.html)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/picture.png",
                    "text": "精美相册",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/album.html)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/hot.png",
                    "text": "热门景区",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/poilist.html)"
                },
                {
                    "image": "http://fedev.baidu.com/~gaotianyi/emeishan/public/images/nav/video.png",
                    "text": "视频直播",
                    "action": "loadurl(http://fedev.baidu.com/~gaotianyi/emeishan/iframe.html)"
                }
            ]
        }
    };
    var option = {
        pullText:"下拉刷新...",
        loadingText: "更新中,请等待",
        releaseText: "释放更新"
    };
    lc_bridge.layerSetPullRefresh(lc_bridge.currentLayerId(), true, JSON.stringify(option));
    setTimeout(function(){
        lc_bridge.layerStopRefresh(lc_bridge.currentLayerId())
    },1000);

    describe("测试配置文件", function(){
        it('验证配置文件',function(){
            expect(config).to.be.a("object");
            expect(config.style).to.be.not.empty;
            expect(config.title).to.be.not.empty;
            expect(config.toolbar).to.be.not.empty;
            expect(config.navi).to.be.not.empty;
        })
    });


    describe("测试Native的支持", function(){
        this.timeout(50000);
        it('存在命名空间lc_bridge',function(){
            expect(lc_bridge).to.exist;
            expect(lc_bridge).to.be.a('object');
        });

        it('测试lc_bridge的方法的有效性', function(){
            expect(lc_bridge).to.have.property('layerSetTitleOptions');
            expect(lc_bridge).to.have.property('layerSetTabbar');
        });

        it("渲染titleBar",function(done){
            lc_bridge.layerSetTitleOptions(lc_bridge.currentLayerId(), JSON.stringify({
                style: config.style,
                title: config.title
            }));
            setTimeout(function(){
                expect(confirm("titleBar是否显示")).to.be.true;
                done();
            },2000);
        });

        it("渲染toolBar", function(done){
            lc_bridge.layerSetTabbar(lc_bridge.currentLayerId(), JSON.stringify({
                style: config.style,
                toolbar: config.toolbar
            }));
            setTimeout(function(){
                expect(confirm("toolbar是否显示")).to.be.true;
                done();
            },1000);
        }); 
        
        it("测试禁用下拉刷新", function(done){
            lc_bridge.layerStopRefresh(lc_bridge.currentLayerId());
            lc_bridge.layerSetPullRefresh(lc_bridge.currentLayerId(), false);

            setTimeout(function(){
                expect(confirm("下拉刷新是否禁用")).to.be.true;
                done();
            },1000);
        }); 

        it("测试下拉刷新", function(done){
            var option = {
                pullText:"下拉刷新...",
                loadingText: "更新中,请等待",
                releaseText: "释放更新"
            };
            lc_bridge.layerSetPullRefresh(lc_bridge.currentLayerId(), true, JSON.stringify(option));
            lc_bridge.layerStopRefresh(lc_bridge.currentLayerId());
            setTimeout(function(){
                expect(confirm("下拉刷新是否禁用")).to.be.true;
                done();
            },5000);
        }); 

        // it("toolbar局部更新", function(done){
        //     lc_bridge.UIXSetProperty('comment',JSON.stringify({badge: 108}));
        //     setTimeout(function(){
        //         expect(confirm("toolbar评论数是否变更为108")).to.be.true;
        //         done();
        //     },1000);
        // });
    });

});