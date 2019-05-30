var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

function build() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
}

gulp.task("build", function () {
  return build()
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', build);
});