module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                options: {
                    transform: [
                        ['babelify']
                    ],
                    browserifyOptions: {
                        debug: true,
                        paths: ['./node_modules', './src/js']
                    }
                },
                files: {
                    'server/web/js/bundle.js': ['src/js/**/*.js']
                }
            },
            prod: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015']
                        }]
                    ],
                    browserifyOptions: {
                        paths: ['./node_modules', './src/js']
                    }
                },
                files: {
                    'server/web/js/bundle.js': ['src/js/**/*.js']
                }
            }
        },
        watch: {
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['browserify:dev'],
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['browserify:dev']);
    grunt.registerTask('default', ['browserify:prod']);
};
