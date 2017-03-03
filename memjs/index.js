var memjs = require('memjs');
var config = require('config')
var mc = memjs.Client.create(config.memjs.endpoint, {
  username: config.memjs.username,
  password: config.memjs.password
});
mc.set('hello', 'bar', (e, x) => { console.log('eiei', e, x) })
mc.get('hello', function(err, val) { console.log(err, val.toString()); })
