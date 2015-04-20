module.exports = function (grunt) {
     pkg = grunt.file.readJSON('package.json');
     var distAll = "dist/"+ pkg.name + ".js";
     var distMin = "dist/"+ pkg.name + "-min.js";
     grunt.initConfig({
        requirejs: {
            hybrid: {
                options: {
                    baseUrl: "./",
                    name: 'third_party/almond',
                    include: [
                        'src/main'
                    ],
                    out: distAll,
                    optimize: 'none',
                    wrap: true
                }
            }
        },
        uglify : {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - http://clouda.com */\n'//添加banner
            },
            hybrid: {
                files: [{
                    src: distAll,
                    dest: distMin
                }]
            }
        },
        mocha:{
            test:{
                src: ['test/autotest.html'],
            }
        },
        autoTest:{
            src: ['test/autotest/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerMultiTask('autoTest','自动化测试脚本合并',function(){
         var options = this.options();
         var file = [];
         this.files.forEach(function(filePair) {
            //console.log(filePair);
            filePair.src.forEach(function(src) {
                file.push('\''+src.replace('test\/','')+'\'');
            });
        });
        console.log(this);
        var sc = 'require(['+file.join(',')+'],function(){mocha.run();});'
        grunt.file.write('test/autotest.js', sc , {
            encoding:"utf8"
        });
    });

    grunt.registerTask('build', [
        'requirejs:hybrid',
        'uglify:hybrid'
    ]);
    grunt.registerTask('test', [
        'jshint',
        'mocha'
    ]);
};
