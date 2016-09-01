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
  .pipe(gulp.dest('build'))
);

gulp.task('build-html', () => gulp
  .src(['src/**/*.html'])
  .pipe(gulp.dest('build'))
);

gulp.task('build-bower', () => gulp
  .src('bower_components/**/*')
  .pipe(gulp.dest('build/bower_components'))
);

gulp.task('default', ['build-js', 'build-html', 'build-bower']);
