
var store = require('./redis_store.js');
var api_wrap = require('./API_wrap.js');

api_wrap.Wrapperize_interface(store);

var obj1 = {id: 1, name : 'Phone' , color : 'red'};
var obj2 = {id: 2, name : 'Pet' , color : 'black', type: 'cat'};
var obj3 = {id: 3, name : 'pencil' , color : 'yellow' };

var prom = Promise.resolve();
var all_done_proms = [];

[obj1,obj2,obj3].forEach( function(o)
{
	console.log('hookup ' + o.id);
	var newprom = prom.then( function(){ return store.store_obj(o.id,o);} )
		.then( function( save_res){ console.log('Saved ok: ' + save_res ); return store.get_obj(o.id);} )
		.then( function( oret){ if(o.id==2){throw "fail"};console.log('Got Obj back: '); console.info(oret);} );
	all_done_proms.push( newprom );
});

Promise.all(all_done_proms).catch(function(err)
{
	console.log('Failed at some point: ' + err.toString() );
}).then( function() 
{
	console.log('Cleanup the db connection' );
	store.quit();
});

