var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');



var path = {
  HTML: 'src/index.html',
  CSS: 'src/css/*.css',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  MINIFIED_CSS_OUT: 'style.min.css',
  OUT: 'style.css',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js'
};

gulp.task('copy', function(){
    gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

/*
gulp.task('replaceHTMLsrc', function(){
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'js': 'src/' + path.OUT
        }))
        .pipe(gulp.dest(path.DEST));
});
*/

// gulp.task('watch', ['replaceHTMLsrc'], function() {
gulp.task('watch', function() {
  // gulp.watch(path.HTML, ['copy']);
  //gulp.watch(path.HTML, ['replaceHTMLsrc']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_BUILD))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('minifyCSS', function() {
    gulp.src(path.CSS)
    .pipe(minifyCSS())
    .pipe(concat(path.MINIFIED_CSS_OUT))
    .pipe(gulp.dest(path.DEST_BUILD))
});

gulp.task('build', function(){
    browserify({
        entries: [path.ENTRY_POINT],
        transform: [reactify],
    })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));

     
});

gulp.task('replaceHTML', function(){
    gulp.src(path.HTML)
    .pipe(htmlreplace({
        'js': 'build/' + path.MINIFIED_OUT,
        'css': 'build/' + path.MINIFIED_CSS_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build', 'minifyCSS']);

gulp.task('default', ['watch']);
/*
gulp.src(
        ['src/js/Child.js',
            'src/js/Parent.js',
            'src/js/App.js'
        ])
       */
