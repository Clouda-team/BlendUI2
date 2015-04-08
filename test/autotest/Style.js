
// src/core/Class 类工具函数
define(['../../src/widgets/Style'],function(Style){
    var expect = chai.expect;
    describe('Style类测试', function(){
        //describe('Style结构函数',function(){
            it('Style函数', function () {
                expect(Style).to.be.a('function');
                expect(Style).to.be.instanceof(Function);
            });
        //});

        //describe('创建Style类',function(){
            var titleBar = {
                config :  {}
            };
            var styleObj = new Style({
                data : {
                    color: "rgb (255 ,  255, 0)",
                    opacity : 1,
                    'background-color':'#ffffff'
                },
                superId: 'ttttt'
            });

            it('style实例', function () {
                expect(styleObj).to.be.instanceof(Style);
                expect(styleObj.get('opacity')).to.equal(1);
                expect(styleObj.get('color')).to.equal('rgb (255 ,  255, 0)');
                expect(styleObj.config.color).to.equal('#ffffff00');
                styleObj.set('color','#f00');
                expect(styleObj.get('color')).to.equal('#f00');
                expect(styleObj.config.color).to.equal('#ffff0000');
                styleObj.update({
                    color: "rgba(255,255,255,0)"
                });
                expect(styleObj.get('color')).to.equal('rgba(255,255,255,0)');
                expect(styleObj.config.color).to.equal('#00ffffff');
            });
        //});
    });
});