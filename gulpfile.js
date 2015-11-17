var gulp       = require('gulp'),
	nodemon    = require('gulp-nodemon'),
	notify 	   = require('gulp-notify'), 	//變更通知
	livereload = require('gulp-livereload'), //即時重整
	rename     = require('gulp-rename'),
	compass    = require('gulp-compass'),
	minifycss  = require('gulp-minify-css'),
	uglify     = require('gulp-uglify');


//Task
gulp.task('compass', function() {
	gulp.src('public/sass/*.scss')
    .pipe(compass({
      css : 'public/css',	//放置位置
      sass: 'public/sass',	//來源
      config_file: 'config.rb',
      sourcemap: true,
      style: 'compact' //default: nested;
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'));//處理 temp
});

gulp.task('uglify', function(){
	gulp.src('public/js/*.js')
	.pipe(uglify())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".js";
	}))
	.pipe(gulp.dest('public/js/min'));
})

gulp.task('watch',function(){
    gulp.watch('public/sass/*.scss',['compass']);
    gulp.watch('public/js/*.js',['uglify'])
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
