const {PORT} = require('./config');

const express = require('express')
const app = express();

app.get('/', (req, res) => {
  return res.status( 201 ).json({
    "message" : "Hello World!"
  });
});

app.listen(PORT, () => {
  console.log('app listening on port 8000!')
});