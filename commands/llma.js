const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'llma',
  description: 'Interact with LLMA META AI',
  usage: 'llma [your Question or Message]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: llma <question>" }, pageAccessToken);

    try {
      const { data: { result } } = await axios.get(`https://joshweb.click/api/llama-3-70b?q=${encodeURIComponent(prompt)}`);
      sendMessage(senderId, { text: result }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
