

// What will this program do?

// note: calling myFunction before it is declared
myFunction();


function myFunction()
{
	// note: printing i before it is declared
	console.log(i);

	var i = 0;

	console.log(i);

	if (true)
	{
		var i = 5;
		console.log(i);
	}
	console.log(i);
}

