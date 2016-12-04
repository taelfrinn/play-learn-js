
// generator is an interruptible function which can be continued where it left off
// control can be passed back to it



function* idMaker(initvalue)
{
  var index = initvalue;
  console.log(`Initial value is ${initvalue}`);
  while(true)
  {
	  var yieldedval = yield index;
	  console.log(`Generator restarted with ${yieldedval}`);
	  index += yieldedval;
  }
}

console.log("Initialize Generator function:");
var gen = idMaker(100);// generator instantiated but doesnt run yet

console.log("Begin test:");
console.log(`next(1) returned ${gen.next(1).value}`); // arguments to first call to next() are completely ignored, runs as is first call made
console.log(`next(2) returned ${gen.next(2).value}`); // subsequent calls are sent to generator as return values from yield
console.log(`next(3) returned ${gen.next(3).value}`); // 
