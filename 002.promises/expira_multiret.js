

var p = new Promise(
function (resolve, reject )
{
	resolve(["a","b","c"] );
}
);


p.then(
function( )
{
	var myargs = Array.prototype.slice.call(arguments);
	console.log( myargs.length + " " + myargs.join(" + ") )
});
