module.exports = function(grunt) {
  grunt.initConfig({
    uglify:{
      build:{
        src:'src/breadcrumb.js',
        dest:'breadcrumb.js'
      }
    }
  });
grunt.loadNpmTasks('grunt-contrib-uglify');
}
