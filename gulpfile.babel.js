/* global Promise, __dirname */
import gulp from 'gulp';
import yargs from 'yargs';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import config from'./package.json'; // Read specific setting from the package file

let argv = yargs.argv;
let settings = config.settings;


/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: info, clean
 */
gulp.task('build', (cb) => {
  let runSequence = require('run-sequence');

  runSequence(['info', 'scripts'], 'todo', cb);
});

/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);

/**
 * Create Javascript documentation
 */
gulp.task('docs-js', ['todo'], () => {
  let gulpDoxx = require('gulp-doxx');
  let path = `${(settings.reports.substr(0, 2) === './' ? settings.reports.substr(1) : settings.reports)}docs`;
  
  gulp.src([`${settings.src}/js/**/*.js`, 'gulpfile.js', 'gulpfile.babel.js', 'README.md', `${settings.reports}/TODO.md`, `${settings.tests}/**`])
  .pipe(gulpDoxx({
    title: `${config.name} docs`,
    urlPrefix: `file:///${__dirname}${path}`
  }))
  .pipe(gulp.dest(settings.reports));
});


/**
 * log some info about this app
 */
gulp.task('info', () => {
  // log project details
  gutil.log(gutil.colors.cyan(`Running gulp on project ${config.name} v${config.version}`));
  gutil.log(gutil.colors.cyan(`Author: ${config.author.name}`));
  gutil.log(gutil.colors.cyan(`Email : ${config.author.email}`));
  gutil.log(gutil.colors.cyan(`Site  : ${config.author.url}`));
  // log info
  gutil.log('If you have an enhancement or encounter a bug, please report them on', gutil.colors.magenta(config.bugs.url));
});

/**
 * Task to handle and deploy all javascript, application & vendor
 *
 * Depends on: scripts-app, scripts-vendor
 */
gulp.task('scripts', ['scripts-app', 'scripts-internal', 'scripts-tests']);


gulp.task('lint-js', () => {
  let eslint = require('gulp-eslint');
  
  return gulp.src(`${settings.src}js/app/**/*.js`)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `main.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version. Depends on: docs-js
 */
gulp.task('scripts-app', ['lint-js', 'docs-js'], () => {
  // let stripDebug = require('gulp-strip-debug');
  let uglify = require('gulp-uglify');
  let babel = require('gulp-babel');
  let screeps = require('gulp-screeps');
  let credentials = require('./credentials.js');

  return gulp.src(`${settings.src}js/app/**/*.js`)
  .pipe(plumber())
  .pipe(babel())
  // .pipe(gulpif(!argv.dev, stripDebug()))
  .pipe(gulpif(!argv.dev, uglify()))
  .pipe(size({showFiles: true}))
  .pipe(screeps(credentials));
});

/**
 * Checks all internal scripts on code style and quality
 */
gulp.task('scripts-internal', () => {
  let eslint = require('gulp-eslint');
        
  return gulp.src(['gulpfile.js', 'gulpfile.babel.js'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(size({title: 'Size of gulpfiles', showFiles: false}));
});

/**
 * Checks all test scripts on code style and quality
 */
gulp.task('scripts-tests', () => {
  let eslint = require('gulp-eslint');

  return gulp.src(`${settings.tests}**/*.js`)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(size({title: 'Size of tests', showFiles: false}))
  .pipe(gulp.dest(`${settings.reports}tmp`));
});


/**
 * Copy all vendor .js.map files to the vendor location
 */
gulp.task('scripts-vendor-maps', () => {
  let flatten = require('gulp-flatten');

  return gulp.src(`${settings.src}js/vendor/**/*.js.map`)
  .pipe(flatten())
  .pipe(gulp.dest(`${settings.dist}js/vendor`));
});

/**
 * Run tests and keep watching changes for files
 */
gulp.task('test', (done) => {
  let Server = require('karma').Server;
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

/**
 * Run rests and keep watching changes for files
 */
gulp.task('test:watch', (done) => {
  let Server = require('karma').Server;
  new Server({
    configFile: `${__dirname}/karma.conf.js`
  }, done).start();
});

/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', () => {
  let todo = require('gulp-todo');
  gulp.src([`${settings.src}js/app/**/*.js`, `${settings.src}styles/app/**/*.scss`])
  .pipe(plumber())
  .pipe(todo())
  .pipe(gulp.dest(settings.reports)) // output todo.md as markdown
  .pipe(todo.reporter('json', {fileName: 'todo.json'}))
  .pipe(gulp.dest(settings.reports)); // output todo.json as json
});

/**
 * Watches changes to template, Sass, javascript and image files. On change this will run the appropriate task, either: copy styles, templates, scripts or images.
 */
gulp.task('watch', () => {

  // Watch app .js files
  gulp.watch(`${settings.src}js/app/**/*.js`, ['scripts-app']);

  // Watch vendor .js files
  gulp.watch(`${settings.src}js/vendor/**/*.js`, ['scripts-vendor']);

  // Watch internal files
  gulp.watch(['gulpfile.js', 'gulpfile.babel.js'], ['scripts-internal']);
  
  // Watch test files
  gulp.watch(`${settings.tests}**/*.js`, ['scripts-tests']);
  
  // Update docs
  gulp.watch('README.md', ['docs-js']);
});
