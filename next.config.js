// next.config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: {
    ARWEAVE_WALLET_KEY: process.env.ARWEAVE_WALLET_KEY,
    Host: process.env.Host,
    Database: process.env.Database,
    User: process.env.User,
    Password: process.env.Password,
    Port: process.env.Port,
  },
};
