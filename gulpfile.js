const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const scss              = require('gulp-sass');
const concat            = require('gulp-concat'); //минификация css файлов
const autoprefixer      = require('gulp-autoprefixer'); //добавление автопрефиксов
const uglify            = require('gulp-uglify'); //минификация JS-файлов
const browserSync       = require('browser-sync').create(); //автообновление HTML-страницы
const imagemin          = require('gulp-imagemin'); //сжатие картинки
const del               = require('del'); //удаление папочки dist перед build


//=============начало===========
//Live обновление HTML-страницы
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notofy: false //убрать нотацию при обновлении
    })
}
//============конец========



//===========начало==========
//конвертация SCSS файлов в CSS
function styles() {
    return src('app/scss/style.scss') //поиск-путь, что конвертировать
        .pipe(scss({
            outputStyle: 'compressed'
        })) //конвертация (compressed - минифицированная версия); expanded - полная(красивая) версия
        .pipe(concat('style.min.css')) //конвертация в мини версию
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css')) //куда выкинуть
        .pipe(browserSync.stream()) //stream - обновление без перезагрузки страницы; reload - с перезагрузкой
}
//============конец========



//===========начало==========
//Конвертация JS файлов
function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.js',
            'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify()) //минифицирует файл
        .pipe(dest('app/js'))
}
//============конец========


//===========начало==========
//сжатие картинок
function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}
//============конец========


//===========начало==========
//Файлы, которые должно попасть в финальный проект т.е. папку dist
function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base: 'app'}) //перенести с теми же папками в которых  и были
    .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist') //удаление папки dist 
}
//============конец========


//===========начало==========
//Слежение за файлами
function watching() { //функция слежения за файлом
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload)
}
//============конец========


//===========начало==========
// Без экспорта не будет работать ни одна функция выше
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build); //четкий и последовательный запуск функции (удалить, сжать картинки, вставить все указанные файлы в function build(){})


exports.default = parallel(styles, scripts, browsersync, watching); //запускает одновременно все функции одной командой gulp
//============конец========