
/**
 * Send message via Twilio
 */

const sendMessage = (client, body, rec) => {
  client.messages.create({
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
  try {
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
  } catch (err) {
    console.log(err); // TODO: Build out
  }
};

module.exports.updateMessages = updateMessages;
