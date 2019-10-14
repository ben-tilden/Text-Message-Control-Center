const createError = require('http-errors');
const fetch = require('node-fetch');

const express = require('express');
const router = express.Router();

const api = {
  baseUrl: 'https://api.twilio.com',
  accountSid: 'AC02c3544de9e4cd1c8f4c8bcbac203227',
  authToken: 'b5c4a0f28c439a59abb20eb0dc0c7e06'
};

const authHeaders = new fetch.Headers();
authHeaders.append('Authorization', 'Basic ' +
                   Buffer.from(api.accountSid + ':' + api.authToken)
                   .toString('base64'));
const obj = {
  method: 'GET',
  headers: authHeaders
};

// GET request responds with JSON of messages from Twilio
router.get('/', (req, res, next) => {
  const url = api.baseUrl +
              '/2010-04-01/Accounts/' +
              api.accountSid +
              '/Messages.json?PageSize=10&Page=0';
  fetch(url, obj)
    .then(apiRes => apiRes.json())
    .then(userRes => res.send(userRes))
    .catch(() => next(createError()));
});

// POST request responds with JSON of messages of the body's url
router.post('/', (req, res, next) => {
  if (!req.body.url) {
    next(createError(400));
  } else {
    const url = req.body.url;
    fetch(url, obj)
      .then(apiRes => apiRes.json())
      .then(userRes => res.json(userRes))
      .catch(() => next(createError()));
  }
});

module.exports = router;
