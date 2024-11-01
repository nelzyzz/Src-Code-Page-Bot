const { sendMessage } = require('./sendMessage');

const handlePostback = async (event, pageAccessToken) => {
  const { id: senderId } = event.sender || {};
  const { payload } = event.postback || {};

  if (!senderId || !payload) return console.error('Invalid postback event object');

  try {
    await sendMessage(senderId, { text: `Hello, I'm Cleo AI DEVELOPED BY SUNNEL JOHN REBANO,\n\n your friendly assistant here to help with any question or any task you have! (⁠◍⁠•⁠ᴗ⁠•⁠◍⁠) \n\nHow can I assist you?` }, pageAccessToken);
  } catch (err) {
    console.error('Error sending postback response:', err.message || err);
  }
};

module.exports = { handlePostback };
