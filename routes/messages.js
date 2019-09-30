const createError = require('http-errors');

const express = require('express');
const router = express.Router();

const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../lib/smsClient');

// GET request responds with JSON of messages from Twilio
router.get('/', (req, res, next) => {
  smsClient.updateMessages(twilioClient)
    .then(updatedMessages => res.json(updatedMessages))
    .catch(() => next(createError()));
});

module.exports = router;
