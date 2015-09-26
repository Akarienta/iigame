'use strict'

module.exports = (grunt) ->

   # paths config
   appConfig =
      app: 'app'
      dist: 'dist'

   # configuration
   grunt.initConfig

      config: appConfig

      # grunt clean
      clean:
         dev: '.tmp'
         dist: [
            '<%= config.dist %>'
            '.tmp'
         ]
         sass: '.tmp/styles'
         coffee: '.tmp/scripts'

      # auto insertion of scrips from bower_components
      wiredep:
         app:
            src: '<%= config.app %>/index.html'
            exclude: 'foundation.css'
            ignorePath: /\.\.\//

      # grunt sass
      sass:
         compile:
            options:
               style: 'expanded'
               loadPath: [
                  'bower_components/foundation/scss'
               ]
            files: [
               expand: true
               cwd: '<%= config.app %>/styles'
               src: 'main.scss'
               dest: '.tmp/styles'
               ext: '.css'
            ]

      # adds browser prefixes
      autoprefixer:
         all:
            files: [
               expand: true,
               cwd: '.tmp/styles'
               src: '**/*.css',
               dest: '.tmp/styles'
            ]

      # auto annotation of AngularJS injection
      ngAnnotate:
         all:
            files: [
               expand: true
               cwd: '<%= config.app %>'
               src: '**/*.js'
               dest: '.tmp'
            ]

      # grunt connect
      connect:
         options:
            port: 9000
            hostname: 'localhost'
            livereload: true
         livereload:
            options:
               open: true
               middleware: (connect) ->
                  middlewares = []

                  middlewares.push connect.static '.tmp'
                  middlewares.push connect().use '/bower_components', connect.static './bower_components'
                  #middlewares.push connect.static appConfig.app

                  return middlewares

      # grunt watch
      watch:
         bower:
            files: 'bower.json'
            tasks: 'wiredep'
         html:
            files: '<%= config.app %>/**/*.html'
            tasks: 'copy:dev'
         js:
            files: '<%= config.app %>/**/*.js'
            tasks: ['ngAnnotate']
         sass:
            files: '<%= config.app %>/**/*.scss'
            tasks: ['clean:sass', 'sass:compile', 'autoprefixer']
         livereload:
            options:
               livereload: '<%= connect.options.livereload %>'
            files: [
               '<%= config.app %>/**/*.html'
               '.tmp/styles/**/*.css'
               '.tmp/scripts/**/*.js'
               '<%= config.app %>/images/**/*.{png,jpg,jpeg,gif,svg}'
            ]

      # grunt copy
      copy:
         dist:
            files: [
               {
                  # pages and jsons
                  expand: true,
                  flatten: true,
                  cwd: '<%= config.app %>',
                  src: '**/*.{html,json}',
                  dest: '<%= config.dist %>'
               }
               {
                  # images
                  expand: true,
                  cwd: '<%= config.app %>/images',
                  src: '**/*.{png,jpg,jpeg,gif,svg}',
                  dest: '<%= config.dist %>/images'
               }
               {
                  # favicon
                  expand: true,
                  cwd: '<%= config.app %>/favicon',
                  src: '**/*.{png,ico,xml,json}',
                  dest: '<%= config.dist %>/favicon'
               }
               {
                  # icons
                  expand: true,
                  flatten: true,
                  cwd: 'bower_components',
                  dest: '<%= config.dist %>/fonts',
                  src: 'foundation-icon-fonts/*.{ttf,eot,woff,svg}'
               }
            ]
         dev:
            files: [
               {
                  # pages and jsons
                  expand: true,
                  flatten: true,
                  cwd: '<%= config.app %>',
                  src: '**/*.{html,json}',
                  dest: '.tmp'
               }
               {
                  # icons
                  expand: true,
                  flatten: true,
                  cwd: 'bower_components',
                  dest: '.tmp/fonts',
                  src: 'foundation-icon-fonts/*.{ttf,eot,woff,svg}'
               }
            ]

      # preparation of CSS and JS minification
      useminPrepare:
         html: '<%= config.app %>/**/*.html'
         options:
            dest: '<%= config.dist %>'

      # CSS and JS minification
      usemin:
         html: '<%= config.dist %>/**/*.html'

      # HTML minification
      htmlmin:
         dist:
            options:
               removeComments: true
               collapseWhitespace: true
            files: [
               expand: true,
               cwd: '<%= config.dist %>',
               src: '**/*.html',
               dest: '<%= config.dist %>'
            ]

      # generates translation templates
      nggettext_extract:
         pot:
            files:
               '<%= config.app %>/po/template.pot': [
                  '<%= config.app %>/**/*.html'
                  '<%= config.app %>**/*.js'
               ]

      # compiles translation files
      nggettext_compile:
         all:
            files:
               '<%= config.app %>/translations.js': [
                  '<%= config.app %>/po/*.po'
               ]

   require('load-grunt-tasks') grunt
   require('time-grunt') grunt

   grunt.registerTask 'serve', [
      'clean:dev'
      'wiredep'
      'sass'
      'autoprefixer'
      'ngAnnotate'
      'copy:dev'
      'connect:livereload'
      'watch'
   ]

   grunt.registerTask 'build', [
      'clean:dist'
      'wiredep'
      'sass'
      'autoprefixer'
      'ngAnnotate'
      'copy:dist'
      'useminPrepare'
      'concat'
      'cssmin'
      'uglify'
      'usemin'
      'htmlmin'
   ]

   grunt.registerTask 'genpot', [
      'nggettext_extract'
   ]

   grunt.registerTask 'translate', [
      'nggettext_compile'
   ]