const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat'); //минификация css файлов
const autoprefixer = require('gulp-autoprefixer'); //добавление автопрефиксов
const uglify = require('gulp-uglify'); //минификация JS-файлов
const browserSync = require('browser-sync').create(); //автообновление HTML-страницы
const imagemin = require('gulp-imagemin'); //сжатие картинки
const del = require('del'); //удаление папочки dist перед build
const fileInclude = require('gulp-file-include'); //позволяет разбивать html файл на отдельные файлы
const sprite = require('gulp-svg-sprite'); //Конвертация SVG иконок в один файл


//=============начало===========
//Live обновление HTML-страницы
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'build/',
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
        .pipe(dest('./build/css')) //куда выкинуть
        .pipe(browserSync.stream()) //stream - обновление без перезагрузки страницы; reload - с перезагрузкой
}
//============конец========



//===========начало==========
//Конвертация JS файлов
function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/slick-carousel/slick/slick.min.js', //установка slick-slidera, но перед эти установить npm i slick-carousel --save-dev
            'node_modules/mixitup/dist/mixitup.js', //установка mixitup, но перед эти установить npm i mixitup --save-dev
            'node_modules/magnific-popup/dist/jquery.magnific-popup.js', //установка magnific, но перед эти установить  npm install magnific-popup --save-dev
            'node_modules/rateyo/src/jquery.rateyo.js', //установка rateyo(рейтинг звезд), но перед эти установить  npm install rateyo@2.3.2 --save-dev
            'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js', //установка rangeslider(слйдер цены), но перед эти установить  npm install ion-rangeslider --save-dev
              'node_modules/jquery-form-styler/dist/jquery.formstyler.js', //установка jquery-form-styler(стилизация select), но перед эти установить  npm i jquery-form-styler --save-dev
            'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify()) //минифицирует файл
        .pipe(dest('build/js'))
}
//============конец========


//===========начало==========
//Конвертация SVG иконок 
function svgSprite() {
    return src('app/images/sprite/*.svg')
        .pipe(sprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('./build/images'))
};
//============конец========


//===========начало==========
//Разделяем html на отдельный кусочки
function html() {
    return src(['app/*.html', '!app/parts/**/*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./build'))
        .pipe(browserSync.stream())
};
//============конец========


//===========начало==========
//Переносим шрифт в папку build
function fonts() {
    return src('app/fonts/*')
        .pipe(dest('build/fonts'))
};
//============конец========



//===========начало==========
//Переносим картинки в папку build
function imagesBuild() {
    return src('app/images/content/**/*')
        .pipe(dest('build/images/content'))
};
//============конец========


//===========начало==========
//сжатие картинок
function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                        removeViewBox: true
                    },
                    {
                        cleanupIDs: false
                    }
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
        ], {
            base: 'app'
        }) //перенести с теми же папками в которых  и были
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
    // watch(['app/**/*.html']).on('change', browserSync.reload)
    watch(['app/*.html'], html);
    watch('app/images/content/**/*', parallel('imagesBuild'));
    watch('app/images/sprite/*', parallel('svgSprite'));
    watch('app/fonts/*', parallel('fonts'));
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
exports.svgSprite = svgSprite;
exports.imagesBuild = imagesBuild;
exports.html = html;
exports.fonts = fonts;
exports.build = series(cleanDist, images, build); //четкий и последовательный запуск функции (удалить, сжать картинки, вставить все указанные файлы в function build(){})


// exports.default = parallel(styles, scripts, browsersync, watching); //запускает одновременно все функции одной командой gulp
//============конец========

exports.default = series(parallel(styles, scripts, fonts, html, images, imagesBuild, svgSprite), parallel(browsersync, watching));