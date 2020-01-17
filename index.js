const ***REMOVED***PORT***REMOVED*** = require('./config');

const express = require('express')
const app = express();

app.get('/', (req, res) => ***REMOVED***
  res.send('Hola Mundo!')
***REMOVED***);

app.listen(PORT, () => ***REMOVED***
  console.log('app listening on port 8000!')
***REMOVED***);