const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');
const fs = require('fs');

const token = fs.readFileSync('token.txt', 'utf8');

module.exports = {
  name: 'pinterest',
  description: 'Fetch images from Pinterest',
  author: 'coffee',
  usage: 'pinterest [prompt] [number]',

  async execute(senderId, [searchTerm, numImages = 1]) {
    if (!searchTerm) return sendMessage(senderId, { text: '📷 | Use: pinterest [prompt] [1-10]' }, token);

    numImages = Math.min(Math.max(parseInt(numImages) || 1, 1), 10);

    try {
      const { data: { result: images } } = await axios.get(`https://pin-kshitiz.vercel.app/pin?search=${encodeURIComponent(searchTerm)}`);
      if (!images.length) return sendMessage(senderId, { text: 'No images found.' }, token);
      
      for (const imageUrl of images.slice(0, numImages)) {
        await sendMessage(senderId, { attachment: { type: 'image', payload: { url: imageUrl } } }, token);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      sendMessage(senderId, { text: 'Error: Unable to fetch images.' }, token);
    }
  },
};
