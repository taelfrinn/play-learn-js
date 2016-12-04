
var store = require('./redis_store.js');
var api_wrap = require('./API_wrap.js');

api_wrap.Wrapperize_interface(store);

var obj1 = {id: 1, name : 'Phone' , color : 'red'};

store.store_obj(obj1.id, obj1)
	.then( save_res => {console.log('Saved ok: ' + save_res ); return save_res} )
	.then( () =>  store.get_obj(obj1.id) )
	.then( oret => { console.log('Re-retrieved object ok: '); console.info(oret);} )
	.catch( err => {console.log('Failed at some point: ' + err.toString() );} )
	.then( () => { console.log('cleanup database handle'); store.quit(); })
	;


//var obj2 = {id: 2, name : 'Pet' , color : 'black', type: 'cat'};
//var obj3 = {id: 3, name : 'pencil' , color : 'yellow' };
