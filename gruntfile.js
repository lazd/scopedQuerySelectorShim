module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      gruntfile: 'Gruntfile.js',
      tests: 'test/*.js',
      src: 'src/*.js',
      options: {
        multistr: true,
        globals: {
          eqeqeq: true
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress']
      },
      // Watch configuration
      watch: {
        background: true
      },
      // Single-run configuration for development
      single: {
        singleRun: true
      }
    },
    watchFiles: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      src: {
        files: [ 'src/**' ],
        tasks: [ 'jshint:src', 'karma:watch:run' ]
      },
      unitTests: {
        files: [ 'test/*.js' ],
        tasks: [ 'jshint:tests', 'karma:watch:run' ]
      }
    }
  });

  // Rename watch tasks
  grunt.renameTask('watch', 'watchFiles');

  // Setup watch task to include Karma
  grunt.registerTask('watch', [ 'karma:watch:start', 'watchFiles' ]);

  // Run tests once
  grunt.registerTask('test', [ 'jshint:tests', 'karma:single' ]);

  // Start watching and run tests when files change
  grunt.registerTask('default', [ 'jshint', 'test', 'watch' ]);

};
