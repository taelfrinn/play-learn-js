var RSP = require('rsvp');

var P = RSP.resolve(105);


P.then( function(vally) 
{
	console.log('First Time done yeah')
});

setTimeout( function()
{
	P.then( function(vally) 
	{
		console.log('Worked Agains')
	});
}, 10000 );
