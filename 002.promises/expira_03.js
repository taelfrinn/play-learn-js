


var DP = require('./delayed_print.js');
var APIwrap = require('./API_wrap.js');
APIwrap.Wrapperize_interface( DP );

var delayed_print = DP.delayed_print;


var prom = Promise.resolve();

prom.then( function()
{
	console.log('start delayed print 1 ');
	return delayed_print('delayed print 1');
}).then( function( retval )
{
	console.log('start delayed print 2 ' + retval );
	return delayed_print('delayed print 2 ');
});

