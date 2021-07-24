require('dotenv').config();

const Twit = require('twit');

const client = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token: process.env.TWITTER_API_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
});

module.exports = client;