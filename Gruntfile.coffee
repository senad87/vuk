ecmascript = require("./src/ecmascript")
printer = require("./src/print")
Parser = require("./src/parser")

parser = Parser({
  jsparser: ecmascript,
  printer: printer
});

vukFilesPath = 'code/vuk/**/*.vuk'

testFilePath = 'specs/**/*_spec.js'

module.exports = (grunt) ->

  grunt.initConfig

    watch:
      vuk:
        files: vukFilesPath
        options:
          livereload: true
        tasks: ['compile']

      tests:
        files: testFilePath
        tasks: ['runTests']

    jasmine_node:
      options:
        forceExit: true
        match: '.'
        matchall: false
        extensions: 'js'
        specNameMatcher: 'spec'
      all: ['specs/']

    connect:
      server:
        options:
          livereload: true
          open:
            target: 'http://localhost:9000/index.html'
          port: 9000


  parseFiles = ->
    vukFiles = grunt.file.expand([vukFilesPath])

    vukFiles.forEach((vukFilePath) ->

      vukContent = grunt.file.read(vukFilePath)

      jsContent = parser.parse(vukContent)

      jsFilePath = vukFilePath.replace(/\.vuk/, '.js')
      jsFilePath = jsFilePath.replace(/\/vuk/, '/js')

      grunt.file.write(jsFilePath, jsContent)

  )

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')

  grunt.loadNpmTasks('grunt-jasmine-node');


  grunt.registerTask('runTests', ['jasmine_node', 'watch:tests'])

  grunt.registerTask('compile', 'Parses .vuk files to .js files', parseFiles)

  grunt.registerTask('run', [ 'compile', 'connect', 'watch:vuk' ])