const createError = require('http-errors');

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
  } catch {
    next(createError());
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.body || !req.body.rec) {
      res.status(400).send('400 Bad Request');
    } else {
      const isRealRec = await smsClient.verify(req.body.rec, twilioClient);
      if (!isRealRec) {
        res.status(400).send('400 Bad Request');
      } else {
        await smsClient.sendMessage(twilioClient, req.body.body, req.body.rec);
        res.sendStatus(200);
      }
    }
  } catch {
    res.status(500).send('500 Internal Server Error');
  }
});

module.exports = router;
