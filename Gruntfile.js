module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      early: {
        src: [
          'js/modernizr.js'
        ],
        dest: 'early.js',
      },
      dist: {
        src: [
          'bower_components/smooth-scroll/src/js/*.js',
          'bower_components/waypoints/lib/noframework.waypoints.js',
          'js/*.js'
        ],
        dest: 'script.js',
      }
    },
    uglify: {
      build: {
        src: 'script.js',
        dest: 'script.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          src: 'scss/style.scss',
          dest: 'style.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'style.css',
        dest: ''
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html']
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['concat', 'uglify']
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          src: 'style.css',
          dest: 'style.css'
        }]
      }
    },
    bower_concat: {
      all: {
        dest: 'js/_bower.js',
        cssDest: 'scss/_bower.scss',
        exclude: [
          'smooth-scroll',
          'modernizr',
          'waypoints'
        ],
        bowerOptions: {
          relative: false
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['bower_concat', 'concat', 'uglify', 'cssmin', 'imagemin', 'sass', 'autoprefixer', 'connect', 'watch']);

};
