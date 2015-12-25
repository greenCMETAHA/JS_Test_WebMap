var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('scripts', function(){
    gulp.src(['./app/js/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js',  {newLine: ';/* раздел */ \r\n'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('main_thml', function(){
    gulp.src('./app/main/*.html')
        .pipe(gulp.dest('./build/main'));
});

gulp.task('images', function(){
    gulp.src('./app/images/*.*')
        .pipe(gulp.dest('./build/images'));
});

gulp.task('vendorLeafletJS', function(){
        gulp.src(['./bower_components/leaflet-dist/leaflet.js'
            ,'./bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js'
            ,'./bower_components/leaflet.markercluster/dist/leaflet.markercluster.js'
        ])
        .pipe(plugins.concat('lib.js',  {newLine: ';/* раздел */ \r\n'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorLeafletCSS', function(){
        gulp.src([
            './app/lib/css/app.css',
            './bower_components/leaflet-distr/leaflet.css',
            './bower_components/leaflet.markercluster/MarkerCluster.css',
            './bower_components/leaflet.markercluster/MarkerCluster.Default.css',
            './app/css/bootstrap.min.css'
            ])
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest('./build'));

});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    gulp.src(['!bower_components/**/*.min.css',
            'bower_components/**/*.css'])
        .pipe(plugins.concat('lib_bower.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch',function(){
    gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js','!./app/**/*test.js'],['scripts']);
    gulp.watch(['!./app/index.html','./app/**/*.html'],['templates']);
    gulp.watch('./app/**/*.css',['css']);
    gulp.watch('./app/index.html',['copy-index']);

});

gulp.task('connect', function() {
    plugins.connect.server({
        root: ['build'],
        port: 9000,
        livereload: true
    })
});

gulp.task('default',['connect','scripts', 'main_thml', 'images'
    ,'vendorLeafletJS'
    ,'vendorCSS'
    ,'vendorLeafletCSS'
    ,'watch']);

gulp.task('build',['default']);

