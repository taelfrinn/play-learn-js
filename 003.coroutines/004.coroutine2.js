"use strict";
var Promise = require("bluebird");


function delayed_add(a, b)
{
	return Promise.delay(500).then( _ => Number(a)+Number(b) );
}

function delayed_fail()
{
	return Promise.delay(500).then( _ => Promise.reject("fail on purpose") );
}

function* delayed_add_generator()
{
	let result = 0;
	for( let x in arguments)
	{
		let newresult = yield delayed_add(result, x);
		console.log(`delayedaddition ${x} + previous result = ${newresult}`);
		result = newresult;
	}
	try
	{
		let x = yield delayed_fail();
		
		console.log("this should never happen!");

	}catch(err)
	{
		console.log(err + ", just as desired");
	}
	return result;
}

// Lets elaborate a bit, handle promise failures by converting them into "throws"
// this continues the "async code that looks like not async" code thing
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
						return resolve(yielded_result.value);
					else
						//couroutine still going, resolve whatever it gave us and when that has finished, recurse
						Promise.resolve( yielded_result.value )
						.then(get_next_value)
						.catch(throw_next_value)
						;
				}
				catch(err)
				{
					return reject(err);
				}
			}
			function throw_next_value(previous_result)
			{
				try
				{
					//run the couroutine from where it last left off:
					let yielded_result = g.throw(previous_result);

					if( yielded_result.done )
						//couroutine has finished
						return resolve(yielded_result.value);
					else
						//couroutine still going, resolve whatever it gave us and when that has finished, recurse
						Promise.resolve( yielded_result.value )
						.then(get_next_value)
						.catch(throw_next_value)
						;
				}
				catch(err)
				{
					return reject(err);
				}
			}

			return get_next_value(undefined);//first call to generator must be with undefined value
		});

		return p;
	}
}


let add_up_args_couroutine = coroutine_ize(delayed_add_generator);

add_up_args_couroutine(1,2,3,4,5,6).then( _ => console.log(" DONE : " + _));

