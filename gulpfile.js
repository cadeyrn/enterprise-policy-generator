'use strict';

const gulp = require('gulp');
const gulpEslint = require('gulp-eslint-new');
const gulpHtmllint = require('gulp-htmllint');
const jsdoc = require('gulp-jsdoc3');

gulp.task('lint-html', () => gulp.src(['./src/html/*.html'])
  .pipe(gulpHtmllint({ config : '.htmllintrc.json' }))
);

gulp.task('lint-js', () => gulp.src(['gulpfile.js', './src/js/**/*.js', './src/_locales/**/*.json'])
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
);

const jsdocsConfig = require('./jsdoc.json');
gulp.task('docs', () => gulp.src(['CHANGELOG.md', 'README.md', './src/js/*/*.js'], { read : false })
  .pipe(jsdoc(jsdocsConfig))
);
