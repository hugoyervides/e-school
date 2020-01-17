const {PORT} = require('./config');

const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hola Mundo!')
});

app.listen(PORT, () => {
  console.log('app listening on port 8000!')
});