module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['src/**/*']
        },
        livereload: {
            options: {
                base: 'client',
            },
            files: ['client/**/*']
        },
        watch: {
            files: ['client/**/*'],
            tasks: ['jshint', 'mochaTest']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    ////////////////////////////////////////////////////
    // Main grunt tasks
    ////////////////////////////////////////////////////

    grunt.registerTask('default', ['jshint', 'watch']);

};