const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Test message 1',
     from: '+12408378186',
     to: '+14694711053'
   })
  .then(function(message) {
   console.log(message.sid)
});