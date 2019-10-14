const createError = require('http-errors');
const path = require('path');

const express = require('express');
const router = express.Router();

const api = {
  baseUrl: 'https://api.twilio.com',
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN
};

const accountSid = api.accountSid;
const authToken = api.authToken;
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../lib/smsClient');

// GET request serves React frontend
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/react_client/build/index.html'));
});

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
