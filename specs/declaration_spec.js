var ecmascript = require("../src/ecmascript");
var printer = require("../src/print");
var Parser = require("../src/parser");


function clean(someText) {
    return someText.replace(/(\r\n|\n|\r|\s)/gm,"");
}

function cleanFunStr(fun) {
    return clean(fun.toString());
}

describe('parser', function() {

    var parser;
    beforeEach(function() {
        parser = Parser({
            jsparser: ecmascript,
            printer: printer
        });
    });

    describe('functions ending with empty arguments list', function() {

        it('standard function declaration should parse to itself', function() {

            var given = "function isEmpty() {}";

            var expectedResult = cleanFunStr(function isEmpty() {});

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);
        });

        it('starting with arguments first, followed by identifier', function() {

            var given = "function (array)isEmpty() {}";

            var expectedResult = cleanFunStr(function isEmpty(array) {});

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);

        });

        it('starting with identifier followed by args, followed by identifier', function() {

            var given = "function from(array1)removeNumbers() {}";

            var expectedResult = cleanFunStr(function fromremoveNumbers(array1) {});

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);

        });

    });

    describe('function ending with NON-EMPTY arguments list', function() {

        it('starting with args list, followed by identifier', function() {

            var given = "function (array1)andNotIn(array2) {}";

            var expectedResult = cleanFunStr(function andNotIn(array1, array2) {});

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);

        });

        it('starting with args list, followed by identifier, followed by args list, followed by identifier', function() {

            var given = "function (element)isIn(array1)andNotIn(array2) {}";

            var expectedResult = cleanFunStr(function isInandNotIn(element, array1, array2) {});

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);
            
        });

        it('starting with identifier, followed by args list, followed by identifier', function() {

            var given = "function elementsOf(array1)areFoundIn(array2) {}";

            var expectedResult = clean((function elementsOfareFoundIn(array1, array2) {}).toString());

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);
            
        });

    });

    describe('functions with multiple arguments in args list', function() {

        it('should be parsed correctly no matter how many args are in the any of the args list', function() {

            var given = "function identifier1(arg1, arg2, arg3)Identifier2(arg1, arg2) {}";

            var expectedResult = clean((function identifier1Identifier2(arg1, arg2, arg3, arg1, arg2) {}).toString());

            var parsingResult = clean(parser.parse(given));

            expect(parsingResult).toBe(expectedResult);
        });
    });




});