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
        }
    });

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify:prod']);
};
