var AWS = require('aws-sdk');
var config = require('config');
var sns = new AWS.SNS(config.awsConfig);

var params = {
  Name: 'hello-world-topic-2' /* required */
};
sns.createTopic(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
