
var gcount = 0;
function delayed_print(mesg, cb)
{
	process.nextTick(function()
	{
		if(!mesg)
		{
			cb("Invalid mesg: empty and null messages cause this to fail", null);
			return;
		}
		console.log(mesg); 
		++gcount;
		cb( null, 'gc=' + gcount);
	});
}

module.exports = 
{
	delayed_print : delayed_print
}
