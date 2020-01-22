const {PORT} = require('./config');

const express = require('express')
const app = express();
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  return res.sendFile("home.html", {root: "public"});
});

app.listen(PORT, () => {
  console.log('app listening on port ' + PORT);
});
