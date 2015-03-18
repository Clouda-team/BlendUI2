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
            expect(lc_bridge).to.have.property('UIXSetDecoration');
            expect(lc_bridge).to.have.property('UIXShow');
            expect(lc_bridge).to.have.property('UIXSetProperty');
            expect(lc_bridge).to.have.property('UIXHandleEvent');
        });

        it("渲染titleBar",function(done){
            lc_bridge.UIXSetDecoration(JSON.stringify({
                style: config.style,
                title: config.title
            }));
            setTimeout(function(){
                expect(confirm("titleBar是否显示")).to.be.true;
                done();
            },2000);
        });

        it("渲染toolBar", function(done){
            lc_bridge.UIXSetDecoration(JSON.stringify({
                style: config.style,
                toolbar: config.toolbar
            }));
            setTimeout(function(){
                expect(confirm("toolbar是否显示")).to.be.true;
                done();
            },1000);
        });        

        it("toolbar局部更新", function(done){
            lc_bridge.UIXSetProperty('comment',JSON.stringify({badge: 108}));
            setTimeout(function(){
                expect(confirm("toolbar评论数是否变更为108")).to.be.true;
                done();
            },1000);
        });
    });

    describe("测试图片浏览组件", function(){

        var gallery = {
            "index": 0,
            "gallery": [
                {
                    'text':"一张图片",
                    'image':"http://fedev.baidu.com/~gaotianyi/ems/public/images/res/timg.jpg",
                    'description':"图片描述"
                }
            ]
        };

        describe("图片组件配置文件",function(){
            it("图片组件数据",function(){
                expect(gallery).to.be.a("object");
                expect(gallery.gallery).to.have.length.above(0);
            })
        })

        describe("图片浏览组件验证",function(){
            this.timeout(50000);
            it("存在浏览组件方法",function(){
                expect(lc_bridge.UIXShow).to.exist; 
            });

            it("图片浏览组件调用正常", function(){
                lc_bridge.UIXShow("gallery",JSON.stringify(gallery));
                setTimeout(function(done){
                    expect(confirm("图片浏览组件是否显示")).to.be.true;
                    done();
                },1000);
            });
        });
    });

    describe("Dialog测试",function(){
        var dialog = {
            "text": "标题",
            "description": "测试对话框",
            "button": [
                {
                    "text": "确定",
                    "onclick": "js()"
                },
                {
                    "text": "取消",
                    "onclick": "js()"
                }
            ]
        };

        it("Dialog", function(){
            lc_bridge.UIXShow("dialog",JSON.stringify(dialog));
            setTimeout(function(done){
                expect(confirm("测试对话框")).to.be.true;
                done();
            },1000);
        });        
    })

    describe('Component', function () {
        describe('Component',function(){
            it('验证Component类', function () {
                expect(Component).to.be.a('function');
                expect(Component).to.be.instanceof(Function);
                expect(Component).to.not.throw(Error);
            });

            it('创建Component对象', function () {
                
                var testComponent;
                
                var createComponent = function(config){
                    testComponent = new Component(config);
                }

                expect(createComponent).to.not.throw(Error);

                // expect(testComponent).to.be.instanceof(Component);

                //expect(testComponent.show()).to.not.throw(Error);



                // expect(createLayerNoUrl).to.throw(Error);
                // expect(createLayerHaveUrl).to.not.throw(Error);
                // expect(testLayer).to.be.instanceof(Layer);
                // expect(testLayer.id).to.equal('test1');
                // expect(testLayer.in).to.be.a('function');
                // expect(activeLayer).to.not.throw(Error);
                // expect(testLayer.isActive()).to.be.true;
                // expect(outLayer).to.not.throw(Error);
                // expect(testLayer.isActive()).to.not.be.true;
                // expect(testLayer.canGoBack()).to.not.be.true;
                // testLayer.getUrl() 是异步的;
                // expect(testLayer.url).to.match(/^http:/);
                   
            });
        });
    });
});