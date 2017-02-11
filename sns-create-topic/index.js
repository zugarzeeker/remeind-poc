var AWS = require('aws-sdk');
var config = require('config');
var sns = new AWS.SNS(config.awsConfig);

var params = {
  Name: 'hello-world-topic-0' /* required */
};

sns.createTopic(params).promise()
.then((data) => console.log(data))
.catch((err) => console.log(err, err.stack))
