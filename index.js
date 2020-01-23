const ***REMOVED***PORT***REMOVED*** = require('./config');

const express = require('express')
const bodyParser = require("body-parser")
const app = express();
const users = require("./public/routes/users")

app.use('/static', express.static('public'));

app.use(bodyParser.json());

app.use("/api/", users)

app.get('/', (req, res) => ***REMOVED***
  return res.sendFile("home.html", ***REMOVED***root: "public"***REMOVED***);
***REMOVED***);

app.listen(PORT, () => ***REMOVED***
  console.log('app listening on port' + PORT);
***REMOVED***);
