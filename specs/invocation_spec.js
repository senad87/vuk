// THIS test IS not RUNNING, there is a X in front of describe

var ecmascript = require("../src/ecmascript");
var printer = require("../src/print");
var Parser = require("../src/parser");


function clean(someText) {
    return someText.replace(/(\r\n|\n|\r|\s)/gm,"");
}

describe('Invocation', function() {

    var parser;
    beforeEach(function() {
        parser = Parser({
            jsparser: ecmascript,
            printer: printer
        });
    });

    // arfuments list and expression are the same rule
    //https://www.dropbox.com/s/cte2ll2hzpdi7kk/File%207-30-16%2C%2011%2008%2031%20AM.jpeg?dl=0


    // TODO: LOOK AT THE CallExpressionNoBF -> | MemberExpressionNoBF "(" Expression ")" this is why this does not work,
    // YOU FUCKED UP THE CallExpression you fucking idiot
    // TODO::::::: You can't just use (Expession) insted of arguments in CallExpression
    xit('should work when invoked with literal', function() {

        var givenSource = "trci('senad');";
        var expected = "trci('senad');";

        expect(clean(parser.parse(givenSource))).toBe(expected);
    });

    xit('should work with standard JS', function() {

        var givenSource = "trci(senad);";
        var expected = "trci(senad);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work with empty parameters list', function() {

        var givenSource = "trci();";
        var expected = "trci();";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work with multiple split parameters lists', function() {

        var givenSource = "trci(senad)brzo(upm);";
        var expected = "trcibrzo(senad,upm);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });


    xit('should work when ending with the empty param list', function() {

        var givenSource = "trci(senad)brzo();";
        var expected = "trcibrzo(senad);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work starting with one param', function() {

        var givenSource = "(arg1)id1(arg2);";
        var expected = "id1(arg1,arg2);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work starting with two params', function() {

        var givenSource = "(arg1,arg2)id1(arg3);";
        var expected = "id1(arg1,arg2,arg3);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work starting with params list', function() {

        var givenSource = "(arg1)id1(arg2)id2(arg3);";
        var expected = "id1id2(arg1,arg2,arg3);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit('should work, multiple params in many params lists', function() {

        var givenSource = "(arg1)id1(arg2,arg3)id2(arg4,arg5,arg6);";
        var expected = "id1id2(arg1,arg2,arg3,arg4,arg5,arg6);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    xit("declaration & invocation test", function() {

        var givenSource = "function is(element)In(array){ return array.indexOf(element) != -1; }   is(1)In([1,2,3])";
        // console.log(parser.parse(givenSource));
    });
});