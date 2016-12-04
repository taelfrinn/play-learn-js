'use strict';

//Blue bird has this built-in
var Promise = require("bluebird");

// lets maek some couroutines and chain them together:

let continuationCoroutine = Promise.coroutine(function* (val) {
    console.log("Continued Step1", val);
    val = yield Promise.delay(500).then( ()=> Promise.resolve(val + ".cont1"));
    console.log("Continued Step2", val);
    val = yield Promise.delay(500).then( ()=> Promise.resolve(val + ".cont2"));

	return Promise.delay(500).then( ()=> Promise.resolve(val) );
});

let RunTillDone = Promise.coroutine(function* (val) {
    console.log("Step1", val)

    val = yield Promise.delay(500).then(function(){return Promise.resolve(val + ".2")});
    
    console.log("Step2", val)
    val = yield Promise.delay(500).then( () => Promise.resolve(val + ".3") );

	return continuationCoroutine(val);
});


RunTillDone("test")
.then(function(result)
{
	console.log("Done", result);
});
