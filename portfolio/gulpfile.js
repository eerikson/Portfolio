var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

var CONFIG = {

	styleSrc: "./src/scss/application.scss",

	styleDestination : "./public/css/",

	jsSrc : "./src/js/application.js",

	jsDestination : "./public/js/"

}

gulp.task('default', function() {
	// Nada
});


gulp.task('watch', function() {

    gulp.watch('./src/scss/**/*.*', ['sass']);
    gulp.watch('./src/js/**/*.*', ['js-hint']);
});

gulp.task( 'sass', function () {
	gulp.src( CONFIG.styleSrc )
        .pipe(sass())
        .pipe(gulp.dest( CONFIG.styleDestination ));
});

gulp.task( 'js-hint', function () {
	return gulp.src(CONFIG.jsSrc)
	    .pipe(jshint())
    	.pipe(gulp.dest( CONFIG.jsDestination ));
});