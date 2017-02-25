var memjs = require('memjs');
var config = require('config')
var mc = memjs.Client.create(config.redis.endpoint, {
  username: config.redis.username,
  password: config.redis.password
});
mc.set('hello', 'bar', (e, x) => { console.log('eiei', e, x) })
mc.get('hello', function(err, val) { console.log(err, val.toString()); })
