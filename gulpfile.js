var ghpages = require('gh-pages');
var path = require('path');
var del = require('del');
var gulp = require('gulp');

var deploydir = 'build';

gulp.task('deploy:clean', [], function (done) {
    del([
        deploydir
    ], {
            force: true
        }).then(() => done()).catch(err => done(err))
})

gulp.task('deploy:xcopy', ['deploy:clean'], function () {
    gulp.src(['./bootstrap/**', './app.js', './css/**', './jdash/**', './material/**', './node_modules/jdash-ui/**', './index.html'], {
        base: './'
    }).pipe(gulp.dest(deploydir));
})

gulp.task('deploy:push', ['deploy:xcopy'], function (done) {
    ghpages.publish(path.join(__dirname, deploydir), done);
})

gulp.task('deploy', ['deploy:clean', 'deploy:xcopy', 'deploy:push'], function () {

})

ghpages.publish(path.join(__dirname, deploydir), function (err) {
    console.log(err);
});