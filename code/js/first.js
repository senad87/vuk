function calltimes(func, n)
{
 for (var i = 0; (i) < (n); (i++))
 {
  func();
 }

}
function log()
{
 var s = 'senad konj'
 ;
 alert(s);
}
calltimes(log, 5);
