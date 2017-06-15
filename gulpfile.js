var ghpages = require('gh-pages');
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var replace = require('gulp-replace');
var merge = require('gulp-merge');
const shell = require('gulp-shell')

var deploydir = './deploy';

gulp.task('deploy:install', [], shell.task('npm install jdash-ui --force'));

gulp.task('deploy:clean', [], function (done) {
    del([
        deploydir,
        'node_modules/jdash-ui'
    ], {
            force: true
        }).then(() => done()).catch(err => done(err))
})


gulp.task('deploy:app', ['deploy:clean'], function () {
    return gulp.src(['./CNAME', './demos/**', './css/**', './assets/**/*', './index.html'], {
        base: './'
    })
        //.pipe(replace('node_modules', 'lib'))
        .pipe(gulp.dest(deploydir));
})

gulp.task('deploy:vendor', ['deploy:clean', 'deploy:install'], function () {
    return gulp.src(['./node_modules/jdash-ui/**'], { base: './node_modules' })
        .pipe(gulp.dest(deploydir + '/node_modules'))
})

gulp.task('deploy:xcopy', ['deploy:app', 'deploy:vendor'], function () {

})

gulp.task('push', ['deploy'], function (done) {
    return ghpages.publish(path.join(__dirname, deploydir), done);
})

gulp.task('deploy', ['deploy:clean', 'deploy:install', 'deploy:xcopy'], function () {

})
