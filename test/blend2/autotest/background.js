define(['../../../src/background/entrance.js'],function(entrance){
    var expect = chai.expect;

    describe("测试Native方法支持",function(){
        it("entrance", function(){
           expect(lc_bridge).to.be.a("object");
           expect(lc_bridge).to.have.property("postMessage");
           expect(lc_bridge).to.not.have.property("exeJsRemote");
        });
    });

    describe("检测背景页发送消息", function(){

        this.timeout(50000);

        it("向背景页发送delegate事件", function(done){

            window.lc_bridge.postMessage("delegate", "sendTo");

            document.addEventListener("message", function(event){
                alert(event.data);
            });

            setTimeout(function(){
                expect(confirm("是否看到当前页面ID")).to.be.true;
                done();
            }, 1000);

        });

    });

    describe("测试两个页面的消息通讯", function(){

        this.timeout(50000);

        it("当前页面向背景页注册可以监听的事件", function(done){

            window.lc_bridge.postMessage("event_register", "addContact");

            document.addEventListener("addContact", function(event){
                alert("事件注册成功并触发");
                document.getElementById("users").innerHTML = event.data;
            });

            setTimeout(function(){
                expect(confirm("是否看到事件注册成功消息")).to.be.true;
            }, 5000);
            done();

        });
    });

});