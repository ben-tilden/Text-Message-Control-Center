
/**
 * Send message via Twilio
 */

const sendMessage = (client, body, rec) => {
  return client.messages.create({
    body: body,
    from: '+12408378186',
    to: rec
  });
};

module.exports.sendMessage = sendMessage;

/**
 * Return list of 20 most recent messages sent via Twilio
 */

const updateMessages = async client => {
  const messageList = [];
  const fullList = await client.messages.list({ limit: 20 }); // TODO: Determine limit value
  fullList.forEach(m => {
    const messageData = {};
    messageData.body = (m.body);
    messageData.date = (m.dateSent).toLocaleString();
    messageData.rec = (m.to);
    messageData.id = (m.sid);
    messageList.push(messageData);
  });
  return messageList;
};

module.exports.updateMessages = updateMessages;

/**
 * Verify phone number
 */

const verify = async (phoneNumber, client) => {
  try {
    await client.lookups.phoneNumbers(phoneNumber).fetch();
    return true;
  } catch {
    return false;
  }
};

module.exports.verify = verify;
