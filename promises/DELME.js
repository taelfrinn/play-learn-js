

var v = new Promise( function(r,j){ console.log('been ran');r(1); } );

v.then( function(val){console.log("result:" + val);});



