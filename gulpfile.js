var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

gulp.task('scripts', function(){
    gulp.src(['./app/js/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('app.js',  {newLine: ';/* раздел */ \r\n'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./app/index.html',
            './app/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
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
    gulp.src([,'./app/lib/leaflet/leaflet077.js'
            ,'./app/lib/leaflet/angular-leaflet-directive.min.js'
            ,'./app/lib/**/leaflet/leaflet.markercluster.js'
        ])
        .pipe(plugins.concat('lib.js',  {newLine: ';/* раздел */ \r\n'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('vendorLeafletCSS', function(){
    //concatenate vendor JS files
    gulp.src([
        './app/lib/css/app.css',
        './app/lib/leaflet/leaflet.css',
        './app/lib/leaflet/MarkerCluster.css',
        './app/lib/leaflet/MarkerCluster.Default.css',
        './app/css/bootstrap.min.css'
        ])
        .pipe(plugins.concat('lib.css'))
        .pipe(gulp.dest('./build'));

    gulp.src('./app/lib/leaflet/*.map')
        //.pipe(plugins.concat('*.html'))
        .pipe(gulp.dest('./build'));

});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src(['!bower_components/**/*.min.js',
            'bower_components/**/*.js'])
        .pipe(plugins.concat('lib_bower.js',  {newLine: '; /* раздел */ \r\n'}))
        .pipe(gulp.dest('./build'));
});



gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    gulp.src(['!bower_components/**/*.min.css',
            'bower_components/**/*.css'])
        .pipe(plugins.concat('lib_bower.css'))
        .pipe(gulp.dest('./build'));
});

gulp.task('copy-index', function() {
    gulp.src('./app/index.html')
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

gulp.task('default',['connect','scripts', 'main_thml', 'images', 'templates','copy-index'
    ,'vendorJS'
    ,'vendorLeafletJS'
    ,'vendorCSS'
    ,'vendorLeafletCSS'
    ,'watch']);