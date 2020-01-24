const {PORT} = require('./config');

const express = require('express')
const bodyParser = require("body-parser")
const app = express();
//const users = require("./public/routes/users")

app.use('/static', express.static('public'));

app.use(bodyParser.json());

//app.use("/api/", users)

app.get('/', (req, res) => {
  return res.sendFile("home.html", {root: "public"});
});

app.listen(PORT, () => {
  console.log('app listening on port' + PORT);
});