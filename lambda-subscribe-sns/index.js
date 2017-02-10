var AWS = require('aws-sdk');
var config = require('config')
var sns = new AWS.SNS(config.awsConfig);

var functionName = 'hello-lambda-6'
var params = {
  Protocol: 'lambda',
  TopicArn: config.TopicArn,
  Endpoint: config.prefixFunctionArn + functionName
};
sns.subscribe(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
