var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' )
	jshint = require( 'gulp-jshint' );
	
gulp.task('lint', function() {
  return gulp.src('server-app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
	
	// run server 
gulp.task( 'server:start', function() {
    server.listen( { path: './server-app.js' } );
});
 
// restart server if app.js changed 
gulp.task( 'server:restart', function() {
    gulp.watch( [ './server-app.js' ], server.restart );
});

gulp.task('default', ['lint','server:start','server:restart']);