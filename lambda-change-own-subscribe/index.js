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
  "prefixFunctionArn": "",
  "NewTopicArn": "",
  "SubscriptionArn": ""
};


var awsConfig = new AWS.Config(config.awsConfig)
var lambda = new AWS.Lambda(awsConfig);
var sns = new AWS.SNS(awsConfig);

var functionName = 'lambda-change-own-subscription';
var addPermission = (cbAddingPermission) => {
  var addingPermissionParams = {
    FunctionName: functionName,
    StatementId: Date.now().toString(),
    Action: 'lambda:InvokeFunction',
    Principal: 'sns.amazonaws.com',
    SourceArn: config.NewTopicArn
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

var subscribeSNS = (cbSNS) => {
  var params = {
    Protocol: 'lambda',
    TopicArn: config.NewTopicArn,
    Endpoint: config.prefixFunctionArn + functionName
  };
  sns.subscribe(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    cbSNS()
  });
};

var unSubscribeOldSNS = (cbUnSub) => {
  var unSubscriptionParams = {
    // TODO: Getting `SubscriptionArn` from DB
    SubscriptionArn: config.SubscriptionArn /* required */
  };
  sns.unsubscribe(unSubscriptionParams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    cbUnSub();
  });
};

var updateSubscription = (cbUpdatingSubscription) => {
  subscribeSNS(() => {
    addPermission(() => {
      unSubscribeOldSNS(() => {
        cbUpdatingSubscription();
      })
    })
  })
};

exports.handler = (event, context, callback) => {
  try {
    console.log('[eventSns]', event.Records[0].Sns);
  } catch (err) {
    console.log(err);
  }
  updateSubscription(() => {
    callback(null, 'Hello from Lambda');
  });
};

// updateSubscription(() => {
//   console.log('[update subscription successful]');
// });
