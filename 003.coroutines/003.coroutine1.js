"use strict";

// bluebird is a nice promise library which has a "delay" promise
var Promise = require("bluebird");


// This simulates a simple service which adds two numbers, but takes some time to run
function delayed_add(a, b)
{
	return Promise.delay(500).then( () => Number(a)+Number(b) );
}

// This is a generator which calls delayed add over and over, looks like a function
// which blocks on a promise
function* delayed_add_generator()
{
	let result = 0;
	for( let x in arguments)
	{
		let newresult = yield delayed_add(result, x);
		console.log(`delayedaddition ${x} + previous result = ${newresult}`);
		result = newresult;
	}
	return result;
}

// What if we drive a generator like a promise
//   any yield will be resolved as a promise function
//   any results passed back as return values

function coroutine_ize(generator_function)
{
	return function()
	{
		//instantiate the generator object with whatever arguments were passed to this function
		let g = generator_function.apply(this, arguments);

		let p = new Promise(function(resolve, reject)
		{	
			function get_next_value(previous_result)
			{
				try
				{
					//run the couroutine from where it last left off:
					let yielded_result = g.next(previous_result);

					if( yielded_result.done )
						//couroutine has finished
						resolve(yielded_result.value);
					else
						//couroutine still going, resolve whatever it gave us and when that has finished, recurse
						Promise.resolve( yielded_result.value )
						.then(get_next_value);
						//TODO: deal with the "catch" case 
				}
				catch(err)
				{
					reject(err);
				}
			}

			return get_next_value(undefined);//first call to generator must be with undefined value
		});

		return p;
	}
}


let add_up_args_couroutine = coroutine_ize(delayed_add_generator);

// looks like a synchronous blocking promise function:
add_up_args_couroutine(1,2,3,4,5,6).then( sum => console.log(" DONE : " + sum));

