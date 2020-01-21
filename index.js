const ***REMOVED***PORT***REMOVED*** = require('./config');

const express = require('express')
const app = express();
app.use('/static', express.static('public'));

app.get('/', (req, res) => ***REMOVED***
  return res.sendFile("home.html", ***REMOVED***root: "public"***REMOVED***);
***REMOVED***);

app.listen(PORT, () => ***REMOVED***
  console.log('app listening on port' + PORT);
***REMOVED***);