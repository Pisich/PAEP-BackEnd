const axios = require('axios').default;

class ShortenUrlController {
  async getTechnologyQuote(longLink) {
    const data = JSON.stringify({
      "long_url": longLink,
      "domain": "bit.ly"
    });
    const config = {
      method: 'post',
      url: 'https://api-ssl.bitly.com/v4/shorten',
      headers: {
        'Authorization': 'Bearer ' + process.env.BITLY_TOKEN,
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    return await axios(config)
    .then(r => {return r.data.link})
    .catch(error => console.error(error));
  }
};

module.exports = new ShortenUrlController();