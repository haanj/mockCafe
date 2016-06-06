'use strict';
let gulp = require('gulp')
let sass = require('gulp-sass')
let del = require('del')
let webpack = require('gulp-webpack')
let fs = require('fs')

let jsPaths = ['dev/js/*.js']
let htmlPaths = ['dev/**/*.html']
let scssPaths = ['dev/scss/*.scss']
let mediaPaths = ['dev/media/*']
let output = __dirname + '/public/'

gulp.task('del-public', () => {
  del.sync([output + '*'])
})

gulp.task('sass', () => {
  del.sync([output + 'css'])
  gulp.src(scssPaths)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(output + 'css'))
})

gulp.task('copy-js', () => {
  del.sync([output + 'js'])
  gulp.src(jsPaths)
    .pipe(gulp.dest(output + 'js'))
})

gulp.task('webpack', () => {
  try {
    fs.unlinkSync(output + 'js/app.js');
  }
  catch (e) {
    console.log(e)
  }
  return gulp.src(require('./webpack.config.js').entry)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(output + 'js'));
})

gulp.task('copy-html', () => {
  del.sync([output + '*.html'])
  gulp.src(htmlPaths)
    .pipe(gulp.dest(output))
})

gulp.task('copy-media', () => {
  del.sync([output + 'media'])
  gulp.src(mediaPaths)
    .pipe(gulp.dest(output + 'media'))
})

gulp.task('copy-public', ['sass', 'copy-js', 'copy-html', 'copy-media'])

gulp.task('watch', () =>{
  gulp.watch(scssPaths, ['sass'])
  gulp.watch(jsPaths, ['copy-js'])
  gulp.watch(htmlPaths, ['copy-html'])
  gulp.watch(mediaPaths, ['copy-media'])
})

gulp.task('default', ['copy-public', 'watch'])
