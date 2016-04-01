var gulp = require('gulp');
var connect = require('gulp-connect');
var wiredep = require('wiredep').stream;
var react = require('gulp-react');
var inject = require('gulp-inject');

var files = {
  html: ['./app/index.html'],
  css:['./app/components/**/*.css','./app/stylesheets/*.css'],
  js: ['./app/components/**/*.jsx','./app/scripts/**/*.js']
};

gulp.task('server', function() {
  connect.server({
    root:'./app',
    port:3000,
    hostname: '0.0.0.0',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(files.html)
  .pipe(connect.reload());
});

gulp.task('bower',function() {
  gulp.src(files.html)
  .pipe(wiredep())
  .pipe(gulp.dest('./app'));
});

gulp.task('inject',function(){
    var source = gulp.src([files.css[0],files.css[1],files.js[1]],{read:false});
    gulp.src('index.html', {cwd: './app'})
    .pipe(inject(source, {
        ignorePath: '/app'
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('transpile-js', function() {
  gulp.src(files.js[0])
  .pipe(react({harmony:true}))
  .pipe(gulp.dest('./app/scripts'));
});

gulp.task('watch', function() {
  gulp.watch(files.html, ['html']);
  gulp.watch(['./bower.json'],['bower']);
  gulp.watch([files.js[0]],['transpile-js','inject']);
});

gulp.task('default',['server','watch','inject']);
