// var ecmascript = require("../src/ecmascript");
// var printer = require("../src/print");
// var Parser = require("../src/parser");
//
//
// function clean(someText) {
//     return someText.replace(/(\r\n|\n|\r|\s)/gm,"");
// }
//
// function cleanFunStr(fun) {
//     return clean(fun.toString());
// }
//
// xdescribe('regresions', function() {
//
//
//     var parser;
//     beforeEach(function() {
//         parser = Parser({
//             jsparser: ecmascript,
//             printer: printer
//         });
//     });
//
//
//     it('console.log() not working', function() {
//
//         var given = "console.log();";
//
//         var expectedResult = "console.log();";
//
//         var parsingResult = clean(parser.parse(given));
//
//         expect(parsingResult).toBe(expectedResult);
//
//     });
//
//
//     xit('console.log() not working', function() {
//
//         var given = "bilo.(s)koji(krs)ene(rrr);";
//
//         var expectedResult = "bilo.kojiene(s,krs,rrr);";
//
//         var parsingResult = clean(parser.parse(given));
//
//         expect(parsingResult).toBe(expectedResult);
//
//     });
//
//     // this is for trying only, does not belong here
//     xit('regular function call', function() {
//
//         // var given = "trci(senad)brzo(upm);";
//         // var expectedResult = "trcibrzo(senad,upm);";
//         //
//         // var parsingResult = clean(parser.parse(given));
//         //
//         // expect(parsingResult).toBe(expectedResult);
//
//     });
//
// });