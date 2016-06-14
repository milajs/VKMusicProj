//// libs

var gulp = require("gulp");
var connect = require("gulp-connect");
var opn = require("opn");
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');

//////////////////////////////////////////

//запускаем локальный сервер
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8080
    });
    opn('http://localhost:8080/');
});

//работа с HTML
gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

//работа с CSS
gulp.task('css', function () {
    gulp.src('./app/css/*.css')
        .pipe(connect.reload());
});

//работа с JS
gulp.task('js', function () {
    gulp.src('./app/js/*.js')
        .pipe(connect.reload());
});

// работа с шаблонами JADE
gulp.task('jade', function() {
    gulp.src('./app/jade/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(connect.reload());
});

// работа с stylus
gulp.task('stylus', function () {
  return gulp.src('./app/stylus/*.styl')
    .pipe(stylus({use:[nib()]}))
    .pipe(gulp.dest('./app/css/'))
    .pipe(connect.reload());
});



//WATCHER
gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
    gulp.watch(['./app/css/*.css'], ['css']);
    gulp.watch(['./app/js/*.js'], ['js','stylus','jade']);
    gulp.watch(['./app/jade/*.jade'], ['jade']);
    gulp.watch(['./app/stylus/*.styl'], ['stylus','jade']);
});


//DEFAULT
gulp.task('default', ['connect', 'watch']);
