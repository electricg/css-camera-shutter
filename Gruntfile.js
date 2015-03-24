'use strict';

module.exports = function (grunt) {

  var config = {
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss'],
          dest: 'css',
          ext: '.dev.css'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['*.html', '*.json'],
        tasks: [],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['css/*.scss'],
        tasks: ['sass:dev'],
        options: {
            spawn: false,
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '',
          hostname: '*'
        }
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('dev', ['sass:dev', 'connect', 'watch']);
  grunt.registerTask('heroku', ['sass:dev']);
};