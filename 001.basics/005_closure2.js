
//what will this program do ?

var callbacks = [];


for( var i = 0; i < 5; ++i )
{
	callbacks[i] =	
		function()
		{
			console.log('Hello, World #' + i);
		};
}


callbacks.forEach( function( cb, n)
{
	cb();	
});

