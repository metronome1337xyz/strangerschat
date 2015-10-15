var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyhtml = require('gulp-minify-html'),
    autoprefixer  = require('gulp-autoprefixer'),
    rename = require('gulp-rename')
    minifyCss = require('gulp-minify-css');



gulp.task('HTML' , function(){
    gulp.src('development/index.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest(''))
})

gulp.task('templates' , function(){
    gulp.src(['development/templates/*'])
        .pipe(minifyhtml())
        .pipe(gulp.dest('templates/'))
})

gulp.task('CSS', function(){
    gulp.src(['development/css/*.css'])    // get all js files
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('css/'))
        .on('error' , console.error.bind(console))// wont stop the gulp if an error is made in any js file, tells you the error and after you fix the error, it reruns the gulp itself, this can be used for css files as well.

})


gulp.task('JS', function(){
    gulp.src(['development/js/*.js'])    // get all js files
        .pipe(concat('app.js'))// put all js files in one script.js, automatically creates script.js
        .on('error' , console.error.bind(console))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js/'))  // location

})

gulp.task('default', ['JS', 'HTML', 'CSS', 'templates']);  // loads all the task by just running 'gulp' in node
