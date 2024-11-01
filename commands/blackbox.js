const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'blackbox',
  description: 'Chat with blackbox',
  author: 'Tata',
  usage:'blackbox [ta question]',

  async execute(senderId, args) {
    const pageAccessToken = token;
    const input = (args.join(' ') || 'hi').trim();
    const modifiedPrompt = `${input}, direct answer.`;

    try {
      sendMessage(senderId, { text: 'Generating content... Please wait.' }, pageAccessToken);
      const response = await axios.get(`https://www.geo-sevent-tooldph.site/api/blackbox?prompt=${encodeURIComponent(modifiedPrompt)}`);
      const data = response.data;
      const formattedMessage = `・──🤖blackbox🤖──・\n${data.response}\n・──── >ᴗ< ────・`;

      await sendMessage(senderId, { text: formattedMessage }, pageAccessToken);
    } catch (error) {
      console.error('Error:', error);
      await sendMessage(senderId, { text: 'Error: Unexpected error.' }, pageAccessToken);
    }
  }
};
