

// What will this program print

function Color( name )
{
	this.name = name;
	console.log('Constructor for color: ' + this.name );
}

Color.prototype.SayHi = function( towho )
{
	setTimeout( function(){	
			console.log("Hello " + towho + ", I am " + this.name ) }, 0);
}


var blue = new Color('blue');

console.log(JSON.stringify(blue));

blue.SayHi( "Lee" );
