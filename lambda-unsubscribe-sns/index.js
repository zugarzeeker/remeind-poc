var AWS = require('aws-sdk');
var config = require('config')
var sns = new AWS.SNS(config.awsConfig);

var params = {
  SubscriptionArn: '' /* required */
};
sns.unsubscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
