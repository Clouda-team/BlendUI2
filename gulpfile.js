var pkg = require('./package.json');
var gulp = require('gulp');
var gutil = require('gulp-util');
var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var wrap = require("gulp-wrap");
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var replace = require('gulp-replace');

gulp.task('build',function(){

    var banner = '/*! <%= name %> v<%= version %> - <%= time %> - http://clouda.com */\n';
    var wrapStr = ';(function(){var defineObj = {};\n<%= contents %>;})()';
    banner = gutil.template(banner, {
        name : pkg.name,
        version: pkg.version,
        time: gutil.date(new Date(), "yyyy-mm-dd"),
        file: 'package.json'
    });
    wrapStr = banner + wrapStr;
    //console.log(wrapStr);
    return gulp.src(['src/*.js'])
        .pipe(amdOptimize('src/main'))
        .pipe(replace(/define\([\'\"]([\w\/\W]*?)[\'\"].*?\[([\w\/\W]*?)\]\,.*?function\s*?\(([\w\W]*?)\)\s*?\{/g, function(match, p1, p2,p3){
            var str = [];
            str.push('defineObj[\'' + p1 + '\'] = (function(){' );
            var p2Aay = p2.split(/[\r\n\s]*\,[\r\n\s]*/);
            var p3Aay = p3.split(/[\r\n\s]*\,[\r\n\s]*/);
            for(var i=0, len = p3Aay.length;i<len;i++){
                if(p3Aay[i]&&p2Aay[i]){
                    str.push('    var '+ p3Aay[i].trim() +' = defineObj[' + p2Aay[i].trim() +'];');
                }
            }
            return str.join('\n');
        }))
        .pipe(replace(/[\)\;]$/g,'();'))
        .pipe(replace(/require\(\[([\w\/\W]*?)\]\,.*?function\s*?\(([\w\W]*?)\)\s*?\{([\s\S]+)\}\,\s*?null\s*?\,\s*?true\s*?\)\;/g,function(match, p1, p2,p3){
            var str = [];
            var p2Aay = p1.split(/[\r\n\s]*\,[\r\n\s]*/);
            var p3Aay = p2.split(/[\r\n\s]*\,[\r\n\s]*/);
            for(var i=0, len = p3Aay.length;i<len;i++){
                if(p3Aay[i]&&p2Aay[i]){
                    str.push('var '+ p3Aay[i].trim() +' = defineObj[' + p2Aay[i].trim() +'];');
                }
            }
             return ';(function(){'+ str.join('\n') + p3 +'})()';
        }))
        .pipe(concat(pkg.name + ".js"))
        .pipe(wrap(wrapStr))
        .pipe(gulp.dest('dist/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            preserveComments:'all'
        }))
        .pipe(gulp.dest('dist/'))
});

/**
 * @des 为boost做的Blend2专属编译
 * @method 执行gulp boost
 * @result dist/blend2.js ,dist blend2.min.js 
 */
gulp.task('boost',function(){
        return gulp.src([
            'src/core/*.js',
            'src/widgets/*.js',
            'src/widgets.js',
            'src/blend.js',
            'src/main.js'
        ])
        .pipe(amdOptimize('src/main'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({
            preserveComments:'all'
        }))
        .pipe(concat("blend2.js"))
        .pipe(gulp.dest('dist/'));
});