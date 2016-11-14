#!/usr/bin/env node
//What will this program do?

var x = 5;
function test2()
{
	if( x )
	{
		console.log("Variable is true");
	}
	else
	{
		console.log("Variable is "+ x);
		for( var x = 0 ; x < 2; ++ x )
			console.log('Hello ' + x);
	}
}

console.log(x);

test2();
console.log(x);
