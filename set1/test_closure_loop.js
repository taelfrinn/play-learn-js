
//what will this program do ?

var callbacks = [];


for( var i = 0; i < 5; ++i )
{
	callbacks[i] =	
		(function(i)
		 {
		 	var num = i;
		 	return function()
		 	{
		 		console.log('\tHello, World #' + num);
		 	}
		})(i);
}


callbacks.forEach( function( cb, n)
{
	console.log('Array member cb #:' + n);
	cb();	
});

