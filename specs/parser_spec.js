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
        it('for standard function declaration should return that function', function() {
            var givenSource = "function isEmpty() {}";
            var expectedFun = cleanFunStr(function isEmpty() {});

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);
        });

        it('starting with arguments first, followed by identifier', function() {

            var givenSource = "function (array)isEmpty() {}";
            var expectedFun = cleanFunStr(function isEmpty(array) {});

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);

        });

        it('starting with identifier followed by args, followed by identifier', function() {

            var givenSource = "function from(array1)removeNumbers() {}";
            var expectedFun = cleanFunStr(function fromremoveNumbers(array1) {});

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);

        });

    });

    describe('function ending with NON-EMPTY arguments list', function() {

        it('starting with args list, followed by identifier', function() {

            var givenSource = "function (array1)andNotIn(array2) {}";
            var expectedFun = cleanFunStr(function andNotIn(array1, array2) {});

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);

        });

        it('starting with args list, followed by identifier, followed by args list, followed by identifier', function() {

            var givenSource = "function (element)isIn(array1)andNotIn(array2) {}";
            var expectedFun = cleanFunStr(function isInandNotIn(element, array1, array2) {});

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);
        });

        it('starting with identifier, followed by args list, followed by identifier', function() {


            var givenSource = "function elementsOf(array1)areFoundIn(array2) {}";
            var expectedFun = clean((function elementsOfareFoundIn(array1, array2) {}).toString());

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);
        });

    });

    describe('functions with multiple arguments in args list', function() {
        it('should be parse correctly no matter how many args are in the any of the args list', function() {

            var givenSource = "function identifier1(arg1, arg2, arg3)Identifier2(arg1, arg2) {}";
            var expectedFun = clean((function identifier1Identifier2(arg1, arg2, arg3, arg1, arg2) {}).toString());

            var parsingResult = clean(parser.parse(givenSource));

            expect(parsingResult).toBe(expectedFun);
        });
    });




});