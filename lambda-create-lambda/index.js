var AWS = require('aws-sdk');
// var config = require('config')
var config = {
  "awsConfig": {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": ""
  },
  "Role": "",
  "TopicArn": "",
  "prefixFunctionArn": ""
};

var awsConfig = new AWS.Config(config.awsConfig)
var lambda = new AWS.Lambda(awsConfig);
var sns = new AWS.SNS(awsConfig);

var functionName = 'lambda-8'
var addPermission = (cbAddingPermission) => {
  var addingPermissionParams = {
    FunctionName: functionName,
    StatementId: Date.now().toString(),
    Action: 'lambda:InvokeFunction',
    Principal: 'sns.amazonaws.com',
    SourceArn: config.TopicArn
  };
  lambda.addPermission(addingPermissionParams, function(err, data) {
    if (err) {
      throw err;
    } else {
      // console.log('added permission to lambda', process.env.TF_LAMBDA_NAME);
      console.dir(data);
      cbAddingPermission();
    }
  });
}

var createLambda = (cbCreatingLambda) => {
  // http://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html
  var creatingParams = {
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
  };

  lambda.createFunction(creatingParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    cbCreatingLambda()
  });
};

var subscribeSNS = (cbSNS) => {
  var params = {
    Protocol: 'lambda',
    TopicArn: config.TopicArn,
    Endpoint: config.prefixFunctionArn + functionName
  };
  sns.subscribe(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    cbSNS()
  });
};

exports.handler = (event, context, callback) => {
  try {
    console.log('[eventSns]', event.Records[0].Sns);
  } catch (err) {
    console.log(err);
  }
  createLambda(() => {
    subscribeSNS(() => {
      addPermission(() => {
        callback(null, 'Hello from Lambda');
      })
    })
  })
};
