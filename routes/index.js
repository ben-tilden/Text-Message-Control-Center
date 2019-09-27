const express = require('express');
const router = express.Router();

const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../public/javascripts/smsClient');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const updatedMessages = await smsClient.updateMessages(twilioClient);
    res.render('index', {
      title: 'Control Center',
      messages: updatedMessages
    });
  } catch (err) {
    console.log(err); // TODO: Build out
  }
});

module.exports = router;
