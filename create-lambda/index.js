// http://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html
var AWS = require('aws-sdk');
var lambda = new AWS.Lambda();
var params = {
  Code: { /* required */
    S3Bucket: 'STRING_VALUE',
    S3Key: 'STRING_VALUE',
    S3ObjectVersion: 'STRING_VALUE',
    ZipFile: new Buffer('...') || 'STRING_VALUE'
  },
  FunctionName: 'STRING_VALUE', /* required */
  Handler: 'STRING_VALUE', /* required */
  Role: 'STRING_VALUE', /* required */
  Runtime: 'nodejs', /* required */
  DeadLetterConfig: {
    TargetArn: 'STRING_VALUE' // SNS Topic
  },
  Description: 'Dose Reminder', // some conventions ?
  Environment: {
    Variables: {
      someKey: 'STRING_VALUE',
      /* anotherKey: ... */
    }
  },
  Version: 'STRING',
  MemorySize: 128,
  Publish: true || false,
  Timeout: 3, // default is 3 sec
  Publish: true // ?
};
lambda.createFunction(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
