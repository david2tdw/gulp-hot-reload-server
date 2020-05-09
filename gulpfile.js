var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var del = require('del')


// gulp.task('hello', function (cb) {
//   console.log('helo world')
//   cb()
// })
const clean = function (cb) {
  return del(['dist/*'])
  cb()
}
// task aliase for clean
clean.displayName = 'clean:dist'
// 将clean函数注册为task
gulp.task(clean)

gulp.task('copy-home-html', function () {
  return gulp.src('src/index.html').pipe(gulp.dest('dist'))
})

gulp.task('sass', function () {
  console.log('sass copy')
  return gulp.src('./src/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('dist/css'))
  // .pipe(browserSync.reload(  ))
})

// 调用callback去返回task状态！！！
gulp.task('browser-sync', function (cb) {
  console.log('browser-sync')
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  cb()
})
// gulp watch-sass, 当scss文件改变时， 调用sass任务去编译sass文件
// watch-sass依赖browser-sync, 依赖的task要写在前面
gulp.task('watch-sass',gulp.series('browser-sync', function () {
  // gulp.series('browser-sync','sass')
  console.log('watch-sass')
  // gulp.watch('src/scss/**/*.scss', gulp.series('sass', browserSync.reload))

  console.log('watch-sass1')
  gulp.watch('src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload)
  gulp.watch('src/*.html', gulp.series('copy-home-html') ).on('change', browserSync.reload)
})   )



gulp.task('reload-server', function () {
  gulp.watch(['dist'], function () {
    console.log('reload-server')
    browserSync.reload()
  })
})

// gulp.task('clean1', function () {})

// gulp.task('build', gulp.series('clean:dist', 'copy-home-html', 'sass', 'browser-sync','watch-sass','reload-server'));
gulp.task('build', gulp.series('clean:dist', 'sass', 'copy-home-html','watch-sass'));
// gulp.task('build', function (cb) {
//   return gulp.series('clean:dist', 'copy-home-html','browser-sync', 'watch-sass','reload-server')
//   cb()
// })