var AWS = require('aws-sdk');
var config = require('config')
var lambda = new AWS.Lambda(config.awsConfig);

var params = {
  FunctionName: 'lambda-x',
  StatementId: Date.now().toString(),
  Action: 'lambda:InvokeFunction',
  Principal: 'sns.amazonaws.com',
  SourceArn: config.TopicArn
};
lambda.addPermission(params, function callback(err, data) {
  if (err) {
    throw err;
  } else {
    // console.log('added permission to lambda', process.env.TF_LAMBDA_NAME);
    console.dir(data);
  }
});
