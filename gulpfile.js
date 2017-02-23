var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var sassimage = require('gulp-sass-image');
var compassImagehelper = require('gulp-compass-imagehelper');
var sassThemes = require('gulp-sass-themes');


//Start Dev environment
gulp.task('dev', function(callback){
    runSequence(['sass','browserSync','watch'],
        callback
    )
});

//Create Build
gulp.task('build', function(callback){
    runSequence('clean:dist',
        ['sass','sassimage', 'useref', 'images', 'fonts'],
        callback
    )
});

gulp.task('sassimage', function () {
    return gulp.src('_sources/images/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(compassImagehelper({
            targetFile: 'scss/main.scss', // default target filename is '_sass-image.scss'
            // template: 'your-sass-image-template.mustache',
            images_path: 'images/',
            css_path: 'css/'
        }))
        .pipe(gulp.dest('sass'));
});

//Converting from SCSS to CSS
gulp.task('sass', function(){
    return gulp.src(['app/scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app/css/temporary'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


//Watching all changes inside app
gulp.task('watch', ['browserSync', 'sass'],function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    // Other watchers
});

//Syncing the watch with the browser for Hotloading
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

//consolidating all the JS files into a minimized version/

gulp.task('useref', function(){
   return gulp.src('app/*.html')
       .pipe(useref())
       .pipe(gulpIf('*.js',uglify()))
       .pipe(gulpIf('*.css',cssnano()))
       .pipe(gulp.dest('dist'))
});




//Optimizing images before sending them to Dist

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        //adding cache for everything that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

//Sending Fonts to Dist
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

//Deleting previous dist builds
gulp.task('clean:dist', function(){
    return del.sync('dist');
});

//Clear Cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});




