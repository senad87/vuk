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


    it('should work standard JS', function() {

        var givenSource = "trci(senad);";
        var expected = "trci(senad);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    it('should work standard JS', function() {

        var givenSource = "trci();";
        var expected = "trci();";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });



    it('should work', function() {

        var givenSource = "trci(senad)brzo(upm);";
        var expected = "trcibrzo(senad,upm);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    it('should work', function() {

        var givenSource = "trci(senad)brzo();";
        var expected = "trcibrzo(senad);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    it('should work', function() {

        var givenSource = "(arg1)id1(arg2)id2(arg3);";
        var expected = "id1id2(arg1,arg2,arg3);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });

    it('should work, multiple args', function() {

        var givenSource = "(arg1)id1(arg2,arg3)id2(arg4,arg5,arg6);";
        var expected = "id1id2(arg1,arg2,arg3,arg4,arg5,arg6);";

        expect(clean(parser.parse(givenSource))).toBe(expected);

    });



    it("will it really work", function() {

        var givenSource = "function is(element)In(array){ return array.indexOf(element) != -1; }   is(1)In([1,2,3])";

        console.log(parser.parse(givenSource));
    });
});