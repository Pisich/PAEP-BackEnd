const axios = require('axios').default;

class QuotesController {
  getTechnologyQuote() {
    return axios
      .get('https://api.quotable.io/random?tags=technology')
      .then(response => {
        return {
          content: response.data.content,
          author: response.data.author
        }
      });
      // .then(({data: {content, author}}) => ({content, author}));
  }
};

module.exports  = new QuotesController();
