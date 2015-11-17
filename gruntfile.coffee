'use strict'

module.exports = (grunt) ->

   # paths config
   appConfig =
      app: 'src'
      dist: 'dist'
      temp: '.tmp'

   # configuration
   grunt.initConfig

      config: appConfig

      # grunt clean
      clean:
         dev: '<%= config.temp %>'
         dist: [
            '<%= config.dist %>'
            '<%= config.temp %>'
         ]
         sass: '<%= config.temp %>/styles'
         coffee: '<%= config.temp %>/scripts'

      # auto insertion of scrips from bower_components
      wiredep:
         all:
            expand: true
            src: '<%= config.temp %>/index.html'
            exclude: ['foundation.css', 'foundation-icons.css']
            ignorePath: /\.\.\//

      html2js:
         options:
            module: 'iigame.core'
            existingModule: true
            quoteChar: '\''
            useStrict: true
            rename: (moduleName) ->
               names = moduleName.split('/')
               names[names.length - 1]
            singleModule: true
            htmlmin:
               collapseWhitespace: true,
               removeComments: true
         main:
            src: ['<%= config.app %>/**/*.html', '!<%= config.app %>/index.html']
            dest: '<%= config.temp %>/core/templates.js'

      # auto insertion of angular scrips in correct order
      ngsrc:
         all:
            cwd: '<%= config.temp %>/',
            src: ['core/app.module.js', '**/*.js', '**/*.spec.js'],
            dest: ['<%= config.temp %>/index.html']

      # grunt sass
      sass:
         compile:
            options:
               style: 'expanded'
               loadPath: [
                  'bower_components/foundation/scss',
                  'bower_components/foundation-icon-fonts/',
               ]
            files: [
               expand: true
               cwd: '<%= config.app %>/styles'
               src: 'main.scss'
               dest: '<%= config.temp %>/styles'
               ext: '.css'
            ]

      # adds browser prefixes
      autoprefixer:
         options:
            singleQuotes: true
         all:
            files: [
               expand: true,
               cwd: '<%= config.temp %>/styles'
               src: '**/*.css',
               dest: '<%= config.temp %>/styles'
            ]

      # auto annotation of AngularJS injection
      ngAnnotate:
         all:
            files: [
               expand: true
               cwd: '<%= config.app %>'
               src: '**/*.js'
               dest: '<%= config.temp %>'
            ]

      # grunt connect
      connect:
         options:
            port: 9000
            hostname: '0.0.0.0'
            livereload: true
         livereload:
            options:
               open: true
               middleware: (connect) ->
                  middlewares = []

                  middlewares.push connect.static '.tmp', {dotfiles: 'allow'}
                  middlewares.push connect().use '/lib', connect.static './lib'
                  middlewares.push connect().use '/bower_components', connect.static './bower_components'

                  return middlewares

      # grunt watch
      watch:
         bower:
            files: 'bower.json'
            tasks: ['copy:index', 'wiredep', 'ngAnnotate', 'ngsrc']
         index:
            files: '<%= config.app %>/index.html'
            tasks: ['copy:index', 'wiredep', 'ngAnnotate', 'ngsrc']
         htmlAndJson:
            options:
               dot: true
            files: ['<%= config.app %>/**/*.{html,json}', '!<%= config.app %>/index.html', '!<%= config.app %>/firebase.example.json']
            tasks: 'copy:dev'
         js:
            files: '<%= config.app %>/**/*.js'
            tasks: ['copy:index', 'wiredep', 'ngAnnotate', 'ngsrc']
         sass:
            files: '<%= config.app %>/**/*.scss'
            tasks: ['clean:sass', 'sass:compile', 'autoprefixer']
         livereload:
            options:
               livereload: '<%= connect.options.livereload %>'
            files: [
               '<%= config.temp %>/index.html'
               '!<%= config.app %>/index.html'
               '<%= config.app %>/**/*.{html,json}'
               '<%= config.temp %>/styles/**/*.css'
               '<%= config.temp %>/scripts/**/*.js'
               '<%= config.app %>/images/**/*.{png,jpg,jpeg,gif,svg}'
            ]

      # grunt copy
      copy:
         index:
            files: [
               expand: true,
               cwd: '<%= config.app %>',
               src: 'index.html',
               dest: '<%= config.temp %>'
            ]
         dist:
            files: [
               {
                  # index
                  expand: true,
                  cwd: '<%= config.temp %>',
                  src: 'index.html',
                  dest: '<%= config.dist %>'
               }
               {
                  # config
                  expand: true,
                  cwd: '<%= config.app %>',
                  src: 'firebase.example.json',
                  dest: '<%= config.dist %>'
                  rename: (dest, src) ->
                     dest + '/' + src.replace('.example', '')
               }
               {
                  # jsons
                  expand: true,
                  cwd: '<%= config.app %>',
                  src: ['**/*.json', '!firebase.example.json', '!firebase.json'],
                  dest: '<%= config.dist %>'
                  dot: true
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
                  # fonts
                  expand: true,
                  flatten: true,
                  cwd: 'bower_components',
                  dest: '<%= config.dist %>/fonts',
                  src: 'foundation-icon-fonts/*.{ttf,eot,woff,svg}'
               }
               {
                  # favicon
                  expand: true,
                  cwd: '<%= config.app %>/favicon',
                  dest: '<%= config.dist %>/favicon',
                  src: '*.*'
               }
            ]
         dev:
            files: [
               {
                  # pages and jsons
                  expand: true,
                  flatten: true,
                  cwd: '<%= config.app %>',
                  src: ['**/*.{html,json}', '!index.html', '!firebase.example.json'],
                  dest: '<%= config.temp %>'
                  dot: true
               }
               {
                  # images
                  expand: true,
                  cwd: '<%= config.app %>/images',
                  src: '**/*.{png,jpg,jpeg,gif,svg}',
                  dest: '<%= config.temp %>/images'
               }
               {
                  # fonts
                  expand: true,
                  flatten: true,
                  cwd: 'bower_components',
                  dest: '<%= config.temp %>/fonts',
                  src: 'foundation-icon-fonts/*.{ttf,eot,woff,svg}'
               }
               {
                  # favicon
                  expand: true,
                  cwd: '<%= config.app %>/favicon',
                  dest: '<%= config.temp %>/favicon',
                  src: '*.*'
               }
            ]

      # preparation of CSS and JS minification
      useminPrepare:
         html: '<%= config.temp %>/index.html'
         options:
            dest: '<%= config.dist %>'
            flow:
               html:
                  steps:
                     js: ['concat', 'uglify']
                     css: ['cssmin']

      # rename files because of browser cache
      filerev:
         dist:
            src: [
               '<%= config.dist %>/js/**/*.js',
               '<%= config.dist %>/css/**/*.css',
               '<%= config.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
               '<%= config.dist %>/fonts/**/*'
            ]

      # CSS and JS minification
      usemin:
         html: '<%= config.dist %>/**/*.html'
         css: '<%= config.dist %>/css/**/*.css'
         js: '<%= config.dist %>/js/**/*.js'
         options:
            assetsDirs: [
               '<%= config.dist %>',
               '<%= config.dist %>/images',
               '<%= config.dist %>/css'
            ]
            patterns:
               js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]

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
      'copy:index'
      'wiredep'
      'ngAnnotate'
      'ngsrc'
      'sass'
      'autoprefixer'
      'copy:dev'
      'connect:livereload'
      'watch'
   ]

   grunt.registerTask 'build', [
      'clean:dist'
      'copy:index'
      'wiredep'
      'html2js'
      'ngAnnotate'
      'ngsrc'
      'sass'
      'autoprefixer'
      'copy:dist'
      'useminPrepare'
      'concat'
      'cssmin'
      'uglify'
      'filerev'
      'usemin'
      'htmlmin'
   ]

   grunt.registerTask 'genpot', [
      'nggettext_extract'
   ]

   grunt.registerTask 'translate', [
      'nggettext_compile'
   ]