


var DP = require('./delayed_print.js');
var delayed_print = DP.delayed_print;



// wrap the delayed print function which uses callbacks, to use a promise instead
var delayed_print_promise = function(mesg)
{
	return new Promise(
	function( resolve, reject )
	{
		delayed_print(mesg,function(err,res)
		{
			if(err)
				reject(err);
			else
				resolve(res);
		});
	});
}


Promise.resolve()
.then( function()
{
	console.log('start delayed print 1 ');
	return delayed_print_promise('delayed print 1');
}).then( function( retval )
{
	console.log('start delayed print 2 ' + retval );
	return delayed_print_promise('delayed print 2 ');
}).then( function( retval )
{
	console.log('start delayed print 3 ' + retval );
	//throw "fail for no reason";
	return delayed_print_promise('delayed print 3 ');
}).catch( function( errstr )
{
	console.log("something failed: " + errstr);
	//handle cleanup in case of failure
}).then( function( res)
{
	console.log("finally");
});

	console.log("non-promise finally");
