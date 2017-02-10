var AWS = require('aws-sdk');
var config = require('config');
var lambda = new AWS.Lambda(config.awsConfig);
var params = {
  FunctionName: "hello-lambda-8"
};
lambda.deleteFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
