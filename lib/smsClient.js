
// Send message via Twilio
const sendMessage = (client, body, rec) => {
  return client.messages.create({
    body: body,
    from: '+12408378186',
    to: rec
  });
};

module.exports.sendMessage = sendMessage;

// Verify phone number
const verify = async (phoneNumber, client) => {
  try {
    await client.lookups.phoneNumbers(phoneNumber).fetch();
    return true;
  } catch {
    return false;
  }
};

module.exports.verify = verify;
