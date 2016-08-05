//gulp是用来自动化工程的工具

//引入组件
var gulp = require('gulp');

var imagemin = require('gulp-imagemin');//压缩图片
var autoprefixer = require('gulp-autoprefixer');//自动补全css样式前缀
var sass = require('gulp-sass');//编译sass
var cssmin = require('gulp-minify-css');//压缩css
var uglify = require('gulp-uglify');//压缩js
var browserify = require('gulp-browserify');//管理js依赖
var htmlmin = require('gulp-htmlmin');//压缩html
var concat = require('gulp-concat');//合并文件
var rename = require('gulp-rename');//更改文件名
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var browserSync = require('browser-sync').create();//浏览器自动刷新
var reload = browserSync.reload;

var clean = require('gulp-clean');//清除文件
var runSequence = require('run-sequence'); //用于按顺序执行 gulp 任务的插件


/**************开发环境,gulp dev***********************/


//Sass任务
gulp.task('sass', function () {
    return gulp.src('./app/stylesheets/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: true, //是否美化属性值 默认：true
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./app/stylesheets/css'))
});
//合并压缩css
gulp.task('css', function () {
    return gulp.src('./app/stylesheets/css/*.css')
        .pipe(concat('all.css'))
        .pipe(cssmin())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('./app/stylesheets/css'))
        .pipe(reload({stream: true}));
});

//合并压缩js
gulp.task('scripts', ['libs'], function () {
    gulp.src('./app/scripts/main.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./app/scripts'))
        .pipe(reload({stream: true}));
});

//libs任务
gulp.task('libs', function () {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js'
        ])
        .pipe(gulp.dest('./app/scripts/'));
});

//监听任务
gulp.task('watch', function () {
    gulp.watch('./app/stylesheets/sass/*.scss', ['css']);
    gulp.watch('./app/scripts/*.js', ['scripts']);

});

gulp.task('dev', function () {

    //按顺序执行gulp任务
    runSequence('sass',
        ['css', 'scripts'],
        'watch'
    );
    browserSync.init({
        server: "./app"
    });
    gulp.watch([
        './app/**/*.*'
    ]).on('change', reload);


});


/**************end***********************/


/**************产品上线，文件合并，压缩，加MD5后缀，更改路径***********************/

//css中的图片压缩并加上MD5后缀
gulp.task('cssImagemin', function () {
    return gulp.src('./app/stylesheets/images/*.{png,jpg,gif,jpeg,ico}')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/stylesheets/images'))
        .pipe(rev.manifest('cssimages.json')) //生成一个rev-manifest.json
        .pipe(gulp.dest('./cssimagerev'));    //将 rev-manifest.json 保存到 rev 目录内
});

//css加MD5后缀
gulp.task('cssMd5', function () {
    return gulp.src('./app/stylesheets/css/all.min.css')
        .pipe(rev())
        .pipe(gulp.dest('./dist/stylesheets/css'))
        .pipe(rev.manifest('css.json'))
        .pipe(gulp.dest('./rev'))
});

//压缩js并加上MD5后缀
gulp.task('jsMd5', function () {
    gulp.src('./app/scripts/all.min.js')
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rev.manifest('scripts.json'))
        .pipe(gulp.dest('./rev'))

});

//更改css,js文件中图片名称
gulp.task('cssimagerev', function () {
    return gulp.src(['./cssimagerev/cssimages.json', './dist/stylesheets/css/*']) //读取 rev-manifest.json 文件以及需要替换文件名的文件
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/stylesheets/css'));
});
gulp.task('jsimagerev', function () {
    return gulp.src(['./cssimagerev/cssimages.json', './dist/scripts/*'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/scripts'));
});


//html中的图片压缩并加md5后缀
gulp.task('imagemin', function () {
    return gulp.src('./app/images/*.{png,jpg,gif,jpeg,ico}')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/images'))
        .pipe(rev.manifest('images.json'))
        .pipe(gulp.dest('./rev'));
});


//压缩html
gulp.task('htmlminfy', function () {
    return gulp.src('./app/index.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream: true}));

});


//更改html中的图片名称，js、css路径

gulp.task('htmlrev', function () {
    return gulp.src(['./rev/*.json', './dist/index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist'));
});

//清空发布根目录文件
gulp.task('clean', function () {
    return gulp.src(['dist', 'rev'], {read: false})
        .pipe(clean());
});


//启动服务器
gulp.task('serve', function () {
    browserSync.init({
        server: "./dist"
    });
});


gulp.task('default', ['clean'], function () {

    //按顺序执行gulp任务
    runSequence('clean',
        ['css', 'scripts', 'cssImagemin', 'imagemin'],
        ['cssMd5', 'jsMd5', 'htmlminfy'],
        ['cssimagerev', 'jsimagerev'],
        ['htmlrev'],
        ['serve']
    );
});

