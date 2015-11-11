var gulp       = require('gulp'),
	nodemon    = require('gulp-nodemon'),
	notify 	   = require('gulp-notify'), 	//變更通知
	livereload = require('gulp-livereload'), //即時重整
	compass    = require('gulp-compass');


//Task
gulp.task('compass', function() {
	gulp.src('public/sass/*.scss')
    .pipe(compass({
      css : 'public/css',
      sass: 'public/sass',
      config_file: 'config.rb',
      sourcemap: true,
      style: 'compact' //default: nested;
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch',function(){
    gulp.watch('public/sass/*.scss',['compass']);
});

gulp.task('default',['compass', 'watch'], function(){
	//listen for changes
	livereload.listen();
	//configure nodemon
	nodemon({
		//the script to run the app
		script: 'app.js',
		ext: 'js'
	})
	.on('restart', function(){
		//when the app has restarted, run livereload
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('reloading page, plz wait'))
	})
});
