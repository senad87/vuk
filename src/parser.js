module.exports = function(options) {

  var jsparser = options.jsparser;
  var printer = options.printer;

  printer(jsparser.parser);

  function parse(source) {

    var program;

    try {

      program = jsparser.parse(source);

      var validJS = program.print("", " ");

      return validJS;

    } catch (exception) {
      console.log("Parse Error:  " + exception.message);
    }

  }

  return {
    parse: parse
  };

};












