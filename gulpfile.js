'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require ('gulp-autoprefixer'),
    connect      = require ('gulp-connect'),
    uglify       = require ('gulp-uglify'),
    concat       = require ('gulp-concat'),
    dirs = {
    'source' : {
        'html': './source/pages/*.html',
        'sass' : ['./source/sass/*.*', './source/sass/**/*.scss'],
        'img' : ['./source/images/**/*.jpg', './source/images/**/*.png', './source/images/**/*.svg'],
        'js' : ['./source/js/main.js'],
        'fonts': './source/fonts/*.*'
    },
    'build' : {
        'html': './build',
        'css': './build/css/',
        'img': './build/images/',
        'js' : './build/js/',
        'fonts': './build/fonts/'
    }
};

//server
gulp.task('connect', function() {
    connect.server({
        root: dirs.build.html,
        livereload: true,
        port: 8080
    });
});

//html
gulp.task('html', function() {
    gulp.src(dirs.source.html)
        .pipe(gulp.dest(dirs.build.html))
        .pipe(connect.reload());
});

//sass
gulp.task('sass', function () {
    return gulp.src(dirs.source.sass)
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(dirs.build.css))
        .pipe(connect.reload());
});

//js
gulp.task('js', function (){
    return gulp.src(dirs.source.js)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe (gulp.dest(dirs.build.js))
        .pipe(connect.reload());
})

//fonts
gulp.task('fonts', function (){
    gulp.src(dirs.source.fonts)
        .pipe(gulp.dest(dirs.build.fonts));
})

gulp.task('watch', function () {
    gulp.watch(dirs.source.html, ['html']);
    gulp.watch(dirs.source.sass, ['sass']);
    gulp.watch(dirs.source.js, ['js']);
});

gulp.task('default', ['connect', 'sass', 'watch', 'html', 'js', 'fonts'])