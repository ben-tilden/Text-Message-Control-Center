const express = require('express');
const router = express.Router();

const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../public/javascripts/smsClient');

router.get('/', function (req, res, next) {
  res.sendStatus(200);
});

router.post('/', (req, res, next) => {
  if (!req.body.body || !req.body.rec) {
    res.status(400).send('400 Bad Request');
  } else {
    smsClient.verify(req.body.rec, twilioClient)
      .then(isRealRec => {
        if (!isRealRec) {
          res.status(400).send('400 Bad Request');
        } else {
          smsClient.sendMessage(twilioClient, req.body.body, req.body.rec)
            .then(() => res.sendStatus(200));
        }
      })
      .catch(() => res.status(500).send('500 Internal Server Error'));
  }
});

module.exports = router;
