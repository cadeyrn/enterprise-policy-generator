'use strict';

const gulp = require('gulp');
const gulpEslint = require('gulp-eslint-new');

gulp.task('lint-html', () => gulp.src(['./src/html/**/*.html'])
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
);

gulp.task('lint-js', () => gulp.src(['gulpfile.js', './src/js/**/*.js', './src/_locales/**/*.json'])
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
);
