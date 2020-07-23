// Include gulp
var gulp = require("gulp"),
  // Include Our Plugins
  less = require("gulp-less"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  imagemin = require("gulp-imagemin"),
  plumber = require("gulp-plumber"),
  sourcemap = require("gulp-sourcemaps"),
  server = require("browser-sync").create();

gulp.task("css", function () {
  gulp
    .src("./less/main.less")
    .pipe(plumber())
    .pipe(gulpIf(sourcemap.init()))
    .pipe(
      less({
        strictMath: true,
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["> 1%", "IE 9", "IE 10"],
        }),
      ])
    )
    .pipe(gulp.dest("./css"))
    .pipe(server.stream());
});

gulp.task("image-min", () => {
  return gulp
    .src("./img/**/*.{svg,jpg,png}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3,
        }),
      ])
    )
    .pipe(gulp.dest("img/"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    index: "index.html",
  });
});

gulp.task("watch", function () {
  gulp.watch("./less/**/*.less", ["css"]);
  gulp.watch("./*.html", ["refresh"]);
});

gulp.task("default", ("css", ["watch", "server"]));
