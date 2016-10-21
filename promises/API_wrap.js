
function WRAPPER_FUNCTION( funct_to_wrap )
{
	return function( )
	{
		var called_this = this;
		var arga = Array.prototype.slice.call(arguments);
		//console.log('WRAPPER version of ' + funct_to_wrap.toString() + ' called with ' + arga.length + " arguments" + arguments.length );

		return new Promise(
		function( resolve, reject )
		{
			function handle_cb( err, res )
			{
				if(err)
					reject(err);
				else
					resolve(res);
			};

			var callargs = [].concat( arga, [handle_cb] );

			funct_to_wrap.apply( called_this, callargs);
		});
	}
}

function Wrapperize_interface( interf )
{
	if(!interf) return;
	var keys = Object.keys(interf);
	keys.forEach(function( key)
	{
		if( typeof(interf[key] ) == 'function' )
		{
			//console.log('wrapperizing ' + key );
			interf[key] = WRAPPER_FUNCTION( interf[key] );
		}
	});
}

module.exports = 
{
Wrapperize_interface : Wrapperize_interface ,
};
