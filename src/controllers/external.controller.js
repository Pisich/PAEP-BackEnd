const axios = require('axios').default;

class ShortenUrlController {
  getTechnologyQuote(longLink) {
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
      data : data
    };
    return axios(config)
    .then(response => function() {return Promise.resolve(JSON.stringify(response.data.link))});
  }
};

module.exports = new ShortenUrlController();