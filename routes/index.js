const createError = require('http-errors');

const express = require('express');
const router = express.Router();

const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../lib/smsClient');

// POST request sends text message "body" to "rec"
router.post('/', (req, res, next) => {
  if (!req.body.body || !req.body.rec) {
    next(createError(400));
  } else {
    smsClient.verify(req.body.rec, twilioClient)
      .then(isRealRec => {
        if (!isRealRec) {
          next(createError(400));
        } else {
          smsClient.sendMessage(twilioClient, req.body.body, req.body.rec)
            .then(() => res.sendStatus(200));
        }
      })
      .catch(() => next(createError()));
  }
});

module.exports = router;
