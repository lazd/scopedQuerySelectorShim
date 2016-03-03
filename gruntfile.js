module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    year: new Date().getFullYear(),
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
    uglify:{
        options:{
            banner:'/* scopeQuerySelectorShim.js' + '\n*' + '\n* Copyright (C) <%= year %> Larry Davis' + '\n* All rights reserved.' + '\n*' + '\n* This software may be modified and distributed under the terms' + '\n* of the BSD license.  See the LICENSE file for details.' + '\n*/\n'
        },
        expanded:{
            options:{
                mangle:false,
                compress:false,
                beautify:true,
                preserveComments:true
            },
            files:{
                'dist/scopedQuerySelectorShim.js':[ 'src/scopedQuerySelectorShim.js' ]
            }
        },
        minified:{
            files:{
                'dist/scopedQuerySelectorShim.min.js':[ 'src/scopedQuerySelectorShim.js' ]
            }
        }
    },
    watchFiles: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      src: {
        files: [ 'src/**' ],
        tasks: [ 'jshint:src', 'uglify', 'karma:watch:run' ]
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
