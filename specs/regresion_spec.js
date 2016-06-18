var ecmascript = require("../src/ecmascript");
var printer = require("../src/print");
var Parser = require("../src/parser");


function clean(someText) {
    return someText.replace(/(\r\n|\n|\r|\s)/gm,"");
}

function cleanFunStr(fun) {
    return clean(fun.toString());
}

xdescribe('regresions', function() {


    var parser;
    beforeEach(function() {
        parser = Parser({
            jsparser: ecmascript,
            printer: printer
        });
    });


    it('console.log() not working', function() {

        // var given = "x";
        //
        // var expectedResult = "x";
        //
        // var parsingResult = parser.parse(given);
        //
        // expect(parsingResult).toBe(expectedResult);

        var given = "console.log()";

        var expectedResult = "console.log()";

        var parsingResult = parser.parse(given);

        expect(parsingResult).toBe(expectedResult);

    });

});