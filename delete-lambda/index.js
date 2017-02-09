var AWS = require('aws-sdk');
var lambda = new AWS.Lambda();
var params = {
  FunctionName: "myFunction",
  Qualifier: "1"
 };
 lambda.deleteFunction(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
