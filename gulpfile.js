var gulp = require("gulp");
var rq = {
    gutil: require("gulp-util"),
    sass: require("gulp-sass")
};

var fs = {};
fs.wwwroot = "./";
fs.node = "./node_modules";

fs.app = {};
fs.app.root = fs.wwwroot + "/app";
fs.app.style = fs.wwwroot + "/style";
fs.app.scss = fs.app.style + "/**/*.scss";

fs.vendor = {};
fs.vendor.root = fs.wwwroot + "/vendor";
fs.vendor.style = fs.vendor.root;
fs.vendor.scss = fs.vendor.style + "/**/*.scss";

fs.release = {};
fs.release.root = fs.wwwroot + "/bundled";

gulp.task("scss-compile", function () {
    gulp
        .src(fs.vendor.scss)
        .pipe(rq.sass())
        .pipe(gulp.dest(fs.vendor.style));

    gulp
        .src(fs.app.scss)
        .pipe(rq.sass())
        .pipe(gulp.dest(fs.app.style));
});

gulp.task("scss-watch", function () {
    rq.gutil.log("Watching " + fs.app.scss);
    gulp.watch(fs.app.scss, ["scss-compile"]);
});