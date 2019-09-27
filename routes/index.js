const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const accountSid = 'AC02c3544de9e4cd1c8f4c8bcbac203227';
const authToken = 'b5c4a0f28c439a59abb20eb0dc0c7e06';
const twilioClient = require('twilio')(accountSid, authToken);

const smsClient = require('../public/javascripts/smsClient');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const updatedMessages = await smsClient.updateMessages(twilioClient);
    res.render('index', {
      title: 'Control Center',
      messages: updatedMessages
    });
  } catch (err) {
    res.sendStatus(500); // TODO: Build out
  }
});

router.post('/', async (req, res, next) => {
  try {
    await smsClient.sendMessage(twilioClient, req.body.body, req.body.rec);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400); // TODO
  }
});

module.exports = router;
