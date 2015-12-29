'use strict';

const gulp = require('gulp');
const plugin = require("gulp-load-plugins")();
const babelify = require('babelify');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

let startWatchify = () => {

    // ターゲットの複数エントリー
    const srcEntries = ['entry.js'];
    const distDir = './dist';
    srcEntries.forEach((entryPoint) => {

        let watchifyOptions = {
            entries: [`src/${entryPoint}`],
            debug: true,
            /*  babelifyでビルドを行う。presetsはES2015, react, stage-2 を使用: [http://babeljs.io/docs/plugins/] */
            transform: babelify.configure({presets: ["es2015", "react", "stage-2"]}),
            // 差分ビルド有効化
            cache: {},
            packageCache: {}
        };

        let watchifyStream = watchify(browserify(watchifyOptions));
        let execBrowserify = () => {
            plugin.util.log(` building .....[ ${entryPoint} ].....`);
            return watchifyStream
                .bundle()
                .on('error', plugin.util.log.bind(plugin.util, 'Browserify Error'))
                .pipe(plugin.plumber())
                .pipe(source(entryPoint))
                .pipe(buffer())
                .pipe(gulp.dest(distDir));
        };

        watchifyStream.on('update', execBrowserify);
        watchifyStream.on('log', plugin.util.log);
        return execBrowserify();
    });
};

gulp.task('default', startWatchify);
