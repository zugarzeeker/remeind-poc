// http://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html
var functionName = 'hello-lambda-9'
var AWS = require('aws-sdk');
var config = require('config')
var awsConfig = new AWS.Config(config.awsConfig)
var lambda = new AWS.Lambda(awsConfig);
var params = {
  Code: { /* required */
    S3Bucket: 'hello-world-1-2-3', // BUCKET
    S3Key: 'code.zip' // FILE_NAME
  },
  FunctionName: functionName, /* required */
  Handler: 'index.handler', /* required */
  Role: config.Role, /* required */
  Runtime: 'nodejs4.3', /* required */
  Description: 'Reminder', // some conventions ?
  Environment: {
    Variables: {
      someKey: 'STRING_VALUE',
      /* anotherKey: ... */
    }
  },
  MemorySize: 128,
  Publish: true || false,
  Timeout: 3, // default is 3 sec
  Publish: true // ?
};

lambda.createFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
