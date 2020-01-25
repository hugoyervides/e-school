const {PORT} = require('./config');

const express = require('express')
const bodyParser = require("body-parser")
const app = express();
const users = require("./public/routes/users")

app.use('/static', express.static('public'));

app.use(bodyParser.json());

app.use("/api/", users)

app.get('/', (req, res) => {
  return res.sendFile("home.html", {root: "public"});
});

app.listen(PORT, () => {
<<<<<<< HEAD
  console.log('app listening on port' + PORT);
});
=======
  console.log('app listening on port ' + PORT);
});
>>>>>>> bbf4cf40b9f91f0b05d084d5d1d61b90923cbc90
