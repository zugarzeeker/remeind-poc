const dynamoose = require('dynamoose')
const config = require('config')
dynamoose.AWS.config.update(config.awsConfig)
var User = dynamoose.model('User', {
  id: {
    type: String,
    hashKey: true,
    default: 666
  },
  name: String
});

const cat = new Cat({
  id: 666,
  name: 'T__T'
})

cat.save({ overwrite: false }, (err, c) => {
  console.log(err, c);
})
// Cat.create({
//   id: 667,
//   name: 'Odie'
// }, function(err, odie) {
//   if(err) { return console.log(err); }
//   console.log(odie);
// });
// Cat.get(667).then((badCat) => {
//   console.log('Never trust a smiling cat. - ' + badCat.name);
// }).catch(err => console.log(err));
