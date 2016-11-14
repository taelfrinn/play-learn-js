
// what will this program do

var callback;


function make_callback( X )
{
	return function()
	{
		console.log(X); 
	};
}

callback = make_callback('Hello, world!');


callback();
