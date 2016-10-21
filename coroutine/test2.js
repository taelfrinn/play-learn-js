'use strict';

var Promise = require("bluebird");


let Step2 = Promise.coroutine(function* (val)
{
    console.log("Step2", val)
    yield Promise.delay(500)
    
	return Promise.resolve(val + " + .3")
});

let RunTillDone = Promise.coroutine(function* (val) {
    console.log("Step1", val)
    yield Promise.delay(500)
    
	return Step2(val + " + .2")
});


RunTillDone("test")
.then(function(result)
{
	console.log("Done", result);
});
