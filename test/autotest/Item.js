
// src/core/Class 类工具函数
define(['../../src/widgets/Item'],function(Item){
    var expect = chai.expect;
    describe('Item类测试', function(){
        //describe('Item结构函数',function(){
            it('Item函数', function () {
                expect(Item).to.be.a('function');
                expect(Item).to.be.instanceof(Function);
            });
        //});

        //describe('创建Item类',function(){
            var titleBar = {
                config :  {

                }
            };
            var itemObj = new Item({
                data : {
                    style:{
                        color: "rgb(255,255,0)",
                        opacity : 1,
                        'background-color':'#ffffff'
                    },
                    text:'AA',
                    image:'BB',
                    href:'http://www.baidu.com',
                    ontap: function(){
                        console.log('dddd');
                    }
                },
                instance: titleBar
            });

            it('item实例', function () {
                expect(itemObj).to.be.instanceof(Item);
                expect(itemObj.get('text')).to.equal('AA');
                expect(itemObj.get('image')).to.equal('BB');
                expect(itemObj.config.text).to.equal('AA');
                expect(itemObj.config.image).to.equal('BB');
                expect(itemObj.config.action).to.equal('uievent('+JSON.stringify({id:itemObj.id})+')');
            });
        //});
    });
});