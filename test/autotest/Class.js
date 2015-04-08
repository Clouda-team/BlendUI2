
// src/core/classCreate 类工具函数
define(['../../src/core/Class'],function(classFactory){
    var classCreate = classFactory.create;
    var expect = chai.expect;
    describe('classCreate类测试', function(){
        //describe('classCreate结构函数',function(){
            it('classCreate函数', function () {
                expect(classCreate).to.be.a('function');
                expect(classCreate).to.be.instanceof(Function);
            });
        //});

        //describe('创建类',function(){
            var classCreateA = classCreate({
                attributes : {
                    "title":"11",
                    "doctitle":"22"
                },
                statics:{
                    "sTitle":"aaa"
                },
                otherMethod : function(){
                    this.set("title","33");
                }
            });
            var objClasA = new classCreateA({
                id:"test1"
            });
            it('classCreateA类', function () {
                expect(classCreateA).to.be.instanceof(Function);
                expect(classCreateA.sTitle).to.equal('aaa');
            });
            it('classCreateA类的实例', function () {
                expect(objClasA).to.be.instanceof(classCreateA);
                expect(objClasA.get('title')).to.equal('11');
                objClasA.set('title','22');
                expect(objClasA.get('title')).to.equal('22');
                objClasA.otherMethod();
                expect(objClasA.get('title')).to.equal('33');
            });
            it('实例获取及其存储', function () {
                expect(objClasA.id).to.equal('test1');
                expect(classFactory.get('test1')).to.equal(objClasA);
                classFactory.cancel(objClasA);
                expect(classFactory.get('test1')).to.be.undefined;
            });

            var classCreateB = classCreate({
                extend: classCreateA,
                otherMethod1 : function(){
                    this.set("title","44");
                }
            });

            var objClasB = new classCreateB();
            it('类的继承', function () {
                expect(objClasB).to.be.instanceof(classCreateB);
                expect(classCreateB.Parent).to.be.instanceof(Function);
                expect(objClasB.Super.constructor).to.be.instanceof(Function);
                expect(objClasB.constructor).to.equal(classCreateB);
                expect(objClasB.Super.constructor).to.equal(classCreateA);
                objClasA.set('title','11');
                expect(objClasA.get('title')).to.equal('11');
                expect(objClasB.get('title')).to.not.equal('11');
                objClasB.set('title','22');
                // console.log(objClasB);
                expect(objClasB.get('title')).to.equal('22');
                objClasB.otherMethod1();
                expect(objClasB.get('title')).to.equal('44');
            });
        //});
    });
});