


var store = require('./redis_store.js');

var obj1 = {id: 1, name : 'Phone' , color : 'red'};


//Store the object, then re-retrieve it
store.store_obj(obj1.id,obj1,handle_store1_cb);

function handle_store1_cb(err,res)
{
	if(err)
	{
		store.quit();
		console.log('Failed to store obj1: ' + err);
	}else
	{
		console.log('object 1 stored okay!' + res);
		//reretrive call buried down in here:
		store.get_obj( 1, handle_get_obj1);
	}
}
function handle_get_obj1(err, res)
{
	if(err)
	{
		console.log('Failed to get object 1 back from redis!');
		store.quit();
	}
	else
	{
		console.log('Got obj1 back from database!');
		console.info(res);
		store.quit();
	}
}

