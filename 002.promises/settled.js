var RSP = require('rsvp');

var P = RSP.resolve(105);


P.then( function(vally) 
{
	console.log('First time done yeah')
});

setTimeout( function()
{
	P.then( function(vally) 
	{
		console.log('Worked again')
	});
}, 10000 );
