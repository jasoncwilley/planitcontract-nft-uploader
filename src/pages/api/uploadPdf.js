// pages/api/uploadPdf.js

import mysql from 'mysql2';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    const { userId, txId } = req.body;
    const formattedTxId = `https://arweave.net/${txId}`;

    const sql = `INSERT INTO uploads (upload_id, user_id, image_link) VALUES (NULL, '${userId}', '${formattedTxId}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error inserting data into MySQL' });
        throw err;
      }
      console.log('1 record inserted');
      res.status(200).json({ success: true });
    });

    connection.end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}