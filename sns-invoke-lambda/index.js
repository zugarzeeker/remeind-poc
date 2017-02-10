exports.handler = (event, context, callback) => {
  try {
    console.log('[eventSns]', event.Records[0].Sns);
  } catch (err) {
    console.log(err);
  }
  callback(null, 'Hello from Lambda');
};
