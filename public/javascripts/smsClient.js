
const sendMessage = (client, body, rec) => {
  client.messages.create({
    body: body,
    from: '+12408378186',
    to: rec
  });
};

module.exports.sendMessage = sendMessage;

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
