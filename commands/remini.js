const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');
const token = fs.readFileSync('token.txt', 'utf8').trim();

module.exports = {
  name: 'remini',
  description: 'Enhance an image using Remini.',
  usage: 'reply to an image and chat\n-remini',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken, event,) {
    const imageUrl = await getImageUrl(event, pageAccessToken);
    if (!imageUrl) return sendError(senderId, 'Error: No image found to upscale.', pageAccessToken);

    try {
      const { data } = await axios.get(`https://hiroshi-api.onrender.com/image/upscale?url=${encodeURIComponent(imageUrl)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.includes('replicate.delivery')) {
        await sendMessage(senderId, { attachment: { type: 'image', payload: { url: data } } }, pageAccessToken);
      } else {
        sendError(senderId, 'Error: Could not upscale the image.', pageAccessToken);
      }
    } catch (error) {
      console.error('Error:', error);
      sendError(senderId, 'Error: Unable to upscale the image.', pageAccessToken);
    }
  },
};

const sendError = (senderId, message, pageAccessToken) => 
  sendMessage(senderId, { text: message }, pageAccessToken);
