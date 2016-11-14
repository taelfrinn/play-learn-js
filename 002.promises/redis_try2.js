

var store = require('./redis_store.js');
var api_wrap = require('./API_wrap.js');

api_wrap.Wrapperize_interface(store);

var obj1 = {id: 1, name : 'Phone' , color : 'red'};
var obj2 = {id: 2, name : 'Pet' , color : 'black', type: 'cat'};
var obj3 = {id: 3, name : 'pencil' , color : 'yellow' };

var prom = Promise.resolve();

[obj1,obj2,obj3].forEach( function(o)
{
	console.log('hookup ' + o.id);
	prom = prom.then( function(){ return store.store_obj(o.id,o);} );
	prom = prom.then( function( save_res){ if(o.id==2){throw"fail for no reason";}console.log('Saved ok: ' + save_res ); return store.get_obj(o.id);} );
	prom = prom.then( function( oret){ console.log('Got Obj back: '); console.info(oret);} );
});

prom = prom.catch(function(err)
{
	console.log('Failed at some point: ' + err.toString() );
});

prom = prom.then( function() 
{
	console.log('cleanup database handle');
	store.quit();
});

