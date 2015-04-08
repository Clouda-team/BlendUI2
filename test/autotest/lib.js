
// src/core/lib类工具函数
define(['../../src/core/lib'],function(lib){
    var expect = chai.expect;
    describe('lib工具类', function(){

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

        it('each', function(){
            var s = {"a":'b',"c":'d'};
            lib.each({"a":'b',"c":'d'},function(k,v,o){
                expect(o).to.be.an('object');
                expect(o).to.eql(s);
                expect(s[k]).to.be.equal(v);
            });
        });

        it('noop', function(){
            expect(lib.noop).to.be.a('function');
        });

        it('toCamel', function(){
            var as = "aa-bb";
            as = lib.toCamel(as);
            expect(as).to.equal('aaBb');
            expect(lib.toCamel('aa-dd-cc-bb')).to.equal('aaDdCcBb');
            expect(lib.toCamel('backgroundColor')).to.equal('backgroundColor');
            expect(lib.toCamel('background-color')).to.equal('backgroundColor');
        });

        it('toPascal', function(){
            var as = "aa-bb";
            as = lib.toPascal(as);
            expect(as).to.equal('AaBb');
            expect(lib.toPascal('aa-dd-cc-bb')).to.equal('AaDdCcBb');
        });

        it('cutOn', function(){
            var as = "onbbb";
            as = lib.cutOn(as);
            expect(as).to.equal('bbb');
            expect(lib.cutOn('onDbA')).to.equal('dbA');
        });

        it('uniqueId', function(){
            var a = lib.uniqueId();
            var b = lib.uniqueId();
            var c = lib.uniqueId();
            var e = lib.uniqueId('PRE');
            expect(a).to.not.equal(b);
            expect(b).to.not.equal(c);
            expect(b).to.not.equal(a);
            expect(e.indexOf('PRE')>-1).to.true;
        });

        it('isUix', function(){
            expect(lib.isUix).to.not.be.false;
        });

        it('isAndroid', function(){
            expect(lib).to.include.keys('isAndroid');
        });

        it('isIphone', function(){
            expect(lib).to.include.keys('isIphone');
        });

        it('ready', function(done){
            lib.ready(function(){
                if(lib.isUix){
                    expect(window.lc_bridge).not.to.be.undefined;
                }else{
                   expect(window.lc_bridge).to.be.undefined;
                }
                done();
            });
        });
    });
});