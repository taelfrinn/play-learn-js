

var delayed_print = require('./delayed_print.js').delayed_print;

console.log('start delayed print 1');
delayed_print('delayed print 1', function(){} );
console.log('start delayed print 2');
delayed_print('delayed print 2', function(){}  );
console.log('start delayed print 3');
delayed_print('delayed print 3', function(){}  );
