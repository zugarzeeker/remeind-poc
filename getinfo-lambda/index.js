var AWS = require('aws-sdk');
var config = require('config');
var lambda = new AWS.Lambda(config);

var params = {
  FunctionName: "hello-lambda-8"
};
lambda.getFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
})
