var ghpages = require('gh-pages');
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var replace = require('gulp-replace');
var merge = require('gulp-merge');

var deploydir = 'deploy';

gulp.task('deploy:clean', [], function (done) {
    del([
        deploydir
    ], {
            force: true
        }).then(() => done()).catch(err => done(err))
})

gulp.task('deploy:xcopy', ['deploy:clean'], function () {
    return merge([
        gulp.src(['./CNAME', './demos/**', './css/**', './index.html'], {
            base: './'
        })
            .pipe(replace('node_modules', 'lib'))
            .pipe(gulp.dest(deploydir)),
        gulp.src(['./node_modules/jdash-ui/**'], { base: './node_modules' })
            .pipe(gulp.dest(deploydir + '/lib'))
    ])

})

gulp.task('deploy:push', ['deploy:xcopy'], function (done) {
    ghpages.publish(path.join(__dirname, deploydir), done);
})

gulp.task('deploy', ['deploy:clean', 'deploy:xcopy', 'deploy:push'], function () {

})
