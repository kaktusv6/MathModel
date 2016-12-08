var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	csscomb = require('gulp-csscomb');

gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('jade', function() {
	gulp.src('dist/jade/index.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('app'))
	.pipe(connect.reload());
});

gulp.task('scss', function () {
	gulp.src('dist/scss/index.scss')
    .pipe(sass.sync().on('error', sass.logError))
	.pipe(csscomb())
    .pipe(gulp.dest('app/css'))
	.pipe(connect.reload());
});

gulp.task('css', function () {
	return true;
});

gulp.task('js', function () {
	gulp.src('dist/js/*.js')
	.pipe(gulp.dest('app/js'))
	.pipe(connect.reload());
});

gulp.task('reload', function () {
	gulp.src('app/**')
	.pipe(connect.reload());
});

// task for watch project files
gulp.task('watch',function () {
	// watcher for html files
	gulp.watch('app/index.html', ['reload'])

	// watchers for scss files
	gulp.watch('dist/scss/**/*.scss', ['scss'])
	gulp.watch('dist/scss/index.scss', ['scss'])

	// watcher for css files
	// gulp.watch('app/css/*.css', ['css'])

	// watcher for js files
	gulp.watch('dist/js/*.js', ['js'])

	// watchers for jade files
	gulp.watch('dist/jade/headers/*.jade', ['jade']);
	gulp.watch('dist/jade/*.jade', ['jade'])
});

// default task
gulp.task('default', ['connect', 'jade', 'scss', 'js', 'watch']);