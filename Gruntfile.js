'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                'assets/js/templates/*.js',
                '!assets/**/*.min.*'
            ]
        },
        sass: {
            dev: {
                options: {
                    compass: false,
                    style: 'expanded', // Don't compress it
                    sourcemap: 'none',
                    bundleExec: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: ['*.scss','!_*.scss'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    compass: false,
                    style: 'compressed', // Do compress it
                    sourcemap: 'none',
                    bundleExec: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: ['*.scss','!_*.scss'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/js',
                    src: ['*.js','!*.min.js','!_*.js'],
                    dest: 'assets/js',
                    ext: '.min.js'
                }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 9']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
        /**
         * grunt-contrib-clean
         *
         * Clean files and folders.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-clean
         */
        clean: {
            main: ['release/build']
        },
        /**
         * grunt-contrib-copy
         *
         * Copy files and folders
         *
         * @link https://www.npmjs.com/package/grunt-contrib-copy
         */
        copy: {
            // Copy the theme to a versioned release directory
            main: {
                expand: true,
                src: [
                    '**',
                    '!**/.*',
                    '!**/readme.md',
                    '!node_modules/**',
                    '!release/**',
                    '!Gruntfile.js',
                    '!package.json',
                    '!README.md',
                    '!tests/**',
                    '!vendor/**',
                    '!assets/sass/**',
                    'assets/css/**/*.css',
                    'assets/css/**/*.min.css',
                    'assets/js/**/*.js',
                    'assets/js/**/*.min.js',
                    'assets/js/vendor/**',
                    '!Gemfile*',
                    '!config.rb'
                ],
                dest: 'release/build/'
            }
        },
        /**
         * grunt-contrib-compress
         *
         * Compress files and folders.
         *
         * Used in grunt package to create production-ready zip file.
         *
         * @link https://www.npmjs.com/package/grunt-contrib-compress
         */
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: './release/build.zip'
                },
                expand: true,
                cwd: 'release/build/',
                src: ['**/*']
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            sass: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin']
            },
            js: {
                files: [
                    'assets/js/_*.js',
                    'assets/js/*.js',
                    '!assets/js/*.min.*'
                ],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    // Register default tasks.
    grunt.registerTask( 'default', [
        'compile'
    ]);

    // Reegister script and style tasks.
    grunt.registerTask( 'compile', [
        'jshint',
        'uglify',
        'sass',
        'autoprefixer',
        'cssmin'
    ]);

    // Compile the release build.
    grunt.registerTask( 'build', [
        'compile',
        'potomo',
        'clean',
        'copy:main',
        'compress'
    ]);
};
