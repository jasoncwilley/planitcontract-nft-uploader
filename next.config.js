// next.config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: {
    ARWEAVE_WALLET_KEY: process.env.ARWEAVE_WALLET_KEY,
  },
};
