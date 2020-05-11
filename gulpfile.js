var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var del = require('del')

var useref = require('gulp-useref')
var gulpIf = require('gulp-if')
var uglify = require('gulp-uglify')
// var cssnano= require('gulp-cssnano')
var minifyCss = require('gulp-clean-css')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
// gulp.task('hello', function (cb) {
//   console.log('helo world')
//   cb()
// })
const clean = function (cb) {
  return del(['dist/*', '!dist/prod'])
  // cb()
}
// task aliase for clean
clean.displayName = 'clean:dev'
// 将clean函数注册为task
gulp.task(clean)

gulp.task('copy-html', function (cb) {
  // return gulp.src('src/index.html').pipe(gulp.dest('dist'))
  gulp.src('src/index.html').pipe(gulp.dest('dist'))
  gulp.src('src/pages/**/*.html').pipe(gulp.dest('dist/page'))
  cb()
})

gulp.task('copy-js', function () {
  return gulp.src('./src/js/**/*.js').pipe(gulp.dest('dist/js')).pipe(browserSync.stream())
})

gulp.task('sass', function () {
  console.log('sass copy')
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

// 调用callback去返回task状态！！！
gulp.task('browser-sync', function (cb) {
  console.log('browser-sync')
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    open: false,
  })
  cb()
})
// gulp watch-sass, 当scss文件改变时， 调用sass任务去编译sass文件
// watch-sass依赖browser-sync, 依赖的task要写在前面
gulp.task(
  'watch-sass',
  gulp.series('browser-sync', function () {
    console.log('watch-sass')
    // gulp.watch('src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload)
    gulp.watch('src/scss/**/*.scss', gulp.series('sass')) // 或者上面这种写法，在sass task中调用browserSync.stream()方法
    gulp.watch('src/*.html', gulp.series('copy-html')).on('change', browserSync.reload)
  })
)

/** prod release **/
gulp.task('clean:dist', function () {
  return del(['dist'])
})

// Optimizing CSS and JavaScript
gulp.task('useref', function () {
  return gulp
    .src('./src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulp.dest('dist/prod'))
})
// cascade: false //  是否美化属性值
gulp.task('sass-css-prod', function () {
  return gulp.src('./src/scss/**/*.scss')
  // .pipe(postcss([autoprefixer({ cascade: false })]))
  // .pipe(sourcemaps.init())
  .pipe(autoprefixer({ cascade: false }))
  // .pipe(sourcemaps.write('.')) //  生成记录位置信息的sourcemaps文件
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./src/css'))
  
})
gulp.task('clean:css', function () {
  return del(['./src/css'])
})
gulp.task('prod-pre', gulp.series('clean:dist', 'clean:css', 'sass-css-prod', 'copy-html'))
// gulp.task('build', gulp.series('prod-pre', 'useref', 'clean:css'))
gulp.task('build', gulp.series('prod-pre', 'useref'))
/** prod release end **/

gulp.task('dev', gulp.series('clean:dev', 'sass', 'copy-html', 'copy-js', 'watch-sass'))

// gulp.task('build', gulp.series('clean:prod', 'sass-prod', 'copy-js-prod', 'sass-prod', 'copy-html-prod', 'useref'))

gulp.task('autoprefixer', () => {

  const autoprefixer = require('autoprefixer')
  const sourcemaps = require('gulp-sourcemaps')
  const postcss = require('gulp-postcss')

  return (
    gulp
      // .src('./src/css/styles.css')
      .src('./src/scss/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write('.')) //  生成记录位置信息的sourcemaps文件
      .pipe(gulp.dest('./src/css1/dest'))
  )
})
