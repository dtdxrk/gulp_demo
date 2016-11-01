var gulp = require('gulp');
var clean = require('gulp-clean');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var gulpsync = require('gulp-sync')(gulp);
var replace = require('gulp-replace');
var optimize = require('amd-optimize');
var requirejsOptimize = require('gulp-requirejs-optimize');


gulp.task('clear',function() {
  return gulp.src([ 'dist/'])
    .pipe(clean());
});

gulp.task('copy_view', function() {
  return gulp.src('html/**/*.{html,htm,hbs}')
    .pipe(gulp.dest('dist/view'))
});

gulp.task('copy_css', function() {
  return gulp.src('public/css/**/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy_js', function() {
  return gulp.src('public/js/**/*.js')
    .pipe(requirejsOptimize({
        paths: {
          'test3':"common/test3"
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy_img', function() {
  return gulp.src('public/img/**/*.{jpg,jpeg,png,gif,cur}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

//给文件加指纹
gulp.task('rev',function() {
  return gulp.src([
    'dist/css/**/*.css',
    'dist/img/**/*.{jpg,jpeg,png,gif,cur}',
    'dist/js/**/*.js'
  ], { base: 'dist/' })
  .pipe(rev())
  .pipe(gulp.dest('dist/'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('dist/'));
});

//在文件里替换指纹路径
gulp.task('rev_collector',function() {
  return gulp.src(['dist/rev-manifest.json','dist/css/**/*.css','dist/view/**/*.{html,htm,hbs}'], { base: 'dist/' })
    .pipe( revCollector({
        replaceReved: true
    })
    )
    .pipe( gulp.dest('dist/') );
});

/*静态资源修改为绝对路径*/
gulp.task('rev_path', function(){
  return gulp.src(['dist/css/**/*.css','dist/view/**/*.{html,htm,hbs}'], { base: 'dist/' })
    //可以改相对地址和绝对地址
    .pipe(replace(/\.\.\/public\/js\//g,'../js/'))
    .pipe(replace(/\.\.\/public\/css\//g,'../css/'))
    // .pipe(replace(/\.\.\/img\//g,'../img/'))
    .pipe(gulp.dest('dist/'));
});


gulp.task('copy_all', gulpsync.sync(['clear',['copy_view', 'copy_css', 'copy_js', 'copy_img']]) );

gulp.task('default',gulpsync.sync(['copy_all','rev','rev_collector','rev_path']));