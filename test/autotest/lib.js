
// src/core/lib类工具函数
define(['../../src/core/lib'],function(lib){
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
            lib.extend(s,{"dd":"ddd"});
            expect(s.dd).to.equal('ddd');
        });

        it('noop', function(){
            expect(lib.noop).to.be.a('function');
        });

        it('toCamel', function(){
            var as = "aa-bb";
            as = lib.toCamel(as);
            expect(as).to.equal('aaBb');
            expect(lib.toCamel('aa-dd-cc-bb')).to.equal('aaDdCcBb');
        });

        it('toPascal', function(){
            var as = "aa-bb";
            as = lib.toPascal(as);
            expect(as).to.equal('AaBb');
            expect(lib.toPascal('aa-dd-cc-bb')).to.equal('AaDdCcBb');
        });

        // it('isUix', function(){
        //     expect(lib.isUix).to.equal('AaDdCcBb');
        // });

    });
});