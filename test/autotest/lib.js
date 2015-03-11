
// src/core/lib类工具函数
define(['../../_src/core/lib'],function(lib){
    var expect = chai.expect;
    describe('lib工具类', function(){
        it('存在extend,noop', function () {
            expect(lib.extend).to.be.a('function');
            expect(lib.noop).to.be.a('function');
        });
        
        it('extend', function () {
            var s = lib.extend({},{
                "aa": 'aaa',
                "cc": 'ccc'
            });
            expect(s).to.be.an('object')
            expect(s.aa).to.equal('aaa');
            expect(s.cc).to.equal('ccc');
        });
        
        
    });
});