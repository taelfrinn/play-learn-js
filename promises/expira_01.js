


var delayed_print = require('./delayed_print.js').delayed_print;

console.log('start delayed print 1');
delayed_print('delayed print 1', do_print2 );

function do_print2(err, res)
{
	if(err)
		console.log('print1 failed');
	else
	{
		console.log('start delayed print 2, res=' + res);
		delayed_print( 'delayed print 2'/*null*/, do_print3 );
	}
}
function do_print3(err, res)
{
	if(err)
		console.log('print2 failed');
	else
	{
		console.log('start delayed print 3, res=', res);
		delayed_print( 'delayed print 3', function(){} );
	}
}

