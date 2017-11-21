var gulp = require('gulp'),
    browserSync = require('browser-sync');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = '.';

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    proxy: "localhost",
    notify: true
    });
});
