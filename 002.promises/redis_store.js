

var redis = require('redis');
client = redis.createClient();



function store_obj( key, obj, cb )
{
	return client.hmset( key, obj, cb);
}

function get_obj( key, cb )
{
	return client.hgetall( key, cb);
}

function delete_obj( key, cb )
{
	return client.del(key,cb);
}
function quit()
{
	client.quit();
}

module.exports =
{
	store_obj : store_obj ,
	get_obj : get_obj ,
	delete_obj : delete_obj , 
	quit : quit ,
};
