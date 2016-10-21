



function returns_local_var( set_to )
{
	var v1;

    process.nextTick( function(){v1 = set_to;});

	return v1;
}


var a = returns_local_var(["a","b","c"]);
var b = returns_local_var([1,2,3]);


setTimeout( function()
		{
console.log(a);
console.log(b);
},1000);
