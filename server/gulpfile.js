const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build-js', () => gulp
  .src('src/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015-node6']
  }))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('build/src'))
);

gulp.task('build-html', () => gulp
  .src(['src/**/*.html'])
  .pipe(gulp.dest('build/src'))
);

gulp.task('build-bower', () => gulp
  .src('bower_components/**/*')
  .pipe(gulp.dest('build/src/bower_components'))
);

gulp.task('build-test-js', () => gulp
  .src('tests/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015-node6']
  }))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('build/tests'))
);

gulp.task('build-test-fixtures', () => gulp
  .src('tests/**/*.json')
  .pipe(gulp.dest('build/tests'))
);

gulp.task('default', ['build-js', 'build-html', 'build-bower']);
gulp.task('build-test', ['default', 'build-test-js', 'build-test-fixtures']);
