
// src/core/Class 类工具函数
define(['../../_src/widgets/Widget'],function(Widget){
    var expect = chai.expect;
    describe('Widget类测试', function(){
        describe('Widget结构函数',function(){
            it('Widget函数', function () {
                expect(Widget).to.be.a('function');
                expect(Widget).to.be.instanceof(Function);
            });
        });
        
        describe('创建widget',function(){
            var classA = Class({
                
                statics:{
                    "sTitle":"aaa"
                },
                otherMethod : function(){
                    this.set("title","33");
                }
            });
            var objClasA = new classA();
            it('classA类', function () {
                expect(classA).to.be.instanceof(Function);
                expect(classA.sTitle).to.equal('aaa');
            });
            it('classA类的实例', function () {
                expect(objClasA).to.be.instanceof(classA);
                expect(objClasA.get('title')).to.equal('11');
                objClasA.set('title','22');
                expect(objClasA.get('title')).to.equal('22');
                objClasA.otherMethod();
                expect(objClasA.get('title')).to.equal('33');
            });
            
            var classB = Class({
                extend: classA,
                otherMethod1 : function(){
                    this.set("title","44");
                }
            });
            
            var objClasB = new classB();
            it('继承类', function () {
                expect(objClasB).to.be.instanceof(classB);
                expect(classB.Parent).to.be.instanceof(Function);
                expect(objClasB.Super.constructor).to.be.instanceof(Function);
                expect(objClasB.constructor).to.equal(classB);
                expect(objClasB.Super.constructor).to.equal(classA);
                objClasB.otherMethod1();
                expect(objClasB.get('title')).to.equal('44');
            });
        });
    });
});