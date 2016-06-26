module.exports = function(options) {

  var jsparser = options.jsparser;
  var printer = options.printer;

  printer(jsparser.parser);

  function parse(source) {

    var program;

    try {

      program = jsparser.parse(source);

      // console.log(program);
      
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



//
// | CallExpressionNoBF Arguments
// {
//   $$ = new CallExpressionNode($1, $2, createSourceLocation(null, @1, @2));
// }
// | CallExpressionNoBF "[" Expression "]"
// {
//   $$ = new MemberExpressionNode($1, $3, true, createSourceLocation(null, @1, @4));
// }
// | CallExpressionNoBF "." IdentifierName
// {
//   $$ = new MemberExpressionNode($1, $3, false, createSourceLocation(null, @1, @3));
// }
// | VukCallExpression












