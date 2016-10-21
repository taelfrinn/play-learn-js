


var DP = require('./delayed_print.js');
var APIwrap = require('./API_wrap.js');
APIwrap.Wrapperize_interface( DP );

var delayed_print = DP.delayed_print;


var prom = Promise.resolve();

prom.then( function()
{
	console.log('start delayed print 1 expecting failure');
	return delayed_print(null);
}).catch( function( errstr )
{
	console.log('got error as expected: ' + errstr );
	return delayed_print('delayed print 2 ');
}).then( function( retval )
{
	console.log('start delayed print 3 ' + retval );
	return delayed_print('delayed print 3 ');
});


prom.then( function()
{
	console.log('start parallel delayed print 1a');
	return delayed_print("1a delayed print");
}).then( function( retval )
{
	console.log('start parallel delayed print 2a: ' + retval );
	return delayed_print("2a delayed print");
});

