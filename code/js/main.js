function increment(a)
{
 return (a) + (1);
}
function allIn(funToBeCalledFor, array)
{
 return array.map(funToBeCalledFor);
}
var numbers = [1, 2, 3]
;
allIn(increment, numbers)
;
