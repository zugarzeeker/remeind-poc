var AWS = require('aws-sdk');
var config = require('config');
var sns = new AWS.SNS(config.awsConfig);

var params = {
  Message: 'Hello, World', /* required */
  // MessageAttributes: {
  //   someKey: {
  //     DataType: 'STRING_VALUE', /* required */
  //     // BinaryValue: new Buffer('...') || 'STRING_VALUE',
  //     // StringValue: 'STRING_VALUE'
  //   },
  //   /* anotherKey: ... */
  // },
  // MessageStructure: 'STRING_VALUE',
  // PhoneNumber: 'STRING_VALUE',
  // Subject: 'STRING_VALUE',
  // TargetArn: 'STRING_VALUE',
  TopicArn: config.TopicArn
};
sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
