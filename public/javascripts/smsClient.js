
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
    const messageData = [];
    messageData.push(m.body);
    messageData.push(m.dateSent);
    messageData.push(m.to);
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
